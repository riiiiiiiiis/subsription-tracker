import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUnifiedAuth } from '../components/auth/UnifiedAuthContext.js';
import AuthForm from '../components/AuthForm.jsx';
import Loading from '@/components/ui/Loading';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useUnifiedAuth();

  // Get the intended destination from state, default to dashboard
  const from = location.state?.from || '/app/dashboard';

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  // Don't render anything while loading or if user is authenticated
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="md" text="" textTranslationKey="common.loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <AuthForm />
    </div>
  );
};

export default AuthPage;