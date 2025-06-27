import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          source_url: string | null
          user_id: string
          content: Json
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          source_url?: string | null
          user_id: string
          content: Json
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          source_url?: string | null
          user_id?: string
          content?: Json
        }
      }
    }
  }
} 