import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { translations, SUPPORTED_LANGUAGES } from '@/translations';

// Create the Language Context
const LanguageContext = createContext();

// Language detector utility
const languageDetector = {
  detect: () => {
    // 1. Check localStorage
    const saved = localStorage.getItem('preferred-language');
    if (saved && SUPPORTED_LANGUAGES[saved.toUpperCase()]) {
      return saved;
    }
    
    // 2. Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (Object.values(SUPPORTED_LANGUAGES).includes(browserLang)) {
      return browserLang;
    }
    
    // 3. Default to Russian
    return SUPPORTED_LANGUAGES.RU;
  },
  
  save: (language) => {
    localStorage.setItem('preferred-language', language);
  }
};

// Translation utility functions
const translationUtils = {
  // Get nested translation by key (e.g., 'dashboard.title')
  getNestedTranslation: (obj, key) => {
    return key.split('.').reduce((o, k) => (o && o[k]) ? o[k] : null, obj);
  },
  
  // Interpolate values into translation strings
  interpolate: (template, values = {}) => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return values[key] !== undefined ? values[key] : match;
    });
  }
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(SUPPORTED_LANGUAGES.RU);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load language on initial render
  useEffect(() => {
    const detectedLanguage = languageDetector.detect();
    setCurrentLanguage(detectedLanguage);
    setIsLoading(false);
  }, []);
  
  // Save language preference when it changes
  useEffect(() => {
    if (!isLoading) {
      languageDetector.save(currentLanguage);
    }
  }, [currentLanguage, isLoading]);
  
  // Get translations for current language
  const currentTranslations = useMemo(() => {
    return translations[currentLanguage] || translations[SUPPORTED_LANGUAGES.RU];
  }, [currentLanguage]);
  
  // Translation function
  const t = useCallback((key, values = {}) => {
    if (isLoading) return key;
    
    try {
      const translation = translationUtils.getNestedTranslation(currentTranslations, key);
      if (translation) {
        return translationUtils.interpolate(translation, values);
      }
      console.warn(`Translation missing for key: ${key}`);
      return key; // Fallback to key if translation not found
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key; // Fallback to key on error
    }
  }, [currentTranslations, isLoading]);
  
  // Language switching function
  const setLanguage = (language) => {
    if (Object.values(SUPPORTED_LANGUAGES).includes(language)) {
      setCurrentLanguage(language);
    }
  };
  
  // Context value
  const contextValue = useMemo(() => ({
    currentLanguage,
    setLanguage,
    t,
    isLoading
  }), [currentLanguage, t, isLoading]);
  
  // Don't render children until language is loaded
  if (isLoading) {
    return null;
  }
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;