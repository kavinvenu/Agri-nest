import React, { useState } from "react";

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
  };

  return (
    <div>
      <h1>Upload Product</h1>
      <form onSubmit={uploadProduct}>
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />
        <br />
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) =>
            setProduct({ ...product, quantity: e.target.value })
          }
        />
        <br />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
        />
        <br />
        <input
          type="file"
          onChange={(e) =>
            setProduct({ ...product, image: e.target.files[0] })
          }
        />
        <br />
        <button type="submit">Submit Product</button>
      </form>
    </div>
  );
};

export default Farmer;