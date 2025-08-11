import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserGrowthChart = ({ data }) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-lg">
          <p className="text-gray-300 font-medium">{label}</p>
          <p className="text-violet-400">
            <span className="text-gray-400">New Users: </span>
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">User Growth</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Last 30 Days</span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#374151" 
              vertical={false} 
            />
            <XAxis 
              dataKey="date" 
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickMargin={12}
            />
            <YAxis 
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickMargin={12}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(75, 85, 99, 0.3)' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                color: '#D1D5DB'
              }}
              iconType="circle"
              iconSize={10}
            />
            <Bar 
              dataKey="users" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]}
              name="New Users"
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Showing daily user registrations
      </div>
    </div>
  );
};

export default UserGrowthChart;