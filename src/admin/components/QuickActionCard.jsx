import { Link } from 'react-router-dom';
import { FaPlus, FaUsers, FaShoppingBag, FaChartLine } from 'react-icons/fa';

const icons = {
  add: <FaPlus className="text-indigo-500" size={20} />,
  users: <FaUsers className="text-blue-500" size={20} />,
  orders: <FaShoppingBag className="text-green-500" size={20} />,
  analytics: <FaChartLine className="text-purple-500" size={20} />
};

const QuickActionCard = ({ title, icon, link, description }) => {
  return (
    <Link
      to={link}
      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-all border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500"
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-full bg-white dark:bg-gray-600">
          {icons[icon]}
        </div>
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuickActionCard;