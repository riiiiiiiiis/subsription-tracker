import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnifiedAuth } from '../components/auth/UnifiedAuthProvider.jsx';
import AuthForm from '../components/AuthForm.jsx';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useUnifiedAuth();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  // Don't render anything while loading or if user is authenticated
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
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