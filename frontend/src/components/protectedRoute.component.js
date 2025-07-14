import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // Get the authentication token from our global context
  const { token } = useContext(AuthContext);
  const location = useLocation();

  // Check if the token exists. This is our check to see if the user is logged in.
  if (!token) {
    // If the user is not authenticated, redirect them to the /login page.
    // We also pass the original location they tried to visit, so we can
    // redirect them back after they log in (optional but good UX).
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated (token exists), render the children components.
  // 'children' in this case will be <TasksList />, <EditTask />, etc.
  return children;
};

export default ProtectedRoute;