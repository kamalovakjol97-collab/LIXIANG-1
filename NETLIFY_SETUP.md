# Инструкция по настройке Netlify

## Проблема: Netlify определяет проект как Next.js

Если Netlify автоматически определяет проект как Next.js и деплой падает, выполните следующие шаги:

## Решение 1: Настройки в веб-интерфейсе Netlify

1. Зайдите в **Site settings** → **Build & deploy** → **Build settings**
2. Убедитесь, что указано:
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** (оставьте пустым)

3. Перейдите в **Site settings** → **Build & deploy** → **Environment variables**
4. Добавьте переменную:
   - **Key:** `NETLIFY_NEXT_PLUGIN_SKIP`
   - **Value:** `true`

5. Перейдите в **Site settings** → **Build & deploy** → **Plugins**
6. Если видите плагин `@netlify/plugin-nextjs` - **отключите его** или **удалите**

## Решение 2: Через netlify.toml (уже настроено)

Файл `netlify.toml` уже содержит правильные настройки. Убедитесь, что он закоммичен в Git.

## Решение 3: Пересоздание сайта (если ничего не помогает)

1. Удалите текущий сайт в Netlify
2. Создайте новый сайт
3. При подключении репозитория **НЕ** выбирайте автоматическое определение фреймворка
4. Вручную укажите:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
5. Добавьте переменные окружения:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `NETLIFY_NEXT_PLUGIN_SKIP = true`

## Проверка

После настройки:
1. Запустите новый деплой
2. Проверьте логи - не должно быть упоминаний Next.js
3. Сайт должен успешно задеплоиться
