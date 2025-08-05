import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <-- Import Footer
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/WishList"));
const Products = lazy(() => import("./pages/Products"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/login"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const ErrorPage = lazy(() => import('./components/ErrorResponse'));

function Layout() {
  const location = useLocation();
  const hidePaths = ['/login', '/register']; // same rule for both navbar & footer
  const shouldShowLayout = !hidePaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: '#fff', color: '#333' },
          success: { style: { background: '#4BB543', color: '#fff' } },
          error: { style: { background: '#FF3333', color: '#fff' } },
        }}
      />
      
      {/* Navbar */}
      {shouldShowLayout && <Navbar />}

      {/* Main content */}
      <div className="flex-grow">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Route>
          </Routes>
        </Suspense>
      </div>

      {/* Footer */}
      {shouldShowLayout && <Footer />}
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
