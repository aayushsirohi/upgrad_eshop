import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { notifycatch, notifyfailure } from "../../common/Toast/toast";
import { TokenVerificationLoggedin } from "../../common/TokenVerify/tokenVerify";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    TokenVerificationLoggedin();
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        headers: {
          "x-auth-token": token,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        localStorage.setItem(
          "productDetails",
          JSON.stringify({
            id: data.id,
            name: data.name,
            category: data.category,
            quantity: 1,
            price: data.price,
          })
        );

        navigate(`/CreateOrderPage/${data.id}`);
      } else {
        notifyfailure("Failed to fetch product details");
      }
    } catch (error) {
      notifycatch("An error occurred");
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Card
          style={{
            width: "calc(100% /4)",
            marginTop: "1px",
            marginBottom: "1px",
          }}
        >
          <CardMedia
            component="img"
            height="260"
            image={product.imageUrl || "alternate-text-for-accessibility"}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography>Category: {product.category}</Typography>
            <Typography>Price: Rs {product.price}</Typography>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default ProductDetail;
