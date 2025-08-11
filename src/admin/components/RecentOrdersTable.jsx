import { Link } from 'react-router-dom';

const RecentOrdersTable = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recent orders found
      </div>
    );
  }

  // Flatten the orders to show each item as a separate row
  const orderItems = orders.flatMap(order => 
    order.items.map(item => ({
      ...item,
      orderId: order.id,
      orderDate: order.date,
      customerName: order.shippingAddress?.name || 'Guest',
      paymentMethod: order.paymentMethod,
      orderStatus: order.status
    }))
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {orderItems.slice(0, 10).map((item, index) => (
            <tr key={`${item.orderId}-${item.id}-${index}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img 
                      className="h-10 w-10 rounded-full object-cover" 
                      src={item.images?.[0] || '/placeholder-product.jpg'} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      <Link to={`/orders/${item.orderId}`} className="hover:text-orange-500">
                        {item.name || 'Unknown Product'}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-400">{item.brand || ''}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{item.customerName}</div>
                <div className="text-sm text-gray-400">
                  {new Date(item.orderDate).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                ₹{item.price?.toLocaleString() || '0'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {item.quantity || 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.orderStatus === 'delivered' 
                    ? 'bg-green-100 text-green-800' 
                    : item.orderStatus === 'cancelled' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.orderStatus?.charAt(0).toUpperCase() + item.orderStatus?.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;