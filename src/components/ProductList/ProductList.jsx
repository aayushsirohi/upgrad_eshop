import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TokenVerificationLoggedin } from "../../common/TokenVerify/tokenVerify";
import {
  notifycatch,
  notifyfailure,
  notifysuccess,
} from "../../common/Toast/toast";

function ProductList() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    TokenVerificationLoggedin();

    fetchCategories();
    fetchProductDetails();
    const userRoles = JSON.parse(localStorage.getItem("userRoles"));
    setIsAdmin(userRoles && userRoles.includes("ADMIN"));
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/products/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        notifyfailure("Failed to fetch categories");
      }
    } catch (error) {
      notifycatch("An error occurred");
    }
  };

  const fetchProductDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const categoryParam = selectedCategory
        ? `category=${selectedCategory}&`
        : "";
      const sortParam = sortOption !== "default" ? `sort=${sortOption}` : "";

      const response = await fetch(
        `http://localhost:8080/api/products?${categoryParam}${sortParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOriginalData(data);
        setData(data);
      } else {
        notifyfailure("Failed to fetch product details");
      }
    } catch (error) {
      notifycatch("An error occurred");
    }
  };

  const handleCategoryChange = (event, newCategoryIndex) => {
    const newCategory =
      newCategoryIndex === 0 ? "" : categories[newCategoryIndex - 1];

    const newData =
      newCategory === ""
        ? originalData
        : originalData.filter((item) => item.category === newCategory);

    setSelectedCategory(newCategory);
    setSelectedCategoryIndex(newCategoryIndex);
    const sortedData = sortData(newData, sortOption);
    setData(sortedData);
  };

  const sortData = (data, keyString) => {
    const temp = [...data];
    if (keyString !== "default") {
      temp.sort((a, b) => {
        if (keyString === "priceHighToLow") {
          return b.price - a.price;
        } else if (keyString === "priceLowToHigh") {
          return a.price - b.price;
        }
        return 0;
      });
    }
    return temp;
  };

  const handleSortChange = (event) => {
    const keyString = event.target.value;
    const sortedData = sortData(data, keyString);
    setData(sortedData);
    setSortOption(keyString);
  };

  const handleBuyButtonClick = (productId) => {
    navigate(`/CreateOrderPage/${productId}`);
  };

  const handleEditButtonClick = (productId) => {
    navigate(`/ModifyProduct/${productId}`);
  };

  const handleDeleteButtonClick = async (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!isConfirmed) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": token,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedProducts = data.filter(
          (product) => product.id !== productId
        );
        const updatedOriginalData = originalData.filter(
          (product) => product.id !== productId
        );
        setData(updatedProducts);
        setOriginalData(updatedOriginalData);

        notifysuccess("Product deleted successfully");
      } else {
        notifyfailure("Failed to delete product");
      }
    } catch (error) {
      notifycatch("An error occurred");
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: "80px", paddingBottom: "40px" }}
      >
        <ToggleButtonGroup
          value={selectedCategoryIndex}
          exclusive
          onChange={handleCategoryChange}
          aria-label="Category"
        >
          <ToggleButton value={0} aria-label="All">
            All
          </ToggleButton>
          {categories.map((category, index) => (
            <ToggleButton
              key={category}
              value={index + 1}
              aria-label={category}
              style={{
                backgroundColor:
                  selectedCategoryIndex === index + 1 ? "lightblue" : "inherit",
              }}
            >
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <FormControl variant="outlined" style={{ width: "17%" }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOption} onChange={handleSortChange} label="Sort By">
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="priceHighToLow">Price High to Low</MenuItem>
          <MenuItem value="priceLowToHigh">Price Low to High</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {data.map((product) => (
          <Card
            key={product.id}
            style={{
              width: "30%",
              marginBottom: "20px",
              position: "relative",
              height: "100%",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={product.imageUrl || "alternate-text-for-accessibility"}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography>{product.description}</Typography>
              <Typography variant="h6">{`Price: Rs ${product.price.toFixed(
                2
              )}`}</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                {isAdmin && (
                  <div style={{ display: "inline-block" }}>
                    <IconButton
                      onClick={() => handleEditButtonClick(product.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteButtonClick(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => handleBuyButtonClick(product.id)}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default ProductList;
