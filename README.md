# GameTracker 🎮

[![CI/CD Pipeline](https://github.com/xMoR1nx/lab1-git-workspace/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/xMoR1nx/lab1-git-workspace/actions/workflows/ci-cd.yml)

**🌐 Живий сайт:** https://lab1-git-workspace.vercel.app/

Персональна бібліотека ігор — лабораторна робота №3 з дисципліни "Управління ІТ-проєктами".

## Опис проєкту

Frontend-застосунок на React + Vite для відстеження особистої колекції ігор.
Дозволяє додавати ігри, встановлювати статус, виставляти рейтинг та зберігати дані у localStorage.

## Функціонал

- ➕ Додавання ігор (назва, платформа, жанр, статус)
- ▶ Статуси: Граю / Пройшов / Вішліст
- ⭐ Рейтинг зірками (1-5)
- 🔍 Пошук та фільтрація
- 💾 Збереження у localStorage
- 🌿 Відображення режиму середовища (Development / Production Mode)

## Технології

- React 19
- Vite 7
- JavaScript (ES6+)
- ESLint + Prettier
- localStorage

## Команди
```bash
npm install      # встановити залежності
npm run dev      # запуск сервера розробки
npm run build    # продуктова збірка
npm run preview  # перегляд збірки
npm run lint     # перевірка коду
```

## Змінні оточення

| Файл | Призначення |
|------|-------------|
| `.env` | Development режим |
| `.env.production` | Production режим |

## Автор

Козак М.В. | ПП-32-1 | Львівська політехніка