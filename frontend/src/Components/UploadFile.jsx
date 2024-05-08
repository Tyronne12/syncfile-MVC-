import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileUrl(null); // Reset file URL when a new file is selected
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('File uploaded successfully:', data);
      setFileUrl(`http://localhost:3001/${data.filePath}`);
    })// 
    .catch(error => console.error('Error uploading file:', error));
  };

  return (
    <div>
      <h3>Upload a File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {fileUrl && ( // Render file link only if fileUrl is available
        <div>
          <h4>Uploaded File</h4>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>
        </div>
      )}
    </div>
  );
}

export default App;
