import React from 'react';
import { FiTrendingUp, FiDollarSign, FiShoppingBag } from 'react-icons/fi';

const ProductPerformanceChart = ({ data }) => {
  // Sort products by totalSales (descending) and take top 5
  const sortedData = [...data]
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);

  // Calculate max sales for percentage scaling
  const maxSales = sortedData[0]?.totalSales || 1;

  // Calculate total metrics
  const totalSales = data.reduce((sum, product) => sum + product.totalSales, 0);
  const totalOrders = data.reduce((sum, product) => sum + product.totalOrders, 0);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Top Performing Products</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <FiTrendingUp className="text-violet-400" />
          <span>Last 30 Days</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-750 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-400">
            <FiDollarSign className="text-green-400" />
            <span className="text-sm">Total Sales</span>
          </div>
          <p className="text-2xl font-bold text-white mt-1">₹{totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-gray-750 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-400">
            <FiShoppingBag className="text-blue-400" />
            <span className="text-sm">Total Orders</span>
          </div>
          <p className="text-2xl font-bold text-white mt-1">{totalOrders.toLocaleString()}</p>
        </div>
      </div>

      {/* Product Bars */}
      <div className="space-y-5">
        {sortedData.map((product) => {
          const percentage = (product.totalSales / maxSales) * 100;
          const percentageDisplay = Math.round(percentage);
          
          return (
            <div key={product.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 font-medium truncate max-w-[180px]">
                  {product.name}
                </span>
                <span className="text-white font-semibold">
                  ₹{product.totalSales.toLocaleString()}
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-violet-500 to-violet-300 h-2.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <span>{product.totalOrders} orders</span>
                  {product.totalOrders > 100 && (
                    <span className="bg-green-900 text-green-300 px-1.5 py-0.5 rounded text-[10px]">
                      Popular
                    </span>
                  )}
                </div>
                <span>{percentageDisplay}% of top product</span>
              </div>
            </div>
          );
        })}
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No product performance data available
        </div>
      )}
    </div>
  );
};

export default ProductPerformanceChart;