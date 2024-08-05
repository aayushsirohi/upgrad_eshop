import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button } from "@mui/material";
import { TokenVerificationLoggedin } from "../../common/TokenVerify/tokenVerify";
import {
  notifycatch,
  notifyfailure,
  notifysuccess,
} from "../../common/Toast/toast";

function ModifyProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    TokenVerificationLoggedin();
  }, []);

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    availableItems: "",
    imageUrl: "",
    category: "",
    manufacturer: "",
  });

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          headers: {
            "x-auth-token": token,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const productDetails = await response.json();
        setProduct(productDetails);
      } else {
        notifyfailure("Failed to fetch product details");
      }
    } catch (error) {
      notifycatch("An error occurred:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveButtonClick = async () => {
    try {
      // Make an API call to update the product details based on the `id`
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT", // Use PUT for updating the product
        headers: {
          "x-auth-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        notifysuccess("Product modified successfully");
        navigate("/products");
      } else {
        notifyfailure("Failed to update product");
      }
    } catch (error) {
      notifycatch("An error occurred:", error);
    }
  };

  return (
    <Container>
      <div className="add-product-container" style={{ paddingTop: "110px" }}>
        <h2 className="add-product-heading">Modify Product</h2>
        <form>
          <div className="form-group">
            <TextField
              name="name"
              label="Name"
              value={product.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              name="description"
              label="Description"
              value={product.description}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              name="price"
              label="Price"
              value={product.price}
              onChange={handleInputChange}
              type="number"
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              name="availableItems"
              label="Available Items"
              value={product.availableItems}
              onChange={handleInputChange}
              type="number"
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              name="imageUrl"
              label="Image URL"
              value={product.imageUrl}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              name="category"
              label="Category"
              value={product.category}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              name="manufacturer"
              label="Manufacturer"
              value={product.manufacturer}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <Button variant="contained" onClick={handleSaveButtonClick} fullWidth>
            Modify
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default ModifyProduct;
