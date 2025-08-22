import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { UnifiedAuthProvider } from './components/auth/UnifiedAuthProvider.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import Layout from './components/layout/Layout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Loading from './components/ui/Loading.jsx';
import { useUnifiedStoreInit } from './hooks/useUnifiedStoreInit.js';
import './App.css';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Subscriptions = lazy(() => import('./pages/Subscriptions.jsx'));
const AnalyticsPage = lazy(() => import('./pages/Analytics.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const AuthPage = lazy(() => import('./pages/AuthPage.jsx'));
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));

function App() {
  // Initialize the unified store with Supabase integration
  useUnifiedStoreInit();
  
  return (
    <ErrorBoundary>
      <UnifiedAuthProvider>
        <Router 
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Suspense fallback={<Loading text="Загрузка страницы..." />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Protected routes */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <Layout>
                    <Suspense fallback={<Loading text="Загрузка контента..." />}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/subscriptions" element={<Subscriptions />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/settings" element={<Settings />} />
                        {/* Catch-all route for 404 handling */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Suspense>
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </Router>
      </UnifiedAuthProvider>
      <Analytics />
    </ErrorBoundary>
  );
}

export default App;
