import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteUser = ({ children }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteUser;
