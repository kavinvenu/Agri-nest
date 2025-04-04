import React, { useEffect, useState } from "react";

const Middleware = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index}>
            <h2>Product: {order.productId.name}</h2>
            <p>Customer: {order.customerName}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Status: {order.status}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No orders available at the moment.</p>
      )}
    </div>
  );
};

export default Middleware;