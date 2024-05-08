const connection = require("../configs/config");
const path = require('path');

class UserModel {

    constructor() {
        const moment = require('moment');
        this.now = moment().format('YYYY-MM-DD HH:mm:ss');

        // Move the getFileType function here
        this.getFileType = (fileName) => {
            const ext = path.extname(fileName).toLowerCase();
            switch (ext) {
                case '.pdf':
                    return 'pdf';
                case '.doc':
                case '.docx':
                    return 'word';
                case '.ppt':
                    return 'powerpoint';
                case '.xls':
                case '.xlsx':
                    return 'spreadsheet';
                case '.txt':
                    return 'text';
                case '.png':
                case '.jpg':
                case '.jpeg':
                case '.gif':
                    return 'image';
                default:
                    return 'other';
            }
        };
    }
    
    
    async fetch_data(data) {
        console.log(data);
        const { employee_id, password } = data;
        try {
            const results = await new Promise((resolve, reject) => {
                connection.query('SELECT * FROM user_data WHERE employee_id = ? AND password = ?', [employee_id, password], (error, results, fields) => {
                    if (error) {
                        console.error('Error fetching data:', error);
                        reject(error);
                    } else {
                        //console.log('Data fetched successfully:', results);
                        resolve(results);
                    }
                });
            });
            
            return results;
    
        } catch (error) {
            throw error;
        }
    }

    async fetch_user_data(){
        try{
            const results = await new Promise((resolve, reject) =>{
                connection.query('SELECT*FROM user_data', (error, results, fields) =>{
                    if (error) {
                        console.error('Error fetching data:', error);
                        reject(error);
                    } else {
                        //console.log('Data fetched successfully:', results);
                        resolve(results);
                    }
                });
            })
        } catch (error) {
            throw error;
        }
    }

    async fetch_folder(){
        try{
            const results = await new Promise((resolve, reject) =>{
                connection.query('SELECT folder_data.id, folder_data.folder_name, COUNT(user_data.user_id) AS num_employees FROM folder_data LEFT JOIN user_data ON folder_data.id = user_data.department_id GROUP BY folder_data.id, folder_data.folder_name;', (error, results, fields) =>{
                    if (error) {
                        console.error('Error fetching data:', error);
                        reject(error);
                    } else {
                        console.log('Data fetched successfully:', results);
                        resolve(results);
                    }
                });
            })

            return results;

        } catch (error) {
            throw error;
        }
    }

    
    async post_folder(data){
        console.log(data);
        const {name}  = data;
        try{
            const results = await new Promise((resolve, reject) =>{
                connection.query('INSERT INTO folder_data (folder_name) VALUES (?)', [name], (error, results, fields) =>{
                    if (error) {
                        console.error('Error inserting data:', error);
                        reject(error);
                    } else {
                        console.log('Data inserted successfully:', results);
                        resolve(results);
                    }
                });
            })

            return results;
            
        } catch (error) {
            throw error;
        }
    }

    async register_user(data){
        console.log(data);
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            address,
            jobTitle,
            startDate,
            userType,
            employeeId,
            password,
            departmentID,
            departmentName
          } = data;
     
        const dateCreated = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const dateUpdated = dateCreated;

        try{
            const results = await new Promise((resolve, reject) =>{
                connection.query('INSERT INTO user_data (first_name, last_name, email, contact, gender, address, employee_id, position, department, date_hired, department_id, created_at, updated_at, is_admin, password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [firstName, lastName, email, phoneNumber, gender, address, employeeId, jobTitle, departmentName, startDate, departmentID, dateCreated, dateUpdated, userType, password], (error, results, fields) =>{
                    if (error) {
                        console.error('Error inserting data:', error);
                        reject(error);
                    } else {
                        console.log('Data inserted successfully:', results);
                        resolve(results);
                    }
                });
            })
            return results;
        } catch (error) {
            throw error;
        }
        
    }
    
    async upload_file(fileData, fileDetails) {
        
        console.log(fileData);
        console.log(fileDetails);
    
        const userID= fileData.user_id;
        const folderID = fileData.folder_id;
        const fileName = fileDetails.originalname;
        const fileType = this.getFileType(fileName);
        const filePath = fileDetails.path;
    
        try{
            const results = await new Promise((resolve, reject) =>{
                connection.query('INSERT INTO file_data (file_name, file_type, file_path, user_id, folder_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW() )', [fileName, fileType, filePath, userID, folderID ], (error, results, fields) =>{
                    if (error) {
                        console.error('Error inserting data:', error);
                        reject(error);
                    } else {
                        console.log('Data inserted successfully:', results);
                        resolve(results);
                    }
                });
            })
            return results;
        } catch (error) {
            throw error;
        }
    }

    async fetch_file_data(option) {
        console.log(option);
        let queryString;
            
        if (option === 'all') {
            queryString = 'SELECT file_data.*, user_data.first_name, user_data.last_name, user_data.department FROM file_data INNER JOIN user_data ON file_data.user_id = user_data.user_id ORDER BY file_data.updated_at DESC';
        } 
        else if (['word', 'pdf', 'powerpoint', 'text', 'spreadsheet', 'others', 'image'].includes(option)) {
            queryString = 'SELECT file_data.*, user_data.first_name, user_data.last_name, user_data.department FROM file_data INNER JOIN user_data ON file_data.user_id = user_data.user_id WHERE file_type = ? ORDER BY file_data.updated_at DESC';
        } 
        else {
            return { message: 'Invalid Selection' };
        }
        
        try{
            const results = await new Promise((resolve, reject) =>{
                connection.query(queryString, [option], (error, results, fields) =>{
                    if (error) {
                        console.error('Error inserting data:', error);
                        reject(error);
                    } else {
                        console.log('Data inserted successfully:', results);
                        resolve(results);
                    }
                });
            })
            return results;
        } catch (error) {
            throw error;
        }
    }

    async create_task(taskData, fileData) {
         console.log(taskData);
         console.log(fileData);

        const title = taskData.title;
        const details = taskData.details;
        const deadline = taskData.deadline;
        const shareWith_id = taskData.shareWith_id;
        const userID = taskData.user_id;
        const folderID = taskData.folder_id;

        const deadlineDate = new Date(deadline);
        const formattedDeadline = deadlineDate.toISOString().slice(0, 19).replace('T', ' ');

        try {
            if (fileData) {
                const fileName = fileData.originalname;
                const fileType = this.getFileType(fileName);
                const filePath = fileData.path;
    
                console.log(fileType);
                const formattedDeadline = new Date(deadline).toISOString().slice(0, 19).replace('T', ' ');
    
                const results = await Promise.all([
                    new Promise((resolve, reject) => {
                        connection.query('INSERT INTO file_data (file_name, file_type, file_path, user_id, folder_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW() )', [fileName, fileType, filePath, userID, folderID], (error, results, fields) => {
                            if (error) {
                                console.error('Error inserting file data', error);
                                reject(error);
                            } else {
                                console.log('File data inserted successfully');
                                resolve(results);
                            }
                        });
                    }),
                    new Promise((resolve, reject) => {
                        connection.query('INSERT INTO task_data (task_title, task_details, user_id, sharewith_id, file_name, file_path, created_at, updated_at, add_deadline) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)', [title, details, userID, shareWith_id, fileName, filePath, formattedDeadline], (error, results, fields) => {
                            if (error) {
                                console.error('Error inserting task data', error);
                                reject(error);
                            } else {
                                console.log('Task data inserted successfully');
                                resolve(results);
                            }
                        });
                    })
                ]);
                return results;
            }
            else{
                const results = await new Promise((resolve, reject)=>{
                    connection.query('INSERT INTO task_data (task_title, task_details, user_id, sharewith_id, created_at, updated_at, add_deadline) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)', [title, details, userID, shareWith_id, formattedDeadline], (error, results, fields) =>{
                        if (error) {
                            console.error('Error inserting task data', error);
                            reject(error);
                        } else {
                            console.log('Task data inserted successfully');
                            resolve(results);
                        }
                    })
                })
                return results;
            }
        } catch (error) {
            throw error;
        }

    }

    async fetch_all_users(){
        try{
            const results = await new Promise ((resolve, reject) =>{
                connection.query('SELECT*FROM user_data', (error,  results, fields) =>{
                    if(error){
                        console.error('Error fetching data', error);
                        reject(error);
                    }
                    else{
                        console.log('Success fetching data', results);
                        resolve(results);
                    }
                })
            })
            return results;
        }

        catch(error){
            throw(error);
        }
    }

    async fetch_task_data() {
        try {
            const results = await new Promise((resolve, reject) => {
                const dataQuery = `
                    SELECT 
                        task.*,
                        task.user_id AS author_id,
                        author.first_name AS author_first_name,
                        author.last_name AS author_last_name,
                        author.department AS author_department_name,
                        task.shareWith_id AS tagged_to_id,
                        tagged_to.first_name AS tagged_to_first_name,
                        tagged_to.last_name AS tagged_to_last_name,
                        tagged_to.department AS tagged_to_department_name
                    FROM 
                        task_data AS task
                    JOIN 
                        user_data AS author ON task.user_id = author.user_id
                    JOIN 
                        user_data AS tagged_to ON task.shareWith_id = tagged_to.user_id;
                `;
    
                connection.query(dataQuery, (error, results, fields) => {
                    if (error) {
                        console.error('Error fetching data', error);
                        reject(error);
                    } else {
                        console.log('Data fetched successfully', results);
                        resolve(results);
                    }
                })
            });

            return results;
    
        } catch (error) {
            throw(error);
        }
    }

    async update_user_profile(fileData, fileDetails) {
        try {
            if (fileData && fileDetails) {
                const userID = fileData.user_id;
                const password = fileData.password;
                const profilePicLink = fileDetails.path;
                const fileName = fileDetails.originalname;
                const fileType = this.getFileType(fileName);
                console.log(fileType);
    
                const results = await new Promise((resolve, reject) => {
                    connection.query('UPDATE user_data SET password = ?, profile_filepath = ?, updated_at = NOW() WHERE user_id = ?', [password, profilePicLink, userID], (error, results, fields) => {
                        if (error) {
                            console.error('Error updating data', error);
                            reject(error);
                        } else {
                            console.log('Data updated successfully!', results);
                            resolve(results);
                        }
                    });
                });
                return(results);
            }
        } catch (error) {
            throw error;
        }
    }
    

    async fetch_usertask_data(taskID){
        try{
            const results = await new Promise((resolve, reject) =>{
                connection.query('SELECT*FROM task_data WHERE task_id = ?', [taskID], (error, results, fields) =>{
                    if(error){
                        console.error('Erorr fecthing data', error)
                        reject(error);
                    }
                    else{
                        console.log('Data fetched successfully!', results)
                        resolve(results);
                    }
                })
            })
            return(results);
        }
        catch(error){
            throw error;
        }
    }

    async delete_folder(folderID){
        try{
            const results = await new Promise((resolve, reject) =>{
                connection.query('DELETE from folder_data WHERE id = ?', [folderID], (error, results, fields) =>{
                    if(error){
                        console.error('Error deleting data', error);
                        reject(error);
                    }
                    else{
                        console.log('Data deleted successfully', results)
                        resolve(results)
                    }
                })
            })

            return results;
        }
        catch(error){
            throw error;
        }
    }

    



    
    
}

module.exports = new UserModel();
