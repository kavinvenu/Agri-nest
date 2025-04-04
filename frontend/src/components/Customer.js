import React, { useEffect, useState } from "react";

const Customer = () => {
  const [products, setProducts] = useState([]);
  const [customerName] = useState("Test Customer"); // Replace with logged-in customer's name

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const placeOrder = async (productId) => {
    const quantity = prompt("Enter quantity:");
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, customerName, quantity }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      
      <h1>Available Products</h1>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index}>
            <h2>{product.name}</h2>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ₹{product.price}</p>
            <img src={product.image} alt={product.name} width="150" />
            <br />
            <button onClick={() => placeOrder(product._id)}>Order</button>
            <hr />
          </div>
        ))
      ) : (
        <p>No products available at the moment.</p>
      )}
    </div>
  );
};

export default Customer;