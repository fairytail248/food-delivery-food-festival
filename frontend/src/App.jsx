// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { CartProvider } from './components/CartContext';
import { BuyProvider } from './components/BuyContext';
import { AddressProvider } from './components/AddressContext';
import { AuthProvider, useAuth } from './components/AuthContext';

import Navbar from './components/Navbar';
import Home from './components/Home';
import CartPage from './pages/CartPage';
import BuyPage from './pages/BuyPage';
import AddressPage from './pages/AddressPage';
import RestaurantsPage from './pages/RestaurantsPage';
import CouponsPage from './pages/CouponsPage';
import PizzaPage from './pages/PizzaPage';
import BurgerPage from './pages/BurgerPage';
import IceCreamPage from './pages/IcecreamPage';
import CakePage from './pages/CakePage';
import BiryaniPage from './pages/BiryaniPage';
import SeafoodPage from './pages/SeafoodPage';
import SoupPage from './pages/SoupPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ImageUploadPage from './pages/ImageUploadPage'; // 🆕 New image selection page

// ✅ Custom protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <CartProvider>
      <BuyProvider>
        <AuthProvider>
          <AddressProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <div className="app">
                <Navbar />
                <Routes>
                  {/* ✅ Public Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/upload-image" element={<ImageUploadPage />} />

                  {/* ✅ Protected Routes */}
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/food-items" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                  <Route path="/buy" element={<ProtectedRoute><BuyPage /></ProtectedRoute>} />
                  <Route path="/address" element={<ProtectedRoute><AddressPage /></ProtectedRoute>} />
                  <Route path="/restaurants" element={<ProtectedRoute><RestaurantsPage /></ProtectedRoute>} />
                  <Route path="/coupons" element={<ProtectedRoute><CouponsPage /></ProtectedRoute>} />
                  <Route path="/pizza" element={<ProtectedRoute><PizzaPage /></ProtectedRoute>} />
                  <Route path="/burger" element={<ProtectedRoute><BurgerPage /></ProtectedRoute>} />
                  <Route path="/iceCream" element={<ProtectedRoute><IceCreamPage /></ProtectedRoute>} />
                  <Route path="/cake" element={<ProtectedRoute><CakePage /></ProtectedRoute>} />
                  <Route path="/biryani" element={<ProtectedRoute><BiryaniPage /></ProtectedRoute>} />
                  <Route path="/sea" element={<ProtectedRoute><SeafoodPage /></ProtectedRoute>} />
                  <Route path="/soup" element={<ProtectedRoute><SoupPage /></ProtectedRoute>} />
                  <Route path="/profile/*" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                  {/* ✅ Catch-all Route: redirect unknown routes to login */}
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </div>
            </Router>
          </AddressProvider>
        </AuthProvider>
      </BuyProvider>
    </CartProvider>
  );
};

export default App;
