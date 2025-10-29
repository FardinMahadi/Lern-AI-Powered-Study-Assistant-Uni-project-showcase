# Lern - Project Structure Documentation

## Overview

This project follows an industry-standard, feature-based architecture optimized for scalability and maintainability.

## Folder Structure

```
lern/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (marketing)/              # Public pages
│   │   │   └── page.js               # Landing page
│   │   ├── (dashboard)/              # Protected dashboard pages
│   │   │   ├── chat/
│   │   │   ├── notes/
│   │   │   ├── overview/
│   │   │   └── settings/
│   │   ├── api/                      # API Routes
│   │   │   ├── chat/route.js
│   │   │   ├── notes/route.js
│   │   │   └── ai/generate/route.js
│   │   ├── layout.js
│   │   └── globals.css
│   │
│   ├── features/                     # Feature modules
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   ├── notes/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── context/
│   │   └── ai/
│   │       ├── providers/
│   │       └── utils/
│   │
│   ├── components/                   # Shared components
│   │   ├── ui/                       # Generic UI components
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Card.js
│   │   │   ├── Modal.js
│   │   │   └── Toast.js
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── Sidebar.js
│   │   └── marketing/                # Marketing components
│   │       ├── Hero.js
│   │       ├── Feature1.js
│   │       ├── Feature2.js
│   │       ├── CardStack.js
│   │       ├── Footer.js
│   │       └── Header.js
│   │
│   ├── lib/                          # Shared utilities
│   │   ├── firebase/                 # Firebase/Supabase config
│   │   │   ├── config.js
│   │   │   ├── auth.js
│   │   │   └── firestore.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── helpers.js
│   │   ├── constants.js
│   │   └── api-client.js
│   │
│   ├── hooks/                        # Global custom hooks
│   │   ├── useMediaQuery.js
│   │   ├── useLocalStorage.js
│   │   └── useDebounce.js
│   │
│   ├── store/                        # State management (Zustand)
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── notesSlice.js
│   │   │   └── chatSlice.js
│   │   └── index.js
│   │
│   └── styles/                       # Global styles
│       └── themes/
│
├── config/
│   ├── site.js                       # Site metadata
│   └── env.js                        # Environment validation
│
├── public/
│   ├── images/                       # All images organized here
│   ├── icons/
│   └── fonts/
│
├── jsconfig.json                     # Path aliases configured
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

## Key Features

### 1. Path Aliases

Configured in `jsconfig.json`:

- `@/components/*` - Shared components
- `@/features/*` - Feature modules
- `@/lib/*` - Utilities and libraries
- `@/hooks/*` - Custom hooks
- `@/store/*` - State management
- `@/config/*` - Configuration files

### 2. Route Groups

- `(marketing)` - Public pages (landing, pricing, about)
- `(dashboard)` - Protected user pages (notes, chat, settings)
- `(auth)` - Authentication pages (login, signup)

### 3. State Management

Using Zustand for global state:

- `useAuth()` - Authentication state
- `useNotes()` - Notes management
- `useChat()` - Chat functionality

### 4. API Routes

RESTful API endpoints:

- `/api/chat` - Chat functionality
- `/api/notes` - Notes CRUD
- `/api/ai/generate` - AI content generation

## Usage Examples

### Importing Shared Components

```javascript
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
```

### Using State Management

```javascript
import { useAuth, useNotes } from "@/store";

const { user, login } = useAuth();
const { notes, addNote } = useNotes();
```

### Using Utilities

```javascript
import { formatDate } from "@/lib/utils/formatters";
import { validateEmail } from "@/lib/utils/validators";
import { AI_MODELS } from "@/lib/constants";
```

### API Client

```javascript
import apiClient from "@/lib/api-client";

const notes = await apiClient.get("/notes");
const chat = await apiClient.post("/chat", { message, model });
```

## Adding New Features

### 1. Create Feature Module

```
src/features/new-feature/
├── components/
│   └── NewFeatureComponent.js
├── hooks/
│   └── useNewFeature.js
└── services/
    └── newFeatureService.js
```

### 2. Add Route

```
src/app/(dashboard)/new-feature/
└── page.js
```

### 3. Add API Endpoint

```
src/app/api/new-feature/
└── route.js
```

### 4. Add State Slice (if needed)

```javascript
// src/store/slices/newFeatureSlice.js
export const createNewFeatureSlice = (set, get) => ({
  // state and actions
});
```

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Add your API keys and configuration
3. Update `config/env.js` if you add required variables

## Best Practices

1. **Keep components small** - Single responsibility
2. **Use feature folders** - Feature-specific code stays together
3. **Leverage path aliases** - Cleaner imports
4. **Centralize utilities** - Reusable functions in `lib/utils`
5. **Type your code** - Use JSDoc comments for better IDE support
6. **Follow naming conventions** - PascalCase for components, camelCase for utilities

## Next Steps

1. Implement Firebase/Supabase authentication
2. Connect AI API providers (OpenAI, Anthropic, etc.)
3. Build out notes feature
4. Add user dashboard
5. Implement real-time features
6. Add analytics and monitoring

## Migration Notes

- Old `(landingPage)` → Now `(marketing)`
- Old `/chat` → Now `/(dashboard)/chat`
- All images moved to `/public/images/`
- Marketing components moved to `/src/components/marketing/`
