# Server Setup Guide

Complete guide to setting up the Node.js/PostgreSQL backend for Lern.

## Overview

The backend provides:

- Conversation persistence
- Message storage
- Firebase authentication
- Tier-based access control
- RESTful API for frontend communication

## Quick Start

### 1. Database Setup

#### Local PostgreSQL Setup

```bash
# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Create database
createdb lern_db

# Create user (optional)
createuser -P lern_user
```

#### Docker Compose (Recommended)

Create `server/docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: lern_db
      POSTGRES_USER: lern_user
      POSTGRES_PASSWORD: secure_password
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  adminer:
    image: adminer
    ports:
      - '8080:8080'
    depends_on:
      - postgres

volumes:
  postgres_data:
```

Start with:

```bash
docker-compose up -d
```

### 2. Environment Configuration

Create `src/server/.env.local`:

```bash
# Database (adjust for your setup)
DATABASE_URL="postgresql://lern_user:secure_password@localhost:5432/lern_db"

# Server
PORT=3001
NODE_ENV=development

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# CORS
FRONTEND_URL=http://localhost:3000
```

#### Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Copy the JSON and extract the credentials

### 3. Install Dependencies

```bash
cd src/server
npm install
# or
pnpm install
```

### 4. Database Migrations

```bash
# Create Prisma migration
npm run migrate

# View database in Prisma Studio
npm run studio
```

### 5. Start Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3001`

## Frontend Integration

### 1. Environment Setup

In frontend `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. Using Server API

#### Example: Create Conversation

```typescript
import { conversationAPI } from '@/lib/server-client';

const conversation = await conversationAPI.create({
  title: 'Physics Homework',
  model: 'llama-3.1-70b-versatile',
});
```

#### Example: Add Message

```typescript
import { messageAPI } from '@/lib/server-client';

const message = await messageAPI.create({
  conversationId: 'conv_123',
  role: 'user',
  content: 'What is quantum computing?',
});
```

#### Example: Fetch Conversations

```typescript
const hook = useConversations();

useEffect(() => {
  hook.fetchConversations();
}, []);

return (
  <div>
    {hook.conversations.map((conv) => (
      <div key={conv.id}>{conv.title}</div>
    ))}
  </div>
);
```

## Database Schema

### User Table

```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  uid VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  tier VARCHAR(50) DEFAULT 'free',
  displayName VARCHAR(255),
  photoURL VARCHAR(500),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Conversation Table

```sql
CREATE TABLE conversations (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'New Conversation',
  model VARCHAR(255) NOT NULL,
  userId VARCHAR(255) NOT NULL REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Message Table

```sql
CREATE TABLE messages (
  id VARCHAR(255) PRIMARY KEY,
  role VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  conversationId VARCHAR(255) NOT NULL REFERENCES conversations(id),
  metadata JSONB DEFAULT '{}',
  createdAt TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication

All endpoints require `Authorization: Bearer <firebase_token>` header.

### Conversations

| Method | Endpoint                 | Description                    |
| ------ | ------------------------ | ------------------------------ |
| GET    | `/api/conversations`     | List all user conversations    |
| POST   | `/api/conversations`     | Create new conversation        |
| GET    | `/api/conversations/:id` | Get conversation with messages |
| PUT    | `/api/conversations/:id` | Update conversation            |
| DELETE | `/api/conversations/:id` | Delete conversation            |

### Messages

| Method | Endpoint                         | Description                 |
| ------ | -------------------------------- | --------------------------- |
| POST   | `/api/messages`                  | Add message to conversation |
| GET    | `/api/messages/conversation/:id` | Get all messages            |
| DELETE | `/api/messages/:id`              | Delete message              |

## Tier Limits

| Feature         | Free    | Pro     | Advanced  |
| --------------- | ------- | ------- | --------- |
| Conversations   | 5       | 50      | Unlimited |
| Message History | 30 days | 90 days | Unlimited |
| Export          | No      | Yes     | Yes       |

## Deployment

### Railway

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

### Render

1. Create new Web Service from GitHub
2. Configure environment variables
3. Deploy

### AWS EC2

```bash
# Connect to instance
ssh -i key.pem ubuntu@instance-ip

# Install Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone your-repo
cd server
npm install
npm run build

# Start with PM2
npm install -g pm2
pm2 start dist/index.js --name "lern-api"
```

### Docker Deployment

```bash
# Build
docker build -t lern-server .

# Run
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://..." \
  -e FIREBASE_PROJECT_ID="..." \
  lern-server
```

## Monitoring

### Health Check

```bash
curl http://localhost:3001/health
```

### Logs

```bash
# Development
npm run dev

# Production
pm2 logs lern-api
```

### Database

```bash
# Prisma Studio
npm run studio

# psql
psql -U lern_user -d lern_db
```

## Troubleshooting

### Connection Issues

```bash
# Test database connection
psql postgresql://lern_user:password@localhost:5432/lern_db

# Check server
curl http://localhost:3001/health
```

### Firebase Auth Errors

- Verify Firebase credentials in `.env.local`
- Check token format in request headers
- Ensure Frontend URL matches CORS settings

### Prisma Issues

```bash
# Regenerate client
npm run generate

# Reset database
npx prisma migrate reset

# Check migrations
npx prisma migrate status
```

## Next Steps

1. ✅ Set up PostgreSQL
2. ✅ Configure Firebase
3. ✅ Run migrations
4. ✅ Start development server
5. 📝 Integrate with frontend
6. 🚀 Deploy to production

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
