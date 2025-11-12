# Server Setup Instructions

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Firebase project with admin credentials

## Step 1: Install Dependencies

```bash
cd src/server
npm install
```

## Step 2: Environment Variables

Create `.env.local` file:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lern_db"

# Server
PORT=3001
NODE_ENV=development

# Firebase Admin SDK (get from Firebase Console > Project Settings > Service Accounts)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com

# CORS
FRONTEND_URL=http://localhost:3000
```

## Step 3: Database Setup

### Option A: Using Docker (Recommended)

Create `docker-compose.yml`:

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: lern_db
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run:

```bash
docker-compose up -d
```

### Option B: Local PostgreSQL

```bash
# macOS
brew install postgresql
brew services start postgresql
createdb lern_db

# Linux
sudo apt-get install postgresql
sudo -u postgres createdb lern_db
```

## Step 4: Run Migrations

```bash
npm run migrate
```

This will:

- Generate Prisma client
- Create database tables
- Set up indexes

## Step 5: Start Development Server

```bash
npm run dev
```

Server will run at `http://localhost:3001`

## API Endpoints

### Conversations

- `GET /api/conversations` - List all conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/:id` - Get conversation with messages
- `PUT /api/conversations/:id` - Update title
- `DELETE /api/conversations/:id` - Delete conversation

### Messages

- `POST /api/messages` - Add message
- `GET /api/messages/conversation/:id` - Get messages
- `DELETE /api/messages/:id` - Delete message

### Health Check

- `GET /health` - Server health status

## Authentication

All endpoints except `/health` require Firebase token:

```bash
Authorization: Bearer <firebase_id_token>
```

## Troubleshooting

### Database Connection Error

```bash
# Test connection
psql postgresql://user:password@localhost:5432/lern_db

# Check PostgreSQL status
pg_isready -h localhost -p 5432
```

### Firebase Auth Error

- Verify `.env.local` has correct Firebase credentials
- Ensure FIREBASE_PRIVATE_KEY has newlines: `\n`
- Check Firebase console for service account

### Prisma Issues

```bash
# Regenerate client
npm run generate

# Reset database (development only)
npx prisma migrate reset

# View database
npm run studio
```

## Production Deployment

### Build

```bash
npm run build
```

### Start

```bash
npm start
```

### Environment

Set production variables in your deployment platform:

- Railway: Variables tab
- Render: Environment section
- AWS EC2: `.env` file or systemd service

## Database Backup

```bash
# Export database
pg_dump postgresql://user:password@localhost:5432/lern_db > backup.sql

# Import database
psql postgresql://user:password@localhost:5432/lern_db < backup.sql
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Create `.env.local`
3. ✅ Start PostgreSQL
4. ✅ Run migrations
5. ✅ Start development server
6. Connect frontend to `http://localhost:3001/api`
