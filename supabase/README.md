# Supabase Setup Instructions

This document provides step-by-step instructions for setting up Supabase for the Subscription Tracker application.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project

## Setup Steps

### 1. Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Select your organization
4. Enter project details:
   - Name: `subscription-tracker`
   - Database Password: (generate a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

### 2. Get Project Configuration

1. In your Supabase dashboard, go to "Settings" > "API"
2. Copy the following values:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Run Database Migrations

1. In your Supabase dashboard, go to the "SQL Editor"
2. Run the migration files in order:

#### Step 4.1: Initial Schema
Copy and paste the contents of `migrations/001_initial_schema.sql` into the SQL Editor and click "Run".

This will create:
- `profiles` table for user profile information
- `subscriptions` table for subscription data
- Indexes for query optimization
- Helper functions for statistics and upcoming payments
- Automatic triggers for timestamp updates

#### Step 4.2: Row Level Security
Copy and paste the contents of `migrations/002_rls_policies.sql` into the SQL Editor and click "Run".

This will create:
- RLS policies to ensure data isolation between users
- Secure functions that respect user authentication
- Analytics view with proper security

### 5. Configure Authentication

1. In your Supabase dashboard, go to "Authentication" > "Settings"
2. Configure the following settings:

#### Email Authentication
- Enable "Enable email confirmations" if you want users to verify their email
- Set "Site URL" to your app's URL (e.g., `http://localhost:5173` for development)

#### OAuth Providers (Optional)
If you want to enable social login:

1. Go to "Authentication" > "Providers"
2. Enable desired providers (Google, GitHub, etc.)
3. Configure each provider with their respective client IDs and secrets

#### URL Configuration
- Set "Site URL" to your application URL
- Add redirect URLs if needed

### 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173`
3. You should be redirected to the authentication page
4. Try signing up with a new account
5. Verify that you can create, view, edit, and delete subscriptions

## Database Schema Overview

### Tables

#### `profiles`
- User profile information
- Automatically created when a user signs up
- Stores email, full name, avatar URL, and preferences

#### `subscriptions`
- User subscription data
- Linked to users via `user_id`
- Contains all subscription details (name, amount, billing cycle, etc.)

### Security

- **Row Level Security (RLS)** is enabled on all tables
- Users can only access their own data
- All policies are based on `auth.uid()` which returns the current authenticated user's ID

### Helper Functions

- `get_user_subscription_stats_secure()`: Returns subscription statistics for the current user
- `get_upcoming_payments_secure(days_ahead)`: Returns upcoming payments for the current user

## Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure `.env` file is in the project root
   - Restart the development server after changing environment variables
   - Check that variable names start with `VITE_`

2. **Authentication not working**
   - Verify Supabase URL and anon key are correct
   - Check that the site URL is configured in Supabase
   - Ensure RLS policies are properly set up

3. **Database errors**
   - Verify migrations were run successfully
   - Check the Supabase logs in the dashboard
   - Ensure user has proper permissions

4. **Real-time not working**
   - Real-time is enabled by default in the Supabase client configuration
   - Check that your Supabase plan supports real-time features

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Visit the [Supabase Community](https://github.com/supabase/supabase/discussions)
- Check the browser console for error messages

## Development vs Production

### Development
- Use the configuration from your Supabase dashboard
- Site URL: `http://localhost:5173`

### Production
- Create a separate Supabase project for production (recommended)
- Update environment variables for production deployment
- Configure proper site URL for your deployed application
- Review and adjust RLS policies if needed
- Set up proper backup and monitoring