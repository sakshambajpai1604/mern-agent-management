import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Simulate async check (replace with real check if needed)
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
    setTimeout(() => setChecking(false), 400); // short delay for effect
  }, []);

  if (checking) {
    return (
      <div className="protected-spinner-container">
        <div className="protected-spinner"></div>
        <span className="protected-spinner-text">Checking authentication...</span>
      </div>
    );
  }

  return isAuth ? <div className="protected-fadein">{children}</div> : <Navigate to="/login" />;
};

export default ProtectedRoute;