import React, { useContext } from 'react';
import { AuthenticationContext } from '../Context/AuthenticationContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading/Loading';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthenticationContext); // useContext, not use()
  const location = useLocation();

  // Show loader while auth state is being checked
  if (loading) {
    return <p><Loading></Loading></p>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/sing_in" state={{ from: location }} replace />;
  }

  // Render the protected component
  return children;
};

export default PrivateRoute;
