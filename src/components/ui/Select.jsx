import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ 
  label,
  error,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  className = '',
  ...props 
}) => {
  const selectClasses = [
    'w-full px-3 py-2 border rounded-lg transition-colors duration-200 appearance-none',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    'bg-white',
    error 
      ? 'border-red-300 bg-red-50' 
      : 'border-gray-300 hover:border-gray-400',
    disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={selectClasses}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;