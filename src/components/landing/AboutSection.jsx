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
      title: 'Простое использование',
      description: 'Настройка за несколько минут'
    },
    {
      icon: Shield,
      title: 'Облачное хранение',
      description: 'Безопасное хранение в Supabase'
    },
    {
      icon: Zap,
      title: 'Аутентификация',
      description: 'Надёжная система входа и регистрации'
    },
    {
      icon: Heart,
      title: 'Открытый код',
      description: 'Полная прозрачность работы приложения'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Добавьте подписки',
      description: 'Вручную введите названия, стоимость и периодичность платежей'
    },
    {
      step: '2',
      title: 'Организуйте данные',
      description: 'Распределите по категориям, задайте напоминания и фильтры'
    },
    {
      step: '3',
      title: 'Отслеживайте расходы',
      description: 'Смотрите аналитику и контролируйте бюджет в одном месте'
    }
  ];

  const faqItems = [
    {
      question: 'Нужна ли регистрация для использования?',
      answer:
        'Да, нужно создать аккаунт с email и паролем. Это необходимо для безопасного хранения ваших данных.'
    },
    {
      question: 'Где хранятся мои данные?',
      answer:
        'Все данные хранятся в облаке Supabase с автоматической синхронизацией между устройствами.'
    },
    {
      question: 'Какая аналитика доступна?',
      answer:
        'Месячные и годовые суммы, количество активных подписок, предстоящие платежи и базовая категоризация.'
    },
    {
      question: 'Как работает защита данных?',
      answer:
        'Используется Row Level Security (RLS) в Supabase, которая гарантирует, что каждый пользователь видит только свои данные.'
    }
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute -top-20 left-0 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Benefits Section */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Почему именно мы
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Прозрачный контроль подписок без лишних интеграций
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
            Простой и честный способ отслеживания расходов: вручную добавляйте сервисы, планируйте платежи
            и управляйте данными в защищённом пространстве Supabase.
          </p>

          {/* Benefits Grid */}
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200"
              >
                <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-emerald-300" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustIndicators.map((indicator) => {
              const Icon = indicator.icon;
              return (
                <div
                  key={indicator.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-primary-500/5"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-400/30 to-blue-500/30 text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{indicator.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{indicator.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process */}
        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Как это работает</h3>
            <p className="mt-3 text-lg text-slate-300">
              Простой трёхэтапный процесс для начала отслеживания ваших подписок
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-400/30 to-blue-500/30 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h4 className="mt-6 text-lg font-semibold text-white">{item.title}</h4>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center text-white shadow-2xl shadow-primary-500/10">
          <div className="absolute -left-12 top-0 h-52 w-52 rounded-full bg-primary-500/20 blur-3xl"></div>
          <div className="absolute -right-12 bottom-0 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="relative mx-auto max-w-3xl">
            <Award className="mx-auto mb-6 h-16 w-16 text-amber-300" />
            <h3 className="text-3xl font-semibold sm:text-4xl">
              Начните отслеживание подписок сегодня
            </h3>
            <p className="mt-4 text-xl text-slate-200">
              Простой способ взять под контроль свои регулярные расходы и избавиться от неожиданных списаний.
            </p>

            {/* Value Props */}
            <div className="mt-8 grid grid-cols-1 gap-6 text-sm text-slate-200 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">Облачное хранение</div>
                <div className="mt-1 text-xs text-slate-300">Ваши данные в безопасности</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">2 минуты</div>
                <div className="mt-1 text-xs text-slate-300">Простая регистрация</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">Полный контроль</div>
                <div className="mt-1 text-xs text-slate-300">Никаких скрытых функций</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                onClick={onGetStarted}
                variant="primary"
                size="lg"
                className="shadow-lg shadow-primary-500/30"
              >
                Начать бесплатно
              </Button>
              <button
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              >
                Узнать больше
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-8 flex items-center justify-center text-sm text-slate-300">
              <Shield className="mr-2 h-4 w-4" />
              <span>Облачное хранение с Row Level Security. Надёжная аутентификация через Supabase.</span>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-24 text-center">
          <h4 className="text-lg font-semibold text-white">Частые вопросы</h4>
          <div className="mt-8 grid grid-cols-1 gap-6 text-left text-sm text-slate-300 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h5 className="text-base font-medium text-white">{item.question}</h5>
                <p className="mt-2 text-sm text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
