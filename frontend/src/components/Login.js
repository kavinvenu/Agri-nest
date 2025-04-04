import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      alert("Login successful!");
      if (data.role === "Farmer") {
        navigate("/farmer");
      } else if (data.role === "Customer") {
        navigate("/customer");
      } else if (data.role === "Middleware") {
        navigate("/middleware");
      }
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Login</h1>
      <div className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-success w-100" onClick={login}>
          Login
        </button>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
