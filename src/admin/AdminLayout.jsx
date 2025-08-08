import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUsers, FaBox, FaShoppingBag, FaChartBar, FaCog, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useState, useEffect } from 'react';

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
      <div className="flex flex-col w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
            <button
              onClick={logout}
              className="flex items-center text-sm hover:text-orange-500"
            >
              <FaSignOutAlt className="mr-1" /> Logout
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64 border-r bg-white dark:bg-gray-800 dark:border-gray-700">
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <SidebarLink to="/admin" icon={<FaHome />} text="Dashboard" />
                <SidebarLink to="/admin/users" icon={<FaUsers />} text="Users" />
                <SidebarLink to="/admin/products" icon={<FaBox />} text="Products" />
                <SidebarLink to="/admin/orders" icon={<FaShoppingBag />} text="Orders" />
                <SidebarLink to="/admin/analytics" icon={<FaChartBar />} text="Analytics" />
                <SidebarLink to="/admin/settings" icon={<FaCog />} text="Settings" />
              </nav>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <span className="mr-3 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200">
      {icon}
    </span>
    {text}
  </Link>
);

export default AdminLayout;