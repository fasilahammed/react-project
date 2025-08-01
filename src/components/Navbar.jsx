import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX, 
  FiShoppingCart, 
  FiUser, 
  FiHome, 
  FiSmartphone, 
  FiSearch 
} from 'react-icons/fi';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import logo from "../assets/img/snapmob-logo.png";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference
    return localStorage.getItem('darkMode') === 'true';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Apply dark mode class to body and save preference
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-lg' : 'shadow-sm'
    } ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img 
                src={logo} 
                alt="SnapMob Logo" 
                className="h-10 transition-transform duration-300 group-hover:scale-105"
              />
              <span className={`ml-3 text-xl font-bold tracking-tight bg-gradient-to-r ${
                darkMode ? 'from-orange-400 to-orange-300' : 'from-orange-600 to-orange-500'
              } bg-clip-text text-transparent hidden sm:inline-block`}>
                SnapMob
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 ml-10">
            <NavLink to="/" darkMode={darkMode} icon={<FiHome className="mr-1.5" />}>
              Home
            </NavLink>
            <NavLink to="/products" darkMode={darkMode} icon={<FiSmartphone className="mr-1.5" />}>
              Phones
            </NavLink>
            <NavLink to="/search" darkMode={darkMode} icon={<FiSearch className="mr-1.5" />}>
              Search
            </NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-orange-400 hover:bg-gray-800' 
                  : 'text-orange-600 hover:bg-orange-50'
              }`}
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            
            <Link 
              to="/cart" 
              className={`p-2 rounded-full relative transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-orange-50'
              }`}
            >
              <RiShoppingBag3Line className="h-5 w-5" />
              {cartItems > 0 && (
                <span className={`absolute -top-1 -right-1 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${
                  darkMode ? 'bg-orange-500 text-white' : 'bg-orange-600 text-white'
                }`}>
                  {cartItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`hidden md:flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                <FiUser className="mr-1.5 h-4 w-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-screen py-2' : 'max-h-0 overflow-hidden'
      } ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <MobileNavLink to="/" darkMode={darkMode} icon={<FiHome />} onClick={closeMobileMenu}>
          Home
        </MobileNavLink>
        <MobileNavLink to="/products" darkMode={darkMode} icon={<FiSmartphone />} onClick={closeMobileMenu}>
          Phones
        </MobileNavLink>
        <MobileNavLink to="/search" darkMode={darkMode} icon={<FiSearch />} onClick={closeMobileMenu}>
          Search
        </MobileNavLink>
        <MobileNavLink to="/cart" darkMode={darkMode} icon={<RiShoppingBag3Line />} badge={cartItems} onClick={closeMobileMenu}>
          Cart
        </MobileNavLink>
        {user ? (
          <MobileNavLink 
            to="#" 
            darkMode={darkMode} 
            icon={<FiUser />} 
            onClick={() => {
              closeMobileMenu();
              handleLogout();
            }}
          >
            Logout
          </MobileNavLink>
        ) : (
          <MobileNavLink 
            to="/login" 
            darkMode={darkMode} 
            icon={<FiUser />} 
            onClick={closeMobileMenu}
          >
            Login
          </MobileNavLink>
        )}
      </div>
    </nav>
  );
}

// Desktop NavLink Component
function NavLink({ to, children, darkMode, icon }) {
  return (
    <Link 
      to={to} 
      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
        darkMode 
          ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400' 
          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
      }`}
    >
      {icon}
      <span className="ml-1.5">{children}</span>
    </Link>
  );
}

// Mobile NavLink Component
function MobileNavLink({ to, children, darkMode, onClick, icon, badge }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center justify-between px-5 py-3 mx-2 rounded-lg text-base font-medium transition-colors ${
        darkMode 
          ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400' 
          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
      }`}
    >
      <div className="flex items-center">
        <span className="mr-3">{icon}</span>
        <span>{children}</span>
      </div>
      {badge && (
        <span className={`text-xs px-2 py-1 rounded-full ${
          darkMode ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800'
        }`}>
          {badge}
        </span>
      )}
    </Link>
  );
}