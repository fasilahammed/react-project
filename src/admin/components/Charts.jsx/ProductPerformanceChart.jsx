import React from 'react';

const ProductPerformanceChart = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((product, index) => (
        <div key={product.id} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300 truncate max-w-[120px]">{product.name}</span>
            <span className="text-white">₹{product.totalSales.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-violet-500 h-2 rounded-full" 
              style={{ 
                width: `${(product.totalSales / data[0].totalSales) * 100}%` 
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{product.totalOrders} orders</span>
            <span>{Math.round((product.totalSales / data[0].totalSales) * 100)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPerformanceChart;