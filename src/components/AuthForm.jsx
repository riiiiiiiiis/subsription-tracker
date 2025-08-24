import React, { useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { Button, Input, Loading } from './ui';
import { useTranslation } from '@/hooks/useTranslation';

const AuthForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user && !data.user.email_confirmed_at) {
          setMessage(t('auth.confirmationEmail'));
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.appTitle')}
          </h1>
          <p className="text-gray-600">
            {isSignUp ? t('auth.createAccount') : t('auth.signIn')}
          </p>
        </div>


        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t('auth.email')}
            labelTranslationKey="auth.email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.emailPlaceholder')}
            placeholderTranslationKey="auth.emailPlaceholder"
            required
            disabled={isLoading}
          />

          <Input
            label={t('auth.password')}
            labelTranslationKey="auth.password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isSignUp ? t('auth.passwordPlaceholderSignUp') : t('auth.passwordPlaceholderSignIn')}
            placeholderTranslationKey={isSignUp ? "auth.passwordPlaceholderSignUp" : "auth.passwordPlaceholderSignIn"}
            required
            disabled={isLoading}
          />

          {message && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-800">{message}</p>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg error-bg border">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loading size="sm" text="" textTranslationKey="common.loading" />
            ) : (
              isSignUp ? t('auth.signUp') : t('auth.signIn')
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary-600 hover:text-primary-500 font-medium"
          >
            {isSignUp ? t('auth.alreadyHaveAccount') : t('auth.noAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;