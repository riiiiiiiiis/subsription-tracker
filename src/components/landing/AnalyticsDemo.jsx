import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

const AnalyticsDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Demo data for analytics visualization
  const monthlyData = [
    { month: 'Янв', amount: 142.50, subscriptions: 8 },
    { month: 'Фев', amount: 156.47, subscriptions: 9 },
    { month: 'Мар', amount: 134.99, subscriptions: 8 },
    { month: 'Апр', amount: 167.96, subscriptions: 10 },
    { month: 'Май', amount: 149.47, subscriptions: 9 },
    { month: 'Июн', amount: 158.96, subscriptions: 9 }
  ];

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

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: BarChart3 },
    { id: 'trends', label: 'Тренды', icon: TrendingUp },
    { id: 'upcoming', label: 'Предстоящие', icon: Calendar }
  ];

  return (
    <section id="analytics" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Мощная аналитика и инсайты
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Получайте глубокие сведения о ваших расходах на подписки с помощью интерактивных диаграмм, 
            анализа трендов и прогнозирования для оптимизации вашего бюджета.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Demo Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo Content */}
          <div className="p-6 lg:p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Общие месячные</p>
                        <p className="text-2xl font-bold text-gray-900">$156.47</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600">+12.3%</span>
                      <span className="text-gray-500 ml-1">по сравнению с прошлым месяцем</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Активные подписки</p>
                        <p className="text-2xl font-bold text-gray-900">9</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600">+1</span>
                      <span className="text-gray-500 ml-1">в этом месяце</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Среднее на сервис</p>
                        <p className="text-2xl font-bold text-gray-900">$17.38</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-600">-5.2%</span>
                      <span className="text-gray-500 ml-1">по сравнению с прошлым месяцем</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Потенциальная экономия</p>
                        <p className="text-2xl font-bold text-gray-900">$24.50</p>
                      </div>
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Неиспользуемые подписки
                    </div>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Расходы по категориям</h3>
                  <div className="space-y-3">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                          <span className="text-sm font-medium text-gray-900">{category.category}</span>
                          <span className="text-sm text-gray-500 ml-2">({category.count} сервисов)</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">${category.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Trends Tab */}
            {activeTab === 'trends' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Тренд расходов за 6 месяцев</h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {monthlyData.map((data, index) => {
                      const height = (data.amount / maxAmount) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gray-600 rounded-t hover:bg-gray-700 transition-colors cursor-pointer relative group"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              ${data.amount}
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-600 text-center">
                            <div>{data.month}</div>
                            <div className="text-gray-400">{data.subscriptions} подп.</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Тренд роста</h4>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Ваши расходы увеличились на <strong>10.2%</strong> за последние 6 месяцев
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Прогноз</h4>
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Ожидается достижение <strong>$170</strong> в следующем месяце
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Tab */}
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Предстоящие платежи</h3>
                  <div className="space-y-3">
                    {upcomingPayments.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-sm font-bold text-gray-600">
                              {payment.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{payment.name}</p>
                            <p className="text-sm text-gray-500">{payment.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${payment.amount}</p>
                          <p className="text-sm text-gray-500">{payment.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800">
                      <strong>Напоминание:</strong> 4 платежа на сумму $51.96 на этой неделе
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