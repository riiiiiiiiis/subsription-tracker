import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Select = ({ 
  label,
  error,
  value,
  onChange,
  options = [],
  placeholder = 'Выберите вариант',
  disabled = false,
  required = false,
  className = '',
  labelTranslationKey, // New prop for label translation
  placeholderTranslationKey, // New prop for placeholder translation
  errorTranslationKey, // New prop for error translation
  errorValues = {}, // Values for error interpolation
  ...props 
}) => {
  const { t } = useTranslation();
  
  const selectClasses = [
    'w-full px-3 py-2 border rounded-lg transition-colors duration-200 appearance-none',
    'focus-ring',
    'bg-white',
    error 
      ? 'error-state' 
      : 'border-gray-300 hover:border-gray-400',
    disabled ? 'disabled-state bg-gray-50' : 'cursor-pointer',
    className
  ].filter(Boolean).join(' ');

  // Use translation for label if provided
  const translatedLabel = labelTranslationKey ? t(labelTranslationKey) : label;
  
  // Use translation for placeholder if provided, otherwise use default placeholder
  const translatedPlaceholder = placeholderTranslationKey ? t(placeholderTranslationKey) : placeholder;
  
  // Use translation for error if provided
  const translatedError = errorTranslationKey ? t(errorTranslationKey, errorValues) : error;

  return (
    <div className="space-y-1">
      {translatedLabel && (
        <label className="block text-sm font-medium text-gray-700">
          {translatedLabel}
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
          {translatedPlaceholder && (
            <option value="" disabled>
              {translatedPlaceholder}
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
      {translatedError && (
        <p className="text-sm error-text">{translatedError}</p>
      )}
    </div>
  );
};

export default Select;