import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Farmer from "./components/Farmer";
import Customer from "./components/Customer";
import Middleware from "./components/Middleware";
import OrderDetails from "./components/OrderDetails"; // Import the new component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/middleware" element={<Middleware />} />
        <Route path="/order-details" element={<OrderDetails />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;