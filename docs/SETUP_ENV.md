# Environment Variables Setup Guide

## ⚠️ Firebase Environment Variables Missing

If you see the error:

```
Error: Firebase environment variables are missing: NEXT_PUBLIC_FIREBASE_API_KEY,
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID,
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
NEXT_PUBLIC_FIREBASE_APP_ID. Please populate them in your environment.
```

Follow these steps:

---

## Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select or create your project
3. Click the **⚙️ Settings** icon → **Project Settings**
4. Go to the **Your apps** section
5. Find or create a **Web** app
6. Copy the Firebase SDK configuration object

---

## Step 2: Create `.env.local`

In the project root (`E:\Development\Projects\Web\Project-Showcase\lern\`), create a `.env.local` file:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123...

# Groq API (Get from https://console.groq.com/keys)
GROQ_API_KEY=gsk_...

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Environment
NODE_ENV=development
```

---

## Step 3: Map Firebase Configuration

Your Firebase SDK config looks like:

```javascript
{
  apiKey: "AIzaSyD...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
}
```

Map to environment variables:
| Firebase Field | Environment Variable |
|---|---|
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID` |

---

## Step 4: Get Groq API Key

1. Go to [Groq Console](https://console.groq.com/keys)
2. Create a new API key
3. Copy and paste into `.env.local` as `GROQ_API_KEY`

---

## Step 5: Restart Development Server

```bash
# Kill existing process
# Then restart
pnpm dev
```

---

## ✅ Verification

After setting up, you should see:

- ✅ App loads without Firebase errors
- ✅ Can sign up/login with email/password
- ✅ Chat works with Groq AI
- ✅ Dark/light mode toggle works

---

## 🔒 Important Notes

### Never Commit `.env.local`

This file is in `.gitignore` to prevent exposing secrets.

### Public vs Private

- `NEXT_PUBLIC_*` - Safe to expose (frontend)
- `GROQ_API_KEY` - Backend only, should NOT be `NEXT_PUBLIC_`

### Local Development Only

These variables are for local development. For production:

- Use your hosting platform's environment variable settings (Vercel, Netlify, etc.)
- Never hardcode secrets
- Use separate credentials per environment

---

## 📋 Checklist

- [ ] Firebase project created
- [ ] Web app registered in Firebase
- [ ] `.env.local` file created
- [ ] All 6 Firebase variables filled in
- [ ] Groq API key added
- [ ] Development server restarted
- [ ] App loads without errors
- [ ] Can sign up with email/password
- [ ] Chat responds with AI

---

## Troubleshooting

### Error: "Firebase environment variables are missing"

- Check `.env.local` exists in project root
- Verify all NEXT*PUBLIC_FIREBASE*\* variables are set
- Restart development server
- Check for typos in variable names (must match exactly)

### Error: "Cannot read property 'auth' of undefined"

- Firebase config is null
- Check if all variables are correctly set
- Verify no trailing/leading spaces in values

### Chat not responding

- Verify `GROQ_API_KEY` is set
- Check Groq API key is valid
- Ensure `NEXT_PUBLIC_API_URL` points to correct backend

### Sign in not working

- Verify Firebase Auth is enabled
- Check Email/Password provider is enabled in Firebase Console
- Verify Firebase config is correct

---

## File Structure

```
lern/
├── .env.local           ← CREATE THIS (local only, not in git)
├── .gitignore           ← Already ignores .env.local
└── src/
    ├── lib/firebase/config.ts  ← Reads env variables
    └── ...
```

---

**Status**: Follow this guide to get your app running! 🚀
