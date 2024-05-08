import React from "react";
import { Link } from 'react-router-dom';
import HomeIcon from "../Assets/Images/home3.ico";
import DashIcon from "../Assets/Images/docu1.png";
import TaskIcon from "../Assets/Images/task2.png";
import ProfileIcon from "../Assets/Images/profile4.png";
import SettingsIcon from "../Assets/Images/settings.png";
import AdminIcon from "../Assets/Images/access3.png";

const Sidebar = ({ selectedLink, handleLinkClick, isAdmin }) => {
    return (
        <div className="sidebar-left">
            <div className="page-routes">
                <Link 
                    to="/main/dashboard" 
                    className="routes" 
                    onClick={() => handleLinkClick("/main/home")}
                    style={{backgroundColor: selectedLink === "/main/home" ? ' rgb(0, 9, 94)' : 'inherit'}}
                >
                    <img className="icon" src={HomeIcon} alt="Home" />
                    <h3 className="icon-text">Home</h3>
                </Link>
                <Link 
                    to="/main/dashboard" 
                    className="routes" 
                    onClick={() => handleLinkClick("/main/dashboard")}
                    style={{backgroundColor: selectedLink === "/main/dashboard" ? ' rgb(0, 9, 94)' : 'inherit'}}
                >
                    <img className="icon" src={DashIcon} alt="Dashboard" />
                    <h3 className="icon-text">Documents</h3>
                </Link>
                <Link 
                    to="/main/tasks" 
                    className="routes" 
                    onClick={() => handleLinkClick("/main/tasks")}
                    style={{backgroundColor: selectedLink === "/main/tasks" ? ' rgb(0, 9, 94)' : 'inherit'}}
                >
                    <img className="icon" src={TaskIcon} alt="Tasks" />
                    <h3 className="icon-text">MyTasks</h3>
                </Link>
                {isAdmin && (
                    <Link 
                        to="/main/adminaccess" 
                        className="routes" 
                        onClick={() => handleLinkClick("/main/adminaccess")}
                        style={{backgroundColor: selectedLink === "/main/adminaccess" ? ' rgb(0, 9, 94)' : 'inherit'}}
                    >
                        <img className="icon" src={AdminIcon} alt="Admin Access" />
                        <h3 className="icon-text">Admin Access</h3>
                    </Link>
                )}
                <Link 
                    to="/main/profile" 
                    className="routes" 
                    onClick={() => handleLinkClick("/main/profile")}
                    style={{backgroundColor: selectedLink === "/main/profile" ? ' rgb(0, 9, 94) ' : 'inherit'}}
                >
                    <img className="icon" src={ProfileIcon} alt="Profile" />
                    <h3 className="icon-text">Profile</h3>
                </Link>
                <Link 
                    to="/main/settings" 
                    className="routes" 
                    onClick={() => handleLinkClick("/main/settings")}
                    style={{backgroundColor: selectedLink === "/main/settings" ? ' rgb(0, 9, 94)' : 'inherit'}}
                >
                    <img className="icon" src={SettingsIcon} alt="Settings" />
                    <h3 className="icon-text">Settings</h3>
                </Link>
            </div>
            <div className="sidebar-footer"></div>
        </div>
    );
}

export default Sidebar;
