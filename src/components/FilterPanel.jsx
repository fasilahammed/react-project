import React from 'react';
import { FaTimes } from 'react-icons/fa';

const FilterPanel = ({ isOpen, onClose, children }) => {
  return (
    // Main container for the panel and overlay
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      ></div>

      {/* The actual slide-out panel */}
      <div
        className={`relative flex flex-col h-full w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            aria-label="Close filters"
          >
            <FaTimes />
          </button>
        </div>

        {/* Panel Content (where the Filters component will go) */}
        <div className="flex-grow p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;