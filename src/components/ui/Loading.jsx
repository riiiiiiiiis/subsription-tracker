import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const Loading = ({ 
  size = 'md', 
  text, 
  textTranslationKey = 'common.loading', 
  className = '' 
}) => {
  const { t } = useTranslation();
  
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  // Use translation if text is not provided
  const displayText = text || t(textTranslationKey);

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary-500`}></div>
      {displayText && <span className="text-gray-600 text-sm">{displayText}</span>}
    </div>
  );
};

export default Loading;