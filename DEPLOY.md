# AI Crop Advisor - Vercel Deployment

## Quick Deploy (2 minutes)

### Frontend Deployment

1. **Go to Vercel:** https://vercel.com
2. **New Project** → Import from GitHub
3. **Select:** `Prime2605/AI-Crop-Advisor`
4. **Configure:**
   - Framework: Auto-detected (Vite) ✅
   - Root Directory: Leave as `.` or `/`
   - Click **Deploy**

**That's it!** Vercel will auto-detect and build from the root config.

---

### Backend Deployment (Optional)

**Note:** Backend requires API keys. Deploy separately:

1. **New Project** → Same repo
2. **Configure:**
   - Root Directory: `backend`
   - Framework: Other
3. **Environment Variables:**
   ```
   GITHUB_MODELS_TOKEN=your_token
   OPENWEATHER_API_KEY=your_key
   SUPABASE_URL=your_url
   SUPABASE_KEY=your_key
   NODE_ENV=production
   ```
4. **Deploy**

---

## After Deployment

**Frontend URL:** Will be automatically assigned  
**Update API calls:** If backend deployed separately, update frontend API URL

---

## Troubleshooting

**404 Error?**
- Root directory should be `/` or `.` (not `frontend`)
- The root `vercel.json` handles routing

**Build Failed?**
- Check Node.js version is 18.x or higher
- Ensure pnpm is used (set in vercel.json)

---

**Everything is pre-configured!** Just click Deploy. 🚀
