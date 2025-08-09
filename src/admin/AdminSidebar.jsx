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
  FaTimes,
  FaUserCircle,
  FaSearch
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Menu items with possible submenus
  const menuItems = [
    {
      path: '/admin',
      icon: <FaHome className="text-violet-400" />,
      text: 'Dashboard',
    },
    {
      path: '/admin/users',
      icon: <FaUsers className="text-violet-400" />,
      text: 'Users',
    },
    {
      path: '/admin/products',
      icon: <FaBox className="text-violet-400" />,
      text: 'Products',
      submenu: [
        { path: '/admin/products/list', text: 'All Products' },
        { path: '/admin/products/add', text: 'Add New' },
        { path: '/admin/products/categories', text: 'Categories' },
      ]
    },
    {
      path: '/admin/orders',
      icon: <FaShoppingBag className="text-violet-400" />,
      text: 'Orders',
      submenu: [
        { path: '/admin/orders/list', text: 'All Orders' },
        { path: '/admin/orders/returns', text: 'Returns' },
      ]
    },
    {
      path: '/admin/analytics',
      icon: <FaChartBar className="text-violet-400" />,
      text: 'Analytics',
    },
    {
      path: '/admin/settings',
      icon: <FaCog className="text-violet-400" />,
      text: 'Settings',
      submenu: [
        { path: '/admin/settings/general', text: 'General' },
        { path: '/admin/settings/notifications', text: 'Notifications' },
      ]
    },
  ];

  // Filter menu items based on search query
  const filteredItems = menuItems.filter(item => 
    item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.submenu && item.submenu.some(sub => 
      sub.text.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        className="fixed z-50 md:hidden bottom-4 right-4 p-3 bg-violet-600 text-white rounded-full shadow-lg hover:bg-violet-700 transition-all"
      >
        {mobileSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Desktop sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden md:block absolute -right-3 top-4 z-10 bg-gray-800 p-2 rounded-full border border-gray-700 shadow-md hover:bg-gray-700 transition-all"
      >
        {sidebarOpen ? (
          <FaChevronRight className="text-violet-400" />
        ) : (
          <FaChevronRight className="text-violet-400 transform rotate-180" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-40 h-full transition-all duration-300 ease-in-out
        ${mobileSidebarOpen ? 'left-0' : '-left-full'} 
        md:left-0 md:transform-none
        ${sidebarOpen ? 'w-64' : 'w-20'}
        bg-gray-900
      `}>
        <div className="flex flex-col h-full border-r border-gray-800">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold text-violet-400">
                Admin Panel
              </h1>
            ) : (
              <h1 className="text-xl font-bold text-violet-400">
                AP
              </h1>
            )}
          </div>

          {/* Search bar (only visible when sidebar is open) */}
          {sidebarOpen && (
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search menu..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          )}

          {/* User profile */}
          {sidebarOpen && (
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-violet-500">
                  <FaUserCircle className="text-violet-400 text-xl" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user?.role || 'Administrator'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {currentItems.map((item) => (
                <li key={item.text}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.text)}
                        className={`
                          flex items-center w-full p-3 rounded-lg transition-all
                          ${isActive(item.path) ? 
                            'bg-gray-800 text-violet-400' : 
                            'hover:bg-gray-800 text-gray-300 hover:text-violet-300'}
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
                              <FaChevronDown className="w-4 h-4 text-violet-400" />
                            ) : (
                              <FaChevronRight className="w-4 h-4 text-violet-400" />
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
                                    'text-violet-400 font-medium' : 
                                    'text-gray-400 hover:text-violet-300'}
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
                          'bg-gray-800 text-violet-400' : 
                          'hover:bg-gray-800 text-gray-300 hover:text-violet-300'}
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

            {/* Pagination controls (only visible when sidebar is open and search is active) */}
            {sidebarOpen && searchQuery && totalPages > 1 && (
              <div className="flex justify-center items-center mt-4 px-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-l-lg bg-gray-800 text-violet-400 disabled:text-gray-600 hover:bg-gray-700"
                >
                  &lt;
                </button>
                <span className="px-4 py-2 bg-gray-800 text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-r-lg bg-gray-800 text-violet-400 disabled:text-gray-600 hover:bg-gray-700"
                >
                  &gt;
                </button>
              </div>
            )}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={logout}
              className={`
                flex items-center w-full p-3 rounded-lg transition-all
                hover:bg-gray-800 text-red-400 hover:text-red-300
                ${sidebarOpen ? 'justify-start' : 'justify-center'}
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