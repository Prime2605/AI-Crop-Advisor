# Vercel Environment Variables Setup Guide

This guide shows you exactly where and how to configure environment variables in your Vercel deployment.

## 🔗 Your Deployment Links

- **Vercel Dashboard**: https://vercel.com/prime-r-ss-projects/crop-advisor
- **GitHub Repository**: https://github.com/Prime2605/Crop-Advisor
- **Live Site**: https://crop-advisor-nine.vercel.app

## 📍 Where to Add Environment Variables in Vercel

### Step 1: Access Vercel Project Settings

1. Go to your Vercel dashboard: https://vercel.com/prime-r-ss-projects/crop-advisor
2. Click on your project: **crop-advisor**
3. Click on **Settings** in the top navigation
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add Environment Variables

For **Backend Deployment**, add these variables:

#### Windy API Keys
```
WINDY_POINT_API_KEY = n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_API_KEY = n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_MAP_API_KEY = n0HATHjcJTliIOKd3jXeCm440JutQdSN
```

#### Supabase Configuration
```
SUPABASE_URL = https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
```

#### Server Configuration
```
PORT = 3001
NODE_ENV = production
```

For **Frontend Deployment** (if separate), add:

```
VITE_API_URL = https://your-backend-url.vercel.app
```

### Step 3: Select Environments

For each environment variable, select which environments it applies to:
- ✅ **Production** (for live site)
- ✅ **Preview** (for pull request previews)
- ✅ **Development** (for local development)

**Recommended**: Select all three (Production, Preview, Development) for all variables.

### Step 4: Save and Redeploy

1. Click **Save** after adding each variable
2. Go to **Deployments** tab
3. Click the **⋯** (three dots) menu on the latest deployment
4. Click **Redeploy** to apply the new environment variables

## 🏗️ Project Structure in Vercel

Since your project has both `backend/` and `frontend/` folders, you have two deployment options:

### Option 1: Monorepo Deployment (Recommended)

Deploy both frontend and backend from the same Vercel project:

1. **Root Directory**: Leave empty (or set to `/`)
2. **Build Command**: 
   - For backend: `cd backend && npm install && npm run build`
   - For frontend: `cd frontend && npm install && npm run build`
3. **Output Directory**: 
   - For frontend: `frontend/dist`
   - Backend will be deployed as serverless functions

### Option 2: Separate Deployments

Deploy backend and frontend as separate Vercel projects:

#### Backend Project
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Other

#### Frontend Project
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Vite

## 📝 Environment Variables Checklist

Use this checklist to ensure all variables are set:

### Backend Environment Variables
- [ ] `WINDY_POINT_API_KEY`
- [ ] `WINDY_API_KEY`
- [ ] `WINDY_MAP_API_KEY`
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_KEY`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `PORT` (optional, Vercel assigns automatically)
- [ ] `NODE_ENV` (set to `production`)

### Frontend Environment Variables (if separate)
- [ ] `VITE_API_URL` (your backend Vercel URL)

## 🔍 How to Verify Environment Variables

### In Vercel Dashboard
1. Go to **Settings** → **Environment Variables**
2. Verify all variables are listed
3. Check that they're enabled for the correct environments

### In Deployment Logs
1. Go to **Deployments** tab
2. Click on a deployment
3. Check the build logs for any environment variable errors
4. Look for messages like "✅ Connected to Supabase" in the logs

### Test API Endpoints
After deployment, test these endpoints:
- `https://your-backend.vercel.app/api/health` - Should return status OK
- `https://your-backend.vercel.app/api/weather?lat=50.4&lon=14.3` - Should return weather data

## 🚨 Common Issues

### Issue: Environment variables not loading
**Solution**: 
- Make sure variables are saved in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Issue: Supabase connection errors
**Solution**:
- Verify `SUPABASE_URL` and `SUPABASE_KEY` are correct
- Ensure Supabase tables are created (run `supabase-schema.sql`)
- Check RLS policies allow operations

### Issue: Windy API errors
**Solution**:
- Verify API keys are correct
- Check API key hasn't expired
- Ensure keys are set for all environments (Production, Preview, Development)

## 📸 Visual Guide

### Where to Find Environment Variables in Vercel:

```
Vercel Dashboard
└── Your Project (crop-advisor)
    └── Settings
        └── Environment Variables  ← Click here
            └── Add New
                ├── Key: WINDY_POINT_API_KEY
                ├── Value: n0HATHjcJTliIOKd3jXeCm440JutQdSN
                └── Environments: [✓ Production] [✓ Preview] [✓ Development]
```

## 🔐 Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use Vercel's environment variables** for all secrets
3. **Rotate API keys** periodically
4. **Use different keys** for development and production (if possible)
5. **Review access** - only team members who need access should have it

## 📚 Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase Setup Guide](./SUPABASE_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)

## ✅ Quick Setup Commands

After setting up environment variables in Vercel:

1. **Redeploy your project**:
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

2. **Verify deployment**:
   ```bash
   curl https://your-backend.vercel.app/api/health
   ```

3. **Check logs**:
   - Go to Deployments → Click on deployment → View logs
   - Look for "✅ Connected to Supabase" message

---

**Need Help?** Check the deployment logs in Vercel dashboard or review the [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) guide.

