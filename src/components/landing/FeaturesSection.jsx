import React from 'react';
import {
  CreditCard,
  BarChart3,
  Shield,
  TrendingUp,
  Filter,
  Smartphone
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Ручное управление подписками',
      description: 'Легко добавляйте и редактируйте подписки вручную. Полный контроль над данными без банковских привязок.',
      benefits: ['Название, стоимость и периодичность', 'Выбор категории и валюты', 'Удаление и редактирование в один клик']
    },
    {
      icon: BarChart3,
      title: 'Простая аналитика',
      description: 'Получайте наглядную статистику расходов, прогнозы и динамику подписок за месяц и год.',
      benefits: ['Суммы по периодам и категориям', 'Количество активных подписок', 'Сравнение с предыдущими месяцами']
    },
    {
      icon: Filter,
      title: 'Организация данных',
      description: 'Сортируйте и фильтруйте подписки по категориям, стоимости и дате следующего платежа.',
      benefits: ['Контроль статуса оплаты', 'Поиск по названию и тегам', 'Гибкая фильтрация по категориям']
    },
    {
      icon: Smartphone,
      title: 'Облачное хранение',
      description: 'Данные автоматически синхронизируются через Supabase и доступны с любого устройства.',
      benefits: ['Синхронизация в режиме реального времени', 'Доступ из браузера и мобильного устройства', 'Надёжная инфраструктура PostgreSQL']
    },
    {
      icon: Shield,
      title: 'Безопасная аутентификация',
      description: 'Row Level Security изолирует данные каждого пользователя. Вход только по вашим учетным данным.',
      benefits: ['Безопасная регистрация', 'Двухфакторную защиту можно подключить', 'Полный контроль доступа']
    }
  ];

  return (
    <section id="features" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Возможности
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Всё необходимое для управления подписками
          </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Соберите в одном месте информацию о сервисах, платежах и категориях. Прозрачная аналитика,
              уведомления и гибкая фильтрация помогают видеть картину расходов целиком.
            </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-primary-500/20"
              >
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400/80 to-blue-500/80 text-white shadow-lg shadow-primary-500/30">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="relative mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="relative mt-5 space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start text-sm text-slate-400">
                      <span className="mt-1 mr-3 inline-block h-1.5 w-1.5 rounded-full bg-primary-300"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-900/40 p-10 text-center">
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-primary-500/20 blur-3xl"></div>
            <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-blue-500/20 blur-[140px]"></div>
            <div className="relative mx-auto max-w-3xl">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                Начните отслеживание сегодня
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Берите управление подписками в свои руки: добавляйте сервисы, получайте напоминания о платежах
                и наблюдайте за бюджетом в удобной панели.
              </p>

              {/* Simple Benefits */}
              <div className="mt-8 flex flex-col items-center justify-center gap-6 text-sm text-slate-300 sm:flex-row sm:gap-10">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-primary-300" />
                  <span>Облачное хранение</span>
                </div>
                <div className="hidden h-2 w-2 rounded-full bg-white/30 sm:block"></div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-300" />
                  <span>Защита с RLS</span>
                </div>
                <div className="hidden h-2 w-2 rounded-full bg-white/30 sm:block"></div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-fuchsia-300" />
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