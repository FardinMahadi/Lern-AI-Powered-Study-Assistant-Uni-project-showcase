# CI/CD Workflow Setup

This repository uses GitHub Actions for continuous integration and deployment to
Vercel.

## Workflow Overview

The CI/CD pipeline runs on:

- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

### Quality Checks Job

Runs the following checks:

1. **TypeScript type checking** - Validates TypeScript types
2. **ESLint** - Lints code for errors and style issues
3. **Prettier format check** - Ensures code is properly formatted
4. **Build** - Builds the Next.js application

### Deployment Job

Deploys to Vercel production only when:

- All quality checks pass
- Push is to `main` or `master` branch (not PRs)

## Required GitHub Secrets

To enable Vercel deployment, configure the following secrets in your GitHub
repository:

### Vercel Secrets

1. **VERCEL_TOKEN**
   - Get from: https://vercel.com/account/tokens
   - Create a new token with appropriate permissions

2. **VERCEL_ORG_ID**
   - Get from: Vercel dashboard → Settings → General
   - Or run: `vercel whoami` and check your account settings

3. **VERCEL_PROJECT_ID** (Optional but recommended)
   - Get from: Vercel project settings → General
   - Or run: `vercel link` in your project directory

### Environment Variables (Optional for CI)

If you want to run builds with actual environment variables in CI (instead of
dummy values), add these secrets:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `GROQ_API_KEY`

**Note:** For production deployments, these should be configured in the Vercel
dashboard under Project Settings → Environment Variables.

## How to Add Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with its corresponding value
5. Click **Add secret**

## Workflow Status

You can view the workflow status:

- In the **Actions** tab of your GitHub repository
- As status badges on pull requests
- In the repository's main page (if configured)

## Troubleshooting

### Build fails in CI but works locally

- Check that all environment variables are set in Vercel dashboard
- Verify Node.js version matches (workflow uses Node 20)
- Ensure `pnpm-lock.yaml` is committed to the repository

### Deployment fails

- Verify `VERCEL_TOKEN` has correct permissions
- Check that `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct
- Ensure the project is linked to Vercel: `vercel link`

### TypeScript errors

- Run `pnpm exec tsc --noEmit` locally to reproduce
- Fix type errors before pushing
