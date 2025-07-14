import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set the authorization token for all subsequent axios requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Here you might want to fetch the user profile if you only have the token
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};