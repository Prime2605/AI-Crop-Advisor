# Automatic Vercel Deployment

This project is configured for **zero-configuration automatic deployment** on Vercel.

## ✅ Auto-Deploy Setup

**Every push to `main` branch automatically:**
1. Triggers new deployment
2. Builds frontend from `frontend/` directory
3. Deploys to production URL
4. No manual steps required

## 🚀 First Time Setup (Once Only)

1. Connect GitHub repo to Vercel
2. Vercel auto-detects all settings ✅
3. Every future commit auto-deploys ✅

## 📋 Pre-Configured Settings

All settings are in `vercel.json` - **no manual configuration needed**:
- ✅ Build command: Automatic
- ✅ Output directory: `frontend/dist`
- ✅ Install command: `pnpm install`
- ✅ Framework: Auto-detected (Vite)

## 🔄 Continuous Deployment

```
git commit -m "update"
git push
```
→ **Automatic deployment to Vercel** 🎉

No other steps needed!
