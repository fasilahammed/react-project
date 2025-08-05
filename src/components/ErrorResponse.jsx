// src/pages/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

export default function ErrorPage({
  title = "Oops! Something went wrong",
  message = "The page you’re looking for doesn’t exist or has been moved.",
  buttonText = "Go Back Home",
  buttonLink = "/"
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center px-6">
      {/* Icon */}
      <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-6">
        <FiAlertTriangle size={40} className="text-white" />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
        {title}
      </h1>

      {/* Message */}
      <p className="text-gray-600 text-center max-w-md mb-8">
        {message}
      </p>

      {/* Action Button */}
      <Link
        to={buttonLink}
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
      >
        <FiArrowLeft size={18} />
        {buttonText}
      </Link>

      {/* Footer Info */}
      <div className="mt-12 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SnapMob. All rights reserved.
      </div>
    </div>
  );
}
