import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

const coupons = [
  { code: '#54846478', discount: 32 },
  { code: '#5261272354', discount: 12 },
  { code: '#426234267', discount: 47 }
];

const CouponsPage = () => {
  const { cart, appliedCoupon, applyCoupon } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = appliedCoupon 
    ? totalPrice * (1 - appliedCoupon.discount / 100) 
    : totalPrice;

  const handleApplyCoupon = () => {
    setError(''); // Reset error before applying

    if (totalPrice < 500) {
      setError('Total cart value must be at least $500 to apply a coupon.');
      return;
    }

    const coupon = coupons.find(c => c.code === couponCode);
    if (coupon) {
      applyCoupon(coupon);
      setError('');
    } else {
      setError('Invalid coupon code.');
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/buy');
  };

  return (
    <div className="coupons-page">
      {cart.length === 0 ? (
        <p>Please add items to your cart to use coupons.</p>
      ) : (
        <div className="coupons-container">
          <div className="coupon-section">
            <div className="coupon-form">
              <h3>Apply Coupon</h3>
              <p>Available Coupons: #54846478 (32%), #5261272354 (12%), #426234267 (47%)</p>
              <p>Minimum cart value: $500</p>
              <div className="coupon-input">
                <input
                  type="text"
                  placeholder="Enter your coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={handleApplyCoupon} className="apply-coupon-btn">
                  Apply
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
              {appliedCoupon && (
                <p className="success-message">
                  Coupon {appliedCoupon.code} applied successfully! ({appliedCoupon.discount}% off)
                </p>
              )}
            </div>
            <div className="cart-summary">
              <h3>Cart Total</h3>
              <div className="summary-row">
                <span>Cart subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${discountedPrice.toFixed(2)}</span>
              </div>
              <button
                className="proceed-checkout-btn"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsPage;