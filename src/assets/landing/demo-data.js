// Demo data for landing page demonstrations
// This data is static and used only for marketing purposes

export const demoSubscriptions = [
  {
    id: 'demo-1',
    name: 'Netflix',
    category: 'Entertainment',
    cost: 15.99,
    billingCycle: 'monthly',
    nextBilling: '2024-02-15',
    status: 'active',
    color: '#E50914',
    icon: 'N'
  },
  {
    id: 'demo-2',
    name: 'Spotify',
    category: 'Entertainment',
    cost: 9.99,
    billingCycle: 'monthly',
    nextBilling: '2024-02-16',
    status: 'active',
    color: '#1DB954',
    icon: 'S'
  },
  {
    id: 'demo-3',
    name: 'Adobe Creative Cloud',
    category: 'Productivity',
    cost: 22.99,
    billingCycle: 'monthly',
    nextBilling: '2024-02-18',
    status: 'active',
    color: '#FF0000',
    icon: 'A'
  },
  {
    id: 'demo-4',
    name: 'Dropbox',
    category: 'Storage',
    cost: 11.99,
    billingCycle: 'monthly',
    nextBilling: '2024-02-20',
    status: 'active',
    color: '#0061FF',
    icon: 'D'
  },
  {
    id: 'demo-5',
    name: 'iCloud Storage',
    category: 'Storage',
    cost: 2.99,
    billingCycle: 'monthly',
    nextBilling: '2024-02-22',
    status: 'active',
    color: '#007AFF',
    icon: 'i'
  },
  {
    id: 'demo-6',
    name: 'Slack',
    category: 'Communication',
    cost: 6.67,
    billingCycle: 'monthly',
    nextBilling: '2024-02-25',
    status: 'active',
    color: '#4A154B',
    icon: 'S'
  },
  {
    id: 'demo-7',
    name: 'Zoom Pro',
    category: 'Communication',
    cost: 14.99,
    billingCycle: 'monthly',
    nextBilling: '2024-02-28',
    status: 'active',
    color: '#2D8CFF',
    icon: 'Z'
  },
  {
    id: 'demo-8',
    name: 'GitHub Pro',
    category: 'Development',
    cost: 4.00,
    billingCycle: 'monthly',
    nextBilling: '2024-03-01',
    status: 'active',
    color: '#181717',
    icon: 'G'
  },
  {
    id: 'demo-9',
    name: 'Figma Professional',
    category: 'Design',
    cost: 12.00,
    billingCycle: 'monthly',
    nextBilling: '2024-03-03',
    status: 'active',
    color: '#F24E1E',
    icon: 'F'
  }
];

export const demoCategoryTotals = [
  {
    category: 'Entertainment',
    total: 25.98,
    count: 2,
    color: '#EF4444'
  },
  {
    category: 'Productivity',
    total: 22.99,
    count: 1,
    color: '#3B82F6'
  },
  {
    category: 'Storage',
    total: 14.98,
    count: 2,
    color: '#10B981'
  },
  {
    category: 'Communication',
    total: 21.66,
    count: 2,
    color: '#8B5CF6'
  },
  {
    category: 'Development',
    total: 4.00,
    count: 1,
    color: '#F59E0B'
  },
  {
    category: 'Design',
    total: 12.00,
    count: 1,
    color: '#EC4899'
  }
];

export const demoMonthlyData = [
  {
    month: 'August',
    year: 2023,
    total: 142.50,
    subscriptions: 8,
    newSubscriptions: 1,
    cancelledSubscriptions: 0
  },
  {
    month: 'September',
    year: 2023,
    total: 156.47,
    subscriptions: 9,
    newSubscriptions: 1,
    cancelledSubscriptions: 0
  },
  {
    month: 'October',
    year: 2023,
    total: 134.99,
    subscriptions: 8,
    newSubscriptions: 0,
    cancelledSubscriptions: 1
  },
  {
    month: 'November',
    year: 2023,
    total: 167.96,
    subscriptions: 10,
    newSubscriptions: 2,
    cancelledSubscriptions: 0
  },
  {
    month: 'December',
    year: 2023,
    total: 149.47,
    subscriptions: 9,
    newSubscriptions: 0,
    cancelledSubscriptions: 1
  },
  {
    month: 'January',
    year: 2024,
    total: 158.96,
    subscriptions: 9,
    newSubscriptions: 1,
    cancelledSubscriptions: 1
  }
];

export const demoUpcomingPayments = [
  {
    id: 'payment-1',
    subscription: 'Netflix',
    amount: 15.99,
    dueDate: '2024-02-15',
    category: 'Entertainment',
    daysUntilDue: 0,
    status: 'due-today'
  },
  {
    id: 'payment-2',
    subscription: 'Spotify',
    amount: 9.99,
    dueDate: '2024-02-16',
    category: 'Entertainment',
    daysUntilDue: 1,
    status: 'due-soon'
  },
  {
    id: 'payment-3',
    subscription: 'Adobe Creative Cloud',
    amount: 22.99,
    dueDate: '2024-02-18',
    category: 'Productivity',
    daysUntilDue: 3,
    status: 'upcoming'
  },
  {
    id: 'payment-4',
    subscription: 'Dropbox',
    amount: 11.99,
    dueDate: '2024-02-20',
    category: 'Storage',
    daysUntilDue: 5,
    status: 'upcoming'
  }
];

export const demoAnalytics = {
  totalMonthlySpending: 156.47,
  totalActiveSubscriptions: 9,
  averagePerSubscription: 17.38,
  potentialSavings: 24.50,
  monthlyGrowth: 12.3,
  yearOverYearGrowth: 8.7,
  mostExpensiveCategory: 'Entertainment',
  leastUsedSubscriptions: ['Old Streaming Service', 'Unused App'],
  upcomingRenewals: 4,
  weeklySpending: 51.96
};

export const demoTrendData = {
  spendingTrend: 'increasing',
  trendPercentage: 10.2,
  projectedNextMonth: 170.00,
  seasonalPattern: 'Higher spending during winter months',
  recommendations: [
    'Consider cancelling unused subscriptions',
    'Look for annual billing discounts',
    'Review entertainment category spending'
  ]
};

// Helper functions for demo data
export const getTotalSpending = () => {
  return demoSubscriptions.reduce((total, sub) => total + sub.cost, 0);
};

export const getSubscriptionsByCategory = () => {
  const categories = {};
  demoSubscriptions.forEach(sub => {
    if (!categories[sub.category]) {
      categories[sub.category] = [];
    }
    categories[sub.category].push(sub);
  });
  return categories;
};

export const getUpcomingPaymentsThisWeek = () => {
  return demoUpcomingPayments.filter(payment => payment.daysUntilDue <= 7);
};

export const getCategorySpending = () => {
  const spending = {};
  demoSubscriptions.forEach(sub => {
    if (!spending[sub.category]) {
      spending[sub.category] = 0;
    }
    spending[sub.category] += sub.cost;
  });
  return spending;
};