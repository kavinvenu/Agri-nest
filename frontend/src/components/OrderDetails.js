import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './OrderDetail.css';

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const pricePerUnit = product?.price || 0;
  const totalPrice = quantity * pricePerUnit;

  const handleNext = () => {
    if (!customerName || !phoneNumber || !address || quantity <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    navigate("/selectLocation", {
      state: {
        customerName,
        phoneNumber,
        address,
        quantity,
        totalPrice,
        paymentMethod,
        product, // Pass product info to next page
      }
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-4">Order Details</h1>
      <div className="card mx-auto shadow-sm" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <p className="mb-1"><strong>Price per Unit:</strong> ₹{pricePerUnit}</p>
              <p><strong>Total Price:</strong> ₹{totalPrice}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="G-Pay">G-Pay</option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={handleNext}
            >
              Select Location
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;