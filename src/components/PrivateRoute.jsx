import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSessionUser } from '../services/authService';

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getSessionUser()
      .then(() => {
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
