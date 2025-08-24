import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button.jsx';
import { useTranslation } from '@/hooks/useTranslation';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  titleTranslationKey // New prop for title translation
}) => {
  const { t } = useTranslation();
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  // Use translation for title if provided
  const translatedTitle = titleTranslationKey ? t(titleTranslationKey) : title;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative w-full ${sizes[size]} transform overflow-hidden rounded-lg bg-white shadow-xl transition-all`}>
          {/* Header */}
          {(translatedTitle || showCloseButton) && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {translatedTitle && (
                <h3 className="text-lg font-medium text-gray-900">
                  {translatedTitle}
                </h3>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-1"
                  translationKey="common.close"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;