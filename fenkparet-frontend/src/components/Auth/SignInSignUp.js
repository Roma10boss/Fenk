// path: SignInSignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInSignUp.css";

const SignInSignUp = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email.trim()) newErrors.loginEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.loginEmail = "Email is invalid";
    if (!loginData.password) newErrors.loginPassword = "Password is required";
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name.trim()) newErrors.signupName = "Name is required";
    if (!signupData.email.trim()) newErrors.signupEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.signupEmail = "Email is invalid";
    if (!signupData.password) newErrors.signupPassword = "Password is required";
    else if (signupData.password.length < 6) newErrors.signupPassword = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formErrors = validateLogin();
    if (Object.keys(formErrors).length > 0) return setErrors(formErrors);
    localStorage.setItem("user", JSON.stringify({ email: loginData.email }));
    navigate("/");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formErrors = validateSignup();
    if (Object.keys(formErrors).length > 0) return setErrors(formErrors);
    localStorage.setItem("user", JSON.stringify({ name: signupData.name, email: signupData.email }));
    navigate("/");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <span 
          className={isLogin ? "active" : ""} 
          onClick={() => setIsLogin(true)}
        >
          LOG IN
        </span>
        <span 
          className={!isLogin ? "active" : ""} 
          onClick={() => setIsLogin(false)}
        >
          SIGN UP
        </span>
      </div>
      
      <div className="toggle-switch">
        <label className="switch">
          <input type="checkbox" checked={!isLogin} onChange={toggleForm} />
          <span className="slider round">
            <span className="toggle-icon"></span>
          </span>
        </label>
      </div>

      <div className="auth-form-container">
        {isLogin ? (
          <div className="auth-form">
            <h2>Log In</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <span className="input-icon">@</span>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={loginData.email} 
                  onChange={handleLoginChange} 
                />
                {errors.loginEmail && <div className="error-message">{errors.loginEmail}</div>}
              </div>
              
              <div className="form-group">
                <span className="input-icon">🔒</span>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Your Password" 
                  value={loginData.password} 
                  onChange={handleLoginChange} 
                />
                {errors.loginPassword && <div className="error-message">{errors.loginPassword}</div>}
              </div>
              
              <button type="submit" className="submit-btn">SUBMIT</button>
            </form>
            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        ) : (
          <div className="auth-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <span className="input-icon">👤</span>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Full Name" 
                  value={signupData.name} 
                  onChange={handleSignupChange} 
                />
                {errors.signupName && <div className="error-message">{errors.signupName}</div>}
              </div>
              
              <div className="form-group">
                <span className="input-icon">@</span>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={signupData.email} 
                  onChange={handleSignupChange} 
                />
                {errors.signupEmail && <div className="error-message">{errors.signupEmail}</div>}
              </div>
              
              <div className="form-group">
                <span className="input-icon">🔒</span>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Your Password" 
                  value={signupData.password} 
                  onChange={handleSignupChange} 
                />
                {errors.signupPassword && <div className="error-message">{errors.signupPassword}</div>}
              </div>
              
              <button type="submit" className="submit-btn">SUBMIT</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInSignUp;