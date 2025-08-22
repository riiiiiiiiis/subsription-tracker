import React from 'react';

const Loading = ({ size = 'md', text = 'Загрузка...', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary-500`}></div>
      {text && <span className="text-gray-600 text-sm">{text}</span>}
    </div>
  );
};

export default Loading;