// Core subscription types and interfaces (JavaScript compatible)

// Billing cycle options
export const BILLING_CYCLES = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly', 
  YEARLY: 'yearly'
};

// Subscription categories
export const CATEGORIES = {
  ENTERTAINMENT: 'entertainment',
  UTILITIES: 'utilities', 
  SOFTWARE: 'software',
  FOOD: 'food',
  HEALTH: 'health',
  OTHER: 'other'
};

// Utility functions for subscriptions
export const getCategoryColor = (category) => {
  const colors = {
    entertainment: 'text-red-600 bg-red-50',
    utilities: 'text-green-600 bg-green-50',
    software: 'text-purple-600 bg-purple-50',
    food: 'text-orange-600 bg-orange-50',
    health: 'text-cyan-600 bg-cyan-50',
    other: 'text-gray-600 bg-gray-50',
  };
  return colors[category] || colors.other;
};

export const getCategoryLabel = (category) => {
  const labels = {
    entertainment: 'Развлечения',
    utilities: 'Коммунальные услуги',
    software: 'Программное обеспечение',
    food: 'Еда и доставка',
    health: 'Здоровье и фитнес',
    other: 'Другое',
  };
  return labels[category] || 'Другое';
};

export const getBillingCycleLabel = (cycle) => {
  const labels = {
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно',
    yearly: 'Ежегодно',
  };
  return labels[cycle];
};

export const calculateMonthlyAmount = (amount, cycle) => {
  switch (cycle) {
    case 'weekly':
      return amount * 4.33; // Average weeks per month
    case 'monthly':
      return amount;
    case 'yearly':
      return amount / 12;
    default:
      return amount;
  }
};

export const calculateNextPaymentDate = (lastPayment, cycle) => {
  const next = new Date(lastPayment);
  
  switch (cycle) {
    case 'weekly':
      next.setDate(next.getDate() + 7);
      break;
    case 'monthly':
      next.setMonth(next.getMonth() + 1);
      break;
    case 'yearly':
      next.setFullYear(next.getFullYear() + 1);
      break;
  }
  
  return next;
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const generateId = () => {
  return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Validation functions
export const validateSubscription = (subscription) => {
  const errors = {};
  
  if (!subscription.name || subscription.name.trim() === '') {
    errors.name = 'Требуется название';
  }

  if (!subscription.amount || subscription.amount <= 0) {
    errors.amount = 'Сумма должна быть больше 0';
  }

  if (!subscription.billingCycle || !Object.values(BILLING_CYCLES).includes(subscription.billingCycle)) {
    errors.billingCycle = 'Требуется корректный цикл оплаты';
  }

  if (!subscription.category || !Object.values(CATEGORIES).includes(subscription.category)) {
    errors.category = 'Требуется корректная категория';
  }

  if (!subscription.nextPaymentDate) {
    errors.nextPaymentDate = 'Требуется дата следующего платежа';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Sample subscription data
export const getSampleSubscriptions = () => [
  {
    id: generateId(),
    name: 'Netflix',
    description: 'Стриминговый сервис',
    amount: 15.99,
    currency: 'USD',
    billingCycle: 'monthly',
    nextPaymentDate: new Date(2025, 8, 15),
    category: 'entertainment',
    website: 'https://netflix.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    name: 'Spotify Premium',
    description: 'Музыкальный стриминг',
    amount: 9.99,
    currency: 'USD',
    billingCycle: 'monthly',
    nextPaymentDate: new Date(2025, 8, 20),
    category: 'entertainment',
    website: 'https://spotify.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    name: 'Adobe Creative Suite',
    description: 'Пакет для дизайна',
    amount: 52.99,
    currency: 'USD',
    billingCycle: 'monthly',
    nextPaymentDate: new Date(2025, 8, 25),
    category: 'software',
    website: 'https://adobe.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    name: 'Абонемент в спортзал',
    description: 'Местный фитнес-центр',
    amount: 35.00,
    currency: 'USD',
    billingCycle: 'monthly',
    nextPaymentDate: new Date(2025, 8, 10),
    category: 'health',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];