import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('admin-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('admin-theme', 'light');
    }
  }, [darkMode]);

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="flex items-center justify-between h-16 px-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;