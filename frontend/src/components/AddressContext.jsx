import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userEmail = currentUser?.email;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Load addresses when user changes
  useEffect(() => {
    if (userEmail) {
      const allAddresses = JSON.parse(localStorage.getItem('addressesByUser') || '{}');
      setAddresses(allAddresses[userEmail] || []);
      setSelectedAddress(null);
    } else {
      setAddresses([]);
      setSelectedAddress(null);
    }
  }, [userEmail]);

  // Save addresses whenever they change
  useEffect(() => {
    if (userEmail) {
      const allAddresses = JSON.parse(localStorage.getItem('addressesByUser') || '{}');
      allAddresses[userEmail] = addresses;
      localStorage.setItem('addressesByUser', JSON.stringify(allAddresses));
    }
  }, [addresses, userEmail]);

  const addAddress = (address) => {
    setAddresses((prev) => [...prev, { ...address, id: Date.now() }]);
  };

  const selectAddress = (id) => {
    setSelectedAddress(id);
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, selectedAddress, selectAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
