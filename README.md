# 🗝️ Questify | Intelligent Gamification Platform

![Banner](https://img.shields.io/badge/QUESTIFY-AI_GAMIFICATION_ENGINE-6d28d9?style=for-the-badge&logo=google-gemini&logoColor=white)

<div align="center">

[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=flat-square)](https://questify.app)
[![Tech](https://img.shields.io/badge/Stack-React_19_%7C_Gemini_3_Pro-purple?style=flat-square)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Design](https://img.shields.io/badge/Design_System-Tailwind_Quest_UI-pink?style=flat-square)](https://tailwindcss.com)

**"Turn boring manuals into engaging escape rooms in 60 seconds."**

[View Demo](https://questify.app) · [Report Bug](https://github.com/hex-dev/questify/issues) · [Request Feature](https://github.com/hex-dev/questify/issues)

</div>

---

## 🚀 The Product

**Questify** is an enterprise-grade SaaS platform designed to disrupt the Corporate L&D (Learning & Development) market. We leverage **Google Gemini 3 Pro's** multimodal capabilities to instantly transform static educational content (PDFs, Wikis, Manuals) into interactive, gamified experiences.

### 💎 Business Value Proposition
*   **Time-to-Market:** Reduce course creation time from **2 weeks to 60 seconds**.
*   **Engagement:** Increase employee completion rates by **up to 40%** via gamification mechanics.
*   **Scalability:** Zero-backend architecture allows scaling to millions of users with minimal infrastructure costs.

---

## ✨ Key Features

| Feature | Description | Tech Under the Hood |
| :--- | :--- | :--- |
| **🧠 AI Story Engine** | Automatically generates plot, characters, and dialogue from dry technical text. | `Gemini 3 Pro` + `Prompt Engineering` |
| **🗝️ Escape Room Mode** | Creates non-linear text adventures with inventory systems and branching logic. | `Graph Theory` + `State Management` |
| **📝 Adaptive Quizzes** | Generates questions that test *understanding*, not just memory, with instant feedback. | `JSON Schema Validation` |
| **🎨 Quest Design System** | Premium, dark-mode-first UI that feels like a AAA game interface. | `Tailwind CSS` + `Glassmorphism` |
| **🌍 Localization** | Native support for **English** and **Russian** markets. | `i18n` Architecture |

---

## 🛠 Engineering & Architecture

This project is built with a **"Quality First"** mindset, following Clean Architecture principles adapted for a modern Frontend-First application.

### Tech Stack
*   **Core:** React 19 (RC), TypeScript 5.4
*   **Build:** Vite (Super fast HMR)
*   **AI Integration:** Google GenAI SDK (Vertex AI ready)
*   **Styling:** Tailwind CSS with custom `Quest` color palette & animations
*   **Architecture:** Feature-Sliced Design (Lite)

### Folder Structure (FSD)
```bash
src/
├── app/                  # Entry point & Global providers
├── features/             # Business logic (Auth, Billing)
├── widgets/              # Complex UI blocks (GamePlayer, LandingPage)
├── shared/               # Reusable code
│   ├── lib/              # Core Logic (AI Client, Game Engine)
│   └── ui/               # Dumb Components (Buttons, Inputs)
└── index.tsx             # Root
```

---

## ⚡ Quick Start

You can run Questify locally in less than 2 minutes.

### Prerequisites
*   Node.js 18+
*   Google Gemini API Key (Get it [here](https://aistudio.google.com/))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-org/questify.git
    cd questify
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    # Your Google Gemini API Key
    API_KEY=AIzaSy...
    ```

4.  **Run Development Server**
    ```bash
    npm start
    ```

---

## 🗺️ Roadmap & Monetization

### Phase 1: MVP (Completed) ✅
*   [x] Core AI Engine Integration
*   [x] Quiz & Escape Room Modes
*   [x] Premium Landing Page
*   [x] Russian/English Localization

### Phase 2: Growth (Q2 2025) 🚧
*   [ ] **Stripe Integration** ($15/mo Pro Plan)
*   [ ] **PDF Parsing** (Direct file upload via PDF.js)
*   [ ] **User Auth** (Firebase / Supabase)
*   [ ] **Export to SCORM** (For LMS integration)

### Phase 3: Enterprise (Q4 2025) 🔮
*   [ ] SSO (Single Sign-On)
*   [ ] Custom Domain Support
*   [ ] Analytics Dashboard (Employee Performance)

---

## 👨‍💻 Team

**Artem "Hex" Voronin**
*Staff Software Engineer | .NET & React Expert*

> *"I don't just write code. I build digital assets that generate revenue."*

---

<div align="center">
  <sub>© 2025 Questify Inc. Built with ❤️ and Gemini 3 Pro.</sub>
</div>
