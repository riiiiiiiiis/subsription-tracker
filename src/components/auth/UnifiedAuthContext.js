import { createContext, useContext } from 'react';

const defaultAuthContext = {
  user: null,
  profile: null,
  session: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
  resetPassword: () => {},
  getDisplayName: () => 'User',
};

export const UnifiedAuthContext = createContext(defaultAuthContext);

export const useUnifiedAuth = () => {
  const context = useContext(UnifiedAuthContext);

  if (!context) {
    throw new Error('useUnifiedAuth must be used within a UnifiedAuthProvider');
  }

  return context;
};

export default UnifiedAuthContext;
