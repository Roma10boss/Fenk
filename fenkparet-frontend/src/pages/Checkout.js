import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = ({ cartItems, setCartItems, orders, setOrders }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    confirmationCode: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // Step 1: Customer Info, Step 2: Order Review & Confirmation

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price;
  }, 0);
  
  const shipping = 10.00; // Fixed shipping cost
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.confirmationCode.trim()) {
      newErrors.confirmationCode = "Confirmation code is required";
    } else if (formData.confirmationCode.length < 10) {
      newErrors.confirmationCode = "Confirmation code must be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    const stepErrors = validateStep1();
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    setStep(2);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const stepErrors = validateStep2();
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    // Create new order
    const newOrder = {
      id: orders.length + 1,
      items: cartItems,
      customer: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
      total: total,
      subtotal: subtotal,
      shipping: shipping,
      confirmationCode: formData.confirmationCode,
      status: "Pending Verification",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
    };

    // Add to orders and clear cart
    setOrders([...orders, newOrder]);
    localStorage.setItem("latestOrder", JSON.stringify(newOrder));
    setCartItems([]);
    
    navigate("/order-confirmation");
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="empty-cart-message">
          <p>Your cart is empty. Please add some items before checking out.</p>
          <button onClick={() => navigate("/")} className="continue-shopping-btn">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      {/* Checkout Progress */}
      <div className="checkout-progress">
        <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <div className="step-label">Customer Information</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <div className="step-label">Review & Confirm</div>
        </div>
      </div>
      
      {/* Step 1: Customer Information */}
      {step === 1 && (
        <div className="checkout-form-container">
          <form onSubmit={handleSubmitStep1}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name<span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email<span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address<span className="required">*</span></label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "input-error" : ""}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City<span className="required">*</span></label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? "input-error" : ""}
                />
                {errors.city && <p className="error-text">{errors.city}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code<span className="required">*</span></label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={errors.postalCode ? "input-error" : ""}
                />
                {errors.postalCode && <p className="error-text">{errors.postalCode}</p>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">Country<span className="required">*</span></label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={errors.country ? "input-error" : ""}
                />
                {errors.country && <p className="error-text">{errors.country}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="button" onClick={() => navigate("/cart")} className="back-btn">Back to Cart</button>
              <button type="submit" className="continue-btn">Continue</button>
            </div>
          </form>
        </div>
      )}
      
      {/* Step 2: Review & Confirm */}
      {step === 2 && (
        <div className="checkout-form-container">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="cart-items-summary">
              {cartItems.map((item) => (
                <div key={item._id} className="summary-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Confirmation Code Form */}
          <div className="confirmation-code-section">
            <h2>Confirmation Code</h2>
            <p className="code-info">Please enter your confirmation code to complete your order. This code will be verified by our team before processing.</p>
            
            <form onSubmit={handleSubmitOrder}>
              <div className="form-group">
                <label htmlFor="confirmationCode">Confirmation Code<span className="required">*</span></label>
                <input
                  type="text"
                  id="confirmationCode"
                  name="confirmationCode"
                  value={formData.confirmationCode}
                  onChange={handleChange}
                  placeholder="Enter your confirmation code"
                  className={errors.confirmationCode ? "input-error" : ""}
                />
                {errors.confirmationCode && <p className="error-text">{errors.confirmationCode}</p>}
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={handleBack} className="back-btn">Back</button>
                <button type="submit" className="place-order-btn">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;