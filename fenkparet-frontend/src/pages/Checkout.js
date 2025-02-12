import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = ({ cartItems, setCartItems, orders, setOrders }) => {
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (confirmationNumber.trim() === "") {
      alert("Please enter a confirmation number.");
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      items: cartItems,
      total: cartItems.reduce((total, item) => total + parseFloat(item.price.replace("$", "")), 0),
      confirmationNumber,
      status: "Pending Verification",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
    };

    setOrders([...orders, newOrder]);
    setCartItems([]);
    navigate("/order-confirmation");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <p>Enter your confirmation number below:</p>
      <input
        type="text"
        placeholder="Enter confirmation number"
        value={confirmationNumber}
        onChange={(e) => setConfirmationNumber(e.target.value)}
        className="confirmation-input"
      />
      <button onClick={handleCheckout} className="confirm-btn">Submit Order</button>
    </div>
  );
};

export default Checkout;
