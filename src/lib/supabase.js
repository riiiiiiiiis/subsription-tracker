import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing env.VITE_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing env.VITE_SUPABASE_ANON_KEY');
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable auto refresh of auth tokens
    autoRefreshToken: true,
    // Persist auth session in localStorage 
    persistSession: true,
    // Detect session from URL on redirect
    detectSessionInUrl: true,
  },
  // Enable real-time features
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});



export default supabase;