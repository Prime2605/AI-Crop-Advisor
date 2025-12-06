# How to Run the Project Manually

## 🚀 Quick Start (2 Terminals)

### Terminal 1 - Backend Server

```bash
cd backend
npm install
npm run dev
```

Backend will run on: **http://localhost:3001**

### Terminal 2 - Frontend Server

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## 📋 Detailed Step-by-Step

### Step 1: Open First Terminal (Backend)

1. Open PowerShell or Command Prompt
2. Navigate to the project:
   ```bash
   cd "C:\Projects\Crop Advisor\backend"
   ```

3. Install dependencies (if not already done):
   ```bash
   npm install
   ```

4. Check if `.env` file exists:
   ```bash
   # If .env doesn't exist, copy from example:
   copy env.example .env
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✅ Connected to Supabase
   🚀 Server running on http://localhost:3001
   📊 Health check: http://localhost:3001/api/health
   ```

### Step 2: Open Second Terminal (Frontend)

1. Open a **NEW** PowerShell or Command Prompt window
2. Navigate to the frontend:
   ```bash
   cd "C:\Projects\Crop Advisor\frontend"
   ```

3. Install dependencies (if not already done):
   ```bash
   npm install
   ```

4. Start the frontend server:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

### Step 3: Open in Browser

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see the AI Crop Advisor interface!

---

## ✅ Verify Everything Works

### Check Backend
Open: http://localhost:3001/api/health

Should return:
```json
{
  "status": "ok",
  "timestamp": "2025-01-06T...",
  "environment": "development"
}
```

### Check Frontend
1. Open: http://localhost:3000
2. You should see:
   - Top navbar with "AI Crop Advisor"
   - Full-screen map
   - Right side panel with tabs

### Test the App
1. Click anywhere on the map
2. Weather data should load automatically
3. Crop recommendations should appear
4. Click "AI Dashboard" in navbar to see analytics

---

## 🛠️ Troubleshooting

### Port Already in Use

**Backend (port 3001):**
```bash
# Option 1: Kill the process using port 3001
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# Option 2: Change port in backend/.env
PORT=3002
```

**Frontend (port 3000):**
```bash
# Vite will automatically try the next available port
# Or change in frontend/vite.config.ts
```

### Backend Not Starting

1. **Check .env file exists:**
   ```bash
   cd backend
   dir .env
   ```

2. **Check dependencies installed:**
   ```bash
   npm install
   ```

3. **Check for errors in console:**
   - Look for red error messages
   - Common: Missing environment variables

### Frontend Not Starting

1. **Check dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Clear cache and reinstall:**
   ```bash
   rm -r node_modules
   npm install
   ```

3. **Check if backend is running:**
   - Frontend needs backend on port 3001
   - Check: http://localhost:3001/api/health

### Can't Connect to Backend

1. **Verify backend is running:**
   - Check Terminal 1 for "Server running" message
   - Test: http://localhost:3001/api/health

2. **Check CORS:**
   - Backend has CORS enabled
   - Should work automatically

3. **Check browser console:**
   - Press F12 → Console tab
   - Look for error messages

---

## 📝 Environment Variables

The `.env` file in `backend/` should contain:

```env
WINDY_POINT_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
SUPABASE_URL=https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
PORT=3001
NODE_ENV=development
```

---

## 🎯 Quick Commands Reference

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### Stop Servers
- Press `Ctrl + C` in each terminal
- Or close the terminal windows

### Restart Servers
1. Stop with `Ctrl + C`
2. Run `npm run dev` again

---

## 💡 Pro Tips

1. **Keep both terminals open** - You need both servers running
2. **Check terminal output** - Errors will show in the terminal
3. **Backend must start first** - Frontend depends on backend
4. **Browser console** - Press F12 to see frontend errors
5. **Hot reload** - Both servers auto-reload on file changes

---

## 🎉 Success Indicators

✅ Backend terminal shows: "Server running on http://localhost:3001"  
✅ Frontend terminal shows: "Local: http://localhost:3000/"  
✅ Browser shows: AI Crop Advisor interface  
✅ Map displays correctly  
✅ Can click on map and see weather data load  

If all these work, you're good to go! 🚀

