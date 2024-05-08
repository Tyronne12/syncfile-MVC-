import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import UserDataFetcher from "./UserDataFetcher";
import profilepic20 from "../Assets/Images/profile20.jpg";

function Profile() {
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(user ? user.password : '');
    const [profilePicture, setProfilePicture] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [issuccessful, setSuccess] = useState(false);
    const [DP, setDP] = useState();

  
 
    console.log(user);

    useEffect(() => {
        if (user) {
            const fileUrl = `http://localhost:3001/${user.profile_filepath}`;
            setDP(fileUrl);
        }
    }, [user]);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic here to upload profile picture and change password
        // You can use FormData to send the profile picture and password to the server
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('password', newPassword);
        formData.append('user_id', user.user_id);
    
        // Example fetch request to upload profile picture and change password
        fetch('/api/changesettings', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                setSuccess(true);
                setDP(`http://localhost:3001/${data.profilePicLink}`)
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="shared-container">
            <UserDataFetcher setUser={setUser} setAdmin={setAdmin} />
            {issuccessful && (
                <p className="success-change">Changes on settings saved!</p>
            )}
            <h3>Account Settings</h3>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                    <Col>
                        <Form.Group controlId="formEmployeeId">
                            <Form.Label className="small">User ID/Employee ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user ? user.employee_id : ""}
                                name="employeeId"
                                required
                                readOnly // Add readOnly attribute to lock the input field
                                className="small form-control-custom" // Apply custom class for smaller input fields
                            />
                        </Form.Group>
                        <Form.Group controlId="formJobTitle">
                            <Form.Label className="small">Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user ? user.first_name + " " + user.last_name : ""}
                                name="jobTitle"
                                required
                                readOnly // Add readOnly attribute to lock the input field
                                className="small form-control-custom" // Apply custom class for smaller input fields
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className="small">Department</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user ? user.department : ""}
                                name="email"
                                required
                                readOnly // Add readOnly attribute to lock the input field
                                className="small form-control-custom" // Apply custom class for smaller input fields
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className="small">User Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user ? (user.is_admin === 1 ? "Admin" : "User") : ""}
                                name="email"
                                required
                                readOnly // Add readOnly attribute to lock the input field
                                className="small form-control-custom" // Apply custom class for smaller input fields
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className="small">Password (Click to change)</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="********"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                className="small form-control-custom" // Apply custom class for smaller input fields
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <div className="profile-pic-container-settings">
                            <div className="prof-settings-img">
                                <img className="profile-pic-settings" src={DP} alt="Profile" />
                            </div>
                            <div className="upload-settings-btn">
                                <Form.Group controlId="formProfilePicture">
                                    <Form.Label style={{ fontSize: '14px' }}>Select a picture:</Form.Label>
                                    <Form.Control type="file" onChange={handleProfilePictureChange} accept="image/*" style={{ height: '30px', fontSize: '14px' }} />
                                </Form.Group>
                            </div>
                            <Button variant="primary" type="submit" className="submit-settings-btn">
                                Save
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Profile;
