// EmployeeRegistrationForm.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../App.css'; 

const EmployeeRegistrationForm = () => {

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/folders")
      .then((response) => response.json())
      .then((data) => {
        setFolders(data);
        setLoading(false);

        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    address: '',
    jobTitle: '',
    startDate: '',
    userType: '',
    employeeId: '',
    password: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "department") {
      const [departmentID, departmentName] = value.split(","); // Destructure the value
      setFormData({
        ...formData,
        departmentID, // Assign departmentID
        departmentName, // Assign departmentName
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
    fetch('/api/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((response) => response.json())
    .then((data) =>{
          console.log(data.message);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            gender: '',
            address: '',
            jobTitle: '',
            startDate: '',
            userType: '',
            employeeId: '',
            password: '',
          });        
    });
  };

  return (
    <Form onSubmit={handleSubmit} className='employee-reg-form'>
      <Row>
        {/* Personal Info */}
        <Col>
          <Form.Group controlId="formFirstName">
            <Form.Label className="small">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label className="small">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className="small">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label className="small">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>

          <Form.Group controlId="formGender">
            <Form.Label className="small">Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            >
              <option className='gender-placeholder' value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label className="small">Address</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>
        </Col>

        {/* Employment Info */}
        <Col>
          <Form.Group controlId="formEmployeeId">
            <Form.Label className="small">Employee ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label className="small">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>

          <Form.Group controlId="formJobTitle">
            <Form.Label className="small">Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>

          <Form.Group controlId="formDepartment">
            <Form.Label className="small">Department</Form.Label>
            <Form.Control
              as="select"
              name="department"
              value={`${formData.departmentID},${formData.departmentName}`} // Update here
              onChange={handleChange}
              required
              className="small form-control-custom"
            >
              <option value=""></option>
              {folders.map((department) => (
                <option className='selection' key={department.id} value={`${department.id},${department.folder_name}`}>
                  {department.folder_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formStartDate">
            <Form.Label className="small">Date Hired</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter start date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="small form-control-custom" // Apply custom class for smaller input fields
            />
          </Form.Group>

          <Form.Group controlId="userType">
            <Form.Label className="small">User Type</Form.Label>
            <Form.Control
              as="select"
              name="userType"
              value={formData.salary}
              onChange={handleChange}
              required
              className="small form-control-custom"
            >
              <option value=""></option>
              <option value="1">Admin</option>
              <option value="0">User</option>
              {/* Add more salary options as needed */}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* Submit button */}
      <div className="text-right"> {/* Apply 'text-right' class to align the content to the right */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default EmployeeRegistrationForm;
