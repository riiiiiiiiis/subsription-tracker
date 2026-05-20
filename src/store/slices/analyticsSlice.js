import { addDays, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import { calculateMonthlyAmount } from '@/types/index.js';

export const createAnalyticsSlice = (set, get) => ({
  getTotalMonthlySpending: () => {
    const { data } = get();
    return data.subscriptions
      .filter(sub => sub.isActive)
      .reduce((total, sub) => {
        return total + calculateMonthlyAmount(sub.amount, sub.billingCycle);
      }, 0);
  },

  getTotalYearlySpending: () => {
    return get().getTotalMonthlySpending() * 12;
  },

  getSpendingByCategory: () => {
    const { data } = get();
    const activeSubscriptions = data.subscriptions.filter(sub => sub.isActive);
    const totalMonthly = get().getTotalMonthlySpending();

    const categoryData = activeSubscriptions.reduce((acc, sub) => {
      const monthlyAmount = calculateMonthlyAmount(sub.amount, sub.billingCycle);

      if (!acc[sub.category]) {
        acc[sub.category] = {
          category: sub.category,
          amount: 0,
          count: 0,
          percentage: 0,
        };
      }

      acc[sub.category].amount += monthlyAmount;
      acc[sub.category].count += 1;

      return acc;
    }, {});

    Object.values(categoryData).forEach(category => {
      category.percentage = totalMonthly > 0 ? (category.amount / totalMonthly) * 100 : 0;
    });

    return Object.values(categoryData);
  },

  getUpcomingPayments: (days = 30) => {
    const { data } = get();
    const now = new Date();
    const endDate = addDays(now, days);

    return data.subscriptions
      .filter(sub => sub.isActive)
      .filter(sub => {
        const paymentDate = new Date(sub.nextPaymentDate);
        return isWithinInterval(paymentDate, { start: now, end: endDate });
      })
      .map(sub => ({
        id: sub.id,
        subscriptionName: sub.name,
        amount: sub.amount,
        currency: sub.currency,
        dueDate: new Date(sub.nextPaymentDate),
        category: sub.category,
      }))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  },

  getThisMonthPayments: () => {
    const { data } = get();
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    return data.subscriptions
      .filter(sub => sub.isActive)
      .filter(sub => {
        const paymentDate = new Date(sub.nextPaymentDate);
        return isWithinInterval(paymentDate, { start: monthStart, end: monthEnd });
      });
  },
});

