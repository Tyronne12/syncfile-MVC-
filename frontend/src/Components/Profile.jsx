import React, {useState, useEffect} from "react";
import { Form, Button, Table, Modal, Row, Col } from 'react-bootstrap';
import UserDataFetcher from "./UserDataFetcher";

function Profile() {
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);

    const formatDate = (dateString) => {
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
      };
    
    console.log(user);

    return (
            <div className="shared-container">
            <UserDataFetcher setUser={setUser} setAdmin={setAdmin} />
            <h3>Personal Information</h3>
  <Row>
    {/* Personal Info */}
    <Col>
      <Form.Group controlId="formFirstName">
        <Form.Label className="small">First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder={ user ? user.first_name: ""}
          name="firstName"
          required
          readOnly // Add readOnly attribute to lock the input field
          className="small form-control-custom" // Apply custom class for smaller input fields
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label className="small">Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder={ user ? user.last_name: ""}
          name="lastName"
          required
          readOnly // Add readOnly attribute to lock the input field
          className="small form-control-custom" // Apply custom class for smaller input fields
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label className="small">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder={ user ? user.email: ""}
          name="email"
          required
          readOnly // Add readOnly attribute to lock the input field
          className="small form-control-custom" // Apply custom class for smaller input fields
        />
      </Form.Group>

      <Form.Group controlId="formPhoneNumber">
        <Form.Label className="small">Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          placeholder={ user ? user.contact: ""}
          required
          readOnly // Add readOnly attribute to lock the input field
          className="small form-control-custom" // Apply custom class for smaller input fields
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label className="small">Gender</Form.Label>
        <Form.Control
          type="text"
          placeholder={ user ? user.gender: ""}
          name="email"
          required
          readOnly // Add readOnly attribute to lock the input field
          className="small form-control-custom" // Apply custom class for smaller input fields
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label className="small">Address</Form.Label>
        <Form.Control
          as="textarea"
          placeholder={ user ? user.address: ""}
          name="address"
          required
          readOnly // Add readOnly attribute to lock the input field
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
          placeholder={ user ? user.employee_id: ""}
          name="employeeId"
          required
          readOnly // Add readOnly attribute to lock the input field
          className="small form-control-custom" // Apply custom class for smaller input fields
        />
      </Form.Group>

      <Form.Group controlId="formJobTitle">
        <Form.Label className="small">Job Title</Form.Label>
        <Form.Control
          type="text"
          placeholder={ user ? user.position: ""}
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
          placeholder={ user ? user.department: ""}
          name="email"
          required
          readOnly // Add readOnly attribute to lock the input field
          className="small form-control-custom" // Apply custom class for smaller input fields
        />
      </Form.Group>

      <Form.Group controlId="formStartDate">
        <Form.Label className="small">Date Hired</Form.Label>
        <Form.Control
          type="text"
          placeholder={user ? formatDate(user.date_hired) : ""}
          name="startDate"
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
    </Col>
  </Row>

  </div>
    );
}

export default Profile;