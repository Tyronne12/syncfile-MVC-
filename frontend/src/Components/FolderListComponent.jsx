import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import UserDataFetcher from './UserDataFetcher';

function FolderListComponent({ folders }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    const [userDepartment, setUserDepartment] = useState(null);

    useEffect(() => {
        if (user && user.department) {
            setUserDepartment(user.department);
            console.log(user.department);
        }
        if (user && user.isAdmin) {
            setAdmin(user.isAdmin);
        }
    }, [user]);

    return (
        <div className="folder-list-container">
            <UserDataFetcher setUser={setUser} setAdmin={setAdmin} />
            {folders.map(folder => (
                // Render folder link if user is admin or user department matches folder_name or if folder_name is "Common"
                (isAdmin || userDepartment === folder.folder_name || folder.folder_name === "Common") && (
                    <Link
                        key={folder.id}
                        to={`/main/dashboard/${folder.folder_name}/${folder.id}`}
                        className="folder-card"
                    >
                        <div className="folder-link">
                            {folder.folder_name}
                        </div>
                    </Link>
                )
            ))}
        </div>
    );
}

export default FolderListComponent;
