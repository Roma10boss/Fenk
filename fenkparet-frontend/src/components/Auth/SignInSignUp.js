// src/components/Auth/SignInSignUp.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './SignInSignUp.css';

function SignInSignUp({ setUser }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({ email: '', password: '', username: '' }); // Form data state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset the error state

    // Validation: Ensure all required fields are filled
    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'; // Choose API endpoint
      const payload = {
        email: formData.email,
        password: formData.password,
        ...(isLogin ? {} : { username: formData.username }),
      };

      // Send request to the backend
      const response = await api.post(endpoint, { user: payload });

      if (response.data && response.data.token) {
        const { token, role, username } = response.data;

        // Store user data and token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        // Update user state
        setUser({ username, role });

        // Redirect based on role
        navigate(role === 'admin' ? '/admin/dashboard' : '/profile');
      } else {
        setError('Unexpected server response. Please try again.');
      }
    } catch (err) {
      // Handle errors
      console.error('Error during authentication:', err);
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
    setFormData({ email: '', password: '', username: '' }); // Reset form fields
    setError(''); // Clear error messages
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              {/* Toggle Button */}
              <h6 className="mb-0 pb-3">
                <span onClick={toggleForm}>Log In</span>
                <span onClick={toggleForm}>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                checked={!isLogin}
                onChange={toggleForm}
              />
              <label htmlFor="reg-log"></label>

              {/* Form */}
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  {/* Login Form */}
                  <div className={`card-front ${!isLogin ? 'inactive' : ''}`}>
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Your Password"
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">SUBMIT</button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">Forgot your password?</a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Sign Up Form */}
                  <div className={`card-back ${isLogin ? 'inactive' : ''}`}>
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="Your Full Name"
                              value={formData.username}
                              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                              required
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Your Password"
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">SUBMIT</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SignInSignUp.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default SignInSignUp;