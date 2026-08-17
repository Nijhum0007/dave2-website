import { createClient } from '@supabase/supabase-js'

// We use the service role key to bypass RLS for the admins table.
// Ensure SUPABASE_SERVICE_ROLE_KEY is set in .env.local
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'

  return createClient(supabaseUrl, supabaseServiceKey)
}
