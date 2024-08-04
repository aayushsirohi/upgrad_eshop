import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./common/Header/Header";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ToastContainer position="top-right" autoClose={2000} />
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
);
