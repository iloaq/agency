# Agency Studio - Next.js Fullstack Project

Масштабируемая архитектура для студии разработки с поддержкой будущего SaaS.

## Технологический стек

- **Next.js 16** (App Router)
- **TypeScript**
- **Directus** (Headless CMS)
- **Redis** (Кэширование)
- **MySQL** (База данных)
- **Tailwind CSS 4**

## Структура проекта

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   └── (routes)/          # Страницы
├── features/              # Feature-based модули
│   └── [feature-name]/    # Изолированные фичи
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── types/
├── shared/                # Общие компоненты и утилиты
│   ├── components/
│   ├── hooks/
│   └── lib/
├── lib/                   # Ядро приложения
│   ├── config/           # Конфигурация
│   ├── db/               # MySQL клиент
│   ├── redis/            # Redis клиент
│   ├── directus/         # Directus SDK
│   ├── cache/            # Кэш утилиты
│   └── utils/            # Утилиты
└── types/                # Глобальные типы
```

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Скопируйте `.env.example` в `.env` и заполните переменные окружения:
```bash
cp .env.example .env
```

3. Запустите dev сервер:
```bash
npm run dev
```

## Переменные окружения

См. `.env.example` для полного списка переменных.

## Архитектура

Проект использует **feature-based architecture** для масштабируемости:
- Каждая фича изолирована и самодостаточна
- Общий код в `shared/`
- Ядро приложения в `lib/`

## API Routes

Все API routes находятся в `app/api/` и используют middleware для обработки ошибок.

## Разработка

- Используйте TypeScript строго
- Следуйте структуре features для новых модулей
- Используйте серверные компоненты по умолчанию
- Клиентские компоненты только для интерактивности
