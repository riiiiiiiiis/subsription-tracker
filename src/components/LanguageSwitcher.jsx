import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { LANGUAGE_OPTIONS } from '@/translations';

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, setLanguage } = useTranslation();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
        {LANGUAGE_OPTIONS.find(opt => opt.value === currentLanguage)?.flag || '🌐'} 
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;