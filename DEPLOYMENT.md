# Deployment Guide - AI Crop Advisor

## 🔗 Your Deployment Links

- **Vercel Dashboard**: https://vercel.com/prime-r-ss-projects/crop-advisor
- **GitHub Repository**: https://github.com/Prime2605/Crop-Advisor
- **Live Site**: https://crop-advisor-nine.vercel.app

## 📍 Environment Variables Setup

**⚠️ IMPORTANT**: Before deploying, configure environment variables in Vercel.

**See [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) for detailed step-by-step instructions on where to add environment variables in your Vercel dashboard.**

### Quick Reference - Environment Variables:

Go to **Vercel Dashboard → Settings → Environment Variables** and add:

```
WINDY_POINT_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
SUPABASE_URL=https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
NODE_ENV=production
```

## Vercel Deployment Instructions

### Prerequisites
1. GitHub/GitLab/Bitbucket account
2. Vercel account (sign up at https://vercel.com)
3. Supabase account (for production database) - Already configured!

### Step 1: Prepare Your Repository

1. Push your code to a Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Crop Advisor with database and dashboard"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Set Up Supabase Database

1. Go to your Supabase project: https://tpmpjkfmkdbukusgarkr.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `backend/supabase-schema.sql`
5. Click **Run** to execute the SQL

This will create all necessary tables. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

### Step 3: Deploy Backend to Vercel

1. Go to https://vercel.com and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables in Vercel:
   - Go to **Settings** → **Environment Variables** in your Vercel project
   - Add all variables listed in the Quick Reference above
   - Select all environments (Production, Preview, Development) for each variable
   - See [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) for detailed instructions

6. Deploy!

### Step 4: Deploy Frontend to Vercel

1. Create a new Vercel project for the frontend
2. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. Add Environment Variables:
   - `VITE_API_URL`: Your backend Vercel URL (e.g., `https://your-backend.vercel.app`)

4. Update `frontend/vite.config.ts` proxy to point to your backend URL in production

5. Deploy!

### Step 5: Update Frontend API Configuration

After deploying the backend, update the frontend to use the production API:

1. In `frontend/src/services/api.ts`, the API_BASE_URL should use the environment variable
2. Update `frontend/vercel.json` rewrite rules with your actual backend URL

### Alternative: Monorepo Deployment

If you want to deploy both frontend and backend from a single Vercel project:

1. Create a single Vercel project
2. Use the root `vercel.json` configuration
3. Set up build commands for both frontend and backend
4. Configure routes to forward `/api/*` to backend and everything else to frontend

### Environment Variables Summary

#### Backend (Vercel Environment Variables)
```
WINDY_POINT_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
SUPABASE_URL=https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
NODE_ENV=production
```

**📍 Where to Add**: Vercel Dashboard → Your Project → Settings → Environment Variables

#### Frontend (.env)
```
VITE_API_URL=https://your-backend.vercel.app
```

### Post-Deployment Checklist

- [ ] Backend health check: `https://your-backend.vercel.app/api/health`
- [ ] Frontend loads correctly
- [ ] Map displays (check Windy API integration)
- [ ] Weather data fetches successfully
- [ ] Crop recommendations work
- [ ] AI Dashboard loads analytics
- [ ] Database connection works
- [ ] All environment variables are set

### Troubleshooting

#### Backend Issues
- **Database connection errors**: Check MongoDB connection string and IP whitelist
- **API key errors**: Verify Windy API keys are set correctly
- **Build errors**: Check Node.js version (should be 18+)

#### Frontend Issues
- **API calls failing**: Check CORS settings and API URL configuration
- **Map not loading**: Verify Windy Map API script is loading
- **Build errors**: Check for TypeScript errors with `npm run type-check`

### Local Development

For local development, you can run both servers:

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

The frontend will proxy API requests to `http://localhost:3001` automatically.

### Database Setup (Local)

If using local MongoDB:

```bash
# Install MongoDB (if not already installed)
# macOS: brew install mongodb-community
# Windows: Download from mongodb.com
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod

# The app will connect automatically to mongodb://localhost:27017/crop-advisor
```

### Next Steps

1. Set up MongoDB indexes for better performance
2. Add authentication if needed
3. Set up monitoring and error tracking (e.g., Sentry)
4. Configure custom domain
5. Set up CI/CD pipelines
6. Add rate limiting for API endpoints

