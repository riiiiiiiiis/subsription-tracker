# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server (Vite) on localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code analysis

### Testing
This project does not have tests configured. Check if tests should be added before making significant changes.

## Architecture Overview

### Technology Stack
- **Frontend**: React 19 with Vite, Tailwind CSS
- **State Management**: Zustand with persistence
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI**: Custom components with Lucide React icons
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM

### Core Architecture Pattern
This is a subscription tracking application with a **unified store architecture**:

1. **Unified Store** (`src/store/unified-store.js`) - Single source of truth combining:
   - Authentication state and session management
   - Subscription data with real-time sync
   - UI state and filters
   - Real-time connections to Supabase

2. **Service Layer** - Clean separation of concerns:
   - `authService.js` - Authentication operations with timeout protection
   - `subscriptionService.js` - CRUD operations with RLS security
   - All services use field mapping for database abstraction

3. **Real-time Synchronization** - User-specific channels:
   - Subscription changes sync automatically across devices
   - Profile updates propagate in real-time
   - Connection status monitoring with reconnection logic

### Authentication Flow
The app uses a unified authentication system:
- Single `UnifiedAuthProvider` component wraps the entire app
- Authentication state handled via `handleAuthStateChange` in unified store
- Session management with automatic token refresh
- Timeout protection for sign-out operations
- User profile loading with error handling

### Data Flow
1. **Initialization**: Store initializes → waits for auth state change → loads user data
2. **Real-time**: Supabase real-time channels update store automatically
3. **CRUD Operations**: Service layer → optimistic updates → real-time confirmation
4. **Filtering**: Local filtering applied to subscriptions in store

## Key Components

### Store Management
- **UnifiedStore** (`src/store/unified-store.js`): Central state management with Zustand
  - Auth state, user profile, subscriptions data
  - Real-time connection management
  - Filtering and analytics calculations
  - Persistence with localStorage

### Authentication
- **UnifiedAuthProvider** (`src/components/auth/UnifiedAuthProvider.jsx`): Single auth provider
- **ProtectedRoute** (`src/components/auth/ProtectedRoute.jsx`): Route protection
- Timeout protection for sign-out operations to prevent hanging

### Services
- **Field Mapping** (`src/utils/fieldMapping.js`): Database field abstraction
- **Supabase Client** (`src/lib/supabase.js`): Configured with environment variables
- Row Level Security (RLS) ensures user data isolation

### UI Components
- Located in `src/components/ui/` - reusable components with Tailwind CSS
- Custom components built without external UI library
- Consistent styling with `clsx` and `tailwind-merge`

## Environment Setup

### Required Environment Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup
Run migrations in order:
1. `supabase/migrations/001_initial_schema.sql` - Tables, indexes, functions
2. `supabase/migrations/002_rls_policies.sql` - Security policies

Detailed setup instructions in `supabase/README.md`

## Development Patterns

### State Updates
- Use unified store methods for data operations
- Real-time updates handled automatically
- Optimistic updates for better UX
- Error handling with user feedback

### Authentication
- Check authentication state via unified store
- Handle loading states during auth transitions
- Use timeout protection for auth operations
- Profile data loaded after authentication

### Real-time Features
- User-specific channels prevent cross-user data leaks
- Connection status monitoring
- Automatic reconnection with attempt limits
- Cleanup on user sign-out

### Error Handling
- Service layer returns `{data, error}` pattern
- Store handles error states
- User-friendly error messages
- Timeout protection for long operations

## File Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # App layout components  
│   └── ui/             # Reusable UI components
├── services/           # API service layer
├── store/              # Zustand state management
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── lib/                # External library configurations
```

## Security Considerations

- Row Level Security (RLS) enabled on all Supabase tables
- User data isolation at database level
- Environment variables for sensitive configuration
- Secure real-time channels with user filtering
- Auth token management handled by Supabase

## Analytics & Features

The app includes comprehensive analytics:
- Monthly/yearly spending calculations
- Category-wise breakdowns
- Upcoming payment tracking
- Real-time data synchronization
- Visual charts with Recharts

Use store getter methods like `getTotalMonthlySpending()`, `getSpendingByCategory()` for analytics data.