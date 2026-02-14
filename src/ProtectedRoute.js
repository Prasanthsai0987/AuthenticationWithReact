// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) return <div className="loading">Checking authentication...</div>;

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
