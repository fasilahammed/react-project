// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import PrivateRoute from './routes/PrivateRoute';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from './pages/WishList';
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Register from './pages/auth/Register';
import Login from './pages/auth/login';
import { Toaster } from 'react-hot-toast';
import Checkout from './pages/Checkout';

function Layout() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#333',
          },
          success: {
            style: {
              background: '#4BB543',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#FF3333',
              color: '#fff',
            },
          },
        }}
      />
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
           <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Layout />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}