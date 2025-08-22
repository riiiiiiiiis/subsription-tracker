import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'normal',
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    normal: 'p-4',
    lg: 'p-6',
  };

  const baseClasses = [
    'bg-white rounded-lg border border-gray-200 shadow-sm',
    hover ? 'hover:shadow-md transition-shadow duration-200' : '',
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

// Card subcomponents
Card.Header = ({ children, className = '' }) => (
  <div className={`border-b border-gray-200 pb-3 mb-3 ${className}`}>
    {children}
  </div>
);

Card.Title = ({ children, className = '' }) => (
  <h3 className={`text-lg font-medium text-gray-900 ${className}`}>
    {children}
  </h3>
);

Card.Content = ({ children, className = '' }) => (
  <div className={`text-gray-600 ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`border-t border-gray-200 pt-3 mt-3 ${className}`}>
    {children}
  </div>
);

export default Card;