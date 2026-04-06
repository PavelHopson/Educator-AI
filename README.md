# Educator AI / Questify

![Banner](https://img.shields.io/badge/QUESTIFY-AI_GAMIFICATION_ENGINE-6d28d9?style=for-the-badge&logo=google-gemini&logoColor=white)

<div align="center">

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Gemini](https://img.shields.io/badge/Gemini_AI-Google-8e75b2?style=flat-square&logo=google-gemini)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**Превращает PDF и учебные материалы в интерактивные квесты и escape rooms за 60 секунд.**

</div>

---

## About

**Questify** -- AI-платформа для геймификации обучения. Загрузите любой учебный текст, и Gemini AI мгновенно превратит его в интерактивный квиз или escape room с сюжетом, персонажами и головоломками.

Проект задуман как инструмент для корпоративного обучения (L&D) и edtech: сокращает создание курса с недель до минуты.

---

## Features

| Фича | Описание |
| :--- | :--- |
| **Quiz Mode** | AI генерирует вопросы на понимание с мгновенной обратной связью |
| **Escape Room Mode** | Нелинейные текстовые квесты с инвентарём и ветвлением сюжета |
| **PDF Upload** | Загрузка учебных материалов напрямую |
| **EN/RU Localization** | Полная поддержка английского и русского языков |
| **Dark UI** | Премиальный интерфейс с glassmorphism и анимациями |

---

## Tech Stack

- **Core:** React 19, TypeScript 5.8
- **Build:** Vite 6
- **AI:** Google Gemini AI (`@google/genai`)
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS (custom Quest palette)

---

## Project Structure

```
.
├── App.tsx                    # Главный компонент приложения
├── index.tsx                  # Entry point
├── types.ts                   # Re-export типов
├── components/                # UI компоненты (Button, QuizPlayer, EscapeRoomPlayer)
├── services/                  # Legacy сервисы (перенесены в shared/)
├── shared/
│   ├── lib/
│   │   ├── ai/               # Gemini AI клиент и промпты
│   │   └── game/             # Типы, движок игры, компоненты
│   └── ui/                   # Переиспользуемые UI-компоненты (Button, Branding)
└── widgets/
    ├── GamePlayer/            # Виджет игрового процесса
    └── Landing/               # Лендинг-страница
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- Google Gemini API Key ([получить здесь](https://aistudio.google.com/))

### Installation

```bash
git clone https://github.com/PavelHopson/Educator-AI.git
cd Educator-AI
npm install
```

### Configuration

Скопируйте `.env.example` и укажите свой API-ключ:

```bash
cp .env.example .env
```

```env
GEMINI_API_KEY=your_api_key_here
```

### Run

```bash
npm run dev
```

---

## License

[MIT](LICENSE) &copy; 2025 PavelHopson