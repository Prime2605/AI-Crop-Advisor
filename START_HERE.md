# 🚀 START HERE - Run the Project Manually

## ⚡ Quick Start (2 Simple Steps)

### Step 1: Start Backend (Terminal 1)

Open PowerShell/Command Prompt and run:

```powershell
cd "C:\Projects\Crop Advisor\backend"
npm run dev
```

**Wait for this message:**
```
🚀 Server running on http://localhost:3001
```

### Step 2: Start Frontend (Terminal 2)

Open a **NEW** PowerShell/Command Prompt and run:

```powershell
cd "C:\Projects\Crop Advisor\frontend"
npm run dev
```

**Wait for this message:**
```
➜  Local:   http://localhost:3000/
```

### Step 3: Open Browser

Go to: **http://localhost:3000**

---

## 📋 What You Should See

### In Terminal 1 (Backend):
```
✅ Connected to Supabase
🚀 Server running on http://localhost:3001
📊 Health check: http://localhost:3001/api/health
```

### In Terminal 2 (Frontend):
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

### In Browser:
- Top navbar: "AI Crop Advisor"
- Full-screen map
- Right side panel with Weather/Crop Recommendations tabs

---

## ✅ Test It Works

1. **Click on the map** - Select any location
2. **Weather tab** - Should show weather data
3. **Crop Recommendations tab** - Should show crop suggestions
4. **AI Dashboard button** - Click in navbar to see analytics

---

## 🛑 To Stop

Press `Ctrl + C` in both terminals

---

## ❌ Troubleshooting

### "Port already in use"
- Another instance is running
- Close other terminals or change port

### "Cannot find module"
- Run `npm install` in both `backend/` and `frontend/`

### "Backend not responding"
- Make sure backend terminal shows "Server running"
- Check http://localhost:3001/api/health in browser

---

## 📝 Full Instructions

See **RUN_MANUALLY.md** for detailed step-by-step guide.

