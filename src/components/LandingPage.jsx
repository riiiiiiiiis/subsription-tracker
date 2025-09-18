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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <div className="pointer-events-none absolute -top-52 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary-500/30 blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/2 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-blue-500/20 blur-3xl"></div>

      {/* Navigation Header */}
      <nav
        className={`fixed top-0 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl z-50 transition-all duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-sm font-semibold text-white shadow-lg">
                TP
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-white">Трекер Подписок</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2 lg:space-x-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Функции
                </button>
                <button
                  onClick={() => scrollToSection('analytics')}
                  className="px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Как это работает
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  О проекте
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button onClick={handleGetStarted} variant="primary" className="shadow-lg shadow-primary-500/30">
                Начать бесплатно
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-200 transition-colors hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="bg-slate-950/95 border-t border-white/10 px-2 pt-2 pb-6 sm:px-3">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Функции
              </button>
              <button
                onClick={() => scrollToSection('analytics')}
                className="mt-2 block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Как это работает
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="mt-2 block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                О проекте
              </button>
              <div className="mt-4 px-3">
                <Button onClick={handleGetStarted} variant="primary" className="w-full shadow-lg shadow-primary-500/30">
                  Начать бесплатно
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main
        className={`relative transition-all duration-300 ease-in-out ${
          showNavbar ? 'pt-20 sm:pt-24' : 'pt-0'
        }`}
      >
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
        <AnalyticsDemo />
        <AboutSection onGetStarted={handleGetStarted} />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-sm font-semibold text-white shadow-lg">
                  TP
                </div>
                <h3 className="text-lg font-semibold text-white">Трекер Подписок</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Управляйте всеми регулярными расходами в одном месте. Контроль бюджета, предстоящие платежи и наглядная аналитика без лишних сложностей.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Навигация</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="transition-colors hover:text-white"
                  >
                    Функции
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('analytics')}
                    className="transition-colors hover:text-white"
                  >
                    Как это работает
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleGetStarted}
                    className="transition-colors hover:text-white"
                  >
                    Начать
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Ресурсы</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>Открытый код и прозрачность</li>
                <li>Синхронизация Supabase</li>
                <li>Защита данных с RLS</li>
              </ul>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
            <a
              href="https://github.com/riiiiiiiiis/subsription-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <Github size={20} />
              <span>Весь код на GitHub</span>
            </a>
            <p className="text-xs text-slate-500">
              © 2025 Трекер Подписок. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;