import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenVerificationLoggedin } from "../../common/TokenVerify/tokenVerify";
import {
  notifycatch,
  notifyfailure,
  notifysuccess,
} from "../../common/Toast/toast";

function AddProduct() {
  const navigate = useNavigate();

  React.useEffect(() => {
    TokenVerificationLoggedin();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    manufacturer: "",
    availableItems: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/products",
        formData,
        {
          headers: {
            "x-auth-token": token,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 201) {
        notifysuccess("Product added successfully");
        navigate("/products");
      } else {
        notifyfailure("Product creation failed");
      }
    } catch (error) {
      notifycatch("An error occurred:", error);
    }
  };

  return (
    <div className="add-product-container" style={{ paddingTop: "110px" }}>
      <h2 className="add-product-heading">Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableItems">Available Items</label>
          <input
            type="number"
            id="availableItems"
            name="availableItems"
            value={formData.availableItems}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="add-product-button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
