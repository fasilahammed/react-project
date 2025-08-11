import React from 'react';
import { 
  FaDollarSign, 
  FaShoppingBag, 
  FaUsers, 
  FaBox,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const iconComponents = {
  revenue: <FaDollarSign className="text-violet-400" />,
  orders: <FaShoppingBag className="text-blue-400" />,
  users: <FaUsers className="text-green-400" />,
  products: <FaBox className="text-orange-400" />
};

const StatCard = ({ title, value, change, icon, trend, currency }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-violet-500/10 transition-all">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">
            {currency && currency === 'INR' ? '' : ''}{value}
          </p>
        </div>
        <div className="h-12 w-12 rounded-lg bg-gray-700 flex items-center justify-center">
          {iconComponents[icon]}
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${
        trend === 'up' ? 'text-green-400' : 'text-red-400'
      }`}>
        {trend === 'up' ? (
          <FaArrowUp className="mr-1" />
        ) : (
          <FaArrowDown className="mr-1" />
        )}
        <span>{change}% vs last period</span>
      </div>
    </div>
  );
};

export default StatCard;