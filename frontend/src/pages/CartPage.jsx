// src/pages/CartPage.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { BuyContext } from '../components/BuyContext';
import { useAuth } from '../components/AuthContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, appliedCoupon } = useContext(CartContext);
  const { placeOrder } = useContext(BuyContext);
  const { addCompletedOrder } = useAuth();
  const navigate = useNavigate();

  const handleBuy = () => {
    placeOrder(cart);
    addCompletedOrder({ items: cart, timestamp: new Date().toISOString(), status: 'Completed' });
    clearCart();
    navigate('/profile');
    alert('Order successfully completed!');
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = appliedCoupon 
    ? totalPrice * (1 - appliedCoupon.discount / 100) 
    : totalPrice;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="quantity-selector">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Original Price: ${totalPrice.toFixed(2)}</h3>
            {appliedCoupon && (
              <>
                <p>Discount ({appliedCoupon.discount}%): -${(totalPrice * (appliedCoupon.discount / 100)).toFixed(2)}</p>
                <h3>Final Price: ${discountedPrice.toFixed(2)}</h3>
              </>
            )}
            <button className="buy-btn" onClick={handleBuy}>
              Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;