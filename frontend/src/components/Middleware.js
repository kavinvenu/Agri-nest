import React, { useEffect, useState } from "react";
import './Middleware.css';

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
    <div className="products-container mt-5">
      <h1 className="text-center text-success mb-4">Orders</h1>
      {orders.length > 0 ? (
        <div className="row">
          {orders.map((order, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm product-card">
                <div className="card-body text-center">
                  <h5 className="card-title product-card-title">
                    {order.productId?.name || "Unknown Product"}
                  </h5>
                  <p className="card-text product-card-text">
                    <strong>Customer:</strong> {order.customerName}
                  </p>
                  <p className="card-text product-card-text">
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p className="card-text product-card-text">
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-danger">
          No orders available at the moment.
        </p>
      )}
    </div>
  );
};

export default Middleware;