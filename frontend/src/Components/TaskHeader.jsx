import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddUser from "../Assets/Images/sent.png";
import Employees from "../Assets/Images/intask.png";
import AddDep from "../Assets/Images/addtask.png";

function TaskHeader(){

    return (
        <div className="access-tabs">
        <Link to="/main/tasks/create" className="tabs">
            <div className="access-icon-container"><img src={AddDep}/></div>
            <p className="access-tab-name">Create Task</p>
        </Link>
        <Link to="/main/tasks/received" className="tabs">
            <div className="access-icon-container"><img src={Employees}/></div>
            <p className="access-tab-name">Received Task</p>
        </Link>
        <Link to="/main/tasks/shared" className="tabs">
            <div className="access-icon-container"><img src={AddUser}/></div>
            <p className="access-tab-name">Shared Task</p>
        </Link>  
    </div>
    )
}

export default TaskHeader;