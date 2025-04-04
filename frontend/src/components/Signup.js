import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="Farmer">Farmer</option>
        <option value="Customer">Customer</option>
        <option value="Middleware">Middleware</option>
      </select>
      <br />
      <button onClick={register}>Signup</button>
    </div>
  );
};

export default Signup;