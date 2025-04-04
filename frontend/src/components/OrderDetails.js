import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // Get product details from state

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const pricePerUnit = product?.price || 0; // Default price if product is not passed
  const totalPrice = quantity * pricePerUnit;

  const handleOrder = async () => {
    if (!customerName || !phoneNumber || !address || quantity <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product?._id,
          customerName,
          phoneNumber,
          address,
          quantity,
          totalPrice,
          paymentMethod,
        }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        navigate("/middleware"); // Redirect to Middleware page after successful order
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-4">Order Details</h1>
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <div className="mb-3">
            <label>Customer Name</label>
            <input
              type="text"
              className="form-control"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <textarea
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <p>
              <strong>Price per Unit:</strong> ₹{pricePerUnit}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{totalPrice}
            </p>
          </div>
          <div className="mb-3">
            <label>Payment Method</label>
            <select
              className="form-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="G-Pay">G-Pay</option>
            </select>
          </div>
          <button className="btn btn-success w-100" onClick={handleOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;