import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

let supabase: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  Supabase credentials not configured. Database features will be limited.');
} else {
    supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };
