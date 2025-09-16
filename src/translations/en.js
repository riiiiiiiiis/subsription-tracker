export default {
  // Navigation & Layout
  nav: {
    dashboard: 'Dashboard',
    subscriptions: 'Subscriptions',
    settings: 'Settings'
  },
  
  // Common UI Elements
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
    loadingPage: 'Loading page...',
    loadingContent: 'Loading content...',
    close: 'Close',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    apply: 'Apply',
    reset: 'Reset',
    clear: 'Clear',
    selectAll: 'Select All',
    viewAll: 'View All',
    tryAgain: 'Try Again',
    refreshPage: 'Refresh Page',
    dateAdded: 'Date Added'
  },
  
  // Subscription Management
  subscriptions: {
    title: 'Subscriptions',
    subtitle: 'Track your subscriptions and expenses',
    addNew: 'Add Subscription',
    editSubscription: 'Edit Subscription',
    name: 'Name',
    description: 'Description',
    amount: 'Amount',
    category: 'Category',
    billingCycle: 'Billing Cycle',
    nextPayment: 'Next Payment',
    website: 'Website',
    active: 'Active',
    inactive: 'Inactive',
    deleteConfirm: 'Are you sure you want to delete this subscription?',
    deleteConfirmText: 'This action cannot be undone.',
    deleteSubscription: 'Delete Subscription',
    noSubscriptions: 'No subscriptions found',
    noSubscriptionsText: 'Add your first subscription',
    status: 'Status',
    currency: 'Currency',
    per: 'per',
    perMonth: 'per month',
    visitWebsite: 'Visit website',
    deactivate: 'Deactivate',
    activate: 'Activate',
    namePlaceholder: 'e.g., Netflix, Spotify',
    descriptionPlaceholder: 'Optional description',
    updateSubscription: 'Update Subscription',
    addSubscription: 'Add Subscription',
    updating: 'Updating...',
    adding: 'Adding...'
  },
  
  // Categories & Billing Cycles
  categories: {
    entertainment: 'Entertainment',
    utilities: 'Utilities',
    software: 'Software',
    food: 'Food & Drinks',
    health: 'Health & Fitness',
    education: 'Education',
    news: 'News & Media',
    productivity: 'Productivity',
    other: 'Other'
  },
  
  billingCycles: {
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly'
  },
  
  // Dashboard & Analytics
  dashboard: {
    title: 'Subscriptions',
    subtitle: 'Track your subscriptions and expenses',
    monthlySpending: 'Monthly',
    yearlySpending: 'per year',
    activeSubscriptions: 'Active subscriptions',
    upcomingPayments: 'Upcoming payments',
    upcomingPaymentsNext30: 'Next 30 days',
    upcomingPaymentsText: 'upcoming payments',
    noPayments: 'No payments in the next week',
    noSubscriptions: 'No subscriptions found',
    noSubscriptionsText: 'Add your first subscription',
    totalMonthly: 'Total monthly spending',
    totalYearly: 'Total yearly spending',
    thisMonth: 'This month',
    nextWeek: 'Next week'
  },
  
  // Authentication
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    signingIn: 'Signing in...',
    signingUp: 'Signing up...',
    forgotPassword: 'Forgot password?',
    resetPassword: 'Reset Password',
    loginError: 'Login Error',
    signupError: 'Signup Error',
    invalidCredentials: 'Invalid credentials',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 6 characters',
    appTitle: 'Subscription Tracker',
    emailPlaceholder: 'Enter your email address',
    passwordPlaceholderSignUp: 'Create a password',
    passwordPlaceholderSignIn: 'Enter your password',
    confirmationEmail: 'Check your email for the confirmation link!',
    signingOut: 'Signing out...'
  },
  
  // Settings
  settings: {
    title: 'Settings',
    language: 'Language',
    languageDescription: 'Choose your interface language',
    dataManagement: 'Data Management',
    exportData: 'Export Data',
    exportDescription: 'Export all your subscription data',
    deleteAllData: 'Delete All Data',
    deleteDescription: 'Delete all subscriptions and reset the app',
    deleteConfirm: 'Are you sure you want to delete all data?',
    deleteConfirmText: 'This action cannot be undone. All your subscriptions will be permanently deleted.',
    account: 'Account',
    signOut: 'Sign Out',
    preferences: 'Preferences',
    appearance: 'Appearance',
    notifications: 'Notifications',
    helpSupport: 'Help & Support',
    gettingStarted: 'Getting Started',
    gettingStartedDesc: 'Add your first subscription by clicking the "Add Subscription" button.',
    categories: 'Categories',
    categoriesDesc: 'Organize subscriptions by categories such as Entertainment, Software, Utilities, etc.',
    analytics: 'Analytics',
    analyticsDesc: 'View spending analytics and track subscription costs over time.',
    privacy: 'Data Privacy',
    privacyDesc: 'All data is stored locally in your browser. No information is sent to external servers.',
    signingOut: 'Signing out...'
  },
  
  // Error Messages
  errors: {
    generic: 'An error occurred. Please try again.',
    networkError: 'Network error. Please check your internet connection.',
    notFound: 'Page not found',
    unauthorized: 'Access denied',
    validationError: 'Please check the entered data',
    loadingError: 'Error loading data',
    details: 'Error Details (Development Only)',
    error: 'Error:',
    componentStack: 'Component Stack:'
  },
  
  // Success Messages
  success: {
    saved: 'Successfully saved',
    deleted: 'Successfully deleted',
    updated: 'Successfully updated',
    created: 'Successfully created'
  },
  
  // Form Validation
  validation: {
    required: 'This field is required',
    invalidEmail: 'Invalid email format',
    minLength: 'Minimum {{count}} characters',
    maxLength: 'Maximum {{count}} characters',
    invalidUrl: 'Invalid URL format',
    invalidAmount: 'Invalid amount',
    positiveNumber: 'Value must be positive'
  },
  
  // Landing Page
  landing: {
    brandName: 'Subscription Tracker',
    nav: {
      features: 'Features',
      howItWorks: 'How it works',
      about: 'About',
      startFree: 'Start for free'
    },
    footer: {
      description: 'Simple subscription tracking with cloud data storage.',
      product: 'Product',
      githubCta: 'View code on GitHub',
      copyright: '© {{year}} {{appName}}. All rights reserved.'
    },
    title: 'Subscription management made simple',
    subtitle: 'Track all your subscriptions in one place',
    getStarted: 'Get Started',
    signIn: 'Sign In',
    features: {
      tracking: {
        title: 'Subscription Tracking',
        description: 'Keep track of all your subscriptions in one place'
      },
      analytics: {
        title: 'Spending Analytics',
        description: 'Get detailed analytics of your spending'
      },
      notifications: {
        title: 'Notifications',
        description: 'Get reminders about upcoming payments'
      }
    }
  }
};