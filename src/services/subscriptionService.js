import { supabase } from '../lib/supabase.js';
import { 
  subscriptionToDatabase, 
  subscriptionFromDatabase, 
  subscriptionsFromDatabase 
} from '../utils/fieldMapping.js';

/**
 * Service class for handling subscription-related database operations
 * All methods automatically apply Row Level Security (RLS) for user data isolation
 */
class SubscriptionService {
  /**
   * Get all subscriptions for the current authenticated user
   * @param {Object} options - Query options
   * @param {string} options.orderBy - Field to order by (default: 'created_at')
   * @param {boolean} options.ascending - Order direction (default: false)
   * @returns {Promise<{data: Array, error: Error|null}>}
   */
  async getSubscriptions(options = {}) {
    console.log('📡 SubscriptionService: getSubscriptions called with options:', options);
    const { orderBy = 'created_at', ascending = false } = options;
    
    try {
      console.log('🚀 SubscriptionService: Making Supabase query...');
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order(orderBy, { ascending });

      console.log('📊 SubscriptionService: Query result:', { 
        dataLength: data ? data.length : 0, 
        hasError: !!error,
        errorMessage: error ? error.message : null,
        errorCode: error ? error.code : null
      });

      if (error) {
        console.error('❌ SubscriptionService: Error fetching subscriptions:', error);
        return { data: null, error };
      }

      console.log('✅ SubscriptionService: Processing field mapping for', data?.length || 0, 'subscriptions');
      const mappedData = subscriptionsFromDatabase(data || []);
      console.log('🔄 SubscriptionService: Field mapping complete, returning', mappedData.length, 'subscriptions');
      return { data: mappedData, error: null };
    } catch (error) {
      console.error('💥 SubscriptionService: Unexpected error fetching subscriptions:', error);
      return { data: null, error };
    }
  }

  /**
   * Get a single subscription by ID
   * @param {string} id - Subscription UUID
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async getSubscription(id) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching subscription:', error);
        return { data: null, error };
      }

      return { data: subscriptionFromDatabase(data), error: null };
    } catch (error) {
      console.error('Unexpected error fetching subscription:', error);
      return { data: null, error };
    }
  }

  /**
   * Create a new subscription
   * @param {Object} subscriptionData - Subscription data
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async createSubscription(subscriptionData) {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { data: null, error: new Error('User not authenticated') };
      }

      // Prepare subscription data with user ID
      const subscriptionWithUser = {
        ...subscriptionToDatabase(subscriptionData),
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('subscriptions')
        .insert([subscriptionWithUser])
        .select()
        .single();

      if (error) {
        console.error('Error creating subscription:', error);
        return { data: null, error };
      }

      return { data: subscriptionFromDatabase(data), error: null };
    } catch (error) {
      console.error('Unexpected error creating subscription:', error);
      return { data: null, error };
    }
  }

  /**
   * Update an existing subscription
   * @param {string} id - Subscription UUID
   * @param {Object} updates - Fields to update
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async updateSubscription(id, updates) {
    try {
      const updatesWithTimestamp = {
        ...subscriptionToDatabase(updates),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('subscriptions')
        .update(updatesWithTimestamp)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating subscription:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error updating subscription:', error);
      return { data: null, error };
    }
  }

  /**
   * Delete a subscription
   * @param {string} id - Subscription UUID
   * @returns {Promise<{success: boolean, error: Error|null}>}
   */
  async deleteSubscription(id) {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting subscription:', error);
        return { success: false, error };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Unexpected error deleting subscription:', error);
      return { success: false, error };
    }
  }

  /**
   * Toggle subscription active status
   * @param {string} id - Subscription UUID
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async toggleSubscriptionStatus(id) {
    try {
      // First get the current subscription to know its current status
      const { data: currentSub, error: fetchError } = await this.getSubscription(id);
      
      if (fetchError || !currentSub) {
        return { data: null, error: fetchError || new Error('Subscription not found') };
      }

      // Toggle the status
      const { data, error } = await this.updateSubscription(id, {
        is_active: !currentSub.is_active
      });

      return { data, error };
    } catch (error) {
      console.error('Unexpected error toggling subscription status:', error);
      return { data: null, error };
    }
  }

  /**
   * Get subscriptions filtered by category
   * @param {string} category - Category to filter by
   * @returns {Promise<{data: Array, error: Error|null}>}
   */
  async getSubscriptionsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscriptions by category:', error);
        return { data: null, error };
      }

      return { data: subscriptionsFromDatabase(data || []), error: null };
    } catch (error) {
      console.error('Unexpected error fetching subscriptions by category:', error);
      return { data: null, error };
    }
  }

  /**
   * Get active subscriptions only
   * @returns {Promise<{data: Array, error: Error|null}>}
   */
  async getActiveSubscriptions() {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching active subscriptions:', error);
        return { data: null, error };
      }

      return { data: subscriptionsFromDatabase(data || []), error: null };
    } catch (error) {
      console.error('Unexpected error fetching active subscriptions:', error);
      return { data: null, error };
    }
  }

  /**
   * Get subscription statistics for the current user
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async getSubscriptionStats() {
    try {
      const { data, error } = await supabase
        .rpc('get_user_subscription_stats_secure');

      if (error) {
        console.error('Error fetching subscription stats:', error);
        return { data: null, error };
      }

      // The function returns an array with one object, so get the first item
      const stats = data && data.length > 0 ? data[0] : null;
      
      return { data: stats, error: null };
    } catch (error) {
      console.error('Unexpected error fetching subscription stats:', error);
      return { data: null, error };
    }
  }

  /**
   * Get upcoming payments for the current user
   * @param {number} daysAhead - Number of days to look ahead (default: 30)
   * @returns {Promise<{data: Array, error: Error|null}>}
   */
  async getUpcomingPayments(daysAhead = 30) {
    try {
      const { data, error } = await supabase
        .rpc('get_upcoming_payments_secure', { days_ahead: daysAhead });

      if (error) {
        console.error('Error fetching upcoming payments:', error);
        return { data: null, error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Unexpected error fetching upcoming payments:', error);
      return { data: null, error };
    }
  }

  /**
   * Subscribe to real-time changes for subscriptions with user-specific channel
   * @param {Function} callback - Callback function to handle changes
   * @param {string} userId - User ID for user-specific channel
   * @returns {Object} Subscription object with unsubscribe method
   */
  subscribeToChanges(callback, userId = null) {
    try {
      // Get user ID if not provided
      if (!userId) {
        console.warn('⚠️ SubscriptionService: No userId provided for real-time subscription');
        return {
          unsubscribe: () => {}
        };
      }

      console.log('📶 SubscriptionService: Setting up user-specific real-time subscription for:', userId);
      
      const channelName = `user:${userId}:subscriptions`;
      const subscription = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          {
            event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
            schema: 'public',
            table: 'subscriptions',
            filter: `user_id=eq.${userId}`, // Only listen to current user's changes
          },
          (payload) => {
            console.log('📨 SubscriptionService: Subscription change detected for user:', userId, payload);
            callback(payload);
          }
        )
        .subscribe((status) => {
          console.log('📡 SubscriptionService: Channel status for', channelName, ':', status);
        });

      return {
        unsubscribe: () => {
          console.log('🧹 SubscriptionService: Unsubscribing from channel:', channelName);
          supabase.removeChannel(subscription);
        }
      };
    } catch (error) {
      console.error('💥 SubscriptionService: Error setting up real-time subscription:', error);
      return {
        unsubscribe: () => {}
      };
    }
  }

  /**
   * Subscribe to profile changes for a specific user
   * @param {Function} callback - Callback function to handle changes
   * @param {string} userId - User ID for user-specific channel
   * @returns {Object} Subscription object with unsubscribe method
   */
  subscribeToProfileChanges(callback, userId = null) {
    try {
      if (!userId) {
        console.warn('⚠️ SubscriptionService: No userId provided for profile subscription');
        return {
          unsubscribe: () => {}
        };
      }

      console.log('📶 SubscriptionService: Setting up profile real-time subscription for:', userId);
      
      const channelName = `user:${userId}:profile`;
      const subscription = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'profiles',
            filter: `id=eq.${userId}`,
          },
          (payload) => {
            console.log('👤 SubscriptionService: Profile change detected for user:', userId, payload);
            callback(payload);
          }
        )
        .subscribe((status) => {
          console.log('📡 SubscriptionService: Profile channel status for', channelName, ':', status);
        });

      return {
        unsubscribe: () => {
          console.log('🧹 SubscriptionService: Unsubscribing from profile channel:', channelName);
          supabase.removeChannel(subscription);
        }
      };
    } catch (error) {
      console.error('💥 SubscriptionService: Error setting up profile real-time subscription:', error);
      return {
        unsubscribe: () => {}
      };
    }
  }

  /**
   * Batch create multiple subscriptions
   * @param {Array} subscriptionsData - Array of subscription objects
   * @returns {Promise<{data: Array|null, error: Error|null}>}
   */
  async createMultipleSubscriptions(subscriptionsData) {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { data: null, error: new Error('User not authenticated') };
      }

      // Prepare all subscriptions with user ID and timestamps
      const subscriptionsWithUser = subscriptionsData.map(sub => ({
        ...subscriptionToDatabase(sub),
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscriptionsWithUser)
        .select();

      if (error) {
        console.error('Error creating multiple subscriptions:', error);
        return { data: null, error };
      }

      return { data: subscriptionsFromDatabase(data || []), error: null };
    } catch (error) {
      console.error('Unexpected error creating multiple subscriptions:', error);
      return { data: null, error };
    }
  }
}

// Create and export a singleton instance
const subscriptionService = new SubscriptionService();
export default subscriptionService;