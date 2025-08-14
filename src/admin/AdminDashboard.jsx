import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get('https://snapmobdb-1.onrender.com/users'),
          axios.get('https://snapmobdb-1.onrender.com/products'),
          axios.get('https://snapmobdb-1.onrender.com/orders')
        ]);

        const users = usersRes.data;
        const products = productsRes.data;
        const orders = ordersRes.data || [];

        // Calculate current period stats
        const currentPeriod = getDateRange(timeRange, 0);
        const previousPeriod = getDateRange(timeRange, 1);
        
        const currentOrders = orders.filter(order => 
          new Date(order.date) >= currentPeriod.start && 
          new Date(order.date) <= currentPeriod.end
        );
        
        const previousOrders = orders.filter(order => 
          new Date(order.date) >= previousPeriod.start && 
          new Date(order.date) <= previousPeriod.end
        );

        // Calculate totals
        const totalUsers = users.length;
        const totalProducts = products.length;
        const totalOrders = currentOrders.length;
        const totalSales = currentOrders.reduce((sum, order) => sum + (order.total || 0), 0);

        // Calculate growth percentages
        const previousTotalSales = previousOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const previousTotalOrders = previousOrders.length;
        
        const salesChange = previousTotalSales > 0 
          ? ((totalSales - previousTotalSales) / previousTotalSales * 100).toFixed(1)
          : 100;
          
        const ordersChange = previousTotalOrders > 0 
          ? ((totalOrders - previousTotalOrders) / previousTotalOrders * 100).toFixed(1)
          : 100;

        // User growth calculation
        const currentUsers = users.filter(user => 
          new Date(user.createdAt) <= currentPeriod.end
        ).length;
        
        const previousUsers = users.filter(user => 
          new Date(user.createdAt) <= previousPeriod.end
        ).length;
        
        const usersChange = previousUsers > 0 
          ? ((currentUsers - previousUsers) / previousUsers * 100).toFixed(1)
          : 100;

        // Product growth calculation
        const currentProducts = products.filter(product => 
          new Date(product.createdAt) <= currentPeriod.end
        ).length;
        
        const previousProducts = products.filter(product => 
          new Date(product.createdAt) <= previousPeriod.end
        ).length;
        
        const productsChange = previousProducts > 0 
          ? ((currentProducts - previousProducts) / previousProducts * 100).toFixed(1)
          : 100;

        // Get recent orders (last 5)
        const recentOrders = [...orders]
          .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
          .slice(0, 5);

        // Prepare chart data
        const salesData = generateSalesData(orders, timeRange);
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
          trend={dashboardData.stats.salesChange >= 0 ? "up" : "down"}
          currency="INR"
        />
        <StatCard 
          title="Total Orders" 
          value={dashboardData.stats.totalOrders} 
          change={dashboardData.stats.ordersChange}
          icon="orders"
          trend={dashboardData.stats.ordersChange >= 0 ? "up" : "down"}
        />
        <StatCard 
          title="Active Users" 
          value={dashboardData.stats.totalUsers} 
          change={dashboardData.stats.usersChange}
          icon="users"
          trend={dashboardData.stats.usersChange >= 0 ? "up" : "down"}
        />
        <StatCard 
          title="Products Listed" 
          value={dashboardData.stats.totalProducts} 
          change={dashboardData.stats.productsChange}
          icon="products"
          trend={dashboardData.stats.productsChange >= 0 ? "up" : "down"}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Sales Analytics</h2>
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
            <button className="text-sm text-violet-400 hover:text-violet-300"
            onClick={  () => navigate('/admin/orders')}>
              
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
          
        </div>
      </div>
    </div>
  );
};

// Helper functions for data processing
function getDateRange(range, offset = 0) {
  const now = new Date();
  let start, end;

  switch (range) {
    case 'week':
      end = new Date(now);
      end.setDate(end.getDate() - (offset * 7));
      start = new Date(end);
      start.setDate(start.getDate() - 6);
      break;
    case 'month':
      end = new Date(now.getFullYear(), now.getMonth() - offset, 0);
      start = new Date(end.getFullYear(), end.getMonth(), 1);
      break;
    case 'quarter':
      const quarter = Math.floor(now.getMonth() / 3) - offset;
      const quarterStartMonth = quarter * 3;
      start = new Date(now.getFullYear(), quarterStartMonth, 1);
      end = new Date(now.getFullYear(), quarterStartMonth + 3, 0);
      break;
    case 'year':
      end = new Date(now.getFullYear() - offset, 11, 31);
      start = new Date(now.getFullYear() - offset, 0, 1);
      break;
    default:
      end = new Date(now);
      end.setDate(end.getDate() - (offset * 7));
      start = new Date(end);
      start.setDate(start.getDate() - 6);
  }

  return { start, end };
}

function generateSalesData(orders, range) {
  const { start, end } = getDateRange(range, 0);
  const filteredOrders = orders.filter(order => 
    new Date(order.date) >= start && new Date(order.date) <= end
  );

  if (range === 'week') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(day => {
      const dayOrders = filteredOrders.filter(order => 
        days[new Date(order.date).getDay()] === day
      );
      return {
        day,
        sales: dayOrders.reduce((sum, order) => sum + (order.total || 0), 0),
        orders: dayOrders.length
      };
    });
  } else if (range === 'month') {
    const daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dayOrders = filteredOrders.filter(order => 
        new Date(order.date).getDate() === day
      );
      return {
        day: `Day ${day}`,
        sales: dayOrders.reduce((sum, order) => sum + (order.total || 0), 0),
        orders: dayOrders.length
      };
    });
  } else if (range === 'quarter') {
    return Array.from({ length: 12 }, (_, i) => {
      const weekOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.date);
        return Math.floor((orderDate.getDate() + orderDate.getDay()) / 7) === i;
      });
      return {
        week: `Week ${i + 1}`,
        sales: weekOrders.reduce((sum, order) => sum + (order.total || 0), 0),
        orders: weekOrders.length
      };
    }).filter(week => week.orders > 0 || week.sales > 0);
  } else { // year
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, i) => {
      const monthOrders = filteredOrders.filter(order => 
        new Date(order.date).getMonth() === i
      );
      return {
        month,
        sales: monthOrders.reduce((sum, order) => sum + (order.total || 0), 0),
        orders: monthOrders.length
      };
    });
  }
}

function generateUserGrowthData(users, range) {
  const { start, end } = getDateRange(range, 0);
  const filteredUsers = users.filter(user => 
    new Date(user.createdAt) >= start && new Date(user.createdAt) <= end
  );

  if (range === 'week') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(day => ({
      date: day,
      users: filteredUsers.filter(user => 
        days[new Date(user.createdAt).getDay()] === day
      ).length
    }));
  } else if (range === 'month') {
    const daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => ({
      date: `Day ${i + 1}`,
      users: filteredUsers.filter(user => 
        new Date(user.createdAt).getDate() === i + 1
      ).length
    }));
  } else if (range === 'quarter') {
    return Array.from({ length: 12 }, (_, i) => ({
      date: `Week ${i + 1}`,
      users: filteredUsers.filter(user => {
        const userDate = new Date(user.createdAt);
        return Math.floor((userDate.getDate() + userDate.getDay()) / 7) === i;
      }).length
    })).filter(week => week.users > 0);
  } else { // year
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, i) => ({
      date: month,
      users: filteredUsers.filter(user => 
        new Date(user.createdAt).getMonth() === i
      ).length
    }));
  }
}

function generateProductPerformanceData(products, orders) {
  const productSales = {};
  
  // Initialize all products with zero values
  products.forEach(product => {
    productSales[product.id] = {
      ...product,
      totalSales: 0,
      totalOrders: 0
    };
  });

  // Calculate sales and orders for each product
  orders.forEach(order => {
    if (order.items && order.items.length > 0) {
      order.items.forEach(item => {
        if (productSales[item.productId || item.id]) {
          productSales[item.productId || item.id].totalSales += (item.price || 0) * (item.quantity || 1);
          productSales[item.productId || item.id].totalOrders += 1;
        }
      });
    }
  });

  return Object.values(productSales)
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);
}

export default AdminDashboard;