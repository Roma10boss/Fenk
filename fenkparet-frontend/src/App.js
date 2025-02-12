import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Layout/Navbar";
import SignInSignUp from "./components/Auth/SignInSignUp";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import "./pages/AdminDashboard.css";


function App() {
  const [cartItems, setCartItems] = useState([]); // 🛒 Cart state
  const [orders, setOrders] = useState([]); // 📦 Orders state

  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/auth" element={<SignInSignUp />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} orders={orders} setOrders={setOrders} />} />
        <Route path="/admin/orders" element={<AdminOrders orders={orders} setOrders={setOrders} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard orders={orders} setOrders={setOrders} />} />
      </Routes>
    </Router>
  );
}

export default App;
