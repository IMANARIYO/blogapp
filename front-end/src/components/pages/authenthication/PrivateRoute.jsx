import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../../services/userService";

// import { getUserFromLocalStorage } from "../../../services/userService";

const PrivateRoute = ({ children }) => {
  const user = getUserFromLocalStorage(); // Fetch user from local storage

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // Optionally, you can add role-based access control here
  // if (user.role !== "admin") {
  //   // Redirect to home if the user is not an admin
  //   return <Navigate to="/" />;
  // }

  // Render the children (protected content) if the user is authenticated and has the required role
  return children;
};

export default PrivateRoute;
