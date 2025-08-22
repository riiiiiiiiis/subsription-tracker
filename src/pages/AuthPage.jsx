import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase.js';
import { useAuth } from './AuthProvider.jsx';
import { Card } from '../ui/Card.jsx';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

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
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Subscription Tracker
            </h1>
            <p className="text-gray-600">
              Sign in to manage your subscriptions across all your devices
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  background: '#7c3aed',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                },
                anchor: {
                  color: '#7c3aed',
                  textDecoration: 'none',
                  fontWeight: '500',
                },
                container: {
                  gap: '16px',
                },
                divider: {
                  background: '#e5e7eb',
                  margin: '16px 0',
                },
                input: {
                  background: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  transition: 'border-color 0.2s',
                },
                label: {
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '6px',
                },
                loader: {
                  color: '#7c3aed',
                },
                message: {
                  color: '#dc2626',
                  fontSize: '14px',
                  marginTop: '8px',
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: '#7c3aed',
                    brandAccent: '#6d28d9',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#f9fafb',
                    defaultButtonBackgroundHover: '#f3f4f6',
                    defaultButtonBorder: '#d1d5db',
                    defaultButtonText: '#374151',
                    dividerBackground: '#e5e7eb',
                    inputBackground: 'white',
                    inputBorder: '#d1d5db',
                    inputBorderHover: '#9ca3af',
                    inputBorderFocus: '#7c3aed',
                    inputText: '#111827',
                    inputLabelText: '#374151',
                    inputPlaceholder: '#9ca3af',
                    messageText: '#dc2626',
                    messageTextDanger: '#dc2626',
                    anchorTextColor: '#7c3aed',
                    anchorTextHoverColor: '#6d28d9',
                  },
                  space: {
                    spaceSmall: '4px',
                    spaceMedium: '8px',
                    spaceLarge: '16px',
                    labelBottomMargin: '6px',
                    anchorBottomMargin: '4px',
                    emailInputSpacing: '4px',
                    socialAuthSpacing: '4px',
                    buttonPadding: '12px 16px',
                    inputPadding: '12px 16px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                    baseLabelSize: '14px',
                    baseButtonSize: '14px',
                  },
                  fonts: {
                    bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    labelFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                },
              },
            }}
            theme="default"
            providers={['google', 'github']}
            redirectTo={window.location.origin}
            onlyThirdPartyProviders={false}
            magicLink={true}
            showLinks={true}
            view="sign_in"
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  email_input_placeholder: 'Enter your email address',
                  password_input_placeholder: 'Enter your password',
                  button_label: 'Sign In',
                  loading_button_label: 'Signing in...',
                  social_provider_text: 'Sign in with {{provider}}',
                  link_text: "Don't have an account? Sign up",
                  confirmation_text: 'Check your email for the confirmation link',
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  email_input_placeholder: 'Enter your email address',
                  password_input_placeholder: 'Create a password',
                  button_label: 'Sign Up',
                  loading_button_label: 'Signing up...',
                  social_provider_text: 'Sign up with {{provider}}',
                  link_text: 'Already have an account? Sign in',
                  confirmation_text: 'Check your email for the confirmation link',
                },
                magic_link: {
                  email_input_label: 'Email address',
                  email_input_placeholder: 'Enter your email address',
                  button_label: 'Send Magic Link',
                  loading_button_label: 'Sending...',
                  link_text: 'Send a magic link email',
                  confirmation_text: 'Check your email for the magic link',
                },
                forgotten_password: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  email_input_placeholder: 'Enter your email address',
                  button_label: 'Send Reset Instructions',
                  loading_button_label: 'Sending...',
                  link_text: 'Forgot your password?',
                  confirmation_text: 'Check your email for the password reset link',
                },
              },
            }}
          />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Secure authentication powered by Supabase
            </p>
            <div className="mt-4 flex justify-center items-center space-x-6 text-xs text-gray-500">
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                End-to-end encryption
              </span>
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                GDPR compliant
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;