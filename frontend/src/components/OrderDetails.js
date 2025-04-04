import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderDetails = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("G-Pay");
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, productPrice } = location.state; // Get productId and productPrice from navigation state

  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          customerName,
          phoneNumber,
          quantity,
          paymentMethod,
          paymentStatus: paymentMethod === "G-Pay" ? "Paid" : "Pending"
        })
      });
      const data = await response.json();
      alert(data.message);
      navigate("/customer"); // Redirect back to the customer page
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <h1>Order Details</h1>
      <input
        type="text"
        placeholder="Your Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />
      <p>Total Cost: ₹{quantity * productPrice}</p> {/* Display total cost */}
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="G-Pay">G-Pay</option>
        <option value="Cash">Cash</option>
      </select>
      <br />
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default OrderDetails;