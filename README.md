# XGL - Сайт логистической компании

Деловой сайт для ООО ГК ХЖЛ - международная логистика из Китая в Россию.

## Технологии

- React 18
- Vite
- Supabase (для хранения заявок)
- CSS (без фреймворков)

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example` и добавьте ваши ключи Supabase:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Запустите dev-сервер:
```bash
npm run dev
```

## Настройка Supabase

1. Создайте проект в Supabase
2. Создайте таблицу `applications` со следующими полями:
   - `id` (uuid, primary key, auto-generated)
   - `cargo_type` (text)
   - `from_location` (text)
   - `to_location` (text)
   - `weight_volume` (text)
   - `email` (text, nullable)
   - `phone` (text)
   - `inn` (text)
   - `company_name` (text)
   - `full_name` (text)
   - `created_at` (timestamp, default: now())

3. Добавьте ключи в `.env` файл

## Сборка для продакшена

```bash
npm run build
```

## Деплой на Netlify

1. Подключите репозиторий к Netlify
2. Установите переменные окружения в настройках Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Build command: `npm run build`
4. Publish directory: `dist`
