import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useThemeHook } from "./GlobalComponents/ThemeProvider";
import Header from "./components/Header";
//import { Router } from "@reach/router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import MyAccount from "./Pages/MyAccount";
import AddProduct from "./components/AddProduct";
import Administration from "./Pages/Administration";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/my-account" element={<MyAccount />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/sign" element={<SignIn />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/addProduct" element={<AddProduct />} />
        <Route exact path="/product-details/:productId" element={<ProductDetails />} />

        <Route exact path="/administration" element={<Administration />} />
        <Route exact path="*" element={<MyAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
