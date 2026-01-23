-- Исправленный SQL-скрипт для Supabase
-- Этот скрипт безопасно создает таблицу и политики, даже если они уже существуют

-- Создание таблицы для заявок (если не существует)
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cargo_type TEXT NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  weight_volume TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  inn TEXT NOT NULL,
  company_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индекса для быстрого поиска по дате создания
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

-- Включение Row Level Security
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'applications' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Удаление существующей политики перед созданием новой
DROP POLICY IF EXISTS "Allow public insert" ON applications;

-- Создание политики: разрешить вставку данных всем (для формы)
CREATE POLICY "Allow public insert" ON applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Готово! Таблица и политики настроены корректно.
