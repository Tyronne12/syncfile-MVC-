import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AddUser from "../Assets/Images/adduser.png";
import Employees from "../Assets/Images/employees2.png";
import AddDep from "../Assets/Images/adddepartment2.png";

function AccessHeader(){
    return (
        <div className="access-tabs">
        <Link to="/main/adminaccess/employees" className="tabs">
            <div className="access-icon-container"><img src={Employees}/></div>
            <p className="access-tab-name">Employees</p>
        </Link>
        <Link to="/main/adminaccess/add_user" className="tabs">
            <div className="access-icon-container"><img src={AddUser}/></div>
            <p className="access-tab-name">Add User</p>
        </Link>
        <Link to="/main/adminaccess/add_department" className="tabs">
            <div className="access-icon-container"><img src={AddDep}/></div>
            <p className="access-tab-name">Manage Department</p>
        </Link>
    </div>
    )
}

export default AccessHeader;