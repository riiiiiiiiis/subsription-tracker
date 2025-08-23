import React from 'react';
import Button from '../ui/Button.jsx';
import { ArrowRight, CreditCard, BarChart3, Smartphone } from 'lucide-react';

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Простое отслеживание
              <span className="text-gray-600 block">Подписок</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Вручную добавляйте и отслеживайте свои регулярные расходы в одном месте. 
              Простой инструмент для личного учёта подписок без сложных настроек.
            </p>
            
            {/* Key Benefits */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-center lg:justify-start">
                <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Ручное добавление и учёт подписок</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <BarChart3 className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Простая аналитика месячных расходов</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Smartphone className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Облачная синхронизация через Supabase</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={onGetStarted} 
                variant="primary" 
                size="lg"
              >
                Начать бесплатно
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              >
                Узнать больше
              </Button>
            </div>

            {/* Simple Feature Highlight */}
            <div className="mt-8 text-center lg:text-left">
              <p className="text-sm text-gray-500 mb-2">Начните отслеживание с регистрации</p>
              <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-600">
                <span>✓ Быстрая регистрация</span>
                <span>✓ Облачное хранение</span>
                <span>✓ Простой интерфейс</span>
              </div>
            </div>
          </div>

          {/* Visual Demo */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 mx-auto max-w-md">
              {/* Mock App Interface */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Месячный обзор</h3>
                  <span className="text-sm text-gray-500">Январь 2024</span>
                </div>
                
                {/* Total Spending */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Общие расходы</span>
                    <span className="text-2xl font-bold text-gray-900">$156.47</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                {/* Sample Subscriptions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">N</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Netflix</p>
                        <p className="text-xs text-gray-500">Развлечения</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">$15.99</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">S</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Spotify</p>
                        <p className="text-xs text-gray-500">Музыка</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">$9.99</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">D</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Dropbox</p>
                        <p className="text-xs text-gray-500">Облачное хранилище</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">$11.99</span>
                  </div>
                </div>
                
                <Button variant="primary" size="sm" className="w-full">
                  Добавить подписку
                </Button>
              </div>
            </div>
            
            {/* Simple Info Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 hidden lg:block">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Простое добавление</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 hidden lg:block">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">$156</div>
                <div className="text-xs text-gray-600">Всего за месяц</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;