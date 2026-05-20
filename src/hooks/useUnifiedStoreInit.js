import { useEffect, useRef } from 'react';
import useAppStore from '@/store';
import { supabase } from '../lib/supabase.js';

// Global flag to track if auth listener is already initialized
// This prevents multiple listeners when React StrictMode causes double effect runs
let authListenerInitialized = false;
let globalAuthSubscription = null;

/**
 * Unified hook to initialize the store and handle authentication state changes
 * This replaces both AuthProvider and useStoreInit to eliminate race conditions
 * Resilient to React StrictMode double-effect runs
 */
export const useUnifiedStoreInit = () => {
  const { initialize, handleAuthStateChange } = useAppStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (hasInitialized.current && authListenerInitialized) {
      console.log('⏭️ useUnifiedStoreInit: Already initialized, skipping...');
      return;
    }

    console.log('🚀 useUnifiedStoreInit: Initializing...');
    
    // Initialize the store only once
    if (!hasInitialized.current) {
      initialize();
      hasInitialized.current = true;
    }

    // Setup auth listener only once globally
    if (!authListenerInitialized) {
      console.log('🔗 useUnifiedStoreInit: Setting up auth state listener...');
      authListenerInitialized = true;
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log('🔄 useUnifiedStoreInit: Auth state changed:', event, session?.user?.email);
          handleAuthStateChange(event, session);
        }
      );
      
      globalAuthSubscription = subscription;
    }

    // Cleanup function - only unsubscribe when component unmounts (not on StrictMode cleanup)
    return () => {
      console.log('🧹 useUnifiedStoreInit: Effect cleanup called');
      // Don't unsubscribe immediately - let it persist for app lifetime
      // Only unsubscribe on actual app unmount
    };
  }, [initialize, handleAuthStateChange]);
  
  // Cleanup global subscription on app unmount (window unload)
  useEffect(() => {
    const handleUnload = () => {
      if (globalAuthSubscription) {
        console.log('🧹 useUnifiedStoreInit: App unloading, cleaning up auth listener');
        globalAuthSubscription.unsubscribe();
        globalAuthSubscription = null;
        authListenerInitialized = false;
      }
    };
    
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
};

export default useUnifiedStoreInit;