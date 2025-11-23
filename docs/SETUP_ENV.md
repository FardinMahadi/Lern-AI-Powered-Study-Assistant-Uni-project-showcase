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

In the project root (`E:\Development\Projects\Web\Project-Showcase\lern\`),
create a `.env.local` file:

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

Map to environment variables: | Firebase Field | Environment Variable |
|---|---| | `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` | | `authDomain` |
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | | `projectId` |
`NEXT_PUBLIC_FIREBASE_PROJECT_ID` | | `storageBucket` |
`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | | `messagingSenderId` |
`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | | `appId` |
`NEXT_PUBLIC_FIREBASE_APP_ID` |

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

### Local Development vs Production

**Local Development:**

- Use `.env.local` file (as described above)
- Never commit this file to git

**Production (Vercel):**

- Configure environment variables in Vercel dashboard
- Go to: Project Settings → Environment Variables
- Add all the same variables (Firebase + Groq API key)
- Set for Production, Preview, and Development environments as needed

**CI/CD (GitHub Actions):**

- See [CI_CD_SETUP.md](./CI_CD_SETUP.md) for GitHub secrets configuration
- CI workflow uses dummy values for build, actual deployment uses Vercel env
  vars

---

## 📋 Checklist

### Local Development

- [ ] Firebase project created
- [ ] Web app registered in Firebase
- [ ] `.env.local` file created
- [ ] All 6 Firebase variables filled in
- [ ] Groq API key added
- [ ] Development server restarted
- [ ] App loads without errors
- [ ] Can sign up with email/password
- [ ] Chat responds with AI

### Production Deployment

- [ ] Vercel project created and linked
- [ ] Environment variables configured in Vercel dashboard
- [ ] All Firebase variables added to Vercel
- [ ] Groq API key added to Vercel
- [ ] GitHub secrets configured (for CI/CD)
  - [ ] `VERCEL_TOKEN` added to GitHub secrets
  - [ ] `VERCEL_ORG_ID` added to GitHub secrets
  - [ ] `VERCEL_PROJECT_ID` added to GitHub secrets (optional)
- [ ] CI/CD workflow runs successfully
- [ ] Production deployment works

> 📖 **For detailed CI/CD setup**, see [CI_CD_SETUP.md](./CI_CD_SETUP.md)

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

## Environment Variables Summary

### Required Variables

| Variable                                   | Description                  | Where to Set                                    |
| ------------------------------------------ | ---------------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase API key             | `.env.local`, Vercel, GitHub Secrets (optional) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         | `.env.local`, Vercel, GitHub Secrets (optional) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID          | `.env.local`, Vercel, GitHub Secrets (optional) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      | `.env.local`, Vercel, GitHub Secrets (optional) |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | `.env.local`, Vercel, GitHub Secrets (optional) |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID              | `.env.local`, Vercel, GitHub Secrets (optional) |
| `GROQ_API_KEY`                             | Groq AI API key              | `.env.local`, Vercel                            |
| `NEXT_PUBLIC_API_URL`                      | Backend API URL              | `.env.local`, Vercel                            |

### CI/CD Secrets (GitHub Actions)

| Secret              | Description                 | Required    |
| ------------------- | --------------------------- | ----------- |
| `VERCEL_TOKEN`      | Vercel authentication token | ✅ Yes      |
| `VERCEL_ORG_ID`     | Vercel organization/team ID | ✅ Yes      |
| `VERCEL_PROJECT_ID` | Vercel project ID           | ⚠️ Optional |

> **Note:** Environment variables for builds can be added as GitHub secrets, but
> production deployments should use Vercel's environment variables.

## File Structure

```
lern/
├── .env.local           ← CREATE THIS (local only, not in git)
├── .gitignore           ← Already ignores .env.local
├── .github/
│   └── workflows/
│       └── ci.yml       ← CI/CD workflow
├── docs/
│   ├── SETUP_ENV.md     ← This file
│   └── CI_CD_SETUP.md  ← CI/CD setup guide
└── src/
    ├── lib/firebase/config.ts  ← Reads env variables
    └── ...
```

---

## 🚀 Next Steps

1. **Local Development**: Follow the steps above to set up `.env.local`
2. **Production Deployment**:
   - Configure environment variables in Vercel dashboard
   - See [CI_CD_SETUP.md](./CI_CD_SETUP.md) for GitHub Actions setup
3. **CI/CD**: Set up GitHub secrets for automated deployments

**Status**: Follow this guide to get your app running! 🚀
