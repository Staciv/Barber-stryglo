import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/shared/types/database";

let browserClient: SupabaseClient<Database> | null = null;

function getSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.",
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();
  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

  return browserClient;
}
