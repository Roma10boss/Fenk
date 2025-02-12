// src/services/api.js
import axios from 'axios';

// Create an instance of axios with default configurations
const api = axios.create({
  baseURL: 'http://localhost:3004', // Backend URL
  withCredentials: true, // Include cookies and credentials in requests
});

// Interceptor to add the JWT token to the request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('No token found in localStorage!');
    }

    console.log('Authorization Header:', config.headers.Authorization);
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle responses and handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors for token expiration
    if (error.response && error.response.status === 401) {
      if (!originalRequest._retry) originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.error('No refresh token found. Redirecting to Sign In.');
        localStorage.removeItem('token');
        window.location.href = '/signin'; // Redirect to Sign In
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3004'}/api/auth/refresh`,
          { token: refreshToken }
        );
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return axios(originalRequest); // Retry original request with new token
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin'; // Redirect to Sign In
      }
    }

    return Promise.reject(error);
  }
);

export default api; // Export the api instance