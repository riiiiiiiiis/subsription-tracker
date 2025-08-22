import { useEffect } from 'react';
import useUnifiedStore from '../store/unified-store.js';
import { supabase } from '../lib/supabase.js';

/**
 * Unified hook to initialize the store and handle authentication state changes
 * This replaces both AuthProvider and useStoreInit to eliminate race conditions
 */
export const useUnifiedStoreInit = () => {
  const { initialize, handleAuthStateChange } = useUnifiedStore();

  useEffect(() => {
    // Clear any potentially stale auth data that might cause refresh token errors
    const clearStaleAuthData = async () => {
      try {
        // Clear any stale Supabase auth data
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error && !error.message.includes('User not logged in')) {
          console.warn('⚠️ useUnifiedStoreInit: Warning clearing stale auth data:', error.message);
        }
      } catch (error) {
        console.warn('⚠️ useUnifiedStoreInit: Error clearing stale auth data:', error.message);
      }
    };

    // Initialize store on app start
    console.log('🚀 useUnifiedStoreInit: Initializing...');
    
    // Clear stale data first, then initialize
    clearStaleAuthData().then(() => {
      initialize();
    });

    // Listen for auth state changes with unified handler
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔄 useUnifiedStoreInit: Auth state changed:', event, session?.user?.email);
        handleAuthStateChange(event, session);
      }
    );

    // Cleanup function
    return () => {
      console.log('🧹 useUnifiedStoreInit: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array - this should only run once on mount
};

export default useUnifiedStoreInit;