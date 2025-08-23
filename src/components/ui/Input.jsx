import React from 'react';

const Input = ({ 
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  ...props 
}) => {
  const inputClasses = [
    'w-full px-3 py-2 border rounded-lg transition-colors duration-200',
    'focus-ring',
    error 
      ? 'error-state' 
      : 'border-gray-300 bg-white hover:border-gray-400',
    disabled ? 'disabled-bg' : '',
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
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && (
        <p className="text-sm error-text">{error}</p>
      )}
    </div>
  );
};

export default Input;