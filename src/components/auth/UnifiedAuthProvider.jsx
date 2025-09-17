import React from 'react';
import useAppStore from '@/store';
import { supabase } from '../../lib/supabase.js';
import UnifiedAuthContext from './UnifiedAuthContext.js';

// Unified AuthProvider component
export const UnifiedAuthProvider = ({ children }) => {
  // Get auth state from unified store
  const auth = useAppStore(state => state.auth);
  const getDisplayName = useAppStore(state => state.getDisplayName);

  // Authentication methods that work with unified store
  const signIn = async (email, password) => {
    try {
      console.log('🔐 UnifiedAuth: Attempting sign in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('❌ UnifiedAuth: Sign in error:', error);
        return { error };
      }
      
      console.log('✅ UnifiedAuth: Sign in successful');
      // Auth state change will be handled by the unified store listener
      return { data };
    } catch (error) {
      console.error('💥 UnifiedAuth: Unexpected sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    try {
      console.log('📝 UnifiedAuth: Attempting sign up for:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      
      if (error) {
        console.error('❌ UnifiedAuth: Sign up error:', error);
        return { error };
      }
      
      console.log('✅ UnifiedAuth: Sign up successful');
      return { data };
    } catch (error) {
      console.error('💥 UnifiedAuth: Unexpected sign up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('🔓 UnifiedAuth: Attempting sign out');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ UnifiedAuth: Sign out error:', error);
        return { error };
      }
      
      console.log('✅ UnifiedAuth: Sign out successful');
      // Auth state change will be handled by the unified store listener
      return { success: true };
    } catch (error) {
      console.error('💥 UnifiedAuth: Unexpected sign out error:', error);
      return { error };
    }
  };

  const resetPassword = async (email) => {
    try {
      console.log('🔑 UnifiedAuth: Attempting password reset for:', email);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error('❌ UnifiedAuth: Password reset error:', error);
        return { error };
      }
      
      console.log('✅ UnifiedAuth: Password reset email sent');
      return { data };
    } catch (error) {
      console.error('💥 UnifiedAuth: Unexpected password reset error:', error);
      return { error };
    }
  };

  // Context value using unified store state with fallbacks
  const value = {
    user: auth?.user || null,
    profile: auth?.profile || null,
    session: auth?.session || null,
    loading: auth?.isLoading ?? true, // Default to true if undefined
    error: auth?.error || null,
    isAuthenticated: auth?.isAuthenticated ?? false, // Default to false if undefined
    signIn,
    signUp,
    signOut,
    resetPassword,
    getDisplayName,
  };

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
};

export default UnifiedAuthProvider;