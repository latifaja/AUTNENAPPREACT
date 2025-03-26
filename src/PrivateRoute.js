import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');
  if (!user) {
    alert('You must be logged in to access this page.');
  }
  return user ? children : <Navigate to="/" />;
}

export default PrivateRoute;