import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiPackage, FiCheckCircle, FiClock, FiXCircle, FiCreditCard, FiDollarSign, FiSmartphone, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const { orders, cancelOrder } = useCart();
  const navigate = useNavigate();
  const [isCancelling, setIsCancelling] = useState(false);

  const order = orders.find(o => o.id === parseInt(orderId));

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    setIsCancelling(true);
    try {
      await cancelOrder(order.id);
      toast.success('Order cancelled successfully');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to cancel order. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to view order details</h2>
        <Link to="/login" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg">
          Login
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
        <p className="text-gray-600 mb-6">We couldn't find an order with that ID</p>
        <Link to="/orders" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg">
          View All Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/orders" className="flex items-center text-orange-500 hover:text-orange-600 mb-6">
        <FiArrowLeft className="mr-1" /> Back to Orders
      </Link>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
            <p className="text-gray-500">
              Placed on {new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div>
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <FiXCircle className="mr-1" /> Cancelled
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex border-b border-gray-100 pb-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mr-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="font-medium mt-2">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h3>
                  <div className="flex items-center mb-2">
                    {order.paymentMethod === 'cod' ? (
                      <>
                        <FiDollarSign className="text-gray-500 mr-2" />
                        <span>Cash on Delivery</span>
                      </>
                    ) : order.paymentMethod === 'card' ? (
                      <>
                        <FiCreditCard className="text-gray-500 mr-2" />
                        <span>Credit/Debit Card</span>
                        {order.paymentDetails?.lastFour && (
                          <span className="text-sm text-gray-500 ml-2">
                            (•••• {order.paymentDetails.lastFour})
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <FiSmartphone className="text-gray-500 mr-2" />
                        <span>UPI Payment</span>
                        {order.paymentDetails?.upiId && (
                          <span className="text-sm text-gray-500 ml-2">
                            ({order.paymentDetails.upiId})
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Address</h3>
                  <div className="flex items-start">
                    <FiMapPin className="text-gray-500 mr-2 mt-1" />
                    <div>
                      <p className="font-medium">{order.shippingAddress?.name}</p>
                      <p className="text-gray-600">{order.shippingAddress?.address}</p>
                      <p className="text-gray-600">
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {order.status === 'processing' && (
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center ${
                    isCancelling ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {isCancelling ? (
                    <>
                      <FiClock className="animate-spin mr-2" />
                      Cancelling...
                    </>
                  ) : (
                    'Cancel Order'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}