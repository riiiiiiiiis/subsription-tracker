import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

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
  labelTranslationKey, // New prop for label translation
  placeholderTranslationKey, // New prop for placeholder translation
  errorTranslationKey, // New prop for error translation
  errorValues = {}, // Values for error interpolation
  ...props 
}) => {
  const { t } = useTranslation();
  
  const inputClasses = [
    'w-full px-3 py-2 border rounded-lg transition-colors duration-200',
    'focus-ring',
    error 
      ? 'error-state' 
      : 'border-gray-300 bg-white hover:border-gray-400',
    disabled ? 'disabled-bg' : '',
    className
  ].filter(Boolean).join(' ');

  // Use translation for label if provided
  const translatedLabel = labelTranslationKey ? t(labelTranslationKey) : label;
  
  // Use translation for placeholder if provided
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
      <input
        type={type}
        className={inputClasses}
        placeholder={translatedPlaceholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {translatedError && (
        <p className="text-sm error-text">{translatedError}</p>
      )}
    </div>
  );
};

export default Input;