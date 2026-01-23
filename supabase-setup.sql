-- Создание таблицы для заявок
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

-- Включение Row Level Security (опционально, для безопасности)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Удаление политики, если она существует, перед созданием новой
DROP POLICY IF EXISTS "Allow public insert" ON applications;

-- Политика: разрешить вставку данных всем (для формы)
CREATE POLICY "Allow public insert" ON applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Политика: разрешить чтение только аутентифицированным пользователям (если нужно)
-- Раскомментируйте, если нужен доступ к чтению для аутентифицированных пользователей
-- DROP POLICY IF EXISTS "Allow authenticated read" ON applications;
-- CREATE POLICY "Allow authenticated read" ON applications
--   FOR SELECT
--   TO authenticated
--   USING (true);
