import React, {useState} from "react";


function FolderForm({ onCreateFolder, parentId }) {
    const [folderName, setFolderName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onCreateFolder(folderName, parentId); // Pass parentId to handleCreateFolder
      setFolderName('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
        />
        <button type="submit">Create Folder</button>
      </form>
    );
  }


  export default FolderForm;