# Настройка Directus для Hero Slider

## Создание коллекции в Directus

1. Создай коллекцию `hero_slides` в Directus Admin
2. Добавь следующие поля:

### Основные поля:

- `id` (UUID, Primary Key) - автоматически
- `title` (String, Required) - заголовок слайда
- `description` (Text, Optional) - описание
- `background_image` (File/Image, Optional) - фоновое изображение
- `background_color` (String, Optional) - цвет фона (hex)
- `text_color` (String, Optional) - цвет текста (hex)
- `button_text` (String, Optional) - текст кнопки
- `button_link` (String, Optional) - ссылка кнопки
- `order` (Integer, Optional) - порядок сортировки
- `status` (String, Enum: 'published', 'draft') - статус

### Анимированные элементы (JSON поле):

Создай поле `animated_elements` типа JSON:

```json
[
  {
    "id": "1",
    "type": "text",
    "content": "Текст",
    "position_x": 20,
    "position_y": 30,
    "animation_delay": 0.2,
    "animation_type": "fadeIn"
  }
]
```

**Типы элементов:**
- `text` - текст
- `icon` - иконка (emoji или символ)
- `image` - изображение (URL)
- `shape` - фигура (цвет в hex)

**Типы анимаций:**
- `fadeIn` - появление
- `slideUp` - снизу вверх
- `slideDown` - сверху вниз
- `slideLeft` - справа налево
- `slideRight` - слева направо
- `scale` - масштабирование

**Позиция:**
- `position_x` - процент от левого края (0-100)
- `position_y` - процент от верха (0-100)

## Настройка прав доступа

В Directus настрой права:
- `hero_slides` - Read для Public (если нужно)
- Или используй Static Token для авторизации

## Пример данных

```json
{
  "title": "АВТОМАТИЗИРУЙТЕ БИЗНЕС",
  "description": "Описание слайда",
  "background_color": "#F2F2F2",
  "text_color": "#00090C",
  "button_text": "Запросить демо",
  "button_link": "/demo",
  "order": 1,
  "status": "published",
  "animated_elements": [
    {
      "id": "1",
      "type": "icon",
      "content": "🚀",
      "position_x": 15,
      "position_y": 25,
      "animation_delay": 0.3,
      "animation_type": "slideUp"
    }
  ]
}
```
