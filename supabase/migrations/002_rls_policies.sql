-- Row Level Security Policies for Subscription Tracker
-- These policies ensure users can only access their own data

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on subscriptions table  
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile (handled by trigger, but needed for manual inserts)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can delete their own profile
CREATE POLICY "Users can delete own profile" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- Subscriptions table policies
-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own subscriptions
CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscriptions
CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own subscriptions
CREATE POLICY "Users can delete own subscriptions" ON subscriptions
  FOR DELETE USING (auth.uid() = user_id);

-- Create a policy for the get_user_subscription_stats function
-- This allows users to call the function only for their own data
CREATE OR REPLACE FUNCTION get_user_subscription_stats_secure()
RETURNS TABLE (
  total_subscriptions BIGINT,
  active_subscriptions BIGINT,
  total_monthly_cost DECIMAL,
  total_yearly_cost DECIMAL,
  categories_count BIGINT
) AS $$
BEGIN
  -- Only allow users to get stats for their own data
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  RETURN QUERY
  SELECT * FROM get_user_subscription_stats(auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a secure version of get_upcoming_payments function
CREATE OR REPLACE FUNCTION get_upcoming_payments_secure(days_ahead INTEGER DEFAULT 30)
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
  -- Only allow users to get payments for their own data
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  RETURN QUERY
  SELECT * FROM get_upcoming_payments(auth.uid(), days_ahead);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON subscriptions TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_subscription_stats_secure() TO authenticated;
GRANT EXECUTE ON FUNCTION get_upcoming_payments_secure(INTEGER) TO authenticated;

-- Create a view for subscription analytics
CREATE OR REPLACE VIEW user_subscription_analytics AS
SELECT 
  user_id,
  category,
  COUNT(*) as subscription_count,
  SUM(
    CASE 
      WHEN billing_cycle = 'weekly' AND is_active = true THEN amount * 4.33
      WHEN billing_cycle = 'monthly' AND is_active = true THEN amount
      WHEN billing_cycle = 'yearly' AND is_active = true THEN amount / 12
      ELSE 0
    END
  ) as monthly_cost,
  AVG(
    CASE 
      WHEN billing_cycle = 'weekly' AND is_active = true THEN amount * 4.33
      WHEN billing_cycle = 'monthly' AND is_active = true THEN amount
      WHEN billing_cycle = 'yearly' AND is_active = true THEN amount / 12
      ELSE 0
    END
  ) as avg_monthly_cost
FROM subscriptions
WHERE is_active = true
GROUP BY user_id, category;

-- Enable RLS on the view
ALTER VIEW user_subscription_analytics SET (security_barrier = true);

-- Create policy for the analytics view
CREATE POLICY "Users can view own analytics" ON user_subscription_analytics
  FOR SELECT USING (auth.uid() = user_id);

-- Grant access to the view
GRANT SELECT ON user_subscription_analytics TO authenticated;