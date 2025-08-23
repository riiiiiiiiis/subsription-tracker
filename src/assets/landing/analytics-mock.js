// Mock analytics data for landing page visualizations
// Provides realistic data for charts and analytics demonstrations

export const mockChartData = {
  // Monthly spending trend data
  monthlySpending: [
    { month: 'Aug', amount: 142.50, subscriptions: 8, trend: 'neutral' },
    { month: 'Sep', amount: 156.47, subscriptions: 9, trend: 'up' },
    { month: 'Oct', amount: 134.99, subscriptions: 8, trend: 'down' },
    { month: 'Nov', amount: 167.96, subscriptions: 10, trend: 'up' },
    { month: 'Dec', amount: 149.47, subscriptions: 9, trend: 'down' },
    { month: 'Jan', amount: 158.96, subscriptions: 9, trend: 'up' }
  ],

  // Category breakdown with spending percentages
  categoryBreakdown: [
    { 
      category: 'Entertainment', 
      amount: 45.97, 
      percentage: 29.4, 
      count: 3,
      color: '#EF4444',
      trend: '+5.2%'
    },
    { 
      category: 'Productivity', 
      amount: 39.99, 
      percentage: 25.6, 
      count: 2,
      color: '#3B82F6',
      trend: '+12.1%'
    },
    { 
      category: 'Storage', 
      amount: 23.98, 
      percentage: 15.3, 
      count: 2,
      color: '#10B981',
      trend: '-2.4%'
    },
    { 
      category: 'Communication', 
      amount: 29.99, 
      percentage: 19.2, 
      count: 1,
      color: '#8B5CF6',
      trend: 'new'
    },
    { 
      category: 'Development', 
      amount: 16.54, 
      percentage: 10.5, 
      count: 1,
      color: '#F59E0B',
      trend: '-8.7%'
    }
  ],

  // Year-over-year comparison
  yearComparison: {
    currentYear: {
      year: 2024,
      totalSpending: 1887.52,
      averageMonthly: 157.29,
      activeSubscriptions: 9
    },
    previousYear: {
      year: 2023,
      totalSpending: 1654.80,
      averageMonthly: 137.90,
      activeSubscriptions: 7
    },
    growth: {
      percentage: 14.1,
      direction: 'increase',
      amount: 232.72
    }
  },

  // Weekly spending pattern
  weeklyPattern: [
    { day: 'Mon', amount: 15.99, subscriptions: 1 },
    { day: 'Tue', amount: 0, subscriptions: 0 },
    { day: 'Wed', amount: 22.99, subscriptions: 1 },
    { day: 'Thu', amount: 0, subscriptions: 0 },
    { day: 'Fri', amount: 9.99, subscriptions: 1 },
    { day: 'Sat', amount: 0, subscriptions: 0 },
    { day: 'Sun', amount: 11.99, subscriptions: 1 }
  ]
};

export const mockMetrics = {
  // Key performance indicators
  totalSpending: {
    current: 156.47,
    previous: 139.23,
    change: 12.3,
    trend: 'up'
  },
  
  activeSubscriptions: {
    current: 9,
    previous: 8,
    change: 12.5,
    trend: 'up'
  },
  
  averagePerService: {
    current: 17.38,
    previous: 17.40,
    change: -0.1,
    trend: 'down'
  },
  
  potentialSavings: {
    current: 24.50,
    identified: ['Unused Netflix account', 'Duplicate storage services'],
    actions: ['Cancel unused subscriptions', 'Consolidate services']
  },

  // Forecasting data
  forecast: {
    nextMonth: {
      predicted: 167.50,
      confidence: 85,
      factors: ['New subscription additions', 'Price increases']
    },
    quarterEnd: {
      predicted: 485.20,
      budgetTarget: 450.00,
      variance: 35.20
    }
  }
};

export const mockInsights = {
  // Actionable insights for users
  recommendations: [
    {
      type: 'cost_saving',
      title: 'Cancel Unused Subscriptions',
      description: 'You have 2 subscriptions you haven\'t used in 30+ days',
      potential_saving: 24.50,
      priority: 'high',
      action: 'Review and cancel'
    },
    {
      type: 'optimization',
      title: 'Annual Billing Discount',
      description: 'Switch to annual billing to save 15% on 3 subscriptions',
      potential_saving: 42.18,
      priority: 'medium',
      action: 'Update billing cycle'
    },
    {
      type: 'alert',
      title: 'Price Increase Detected',
      description: 'Netflix increased from $13.99 to $15.99',
      potential_impact: 24.00,
      priority: 'info',
      action: 'Budget adjustment needed'
    }
  ],

  // Usage patterns
  patterns: {
    most_active_category: 'Entertainment',
    least_used_services: ['Old App', 'Trial Service'],
    peak_billing_day: 15,
    average_service_lifetime: '14 months',
    cancellation_rate: '8% annually'
  },

  // Benchmarking data
  benchmarks: {
    user_vs_average: {
      your_spending: 156.47,
      average_spending: 189.20,
      percentile: 35,
      status: 'below_average'
    },
    category_comparison: {
      entertainment: { you: 45.97, average: 52.30, status: 'good' },
      productivity: { you: 39.99, average: 34.80, status: 'high' },
      storage: { you: 23.98, average: 18.40, status: 'high' }
    }
  }
};

export const mockGoals = {
  // User financial goals
  monthly_budget: {
    target: 150.00,
    current: 156.47,
    variance: 6.47,
    status: 'over_budget',
    days_remaining: 12
  },
  
  savings_target: {
    target: 300.00,
    achieved: 147.50,
    progress: 49.2,
    timeline: 'Q1 2024'
  },

  // Subscription limits
  subscription_limit: {
    target: 8,
    current: 9,
    status: 'exceeded',
    recommendation: 'Consider consolidating services'
  }
};

// Chart configuration helpers
export const getChartConfig = (type) => {
  const configs = {
    bar: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
          borderColor: '#374151',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#6B7280' }
        },
        y: {
          grid: { color: '#E5E7EB' },
          ticks: { color: '#6B7280' }
        }
      }
    },
    
    doughnut: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#374151' }
        }
      }
    },
    
    line: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: { radius: 4, hoverRadius: 6 },
        line: { tension: 0.3 }
      },
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#6B7280' }
        },
        y: {
          grid: { color: '#E5E7EB' },
          ticks: { color: '#6B7280' }
        }
      }
    }
  };
  
  return configs[type] || configs.bar;
};

// Utility functions for mock data
export const generateTrendData = (months = 6) => {
  const baseAmount = 150;
  return Array.from({ length: months }, (_, i) => ({
    month: new Date(2023, 7 + i, 1).toLocaleDateString('en-US', { month: 'short' }),
    amount: baseAmount + (Math.random() - 0.5) * 40,
    subscriptions: 8 + Math.floor(Math.random() * 3)
  }));
};

export const calculateGrowthRate = (current, previous) => {
  return ((current - previous) / previous * 100).toFixed(1);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const getColorByCategory = (category) => {
  const colors = {
    'Entertainment': '#EF4444',
    'Productivity': '#3B82F6',
    'Storage': '#10B981',
    'Communication': '#8B5CF6',
    'Development': '#F59E0B',
    'Design': '#EC4899',
    'Health': '#F97316',
    'Education': '#84CC16'
  };
  return colors[category] || '#6B7280';
};