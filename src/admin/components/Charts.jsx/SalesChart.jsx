import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = ({ data }) => {
  // Custom tooltip with proper value formatting
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-lg">
          <p className="text-gray-300 font-medium mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={`tooltip-${index}`} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-400 mr-1">{entry.name}:</span>
                <span className={entry.dataKey === 'sales' ? 'text-violet-400' : 'text-green-400'}>
                  {entry.dataKey === 'sales' ? `₹${entry.value.toLocaleString()}` : entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Find max values for proper YAxis scaling
  const maxSales = Math.max(...data.map(item => item.sales)) * 1.1;
  const maxOrders = Math.max(...data.map(item => item.orders)) * 1.1;

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Sales Performance</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Last 30 Days</span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#374151" 
              vertical={false} 
            />
            <XAxis 
              dataKey="day" 
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickMargin={12}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              domain={[0, maxSales]}
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              tickMargin={12}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, maxOrders]}
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickMargin={12}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#4B5563', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                color: '#D1D5DB'
              }}
              iconType="circle"
              iconSize={10}
            />
            <Line 
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
              name="Revenue (₹)"
            />
            <Line 
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4, fill: '#10B981', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Showing daily sales and order volume
      </div>
    </div>
  );
};

export default SalesChart;