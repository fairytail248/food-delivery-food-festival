import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignoutClick = () => {
    navigate('/register'); // Navigate to signup page
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-menu-icon" onClick={toggleSidebar}>
          <span className="hamburger-icon">☰</span> {/* Hamburger icon */}
        </div>
        <div className="navbar-logo">
          <Link to="/">
            <span role="img" aria-label="home">🏠</span> Foodies FOOD GOD
          </Link>
        </div>
        {/* Signout Button */}
        <button
          onClick={handleSignoutClick}
          className="navbar-signout-btn"
          style={{
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
        >
          Signout
        </button>
        <ul className="navbar-links">
          <li>
            <Link to="/food-items">
              <span role="img" aria-label="food">🍔</span> Food Items
            </Link>
          </li>
          <li>
            <Link to="/coupons">
              <span role="img" aria-label="coupon">🎟️</span> Coupons
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <span role="img" aria-label="cart">🛒</span> Cart
            </Link>
          </li>
          <li>
            <Link to="/address">
              <span role="img" aria-label="address">📍</span> Address
            </Link>
          </li>
          <li>
            <Link to="/restaurants">
              <span role="img" aria-label="restaurant">🍽️</span> Restaurants
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <span role="img" aria-label="profile">👤</span> Profile
            </Link>
          </li>
        </ul>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;