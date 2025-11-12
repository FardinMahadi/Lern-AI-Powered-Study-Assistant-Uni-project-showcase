# Lern Backend Server

Node.js + Express backend for Lern featuring conversation storage with PostgreSQL and Firebase authentication.

## Features

- 🗄️ Conversation persistence with PostgreSQL
- 🔐 Firebase authentication integration
- 📊 Tier-based rate limiting (free: 5 convos, pro: 50, advanced: unlimited)
- 📝 Message storage with metadata (token counts, latency, etc.)
- 🚀 TypeScript with strict mode
- 📚 Prisma ORM for database management

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Firebase project with admin credentials

## Setup

### 1. Install Dependencies

```bash
cd src/server
npm install
```

### 2. Configure Environment

Create `.env.local`:

```bash
# Database connection
DATABASE_URL="postgresql://user:password@localhost:5432/lern_db"

# Server
PORT=3001
NODE_ENV=development

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# CORS
FRONTEND_URL=http://localhost:3000
```

### 3. Setup Database

```bash
# Create and run migrations
npm run migrate

# (Optional) View database in studio
npm run studio
```

### 4. Generate Prisma Client

```bash
npm run generate
```

## Development

```bash
npm run dev
```

Server runs at `http://localhost:3001`

## Production Build

```bash
npm run build
npm start
```

## API Routes

### Conversations

- `GET /api/conversations` - List all user conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id` - Get conversation with messages
- `PUT /api/conversations/:id` - Update conversation title
- `DELETE /api/conversations/:id` - Delete conversation

### Messages

- `POST /api/messages` - Add message to conversation
- `GET /api/messages/conversation/:conversationId` - Get all messages
- `DELETE /api/messages/:id` - Delete message

All routes require Firebase auth token in `Authorization: Bearer <token>` header.

## Database Schema

### User

- `id` - Primary key
- `uid` - Firebase UID (unique)
- `email` - Email address
- `tier` - Subscription tier (free, pro, advanced)
- `displayName` - Optional display name
- `photoURL` - Optional profile photo
- `createdAt`, `updatedAt` - Timestamps

### Conversation

- `id` - Primary key
- `title` - Conversation title
- `model` - AI model used
- `userId` - Foreign key to User
- `createdAt`, `updatedAt` - Timestamps

### Message

- `id` - Primary key
- `role` - "user" or "assistant"
- `content` - Message text
- `conversationId` - Foreign key to Conversation
- `metadata` - JSON object for token counts, latency, etc.
- `createdAt` - Timestamp

## Tier Limits

| Tier     | Limit            |
| -------- | ---------------- |
| Free     | 5 conversations  |
| Pro      | 50 conversations |
| Advanced | Unlimited        |

## Deployment

### Using Docker

```bash
docker build -t lern-server .
docker run -p 3001:3001 --env-file .env.local lern-server
```

### Using Railway/Render

1. Push to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy

## Contributing

1. Create feature branch
2. Make changes
3. Run `npm run lint && npm run format`
4. Test thoroughly
5. Submit PR

## License

MIT
