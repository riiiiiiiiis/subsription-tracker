import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { 
  calculateMonthlyAmount
} from '../types/index.js';
import { addDays, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import subscriptionService from '../services/subscriptionService.js';
import { subscriptionFromDatabase } from '../utils/fieldMapping.js';
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
          sidebarOpen: false,
        },
        
        // Notifications state
        notifications: {
          toasts: [], // Array of toast notifications
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
            // Set initial loading state - let onAuthStateChange handle authentication
            console.log('🔐 UnifiedStore: Waiting for authentication state from onAuthStateChange...');
            
            // Don't make blocking getSession() call - rely on onAuthStateChange for auth state
            // The auth state will be set by handleAuthStateChange when onAuthStateChange fires
            // The INITIAL_SESSION event will properly set isLoading to false
            
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
            case 'INITIAL_SESSION':
              // Handle the initial session state when the app loads
              if (session?.user) {
                console.log('✅ UnifiedStore: Initial session found, setting authenticated user');
                get().setAuthenticatedUser(session.user, session);
              } else {
                console.log('❌ UnifiedStore: No initial session found, resetting to unauthenticated');
                // Ensure loading is set to false when no session is found
                set(state => ({
                  auth: {
                    ...state.auth,
                    user: null,
                    profile: null,
                    session: null,
                    isAuthenticated: false,
                    isLoading: false, // Explicitly set loading to false
                    error: null
                  }
                }));
              }
              break;
              
            case 'SIGNED_IN':
              if (session?.user) {
                console.log('✅ UnifiedStore: User signed in');
                get().setAuthenticatedUser(session.user, session);
              }
              break;
              
            case 'SIGNED_OUT':
              console.log('🔓 UnifiedStore: User signed out');
              get().handleSignOut();
              break;
              
            case 'TOKEN_REFRESHED':
              if (session?.user) {
                console.log('🔄 UnifiedStore: Token refreshed');
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
                console.log('👤 UnifiedStore: User updated');
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
              
            default:
              console.log('🔍 UnifiedStore: Unhandled auth state change:', event);
              break;
          }
        },

        // Set authenticated user state with timeout protection
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
          
          try {
            // Load user data with timeout protection
            const loadUserDataWithTimeout = async () => {
              const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                  reject(new Error('User data loading timed out'));
                }, 10000); // 10 second timeout
              });
              
              const loadDataPromise = Promise.all([
                get().loadUserProfile(user.id),
                get().loadUserSubscriptions()
              ]);
              
              return Promise.race([loadDataPromise, timeoutPromise]);
            };
            
            await loadUserDataWithTimeout();
            
            // Setup real-time connections
            get().setupRealtimeConnections();
          } catch (error) {
            console.error('💥 UnifiedStore: Error loading user data:', error);
            // Don't reset auth state, just log the error
            // User is still authenticated even if data loading fails
            set(state => ({
              auth: {
                ...state.auth,
                error: error.message
              }
            }));
          }
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
              selectedSubscription: null,
              sidebarOpen: false
            },
            notifications: {
              toasts: []
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

        // Handle real-time subscription changes with granular updates
        handleSubscriptionRealtimeChange: (payload) => {
          console.log('🔄 UnifiedStore: Processing subscription real-time change:', payload.eventType);
          
          const currentState = get();
          let updatedSubscriptions = [...currentState.data.subscriptions];
          
          switch (payload.eventType) {
            case 'INSERT':
              // Add new subscription to the list
              if (payload.new) {
                const newSubscription = subscriptionFromDatabase ? subscriptionFromDatabase(payload.new) : payload.new;
                updatedSubscriptions.push(newSubscription);
                console.log('✅ UnifiedStore: Added new subscription:', newSubscription.name);
              }
              break;
              
            case 'UPDATE':
              // Update existing subscription
              if (payload.new) {
                const updatedSubscription = subscriptionFromDatabase ? subscriptionFromDatabase(payload.new) : payload.new;
                updatedSubscriptions = updatedSubscriptions.map(sub => 
                  sub.id === updatedSubscription.id ? updatedSubscription : sub
                );
                console.log('✅ UnifiedStore: Updated subscription:', updatedSubscription.name);
              }
              break;
              
            case 'DELETE':
              // Remove subscription from the list
              if (payload.old) {
                updatedSubscriptions = updatedSubscriptions.filter(sub => sub.id !== payload.old.id);
                console.log('✅ UnifiedStore: Removed subscription:', payload.old.name);
              }
              break;
              
            default:
              console.log('🔄 UnifiedStore: Unknown event type, falling back to full reload');
              get().loadUserSubscriptions();
              return;
          }
          
          // Update state with new subscriptions list
          set(state => ({
            data: {
              ...state.data,
              subscriptions: updatedSubscriptions,
              filteredSubscriptions: get().applyFilters(updatedSubscriptions),
              lastSync: Date.now()
            }
          }));
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
              const errorMessage = `Failed to add subscription: ${error.message}`;
              set(state => ({
                data: { ...state.data, error: errorMessage, isLoading: false }
              }));
              get().showError(errorMessage);
              return { success: false, error };
            }
            
            // Reload subscriptions to get the latest data
            await get().loadUserSubscriptions();
            
            get().showSuccess(`Successfully added "${subscriptionData.name}" subscription`);
            return { success: true, data };
          } catch (error) {
            console.error('Error adding subscription:', error);
            const errorMessage = `Failed to add subscription: ${error.message}`;
            set(state => ({
              data: { 
                ...state.data,
                error: errorMessage,
                isLoading: false
              }
            }));
            get().showError(errorMessage);
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
              const errorMessage = `Failed to update subscription: ${error.message}`;
              set(state => ({
                data: { ...state.data, error: errorMessage, isLoading: false }
              }));
              get().showError(errorMessage);
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
            
            const subscriptionName = data?.name || updates?.name || 'Subscription';
            get().showSuccess(`Successfully updated "${subscriptionName}"`);
            return { success: true, data };
          } catch (error) {
            console.error('Error updating subscription:', error);
            const errorMessage = `Failed to update subscription: ${error.message}`;
            set(state => ({
              data: {
                ...state.data,
                error: errorMessage,
                isLoading: false
              }
            }));
            get().showError(errorMessage);
            return { success: false, error };
          }
        },

        deleteSubscription: async (id) => {
          set(state => ({
            data: { ...state.data, isLoading: true, error: null }
          }));
          
          try {
            // Get subscription name before deletion for toast message
            const currentState = get();
            const subscriptionToDelete = currentState.data.subscriptions.find(sub => sub.id === id);
            const subscriptionName = subscriptionToDelete?.name || 'Subscription';
            
            const { success, error } = await subscriptionService.deleteSubscription(id);
            
            if (!success) {
              const errorMessage = `Failed to delete subscription: ${error.message}`;
              set(state => ({
                data: { ...state.data, error: errorMessage, isLoading: false }
              }));
              get().showError(errorMessage);
              return { success: false, error };
            }
            
            // Update local state
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
            
            get().showSuccess(`Successfully deleted "${subscriptionName}"`);
            return { success: true };
          } catch (error) {
            console.error('Error deleting subscription:', error);
            const errorMessage = `Failed to delete subscription: ${error.message}`;
            set(state => ({
              data: {
                ...state.data,
                error: errorMessage,
                isLoading: false
              }
            }));
            get().showError(errorMessage);
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

        setSidebarOpen: (isOpen) => {
          set(state => ({
            ui: { ...state.ui, sidebarOpen: isOpen }
          }));
        },

        toggleSidebar: () => {
          set(state => ({
            ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
          }));
        },

        // ===============================
        // NOTIFICATION METHODS
        // ===============================

        addToast: (toast) => {
          const id = Date.now() + Math.random();
          const newToast = {
            id,
            type: 'info', // default type
            duration: 5000, // default duration
            ...toast,
          };
          
          set(state => ({
            notifications: {
              ...state.notifications,
              toasts: [...state.notifications.toasts, newToast]
            }
          }));
          
          // Auto-remove toast after duration
          if (newToast.duration > 0) {
            setTimeout(() => {
              get().removeToast(id);
            }, newToast.duration);
          }
        },

        removeToast: (id) => {
          set(state => ({
            notifications: {
              ...state.notifications,
              toasts: state.notifications.toasts.filter(toast => toast.id !== id)
            }
          }));
        },

        clearAllToasts: () => {
          set(state => ({
            notifications: {
              ...state.notifications,
              toasts: []
            }
          }));
        },

        // Helper methods for different toast types
        showSuccess: (message, options = {}) => {
          get().addToast({
            type: 'success',
            message,
            ...options
          });
        },

        showError: (message, options = {}) => {
          get().addToast({
            type: 'error',
            message,
            duration: 8000, // Longer duration for errors
            ...options
          });
        },

        showInfo: (message, options = {}) => {
          get().addToast({
            type: 'info',
            message,
            ...options
          });
        },

        showWarning: (message, options = {}) => {
          get().addToast({
            type: 'warning',
            message,
            duration: 6000,
            ...options
          });
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