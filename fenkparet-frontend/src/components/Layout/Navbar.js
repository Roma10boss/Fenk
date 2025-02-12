import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ cartItems }) => {
  const location = useLocation();
  const path = location.pathname;

  // Hide navbar ONLY on /admin/dashboard
  if (path.startsWith("/admin/dashboard")) return null;

  return (
    <nav className="navbar">
      <div className="navbar-center">
        {path !== "/" && <Link to="/" className="nav-link">Home</Link>}
        {path !== "/contact" && <Link to="/contact" className="nav-link">Contact</Link>}
        {path !== "/about" && <Link to="/about" className="nav-link">About Us</Link>}
      </div>
      <div className="navbar-right">
        {path !== "/cart" && (
          <Link to="/cart" className="nav-link cart-link">
            <FiShoppingCart className="nav-icon" />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </Link>
        )}
        {path !== "/auth" && (
          <Link to="/auth" className="nav-link">
            <FiUser className="nav-icon" /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
