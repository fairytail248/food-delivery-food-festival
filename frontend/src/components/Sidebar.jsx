import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // <-- Import useAuth

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isFoodCategoriesOpen, setIsFoodCategoriesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { currentUser } = useAuth(); // <-- Get current user

  const toggleFoodCategories = () => {
    setIsFoodCategoriesOpen(!isFoodCategoriesOpen);
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span>
          {currentUser ? `Hello, ${currentUser.name}` : 'Hello, Sign in'}
        </span>
        
        <button className="close-btn" onClick={toggleSidebar}>
          ✕
        </button>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 onClick={toggleFoodCategories} className="sidebar-section-title">
            Categories {isFoodCategoriesOpen ? '▼' : '▶'}
          </h3>
          {isFoodCategoriesOpen && (
            <ul className="sidebar-links">
              <li><Link to="/pizza" onClick={toggleSidebar}>Pizza</Link></li>
              <li><Link to="/burger" onClick={toggleSidebar}>Burger</Link></li>
              <li><Link to="/iceCream" onClick={toggleSidebar}>Ice Cream</Link></li>
              <li><Link to="/cake" onClick={toggleSidebar}>Cakes</Link></li>
              <li><Link to="/biryani" onClick={toggleSidebar}>Biryani</Link></li>
              <li><Link to="/soup" onClick={toggleSidebar}>Soup</Link></li>
              <li><Link to="/sea" onClick={toggleSidebar}>Sea Food</Link></li>
            </ul>
          )}
        </div>
        <div className="sidebar-section">
          <h3 onClick={toggleAccount} className="sidebar-section-title">
            Account & More {isAccountOpen ? '▼' : '▶'}
          </h3>
          {isAccountOpen && (
            <ul className="sidebar-links">
              <li><Link to="/profile" onClick={toggleSidebar}>Profile</Link></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
