# Instagram-style API

Простой REST API на Node.js с использованием Express для имитации Instagram-постов.

## Методы:
- `GET /api/posts` — список постов (поддерживает фильтрацию по author)
- `GET /api/posts/:id` — получить один пост по ID
- `POST /api/posts` — добавить пост
- `PUT /api/posts/:id` — редактировать пост
- `DELETE /api/posts/:id` — удалить пост

## Запуск

```bash
npm install
node app.js
```

API будет доступен по адресу: http://localhost:3000/api/posts