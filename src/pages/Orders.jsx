import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiPackage, FiCheckCircle, FiClock, FiXCircle, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Orders() {
  const { user } = useAuth();
  const { orders, removeOrder } = useCart();

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to permanently delete this order?')) {
      try {
        await removeOrder(orderId);
        toast.success('Order deleted successfully');
      } catch (error) {
        toast.error('Failed to delete order');
      }
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to view your orders</h2>
        <Link
          to="/login"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h2>
        <p className="text-gray-600 mb-6">
          Your order history will appear here once you make purchases
        </p>
        <Link
          to="/products"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg"
        >
          Browse Products
        </Link>
      </div>
    );
  }

return (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-6">
            {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <FiPackage className="text-orange-500 mr-3" />
                            <div>
                                <h3 className="font-medium">Order #{order.id}</h3>
                                <p className="text-sm text-gray-500">
                                    Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {order.status === 'completed' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    <FiCheckCircle className="mr-1" /> Completed
                                </span>
                            )}
                            {order.status === 'processing' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    <FiClock className="mr-1" /> Processing
                                </span>
                            )}
                            {order.status === 'cancelled' && (
                                <>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                        <FiXCircle className="mr-1" /> Cancelled
                                    </span>
                                    <button
                                        onClick={() => handleDeleteOrder(order.id)}
                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                                        title="Delete order permanently"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {order.items.slice(0, 2).map((item) => (
                                <div key={item.id} className="flex">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                                        <p className="text-sm text-gray-500 mb-1">
                                            {item.brand} • Qty: {item.quantity}
                                        </p>
                                        <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {order.items.length > 2 && (
                            <div className="mb-6">
                                <p className="text-sm text-gray-500">
                                    + {order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h4>
                                <p className="font-medium">
                                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                                     order.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                                     'UPI Payment'}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Total Amount</h4>
                                <p className="font-medium text-lg">₹{order.total.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-col md:items-end gap-2">
                                <Link
                                    to={`/orders/${order.id}`}
                                    className="inline-block px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}