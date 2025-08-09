import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from './components/StatCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import Loading from '../components/Loading';
import QuickActionCard from './components/QuickActionCard';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users and products in parallel
        const [usersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:3000/users'),
          axios.get('http://localhost:3000/products')
        ]);

        const users = usersRes.data;
        const products = productsRes.data;
        
        // Calculate stats
        const totalUsers = users.length;
        const totalProducts = products.length;
        
        // Calculate total sales and orders
        const { totalSales, totalOrders } = users.reduce((acc, user) => {
          if (user.cart?.length > 0) {
            acc.totalSales += user.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            acc.totalOrders += user.cart.length;
          }
          return acc;
        }, { totalSales: 0, totalOrders: 0 });
        
        setStats({
          totalSales,
          totalOrders,
          totalUsers,
          totalProducts,
          salesChange: 12.5,
          ordersChange: 8.3,
          usersChange: 5.7,
          productsChange: 3.2
        });
        
        // Get recent orders
        const allOrders = users.flatMap(user => 
          user.cart?.map(item => ({
            ...item,
            user: { name: user.name, email: user.email },
            date: user.createdAt
          })) || []
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
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Sales" 
          value={`₹${stats?.totalSales?.toLocaleString() || 0}`} 
          change={stats?.salesChange || 0}
          icon="sales"
          trend="up"
        />
        <StatCard 
          title="Total Orders" 
          value={stats?.totalOrders || 0} 
          change={stats?.ordersChange || 0}
          icon="orders"
          trend="up"
        />
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers || 0} 
          change={stats?.usersChange || 0}
          icon="users"
          trend="up"
        />
        <StatCard 
          title="Total Products" 
          value={stats?.totalProducts || 0} 
          change={stats?.productsChange || 0}
          icon="products"
          trend="up"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Recent Orders</h2>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            View All
          </button>
        </div>
        <RecentOrdersTable orders={recentOrders} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard 
            title="Add Product" 
            icon="add" 
            link="/admin/products/new"
            description="Create a new product listing"
          />
          <QuickActionCard 
            title="Manage Users" 
            icon="users" 
            link="/admin/users"
            description="View and manage user accounts"
          />
          <QuickActionCard 
            title="View Orders" 
            icon="orders" 
            link="/admin/orders"
            description="Process and track orders"
          />
          <QuickActionCard 
            title="Analytics" 
            icon="analytics" 
            link="/admin/analytics"
            description="View sales and traffic reports"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;