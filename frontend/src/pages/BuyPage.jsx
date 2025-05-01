// src/pages/BuyPage.jsx
import React, { useContext } from 'react';
import { BuyContext } from '../components/BuyContext';

const BuyPage = () => {
  const { order, clearOrder } = useContext(BuyContext);

  const totalPrice = order
    ? order.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="buy-page">
      <h2>Order Confirmation</h2>
      {order ? (
        <>
          <p>Order successfully completed!</p>
          <div className="order-details">
            {order.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="clear-order-btn" onClick={clearOrder}>
              Clear Order
            </button>
          </div>
        </>
      ) : (
        <p>No order placed yet.</p>
      )}
    </div>
  );
};

export default BuyPage;