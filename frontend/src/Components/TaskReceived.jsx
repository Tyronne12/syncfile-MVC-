import React, {useState, useEffect} from "react";
import TaskHeader from "./TaskHeader";
import UserDataFetcher from "./UserDataFetcher";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import '../App.css'

function MyTask() {

    const [task, setTask] = useState([]);
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchTaskData();
    }, []);

    const fetchTaskData = async () => {
        try {
            const response = await fetch('/api/task');
            const data = await response.json();
            setTask(data);
            console.log(data);
           
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const formatDate = (timestamp) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(timestamp);
        const month = months[date.getMonth()]; // Get the month abbreviation
        const day = String(date.getDate()).padStart(2, '0'); // Day
        const year = date.getFullYear(); // Year
        let hours = date.getHours(); // Hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes
        const ampm = hours >= 12 ? 'pm' : 'am'; // AM or PM
        hours = hours % 12 || 12; // Convert hours to 12-hour format
        return `${month} ${day}, ${year} ${hours}:${minutes}${ampm}`;
    };

    const formatfilepath = (path) => {
        const URL = `http://localhost:3001/${path}`;

        return URL;
    }

    return (
        <div className="admin-access-main">
        <div className="admin-access-header">
           <TaskHeader />
           <UserDataFetcher setUser={setUser} setAdmin={setAdmin} />
           <div></div>
        </div>
        <div className="shared-container">
        <h5>Received Task</h5>
        {user && task // Check if user is not null and task is not null/empty
                    ? task
                        .filter(task => task.tagged_to_id == user.user_id)
                        .map(task => (
                            <Card key ={task.task_id} className="task-received-name" onClick={handleShow}>
                            <Card.Header className="card-header">From: <span className="author">{`${task.author_first_name} ${task.author_last_name} (${task.author_department_name})`}</span></Card.Header>
                            <Card.Body className="task-received-card">
                              <blockquote className="blockquote mb-0">
                                <p className="task-received-card">
                                  {' '}Task: {task.task_title}{' '}
                                </p>
                                <p className="task-received-card">
                                  {' '}Details: {task.task_details}{' '}
                                </p>
                                <p className="task-received-card">
                                  {' '}Deadline: {formatDate(task.add_deadline)}{' '}
                                </p>
                                <p className="task-received-card">
                                  {' '}Attached File: <a href={formatfilepath(task.file_path)}>File</a>{' '}
                                </p>
                                <footer className="task-received-card-footer">
                                 <cite title="Source Title">Task added on: {formatDate(task.created_at)}</cite>
                                </footer>
                              </blockquote>
                            </Card.Body>
                          </Card>
                        ))
                    : null 
                }

        </div>
     </div>
    );
}

export default MyTask;