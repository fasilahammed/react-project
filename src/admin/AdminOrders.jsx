import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLoading from './components/AdminLoading';
import { FiPackage, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both orders and users in parallel
        const [ordersRes, usersRes] = await Promise.all([
          axios.get('https://snapmobdb-1.onrender.com/orders'),
          axios.get('https://snapmobdb-1.onrender.com/users')
        ]);

        setUsers(usersRes.data);

        // Combine orders with user data
        const ordersWithUsers = ordersRes.data.map(order => {
          const user = usersRes.data.find(u => u.id === order.userId) || null;
          return {
            ...order,
            user: user ? {
              name: user.name || 'Guest',
              email: user.email || 'No email'
            } : null,
            status: ['processing', 'cancelled', 'delivered'].includes(order.status)
              ? order.status
              : 'processing'
          };
        });

        setOrders(ordersWithUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredOrders = orders
    .filter(order =>
      statusFilter === 'all' || order.status === statusFilter
    )
    .filter(order =>
      order.id.includes(searchTerm) ||
      (order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.items.some(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const updateOrderStatus = async (orderId, newStatus) => {
    if (!['processing', 'cancelled', 'delivered'].includes(newStatus)) return;

    try {
      // Update in backend
      await axios.patch(`https://snapmobdb-1.onrender.com/orders/${orderId}`, { status: newStatus });

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success('Order status updated');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing': return <FiPackage className="mr-1" />;
      case 'delivered': return <FiCheckCircle className="mr-1" />;
      case 'cancelled': return <FiXCircle className="mr-1" />;
      default: return <FiPackage className="mr-1" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <AdminLoading />;

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Order Management</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
          >
            <option value="all">All Statuses</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="text"
            placeholder="Search orders..."
            className="px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {order.user?.name || order.shippingAddress?.name || 'Guest'}
                    </div>
                    <div className="text-sm text-gray-400">
                      {order.user?.email || 'No email'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-400">
                      {order.items[0]?.name || 'Product'} {order.items.length > 1 ? `+ ${order.items.length - 1} more` : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white"
                    >
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;