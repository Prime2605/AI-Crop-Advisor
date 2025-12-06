# Run Project Locally

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp env.example .env
npm run dev
```

Backend will run on: http://localhost:3001

### 2. Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: http://localhost:3000

## Verify It's Working

1. Open http://localhost:3000 in your browser
2. Check backend health: http://localhost:3001/api/health
3. Click on the map to select a location
4. Weather data should load automatically

## Troubleshooting

### Backend Issues
- Make sure `.env` file exists in `backend/` directory
- Check that all environment variables are set
- Verify Supabase connection (check console logs)

### Frontend Issues
- Make sure backend is running on port 3001
- Check browser console for errors
- Verify API calls are going to correct URL

### Port Already in Use
- Change `PORT` in `backend/.env` to a different port
- Update `frontend/vite.config.ts` proxy if needed

