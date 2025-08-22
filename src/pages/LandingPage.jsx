import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  BarChart3,
  Smartphone,
  Shield,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  DollarSign,
  RefreshCw,
  Eye,
  Bell,
  Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider.jsx';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useUnifiedAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-900 p-2 rounded-md">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Qoder</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">Функции</a>
              <a href="#analytics" className="text-gray-600 hover:text-gray-900 text-sm">Аналитика</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm">О продукте</a>
            </div>

            <div className="hidden md:flex">
              <Link to="/auth" className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
                Начать использовать
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-3">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">Функции</a>
                <a href="#analytics" className="text-gray-600 hover:text-gray-900 text-sm">Аналитика</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm">О продукте</a>
                <Link to="/auth" className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors w-fit">
                  Начать использовать
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                <CheckCircle className="h-3 w-3 mr-2" />
                Бесплатно навсегда
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Контролируйте все подписки в одном месте
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Отслеживайте расходы на подписки, получайте детальную аналитику трат и никогда не забывайте о предстоящих платежах.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/auth" className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                  Начать бесплатно
                  <ArrowRight className="inline h-4 w-4 ml-2" />
                </Link>
                <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-6 py-3">
                  Посмотреть демо
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-gray-400 mr-1" />
                  Без регистрации
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-gray-400 mr-1" />
                  Синхронизация устройств
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-gray-400 mr-1" />
                  Безопасность данных
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-white p-4 rounded-md shadow-sm mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">Месячные расходы</h3>
                  <span className="text-2xl font-bold text-gray-900">₽12,450</span>
                </div>
                <div className="text-xs text-gray-500">Всего активных подписок</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    <span className="text-sm font-medium">Развлечения</span>
                  </div>
                  <span className="text-sm font-semibold">₽3,200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-sm font-medium">Продуктивность</span>
                  </div>
                  <span className="text-sm font-semibold">₽4,890</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-medium">Здоровье</span>
                  </div>
                  <span className="text-sm font-semibold">₽2,100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm font-medium">Прочее</span>
                  </div>
                  <span className="text-sm font-semibold">₽2,260</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Полный контроль над подписками
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Все необходимые инструменты для управления регулярными платежами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="bg-gray-100 p-2 rounded-md w-fit mb-4">
                <CreditCard className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Учёт подписок</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Добавляйте, редактируйте и организуйте все подписки. Настраивайте категории и циклы оплаты.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="bg-gray-100 p-2 rounded-md w-fit mb-4">
                <BarChart3 className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Аналитика трат</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Детальная статистика расходов с разбивкой по категориям и прогнозами на год.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="bg-gray-100 p-2 rounded-md w-fit mb-4">
                <Smartphone className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Синхронизация</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Доступ к данным с любого устройства. Изменения синхронизируются мгновенно.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="bg-gray-100 p-2 rounded-md w-fit mb-4">
                <Bell className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Уведомления</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Получайте напоминания о предстоящих платежах и не пропускайте важные даты.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="bg-gray-100 p-2 rounded-md w-fit mb-4">
                <Filter className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Фильтрация</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Сортировка и поиск подписок по статусу, категориям, сумме и дате.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="bg-gray-100 p-2 rounded-md w-fit mb-4">
                <Shield className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Безопасность</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Данные защищены шифрованием. Безопасная аутентификация и восстановление паролей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Showcase */}
      <section id="analytics" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Понимайте свои расходы
              </h2>
              <p className="text-gray-600 mb-6">
                Получайте детальную аналитику трат на подписки с интерактивными графиками и отчётами.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-1 rounded-md">
                    <DollarSign className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Месячные и годовые прогнозы</h4>
                    <p className="text-gray-600 text-sm">Точные расчёты текущих трат и прогнозы будущих расходов.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-1 rounded-md">
                    <BarChart3 className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Разбивка по категориям</h4>
                    <p className="text-gray-600 text-sm">Анализ распределения расходов с процентным соотношением.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-1 rounded-md">
                    <TrendingUp className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Тренды трат</h4>
                    <p className="text-gray-600 text-sm">Отслеживание изменений в тратах на подписки во времени.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-1 rounded-md">
                    <Calendar className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Календарь платежей</h4>
                    <p className="text-gray-600 text-sm">Обзор предстоящих платежей в настраиваемых временных рамках.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <h3 className="text-white text-lg font-semibold mb-1">Обзор за месяц</h3>
                <div className="text-white text-2xl font-bold">₽12,450</div>
                <div className="text-gray-300 text-sm">Общие месячные расходы</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                    <span className="font-medium text-sm">Развлечения</span>
                    <span className="text-xs text-gray-500">26%</span>
                  </div>
                  <span className="font-semibold text-sm">₽3,200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    <span className="font-medium text-sm">Продуктивность</span>
                    <span className="text-xs text-gray-500">39%</span>
                  </div>
                  <span className="font-semibold text-sm">₽4,890</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="font-medium text-sm">Здоровье</span>
                    <span className="text-xs text-gray-500">17%</span>
                  </div>
                  <span className="font-semibold text-sm">₽2,100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="font-medium text-sm">Прочее</span>
                    <span className="text-xs text-gray-500">18%</span>
                  </div>
                  <span className="font-semibold text-sm">₽2,260</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Простое решение сложной задачи
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Qoder создан для тех, кто хочет контролировать свои регулярные расходы.
            Никаких сложных настроек — просто добавьте подписки и получайте полную картину своих трат.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
                <Eye className="h-8 w-8 text-gray-700 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Прозрачность</h3>
              <p className="text-gray-600 text-sm">Полная видимость всех регулярных платежей</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
                <RefreshCw className="h-8 w-8 text-gray-700 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Автоматизация</h3>
              <p className="text-gray-600 text-sm">Автоматические расчёты и уведомления</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
                <Users className="h-8 w-8 text-gray-700 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Простота</h3>
              <p className="text-gray-600 text-sm">Интуитивный интерфейс без лишних функций</p>
            </div>
          </div>

          <Link to="/auth" className="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
            Попробовать бесплатно
            <ArrowRight className="inline h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gray-900 p-2 rounded-md">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Qoder</span>
            </div>

            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Поддержка</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Условия</a>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 Qoder. Бесплатный инструмент для контроля подписок.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
