import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getEnv } from '@/shared/config/env'

let client: SupabaseClient | undefined

/** Single shared Supabase browser client (anon key + RLS). */
export function getSupabase(): SupabaseClient {
  if (!client) {
    const env = getEnv()
    client = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }
  return client
}
