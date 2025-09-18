import React from 'react';
import Button from '../ui/Button.jsx';
import { ArrowRight, CreditCard, BarChart3, Smartphone } from 'lucide-react';

const HeroSection = ({ onGetStarted }) => {
  const stats = [
    { value: '2 минуты', label: 'до начала учёта' },
    { value: '$156/мес', label: 'средний контроль расходов' },
    { value: '100%', label: 'прозрачность и приватность' }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 sm:py-28 lg:py-32">
      <div className="absolute inset-x-0 top-0 flex justify-center">
        <div className="h-64 w-[32rem] rounded-full bg-primary-500/20 blur-[120px]"></div>
      </div>
      <div className="absolute -bottom-40 -left-20 hidden h-80 w-80 rounded-full bg-blue-500/20 blur-3xl lg:block"></div>
      <div className="absolute -top-10 -right-20 hidden h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl lg:block"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Контроль подписок без лишнего шума
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Отслеживайте расходы
              <span className="block bg-gradient-to-r from-primary-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                и оставайтесь в курсе
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Соберите все подписки и регулярные платежи в одной панели. Добавляйте сервисы вручную,
              анализируйте ежемесячные траты и получайте напоминания о предстоящих списаниях.
            </p>

            {/* Key Benefits */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                <CreditCard className="h-5 w-5 text-primary-300" />
                <p className="mt-3 text-sm text-slate-200">Ручное добавление подписок с любыми параметрами</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                <BarChart3 className="h-5 w-5 text-blue-300" />
                <p className="mt-3 text-sm text-slate-200">Аналитика расходов и прогнозы на месяц/год</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                <Smartphone className="h-5 w-5 text-fuchsia-300" />
                <p className="mt-3 text-sm text-slate-200">Синхронизация данных между устройствами</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                onClick={onGetStarted}
                variant="primary"
                size="lg"
                className="shadow-lg shadow-primary-500/30"
              >
                Начать бесплатно
              </Button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-base font-medium text-slate-100 transition-colors hover:border-white hover:bg-white/10"
              >
                Узнать больше
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-left"
                >
                  <div className="text-xl font-semibold text-white sm:text-2xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Demo */}
          <div className="relative">
            <div className="absolute -top-6 left-1/2 hidden h-24 w-24 -translate-x-1/2 rounded-full bg-primary-500/20 blur-2xl md:block"></div>
            <div className="relative mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-blue-500/20 backdrop-blur">
              {/* Mock App Interface */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">Месячный обзор</h3>
                  <span className="text-sm text-slate-400">Январь 2024</span>
                </div>

                {/* Total Spending */}
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Общие расходы</span>
                    <span className="text-2xl font-semibold text-white">$156.47</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary-400 to-blue-500"></div>
                  </div>
                </div>

                {/* Sample Subscriptions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                    <div className="flex items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/90 text-sm font-semibold text-white">
                        N
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">Netflix</p>
                        <p className="text-xs text-slate-400">Развлечения</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white">$15.99</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                    <div className="flex items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/90 text-sm font-semibold text-white">
                        S
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">Spotify</p>
                        <p className="text-xs text-slate-400">Музыка</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white">$9.99</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                    <div className="flex items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/90 text-sm font-semibold text-white">
                        D
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">Dropbox</p>
                        <p className="text-xs text-slate-400">Облачное хранилище</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white">$11.99</span>
                  </div>
                </div>

                <Button variant="primary" size="sm" className="w-full shadow-lg shadow-primary-500/30">
                  Добавить подписку
                </Button>
              </div>
            </div>

            {/* Simple Info Cards */}
            <div className="absolute -top-6 -right-6 hidden rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur lg:block">
              <div className="flex items-center space-x-2 text-xs font-medium text-white">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span>Простое добавление</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur lg:block">
              <div className="text-xl font-semibold text-primary-200">$156</div>
              <div className="text-xs text-slate-300">Всего за месяц</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;