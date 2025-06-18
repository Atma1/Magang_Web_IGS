import React from 'react';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  const baseClasses = "flex items-center justify-center";
  const sizeClasses = fullScreen 
    ? "fixed inset-0 bg-white bg-opacity-90 z-50" 
    : "w-full py-12";
  
  return (
    <div className={`${baseClasses} ${sizeClasses}`}>
      <div className="relative">
        <div className="h-16 w-16">
          <div className="absolute h-16 w-16 rounded-full border-4 border-gray-200"></div>
          <div className="absolute h-16 w-16 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
        </div>
        {fullScreen && (
          <span className="mt-4 block text-center text-primary-600 font-medium">Loading...</span>
        )}
      </div>
    </div>
  );
};

export default Loading;
