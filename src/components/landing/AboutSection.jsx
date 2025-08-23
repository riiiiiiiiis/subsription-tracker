import React from 'react';
import Button from '../ui/Button.jsx';
import { CheckCircle, Users, Shield, Zap, Heart, Award } from 'lucide-react';

const AboutSection = ({ onGetStarted }) => {
  const benefits = [
    'Отслеживайте свои месячные расходы',
    'Понимайте куда уходят ваши деньги',
    'Организуйте подписки по категориям',
    'Планируйте предстоящие платежи',
    'Контролируйте свои данные локально',
    'Настраивайте приложение за несколько минут'
  ];



  const trustIndicators = [
    {
      icon: Users,
      title: "Простое использование",
      description: "Настройка за несколько минут"
    },
    {
      icon: Shield,
      title: "Облачное хранение",
      description: "Безопасное хранение в Supabase"
    },
    {
      icon: Zap,
      title: "Аутентификация",
      description: "Надёжная система входа и регистрации"
    },
    {
      icon: Heart,
      title: "Открытый код",
      description: "Полная прозрачность работы приложения"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Benefits Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Почему стоит выбрать Трекер Подписок?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Простой и честный способ отслеживания ваших подписок 
            без сложных интеграций и рисков для безопасности.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{indicator.title}</h3>
                  <p className="text-sm text-gray-600">{indicator.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials - Removed fake testimonials, replaced with simple feature highlight */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Как это работает
            </h3>
            <p className="text-lg text-gray-600">
              Простой трёхэтапный процесс для начала отслеживания ваших подписок
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Добавьте подписки</h4>
              <p className="text-gray-600">Вручную введите названия и стоимость ваших подписок</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Организуйте данные</h4>
              <p className="text-gray-600">Распределите по категориям и укажите периодичность</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Отслеживайте расходы</h4>
              <p className="text-gray-600">Просматривайте простую аналитику и планируйте бюджет</p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Начните отслеживание подписок сегодня
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Простой способ взять под контроль свои регулярные расходы. 
              Начните сегодня и увидьте все свои подписки в одном месте.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Облачное хранение</div>
                <div className="text-sm text-gray-400">Ваши данные в безопасности</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">2 Минуты</div>
                <div className="text-sm text-gray-400">Простая регистрация</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Полный контроль</div>
                <div className="text-sm text-gray-400">Никаких скрытых функций</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onGetStarted} 
                variant="primary" 
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Начать бесплатно
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              >
                Узнать больше
              </Button>
            </div>

            {/* Security Note */}
            <div className="mt-8 flex items-center justify-center text-sm text-gray-400">
              <Shield className="h-4 w-4 mr-2" />
              <span>Облачное хранение с Row Level Security. Надёжная аутентификация через Supabase.</span>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-20 text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Частые вопросы
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Нужна ли регистрация для использования?</h5>
              <p className="text-sm text-gray-600">
                Да, нужно создать аккаунт с email и паролем. Это нужно для безопасного хранения ваших данных.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Где хранятся мои данные?</h5>
              <p className="text-sm text-gray-600">
                Все данные хранятся в облаке Supabase с автоматической синхронизацией между устройствами.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Какая аналитика доступна?</h5>
              <p className="text-sm text-gray-600">
                Месячные и годовые суммы, количество активных подписок, предстоящие платежи и базовая категоризация.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Как работает защита данных?</h5>
              <p className="text-sm text-gray-600">
                Используется Row Level Security (RLS) в Supabase, которая гарантирует, что каждый пользователь видит только свои данные.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;