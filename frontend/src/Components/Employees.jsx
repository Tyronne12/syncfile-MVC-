import React, {useState, useEffect} from "react";
import AccessHeader from "./AccessHeader";
import { Form, Button, Table, Modal } from 'react-bootstrap';


function EmployeesList() {

    const [error, setError] = useState(null);
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
      fetch("/api/users")
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
    


    return (    
    <div className="admin-access-main">
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
    <div className="admin-access-header">
        <AccessHeader />
       <div></div>
    </div>
    <div className='shared-container'>
    <h4>Employees</h4>
                <Table striped bordered className="table-smaller-font">
                    <thead>
                        <tr>
                            <th className='dep-th'>Employee ID</th>
                            <th className='dep-th'>Name</th>
                            <th className='dep-th'>Contact</th>
                            <th className='dep-th'>Email</th>
                            <th className='dep-th'>Position</th>
                            <th className='dep-th'>Department</th>
                            <th className='dep-th'>Date Hired</th>
                            <th className='dep-th'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {folders.map(folder => (
                            <tr key={folder.id} className="department-row">
                                <td className='department-name'>{folder.employee_id}</td>
                                <td className='department-name'>{ `${folder.last_name}, ${folder.first_name}`}</td>
                                <td className='department-name'>{folder.contact}</td>
                                <td className='department-name'>{folder.email}</td>
                                <td className='department-name'>{folder.position}</td>
                                <td className='department-name'>{folder.department}</td>
                                <td className='department-name'>{new Date(folder.date_hired).toISOString().split('T')[0]}</td>
                                <td className='department-action'>
                                    {/* Placeholder for action buttons */}
                                    <Button onClick={handleShow} variant="primary" size="sm" className="btn">Edit</Button>
                                    <Button variant="danger" size="sm">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div></div>
            </div>

 </div>)
}

export default EmployeesList;