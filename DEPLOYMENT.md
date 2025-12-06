# Deployment Guide - AI Crop Advisor

## Vercel Deployment Instructions

### Prerequisites
1. GitHub/GitLab/Bitbucket account
2. Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas account (for production database) or use local MongoDB

### Step 1: Prepare Your Repository

1. Push your code to a Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Crop Advisor with database and dashboard"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Set Up MongoDB Database

#### Option A: MongoDB Atlas (Recommended for Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/crop-advisor`)
5. Whitelist your IP address (or use 0.0.0.0/0 for all IPs in development)

#### Option B: Local MongoDB

For local development, MongoDB will run on `mongodb://localhost:27017/crop-advisor`

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
   - `WINDY_POINT_API_KEY`: `n0HATHjcJTliIOKd3jXeCm440JutQdSN`
   - `WINDY_API_KEY`: `n0HATHjcJTliIOKd3jXeCm440JutQdSN`
   - `WINDY_MAP_API_KEY`: `n0HATHjcJTliIOKd3jXeCm440JutQdSN`
   - `DATABASE_URL`: Your MongoDB connection string
   - `MONGODB_URI`: Your MongoDB connection string (same as DATABASE_URL)
   - `NODE_ENV`: `production`
   - `PORT`: `3001` (or leave empty, Vercel will assign)

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

#### Backend (.env)
```
WINDY_POINT_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/crop-advisor
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/crop-advisor
NODE_ENV=production
PORT=3001
```

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

