import React, {useParams} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Main from "./Components/Main";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import AdminAccess from "./Components/AdminAccess";
import Tasks from "./Components/MyTask";
import Home from "./Components/Home";
import DepComponents from "./Components/DepComponents";
import Employees from "./Components/Employees";
import AddUser from "./Components/AddUser";
import CreateDepartment from "./Components/CreateDepartment";
import ReceivedTask from "./Components/TaskReceived";
import SharedTask from "./Components/TaskShared";
import CreateTask from "./Components/TaskCreate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />}>
          <Route index element={<Dashboard/>} />
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="/main/dashboard/:folderName/:folderID" element={<DepComponents />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="adminaccess" element={<Employees />} />
          <Route path="adminaccess/employees" element={<Employees />} />
          <Route path="adminaccess/add_user" element={<AddUser />} />
          <Route path="adminaccess/add_department" element={<CreateDepartment />} />
          <Route path="tasks" element={<CreateTask />} />
          <Route path="tasks/received" element={<ReceivedTask />} />
          <Route path="tasks/shared" element={<SharedTask />} />
          <Route path="tasks/create" element={<CreateTask />} />
          <Route path="adminaccess/add_user" element={<AddUser />} />
          <Route path="adminaccess/add_department" element={<CreateDepartment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
