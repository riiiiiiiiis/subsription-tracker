import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnifiedAuth } from './auth/UnifiedAuthProvider.jsx';
import Button from './ui/Button.jsx';
import HeroSection from './landing/HeroSection.jsx';
import FeaturesSection from './landing/FeaturesSection.jsx';
import AnalyticsDemo from './landing/AnalyticsDemo.jsx';
import AboutSection from './landing/AboutSection.jsx';
import { Menu, X } from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useUnifiedAuth();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/app/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Трекер Подписок</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Возможности
                </button>
                <button
                  onClick={() => scrollToSection('analytics')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Аналитика
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  О проекте
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button onClick={handleGetStarted} variant="primary">
                Начать бесплатно
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Возможности
              </button>
              <button
                onClick={() => scrollToSection('analytics')}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Аналитика
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium w-full text-left"
              >
                О проекте
              </button>
              <div className="px-3 py-2">
                <Button onClick={handleGetStarted} variant="primary" className="w-full">
                  Начать бесплатно
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
        <AnalyticsDemo />
        <AboutSection onGetStarted={handleGetStarted} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Трекер Подписок</h3>
              <p className="text-gray-400">
                Возьмите под контроль свои подписки с умным отслеживанием и аналитикой.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Продукт</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white text-sm">Возможности</button></li>
                <li><button onClick={() => scrollToSection('analytics')} className="text-gray-400 hover:text-white text-sm">Аналитика</button></li>
                <li><button onClick={handleGetStarted} className="text-gray-400 hover:text-white text-sm">Начать</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Поддержка</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400 text-sm">Центр помощи</span></li>
                <li><span className="text-gray-400 text-sm">Связаться с нами</span></li>
                <li><span className="text-gray-400 text-sm">Политика конфиденциальности</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 Трекер Подписок. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;