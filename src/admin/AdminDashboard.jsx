import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from './components/StatCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import Loading from '../components/Loading';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersRes = await axios.get('http://localhost:3000/users');
        const users = usersRes.data;
        
        // Fetch products
        const productsRes = await axios.get('http://localhost:3000/products');
        const products = productsRes.data;
        
        // Calculate stats
        const totalUsers = users.length;
        const totalProducts = products.length;
        
        // Calculate total sales from all users' carts
        let totalSales = 0;
        let totalOrders = 0;
        
        users.forEach(user => {
          if (user.cart && user.cart.length > 0) {
            totalSales += user.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalOrders += user.cart.length;
          }
        });
        
        setStats({
          totalSales,
          totalOrders,
          totalUsers,
          totalProducts,
          salesChange: 12.5, // Example percentage
          ordersChange: 8.3, // Example percentage
          usersChange: 5.7, // Example percentage
          productsChange: 3.2 // Example percentage
        });
        
        // Get recent orders (for demo, we'll use cart items as orders)
        const allOrders = users.flatMap(user => 
          user.cart ? user.cart.map(item => ({
            ...item,
            user: { name: user.name, email: user.email },
            date: user.createdAt
          })) : []
        );
        
        setRecentOrders(allOrders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Sales" 
          value={`₹${stats?.totalSales?.toLocaleString() || 0}`} 
          change={stats?.salesChange || 0}
          icon="sales"
        />
        <StatCard 
          title="Total Orders" 
          value={stats?.totalOrders || 0} 
          change={stats?.ordersChange || 0}
          icon="orders"
        />
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers || 0} 
          change={stats?.usersChange || 0}
          icon="users"
        />
        <StatCard 
          title="Total Products" 
          value={stats?.totalProducts || 0} 
          change={stats?.productsChange || 0}
          icon="products"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Orders</h2>
        <RecentOrdersTable orders={recentOrders} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* <Link to="/admin/products" className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-center">
            Add New Product
          </Link>
          <Link to="/admin/orders" className="p-4 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-center">
            View Orders
          </Link>
          <Link to="/admin/users" className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-center">
            Manage Users
          </Link>
          <Link to="/admin/analytics" className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors text-center">
            View Analytics
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;