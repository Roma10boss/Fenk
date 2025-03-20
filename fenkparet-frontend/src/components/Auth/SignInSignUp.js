import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInSignUp.css";

const SignInSignUp = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    if (isLogin) {
      // Login Logic
      console.log("Logging in with:", formData.email);
      
      // This would be replaced with actual API call
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      navigate("/");
    } else {
      // Register Logic
      console.log("Registering:", formData);
      
      // This would be replaced with actual API call
      localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email }));
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            LOG IN
          </div>
          <div 
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            SIGN UP
          </div>
        </div>
        
        <div className="auth-form-container">
          <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
            )}
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            
            <button type="submit" className="submit-button">SUBMIT</button>
            
            {isLogin && (
              <div className="forgot-password">
                <a href="#">Forgot your password?</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;