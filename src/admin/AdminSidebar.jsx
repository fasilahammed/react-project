import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, 
  FaUsers, 
  FaBox, 
  FaShoppingBag, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaChevronRight,
  FaChevronDown,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Menu items with possible submenus
  const menuItems = [
    {
      path: '/admin',
      icon: <FaHome />,
      text: 'Dashboard',
    },
    {
      path: '/admin/users',
      icon: <FaUsers />,
      text: 'Users',
    },
    {
      path: '/admin/products',
      icon: <FaBox />,
      text: 'Products',
      submenu: [
        { path: '/admin/products/list', text: 'All Products' },
        { path: '/admin/products/add', text: 'Add New' },
        { path: '/admin/products/categories', text: 'Categories' },
      ]
    },
    {
      path: '/admin/orders',
      icon: <FaShoppingBag />,
      text: 'Orders',
      submenu: [
        { path: '/admin/orders/list', text: 'All Orders' },
        { path: '/admin/orders/returns', text: 'Returns' },
      ]
    },
    {
      path: '/admin/analytics',
      icon: <FaChartBar />,
      text: 'Analytics',
    },
    {
      path: '/admin/settings',
      icon: <FaCog />,
      text: 'Settings',
      submenu: [
        { path: '/admin/settings/general', text: 'General' },
        { path: '/admin/settings/notifications', text: 'Notifications' },
      ]
    },
  ];

  // Toggle submenu expansion
  const toggleSubmenu = (itemText) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  // Check if a menu item is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/admin' && location.pathname.startsWith(path));
  };

  // Collapse all submenus when sidebar is collapsed
  useEffect(() => {
    if (!sidebarOpen) {
      setExpandedItems({});
    }
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="fixed z-50 md:hidden bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all"
      >
        {mobileSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Desktop sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden md:block absolute -right-3 top-4 z-10 bg-white dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
      >
        {sidebarOpen ? (
          <FaChevronRight className="text-gray-500 dark:text-gray-400" />
        ) : (
          <FaChevronRight className="text-gray-500 dark:text-gray-400 transform rotate-180" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-40 h-full transition-all duration-300 ease-in-out
        ${mobileSidebarOpen ? 'left-0' : '-left-full'} 
        md:left-0 md:transform-none
        ${sidebarOpen ? 'w-64' : 'w-20'}
      `}>
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Admin Panel
              </h1>
            ) : (
              <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                AP
              </h1>
            )}
          </div>

          {/* User profile */}
          {sidebarOpen && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-300 font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role || 'Admin'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.text}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.text)}
                        className={`
                          flex items-center w-full p-3 rounded-lg transition-all
                          ${isActive(item.path) ? 
                            'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' : 
                            'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                        `}
                      >
                        <span className="flex-shrink-0">
                          {item.icon}
                        </span>
                        {sidebarOpen && (
                          <>
                            <span className="ml-3 flex-1 text-left">
                              {item.text}
                            </span>
                            {expandedItems[item.text] ? (
                              <FaChevronDown className="w-4 h-4" />
                            ) : (
                              <FaChevronRight className="w-4 h-4" />
                            )}
                          </>
                        )}
                      </button>
                      {(expandedItems[item.text] && sidebarOpen) && (
                        <ul className="ml-10 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.text}>
                              <Link
                                to={subItem.path}
                                className={`
                                  block p-2 text-sm rounded-lg transition-all
                                  ${location.pathname === subItem.path ? 
                                    'text-indigo-600 dark:text-indigo-400 font-medium' : 
                                    'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}
                                `}
                              >
                                {subItem.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`
                        flex items-center p-3 rounded-lg transition-all
                        ${isActive(item.path) ? 
                          'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' : 
                          'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                      `}
                    >
                      <span className="flex-shrink-0">
                        {item.icon}
                      </span>
                      {sidebarOpen && (
                        <span className="ml-3">
                          {item.text}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={logout}
              className={`
                flex items-center w-full p-3 rounded-lg transition-all
                hover:bg-red-50 dark:hover:bg-gray-700 text-red-600 dark:text-red-400
              `}
            >
              <span className="flex-shrink-0">
                <FaSignOutAlt />
              </span>
              {sidebarOpen && (
                <span className="ml-3">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;