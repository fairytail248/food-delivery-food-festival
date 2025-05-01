import React, { useState, useContext } from 'react';
import { AddressContext } from '../components/AddressContext';

const AddressPage = () => {
  const { addresses, addAddress, selectedAddress, selectAddress } = useContext(AddressContext);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(formData);
    setFormData({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    });
  };

  return (
    <div className="address-page">
      <h2>Delivery Address</h2>
      <div className="address-container">
        <div className="address-form">
          <h3>Add New Address</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Street Address:</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State:</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </div>
            <button type="submit" className="save-address-btn">Save Address</button>
          </form>
        </div>
        <div className="saved-addresses">
          <h3>Saved Addresses</h3>
          {addresses.length === 0 ? (
            <p>No addresses saved yet.</p>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className={`address-card ${selectedAddress === address.id ? 'selected' : ''}`}
                onClick={() => selectAddress(address.id)}
              >
                <p><strong>{address.fullName}</strong></p>
                <p>{address.phone}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                {selectedAddress === address.id && (
                  <span className="selected-indicator">Selected for Delivery</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;