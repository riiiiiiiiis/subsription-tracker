import { useTranslation } from '@/hooks/useTranslation';

// Hook to get translated category labels
export const useCategoryLabels = () => {
  const { t } = useTranslation();
  
  const getCategoryLabel = (category) => {
    const labels = {
      entertainment: t('categories.entertainment'),
      utilities: t('categories.utilities'),
      software: t('categories.software'),
      food: t('categories.food'),
      health: t('categories.health'),
      education: t('categories.education'),
      news: t('categories.news'),
      productivity: t('categories.productivity'),
      other: t('categories.other'),
    };
    return labels[category] || labels.other;
  };
  
  return { getCategoryLabel };
};

// Hook to get translated billing cycle labels
export const useBillingCycleLabels = () => {
  const { t } = useTranslation();
  
  const getBillingCycleLabel = (cycle) => {
    const labels = {
      weekly: t('billingCycles.weekly'),
      monthly: t('billingCycles.monthly'),
      quarterly: t('billingCycles.quarterly'),
      yearly: t('billingCycles.yearly'),
    };
    return labels[cycle] || cycle;
  };
  
  return { getBillingCycleLabel };
};

// Hook to get translated options for UI components
export const useTranslatedOptions = () => {
  const { t } = useTranslation();
  const { getCategoryLabel } = useCategoryLabels();
  const { getBillingCycleLabel } = useBillingCycleLabels();
  
  const getCategoryOptions = () => [
    { value: 'entertainment', label: getCategoryLabel('entertainment') },
    { value: 'utilities', label: getCategoryLabel('utilities') },
    { value: 'software', label: getCategoryLabel('software') },
    { value: 'food', label: getCategoryLabel('food') },
    { value: 'health', label: getCategoryLabel('health') },
    { value: 'education', label: getCategoryLabel('education') },
    { value: 'news', label: getCategoryLabel('news') },
    { value: 'productivity', label: getCategoryLabel('productivity') },
    { value: 'other', label: getCategoryLabel('other') },
  ];

  const getCategoryOptionsWithAll = () => [
    { value: 'all', label: t('common.selectAll') },
    ...getCategoryOptions(),
  ];

  const getBillingCycleOptions = () => [
    { value: 'weekly', label: getBillingCycleLabel('weekly') },
    { value: 'monthly', label: getBillingCycleLabel('monthly') },
    { value: 'quarterly', label: getBillingCycleLabel('quarterly') },
    { value: 'yearly', label: getBillingCycleLabel('yearly') },
  ];

  const getCurrencyOptions = () => [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'RUB', label: 'RUB (₽)' },
  ];

  const getStatusOptions = () => [
    { value: 'all', label: t('common.selectAll') },
    { value: 'active', label: t('subscriptions.active') },
    { value: 'inactive', label: t('subscriptions.inactive') },
  ];

  const getSortOptions = () => [
    { value: 'name', label: t('subscriptions.name') },
    { value: 'amount', label: t('subscriptions.amount') },
    { value: 'nextPayment', label: t('subscriptions.nextPayment') },
    { value: 'createdAt', label: t('common.dateAdded') },
  ];

  return {
    getCategoryOptions,
    getCategoryOptionsWithAll,
    getBillingCycleOptions,
    getCurrencyOptions,
    getStatusOptions,
    getSortOptions
  };
};