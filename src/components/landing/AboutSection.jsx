import React from 'react';
import Button from '../ui/Button.jsx';
import { CheckCircle, Users, Shield, Zap, Heart, Award } from 'lucide-react';

const AboutSection = ({ onGetStarted }) => {
  const benefits = [
    'Экономьте в среднем $200+ в год',
    'Никогда не пропустите продление или изменение цены',
    'Понимайте свои паттерны расходов',
    'Легко отменяйте неиспользуемые подписки',
    'Устанавливайте пользовательские лимиты бюджета и оповещения',
    'Экспортируйте данные для налоговых целей'
  ];

  const testimonials = [
    {
      quote: "Трекер Подписок помог мне обнаружить, что я плачу за 3 стриминговых сервиса, о которых я забыла. Экономия $45 в месяц!",
      author: "Сара Чен",
      role: "Маркетинг-менеджер",
      rating: 5
    },
    {
      quote: "Аналитика невероятная. Я наконец понимаю, куда уходят мои деньги каждый месяц.",
      author: "Майк Родригес",
      role: "Фриланс-дизайнер",
      rating: 5
    },
    {
      quote: "Простой, чистый интерфейс и мощные возможности. Лучший менеджер подписок, которым я пользовался.",
      author: "Эмма Томпсон",
      role: "Продакт-менеджер",
      rating: 5
    }
  ];

  const trustIndicators = [
    {
      icon: Users,
      title: "15,000+ Пользователей",
      description: "Присоединяйтесь к тысячам довольных клиентов"
    },
    {
      icon: Shield,
      title: "Защита Банковского Уровня",
      description: "Ваши данные зашифрованы и в безопасности"
    },
    {
      icon: Zap,
      title: "Молниеносная Скорость",
      description: "Синхронизация в реальном времени на всех устройствах"
    },
    {
      icon: Heart,
      title: "Любовь Клиентов",
      description: "Рейтинг 4.9/5 звёзд от пользователей"
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
            Не просто трекер подписок — мы ваш персональный финансовый помощник 
            для экономики подписок.
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

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Что говорят наши пользователи
            </h3>
            <p className="text-lg text-gray-600">
              Реальные отзывы от реальных пользователей, которые преобразили своё управление подписками
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Начните свой путь к финансовой свободе
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Присоединяйтесь к тысячам пользователей, которые уже взяли под контроль свои подписки. 
              Создайте бесплатную учётную запись сегодня и увидьте разницу всего за несколько минут.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Бесплатно навсегда</div>
                <div className="text-sm text-gray-400">Кредитная карта не нужна</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">2 Минуты</div>
                <div className="text-sm text-gray-400">Быстрая настройка</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Мгновенная Польза</div>
                <div className="text-sm text-gray-400">Результат сразу</div>
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
              <span>Ваши данные в безопасности и конфиденциальны. Мы никогда не делимся вашей информацией.</span>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-20 text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Вопросы? У нас есть ответы
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Действительно ли Трекер Подписок бесплатный?</h5>
              <p className="text-sm text-gray-600">
                Да! Наши основные функции полностью бесплатны. Никаких скрытых платежей, кредитная карта не нужна.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Насколько безопасны мои данные?</h5>
              <p className="text-sm text-gray-600">
                Мы используем шифрование банковского уровня и никогда не храним данные ваших платежей. Ваша конфиденциальность — наш приоритет.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Могу ли я экспортировать свои данные?</h5>
              <p className="text-sm text-gray-600">
                Конечно! Экспортируйте данные о подписках в любое время в формате CSV или PDF.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Как работает автоматическое отслеживание?</h5>
              <p className="text-sm text-gray-600">
                Просто добавьте свои подписки вручную — мы не подключаемся к вашему банковскому счёту для безопасности.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;