import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import FolderForm from "./FolderForm";

function FolderPage() {
    const { folderId } = useParams();
    const [folder, setFolder] = useState(null);
    const [subfolders, setSubfolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`/api/folders/${folderId}`)
            .then(response => response.json())
            .then(data => {
                setFolder(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        fetch(`/api/folders/${folderId}/subfolders`)
            .then(response => response.json())
            .then(data => {
                setSubfolders(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [folderId]);

    const handleCreateFolder = (folderName, parentId) => {
        fetch('/api/folders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: folderName, parentId: parentId }), // Pass parent folder ID
        })
        .then(response => response.json())
        .then(data => {
            // Update state or perform any necessary actions
            console.log('Folder created:', data);
            // Refresh subfolder data after creating the new folder
            setSubfolders(prevSubfolders => [...prevSubfolders, data]);
        })
        .catch(error => console.error('Error creating folder:', error));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>{folder ? folder.folder_name : 'Folder Not Found'}</h2>
            {/* Folder form inside the folder page */}
            <FolderForm onCreateFolder={handleCreateFolder} parentId={folder ? folder.id : null} /> {/* Pass folder ID */}
            {/* Display subfolders */}
            {folder && folder.parent_id === null && (
                <div>
                    <h3>Subfolders:</h3>
                    <ul>
                        {subfolders.map((subfolder, index) => (
                            <li key={index}>{subfolder.folder_name}</li>
                        ))}
                    </ul>
                </div>
            )}
            <p>Folder content goes here...</p>
        </div>
    );
}

export default FolderPage;
