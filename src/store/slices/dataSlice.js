import subscriptionService from '@/services/subscriptionService.js';
import { supabase } from '@/lib/supabase.js';
import { subscriptionFromDatabase } from '@/utils/fieldMapping.js';

export const initialDataState = {
  subscriptions: [],
  filteredSubscriptions: [],
  isLoading: false,
  error: null,
  lastSync: null,
};

export const initialRealtimeState = {
  subscriptionsChannel: null,
  profileChannel: null,
  connectionStatus: 'disconnected',
  reconnectAttempts: 0,
  maxReconnectAttempts: 5,
};

export const initialUiState = {
  selectedSubscription: null,
};

export const initialNotificationsState = {
  toasts: [],
};

export const createDataSlice = (set, get) => ({
  data: { ...initialDataState },
  realtime: { ...initialRealtimeState },
  ui: { ...initialUiState },
  notifications: { ...initialNotificationsState },

  resetDataState: () => {
    set({
      data: { ...initialDataState },
      realtime: { ...initialRealtimeState },
      ui: { ...initialUiState },
      notifications: { ...initialNotificationsState },
    });
  },

  loadUserSubscriptions: async () => {
    console.log('🔄 AppStore: Starting loadUserSubscriptions...');
    set(state => ({
      data: { ...state.data, isLoading: true, error: null }
    }));

    try {
      console.log('📡 AppStore: Calling subscriptionService.getSubscriptions...');
      const { data, error } = await subscriptionService.getSubscriptions({
        orderBy: 'created_at',
        ascending: false
      });

      console.log('📊 AppStore: getSubscriptions result:', {
        dataLength: data ? data.length : 0,
        hasError: !!error,
        errorMessage: error ? error.message : null
      });

      if (error) {
        console.error('❌ AppStore: Error loading subscriptions:', error);
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
      console.log('✅ AppStore: Setting subscriptions in state:', subscriptions.length);
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
      console.error('💥 AppStore: Unexpected error loading subscriptions:', error);
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

  setupRealtimeConnections: () => {
    const { auth } = get();
    if (!auth.user?.id) {
      console.warn('⚠️ AppStore: Cannot setup real-time without user ID');
      return;
    }

    get().cleanupRealtimeConnections();

    const userId = auth.user.id;
    console.log('📶 AppStore: Setting up real-time connections for user:', userId);

    try {
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
            console.log('📨 AppStore: Subscription change received:', payload);
            get().handleSubscriptionRealtimeChange(payload);
          }
        )
        .subscribe((status) => {
          console.log('📡 AppStore: Subscriptions channel status:', status);
          set(state => ({
            realtime: {
              ...state.realtime,
              connectionStatus: status === 'SUBSCRIBED' ? 'connected' : 'disconnected'
            }
          }));
        });

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
            console.log('👤 AppStore: Profile change received:', payload);
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
      console.error('💥 AppStore: Error setting up real-time connections:', error);
      set(state => ({
        realtime: {
          ...state.realtime,
          connectionStatus: 'error'
        }
      }));
    }
  },

  handleSubscriptionRealtimeChange: (payload) => {
    console.log('🔄 AppStore: Processing subscription real-time change:', payload.eventType);

    const currentState = get();
    let updatedSubscriptions = [...currentState.data.subscriptions];

    switch (payload.eventType) {
      case 'INSERT':
        if (payload.new) {
          const newSubscription = subscriptionFromDatabase
            ? subscriptionFromDatabase(payload.new)
            : payload.new;
          updatedSubscriptions.push(newSubscription);
          console.log('✅ AppStore: Added new subscription:', newSubscription.name);
        }
        break;

      case 'UPDATE':
        if (payload.new) {
          const updatedSubscription = subscriptionFromDatabase
            ? subscriptionFromDatabase(payload.new)
            : payload.new;
          updatedSubscriptions = updatedSubscriptions.map(sub =>
            sub.id === updatedSubscription.id ? updatedSubscription : sub
          );
          console.log('✅ AppStore: Updated subscription:', updatedSubscription.name);
        }
        break;

      case 'DELETE':
        if (payload.old) {
          updatedSubscriptions = updatedSubscriptions.filter(sub => sub.id !== payload.old.id);
          console.log('✅ AppStore: Removed subscription:', payload.old.name);
        }
        break;

      default:
        console.log('🔄 AppStore: Unknown event type, falling back to full reload');
        get().loadUserSubscriptions();
        return;
    }

    set(state => ({
      data: {
        ...state.data,
        subscriptions: updatedSubscriptions,
        filteredSubscriptions: get().applyFilters(updatedSubscriptions),
        lastSync: Date.now()
      }
    }));
  },

  handleProfileRealtimeChange: (payload) => {
    console.log('🔄 AppStore: Processing profile real-time change:', payload.eventType);

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

  setSelectedSubscription: (subscription) => {
    set(state => ({
      ui: { ...state.ui, selectedSubscription: subscription }
    }));
  },

  addToast: (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast,
    };

    set(state => ({
      notifications: {
        ...state.notifications,
        toasts: [...state.notifications.toasts, newToast]
      }
    }));

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
      duration: 8000,
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
});

