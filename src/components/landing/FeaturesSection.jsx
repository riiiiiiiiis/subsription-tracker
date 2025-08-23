import React from 'react';
import { 
  CreditCard, 
  BarChart3, 
  Bell, 
  Shield, 
  Calendar, 
  TrendingUp,
  Filter,
  Smartphone 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Умное отслеживание подписок',
      description: 'Автоматически категоризируйте и отслеживайте все свои подписки с интеллектуальным обнаружением расходов и категоризацией.',
      benefits: ['Авто-категоризация', 'Обнаружение расходов', 'Отслеживание способов оплаты']
    },
    {
      icon: BarChart3,
      title: 'Продвинутая аналитика',
      description: 'Получайте детальные сведения о ваших паттернах расходов с помощью комплексных диаграмм и отчётов.',
      benefits: ['Месячные тренды', 'Разбивка по категориям', 'Прогнозы расходов']
    },
    {
      icon: Bell,
      title: 'Умные напоминания',
      description: 'Никогда не пропустите продление с настраиваемыми уведомлениями и оповещениями об отмене.',
      benefits: ['Оповещения о продлении', 'Уведомления об изменении цен', 'Пользовательские напоминания']
    },
    {
      icon: Filter,
      title: 'Мощная фильтрация',
      description: 'Легко организуйте и находите свои подписки с помощью продвинутых возможностей фильтрации и поиска.',
      benefits: ['Фильтры по категориям', 'Сортировка по статусу', 'Быстрый поиск']
    },
    {
      icon: Calendar,
      title: 'Календарь платежей',
      description: 'Визуализируйте все предстоящие платежи в ясном месячном календарном представлении.',
      benefits: ['Хронология платежей', 'Месячный обзор', 'Даты продления']
    },
    {
      icon: Shield,
      title: 'Надёжно и приватно',
      description: 'Ваши данные защищены защитой корпоративного уровня и полным контролем конфиденциальности.',
      benefits: ['Шифрование банковского уровня', 'Приватность по замыслу', 'Надёжная облачная синхронизация']
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Всё необходимое для управления вашими подписками
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Комплексные инструменты и аналитика, чтобы помочь вам отслеживать, анализировать и оптимизировать 
            ваши расходы на подписки с полным контролем и прозрачностью.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-900 transition-colors">
                  <Icon className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Готовы взять контроль?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Присоединяйтесь к тысячам пользователей, которые уже сэкономили деньги и время с нашей 
                интеллектуальной платформой управления подписками.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$2.4М+</div>
                  <div className="text-sm text-gray-600">Общая экономия</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15,000+</div>
                  <div className="text-sm text-gray-600">Активных пользователей</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Рейтинг удовлетворённости</div>
                </div>
              </div>

              {/* Mobile App Preview */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <Smartphone className="h-4 w-4" />
                <span>Доступно на всех устройствах</span>
                <span className="text-gray-400">•</span>
                <TrendingUp className="h-4 w-4" />
                <span>Синхронизация в реальном времени</span>
                <span className="text-gray-400">•</span>
                <Shield className="h-4 w-4" />
                <span>Защита банковского уровня</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;