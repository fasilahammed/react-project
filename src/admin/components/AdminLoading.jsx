import React from 'react';

const AdminLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
      <div className="text-center">
        {/* Violet-themed spinner */}
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent border-violet-400 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        
        {/* Loading text with violet accent */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-white">Loading Admin Panel</h2>
          <p className="text-gray-400 mt-1">Please wait while we prepare your dashboard</p>
        </div>
        
        {/* Optional progress bar */}
        <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden mt-6 mx-auto">
          <div className="h-full bg-violet-500 animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
     
    </div>
  );
};

export default AdminLoading;