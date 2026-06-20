import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    const res = await login(email, password);
    if (res.success) {
      const { user: userData, token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return res;
    }
    throw new Error('Login failed');
  };

  const registerUser = async (name, email, password) => {
    return await register(name, email, password);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
