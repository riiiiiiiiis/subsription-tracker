import { useEffect } from 'react';
import useSubscriptionStore from '../store/index.js';
import { supabase } from '../lib/supabase.js';

/**
 * Hook to initialize the store and handle authentication state changes
 * This should be called once at the app level
 */
export const useStoreInit = () => {
  const { initialize, setUser, cleanup } = useSubscriptionStore();

  useEffect(() => {
    // Initialize store on app start
    initialize();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed in store init:', event, session?.user?.email);
        
        switch (event) {
          case 'SIGNED_IN':
            if (session?.user) {
              setUser(session.user);
            }
            break;
            
          case 'SIGNED_OUT':
            cleanup();
            break;
            
          case 'TOKEN_REFRESHED':
            if (session?.user) {
              setUser(session.user);
            }
            break;
            
          case 'USER_UPDATED':
            if (session?.user) {
              setUser(session.user);
            }
            break;
            
          default:
            break;
        }
      }
    );

    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, [initialize, setUser, cleanup]);
};

export default useStoreInit;