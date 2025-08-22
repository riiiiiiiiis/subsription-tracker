import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { UnifiedAuthProvider } from './components/auth/UnifiedAuthProvider.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Subscriptions from './pages/Subscriptions.jsx';
import AnalyticsPage from './pages/Analytics.jsx';
import Settings from './pages/Settings.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { useUnifiedStoreInit } from './hooks/useUnifiedStoreInit.js';
import './App.css';

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
          <Routes>
            {/* Public route for authentication */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/settings" element={<Settings />} />
                    {/* Catch-all route for 404 handling */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </UnifiedAuthProvider>
      <Analytics />
    </ErrorBoundary>
  );
}

export default App;
