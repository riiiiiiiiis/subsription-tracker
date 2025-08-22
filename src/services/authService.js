import { supabase } from '../lib/supabase.js';

/**
 * Service class for handling authentication and user profile operations
 */
class AuthService {
  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error signing in:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error signing in:', error);
      return { data: null, error };
    }
  }

  /**
   * Sign up with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {Object} metadata - Additional user metadata
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.fullName || email.split('@')[0],
            ...metadata,
          },
        },
      });

      if (error) {
        console.error('Error signing up:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error signing up:', error);
      return { data: null, error };
    }
  }

  /**
   * Sign out the current user
   * @returns {Promise<{success: boolean, error: Error|null}>}
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error);
        return { success: false, error };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Unexpected error signing out:', error);
      return { success: false, error };
    }
  }

  /**
   * Send password reset email
   * @param {string} email - User email
   * @param {string} redirectTo - URL to redirect to after reset
   * @returns {Promise<{success: boolean, error: Error|null}>}
   */
  async resetPassword(email, redirectTo = null) {
    try {
      const options = redirectTo ? { redirectTo } : {};
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, options);

      if (error) {
        console.error('Error sending password reset:', error);
        return { success: false, error };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Unexpected error sending password reset:', error);
      return { success: false, error };
    }
  }

  /**
   * Update user password
   * @param {string} newPassword - New password
   * @returns {Promise<{success: boolean, error: Error|null}>}
   */
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('Error updating password:', error);
        return { success: false, error };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Unexpected error updating password:', error);
      return { success: false, error };
    }
  }

  /**
   * Update user email
   * @param {string} newEmail - New email address
   * @returns {Promise<{success: boolean, error: Error|null}>}
   */
  async updateEmail(newEmail) {
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        console.error('Error updating email:', error);
        return { success: false, error };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Unexpected error updating email:', error);
      return { success: false, error };
    }
  }

  /**
   * Get current user session
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error getting session:', error);
      return { data: null, error };
    }
  }

  /**
   * Get current user
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async getUser() {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error getting user:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error getting user:', error);
      return { data: null, error };
    }
  }

  /**
   * Get user profile from profiles table
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async getUserProfile() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { data: null, error: userError || new Error('User not authenticated') };
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error getting user profile:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error getting user profile:', error);
      return { data: null, error };
    }
  }

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async updateUserProfile(profileData) {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { data: null, error: userError || new Error('User not authenticated') };
      }

      const updatedData = {
        ...profileData,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error updating user profile:', error);
      return { data: null, error };
    }
  }

  /**
   * Delete user account and all associated data
   * @returns {Promise<{success: boolean, error: Error|null}>}
   */
  async deleteAccount() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { success: false, error: userError || new Error('User not authenticated') };
      }

      // Delete user profile (subscriptions will be deleted automatically due to CASCADE)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) {
        console.error('Error deleting user profile:', profileError);
        return { success: false, error: profileError };
      }

      // Sign out the user
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        console.error('Error signing out after account deletion:', signOutError);
        return { success: false, error: signOutError };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Unexpected error deleting account:', error);
      return { success: false, error };
    }
  }

  /**
   * Sign in with OAuth provider
   * @param {string} provider - OAuth provider (google, github, etc.)
   * @param {Object} options - Additional options
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async signInWithOAuth(provider, options = {}) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
          ...options,
        },
      });

      if (error) {
        console.error(`Error signing in with ${provider}:`, error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error(`Unexpected error signing in with ${provider}:`, error);
      return { data: null, error };
    }
  }

  /**
   * Set up auth state change listener
   * @param {Function} callback - Callback function to handle auth changes
   * @returns {Object} Subscription object with unsubscribe method
   */
  onAuthStateChange(callback) {
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          callback(event, session);
        }
      );

      return {
        unsubscribe: () => {
          subscription.unsubscribe();
        }
      };
    } catch (error) {
      console.error('Error setting up auth state change listener:', error);
      return {
        unsubscribe: () => {}
      };
    }
  }

  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }

  /**
   * Refresh the current session
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        console.error('Error refreshing session:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error refreshing session:', error);
      return { data: null, error };
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;