import React from "react";

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      {/* Logo */}
      {/* <img
        src="/images/Prapancham-logo.png"
        alt="Prapancham Logo"
        className="w-4 h-4 mb-6 animate-pulse"
      /> */}

      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 bg-primary rounded-full opacity-20"></div>
      </div>

      {/* Message */}
      <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
