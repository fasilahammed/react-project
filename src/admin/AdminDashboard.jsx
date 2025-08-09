import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from './components/StatCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import QuickActionCard from './components/QuickActionCard';
import AdminLoading from './components/AdminLoading';
import ProductPerformanceChart from './components/Charts.jsx/ProductPerformanceChart';
import UserGrowthChart from './components/Charts.jsx/UserGrowthChart';
import SalesChart from './components/Charts.jsx/SalesChart';



const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:3000/users'),
          axios.get('http://localhost:3000/products'),
          axios.get('http://localhost:3000/orders')
        ]);

        const users = usersRes.data;
        const products = productsRes.data;
        const orders = ordersRes.data || [];

        // Calculate stats
        const totalUsers = users.length;
        const totalProducts = products.length;
        const totalOrders = orders.length;
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

        // Calculate growth percentages (mock data for demo)
        const salesChange = 12.5;
        const ordersChange = 8.3;
        const usersChange = 5.7;
        const productsChange = 3.2;

        // Get recent orders (last 5)
        const recentOrders = [...orders]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        // Prepare chart data
        const salesData = generateChartData(orders, timeRange);
        const userGrowthData = generateUserGrowthData(users, timeRange);
        const productPerformanceData = generateProductPerformanceData(products, orders);

        setDashboardData({
          stats: {
            totalSales,
            totalOrders,
            totalUsers,
            totalProducts,
            salesChange,
            ordersChange,
            usersChange,
            productsChange
          },
          recentOrders,
          salesData,
          userGrowthData,
          productPerformanceData
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);

  if (loading) return <AdminLoading />;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header with time range selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Time Range:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 p-2"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`₹${dashboardData.stats.totalSales.toLocaleString()}`} 
          change={dashboardData.stats.salesChange}
          icon="revenue"
          trend="up"
          currency="INR"
        />
        <StatCard 
          title="Total Orders" 
          value={dashboardData.stats.totalOrders} 
          change={dashboardData.stats.ordersChange}
          icon="orders"
          trend="up"
        />
        <StatCard 
          title="Active Users" 
          value={dashboardData.stats.totalUsers} 
          change={dashboardData.stats.usersChange}
          icon="users"
          trend="up"
        />
        <StatCard 
          title="Products Listed" 
          value={dashboardData.stats.totalProducts} 
          change={dashboardData.stats.productsChange}
          icon="products"
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Sales Analytics</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-violet-600 text-white rounded-full">
                Revenue
              </button>
              <button className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                Orders
              </button>
            </div>
          </div>
          <SalesChart data={dashboardData.salesData} />
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">User Growth</h2>
          <UserGrowthChart data={dashboardData.userGrowthData} />
        </div>
      </div>

      {/* Recent Orders & Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
            <button className="text-sm text-violet-400 hover:text-violet-300">
              View All Orders →
            </button>
          </div>
          <RecentOrdersTable orders={dashboardData.recentOrders} />
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Top Products</h2>
          <ProductPerformanceChart data={dashboardData.productPerformanceData} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard 
            title="Add Product" 
            icon="add" 
            link="/admin/products/new"
            description="Create new product listing"
            variant="violet"
          />
          <QuickActionCard 
            title="Manage Users" 
            icon="users" 
            link="/admin/users"
            description="View and manage users"
            variant="blue"
          />
          <QuickActionCard 
            title="Process Orders" 
            icon="orders" 
            link="/admin/orders"
            description="Manage customer orders"
            variant="green"
          />
          <QuickActionCard 
            title="View Reports" 
            icon="analytics" 
            link="/admin/analytics"
            description="Business performance"
            variant="orange"
          />
        </div>
      </div>
    </div>
  );
};

// Helper functions for chart data generation
function generateChartData(orders, range) {
  // This would be replaced with actual data processing
  // Mock data for demonstration
  const dataMap = {
    week: [
      { day: 'Mon', sales: 4000, orders: 24 },
      { day: 'Tue', sales: 3000, orders: 13 },
      { day: 'Wed', sales: 5000, orders: 28 },
      { day: 'Thu', sales: 2000, orders: 15 },
      { day: 'Fri', sales: 8000, orders: 32 },
      { day: 'Sat', sales: 7000, orders: 29 },
      { day: 'Sun', sales: 6000, orders: 25 }
    ],
    month: Array(30).fill(0).map((_, i) => ({
      day: `Day ${i+1}`,
      sales: Math.floor(Math.random() * 10000),
      orders: Math.floor(Math.random() * 50)
    })),
    quarter: Array(12).fill(0).map((_, i) => ({
      week: `Week ${i+1}`,
      sales: Math.floor(Math.random() * 50000),
      orders: Math.floor(Math.random() * 200)
    })),
    year: [
      { month: 'Jan', sales: 40000, orders: 150 },
      { month: 'Feb', sales: 30000, orders: 100 },
      { month: 'Mar', sales: 60000, orders: 250 },
      { month: 'Apr', sales: 45000, orders: 180 },
      { month: 'May', sales: 55000, orders: 220 },
      { month: 'Jun', sales: 70000, orders: 300 },
      { month: 'Jul', sales: 65000, orders: 280 },
      { month: 'Aug', sales: 75000, orders: 320 },
      { month: 'Sep', sales: 80000, orders: 350 },
      { month: 'Oct', sales: 90000, orders: 400 },
      { month: 'Nov', sales: 95000, orders: 420 },
      { month: 'Dec', sales: 100000, orders: 450 }
    ]
  };

  return dataMap[range] || dataMap.week;
}

function generateUserGrowthData(users, range) {
  // Mock data for demonstration
  const dataMap = {
    week: Array(7).fill(0).map((_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      users: Math.floor(Math.random() * 50)
    })),
    month: Array(30).fill(0).map((_, i) => ({
      date: `Day ${i+1}`,
      users: Math.floor(Math.random() * 20)
    })),
    quarter: Array(12).fill(0).map((_, i) => ({
      date: `Week ${i+1}`,
      users: Math.floor(Math.random() * 100)
    })),
    year: Array(12).fill(0).map((_, i) => ({
      date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      users: Math.floor(Math.random() * 500)
    }))
  };

  return dataMap[range] || dataMap.week;
}

function generateProductPerformanceData(products, orders) {
  // Get top 5 products by sales
  const productSales = {};
  
  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.id]) {
        productSales[item.id] = {
          ...products.find(p => p.id === item.id),
          totalSales: 0,
          totalOrders: 0
        };
      }
      productSales[item.id].totalSales += item.price * item.quantity;
      productSales[item.id].totalOrders += 1;
    });
  });

  return Object.values(productSales)
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);
}

export default AdminDashboard;