import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiShoppingCart, FiUser, FiHome, FiSmartphone, FiSearch } from 'react-icons/fi';
import { RiShoppingBag3Line } from 'react-icons/ri';
import logo from "../assets/img/snapmob-logo.png"

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems] = useState(3); // Example cart count
  const [scrolled, setScrolled] = useState(false);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    return () => document.body.classList.remove('dark');
  }, [darkMode]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled ? 'shadow-lg' : 'shadow-md'
    } ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Left */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="SnapMob Logo" 
              style={{ height: "32px", width: "auto" }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <span className={`ml-3 text-2xl font-bold tracking-tight bg-gradient-to-r ${
              darkMode ? 'from-orange-400 to-orange-300' : 'from-orange-600 to-orange-500'
            } bg-clip-text text-transparent hidden sm:inline-block`}>
              SnapMob
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-1 mx-6">
            <LuxuryNavLink to="/" darkMode={darkMode} icon={<FiHome className="mr-2" />}>
              Home
            </LuxuryNavLink>
            <LuxuryNavLink to="/products" darkMode={darkMode} icon={<FiSmartphone className="mr-2" />}>
              Phones
            </LuxuryNavLink>
            <LuxuryNavLink to="/search" darkMode={darkMode} icon={<FiSearch className="mr-2" />}>
              Search
            </LuxuryNavLink>
          </div>

          {/* Action Buttons - Right */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 text-orange-400 hover:bg-gray-700' 
                  : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              }`}
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            
            <Link 
              to="/cart" 
              className={`relative p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-orange-50 text-gray-700 hover:bg-orange-100'
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
            
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                darkMode 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-900/50' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/50'
              } shadow-lg hover:shadow-xl`}
            >
              <FiUser className="h-4 w-4" />
              <span>Login</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-orange-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
        } ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-inner`}>
          <MobileLuxuryLink to="/" darkMode={darkMode} icon={<FiHome className="mr-3" />} onClick={() => setMobileMenuOpen(false)}>
            Home
          </MobileLuxuryLink>
          <MobileLuxuryLink to="/products" darkMode={darkMode} icon={<FiSmartphone className="mr-3" />} onClick={() => setMobileMenuOpen(false)}>
            Phones
          </MobileLuxuryLink>
          <MobileLuxuryLink to="/search" darkMode={darkMode} icon={<FiSearch className="mr-3" />} onClick={() => setMobileMenuOpen(false)}>
            Search
          </MobileLuxuryLink>
          <MobileLuxuryLink to="/cart" darkMode={darkMode} icon={<RiShoppingBag3Line className="mr-3" />} badge={cartItems} onClick={() => setMobileMenuOpen(false)}>
            Cart
          </MobileLuxuryLink>
        </div>
      </div>
    </nav>
  );
}

// Luxury NavLink Component
function LuxuryNavLink({ to, children, darkMode, icon }) {
  return (
    <Link 
      to={to} 
      className={`px-5 py-2.5 mx-1 rounded-full text-sm font-medium flex items-center transition-all duration-300 ${
        darkMode 
          ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400' 
          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

// Mobile Luxury Link Component
function MobileLuxuryLink({ to, children, darkMode, onClick, icon, badge }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center justify-between px-6 py-3 mx-2 rounded-lg text-base font-medium transition-all duration-300 ${
        darkMode 
          ? 'text-gray-300 hover:bg-gray-800 hover:text-orange-400' 
          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
      }`}
    >
      <div className="flex items-center">
        {icon}
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