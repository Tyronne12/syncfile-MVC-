import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';
import AccessHeader from "./AccessHeader";

function CreateDepartment() {
    const [folderName, setFolderName] = useState('');
    const [editFolderName, setEditFolderName] = useState('');
    const [error, setError] = useState(null);
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUploaded, setUpload] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFolderId, setEditFolderId] = useState(null);

    const handleCloseAdd = () => setShowAddModal(false);
    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setEditFolderId(null);
        setEditFolderName('');
    };
    const handleShowEdit = (folderId, folderName) => {
        setEditFolderId(folderId);
        setEditFolderName(folderName);
        setShowEditModal(true);
    };

    useEffect(() => {
        fetch("/api/folders")
            .then((response) => response.json())
            .then((data) => {
                setFolders(data);
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/folders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: folderName }),
        })
        .then(response => response.json())
        .then(data => {
            // Assuming data contains the newly created folder
            setFolderName('');
            setUpload(true);
        })
        .catch(error => setError(error));
    };

    const handleEditSubmit = () => {
        // Send the edited folder name to the backend
        fetch(`/api/update_folders/${editFolderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editFolderName }),
        })
        .then(response => response.json())
        .then(data => {
            // Assuming data contains the updated folder information
            // Update the folders state with the new data
            setFolders(folders.map(folder => {
                if (folder.id === editFolderId) {
                    return { ...folder, folder_name: editFolderName };
                }
                return folder;
            }));
            handleCloseEdit();
        })
        .catch(error => setError(error));
    };

    const handleDelete = (folderId) => {
        fetch(`/api/folders/${folderId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // If the deletion was successful, update the UI
            // Remove the deleted folder from the state
            setFolders(folders.filter(folder => folder.id !== folderId));
        })
        .catch(error => console.error('Error deleting folder:', error));
    };

    return (    
        <div className="admin-access-main">
            <Modal show={showAddModal} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Department Name"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                required
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {isUploaded && (
                        <h4 className='success-upload'>Department Successfully Created!</h4>
                    )}
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Department Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="editFolderName">
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editFolderName}
                                onChange={(e) => setEditFolderName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>Cancel</Button>
                    <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            
            <div className="admin-access-header">
                <AccessHeader />
                <div className='add-container'>
                    <Button variant="success" className='add-btn' onClick={handleShowAdd}>+ Add New</Button>
                </div>
            </div>

            <div className='shared-container'>
                <Table striped bordered className="table-smaller-font">
                    <thead>
                        <tr>
                            <th className='dep-th'>Folder Name</th>
                            <th className='dep-th'>Members</th>
                            <th className='dep-th'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {folders.map(folder => (
                            <tr key={folder.id} className="department-row">
                                <td className='department-name'>{folder.folder_name}</td>
                                <td className='department-name'>{folder.num_employees}</td>
                                <td className='department-action'>
                                    <Button variant="primary" size="sm" className="btn" onClick={() => handleShowEdit(folder.id, folder.folder_name)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(folder.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default CreateDepartment;
