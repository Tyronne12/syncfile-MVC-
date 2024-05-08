import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DepFolderHeader from './DepFolderHeader';
import { Button, Table, Modal, Form} from 'react-bootstrap';
import UserDataFetcher from './UserDataFetcher';
import PDF from "../Assets/Images/pdf.png";
import Excel from "../Assets/Images/excel.png";
import Docs from "../Assets/Images/docs2.png";
import PPT from "../Assets/Images/ppt.png";
import TXT from "../Assets/Images/text.png";
import IMG from "../Assets/Images/images.png";
import Others from "../Assets/Images/others.png";
import All from "../Assets/Images/all2.png";

function FolderList() {
  const [isUploadClicked, setUploadModal] = useState(false);
  const { folderName, folderID } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null); // Initialize fileUrl state
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [isUploaded, setUploadStatus] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState('all'); 
  const [show, setShow] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowModal2 = () => setShowModal2(true);

  
// Default selected file type

  const handleFileTypeChange = (fileType) => {
      setSelectedFileType(fileType);
  };
  

  const showUploadModal = () => {
    setUploadModal(true);
  }

  const hideUploadModal = () => {
    setUploadModal(false);
  }


  useEffect(() => {
    // Fetch data from backend when renderOption changes
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/data?option=${selectedFileType}`);
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, [selectedFileType]); 

  console.log(selectedFileType);

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
    formData.append('user_id', user.user_id);
    formData.append('folder_id', folderID);

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if(data){
          console.log('File uploaded successfully:', data);
          setUploadStatus(true);
        }
      })
      .catch(error => console.error('Error uploading file:', error));
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await fetch(`/api/delete/${fileId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted file from the files state
        setFiles(prevFiles => prevFiles.filter(file => file.file_id !== fileId));
        console.log('File deleted successfully');
      } else {
        console.error('Error deleting file:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleFileClick = (file) => {
    const fileUrl = `http://localhost:3001/${file.file_path}`;
    setFileUrl(fileUrl); // Set the file URL when a file is clicked
  };

  return (
    <div className='department-folder'>
      <UserDataFetcher setUser={setUser}/>
      {isUploadClicked && (
        <div className='upload-modal'>
              <div className='upload-modal-header'>
                  <Button className='close-upload-btn' onClick={hideUploadModal}>X</Button>
              </div>
              <div className='upload-container'>
                <div className='up-sub-container'></div>
              </div>
              <div className='upload-container'>
                <div className='up-sub-container'>
                    <h3 className='upload-text'>Upload a File</h3>
                    <div className="custom-file mb-3">
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange} />
                      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
                    </div>
                    {isUploaded &&(
                    <h5 className='success-upload'>Upload Successful!</h5>
                    )}
                </div>
              </div>
        </div>
      )}
      <div className='dep-folder-header'>
      <div className="file-type-tabs">
            <label className="tabs" onClick={() => handleFileTypeChange('all')}>
                <input
                    type="radio"
                    name="fileType"
                    value="all"
                    checked={selectedFileType === 'all'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={All}/></div>
                <p className="access-tab-name">All Files</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('word')}>
                <input
                    type="radio"
                    name="fileType"
                    value="word"
                    checked={selectedFileType === 'word'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={Docs}/></div>
                <p className="access-tab-name">.docs</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('spreadsheet')}>
                <input
                    type="radio"
                    name="fileType"
                    value="spreadsheet"
                    checked={selectedFileType === 'spreadsheet'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={Excel}/></div>
                <p className="access-tab-name">.xlx</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('pdf')}>
                <input
                    type="radio"
                    name="fileType"
                    value="pdf"
                    checked={selectedFileType === 'pdf'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={PDF}/></div>
                <p className="access-tab-name">.pdf</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('powerpoint')}>
                <input
                    type="radio"
                    name="fileType"
                    value="powerpoint"
                    checked={selectedFileType === 'powerpoint'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={PPT}/></div>
                <p className="access-tab-name">.ppt</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('text')}>
                <input
                    type="radio"
                    name="fileType"
                    value="text"
                    checked={selectedFileType === 'text'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={TXT}/></div>
                <p className="access-tab-name">.txt</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('image')}>
                <input
                    type="radio"
                    name="fileType"
                    value="image"
                    checked={selectedFileType === 'image'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={IMG}/></div>
                <p className="access-tab-name">img</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('others')}>
                <input
                    type="radio"
                    name="fileType"
                    value="others"
                    checked={selectedFileType === 'others'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={Others}/></div>
                <p className="access-tab-name">others</p>
            </label>
        </div>
        <div className='add-new-file'>
          <Button variant="success" className='add-file-btn' onClick={() => setShowModal2(true)}>+ Add New File</Button>
        </div>
      </div>
      <div className='shared-container'>
        <Table striped bordered className="table-smaller-font">
          <thead>
            <tr>
              <th className='dep-th'>File Name</th>
              <th className='dep-th'>File Type</th>
              <th className='dep-th'>Created By</th>
              <th className='dep-th'>Department</th>
              <th className='dep-th'>Date Created</th>
              <th className='dep-th'>Last Update</th>
              <th className='dep-th'>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map(folder => {
              if (folder.folder_id === folderID) {
                return (
                  <tr key={folder.file_id} className="department-row">
                    <td className='department-name'>
                      {/* Add onClick event to handle file click */}
                      <Link to={fileUrl} onClick={() => handleFileClick(folder)} className='file-name'>{folder.file_name}</Link>
                    </td>
                    <td className='department-name'>{folder.file_type}</td>
                    <td className='department-name'>{folder.first_name ? folder.first_name.charAt(0) + '. ' + folder.last_name : folder.last_name}</td>
                    <td className='department-name'>{folder.department}</td>
                    <td className='department-name'>{folder.created_at}</td>
                    <td className='department-name'>{folder.updated_at}</td>
                    <td className='department-action'>
                      {/* Placeholder for action buttons */}
                      <Button onClick={handleShow} variant="primary" size="sm" className="btn">Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(folder.file_id)}>Delete</Button>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </Table>
        <div>
      
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModal2}
        onHide={() => setShowModal2(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add New File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='upload-modal-header'>
              </div>
              <div className='upload-container'>
                <div className='up-sub-container'>
                    <h4 className='upload-text'>Upload a File</h4>
                    <div className="custom-file mb-3">
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange} />
                      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
                    </div>
                    {isUploaded &&(
                    <h5 className='success-upload'>Upload Successful!</h5>
                    )}
                </div>
              </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FolderList;
