import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const placeOrder = (product) => {
    navigate("/order-details", { state: { product } });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-4">Available Products</h1>
      {products.length > 0 ? (
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Quantity: {product.quantity}</p>
                  <p className="card-text">Price: ₹{product.price}</p>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => placeOrder(product)}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-danger">No products available at the moment.</p>
      )}
    </div>
  );
};

export default Customer;