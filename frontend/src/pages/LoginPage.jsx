import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/upload-image'); 
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const userExists = Object.prototype.hasOwnProperty.call(users, email);
      if (userExists) {
        alert('Wrong password for this email.');
      } else {
        alert('This email did not exist.');
      }
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <button
          type="button"
          onClick={() => navigate('/register')}
          style={{
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          Signup
        </button>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@email.com"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          style={{
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            width: '100%',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;