// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./../Context/AuthContext";

const ProtectedRoute = ({ element: Component }) => {
  const { user } = useAuth();

  return user && user.role !== "Customer" ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
