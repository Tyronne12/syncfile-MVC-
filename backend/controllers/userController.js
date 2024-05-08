
const usermodel = require('../models/userModel');
const Data_validators = require('../validators/data_validaton');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});



class User {

    index(req, res){
        res.render('index')
    }

      uploadFile(req, res) {
        upload.single('file')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: err.message });
            } else if (err) {
                return res.status(500).json({ error: 'An error occurred while uploading the file' });
            }
            const fileData = req.body;
            const fileDetails = req.file;
            usermodel.upload_file(fileData, fileDetails);

        });
    }
    
    fetchData(req,res){
      const data = req.body;
      console.log(data);
      usermodel.fetch_data(data)
      .then(results => {
          if (results) {
            console.log(results);
            
              const user = results[0];
              req.session.user = user;
              res.json({ status: 'success', message: 'Login successful!', user });

          } else {
              res.json({ data: 'No fetched Data' });
          }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Error fetching data' });
      });
    }

    fetchUserData(req,res){
      if (req.session.user) {
        res.json({ user: req.session.user });
      } else {
        res.status(404).json({ message: 'User data not found in session' });
      }
    }

    logoutUser(req,res){
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ status: 'fail', message: 'Internal server error.' });
        }
        res.clearCookie('connect.sid'); 
        res.json({ status: 'success', message: 'Logged out successfully.' });
      });
    }

    fetchFolder(req,res){
      usermodel.fetch_folder()
      .then(results=>{
          console.log(results);
          res.json(results);
      })
      .catch(error =>{
        console.error('Error fetching data:', error);
        res.status(500).json({message:'Error fetching data'})
      })
    }

    postFolder(req,res){
      const data = req.body;
      usermodel.post_folder(data)
      .then(results=>{
        console.log(results);
        res.json(results);
      })
      .catch(error =>{
        console.error('Error fetching data:', error);
        res.status(500).json({message:'Error fetching data'})
      })
    }

    registerUser(req,res){
      const data = req.body;
      usermodel.register_user(data)
      .then(results =>{
        console.log(results);
      })
      .catch(error =>{
        console.error('Error fetching data:', error);
        res.status(500).json({message:'Error fetching data'})
      })
    }

    downloadFile(req,res){
      const filePath = path.join(__dirname, 'uploads', req.params.fileName);
      res.download(filePath); // Send the file for download
    }

    fetchFileData(req,res){
      const {option} = req.query;
      //console.log(option);
      usermodel.fetch_file_data(option)
      .then(results =>{
        console.log(results);
        res.json(results);
      })
      .catch(error =>{
        console.error('Error fetching data:', error);
        res.status(500).json({message:'Error fetching data'})
      })
    }

    createtask(req,res){
      upload.single('file')(req, res, (err) => {
        const taskData = req.body;
        const fileData = req.file;

        console.log(fileData);

        usermodel.create_task(taskData, fileData)
        .then(results =>{
          res.json('User settings updated successfully', results)
        })
        .catch(error=>{
          console.error('Error inserting data', error);
          res.status(500).json('Error settings update', error)
        })
     });
    }

    fetchAllUsers(req,res){
      usermodel.fetch_all_users()
      .then(results =>{
        res.json(results);
      })
      .catch(error =>{
        console.error('Error fetching data:', error);
        res.status(500).json({message:'Error fetching data'})
      })
    }

    fetchTask(req,res){
      usermodel.fetch_task_data()
      .then(results =>{
        res.json(results);
      })
      .catch(error =>{
        console.error('Error fetching data', error);
        res.status(500).json({message:'Error fetching data'})
      })
    }

    updateUserProfile(req,res){
      upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'An error occurred while uploading the file' });
        }
        const fileData = req.body;
        const fileDetails = req.file;
        usermodel.update_user_profile(fileData, fileDetails)
        .then(results =>{
          res.json('User settings updated successfully', results)
        })
        .catch(error=>{
          console.error('Error inserting data', error);
          res.status(500).json('Error settings update', error)
        })

      });
    }
    
    fetchTaskData(req,res){

      const taskID = req.body.task_id;

      usermodel.fetch_usertask_data(taskID)
      .then(results =>{
        res.json('Data fetched successfully', results)
      })
      .catch(error=>{
        console.error('Error fetching data', error);
        res.status(500).json('Error fetching data', error)
      })
    }

    deleteFolder(req,res){
      const folderId = req.params.folderId;
      console.log(folderId);
      usermodel.delete_folder(folderId);
    }


}

module.exports = new User();
