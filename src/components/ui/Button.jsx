import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick,
  type = 'button',
  className = '',
  translationKey, // New prop for translation key
  ...props 
}) => {
  const { t } = useTranslation();
  
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus-ring';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-primary-500',
    ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const disabledClasses = 'disabled-state';
  
  const combinedClasses = [
    baseClasses,
    variants[variant],
    sizes[size],
    disabled ? disabledClasses : '',
    className
  ].filter(Boolean).join(' ');

  // Use translation if translationKey is provided, otherwise use children
  const content = translationKey ? t(translationKey) : children;

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;