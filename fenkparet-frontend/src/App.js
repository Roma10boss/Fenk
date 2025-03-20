import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminOrders from "./pages/AdminOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
// import OrderConfirmation from "./pages/OrderConfirmation";

// Components
import Navbar from "./components/Layout/Navbar";
import SignInSignUp from "./components/Auth/SignInSignUp";

// CSS
import "./App.css";
import "./pages/AdminDashboard.css";

function App() {
  const [cartItems, setCartItems] = useState([]); // 🛒 Cart state
  const [orders, setOrders] = useState([]); // 📦 Orders state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (token) {
      setIsAuthenticated(true);
      if (user.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar cartItems={cartItems} />
        <div className="main-content">
          <div className="page-container">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path="/auth" element={<SignInSignUp />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route 
                path="/checkout" 
                element={<Checkout cartItems={cartItems} setCartItems={setCartItems} orders={orders} setOrders={setOrders} />} 
              />
              {/* <Route path="/order-confirmation" element={<OrderConfirmation />} /> */}
              <Route path="/contact" element={<ContactUs />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={isAdmin ? <AdminDashboard orders={orders} setOrders={setOrders} /> : <AdminLogin />} 
              />
              <Route 
                path="/admin/orders" 
                element={isAdmin ? <AdminOrders orders={orders} setOrders={setOrders} /> : <AdminLogin />} 
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;