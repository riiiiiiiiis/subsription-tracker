import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { 
  calculateMonthlyAmount, 
  calculateNextPaymentDate
} from '../types/index.js';
import { addDays, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import subscriptionService from '../services/subscriptionService.js';
import { supabase } from '../lib/supabase.js';

const useUnifiedStore = create(
  devtools(
    persist(
      (set, get) => ({
        // Auth state (single source of truth)
        auth: {
          user: null,
          profile: null,
          session: null,
          isAuthenticated: false,
          isLoading: true,
          error: null,
          lastProfileLoad: null,
        },
        
        // Data state
        data: {
          subscriptions: [],
          filteredSubscriptions: [],
          isLoading: false,
          error: null,
          lastSync: null,
        },
        
        // Filter state
        filters: {
          category: 'all',
          status: 'all',
          sortBy: 'name',
          sortOrder: 'asc',
        },
        
        // Real-time state
        realtime: {
          subscriptionsChannel: null,
          profileChannel: null,
          connectionStatus: 'disconnected',
          reconnectAttempts: 0,
          maxReconnectAttempts: 5,
        },
        
        // UI state
        ui: {
          selectedSubscription: null,
        },

        // ===============================
        // AUTHENTICATION METHODS
        // ===============================

        // Initialize the store - single source of truth for authentication
        initialize: async () => {
          console.log('🚀 UnifiedStore: Initialize called');
          set(state => ({
            auth: { ...state.auth, isLoading: true, error: null }
          }));
          
          try {
            // Check authentication with session restoration
            console.log('🔐 UnifiedStore: Checking authentication...');
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) {
              throw new Error(`Session error: ${sessionError.message}`);
            }
            
            console.log('🔑 UnifiedStore: Session check result:', { 
              hasSession: !!session, 
              hasUser: !!session?.user, 
              userEmail: session?.user?.email 
            });
            
            if (session?.user) {
              console.log('✅ UnifiedStore: User authenticated, initializing user state...');
              
              // Set authenticated user state
              set(state => ({
                auth: {
                  ...state.auth,
                  user: session.user,
                  session,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null
                }
              }));
              
              // Load user data in sequence with error handling
              await get().loadUserProfile(session.user.id);
              await get().loadUserSubscriptions();
              
              // Setup real-time connections with user-specific channels
              get().setupRealtimeConnections();
            } else {
              console.log('❌ UnifiedStore: No authenticated user found');
              get().resetToUnauthenticated();
            }
          } catch (error) {
            console.error('💥 UnifiedStore: Error initializing store:', error);
            set(state => ({
              auth: {
                ...state.auth,
                error: error.message,
                isLoading: false
              },
              data: {
                ...state.data,
                isLoading: false
              }
            }));
          }
        },

        // Unified authentication handler (replaces multiple auth systems)
        handleAuthStateChange: (event, session) => {
          console.log('🔄 UnifiedStore: Auth state change:', event, session?.user?.email);
          
          switch (event) {
            case 'SIGNED_IN':
              if (session?.user) {
                get().setAuthenticatedUser(session.user, session);
              }
              break;
              
            case 'SIGNED_OUT':
              get().handleSignOut();
              break;
              
            case 'TOKEN_REFRESHED':
              if (session?.user) {
                set(state => ({
                  auth: {
                    ...state.auth,
                    user: session.user,
                    session,
                    isAuthenticated: true
                  }
                }));
              }
              break;
              
            case 'USER_UPDATED':
              if (session?.user) {
                set(state => ({
                  auth: {
                    ...state.auth,
                    user: session.user,
                    session
                  }
                }));
                // Reload profile on user update
                get().loadUserProfile(session.user.id);
              }
              break;
          }
        },

        // Set authenticated user state
        setAuthenticatedUser: async (user, session) => {
          console.log('👤 UnifiedStore: setAuthenticatedUser called with:', user.email);
          
          set(state => ({
            auth: {
              ...state.auth,
              user,
              session,
              isAuthenticated: true,
              isLoading: false,
              error: null
            }
          }));
          
          // Load user data
          await get().loadUserProfile(user.id);
          await get().loadUserSubscriptions();
          
          // Setup real-time connections
          get().setupRealtimeConnections();
        },

        // Reset to unauthenticated state
        resetToUnauthenticated: () => {
          console.log('🧹 UnifiedStore: Resetting to unauthenticated state');
          get().cleanupRealtimeConnections();
          
          set({
            auth: {
              user: null,
              profile: null,
              session: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
              lastProfileLoad: null
            },
            data: {
              subscriptions: [],
              filteredSubscriptions: [],
              isLoading: false,
              error: null,
              lastSync: null
            },
            realtime: {
              subscriptionsChannel: null,
              profileChannel: null,
              connectionStatus: 'disconnected',
              reconnectAttempts: 0,
              maxReconnectAttempts: 5
            },
            ui: {
              selectedSubscription: null
            }
          });
        },

        // Handle sign out with cleanup
        handleSignOut: () => {
          console.log('🔓 UnifiedStore: Handling sign out');
          get().cleanupRealtimeConnections();
          get().resetToUnauthenticated();
        },

        // ===============================
        // PROFILE METHODS
        // ===============================

        // Load user profile with enhanced error handling
        loadUserProfile: async (userId) => {
          if (!userId) {
            console.warn('⚠️ UnifiedStore: No userId provided for profile loading');
            return;
          }

          try {
            console.log('📋 UnifiedStore: Loading user profile for:', userId);
            set(state => ({
              auth: { ...state.auth, lastProfileLoad: Date.now() }
            }));

            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .single();
            
            if (error) {
              console.error('❌ UnifiedStore: Error loading profile:', error);
              set(state => ({
                auth: { 
                  ...state.auth, 
                  profile: null,
                  error: `Profile load error: ${error.message}`
                }
              }));
            } else {
              console.log('✅ UnifiedStore: Profile loaded:', data);
              set(state => ({
                auth: { 
                  ...state.auth, 
                  profile: data,
                  error: null
                }
              }));
            }
          } catch (error) {
            console.error('💥 UnifiedStore: Unexpected error loading profile:', error);
            set(state => ({
              auth: { 
                ...state.auth, 
                profile: null,
                error: `Profile load error: ${error.message}`
              }
            }));
          }
        },

        // Get display name with unified logic
        getDisplayName: () => {
          const { auth } = get();
          const { profile, user } = auth;
          
          // Priority order for display name
          if (profile?.full_name?.trim()) {
            return profile.full_name.trim();
          }
          
          if (profile?.display_name?.trim()) {
            return profile.display_name.trim();
          }
          
          if (user?.user_metadata?.full_name?.trim()) {
            return user.user_metadata.full_name.trim();
          }
          
          if (user?.email) {
            return user.email.split('@')[0];
          }
          
          return 'User';
        },

        // ===============================
        // DATA METHODS
        // ===============================

        // Load user subscriptions with enhanced error handling
        loadUserSubscriptions: async () => {
          console.log('🔄 UnifiedStore: Starting loadUserSubscriptions...');
          set(state => ({
            data: { ...state.data, isLoading: true, error: null }
          }));
          
          try {
            console.log('📡 UnifiedStore: Calling subscriptionService.getSubscriptions...');
            const { data, error } = await subscriptionService.getSubscriptions({
              orderBy: 'created_at',
              ascending: false
            });
            
            console.log('📊 UnifiedStore: getSubscriptions result:', { 
              dataLength: data ? data.length : 0, 
              hasError: !!error,
              errorMessage: error ? error.message : null 
            });
            
            if (error) {
              console.error('❌ UnifiedStore: Error loading subscriptions:', error);
              set(state => ({
                data: {
                  ...state.data,
                  error: error.message,
                  isLoading: false,
                  lastSync: Date.now()
                }
              }));
              return;
            }
            
            const subscriptions = data || [];
            console.log('✅ UnifiedStore: Setting subscriptions in state:', subscriptions.length);
            set(state => ({
              data: {
                ...state.data,
                subscriptions,
                filteredSubscriptions: get().applyFilters(subscriptions),
                isLoading: false,
                error: null,
                lastSync: Date.now()
              }
            }));
          } catch (error) {
            console.error('💥 UnifiedStore: Unexpected error loading subscriptions:', error);
            set(state => ({
              data: {
                ...state.data,
                error: error.message,
                isLoading: false,
                lastSync: Date.now()
              }
            }));
          }
        },

        // ===============================
        // REAL-TIME METHODS
        // ===============================

        // Setup user-specific real-time connections
        setupRealtimeConnections: () => {
          const { auth } = get();
          if (!auth.user?.id) {
            console.warn('⚠️ UnifiedStore: Cannot setup real-time without user ID');
            return;
          }

          get().cleanupRealtimeConnections();
          
          const userId = auth.user.id;
          console.log('📶 UnifiedStore: Setting up real-time connections for user:', userId);

          try {
            // Setup user-specific subscriptions channel
            const subscriptionsChannel = supabase
              .channel(`user:${userId}:subscriptions`)
              .on(
                'postgres_changes',
                {
                  event: '*',
                  schema: 'public',
                  table: 'subscriptions',
                  filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                  console.log('📨 UnifiedStore: Subscription change received:', payload);
                  get().handleSubscriptionRealtimeChange(payload);
                }
              )
              .subscribe((status) => {
                console.log('📡 UnifiedStore: Subscriptions channel status:', status);
                set(state => ({
                  realtime: {
                    ...state.realtime,
                    connectionStatus: status === 'SUBSCRIBED' ? 'connected' : 'disconnected'
                  }
                }));
              });

            // Setup user-specific profile channel
            const profileChannel = supabase
              .channel(`user:${userId}:profile`)
              .on(
                'postgres_changes',
                {
                  event: '*',
                  schema: 'public',
                  table: 'profiles',
                  filter: `id=eq.${userId}`,
                },
                (payload) => {
                  console.log('👤 UnifiedStore: Profile change received:', payload);
                  get().handleProfileRealtimeChange(payload);
                }
              )
              .subscribe();

            set(state => ({
              realtime: {
                ...state.realtime,
                subscriptionsChannel,
                profileChannel,
                reconnectAttempts: 0
              }
            }));

          } catch (error) {
            console.error('💥 UnifiedStore: Error setting up real-time connections:', error);
            set(state => ({
              realtime: {
                ...state.realtime,
                connectionStatus: 'error'
              }
            }));
          }
        },

        // Handle real-time subscription changes
        handleSubscriptionRealtimeChange: (payload) => {
          console.log('🔄 UnifiedStore: Processing subscription real-time change:', payload.eventType);
          
          // Always reload subscriptions to ensure consistency
          get().loadUserSubscriptions();
        },

        // Handle real-time profile changes
        handleProfileRealtimeChange: (payload) => {
          console.log('🔄 UnifiedStore: Processing profile real-time change:', payload.eventType);
          
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            set(state => ({
              auth: {
                ...state.auth,
                profile: payload.new
              }
            }));
          } else if (payload.eventType === 'DELETE') {
            set(state => ({
              auth: {
                ...state.auth,
                profile: null
              }
            }));
          }
        },

        // Cleanup real-time connections
        cleanupRealtimeConnections: () => {
          const { realtime } = get();
          
          if (realtime.subscriptionsChannel) {
            supabase.removeChannel(realtime.subscriptionsChannel);
          }
          
          if (realtime.profileChannel) {
            supabase.removeChannel(realtime.profileChannel);
          }
          
          set(state => ({
            realtime: {
              ...state.realtime,
              subscriptionsChannel: null,
              profileChannel: null,
              connectionStatus: 'disconnected'
            }
          }));
        },

        // ===============================
        // CRUD OPERATIONS
        // ===============================

        addSubscription: async (subscriptionData) => {
          set(state => ({
            data: { ...state.data, isLoading: true, error: null }
          }));
          
          try {
            const { data, error } = await subscriptionService.createSubscription(subscriptionData);
            
            if (error) {
              set(state => ({
                data: { ...state.data, error: error.message, isLoading: false }
              }));
              return { success: false, error };
            }
            
            // Reload subscriptions to get the latest data
            await get().loadUserSubscriptions();
            
            return { success: true, data };
          } catch (error) {
            console.error('Error adding subscription:', error);
            set(state => ({
              data: { 
                ...state.data,
                error: error.message,
                isLoading: false
              }
            }));
            return { success: false, error };
          }
        },

        updateSubscription: async (id, updates) => {
          set(state => ({
            data: { ...state.data, isLoading: true, error: null }
          }));
          
          try {
            const { data, error } = await subscriptionService.updateSubscription(id, updates);
            
            if (error) {
              set(state => ({
                data: { ...state.data, error: error.message, isLoading: false }
              }));
              return { success: false, error };
            }
            
            // Update local state optimistically
            const currentState = get();
            const updatedSubscriptions = currentState.data.subscriptions.map(sub => 
              sub.id === id ? { ...sub, ...data } : sub
            );
            
            set(state => ({
              data: {
                ...state.data,
                subscriptions: updatedSubscriptions,
                filteredSubscriptions: get().applyFilters(updatedSubscriptions),
                isLoading: false
              }
            }));
            
            return { success: true, data };
          } catch (error) {
            console.error('Error updating subscription:', error);
            set(state => ({
              data: {
                ...state.data,
                error: error.message,
                isLoading: false
              }
            }));
            return { success: false, error };
          }
        },

        deleteSubscription: async (id) => {
          set(state => ({
            data: { ...state.data, isLoading: true, error: null }
          }));
          
          try {
            const { success, error } = await subscriptionService.deleteSubscription(id);
            
            if (!success) {
              set(state => ({
                data: { ...state.data, error: error.message, isLoading: false }
              }));
              return { success: false, error };
            }
            
            // Update local state
            const currentState = get();
            const updatedSubscriptions = currentState.data.subscriptions.filter(sub => sub.id !== id);
            
            set(state => ({
              data: {
                ...state.data,
                subscriptions: updatedSubscriptions,
                filteredSubscriptions: get().applyFilters(updatedSubscriptions),
                isLoading: false
              },
              ui: {
                ...state.ui,
                selectedSubscription: null
              }
            }));
            
            return { success: true };
          } catch (error) {
            console.error('Error deleting subscription:', error);
            set(state => ({
              data: {
                ...state.data,
                error: error.message,
                isLoading: false
              }
            }));
            return { success: false, error };
          }
        },

        toggleSubscriptionStatus: async (id) => {
          set(state => ({
            data: { ...state.data, isLoading: true, error: null }
          }));
          
          try {
            const { data, error } = await subscriptionService.toggleSubscriptionStatus(id);
            
            if (error) {
              set(state => ({
                data: { ...state.data, error: error.message, isLoading: false }
              }));
              return { success: false, error };
            }
            
            // Update local state
            const currentState = get();
            const updatedSubscriptions = currentState.data.subscriptions.map(sub => 
              sub.id === id ? { ...sub, ...data } : sub
            );
            
            set(state => ({
              data: {
                ...state.data,
                subscriptions: updatedSubscriptions,
                filteredSubscriptions: get().applyFilters(updatedSubscriptions),
                isLoading: false
              }
            }));
            
            return { success: true, data };
          } catch (error) {
            console.error('Error toggling subscription status:', error);
            set(state => ({
              data: {
                ...state.data,
                error: error.message,
                isLoading: false
              }
            }));
            return { success: false, error };
          }
        },

        // ===============================
        // FILTERING AND SORTING
        // ===============================

        setFilters: (filters) => {
          set(state => {
            const newFilters = { ...state.filters, ...filters };
            return {
              filters: newFilters,
              data: {
                ...state.data,
                filteredSubscriptions: get().applyFilters(state.data.subscriptions, newFilters)
              }
            };
          });
        },

        applyFilters: (subscriptions, filters = null) => {
          const activeFilters = filters || get().filters;
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

        // ===============================
        // UI METHODS
        // ===============================

        setSelectedSubscription: (subscription) => {
          set(state => ({
            ui: { ...state.ui, selectedSubscription: subscription }
          }));
        },

        clearError: () => {
          set(state => ({
            auth: { ...state.auth, error: null },
            data: { ...state.data, error: null }
          }));
        },

        // ===============================
        // ANALYTICS GETTERS
        // ===============================

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

          // Calculate percentages
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
      }),
      {
        name: 'unified-subscription-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          // Only persist essential data
          data: {
            subscriptions: state.data.subscriptions,
            lastSync: state.data.lastSync
          },
          filters: state.filters,
          auth: {
            // Don't persist sensitive auth data - let Supabase handle it
            lastProfileLoad: state.auth.lastProfileLoad
          }
        }),
        onRehydrateStorage: () => (state) => {
          console.log('🔄 UnifiedStore: Store rehydrated');
          if (state?.data?.subscriptions) {
            // Refresh filtered subscriptions after rehydration
            state.data.filteredSubscriptions = state.applyFilters 
              ? state.applyFilters(state.data.subscriptions) 
              : state.data.subscriptions;
          }
        }
      }
    ),
    { name: 'unified-subscription-store' }
  )
);

export default useUnifiedStore;