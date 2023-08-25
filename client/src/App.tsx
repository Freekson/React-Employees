import React from "react";
import { Route, Routes } from "react-router-dom";

import { Path } from "./paths";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={Path.home} element={<h1>Hello world</h1>} />
        <Route path={Path.login} element={<Login />} />
        <Route path={Path.register} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
