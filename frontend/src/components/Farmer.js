import React, { useState } from "react";
import './Farmer.css';

const Farmer = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: null,
  });

  const uploadProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("quantity", product.quantity);
    formData.append("price", product.price);
    formData.append("image", product.image);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      // Reset the form fields to empty
      setProduct({
        name: "",
        quantity: "",
        price: "",
        image: null,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Upload Product</h1>
      <form
        onSubmit={uploadProduct}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            value={product.name} // Bind value to state
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter quantity"
            value={product.quantity} // Bind value to state
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            value={product.price} // Bind value to state
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default Farmer;