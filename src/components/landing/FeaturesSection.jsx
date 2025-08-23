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
      title: 'Ручное управление подписками',
      description: 'Легко добавляйте и редактируйте свои подписки вручную с полным контролем над вашими данными.',
      benefits: ['Добавление названия и стоимости', 'Выбор категории из списка', 'Удаление и редактирование']
    },
    {
      icon: BarChart3,
      title: 'Простая аналитика',
      description: 'Получайте базовую статистику о ваших месячных расходах и подписках.',
      benefits: ['Месячные и годовые суммы', 'Количество активных подписок', 'Предстоящие платежи']
    },
    {
      icon: Filter,
      title: 'Организация данных',
      description: 'Организуйте свои подписки по категориям и легко находите нужные.',
      benefits: ['Фильтрация по категориям', 'Поиск по названию', 'Сортировка по разным критериям']
    },
    {
      icon: Smartphone,
      title: 'Облачное хранение',
      description: 'Ваши данные безопасно хранятся в облаке Supabase с автоматической синхронизацией.',
      benefits: ['Облачная синхронизация', 'Доступ с любых устройств', 'Надёжное хранение в PostgreSQL']
    },
    {
      icon: Shield,
      title: 'Безопасная аутентификация',
      description: 'Система аутентификации на основе Supabase с Row Level Security для защиты данных.',
      benefits: ['Надёжная аутентификация', 'Изоляция данных по пользователям', 'Полный контроль доступа']
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Простые функции для управления подписками
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Основные инструменты для ручного учёта и организации ваших регулярных расходов
            с полным контролем над данными.
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
                Начните отслеживание сегодня
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Простой способ взять под контроль свои подписки без сложных настроек 
                и подключения к банковским счетам.
              </p>
              
              {/* Simple Benefits */}
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 mb-8">
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  <span>Облачное хранение</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Безопасная аутентификация</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>Простая аналитика</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;