import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = ({ cartItems, setCartItems, orders, setOrders }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Customer Info, Step 2: Review & Confirm
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

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + price;
    }, 0);
  };
  
  const subtotal = calculateSubtotal();
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

  const handleNextStep = (e) => {
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

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="checkout-section">
        <h1>Checkout</h1>
        <div className="empty-checkout">
          <p>Your cart is empty. Please add some items before checking out.</p>
          <button onClick={() => navigate("/")} className="return-btn">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-section">
      <h1>Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <div className="step-label">Customer Information</div>
        </div>
        <div className="step-connector"></div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <div className="step-label">Review & Confirm</div>
        </div>
      </div>
      
      <div className="checkout-container">
        {step === 1 ? (
          <div className="customer-info">
            <h2>Customer Information</h2>
            <form onSubmit={handleNextStep}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address <span className="required">*</span></label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "error" : ""}
                />
                {errors.address && <p className="error-message">{errors.address}</p>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City <span className="required">*</span></label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? "error" : ""}
                  />
                  {errors.city && <p className="error-message">{errors.city}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code <span className="required">*</span></label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={errors.postalCode ? "error" : ""}
                  />
                  {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="country">Country <span className="required">*</span></label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={errors.country ? "error" : ""}
                  />
                  {errors.country && <p className="error-message">{errors.country}</p>}
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
              
              <div className="form-actions">
                <button type="button" onClick={() => navigate("/cart")} className="back-btn">
                  Back to Cart
                </button>
                <button type="submit" className="next-btn">
                  Continue
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="review-confirm">
            <div className="order-review">
              <h2>Order Review</h2>
              <div className="order-items">
                {cartItems.map((item, index) => (
                  <div key={index} className="order-item">
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
              
              <div className="order-summary">
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
              </div>
              
              <div className="confirmation-section">
                <h2>Confirmation Code</h2>
                <p>Please enter your confirmation code to complete your order:</p>
                <form onSubmit={handleSubmitOrder}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="confirmationCode"
                      value={formData.confirmationCode}
                      onChange={handleChange}
                      placeholder="Enter confirmation code"
                      className={errors.confirmationCode ? "error" : ""}
                    />
                    {errors.confirmationCode && <p className="error-message">{errors.confirmationCode}</p>}
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" onClick={() => setStep(1)} className="back-btn">
                      Back
                    </button>
                    <button type="submit" className="submit-btn">
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="customer-summary">
              <h2>Customer Information</h2>
              <div className="info-group">
                <h3>Contact</h3>
                <p>{formData.name}</p>
                <p>{formData.email}</p>
                <p>{formData.phone || "No phone provided"}</p>
              </div>
              <div className="info-group">
                <h3>Shipping Address</h3>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.postalCode}</p>
                <p>{formData.country}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;