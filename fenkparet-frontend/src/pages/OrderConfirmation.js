import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    // Get the latest order from localStorage
    // In a real app, this would come from an API
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
    setOrder(latestOrder);
  }, []);

  if (!order) {
    return (
      <div className="confirmation-container">
        <h1 className="confirmation-title">Order Confirmation</h1>
        <div className="confirmation-card">
          <p>No order information found. Please return to the homepage.</p>
          <Link to="/" className="back-btn">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Order Confirmation</h1>
      
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h2>Thank You for Your Order!</h2>
        <p className="order-message">
          Your order has been submitted and is pending verification.
        </p>
        
        <div className="order-details">
          <div className="detail-row">
            <span className="detail-label">Order ID:</span>
            <span className="detail-value">#{order.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Confirmation Number:</span>
            <span className="detail-value">{order.confirmationNumber}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="detail-value status-pending">{order.status}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total:</span>
            <span className="detail-value">${order.total.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Expires:</span>
            <span className="detail-value">{new Date(order.expiresAt).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="order-info">
          <h3>What happens next?</h3>
          <ol>
            <li>Our team will verify your confirmation number.</li>
            <li>Once verified, your order will be processed.</li>
            <li>You will receive an email notification when your order status changes.</li>
            <li>If there are any issues, we will contact you via the email you provided.</li>
          </ol>
        </div>
        
        <div className="button-group">
          <Link to="/" className="back-btn">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;