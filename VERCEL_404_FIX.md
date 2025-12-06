# Vercel 404 Error Fix

## Problem
Getting `404: NOT_FOUND` error when accessing the deployed application on Vercel.

## Solution Applied

### 1. Created Vercel Serverless Function
- Created `backend/api/index.ts` - This is the serverless function handler for Vercel
- Exports Express app as default export (required for Vercel)

### 2. Updated vercel.json
- Routes `/api/*` requests to `backend/api/index.ts`
- Routes all other requests to frontend
- Added function configuration with max duration

### 3. Updated Backend Entry Point
- Modified `backend/src/index.ts` to work both locally and on Vercel
- Checks for `VERCEL` environment variable to avoid starting server in serverless mode

## Files Changed

1. **backend/api/index.ts** (NEW) - Vercel serverless function handler
2. **vercel.json** (UPDATED) - Fixed routing configuration
3. **backend/src/index.ts** (UPDATED) - Added Vercel compatibility

## Next Steps for Deployment

1. **Commit and Push Changes**:
   ```bash
   git add .
   git commit -m "Fix Vercel 404 error - add serverless function handler"
   git push
   ```

2. **Vercel will Auto-Deploy**:
   - Vercel will detect the push and redeploy automatically
   - The new `backend/api/index.ts` will be used as the serverless function

3. **Verify Environment Variables**:
   - Go to: https://vercel.com/prime-r-ss-projects/crop-advisor
   - Settings → Environment Variables
   - Ensure all variables are set (see VERCEL_ENV_SETUP.md)

4. **Test the Deployment**:
   - Health check: `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"ok",...}`

## Local Development

The project still works locally:
- Backend: `npm run dev` in `backend/` directory
- Frontend: `npm run dev` in `frontend/` directory

## Troubleshooting

If you still get 404 errors:

1. **Check Vercel Build Logs**:
   - Go to Deployments → Click on deployment → View logs
   - Look for any build errors

2. **Verify File Structure**:
   - Ensure `backend/api/index.ts` exists
   - Ensure `vercel.json` is in root directory

3. **Check Environment Variables**:
   - All required variables must be set in Vercel dashboard
   - Variables must be set for Production, Preview, and Development

4. **Redeploy**:
   - Go to Deployments → Click "Redeploy" on latest deployment

## Architecture

```
Vercel Request Flow:
/api/* → backend/api/index.ts (serverless function)
/*    → frontend/dist/* (static files)
```

The Express app in `backend/api/index.ts` handles all API routes and is exported as a serverless function compatible with Vercel's Node.js runtime.

