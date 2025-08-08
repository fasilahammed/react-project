const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  const iconClasses = {
    sales: 'text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
    orders: 'text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300',
    users: 'text-purple-500 bg-purple-100 dark:bg-purple-900 dark:text-purple-300',
    products: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${iconClasses[icon]}`}>
          {/* You can add specific icons for each type here */}
          <span className="text-lg">📊</span>
        </div>
      </div>
      <div className={`mt-2 flex items-center text-sm ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
        <span className="ml-1">
          {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
        </span>
      </div>
    </div>
  );
};

export default StatCard;