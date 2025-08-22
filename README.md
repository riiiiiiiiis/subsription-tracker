# Subscription Tracker

A modern, cloud-based subscription management application built with React, Vite, and Supabase. Track, analyze, and manage all your recurring subscriptions in one place with real-time synchronization across devices.

## Features

- 🔐 **Secure Authentication** - User registration and login with Supabase Auth
- 📊 **Dashboard Analytics** - Comprehensive spending analysis and insights
- 💰 **Subscription Management** - Add, edit, delete, and categorize subscriptions
- 📱 **Real-time Sync** - Changes sync instantly across all devices
- 🏷️ **Smart Categorization** - Organize subscriptions by type (entertainment, utilities, etc.)
- 📅 **Payment Tracking** - Never miss a payment with upcoming payment alerts
- 💹 **Financial Insights** - Monthly/yearly spending breakdowns and trends
- 🔒 **Data Privacy** - Your data is isolated and secure with Row Level Security
- 📈 **Visual Analytics** - Charts and graphs for spending patterns
- 🌐 **Cross-platform** - Works on desktop, tablet, and mobile

## Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI Components**: Custom components with Lucide React icons
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns
- **Routing**: React Router DOM

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd subscription-tracker
npm install
```

### 2. Set Up Supabase

1. Create a new project at [Supabase](https://supabase.com)
2. Go to **Settings > API** in your Supabase dashboard
3. Copy your **Project URL** and **Anon public key**

### 3. Configure Environment Variables

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Run the migration files in order:
   - Copy and run `supabase/migrations/001_initial_schema.sql`
   - Copy and run `supabase/migrations/002_rls_policies.sql`

For detailed database setup instructions, see [`supabase/README.md`](./supabase/README.md)

### 5. Start Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## Usage

### First Time Setup

1. **Sign Up**: Create a new account or sign in with existing credentials
2. **Add Subscriptions**: Click "Add Subscription" to add your first subscription
3. **Explore Dashboard**: View your spending analytics and upcoming payments
4. **Customize**: Set up categories and manage your subscription data

### Key Features

#### Dashboard
- View total monthly and yearly spending
- See upcoming payments for the next 30 days
- Analyze spending by category with interactive charts
- Quick overview of active vs inactive subscriptions

#### Subscription Management
- **Add New**: Name, amount, billing cycle, category, and payment date
- **Edit Existing**: Update any subscription details
- **Toggle Status**: Activate or deactivate subscriptions
- **Delete**: Remove subscriptions you no longer need

#### Analytics
- Monthly and yearly spending breakdowns
- Category-wise spending analysis
- Payment timeline and trends
- Export capabilities for data portability

## Development

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── pages/              # Application pages
├── services/           # API service layers
├── store/              # Zustand state management
├── utils/              # Utility functions
├── types/              # Type definitions
└── hooks/              # Custom React hooks

supabase/
├── migrations/         # Database migration files
└── README.md          # Supabase setup guide
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Components

- **AuthProvider**: Manages authentication state
- **ProtectedRoute**: Guards authenticated routes
- **SubscriptionStore**: Zustand store with Supabase integration
- **SubscriptionService**: API layer for subscription operations
- **Real-time Updates**: Automatic synchronization across devices

## Deployment

### Production Environment

1. **Create Production Supabase Project**
2. **Update Environment Variables** for your hosting platform
3. **Run Database Migrations** on production database
4. **Build and Deploy**:
   ```bash
   npm run build
   ```

### Recommended Hosting Platforms

- **Vercel** (recommended for React apps)
- **Netlify**
- **AWS Amplify**
- **GitHub Pages**

## Security

- **Row Level Security (RLS)**: Users can only access their own data
- **Authentication Required**: All app features require authentication
- **Environment Variables**: Sensitive keys stored securely
- **HTTPS Only**: All communications encrypted

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## Support

For questions and support:

1. Check the [Supabase setup guide](./supabase/README.md)
2. Review the [issues page](../../issues) for common problems
3. Create a new issue for bugs or feature requests

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Powered by [Supabase](https://supabase.com/) for backend services
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons provided by [Lucide React](https://lucide.dev/)

---

**Start tracking your subscriptions today and take control of your recurring expenses!** 🚀
