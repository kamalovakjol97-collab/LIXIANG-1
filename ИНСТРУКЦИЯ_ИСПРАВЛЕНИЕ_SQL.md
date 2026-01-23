# Инструкция по исправлению ошибки SQL в Supabase

## Проблема
Ошибка: `ERROR: 42710: policy "Allow public insert" for table "applications" already exists`

Эта ошибка возникает, когда SQL-скрипт пытается создать политику, которая уже существует в базе данных.

## Решение

### Вариант 1: Использовать исправленный SQL-скрипт

1. Откройте Supabase Dashboard
2. Перейдите в **SQL Editor**
3. Выполните следующий SQL-код:

```sql
-- Удаление существующей политики (если есть)
DROP POLICY IF EXISTS "Allow public insert" ON applications;

-- Создание политики заново
CREATE POLICY "Allow public insert" ON applications
  FOR INSERT
  TO public
  WITH CHECK (true);
```

### Вариант 2: Использовать полный исправленный скрипт

Используйте файл `supabase-setup-fix.sql`, который уже содержит исправления.

1. Откройте Supabase Dashboard
2. Перейдите в **SQL Editor**
3. Скопируйте содержимое файла `supabase-setup-fix.sql`
4. Вставьте в SQL Editor
5. Нажмите **Run**

### Вариант 3: Удалить политику вручную через интерфейс

1. Откройте Supabase Dashboard
2. Перейдите в **Authentication** → **Policies**
3. Найдите таблицу `applications`
4. Найдите политику "Allow public insert"
5. Удалите её
6. Затем выполните SQL-скрипт заново

## Проверка

После исправления проверьте:

1. Таблица `applications` существует
2. Политика "Allow public insert" существует и активна
3. Форма на сайте работает корректно

## Если сайт всё ещё показывает пустую страницу

1. Проверьте переменные окружения в Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. Проверьте консоль браузера на наличие ошибок JavaScript

3. Убедитесь, что сборка прошла успешно (проверьте логи деплоя в Netlify)
