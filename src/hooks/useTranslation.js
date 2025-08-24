import { useTranslation as useTranslationContext } from '@/contexts/LanguageContext';

// Enhanced useTranslation hook with additional utility functions
export const useTranslation = () => {
  const { currentLanguage, setLanguage, t, isLoading } = useTranslationContext();
  
  // Enhanced translation function with array key support
  const translate = (key, values = {}) => {
    // Handle array of keys - return first available translation
    if (Array.isArray(key)) {
      for (const k of key) {
        const translation = t(k, values);
        if (translation !== k) {
          return translation;
        }
      }
      return key[0]; // Fallback to first key
    }
    
    return t(key, values);
  };
  
  // Pluralization helper
  const pluralize = (count, translations) => {
    return translationUtils.plural(count, translations, currentLanguage);
  };
  
  // Format currency based on language
  const formatCurrency = (amount, currency = 'USD') => {
    try {
      return new Intl.NumberFormat(currentLanguage, {
        style: 'currency',
        currency: currency
      }).format(amount);
    } catch (error) {
      // Fallback to simple formatting
      return `${amount} ${currency}`;
    }
  };
  
  // Format date based on language
  const formatDate = (date, options = {}) => {
    try {
      return new Intl.DateTimeFormat(currentLanguage, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
      }).format(new Date(date));
    } catch (error) {
      // Fallback to simple formatting
      return new Date(date).toLocaleDateString();
    }
  };
  
  // Get language direction (LTR/RTL)
  const getLanguageDirection = () => {
    // Currently all supported languages are LTR
    return 'ltr';
  };
  
  return {
    t: translate,
    currentLanguage,
    setLanguage,
    isLoading,
    pluralize,
    formatCurrency,
    formatDate,
    getLanguageDirection
  };
};

// Translation utility functions (same as in LanguageContext but exported for reuse)
export const translationUtils = {
  // Get nested translation by key (e.g., 'dashboard.title')
  getNestedTranslation: (obj, key) => {
    return key.split('.').reduce((o, k) => (o && o[k]) ? o[k] : null, obj);
  },
  
  // Interpolate values into translation strings
  interpolate: (template, values = {}) => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return values[key] !== undefined ? values[key] : match;
    });
  },
  
  // Handle pluralization based on language
  plural: (count, translations, currentLanguage) => {
    // Russian pluralization rules
    if (currentLanguage === 'ru') {
      const n = Math.abs(count);
      if (n % 10 === 1 && n % 100 !== 11) return translations.one;
      if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return translations.few;
      return translations.many;
    }
    
    // English pluralization rules
    return count === 1 ? translations.one : translations.other;
  }
};

export default useTranslation;