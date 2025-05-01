
import React, { useContext } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, completedOrders, logout } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('userImage', reader.result);
      
      };
      reader.readAsDataURL(file);
    }
  };

  const userImage = localStorage.getItem('userImage') || 'https://via.placeholder.com/150'; 

  return (
    <div className="profile-page">
      <div className="sidebar">
        <h3>Profile Menu</h3>
        <ul>
          <li onClick={() => navigate('/profile')}>Profile</li>
          <li onClick={() => navigate('/profile/orders')}>Orders</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </div>
      <div className="profile-content">
        <h2>Profile</h2>
        <div className="profile-header">
          <label htmlFor="imageUpload">
            <div className="profile-image">
              <img src={userImage} alt="User Profile" />
            </div>
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {currentUser && (
            <div>
              <h3>Welcome, {currentUser.name}</h3>
              <p>Email: {currentUser.email}</p>
            </div>
          )}
        </div>
        <h3>Completed Orders</h3>
        {completedOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className="orders-list">
            {completedOrders.map((order, index) => (
              <li key={index}>
                <h4>Order #{index + 1} - {new Date(order.timestamp).toLocaleDateString()}</h4>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        )}

      
      </div>
    </div>
  );
};

export default ProfilePage;