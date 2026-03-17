# Настройка Directus для About Section

## Создание коллекции в Directus

1. Создай коллекцию `about_sections` в Directus Admin
2. Добавь следующие поля:

### Основные поля:

- `id` (UUID, Primary Key) - автоматически
- `label` (String, Optional) - метка секции (например, "О нас")
- `title` (String, Required) - заголовок (например, "КОМАНДА ТЕХНОЛОГИЧЕСКИХ ВИЗИОНЕРОВ")
- `description` (Text, Required) - описание
- `button_text` (String, Optional) - текст кнопки (например, "Узнать больше")
- `button_link` (String, Optional) - ссылка кнопки
- `link_text` (String, Optional) - текст ссылки (например, "Наша история")
- `link_url` (String, Optional) - URL ссылки
- `image_large` (File/Image, Optional) - большое изображение слева
- `image_small` (File/Image, Optional) - маленькое изображение справа внизу
- `order` (Integer, Optional) - порядок сортировки
- `status` (String, Enum: 'published', 'draft') - статус

## Пример данных

```json
{
  "label": "О нас",
  "title": "КОМАНДА ТЕХНОЛОГИЧЕСКИХ ВИЗИОНЕРОВ",
  "description": "Мы объединяем экспертов из разных областей для создания revolutionary решений. Наша цель – трансформировать бизнес-ландшафт с помощью интеллектуальных технологий.",
  "button_text": "Узнать больше",
  "button_link": "/about",
  "link_text": "Наша история",
  "link_url": "/history",
  "order": 1,
  "status": "published"
}
```

## Настройка прав доступа

В Directus настрой права:
- `about_sections` - Read для Public (если нужно)
- Или используй Static Token для авторизации
