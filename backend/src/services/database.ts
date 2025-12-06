import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://tpmpjkfmkdbukusgarkr.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Connected to Supabase');
  }
  return supabaseClient;
}

export async function connectDatabase() {
  try {
    const client = getSupabaseClient();
    // Test connection
    const { data, error } = await client.from('locations').select('count').limit(1);
    if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist (expected on first run)
      console.warn('⚠️  Supabase connection test:', error.message);
    } else {
      console.log('✅ Supabase connection verified');
    }
    return client;
  } catch (error) {
    console.error('❌ Supabase connection error:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  // Supabase client doesn't require explicit disconnection
  console.log('✅ Supabase client ready for reuse');
}
