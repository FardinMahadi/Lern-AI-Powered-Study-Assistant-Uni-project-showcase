# Full Stack Integration Guide

Complete guide to running the full Lern application (frontend + backend).

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  - React + Material-UI                                      │
│  - Firebase Auth                                            │
│  - Groq AI Integration                                      │
│  - Real-time Chat                                           │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Express.js)                      │
│  - Conversation Management                                  │
│  - Message Storage                                          │
│  - Firebase Integration                                     │
│  - Tier-based Access Control                                │
└────────────────────────┬────────────────────────────────────┘
                         │ SQL
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   Database (PostgreSQL)                      │
│  - Users, Conversations, Messages                           │
│  - Indexed for Performance                                  │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Firebase Project
- Groq API Key
- Git

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/lern.git
cd lern
```

### 2. Frontend Setup

```bash
# Install dependencies
pnpm install

# Create .env.local
cat > .env.local << EOF
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development
EOF
```

### 3. Backend Setup

```bash
cd src/server

# Install dependencies
npm install

# Create .env.local
cat > .env.local << EOF
DATABASE_URL="postgresql://lern_user:password@localhost:5432/lern_db"
PORT=3001
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FRONTEND_URL=http://localhost:3000
EOF

# Setup database
npm run migrate
npm run generate
```

### 4. Database Setup

#### Option A: Docker (Recommended)

```bash
# In server directory
docker-compose up -d

# This starts PostgreSQL on localhost:5432
```

#### Option B: Local PostgreSQL

```bash
# macOS
brew install postgresql
brew services start postgresql
createdb lern_db

# Linux
sudo apt-get install postgresql
sudo -u postgres createdb lern_db
```

## Running Development

### Terminal 1: Frontend

```bash
cd lern
pnpm dev
```

Frontend runs at `http://localhost:3000`

### Terminal 2: Backend

```bash
cd src/server
npm run dev
```

Backend runs at `http://localhost:3001`

### Verify Setup

```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:3001/health
```

## Project Structure

````
lern/
├── src/
│   ├── app/
│   │   ├── (dashboard)/      # Dashboard pages
│   │   ├── (marketing)/      # Marketing pages
│   │   ├── api/              # API routes
│   │   └── layout.tsx        # Root layout with theme
│   ├── features/
│   │   ├── auth/             # Auth context
│   │   └── chat/             # Chat context
│   ├── components/           # Reusable components
│   ├── layouts/              # Layout components
│   ├── lib/                  # Utilities
│   ├── hooks/                # Custom hooks
│   └── theme/                # MUI theme configuration
├── docs/                     # Documentation
├── public/                   # Static assets
└── src/
    └── server/
        ├── src/
        │   ├── routes/
        │   │   ├── conversations.ts
        │   │   └── messages.ts
        │   └── index.ts
        ├── prisma/
        │   └── schema.prisma
        └── package.json

## Key Features

### 🔐 Authentication

- Firebase Auth with email/password
- Tier-based access control (free, pro, advanced)
- Protected API routes

### 💬 Chat System

- Real-time messaging
- Multiple AI model support (via Groq)
- Markdown rendering
- Auto-sidebar hiding on long conversations

### 📊 Conversation Management

- Persistent storage
- Search functionality
- Conversation history
- Message metadata

### 🎨 UI/UX

- Material-UI components
- Dark/light mode
- Responsive design
- Smooth animations

## Data Flow

### Creating a Conversation

1. User clicks "New Chat"
2. Frontend: Creates conversation via `/api/conversations`
3. Backend: Creates Conversation record in DB
4. Returns conversation ID to frontend
5. Frontend: Loads chat interface

### Sending a Message

1. User types and sends message
2. Frontend: Calls `/chat` (local) to get AI response
3. Groq API processes request
4. Frontend: Shows user message
5. Frontend: Saves both messages to server via `/api/messages`
6. Backend: Stores in PostgreSQL
7. Both messages persist for history

### Fetching History

1. User returns to app
2. Frontend: Calls `/api/conversations`
3. Backend: Returns all user conversations
4. User selects conversation
5. Frontend: Calls `/api/messages/conversation/:id`
6. Backend: Returns all messages
7. Chat history displayed

## Configuration

### Environment Variables

#### Frontend (.env.local)

```bash
# AI Provider
GROQ_API_KEY=your_key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender
NEXT_PUBLIC_FIREBASE_APP_ID=app_id

# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Environment
NODE_ENV=development
````

#### Backend (.env.local)

```bash
# Database
DATABASE_URL=postgresql://...

# Server
PORT=3001
NODE_ENV=development

# Firebase
FIREBASE_PROJECT_ID=project
FIREBASE_PRIVATE_KEY=key
FIREBASE_CLIENT_EMAIL=email

# CORS
FRONTEND_URL=http://localhost:3000
```

## Development Workflow

### Making Changes

1. Create feature branch
2. Make changes in src/ or server/src/
3. Test locally
4. Run linting

```bash
# Frontend
pnpm lint
pnpm format

# Backend
npm run lint
npm run format
```

5. Commit and push
6. Create pull request

### Database Changes

```bash
# After modifying prisma/schema.prisma
npm run migrate

# Review changes
npm run studio
```

## Deployment

### Frontend (Vercel)

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# Set environment variables in Vercel dashboard
```

### Backend (Railway/Render)

```bash
# Connect GitHub repo to Railway/Render
# Set environment variables in dashboard
# Auto-deploys on push
```

### Database (AWS RDS)

```bash
# Create RDS PostgreSQL instance
# Update DATABASE_URL in backend
# Run migrations
```

## Monitoring

### Frontend

```bash
# Build stats
pnpm build

# Check performance
# Use Chrome DevTools
```

### Backend

```bash
# Logs
npm run dev

# Database health
npm run studio

# API health
curl http://localhost:3001/health
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Test connection
psql postgresql://user:password@localhost:5432/lern_db
```

### Firebase Auth Errors

- Verify credentials
- Check token format
- Ensure CORS URL matches

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

## Performance Tips

1. **Database**: Index frequently queried columns
2. **Frontend**: Use React.memo for expensive components
3. **Backend**: Implement caching for frequent queries
4. **API**: Paginate conversation lists

## Security

- ✅ Firebase Auth protection
- ✅ Token verification on backend
- ✅ SQL injection prevention (Prisma)
- ✅ CORS configured
- ✅ Environment variables protected
- ✅ Tier-based rate limiting

## Next Steps

- [ ] Set up monitoring/logging
- [ ] Implement WebSocket for real-time updates
- [ ] Add file upload support
- [ ] Create admin dashboard
- [ ] Implement analytics

## Support

- Documentation: `/docs`
- Issues: Create GitHub issue
- Email: support@example.com

## License

MIT
