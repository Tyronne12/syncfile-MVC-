import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileIcon from '../Assets/Images/profilepic2.png';
import AdminIcon from '../Assets/Images/admin.png';
import OfficeIcon from '../Assets/Images/office.png';
import { Link } from 'react-router-dom';
import LogPhoto from '../Assets/Images/profile3.png';
import AdminPhoto from '../Assets/Images/admin2.png';
import '../App.css';


function Login() {
    const [logType, setLogType] = useState("");
    const [data, setData] = useState({});
    const [employee_id, setEmployeeID] = useState('');
    const [admin_id, setAdminID] = useState('');
    const [password, setPassword] = useState('');


    const LoginSelect = () =>{
        setLogType("");
    }

    const LogEmployee = () => {
        setLogType("employee");
    }

    const LogAdmin = () => {
        setLogType("admin");
    }

    const submit = (e) => {
        e.preventDefault();
    
        const requestData = {
            employee_id: employee_id,
            password: password,
        };
    
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            console.log(data);
            if (data.status === 'success') {
                window.location.href = '/main';
            } else {
                console.log(data.message);
            }
        });
    }

    const submitAdmin = (e) => {
        e.preventDefault(); 
    
        const requestData = {
            admin_id: admin_id, 
            password: password,
        };
    
        console.log(requestData);
    
        fetch('/api/data2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            console.log(data);
            if (data.status === 'success') {
                window.location.href = '/main';
            } else {
                console.log(data.message);
            }
        });
    }
    
    return (
        <div className="login-page">
            <div className="login-form">

                {logType === "" && (
                    <div className="login">
                        <div className="log-type-container">
                            <div className="log-border" onClick={LogEmployee}>
                                <img className="log-photo" src={LogPhoto} alt="" />
                                <h4 className="log-name-type">Employee</h4>
                            </div>
                        </div>
                        <div className="log-type-container">
                            <div className="log-border" onClick={LogAdmin}>
                                <img className="log-photo-admin" src={AdminPhoto} alt="" />
                                <h4 className="log-name-type">Admin</h4>
                            </div>
                        </div>
                    </div>
                )}

                {logType === "employee" && (
                    <div className="login-employee">
                        <div className="profile-container">
                            <img className="profile-icon" src={ProfileIcon} alt="" />
                        </div>
                        <form className="form">
                            <input
                                className="employee-ID"
                                value={employee_id} 
                                onChange={(e) => setEmployeeID(e.target.value)} 
                                placeholder="Employee ID"
                            />
                            <input
                                type="password"
                                className="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password"
                            />
                            <div className="btn-login"><button onClick={submit} className="login-btn">Login</button></div>
                            <p className="back-btn" onClick={LoginSelect}>Back</p>
                        </form>
                    </div>
                )}

                {logType === "admin" && (
                    <div className="login-employee">
                        <div className="profile-container">
                            <img className="profile-icon" src={AdminIcon} alt="" />
                        </div>
                        <form className="form">
                            <input
                                className="employee-ID"
                                value={admin_id} 
                                onChange={(e) => setAdminID(e.target.value)} 
                                placeholder="Admin ID"
                            />
                            <input
                                type="password"
                                className="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password"
                            />
                            <div className="btn-login"><button onClick={submitAdmin} className="login-btn">Login</button></div>
                            <p className="back-btn" onClick={LoginSelect}>Back</p>
                        </form>
                    </div>
                )}


            </div>
            <div className="logo-container">
                <div className="office-icon-container">
                    <img className="office-icon" src={OfficeIcon} alt="" />
                </div>
                <div className="text-logo-container">
                    <h1 className="text-logo">SyncFile</h1>
                    <p>Document Management System</p>
                </div>
            </div>
        </div>
    )
}

export default Login;
