# Инструкция по деплою на Netlify

## ⚠️ Важно: SQLite не работает на Netlify

Netlify использует serverless функции, где файловая база данных SQLite не работает. Необходимо использовать PostgreSQL.

## Шаги для деплоя:

### 1. Настройка PostgreSQL базы данных

#### Вариант A: Использовать Netlify Postgres (рекомендуется)

1. В панели Netlify перейдите в **Add-ons**
2. Найдите **Postgres** и добавьте его
3. Netlify автоматически создаст переменную окружения `DATABASE_URL`

#### Вариант B: Использовать внешний PostgreSQL (Supabase, Railway, Neon и т.д.)

1. Создайте базу данных на одном из сервисов:
   - [Supabase](https://supabase.com) (бесплатный план)
   - [Railway](https://railway.app) (бесплатный план)
   - [Neon](https://neon.tech) (бесплатный план)
   - [Render](https://render.com) (бесплатный план)

2. Получите connection string (строка подключения)
   - Формат: `postgresql://user:password@host:port/database?sslmode=require`

### 2. Настройка переменных окружения в Netlify

1. В панели Netlify перейдите в **Site settings** → **Environment variables**
2. Добавьте переменную:
   - **Key**: `DATABASE_URL`
   - **Value**: ваша строка подключения к PostgreSQL
   - **Scopes**: выберите все окружения (Production, Deploy previews, Branch deploys)

### 3. Применение миграций

Миграции применяются автоматически во время сборки благодаря команде `prisma migrate deploy` в `package.json`.

Если нужно применить миграции вручную:

```bash
# Локально (для тестирования)
npx prisma migrate deploy

# Или через Netlify CLI
netlify env:get DATABASE_URL
npx prisma migrate deploy
```

### 4. Деплой

1. Подключите репозиторий GitHub к Netlify
2. Настройки сборки:
   - **Build command**: `npm run build` (уже настроено в netlify.toml)
   - **Publish directory**: `.next` (уже настроено в netlify.toml)
3. Нажмите **Deploy site**

### 5. Проверка после деплоя

После успешного деплоя проверьте:
- Главная страница открывается
- API роуты работают
- Личный кабинет доступен

## Решение проблем

### Ошибка: "Can't reach database server"

- Проверьте, что `DATABASE_URL` правильно настроен в Netlify
- Убедитесь, что база данных доступна извне (не localhost)
- Проверьте SSL режим в connection string

### Ошибка: "Migration failed"

- Убедитесь, что миграции применены: `npx prisma migrate deploy`
- Проверьте, что все миграции находятся в папке `prisma/migrations`

### Ошибка при сборке: "Prisma Client not found"

- Убедитесь, что `prisma generate` выполняется перед `next build`
- Проверьте, что `postinstall` скрипт работает

## Альтернативное решение: Prisma Data Proxy

Если возникают проблемы с прямым подключением к PostgreSQL, можно использовать Prisma Data Proxy:

1. Зарегистрируйтесь на [Prisma Data Platform](https://www.prisma.io/data-platform)
2. Создайте Data Proxy
3. Установите переменную окружения `PRISMA_GENERATE_DATAPROXY=true`
4. Обновите `DATABASE_URL` на connection string от Data Proxy

## Полезные ссылки

- [Netlify Next.js документация](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Prisma с PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
