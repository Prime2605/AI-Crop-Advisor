# 🚀 Vercel Deployment Guide - AI Crop Advisor

## Frontend Deployment

### **On Vercel Import Screen:**

1. **Import from GitHub**: `Prime2605/AI-Crop-Advisor`
2. **Click "Override"** next to all auto-detected settings

### **Required Settings:**

```
Framework Preset: Vite ✅
Root Directory: frontend ✅
Build Command: pnpm run build
Output Directory: dist
Install Command: pnpm install
Node.js Version: 18.x
```

### **Environment Variables:**
None required for frontend (API calls go to backend)

---

## Backend Deployment

### **Create Second Vercel Project:**

1. **Import same repo**: `Prime2605/AI-Crop-Advisor`
2. **Click "Override"** next to all settings

### **Required Settings:**

```
Framework Preset: Other ✅
Root Directory: backend ✅
Build Command: (leave blank)
Output Directory: (leave blank)
Install Command: pnpm install
Node.js Version: 18.x
```

### **Environment Variables (CRITICAL):** 🔑

```env
GITHUB_MODELS_TOKEN=your_github_token_here
OPENWEATHER_API_KEY=your_openweather_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
NODE_ENV=production
```

---

## After Both Deploy:

1. **Get backend URL**: e.g., `https://your-api.vercel.app`
2. **Update frontend** to use backend URL
3. **Redeploy frontend**

---

## Quick Checklist:

**Frontend:**
- [x] Framework: Vite
- [x] Root: `frontend`
- [x] Build: `pnpm run build`
- [x] Output: `dist`

**Backend:**
- [x] Framework: Other
- [x] Root: `backend`
- [x] Add all environment variables

**Deploy each as separate Vercel project!** ✅
