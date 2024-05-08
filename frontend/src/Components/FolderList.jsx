// FolderList.jsx
import React, { useState, useEffect } from 'react';


function FolderList() {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/folders')
      .then(response => response.json())
      .then(data => {
        setFolders(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCreateFolder = (e) => {
    e.preventDefault();
    fetch('/api/folders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newFolderName }),
    })
    .then(response => response.json())
    .then(data => {
      setFolders(prevFolders => [...prevFolders, data]); // Assuming data contains the newly created folder
      setNewFolderName('');
    })
    .catch(error => setError(error));
  };


  return (
    <div>
      <form onSubmit={handleCreateFolder}>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="Enter folder name"
        />
        <button type="submit">Create Folder</button>
      </form>
    </div>
  );
}

export default FolderList;
