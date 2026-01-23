import { createClient } from '@supabase/supabase-js'

// Замените эти значения на ваши реальные ключи Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Проверка наличия ключей
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase keys are missing. Form submissions will not work.')
  console.warn('Please check your environment variables:')
  console.warn('- VITE_SUPABASE_URL')
  console.warn('- VITE_SUPABASE_ANON_KEY')
}

// Создаем клиент Supabase (даже если ключи пустые, чтобы избежать ошибок)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)
