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
const AnalyticsPage = lazy(() => import('./pages/Analytics.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const AuthPage = lazy(() => import('./pages/AuthPage.jsx'));
const LandingPage = lazy(() => import('./components/LandingPage.jsx'));

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
          <Suspense fallback={<Loading text="Loading page..." />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Protected app routes */}
              <Route path="/app/*" element={
                <ProtectedRoute>
                  <Layout>
                    <Suspense fallback={<Loading text="Loading content..." />}>
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        {/* Redirect subscriptions to dashboard for backward compatibility */}
                        <Route path="subscriptions" element={<Navigate to="dashboard" replace />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="settings" element={<Settings />} />
                        {/* Default redirect to dashboard */}
                        <Route path="" element={<Navigate to="dashboard" replace />} />
                        {/* Catch-all route for 404 handling */}
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </Suspense>
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Catch-all redirect to landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </UnifiedAuthProvider>
      <Analytics />
    </ErrorBoundary>
  );
}

export default App;
