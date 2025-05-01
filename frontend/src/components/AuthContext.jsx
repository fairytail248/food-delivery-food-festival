import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Load users from localStorage
const loadUsersFromStorage = () => JSON.parse(localStorage.getItem('users') || '{}');

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'));
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    // Load user-specific data on mount or when user changes
    if (currentUser) {
      const userEmail = currentUser.email;
      const userOrders = JSON.parse(localStorage.getItem(`orders_${userEmail}`) || '[]');
      setCompletedOrders(userOrders);
    } else {
      setCompletedOrders([]);
    }
  }, [currentUser]);

  const login = (email, password) => {
    const users = loadUsersFromStorage();
    const user = users[email];
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setCurrentUser({ email, name: user.name });
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ email, name: user.name }));
      // Load user-specific orders
      const userOrders = JSON.parse(localStorage.getItem(`orders_${email}`) || '[]');
      setCompletedOrders(userOrders);
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const users = loadUsersFromStorage();
    if (!users[email]) {
      users[email] = { name, password };
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCompletedOrders([]); // Clear orders on logout
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  const addCompletedOrder = (order) => {
    if (currentUser) {
      const userEmail = currentUser.email;
      const userOrders = JSON.parse(localStorage.getItem(`orders_${userEmail}`) || '[]');
      const newOrders = [...userOrders, order];
      setCompletedOrders(newOrders);
      localStorage.setItem(`orders_${userEmail}`, JSON.stringify(newOrders));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, currentUser, addCompletedOrder, completedOrders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);