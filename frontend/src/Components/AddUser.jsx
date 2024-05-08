import React from "react";
import AccessHeader from "./AccessHeader";
import EmployeeRegistrationForm from "./EmployeeForm";


function AddUser() {
    return (    
    <div className="admin-access-main">
        <div className="admin-access-header">
            <AccessHeader />
        </div>
        <div className="registration-form">
            <h3 className="reg-text">Employee Registration</h3>
            <EmployeeRegistrationForm />
        </div>
    </div>
 )
}

export default AddUser;