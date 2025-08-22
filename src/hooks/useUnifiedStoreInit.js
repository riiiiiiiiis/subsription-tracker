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
    // Initialize store on app start
    console.log('🚀 useUnifiedStoreInit: Initializing...');
    initialize();

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
  }, [initialize, handleAuthStateChange]);
};

export default useUnifiedStoreInit;