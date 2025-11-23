# Lern - Project Structure Documentation

## Overview

This project follows an industry-standard, feature-based architecture optimized
for scalability and maintainability.

## Folder Structure

```
lern/
├── src/
│   ├── app/                          # Next.js App Router (routes only)
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (marketing)/              # Public pages
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── about/
│   │   │   ├── features/
│   │   │   └── pricing/
│   │   ├── (dashboard)/              # Protected dashboard pages
│   │   │   ├── chat/
│   │   │   │   └── page.tsx
│   │   │   ├── notes/
│   │   │   ├── overview/
│   │   │   └── settings/
│   │   ├── api/                      # API Routes
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   ├── notes/
│   │   │   └── ai/generate/
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── features/                     # Feature modules (self-contained)
│   │   ├── chat/
│   │   │   ├── components/           # Feature-specific components
│   │   │   │   ├── ChatEmptyState.tsx
│   │   │   │   ├── ChatInputArea.tsx
│   │   │   │   ├── ChatMessageList.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                # Feature-specific hooks
│   │   │   │   └── useConversations.ts
│   │   │   ├── context/              # Feature contexts
│   │   │   │   └── ChatContext.tsx
│   │   │   ├── services/             # Feature business logic
│   │   │   │   └── chatService.ts
│   │   │   ├── types.ts              # Feature-specific types
│   │   │   ├── styles.ts             # Feature-specific styles
│   │   │   └── index.ts              # Public API exports
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── context/
│   │   │   │   └── AuthContext.tsx
│   │   │   ├── services/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── notes/                    # Future feature
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       ├── types.ts
│   │       └── index.ts
│   │
│   ├── components/                   # Shared components
│   │   ├── ui/                       # Generic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── navConfig.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── shared/                   # Shared utility components
│   │       ├── Markdown.tsx
│   │       ├── decrypted-text.tsx
│   │       ├── rotating-text.tsx
│   │       ├── ShinyText.tsx
│   │       └── styles/
│   │
│   │   └── marketing/                # Marketing components
│   │       ├── Hero.tsx
│   │       ├── Feature1.tsx
│   │       ├── Feature2.tsx
│   │       ├── CardStack.tsx
│   │       ├── Footer.tsx
│   │       └── Header.tsx
│   │
│   ├── lib/                          # Shared utilities & configs
│   │   ├── api/                      # API clients
│   │   │   ├── api-client.ts
│   │   │   └── server-client.ts
│   │   │
│   │   ├── services/                 # External service integrations
│   │   │   ├── firebase/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── config.ts
│   │   │   │   └── firestore.ts
│   │   │   └── ai/
│   │   │       └── groqClient.ts
│   │   │
│   │   ├── utils/                    # Utility functions
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   │
│   │   └── constants.ts
│   │
│   ├── hooks/                        # Global shared hooks only
│   │   ├── useMediaQuery.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   │
│   ├── store/                        # State management (Zustand)
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── notesSlice.ts
│   │   │   └── chatSlice.ts
│   │   └── index.ts
│   │
│   ├── types/                        # Global shared types only
│   │   ├── api.ts
│   │   ├── index.ts
│   │   └── shared/
│   │       └── components.ts
│   │
│   ├── theme/                        # Theme configuration
│   │   ├── index.tsx
│   │   ├── palette.ts
│   │   └── typography.ts
│   │
│   └── styles/                       # Global styles
│       └── themes/
│
├── config/
│   ├── site.ts                       # Site metadata
│   └── env.ts                        # Environment validation
│
├── public/
│   ├── images/                       # All images organized here
│   ├── icons/
│   └── fonts/
│
├── tsconfig.json                     # Path aliases configured
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

## Key Features

### 1. Path Aliases

Configured in `tsconfig.json`:

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

### Importing Feature Components

```typescript
import {
  ChatEmptyState,
  ChatMessageList,
  ChatInputArea,
} from '@/features/chat';
import { useChatContext } from '@/features/chat';
import { useConversations } from '@/features/chat';
```

### Importing Shared Components

```typescript
import { DashboardLayout } from '@/components/layout';
import { Markdown } from '@/components/shared/Markdown';
```

### Using State Management

```typescript
import { useAuth, useNotes } from '@/store';

const { user, login } = useAuth();
const { notes, addNote } = useNotes();
```

### Using Utilities

```typescript
import { formatDate } from '@/lib/utils/formatters';
import { validateEmail } from '@/lib/utils/validators';
import { AI_MODELS } from '@/lib/constants';
```

### API Client

```typescript
import apiClient from '@/lib/api/api-client';
import { conversationAPI } from '@/lib/api/server-client';

const notes = await apiClient.get('/notes');
const chat = await apiClient.post('/chat', { message, model });
const conversations = await conversationAPI.list();
```

## Adding New Features

### 1. Create Feature Module

```
src/features/new-feature/
├── components/
│   └── NewFeatureComponent.tsx
├── hooks/
│   └── useNewFeature.ts
├── services/
│   └── newFeatureService.ts
├── context/
│   └── NewFeatureContext.tsx
├── types.ts
├── styles.ts
└── index.ts
```

### 2. Add Route

```
src/app/(dashboard)/new-feature/
└── page.tsx
```

### 3. Add API Endpoint

```
src/app/api/new-feature/
└── route.ts
```

### 4. Add State Slice (if needed)

```typescript
// src/store/slices/newFeatureSlice.ts
export const createNewFeatureSlice = (set, get) => ({
  // state and actions
});
```

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Add your API keys and configuration
3. Update `config/env.ts` if you add required variables

## Best Practices

1. **Keep components small** - Single responsibility
2. **Use feature folders** - Feature-specific code stays together
3. **Leverage path aliases** - Cleaner imports
4. **Centralize utilities** - Reusable functions in `lib/utils`
5. **Type your code** - Use TypeScript for better IDE support
6. **Follow naming conventions** - PascalCase for components, camelCase for
   utilities
7. **Feature self-containment** - Each feature should be self-contained with its
   own components, hooks, services, and types

## Architecture Principles

1. **Feature Self-Containment**: Each feature in `src/features/` contains all
   its components, hooks, services, types, and styles
2. **Clear Separation**: Shared code in `src/components/`, `src/lib/`,
   `src/hooks/`; feature code in `src/features/`
3. **Scalability**: Easy to add new features by creating a new folder in
   `src/features/`
4. **Consistency**: All features follow the same internal structure
5. **Route Pages Stay Thin**: Pages in `src/app/` should only compose features,
   not contain business logic

## Migration Notes

- Old `src/app/features/chat/*` → Now `src/features/chat/`
- Old `src/layouts/dashboard/*` → Now `src/components/layout/`
- Old `src/lib/api-client.ts` → Now `src/lib/api/api-client.ts`
- Old `src/lib/server-client.ts` → Now `src/lib/api/server-client.ts`
- Old `src/lib/groqClient.ts` → Now `src/lib/services/ai/groqClient.ts`
- Old `src/lib/firebase/*` → Now `src/lib/services/firebase/`
- Old `src/hooks/useConversations.ts` → Now
  `src/features/chat/hooks/useConversations.ts`
