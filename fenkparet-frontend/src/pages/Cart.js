import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems, setCartItems }) => {
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Handle price ranges like "$30 - $40" by taking the first number
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + price;
    }, 0);
  };

  const shipping = 10.00; // Fixed shipping cost
  const subtotal = calculateTotal();
  const total = subtotal + shipping;

  return (
    <div className="cart-section">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="shop-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{item.price}</p>
                  <p className="item-category">Category: {item.category}</p>
                </div>
                
                <div className="item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-item">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            
            <div className="summary-item total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            
            <Link to="/" className="continue-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;