import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import TaskHeader from './TaskHeader';
import '../App.css';
import UserDataFetcher from './UserDataFetcher';

function MyTask() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [fileObject, setFileObject] = useState(null); // State for file object
  const [fileFormData, setFileFormData] = useState(null); // State for FormData
  const [deadline, setDeadline] = useState('');
  const [shareWith, setShareWith] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setFolders(data);
        console.log(data);
      })
      .catch((error) => {
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('User not found');
      return; // Exit function if user is null
    }

    const formData = new FormData();
    formData.append('shareWith_id', shareWith);
    formData.append('user_id', user.user_id);
    formData.append('folder_id', user.department_id);
    formData.append('title', title);
    formData.append('details', details);
    if (fileObject) {
      formData.append('file', fileObject);
    }
    formData.append('deadline', deadline);

    fetch('/api/taskcreate', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('File uploaded successfully:', data);
        }
      })

    // Reset form fields
    setTitle('');
    setDetails('');
    setFileObject(null);
    setDeadline('');
    setShareWith('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Update file object state
      setFileObject(selectedFile);
      // Update FormData state
      const formData = new FormData();
      formData.append('file', selectedFile);
      setFileFormData(formData);
    }
  };

  return (
    <div className="admin-access-main">
      <UserDataFetcher setUser={setUser} setAdmin={setAdmin} />
      <div className="admin-access-header">
        <TaskHeader />
      </div>
      {user && ( // Render form only if user exists
        <div className='shared-container'>
            <h3>Create New Task</h3>
          <Form onSubmit={handleSubmit} className="p-3">
            <Row className="mb-3">
              <Col sm={3}>
                <Form.Label>Task Title</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <Form.Label>Task Details</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter task details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <Form.Label>Deadline</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  type="datetime-local"
                  value={deadline}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <Form.Label>Attach File</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  type="file"
                  onChange={handleFileChange} // Handle file change
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={3}>
                <Form.Label>Share With</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  value={shareWith}
                  onChange={(e) => setShareWith(e.target.value)}
                >
                  <option value="">Select...</option>
                  {folders
                    .filter(employee => employee.user_id !== user.user_id)
                    .map(employee => (
                      <option key={employee.user_id} value={employee.user_id}>
                        {`${employee.last_name}, ${employee.first_name}, (${employee.department})`}
                      </option>
                    ))}
                </Form.Control>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Create Task
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default MyTask;
