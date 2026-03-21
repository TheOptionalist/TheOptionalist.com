# Vercel Deploy Checklist

Use these settings when deploying this repo on Vercel so auth and server routes do not fail.

## Project setup

- Framework Preset: `Next.js`
- Root Directory: `.`
- Install Command: leave default
- Build Command: `npm run build`
- Output Directory: leave default
- Node.js Version: `20.x`

## Required environment variables

Add these in Vercel Project Settings -> Environment Variables for Production, Preview, and Development as needed:

### Firebase client

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`

### Firebase admin

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `ADMIN_TOKEN`

### Optional Google Drive sync

- `GOOGLE_DRIVE_PROJECT_ID`
- `GOOGLE_DRIVE_CLIENT_EMAIL`
- `GOOGLE_DRIVE_PRIVATE_KEY`

## Important note

- `FIREBASE_PRIVATE_KEY` and `GOOGLE_DRIVE_PRIVATE_KEY` should be pasted with escaped newlines, for example `\n`.
- The production site runs from the Next app. Static root files like `index.html` are not the primary deployment entry on Vercel.

## Safe deploy flow

1. Push code to GitHub.
2. Import the repo into Vercel.
3. Add the env vars above.
4. Trigger a fresh deploy.
5. Open `/login` and `/account` only after env vars are present.
