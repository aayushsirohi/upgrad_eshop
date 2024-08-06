import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./common/Header/Header";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import ProductList from "./components/ProductList/ProductList";
import AddProduct from "./components/AddProduct/AddProduct";
import ModifyProduct from "./components/ModifyProduct/ModifyProduct";
import ProductDetail from "./components/ProductDetail/ProductDetail";

import CreateOrder from "./components/CreateOrder/CreateOrder";
import Shipping from "./components/Shipping/Shipping";
import ConfirmAndReview from "./components/ConfirmAndReview/ConfirmAndReview";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ToastContainer position="top-right" autoClose={2000} />
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/products" element={<ProductList />} />
      <Route path="/AddProductPage" element={<AddProduct />} />
      <Route path="/ModifyProduct/:id" element={<ModifyProduct />} />
      <Route path="/ProductDetailsPage/:id" element={<ProductDetail />} />

      <Route path="/CreateOrderPage" element={<CreateOrder />} />
      <Route path="/CreateOrderPage/:id" element={<CreateOrder />} />
      <Route path="/ShippingAddressStep" element={<Shipping />} />
      <Route path="/ReviewAndConfirmStep" element={<ConfirmAndReview />} />
    </Routes>
  </Router>
);
