import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { 
  FaHome, 
  FaUsers, 
  FaBox, 
  FaShoppingBag, 
  FaChevronRight,
  FaChevronLeft,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const menuItems = [
    { path: '/admin', icon: <FaHome />, text: 'Dashboard' },
    { path: '/admin/users', icon: <FaUsers />, text: 'Users' },
    { path: '/admin/products', icon: <FaBox />, text: 'Products' },
    { path: '/admin/orders', icon: <FaShoppingBag />, text: 'Orders' },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Fixed Sidebar */}
      <div className={`
        fixed h-full bg-gray-800 border-r border-gray-700 z-10
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-purple-400">Admin Panel</h1>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-full hover:bg-gray-700 text-gray-300"
          >
            {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <FaUserCircle className="text-purple-400 text-xl" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <p className="font-medium text-white">{user.name || 'Admin'}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center p-3 rounded-lg
                    hover:bg-gray-700 hover:text-purple-400
                    transition-colors duration-200
                    ${location.pathname === item.path ? 
                      'bg-gray-700 text-purple-400' : 
                      'text-gray-300'}
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="ml-3">{item.text}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className={`
              flex items-center w-full p-3 rounded-lg
              hover:bg-gray-700 hover:text-red-400
              text-gray-300
              transition-colors duration-200
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
          >
            <FaSignOutAlt />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className={`
        flex-1 overflow-y-auto transition-all duration-300 ease-in-out bg-gray-900
        ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
      `}>
        <div className="p-6 text-white">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
