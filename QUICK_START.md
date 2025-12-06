# Quick Start Guide - AI Crop Advisor

## 🔗 Your Project Links

- **Vercel Dashboard**: https://vercel.com/prime-r-ss-projects/crop-advisor
- **GitHub Repository**: https://github.com/Prime2605/Crop-Advisor
- **Live Site**: https://crop-advisor-nine.vercel.app

## ⚡ Quick Setup (5 Minutes)

### 1. Configure Environment Variables in Vercel

**📍 Location**: https://vercel.com/prime-r-ss-projects/crop-advisor → Settings → Environment Variables

Add these variables:

```
WINDY_POINT_API_KEY = n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_API_KEY = n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_MAP_API_KEY = n0HATHjcJTliIOKd3jXeCm440JutQdSN
SUPABASE_URL = https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
NODE_ENV = production
```

**Select all environments** (Production, Preview, Development) for each variable.

📖 **Detailed Instructions**: See [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)

### 2. Set Up Supabase Database

1. Go to: https://tpmpjkfmkdbukusgarkr.supabase.co
2. Click **SQL Editor** → **New Query**
3. Copy and paste contents of `backend/supabase-schema.sql`
4. Click **Run**

📖 **Detailed Instructions**: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 3. Redeploy in Vercel

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**

### 4. Verify Deployment

Test your API:
```bash
curl https://your-backend.vercel.app/api/health
```

Should return: `{"status":"ok",...}`

## 📁 Local Development

### Backend
```bash
cd backend
npm install
cp env.example .env  # Edit .env with your values
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## ✅ Checklist

- [ ] Environment variables added in Vercel
- [ ] Supabase database tables created
- [ ] Project redeployed in Vercel
- [ ] Health check endpoint works
- [ ] Frontend loads correctly

## 🆘 Need Help?

- **Environment Variables**: [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)
- **Database Setup**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Full Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)

