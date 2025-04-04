import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Farmer");
  const navigate = useNavigate();

  const register = async () => {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await response.json();
    alert(data.message);
    if (data.message === "User registered successfully!") {
      navigate("/");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Signup</h1>
      <div className="p-4 border rounded shadow-sm bg-light mx-auto" style={{ maxWidth: "400px" }}>
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
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Farmer">Farmer</option>
            <option value="Customer">Customer</option>
            <option value="Middleware">Middleware</option>
          </select>
        </div>
        <button className="btn btn-success w-100" onClick={register}>
          Signup
        </button>
        <div className="text-center mt-3">
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
