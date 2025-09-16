export default {
  // Navigation & Layout
  nav: {
    dashboard: 'Панель управления',
    subscriptions: 'Подписки',
    settings: 'Настройки'
  },
  
  // Common UI Elements
  common: {
    save: 'Сохранить',
    cancel: 'Отменить',
    delete: 'Удалить',
    edit: 'Редактировать',
    add: 'Добавить',
    search: 'Поиск',
    filter: 'Фильтр',
    loading: 'Загрузка...',
    loadingPage: 'Загрузка страницы...',
    loadingContent: 'Загрузка контента...',
    close: 'Закрыть',
    confirm: 'Подтвердить',
    back: 'Назад',
    next: 'Далее',
    previous: 'Предыдущий',
    apply: 'Применить',
    reset: 'Сбросить',
    clear: 'Очистить',
    selectAll: 'Выбрать все',
    viewAll: 'Смотреть все',
    tryAgain: 'Попробовать снова',
    refreshPage: 'Обновить страницу',
    dateAdded: 'Дата добавления'
  },
  
  // Subscription Management
  subscriptions: {
    title: 'Подписки',
    subtitle: 'Отслеживайте свои подписки и расходы',
    addNew: 'Добавить подписку',
    editSubscription: 'Редактировать подписку',
    name: 'Название',
    description: 'Описание',
    amount: 'Сумма',
    category: 'Категория',
    billingCycle: 'Период оплаты',
    nextPayment: 'Следующий платеж',
    website: 'Веб-сайт',
    active: 'Активна',
    inactive: 'Неактивна',
    deleteConfirm: 'Вы уверены, что хотите удалить эту подписку?',
    deleteConfirmText: 'Это действие нельзя отменить.',
    deleteSubscription: 'Удалить подписку',
    noSubscriptions: 'Подписок не найдено',
    noSubscriptionsText: 'Добавьте свою первую подписку',
    status: 'Статус',
    currency: 'Валюта',
    per: 'за',
    perMonth: 'в месяц',
    visitWebsite: 'Перейти на сайт',
    deactivate: 'Деактивировать',
    activate: 'Активировать',
    namePlaceholder: 'например, Netflix, Spotify',
    descriptionPlaceholder: 'Необязательное описание',
    updateSubscription: 'Обновить подписку',
    addSubscription: 'Добавить подписку',
    updating: 'Обновление...',
    adding: 'Добавление...'
  },
  
  // Categories & Billing Cycles
  categories: {
    entertainment: 'Развлечения',
    utilities: 'Коммунальные услуги',
    software: 'Программное обеспечение',
    food: 'Еда и напитки',
    health: 'Здоровье и фитнес',
    education: 'Образование',
    news: 'Новости и медиа',
    productivity: 'Продуктивность',
    other: 'Прочее'
  },
  
  billingCycles: {
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно',
    quarterly: 'Ежеквартально',
    yearly: 'Ежегодно'
  },
  
  // Dashboard & Analytics
  dashboard: {
    title: 'Подписки',
    subtitle: 'Отслеживайте свои подписки и расходы',
    monthlySpending: 'Ежемесячно',
    yearlySpending: 'в год',
    activeSubscriptions: 'Активные подписки',
    upcomingPayments: 'Ближайшие платежи',
    upcomingPaymentsNext30: 'Следующие 30 дней',
    upcomingPaymentsText: 'предстоящих платежей',
    noPayments: 'Нет платежей на ближайшую неделю',
    noSubscriptions: 'Подписок не найдено',
    noSubscriptionsText: 'Добавьте свою первую подписку',
    totalMonthly: 'Общие ежемесячные расходы',
    totalYearly: 'Общие годовые расходы',
    thisMonth: 'В этом месяце',
    nextWeek: 'На следующей неделе'
  },
  
  // Authentication
  auth: {
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    email: 'Email',
    password: 'Пароль',
    createAccount: 'Создать аккаунт',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    noAccount: 'Нет аккаунта?',
    signingIn: 'Вход...',
    signingUp: 'Регистрация...',
    forgotPassword: 'Забыли пароль?',
    resetPassword: 'Сбросить пароль',
    loginError: 'Ошибка входа',
    signupError: 'Ошибка регистрации',
    invalidCredentials: 'Неверные учетные данные',
    emailRequired: 'Email обязателен',
    passwordRequired: 'Пароль обязателен',
    passwordMinLength: 'Пароль должен содержать минимум 6 символов',
    appTitle: 'Трекер Подписок',
    emailPlaceholder: 'Введите адрес электронной почты',
    passwordPlaceholderSignUp: 'Создайте пароль',
    passwordPlaceholderSignIn: 'Введите пароль',
    confirmationEmail: 'Проверьте электронную почту для ссылки подтверждения!',
    signingOut: 'Выход...'
  },
  
  // Settings
  settings: {
    title: 'Настройки',
    language: 'Язык',
    languageDescription: 'Выберите язык интерфейса',
    dataManagement: 'Управление данными',
    exportData: 'Экспорт данных',
    exportDescription: 'Экспортировать все ваши данные подписок',
    deleteAllData: 'Удалить все данные',
    deleteDescription: 'Удалить все подписки и сбросить приложение',
    deleteConfirm: 'Вы уверены, что хотите удалить все данные?',
    deleteConfirmText: 'Это действие нельзя отменить. Все ваши подписки будут удалены навсегда.',
    account: 'Аккаунт',
    signOut: 'Выйти',
    preferences: 'Предпочтения',
    appearance: 'Внешний вид',
    notifications: 'Уведомления',
    helpSupport: 'Помощь и поддержка',
    gettingStarted: 'Начало работы',
    gettingStartedDesc: 'Добавьте первую подписку, нажав кнопку «Добавить подписку».',
    categories: 'Категории',
    categoriesDesc: 'Организуйте подписки по категориям, таким как Развлечения, Программное обеспечение, Коммунальные услуги и т.д.',
    analytics: 'Аналитика',
    analyticsDesc: 'Просматривайте аналитику расходов и отслеживайте стоимость подписок во времени.',
    privacy: 'Конфиденциальность данных',
    privacyDesc: 'Все данные хранятся локально в вашем браузере. Никакая информация не отправляется на внешние серверы.',
    signingOut: 'Выход...'
  },
  
  // Error Messages
  errors: {
    generic: 'Произошла ошибка. Попробуйте еще раз.',
    networkError: 'Ошибка сети. Проверьте подключение к интернету.',
    notFound: 'Страница не найдена',
    unauthorized: 'Доступ запрещен',
    validationError: 'Проверьте правильность введенных данных',
    loadingError: 'Ошибка загрузки данных',
    details: 'Детали ошибки (Только для разработки)',
    error: 'Ошибка:',
    componentStack: 'Стек компонентов:'
  },
  
  // Success Messages
  success: {
    saved: 'Успешно сохранено',
    deleted: 'Успешно удалено',
    updated: 'Успешно обновлено',
    created: 'Успешно создано'
  },
  
  // Form Validation
  validation: {
    required: 'Это поле обязательно',
    invalidEmail: 'Неверный формат email',
    minLength: 'Минимум {{count}} символов',
    maxLength: 'Максимум {{count}} символов',
    invalidUrl: 'Неверный формат URL',
    invalidAmount: 'Неверная сумма',
    positiveNumber: 'Значение должно быть положительным'
  },
  
  // Landing Page
  landing: {
    brandName: 'Трекер Подписок',
    nav: {
      features: 'Функции',
      howItWorks: 'Как это работает',
      about: 'О проекте',
      startFree: 'Начать бесплатно'
    },
    footer: {
      description: 'Простое отслеживание ваших подписок с облачным хранением данных.',
      product: 'Продукт',
      githubCta: 'Весь код на GitHub',
      copyright: '© {{year}} {{appName}}. Все права защищены.'
    },
    title: 'Управление подписками стало простым',
    subtitle: 'Отслеживайте все ваши подписки в одном месте',
    getStarted: 'Начать',
    signIn: 'Войти',
    features: {
      tracking: {
        title: 'Отслеживание подписок',
        description: 'Следите за всеми вашими подписками в одном месте'
      },
      analytics: {
        title: 'Аналитика расходов',
        description: 'Получайте подробную аналитику ваших трат'
      },
      notifications: {
        title: 'Уведомления',
        description: 'Получайте напоминания о предстоящих платежах'
      }
    }
  }
};