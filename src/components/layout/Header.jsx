import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CreditCard, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui';
import useUnifiedStore from '@/store/unified-store.js';

const Header = () => {
  const location = useLocation();
  
  // Get sidebar state from unified store
  const { sidebarOpen, toggleSidebar } = useUnifiedStore(
    useShallow((state) => ({
      sidebarOpen: state.ui.sidebarOpen,
      toggleSidebar: state.toggleSidebar,
    }))
  );

  const navigation = [
    { name: 'Подписки', href: '/app/dashboard', icon: CreditCard },
    { name: 'Аналитика', href: '/app/analytics', icon: BarChart3 },
    { name: 'Настройки', href: '/app/settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/app/dashboard') {
      return location.pathname === '/app/dashboard' || location.pathname === '/app' || location.pathname === '/app/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Logo */}
          <Link to="/app/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              SubTracker
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;