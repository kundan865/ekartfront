import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {

  const user = useSelector((state) => state.user.user);

  const isAdmin = user?.roles?.some(role => role === "ROLE_ADMIN");

  if (!user) {
    return <Navigate to="/login"  />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;