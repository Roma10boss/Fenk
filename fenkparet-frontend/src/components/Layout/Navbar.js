import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ cartItems }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          FENKPARET
        </Link>

        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          <Link to="/auth" className="nav-link">Sign In / Sign Up</Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-icon-link">
            <div className="cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </div>
          </Link>
        </div>

        <div className="menu-icon" onClick={toggleNav}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isNavOpen ? 'active' : ''}`}>
          <Link to="/" className="mobile-nav-link" onClick={() => setIsNavOpen(false)}>Home</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={() => setIsNavOpen(false)}>Contact Us</Link>
          <Link to="/auth" className="mobile-nav-link" onClick={() => setIsNavOpen(false)}>Sign In / Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;