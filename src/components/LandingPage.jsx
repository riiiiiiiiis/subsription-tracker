import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnifiedAuth } from './auth/UnifiedAuthContext.js';
import Button from './ui/Button.jsx';
import HeroSection from './landing/HeroSection.jsx';
import FeaturesSection from './landing/FeaturesSection.jsx';
import AnalyticsDemo from './landing/AnalyticsDemo.jsx';
import AboutSection from './landing/AboutSection.jsx';
import Loading from '@/components/ui/Loading';
import { Menu, X, Github } from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useUnifiedAuth();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/app/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show navbar after scrolling past 80% of the first screen (viewport height)
      if (scrollPosition > windowHeight * 0.8) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Загрузка..." />
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
      <nav className={`fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200 transition-all duration-300 ease-in-out ${
        showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
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
                  Функции
                </button>
                <button
                  onClick={() => scrollToSection('analytics')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Как это работает
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
                Функции
              </button>
              <button
                onClick={() => scrollToSection('analytics')}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium w-full text-left"
              >
                Как это работает
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
      <main className={`transition-all duration-300 ease-in-out ${
        showNavbar ? 'pt-16' : 'pt-0'
      }`}>
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
        <AnalyticsDemo />
        <AboutSection onGetStarted={handleGetStarted} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Трекер Подписок</h3>
              <p className="text-gray-400">
                Простое отслеживание ваших подписок с облачным хранением данных.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Продукт</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white text-sm">Функции</button></li>
                <li><button onClick={() => scrollToSection('analytics')} className="text-gray-400 hover:text-white text-sm">Как это работает</button></li>
                <li><button onClick={handleGetStarted} className="text-gray-400 hover:text-white text-sm">Начать</button></li>
              </ul>
            </div>
          </div>
          
          {/* GitHub Link */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <a 
              href="https://github.com/riiiiiiiiis/subsription-tracker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              <Github size={20} />
              <span>Весь код на GitHub</span>
            </a>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 Трекер Подписок. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;