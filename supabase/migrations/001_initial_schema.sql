-- Supabase Database Schema for Subscription Tracker
-- This migration creates the necessary tables and functions for the subscription tracker application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for additional user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL CHECK (length(name) > 0),
  description TEXT,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'USD' CHECK (length(currency) = 3),
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('weekly', 'monthly', 'yearly')),
  next_payment_date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('entertainment', 'utilities', 'software', 'food', 'health', 'other')),
  website TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions (user_id);
CREATE INDEX IF NOT EXISTS subscriptions_next_payment_date_idx ON subscriptions (next_payment_date);
CREATE INDEX IF NOT EXISTS subscriptions_category_idx ON subscriptions (category);
CREATE INDEX IF NOT EXISTS subscriptions_is_active_idx ON subscriptions (is_active);
CREATE INDEX IF NOT EXISTS subscriptions_billing_cycle_idx ON subscriptions (billing_cycle);
CREATE INDEX IF NOT EXISTS subscriptions_created_at_idx ON subscriptions (created_at);

-- Create a compound index for user-specific queries
CREATE INDEX IF NOT EXISTS subscriptions_user_active_idx ON subscriptions (user_id, is_active);
CREATE INDEX IF NOT EXISTS subscriptions_user_category_idx ON subscriptions (user_id, category);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at 
    BEFORE UPDATE ON subscriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to get user's subscription statistics
CREATE OR REPLACE FUNCTION get_user_subscription_stats(user_uuid UUID)
RETURNS TABLE (
  total_subscriptions BIGINT,
  active_subscriptions BIGINT,
  total_monthly_cost DECIMAL,
  total_yearly_cost DECIMAL,
  categories_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_subscriptions,
    COUNT(*) FILTER (WHERE is_active = true) as active_subscriptions,
    COALESCE(SUM(
      CASE 
        WHEN billing_cycle = 'weekly' AND is_active = true THEN amount * 4.33
        WHEN billing_cycle = 'monthly' AND is_active = true THEN amount
        WHEN billing_cycle = 'yearly' AND is_active = true THEN amount / 12
        ELSE 0
      END
    ), 0) as total_monthly_cost,
    COALESCE(SUM(
      CASE 
        WHEN billing_cycle = 'weekly' AND is_active = true THEN amount * 52
        WHEN billing_cycle = 'monthly' AND is_active = true THEN amount * 12
        WHEN billing_cycle = 'yearly' AND is_active = true THEN amount
        ELSE 0
      END
    ), 0) as total_yearly_cost,
    COUNT(DISTINCT category) FILTER (WHERE is_active = true) as categories_count
  FROM subscriptions 
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get upcoming payments for a user
CREATE OR REPLACE FUNCTION get_upcoming_payments(user_uuid UUID, days_ahead INTEGER DEFAULT 30)
RETURNS TABLE (
  id UUID,
  name TEXT,
  amount DECIMAL,
  currency TEXT,
  next_payment_date DATE,
  category TEXT,
  days_until_payment INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    s.amount,
    s.currency,
    s.next_payment_date,
    s.category,
    (s.next_payment_date - CURRENT_DATE)::INTEGER as days_until_payment
  FROM subscriptions s
  WHERE s.user_id = user_uuid 
    AND s.is_active = true
    AND s.next_payment_date BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '1 day' * days_ahead)
  ORDER BY s.next_payment_date ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;