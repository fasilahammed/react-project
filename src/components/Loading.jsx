import React from "react";

const Loading = ({ 
  size = "medium", 
  color = "primary", 
  message = "Loading...",
  showMessage = true
}) => {
  // Size options
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-10 w-10",
    large: "h-14 w-14",
    xlarge: "h-16 w-16"
  };

  // Color options
  const colorClasses = {
    primary: "text-orange-500",
    secondary: "text-blue-500",
    white: "text-white",
    gray: "text-gray-500",
    dark: "text-gray-800"
  };

  // Text color options
  const textColorClasses = {
    primary: "text-orange-500",
    secondary: "text-blue-500",
    white: "text-white",
    gray: "text-gray-500",
    dark: "text-gray-800"
  };

  // Mobile phone SVG
  const MobileIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v12H7V4zm5 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white bg-opacity-90">
      <div className="animate-spin">
        <MobileIcon className={`${sizeClasses[size]} ${colorClasses[color]}`} />
      </div>
      {showMessage && (
        <p className={`mt-4 text-sm font-medium ${textColorClasses[color]}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;