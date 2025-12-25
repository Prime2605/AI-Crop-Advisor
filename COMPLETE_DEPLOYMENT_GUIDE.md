# 🚀 Complete Vercel Deployment Guide

## Prerequisites
- GitHub account with AI-Crop-Advisor repository
- Vercel account (sign up at https://vercel.com)
- Your API keys ready

---

## Part 1: Frontend Deployment (5 minutes)

### Step 1: Create New Project
1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**

### Step 2: Import Repository
1. Select **"Import Git Repository"**
2. Find and select: **`Prime2605/AI-Crop-Advisor`**
3. Click **"Import"**

### Step 3: Configure Project
**Framework Preset:** Leave as detected (Vite) ✅  
**Root Directory:** Leave as `/` or `.` ✅  
**Build Settings:** Leave default ✅

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. You'll get a URL like: `https://your-app.vercel.app`

**✅ Frontend Done!** Save this URL.

---

## Part 2: Backend Deployment (8 minutes)

### Step 1: Create Second Project
1. Back to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"** again

### Step 2: Import Same Repository
1. Import **`Prime2605/AI-Crop-Advisor`** again
2. Click **"Import"**

### Step 3: Configure Backend Settings
**Important - Override Settings:**

1. **Root Directory:**
   - Click "Edit"
   - Enter: `backend`
   - Click "Save"

2. **Framework Preset:**
   - Select: `Other`

3. **Build Command:** Leave blank

4. **Output Directory:** Leave blank

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

```
GITHUB_MODELS_TOKEN = your_github_token_here
OPENWEATHER_API_KEY = your_openweather_key_here
SUPABASE_URL = your_supabase_url_here
SUPABASE_KEY = your_supabase_key_here
NODE_ENV = production
```

**Where to get these:**
- **GITHUB_MODELS_TOKEN:** From your `.env` file in backend folder
- **OPENWEATHER_API_KEY:** From your `.env` file
- **SUPABASE_URL/KEY:** From your `.env` file

### Step 5: Deploy Backend
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a backend URL like: `https://your-api.vercel.app`

**✅ Backend Done!** Save this URL.

---

## Part 3: Connect Frontend to Backend (3 minutes)

### Step 1: Update Frontend API URL
1. Go to your **frontend** Vercel project
2. Go to **Settings** → **Environment Variables**
3. Add:
   ```
   VITE_API_URL = https://your-backend-url.vercel.app
   ```

### Step 2: Update Frontend Code
In `frontend/src/api/index.ts`, update line 4:
```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

### Step 3: Commit and Push
```bash
git add frontend/src/api/index.ts
git commit -m "Connect frontend to Vercel backend"
git push
```

Vercel auto-redeploys! ✅

---

## Part 4: Verify Deployment

### Check Frontend
1. Visit your frontend URL
2. Should see the dashboard
3. Click on map - check if it loads

### Check Backend
1. Visit: `https://your-backend-url.vercel.app/api/weather?lat=28.6&lon=77.2`
2. Should return weather JSON data

### Test Integration
1. On frontend, click a map location
2. Weather data should load
3. Crop recommendations should appear
4. AI chat should work

---

## 🎉 Success Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Environment variables added to backend
- [ ] Frontend connected to backend
- [ ] Map interaction works
- [ ] Weather data loads
- [ ] Crop recommendations appear
- [ ] AI chat responds

---

## 🔧 Troubleshooting

**Frontend shows 404?**
- Check Root Directory is `/` not `frontend`
- Redeploy from Deployments tab

**Backend API not responding?**
- Verify all environment variables are set
- Check backend logs in Vercel dashboard
- Ensure Root Directory is `backend`

**CORS errors?**
- Backend should allow frontend URL
- Check backend/src/index.ts CORS settings

**Build fails?**
- Check build logs in Vercel
- Ensure all dependencies in package.json
- Try redeploying

---

## 📝 Your Deployment URLs

**Frontend:** `___________________________`

**Backend:** `___________________________`

---

**Deployment Time:** ~15 minutes total  
**Auto-deploys:** Every git push to main branch ✅
