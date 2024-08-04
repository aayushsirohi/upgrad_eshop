import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import {
  notifyfailure,
  notifycatch,
  notifysuccess,
} from "../../common/Toast/toast";
import { TokenVerificationLoggedOut } from "../../common/TokenVerify/tokenVerify";

function Login() {
  const navigate = useNavigate();

  React.useEffect(() => {
    TokenVerificationLoggedOut();
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [userRoles, setUserRoles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.username || !formData.password) {
      alert("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        formData
      );

      if (response.status === 200) {
        const token = response.headers["x-auth-token"]; // Get token from the x-auth-token header
        const roles = response.data.roles; // Get user roles from the response data
        localStorage.setItem("token", token);
        localStorage.setItem("userRoles", JSON.stringify(roles));

        notifysuccess("Login Successful");
        navigate("/products");
      } else {
        notifyfailure("Login failed");
      }
    } catch (error) {
      notifycatch("An error occurred");
    }
  };

  return (
    <div className="login-container">
      <LockIcon sx={{ color: "#e4007c" }}></LockIcon>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" background-color="#3f51b5">
          Sign In
        </button>
      </form>
      <br /> <br />
      <p>
        Dont have an account? <a href="/signup"> Signup</a>
      </p>
    </div>
  );
}

export default Login;
