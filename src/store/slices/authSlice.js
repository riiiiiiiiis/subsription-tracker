import { supabase } from '@/lib/supabase.js';

export const initialAuthState = {
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  lastProfileLoad: null,
};

export const createAuthSlice = (set, get) => ({
  auth: { ...initialAuthState },

  initialize: async () => {
    console.log('🚀 AppStore: Initialize called');
    set(state => ({
      auth: { ...state.auth, isLoading: true, error: null }
    }));

    try {
      console.log('🔐 AppStore: Actively fetching initial session...');
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error('💥 AppStore: Error fetching initial session:', error);
        throw error;
      }

      get().handleAuthStateChange('INITIAL_SESSION', session);
    } catch (error) {
      console.error('💥 AppStore: Error during initialization:', error);
      get().handleAuthStateChange('INITIAL_SESSION', null);
      set(state => ({
        auth: {
          ...state.auth,
          error: error.message,
        }
      }));
    }
  },

  handleAuthStateChange: (event, session) => {
    console.log('🔄 AppStore: Auth state change:', event, session?.user?.email);

    switch (event) {
      case 'INITIAL_SESSION':
        if (session?.user) {
          console.log('✅ AppStore: Initial session found, setting authenticated user');
          get().setAuthenticatedUser(session.user, session);
        } else {
          console.log('❌ AppStore: No initial session found, resetting to unauthenticated');
          set(state => ({
            auth: {
              ...state.auth,
              user: null,
              profile: null,
              session: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            }
          }));
        }
        break;

      case 'SIGNED_IN':
        if (session?.user) {
          console.log('✅ AppStore: User signed in');
          get().setAuthenticatedUser(session.user, session);
        }
        break;

      case 'SIGNED_OUT':
        console.log('🔓 AppStore: User signed out');
        get().handleSignOut();
        break;

      case 'TOKEN_REFRESHED':
        if (session?.user) {
          console.log('🔄 AppStore: Token refreshed');
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
          console.log('👤 AppStore: User updated');
          set(state => ({
            auth: {
              ...state.auth,
              user: session.user,
              session
            }
          }));
          get().loadUserProfile(session.user.id);
        }
        break;

      default:
        console.log('🔍 AppStore: Unhandled auth state change:', event);
        break;
    }
  },

  setAuthenticatedUser: async (user, session) => {
    console.log('👤 AppStore: setAuthenticatedUser called with:', user.email);

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
      const loadUserDataWithTimeout = async () => {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('User data loading timed out'));
          }, 10000);
        });

        const loadDataPromise = Promise.all([
          get().loadUserProfile(user.id),
          get().loadUserSubscriptions()
        ]);

        return Promise.race([loadDataPromise, timeoutPromise]);
      };

      await loadUserDataWithTimeout();
      get().setupRealtimeConnections();
    } catch (error) {
      console.error('💥 AppStore: Error loading user data:', error);
      set(state => ({
        auth: {
          ...state.auth,
          error: error.message
        }
      }));
    }
  },

  resetToUnauthenticated: () => {
    console.log('🧹 AppStore: Resetting to unauthenticated state');
    get().cleanupRealtimeConnections();

    set({
      auth: {
        ...initialAuthState,
        isLoading: false
      }
    });

    get().resetDataState();
  },

  handleSignOut: () => {
    console.log('🔓 AppStore: Handling sign out');
    get().resetToUnauthenticated();
  },

  loadUserProfile: async (userId) => {
    if (!userId) {
      console.warn('⚠️ AppStore: No userId provided for profile loading');
      return;
    }

    try {
      console.log('📋 AppStore: Loading user profile for:', userId);
      set(state => ({
        auth: { ...state.auth, lastProfileLoad: Date.now() }
      }));

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ AppStore: Error loading profile:', error);

        if (error.code === 'PGRST116') {
          console.log('📝 AppStore: Profile not found, creating default profile...');
          try {
            const { auth: { user } } = get();
            const fallbackProfile = {
              id: userId,
              email: user?.email || '',
              full_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User',
              preferences: {}
            };

            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert(fallbackProfile)
              .select()
              .single();

            if (createError) {
              console.error('❌ AppStore: Error creating fallback profile:', createError);
              set(state => ({
                auth: {
                  ...state.auth,
                  profile: null,
                  error: `Profile creation error: ${createError.message}`
                }
              }));
            } else {
              console.log('✅ AppStore: Fallback profile created:', newProfile);
              set(state => ({
                auth: {
                  ...state.auth,
                  profile: newProfile,
                  error: null
                }
              }));
            }
          } catch (createError) {
            console.error('💥 AppStore: Unexpected error creating profile:', createError);
            set(state => ({
              auth: {
                ...state.auth,
                profile: null,
                error: `Profile creation error: ${createError.message}`
              }
            }));
          }
        } else {
          set(state => ({
            auth: {
              ...state.auth,
              profile: null,
              error: `Profile load error: ${error.message}`
            }
          }));
        }
      } else {
        console.log('✅ AppStore: Profile loaded:', data);
        set(state => ({
          auth: {
            ...state.auth,
            profile: data,
            error: null
          }
        }));
      }
    } catch (error) {
      console.error('💥 AppStore: Unexpected error loading profile:', error);
      set(state => ({
        auth: {
          ...state.auth,
          profile: null,
          error: `Profile load error: ${error.message}`
        }
      }));
    }
  },

  getDisplayName: () => {
    const { auth } = get();
    const { profile, user } = auth;

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
});

