import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles=['user', 'admin'] }) => {

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    navigate('/login');
    return  navigate('/login');
  }

  return <Outlet />;
};

export default PrivateRoute;
