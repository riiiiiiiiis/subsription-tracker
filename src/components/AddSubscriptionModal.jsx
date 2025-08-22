import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Modal from '@/components/ui/Modal.jsx';
import Button from '@/components/ui/Button.jsx';
import Input from '@/components/ui/Input.jsx';
import Select from '@/components/ui/Select.jsx';
import useUnifiedStore from '@/store/unified-store';
import { getCategoryLabel } from '@/types';

const AddSubscriptionModal = ({ 
  isOpen, 
  onClose, 
  editSubscription = null 
}) => {
  const addSubscription = useUnifiedStore(state => state.addSubscription);
  const updateSubscription = useUnifiedStore(state => state.updateSubscription);
  const isEditing = !!editSubscription;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    currency: 'USD',
    billingCycle: 'monthly',
    nextPaymentDate: '',
    category: 'other',
    website: '',
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category options
  const categoryOptions = [
    { value: 'entertainment', label: getCategoryLabel('entertainment') },
    { value: 'utilities', label: getCategoryLabel('utilities') },
    { value: 'software', label: getCategoryLabel('software') },
    { value: 'food', label: getCategoryLabel('food') },
    { value: 'health', label: getCategoryLabel('health') },
    { value: 'other', label: getCategoryLabel('other') },
  ];

  // Billing cycle options
  const billingCycleOptions = [
    { value: 'weekly', label: 'Еженедельно' },
    { value: 'monthly', label: 'Ежемесячно' },
    { value: 'yearly', label: 'Ежегодно' },
  ];

  // Currency options
  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD ($)' },
    { value: 'AUD', label: 'AUD ($)' },
  ];

  // Load edit data
  useEffect(() => {
    if (isEditing && editSubscription) {
      setFormData({
        name: editSubscription.name,
        description: editSubscription.description || '',
        amount: editSubscription.amount.toString(),
        currency: editSubscription.currency,
        billingCycle: editSubscription.billingCycle,
        nextPaymentDate: format(new Date(editSubscription.nextPaymentDate), 'yyyy-MM-dd'),
        category: editSubscription.category,
        website: editSubscription.website || '',
        isActive: editSubscription.isActive,
      });
    } else {
      // Reset form for new subscription
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      setFormData({
        name: '',
        description: '',
        amount: '',
        currency: 'USD',
        billingCycle: 'monthly',
        nextPaymentDate: format(tomorrow, 'yyyy-MM-dd'),
        category: 'other',
        website: '',
        isActive: true,
      });
    }
    setErrors({});
  }, [isEditing, editSubscription, isOpen]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Требуется название';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Сумма должна быть больше 0';
    }

    if (!formData.nextPaymentDate) {
      newErrors.nextPaymentDate = 'Требуется дата следующего платежа';
    }

    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = 'Введите корректный URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const subscriptionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        nextPaymentDate: new Date(formData.nextPaymentDate),
        website: formData.website || undefined,
        description: formData.description || undefined,
      };

      let result;
      if (isEditing) {
        result = await updateSubscription(editSubscription.id, subscriptionData);
      } else {
        result = await addSubscription(subscriptionData);
      }

      if (result.success) {
        onClose();
      } else {
        console.error('Error saving subscription:', result.error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error saving subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Редактировать подписку' : 'Добавить подписку'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <Input
          label="Название"
          placeholder="например, Netflix, Spotify"
          value={formData.name}
          onChange={handleInputChange('name')}
          error={errors.name}
          required
        />

        {/* Description */}
        <Input
          label="Описание"
          placeholder="Необязательное описание"
          value={formData.description}
          onChange={handleInputChange('description')}
          error={errors.description}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Amount */}
          <Input
            label="Сумма"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleInputChange('amount')}
            error={errors.amount}
            required
          />

          {/* Currency */}
          <Select
            label="Валюта"
            value={formData.currency}
            onChange={handleInputChange('currency')}
            options={currencyOptions}
            error={errors.currency}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Billing Cycle */}
          <Select
            label="Период оплаты"
            value={formData.billingCycle}
            onChange={handleInputChange('billingCycle')}
            options={billingCycleOptions}
            error={errors.billingCycle}
          />

          {/* Category */}
          <Select
            label="Категория"
            value={formData.category}
            onChange={handleInputChange('category')}
            options={categoryOptions}
            error={errors.category}
          />
        </div>

        {/* Next Payment Date */}
        <Input
          label="Дата следующего платежа"
          type="date"
          value={formData.nextPaymentDate}
          onChange={handleInputChange('nextPaymentDate')}
          error={errors.nextPaymentDate}
          required
        />

        {/* Website */}
        <Input
          label="Веб-сайт"
          type="url"
          placeholder="https://example.com"
          value={formData.website}
          onChange={handleInputChange('website')}
          error={errors.website}
        />

        {/* Active Status */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={handleInputChange('isActive')}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Активная подписка
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (isEditing ? 'Обновление...' : 'Добавление...')
              : (isEditing ? 'Обновить подписку' : 'Добавить подписку')
            }
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSubscriptionModal;