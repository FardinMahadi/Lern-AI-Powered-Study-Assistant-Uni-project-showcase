# Lern Project Documentation

Welcome to the Lern documentation! This guide covers setup, architecture, authentication, and guidance for scaling the project.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Authentication & Authorization](#authentication--authorization)
4. [Environment Setup](#environment-setup)
5. [Key Features](#key-features)
6. [Architecture Overview](#architecture-overview)
7. [Future Scaling](#future-scaling)

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Firebase account with Firestore enabled
- Groq API key

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables (see Environment Setup section)
cp .env.example .env.local

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the app.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
lern/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages (login, signup)
│   │   ├── (dashboard)/         # Protected dashboard routes
│   │   │   ├── chat/            # AI chat interface with Markdown rendering
│   │   │   ├── notes/           # Note-taking interface
│   │   │   └── settings/        # User settings
│   │   ├── (marketing)/         # Public marketing pages
│   │   │   ├── features/        # Features showcase
│   │   │   ├── pricing/         # Pricing tiers
│   │   │   └── about/           # About & team
│   │   ├── api/                 # API routes (Next.js Server Actions)
│   │   │   └── chat/            # Groq AI integration endpoint
│   │   └── layout.tsx           # Root layout with theme provider
│   │
│   ├── components/              # Reusable React components
│   │   ├── marketing/           # Landing page components
│   │   └── ui/                  # Generic UI components
│   │
│   ├── features/                # Feature-specific logic
│   │   ├── auth/                # Authentication context & hooks
│   │   ├── chat/                # Chat service layer
│   │   └── notes/               # Notes service layer
│   │
│   ├── layouts/                 # Layout components
│   │   └── dashboard/           # Dashboard layout with collapsible sidebar
│   │
│   ├── lib/                     # Utilities & configurations
│   │   ├── firebase/            # Firebase auth, Firestore utilities
│   │   ├── groqClient.ts        # Groq AI client setup
│   │   ├── constants.ts         # App-wide constants
│   │   └── api-client.ts        # HTTP client for API calls
│   │
│   ├── theme/                   # Material-UI theming
│   │   ├── index.tsx            # Theme provider & color mode context
│   │   ├── palette.ts           # Color schemes (light/dark)
│   │   └── typography.ts        # Font & text styles
│   │
│   └── types/                   # TypeScript type definitions
│
├── docs/                        # Documentation (this folder)
├── public/                      # Static assets
├── server/                      # Backend service (PostgreSQL + Node.js)
├── package.json                 # Dependencies
└── tsconfig.json               # TypeScript configuration
```

---

## Authentication & Authorization

Lern uses **Firebase Authentication** with **Firestore** for user profiles and a **tiered subscription system** (Free, Pro, Advanced).

### Authentication Flow

1. User signs up via `/signup` with email & password
2. Firebase creates auth user + Firestore document
3. Default tier: `free`
4. On login, user profile is fetched and cached in React context
5. Protected routes check auth state via `useAuthContext()`

### Subscription Tiers

| Tier     | Daily Limit | Features                                           | Cost      |
| -------- | ----------- | -------------------------------------------------- | --------- |
| Free     | 5 chats     | Basic AI models, text responses                    | $0        |
| Pro      | Unlimited   | Advanced models, 30-day history, analytics         | $9.99/mo  |
| Advanced | Unlimited   | API access, custom integrations, dedicated support | $24.99/mo |

### Implementation Details

- **Firebase Auth**: Handles user registration, login, password reset
- **Firestore**: Stores user profiles with `tier`, `displayName`, `email`
- **Auth Context** (`src/features/auth/context/AuthContext.tsx`): Global state management
- **Protected Routes**: Check auth + tier for feature access
- **Tier Enforcement**: Applied in API routes via custom middleware

### Using Auth in Components

```tsx
import { useAuthContext } from "@/features/auth/context/AuthContext";

export function MyComponent() {
  const { user, profile, tier, signOut } = useAuthContext();

  if (!user) return <div>Sign in required</div>;

  const isPro = tier === "pro" || tier === "advanced";
  return (
    <div>
      <p>Logged in as: {profile?.displayName}</p>
      {isPro && <PremiumFeature />}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

---

## Environment Setup

### Required Environment Variables

Create `.env.local` at the project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Groq API Configuration
GROQ_API_KEY=your_groq_api_key

# Backend Server (optional, for conversation storage)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password)
4. Enable **Firestore Database** in production mode
5. Copy credentials to `.env.local`

### Groq API Setup

1. Visit [Groq Console](https://console.groq.com/)
2. Create API key
3. Add to `GROQ_API_KEY` in `.env.local`

---

## Key Features

### 1. AI Chat with Markdown Rendering

- **Location**: `src/app/(dashboard)/chat/`
- **Tech**: React Markdown, Groq API, Material-UI
- **Features**:
  - Multi-turn conversations
  - Model selection dropdown
  - Markdown-formatted responses with code blocks
  - Auto-hide sidebar for full-width conversations
  - Message count indicator

### 2. Collapsible Dashboard Sidebar

- **Location**: `src/layouts/dashboard/`
- **Features**:
  - Collapse/expand on desktop
  - Mobile drawer
  - Auto-hide after 6 messages on chat
  - Breadcrumb navigation

### 3. Material-UI Theming

- **Location**: `src/theme/`
- **Dark Mode Toggle**: TopAppBar icon
- **Color Palette**: Brand accent (#00D9FF) + secondary (#6E59F0)
- **Responsive**: Tailored for mobile, tablet, desktop

### 4. Markdown Components

- **Location**: `src/app/(dashboard)/chat/markdownComponents.tsx`
- **Renders**: Headers, lists, code blocks (with language labels), tables, blockquotes

---

## Architecture Overview

### Frontend (Next.js + React)

- **Framework**: Next.js 15 with App Router
- **Styling**: Material-UI (MUI) + Tailwind CSS
- **State**: React Context (Auth) + Zustand (Chat, Notes)
- **Markdown**: react-markdown with custom components
- **Forms**: Material-UI TextField, Select, etc.

### Backend (Next.js API Routes)

- **Chat Route** (`/api/chat`):
  - Accepts user messages
  - Calls Groq API
  - Returns AI response
  - Enforces tier-based rate limits (optional)

### External Services

- **Groq**: Fast LLM inference via OpenAI-compatible API
- **Firebase**: User auth + profile storage + Firestore
- **PostgreSQL + Node.js** (optional): Future conversation storage

### Data Flow

```
User (Chat Page)
  ↓
  → Submit message
    ↓
    → API Route (/api/chat)
      ↓
      → Groq API
        ↓
        → Returns AI response
    ↓
  → Display in React Markdown
```

---

## Future Scaling

### Phase 1: Conversation History (In Progress)

**Setup**: PostgreSQL + Node.js backend in `/server`

- Store conversations per user
- Tier-based limits (Free: 5 convos, Pro: 50, Advanced: unlimited)
- Retrieve past conversations from dashboard

**Migration**: Decouple chat storage from frontend state to backend.

### Phase 2: Advanced Features

- **Real-time Collaboration**: WebSocket for live chat sessions
- **Voice Input/Output**: Speech-to-text & text-to-speech
- **Custom AI Models**: Allow users to fine-tune models
- **Analytics Dashboard**: Usage stats, learning insights
- **Integrations**: Slack, Google Classroom, Notion

### Phase 3: Infrastructure & DevOps

- **CDN**: Cloudflare for global content delivery
- **Database Scaling**: Replicas for read-heavy workloads
- **Caching**: Redis for session + frequently accessed data
- **Monitoring**: Sentry for error tracking, DataDog for metrics
- **CI/CD**: GitHub Actions for automated testing & deployment

### Phase 4: Monetization & Growth

- **Stripe Integration**: Payment processing for subscriptions
- **Referral Program**: Invite bonuses
- **B2B Sales**: Enterprise licenses for schools/companies
- **Mobile Apps**: iOS & Android native apps

### Deployment Recommendations

- **Frontend**: Vercel (native Next.js support, auto-scaling)
- **Backend**: Railway, Render, or AWS ECS for Node.js + PostgreSQL
- **Database**: AWS RDS or Railway PostgreSQL
- **Storage**: AWS S3 for file uploads
- **Email**: SendGrid or Mailgun

---

## Contributing

### Code Style

- **Formatter**: Prettier (`pnpm format`)
- **Linter**: ESLint (`pnpm lint`)
- **Language**: TypeScript (strict mode)

### Branch Naming

- `feature/feature-name` for new features
- `fix/issue-name` for bug fixes
- `docs/update-name` for documentation

### Pull Request Process

1. Create a branch
2. Make changes with tests
3. Run `pnpm format && pnpm lint`
4. Submit PR with clear description
5. Request review from team lead

---

## Troubleshooting

### Firebase Connection Issues

- Verify `.env.local` has correct Firebase config
- Check Firebase project has Firestore enabled
- Ensure email/password auth is enabled in Firebase Console

### Groq API Errors

- Confirm `GROQ_API_KEY` is set
- Check rate limits (Groq has free tier limits)
- Review Groq [documentation](https://console.groq.com/docs)

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check Node version: `node --version` (should be 18+)

---

## Support

For questions or issues:

- **Email**: support@lern.ai
- **Discord**: [Join our community](https://discord.gg/lern)
- **GitHub Issues**: Report bugs on [GitHub](https://github.com/lern/lern)

---

**Last Updated**: November 2024  
**Version**: 1.0.0
