import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const AnalyticsDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Demo data for analytics visualization
  const categoryData = [
    { category: 'Развлечения', amount: 45.97, count: 3, color: 'bg-red-500' },
    { category: 'Продуктивность', amount: 39.99, count: 2, color: 'bg-blue-500' },
    { category: 'Облачное хранилище', amount: 23.98, count: 2, color: 'bg-green-500' },
    { category: 'Коммуникации', amount: 29.99, count: 1, color: 'bg-purple-500' },
    { category: 'Здоровье', amount: 16.54, count: 1, color: 'bg-orange-500' }
  ];

  const upcomingPayments = [
    { name: 'Netflix', amount: 15.99, date: 'Сегодня', category: 'Развлечения' },
    { name: 'Spotify', amount: 9.99, date: 'Завтра', category: 'Развлечения' },
    { name: 'Adobe Creative', amount: 22.99, date: 'Через 3 дня', category: 'Продуктивность' },
    { name: 'iCloud Storage', amount: 2.99, date: 'Через 5 дней', category: 'Облачное хранилище' }
  ];



  const tabs = [
    { id: 'overview', label: 'Обзор', icon: BarChart3 },
    { id: 'upcoming', label: 'Предстоящие', icon: Calendar }
  ];

  return (
    <section id="analytics" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute -top-32 right-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-primary-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Аналитика
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Аналитика расходов в одном дэшборде
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Просматривайте базовую статистику ваших подписок: общие расходы, количество активных подписок,
            предстоящие платежи и разбивку по категориям без сложной настройки.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-blue-500/10 backdrop-blur">
          {/* Demo Tabs */}
          <div className="border-b border-white/10">
            <div className="flex flex-wrap">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'border-b-2 border-primary-400 text-white'
                        : 'border-b-2 border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo Content */}
          <div className="p-6 lg:p-10">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-10">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300">Общие месячные</p>
                        <p className="mt-2 text-2xl font-semibold text-white">$156.47</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary-300" />
                    </div>
                    <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary-400 to-blue-500"></div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300">Активные подписки</p>
                        <p className="mt-2 text-2xl font-semibold text-white">9</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-blue-300" />
                    </div>
                    <p className="mt-4 text-sm text-slate-400">Количество активных подписок</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300">Предстоящие платежи</p>
                        <p className="mt-2 text-2xl font-semibold text-white">4</p>
                      </div>
                      <Calendar className="h-8 w-8 text-fuchsia-300" />
                    </div>
                    <p className="mt-4 text-sm text-slate-400">На этой неделе</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-300">Общие годовые</p>
                        <p className="mt-2 text-2xl font-semibold text-white">$1,877</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-emerald-300" />
                    </div>
                    <p className="mt-4 text-sm text-slate-400">Прогноз на год</p>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-white">Расходы по категориям</h3>
                  <div className="mt-6 space-y-3">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                        <div className="flex items-center">
                          <div className={`mr-3 h-3 w-3 rounded-full ${category.color}`}></div>
                          <span className="text-sm font-medium text-white">{category.category}</span>
                          <span className="ml-2 text-sm text-slate-400">({category.count} сервисов)</span>
                        </div>
                        <span className="text-sm font-medium text-slate-100">${category.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Tab */}
            {activeTab === 'upcoming' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-white">Предстоящие платежи</h3>
                  <div className="mt-6 space-y-3">
                    {upcomingPayments.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">
                            {payment.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{payment.name}</p>
                            <p className="text-sm text-slate-400">{payment.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">${payment.amount}</p>
                          <p className="text-sm text-slate-400">{payment.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-400/30 bg-blue-500/10 p-4">
                  <div className="flex items-center text-sm text-blue-100">
                    <Calendar className="mr-2 h-5 w-5 text-blue-200" />
                    <span>
                      <strong className="text-white">Напоминание:</strong> проверяйте предстоящие платежи регулярно
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDemo;