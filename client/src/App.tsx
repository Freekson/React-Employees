import React from "react";
import { Route, Routes } from "react-router-dom";

import { Path } from "./paths";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import "./App.scss";
import { Employees } from "./pages/employees";
import { AddEmployee } from "./pages/addEmployee";
import { Status } from "./pages/status";
import { Employee } from "./pages/employee";
import { EditEmployee } from "./pages/editEmployee";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={Path.home} element={<Employees />} />
        <Route path={Path.employeeAdd} element={<AddEmployee />} />
        <Route path={Path.status + "/:status"} element={<Status />} />
        <Route path={Path.employee + "/:id"} element={<Employee />} />
        <Route path={Path.employeeEdit + "/:id"} element={<EditEmployee />} />
        <Route path={Path.login} element={<Login />} />
        <Route path={Path.register} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
