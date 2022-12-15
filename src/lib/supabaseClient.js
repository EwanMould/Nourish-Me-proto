import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://zpsdsoulwlkvrrgpdlzu.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwc2Rzb3Vsd2xrdnJyZ3BkbHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA3Nzc1MjUsImV4cCI6MTk3NjM1MzUyNX0.Qk7JH1wGk0efYEv1OeILvCZIHHIYsL6RDqgPv1MtQT8')
