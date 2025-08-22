import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  calculateMonthlyAmount, 
  calculateNextPaymentDate
} from '../types/index.js';
import { addDays, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import subscriptionService from '../services/subscriptionService.js';
import { supabase } from '../lib/supabase.js';

const useSubscriptionStore = create(
  devtools(
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
      error: null,
      
      // Real-time subscription
      realtimeSubscription: null,
      
      // Auth state
      user: null,
      isAuthenticated: false,
      authLoading: true,

      // Initialize the store
      initialize: async () => {
        console.log('🚀 Store: Initialize called');
        set({ isLoading: true, authLoading: true });
        
        try {
          // Check authentication
          console.log('🔐 Store: Checking authentication...');
          const { data: { session } } = await supabase.auth.getSession();
          console.log('🔑 Store: Session check result:', { 
            hasSession: !!session, 
            hasUser: !!session?.user, 
            userEmail: session?.user?.email 
          });
          
          if (session?.user) {
            console.log('✅ Store: User authenticated, setting user and loading data...');
            set({ 
              user: session.user, 
              isAuthenticated: true,
              authLoading: false 
            });
            
            // Load user subscriptions
            console.log('📦 Store: About to load subscriptions...');
            await get().loadSubscriptions();
            
            // Set up real-time subscription
            console.log('📶 Store: Setting up real-time subscription...');
            get().setupRealtimeSubscription();
          } else {
            console.log('❌ Store: No authenticated user found');
            set({ 
              user: null, 
              isAuthenticated: false,
              authLoading: false,
              subscriptions: [],
              filteredSubscriptions: []
            });
          }
        } catch (error) {
          console.error('💥 Store: Error initializing store:', error);
          set({ 
            error: error.message,
            authLoading: false,
            isLoading: false
          });
        }
      },

      // Authentication methods
      setUser: (user) => {
        console.log('👤 Store: setUser called with:', user ? user.email : 'null');
        set({ 
          user, 
          isAuthenticated: !!user,
          authLoading: false
        });
        
        if (user) {
          console.log('📦 Store: User set, loading subscriptions...');
          get().loadSubscriptions();
          console.log('📶 Store: Setting up real-time subscription...');
          get().setupRealtimeSubscription();
        } else {
          console.log('🧹 Store: User cleared, cleaning up...');
          get().cleanup();
        }
      },

      // Cleanup when user logs out
      cleanup: () => {
        const { realtimeSubscription } = get();
        if (realtimeSubscription) {
          realtimeSubscription.unsubscribe();
        }
        
        set({
          subscriptions: [],
          filteredSubscriptions: [],
          selectedSubscription: null,
          user: null,
          isAuthenticated: false,
          realtimeSubscription: null,
          error: null
        });
      },

      // Load subscriptions from Supabase
      loadSubscriptions: async () => {
        console.log('🔄 Store: Starting loadSubscriptions...');
        set({ isLoading: true, error: null });
        
        try {
          console.log('📡 Store: Calling subscriptionService.getSubscriptions...');
          const { data, error } = await subscriptionService.getSubscriptions({
            orderBy: 'created_at',
            ascending: false
          });
          
          console.log('📊 Store: getSubscriptions result:', { 
            dataLength: data ? data.length : 0, 
            hasError: !!error,
            errorMessage: error ? error.message : null 
          });
          
          if (error) {
            console.error('❌ Store: Error loading subscriptions:', error);
            set({ error: error.message, isLoading: false });
            return;
          }
          
          const subscriptions = data || [];
          console.log('✅ Store: Setting subscriptions in state:', subscriptions.length);
          set({ 
            subscriptions,
            filteredSubscriptions: get().applyFilters(subscriptions),
            isLoading: false,
            error: null
          });
        } catch (error) {
          console.error('💥 Store: Unexpected error loading subscriptions:', error);
          set({ 
            error: error.message,
            isLoading: false
          });
        }
      },

      // CRUD Operations
      addSubscription: async (subscriptionData) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await subscriptionService.createSubscription(subscriptionData);
          
          if (error) {
            set({ error: error.message, isLoading: false });
            return { success: false, error };
          }
          
          // Reload subscriptions to get the latest data
          await get().loadSubscriptions();
          
          return { success: true, data };
        } catch (error) {
          console.error('Error adding subscription:', error);
          set({ 
            error: error.message,
            isLoading: false
          });
          return { success: false, error };
        }
      },

      updateSubscription: async (id, updates) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await subscriptionService.updateSubscription(id, updates);
          
          if (error) {
            set({ error: error.message, isLoading: false });
            return { success: false, error };
          }
          
          // Update local state optimistically
          const { subscriptions } = get();
          const updatedSubscriptions = subscriptions.map(sub => 
            sub.id === id ? { ...sub, ...data } : sub
          );
          
          set({ 
            subscriptions: updatedSubscriptions,
            filteredSubscriptions: get().applyFilters(updatedSubscriptions),
            isLoading: false
          });
          
          return { success: true, data };
        } catch (error) {
          console.error('Error updating subscription:', error);
          set({ 
            error: error.message,
            isLoading: false
          });
          return { success: false, error };
        }
      },

      deleteSubscription: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          const { success, error } = await subscriptionService.deleteSubscription(id);
          
          if (!success) {
            set({ error: error.message, isLoading: false });
            return { success: false, error };
          }
          
          // Update local state
          const { subscriptions } = get();
          const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id);
          
          set({ 
            subscriptions: updatedSubscriptions,
            filteredSubscriptions: get().applyFilters(updatedSubscriptions),
            selectedSubscription: null,
            isLoading: false
          });
          
          return { success: true };
        } catch (error) {
          console.error('Error deleting subscription:', error);
          set({ 
            error: error.message,
            isLoading: false
          });
          return { success: false, error };
        }
      },

      toggleSubscriptionStatus: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await subscriptionService.toggleSubscriptionStatus(id);
          
          if (error) {
            set({ error: error.message, isLoading: false });
            return { success: false, error };
          }
          
          // Update local state
          const { subscriptions } = get();
          const updatedSubscriptions = subscriptions.map(sub => 
            sub.id === id ? { ...sub, ...data } : sub
          );
          
          set({ 
            subscriptions: updatedSubscriptions,
            filteredSubscriptions: get().applyFilters(updatedSubscriptions),
            isLoading: false
          });
          
          return { success: true, data };
        } catch (error) {
          console.error('Error toggling subscription status:', error);
          set({ 
            error: error.message,
            isLoading: false
          });
          return { success: false, error };
        }
      },

      setSelectedSubscription: (subscription) => {
        set({ selectedSubscription: subscription });
      },

      // Filtering and sorting
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

      // Refresh filtered subscriptions manually
      refreshFilteredSubscriptions: () => {
        const { subscriptions } = get();
        set({
          filteredSubscriptions: get().applyFilters(subscriptions)
        });
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

      // Real-time subscription setup
      setupRealtimeSubscription: () => {
        const { realtimeSubscription } = get();
        
        // Cleanup existing subscription
        if (realtimeSubscription) {
          realtimeSubscription.unsubscribe();
        }
        
        // Set up new subscription
        const subscription = subscriptionService.subscribeToChanges((payload) => {
          console.log('Real-time change received:', payload);
          
          // Reload subscriptions when changes are detected
          get().loadSubscriptions();
        });
        
        set({ realtimeSubscription: subscription });
      },

      // Error handling
      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    { name: 'subscription-tracker-supabase' }
  )
);

export default useSubscriptionStore;