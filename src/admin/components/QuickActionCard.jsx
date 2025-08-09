import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, 
  FaUsers, 
  FaShoppingBag, 
  FaChartLine,
  FaArrowRight
} from 'react-icons/fa';

const iconComponents = {
  add: <FaPlus />,
  users: <FaUsers />,
  orders: <FaShoppingBag />,
  analytics: <FaChartLine />
};

const variantClasses = {
  violet: 'bg-violet-600 hover:bg-violet-700 text-white',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  green: 'bg-green-600 hover:bg-green-700 text-white',
  orange: 'bg-orange-600 hover:bg-orange-700 text-white'
};

const QuickActionCard = ({ title, icon, link, description, variant = 'violet' }) => {
  return (
    <Link
      to={link}
      className={`rounded-xl p-5 flex flex-col justify-between transition-all ${variantClasses[variant]}`}
    >
      <div className="flex justify-between items-start">
        <div className="p-3 rounded-lg bg-black bg-opacity-20">
          {React.cloneElement(iconComponents[icon], { className: 'text-xl' })}
        </div>
        <FaArrowRight className="opacity-50" />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-80 mt-1">{description}</p>
      </div>
    </Link>
  );
};

export default QuickActionCard;