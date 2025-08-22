import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { 
  generateId, 
  calculateMonthlyAmount, 
  calculateNextPaymentDate,
  getSampleSubscriptions
} from '../types/index.js';
import { addDays, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

const useSubscriptionStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        subscriptions: [],
        filteredSubscriptions: [],
        activeFilters: {
          category: 'all',
          status: 'all',
          sortBy: 'name',
          sortOrder: 'asc',
        },
        isLoading: false,
        selectedSubscription: null,

        // Actions
        addSubscription: (subscriptionData) => {
          const newSubscription = {
            ...subscriptionData,
            id: generateId(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set((state) => {
            const newSubscriptions = [...state.subscriptions, newSubscription];
            return {
              subscriptions: newSubscriptions,
              filteredSubscriptions: get().applyFilters(newSubscriptions),
            };
          });
        },

        updateSubscription: (id, updates) => {
          set((state) => {
            const updatedSubscriptions = state.subscriptions.map((sub) =>
              sub.id === id 
                ? { ...sub, ...updates, updatedAt: new Date() }
                : sub
            );
            return {
              subscriptions: updatedSubscriptions,
              filteredSubscriptions: get().applyFilters(updatedSubscriptions),
            };
          });
        },

        deleteSubscription: (id) => {
          set((state) => {
            const filteredSubscriptions = state.subscriptions.filter(sub => sub.id !== id);
            return {
              subscriptions: filteredSubscriptions,
              filteredSubscriptions: get().applyFilters(filteredSubscriptions),
            };
          });
        },

        toggleSubscriptionStatus: (id) => {
          const subscription = get().subscriptions.find(sub => sub.id === id);
          if (subscription) {
            get().updateSubscription(id, { isActive: !subscription.isActive });
          }
        },

        setSelectedSubscription: (subscription) => {
          set({ selectedSubscription: subscription });
        },

        setFilters: (filters) => {
          set((state) => {
            const newFilters = { ...state.activeFilters, ...filters };
            return {
              activeFilters: newFilters,
              filteredSubscriptions: get().applyFilters(state.subscriptions, newFilters),
            };
          });
        },

        applyFilters: (subscriptions, filters = null) => {
          const activeFilters = filters || get().activeFilters;
          let filtered = [...subscriptions];

          // Filter by category
          if (activeFilters.category !== 'all') {
            filtered = filtered.filter(sub => sub.category === activeFilters.category);
          }

          // Filter by status
          if (activeFilters.status !== 'all') {
            const isActive = activeFilters.status === 'active';
            filtered = filtered.filter(sub => sub.isActive === isActive);
          }

          // Sort
          filtered.sort((a, b) => {
            const aValue = a[activeFilters.sortBy];
            const bValue = b[activeFilters.sortBy];
            
            let comparison = 0;
            if (aValue < bValue) comparison = -1;
            if (aValue > bValue) comparison = 1;
            
            return activeFilters.sortOrder === 'desc' ? -comparison : comparison;
          });

          return filtered;
        },

        // Analytics getters
        getTotalMonthlySpending: () => {
          const { subscriptions } = get();
          return subscriptions
            .filter(sub => sub.isActive)
            .reduce((total, sub) => {
              return total + calculateMonthlyAmount(sub.amount, sub.billingCycle);
            }, 0);
        },

        getTotalYearlySpending: () => {
          return get().getTotalMonthlySpending() * 12;
        },

        getSpendingByCategory: () => {
          const { subscriptions } = get();
          const activeSubscriptions = subscriptions.filter(sub => sub.isActive);
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

          // Calculate percentages
          Object.values(categoryData).forEach(category => {
            category.percentage = totalMonthly > 0 ? (category.amount / totalMonthly) * 100 : 0;
          });

          return Object.values(categoryData);
        },

        getUpcomingPayments: (days = 30) => {
          const { subscriptions } = get();
          const now = new Date();
          const endDate = addDays(now, days);

          return subscriptions
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
          const { subscriptions } = get();
          const now = new Date();
          const monthStart = startOfMonth(now);
          const monthEnd = endOfMonth(now);

          return subscriptions
            .filter(sub => sub.isActive)
            .filter(sub => {
              const paymentDate = new Date(sub.nextPaymentDate);
              return isWithinInterval(paymentDate, { start: monthStart, end: monthEnd });
            });
        },

        // Initialize with sample data if empty
        initializeSampleData: () => {
          const { subscriptions } = get();
          if (subscriptions.length === 0) {
            const sampleSubscriptions = getSampleSubscriptions();

            set(() => ({
              subscriptions: sampleSubscriptions,
              filteredSubscriptions: sampleSubscriptions,
            }));
          }
        },

        setLoading: (loading) => {
          set({ isLoading: loading });
        },
      }),
      {
        name: 'subscription-tracker-storage',
        partialize: (state) => ({
          subscriptions: state.subscriptions,
          activeFilters: state.activeFilters,
        }),
      }
    ),
    { name: 'subscription-tracker' }
  )
);

export default useSubscriptionStore;