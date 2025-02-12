// src/components/Auth/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage

  if (!user || (roleRequired && user.role !== roleRequired)) {
    return <Navigate to="/admin" replace />; // Redirect to admin login if not authenticated
  }

  return children;
};

export default ProtectedRoute;