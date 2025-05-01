// src/components/BuyContext.jsx
import React, { createContext, useState } from 'react';

export const BuyContext = createContext();

export const BuyProvider = ({ children }) => {
  const [order, setOrder] = useState(null);

  const placeOrder = (cartItems) => {
    setOrder(cartItems);
  };

  const clearOrder = () => {
    setOrder(null);
  };

  return (
    <BuyContext.Provider value={{ order, placeOrder, clearOrder }}>
      {children}
    </BuyContext.Provider>
  );
};