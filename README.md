# Lern – AI-Powered Study Assistant

**Lern** is a modern, full-stack AI-powered study assistant built with Next.js,
Material-UI, Firebase, and Groq AI. It provides intelligent conversational
learning with persistent conversation storage.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Firebase project
- Groq API key

### Setup

1. **Clone & Install**

   ```bash
   git clone <repo>
   cd lern
   pnpm install
   ```

2. **Configure Environment Variables**

   Create `.env.local` in project root with:

   ```bash
   # Firebase (from https://console.firebase.google.com)
   NEXT_PUBLIC_FIREBASE_API_KEY=your-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

   # Groq API (from https://console.groq.com/keys)
   GROQ_API_KEY=your-groq-key

   # Backend
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

   📖 **Detailed Guide**: See [SETUP_ENV.md](./docs/SETUP_ENV.md)

3. **Start Development**

   ```bash
   # Frontend (port 3000)
   pnpm dev

   # Backend (in another terminal)
   cd src/server
   npm install
   npm run migrate  # First time only
   npm run dev
   ```

4. **Access the App**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

---

## ✨ Features

- 🧠 **AI Chat** - Multi-turn conversations with Groq AI
- 🔐 **Firebase Auth** - Email/password authentication with tiers
- 💬 **Conversations** - Persistent storage with PostgreSQL
- 🎨 **Material-UI** - Modern, responsive design
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 📱 **Responsive** - Mobile-first design
- 🔄 **Real-time** - WebSocket-ready architecture

---

## 📚 Documentation

| Document                                                      | Purpose                      |
| ------------------------------------------------------------- | ---------------------------- |
| [SETUP_ENV.md](./docs/SETUP_ENV.md)                           | Firebase & environment setup |
| [FULL_STACK_GUIDE.md](./docs/FULL_STACK_GUIDE.md)             | Complete integration guide   |
| [SERVER_SETUP.md](./docs/SERVER_SETUP.md)                     | Backend server setup         |
| [IMPLEMENTATION_SUMMARY.md](./docs/IMPLEMENTATION_SUMMARY.md) | Technical details            |
| [CLEANUP_SUMMARY.md](./docs/CLEANUP_SUMMARY.md)               | Project structure overview   |

---

## 🧩 Architecture

### 1️⃣ Landing Page

> **Purpose:** Public-facing page to introduce the app and convert visitors to
> users.

#### Sections:

- Hero Section (Tagline + CTA)
- Core Features Overview
- Screenshots or App Preview
- About the Project/Team
- Login / Signup Button

#### Tech:

- React + TailwindCSS
- Framer Motion for animation
- Deployed via Vercel

---

### 2️⃣ Authentication Page

> **Purpose:** Secure user login and registration

#### Features:

- Email + password login
- Optionally add Google OAuth
- Firebase Auth or JWT (via Node)

---

### 3️⃣ Main Dashboard

> **Purpose:** User workspace with notes and AI tutor

#### 📒 Notes Section

- Create, edit, delete, and search notes
- Tag-based or folder organization
- Notes saved to MongoDB with timestamps

#### 🤖 AI Assistant Section

- Chatbot interface for asking study questions
- Suggest prompt buttons like:
  - "Summarize this note"
  - "Quiz me"
  - "Explain this simply"
- Use OpenAI or Claude API

#### 🧠 Smart Features (Optional):

- Auto-highlight key points in notes
- Generate quizzes from note content
- Study suggestions (based on usage)
- Pomodoro timer integration

---

## ⚙️ Tech Stack

| Area         | Tech                                        |
| ------------ | ------------------------------------------- |
| Frontend     | React + Tailwind + Framer Motion            |
| Backend      | Node.js + Express                           |
| Database     | MongoDB Atlas                               |
| Auth         | Firebase Auth / JWT                         |
| AI Assistant | OpenAI API / Claude / Gemini                |
| Hosting      | Vercel (frontend), Render/Railway (backend) |

---

## 🧪 Stretch Features

- Markdown support in notes
- Export notes to PDF
- Voice-to-text note input
- Collaborative notes (real-time)

---

## 🎁 Showcase Extras (Optional)

- Demo mode without login
- Dark mode
- Responsive design (mobile/tablet support)

---

## 📌 Next Steps

- [ ] Design landing page layout
- [ ] Set up auth (Firebase or custom backend)
- [ ] Build notes dashboard
- [ ] Integrate AI API
- [ ] Deploy and test

---

> ✨ "Lern" — Minimal Notes. Maximum Focus.
