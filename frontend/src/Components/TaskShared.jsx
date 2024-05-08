import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import TaskHeader from "./TaskHeader";
import UserDataFetcher from "./UserDataFetcher";
import '../App.css'

function MyTask() {

    const [task, setTask] = useState([]);
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);



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

    console.log(task);
    console.log(user?.user_id);

    console.log(user?.user_id); // Using optional chaining to avoid error if user is null

    return (
        <div className="admin-access-main">
            <UserDataFetcher setUser={setUser} setAdmin={setAdmin} />
            <div className="admin-access-header">
                <TaskHeader />
                <div></div>
            </div>
            <div className="shared-container">
            <h3>Shared Task</h3>
                {user && task // Check if user is not null and task is not null/empty
                    ? task
                        .filter(task => task.author_id == user.user_id)
                        .map(task => (
                            <Card key={task.task_id} style={{ height: 'fit-content', padding: '0', cursor: 'pointer' }}>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0" style={{ fontSize: '80%' }}>
                                        <p>
                                            <cite title="Source Title">You shared task with</cite> <span className="author">{task.tagged_to_first_name}</span>.  Task: {task.task_title}.
                                        </p>
                                        <footer className="notif-footer">
                                        {formatDate(task.created_at)} {/* Assuming this is the timestamp of the task */}
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