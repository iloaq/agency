# Настройка Directus для Portfolio Cases

## Создание коллекции в Directus

1. Создай коллекцию `portfolio_cases` в Directus Admin
2. Добавь следующие поля:

### Основные поля:

- `id` (UUID, Primary Key) - автоматически
- `title` (String, Required) - заголовок кейса (например, "УМНЫЙ ЧАТ-БОТ")
- `description` (Text, Required) - описание проекта
- `image` (File/Image, Optional) - изображение проекта
- `tags` (JSON, Optional) - массив тегов (например, ["ИИ", "Машинное обучение"])
- `link` (String, Optional) - ссылка на проект
- `order` (Integer, Optional) - порядок сортировки
- `status` (String, Enum: 'published', 'draft') - статус

## Пример данных

```json
{
  "title": "УМНЫЙ ЧАТ-БОТ",
  "description": "Автоматизация коммуникаций для технологического стартапа с увеличением конверсии на 40%",
  "tags": ["ИИ", "Машинное обучение", "Автоматизация"],
  "link": "/projects/chatbot",
  "order": 1,
  "status": "published"
}
```

## Настройка прав доступа

В Directus настрой права:
- `portfolio_cases` - Read для Public (если нужно)
- Или используй Static Token для авторизации
