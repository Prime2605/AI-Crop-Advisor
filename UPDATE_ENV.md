# Environment Variables Configuration

## ✅ NEW: Centralized Windy API Configuration!

All Windy API keys are now managed through a **single unified configuration map**. This makes it easier to maintain and update API keys across the entire project.

---

## 📋 Quick Start

### 1. Backend Environment Variables

Create or update `backend/.env`:

```bash
# Windy API Keys (RECOMMENDED: Set individual keys)
WINDY_POINT_API_KEY=OEk44lpC9UVAH0dZFKriWWhZTnCzzHS8
WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_WEBCAMS_API_KEY=5b1DAHQSsXDpd0omCdze5FNZwZQyuMId
WINDY_PLUGINS_API_KEY=FOivatxLurzL1yp0jHmHwrWVRgjcem4M

# OR use a single universal key (will be used as fallback for all)
# WINDY_API_KEY=your-universal-api-key

# Supabase Configuration
SUPABASE_URL=https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 2. Start the Backend

```bash
cd backend
npm run dev
```

**Expected Output**:
```
✅ Connected to Supabase
🚀 Server running on http://localhost:3001
📊 Health check: http://localhost:3001/api/health
🗺️  Windy API Configuration:
   - Point API: OEk44lpC...
   - Map API: n0HATHjc...
   - Webcams API: 5b1DAHQS...
   - Plugins API: FOivatxL...
```

---

## 🗺️ Windy API Keys Breakdown

### 1. Point Forecast API Key
```
OEk44lpC9UVAH0dZFKriWWhZTnCzzHS8
```
- **Used for**: Fetching weather data from Windy Point Forecast API
- **Where**: Backend only (`weatherService.ts`)
- **Access**: `getWindyApiKey('pointApi')`

### 2. Map Forecast API Key
```
n0HATHjcJTliIOKd3jXeCm440JutQdSN
```
- **Used for**: Displaying Windy interactive map in frontend
- **Where**: Exposed to frontend via `/api/config/frontend`
- **Access**: `getWindyApiKey('mapApi')`

### 3. Webcams API Key
```
5b1DAHQSsXDpd0omCdze5FNZwZQyuMId
```
- **Used for**: Weather webcams (future feature)
- **Access**: `getWindyApiKey('webcamsApi')`

### 4. Plugins API Key
```
FOivatxLurzL1yp0jHmHwrWVRgjcem4M
```
- **Used for**: Windy plugins and extended features (future)
- **Access**: `getWindyApiKey('pluginsApi')`

---

## 🏗️ Centralized Configuration Architecture

### Node.js/TypeScript Backend

**Configuration File**: `backend/src/config/windyConfig.ts`

```typescript
import { getWindyApiKey } from '../config/windyConfig';

// Get specific API key
const pointApiKey = getWindyApiKey('pointApi');
const mapApiKey = getWindyApiKey('mapApi');
```

**Features**:
- ✅ Single source of truth
- ✅ Automatic validation on startup
- ✅ Type-safe with TypeScript
- ✅ Flexible fallback system
- ✅ Centralized logging

### Python/Flask Backend

**Configuration**: `app.py` (line ~17-25)

```python
from app import WINDY_API_KEYS

# Get specific API key
point_api_key = WINDY_API_KEYS['point_api']
map_api_key = WINDY_API_KEYS['map_api']
```

---

## 📁 Updated Files

### Created:
- ✅ `backend/src/config/windyConfig.ts` - **NEW** centralized configuration

### Updated:
- ✅ `backend/src/services/weatherService.ts` - Uses centralized config
- ✅ `backend/src/routes/config.ts` - Uses centralized config
- ✅ `backend/src/index.ts` - Logs config on startup
- ✅ `app.py` - Python backend with `WINDY_API_KEYS` dictionary

---

## 🚀 Deployment: Vercel Environment Variables

Go to: https://vercel.com/prime-r-ss-projects/crop-advisor → **Settings** → **Environment Variables**

### Required Variables:

```bash
# Windy API Keys
WINDY_POINT_API_KEY=OEk44lpC9UVAH0dZFKriWWhZTnCzzHS8
WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_WEBCAMS_API_KEY=5b1DAHQSsXDpd0omCdze5FNZwZQyuMId
WINDY_PLUGINS_API_KEY=FOivatxLurzL1yp0jHmHwrWVRgjcem4M

# Supabase
SUPABASE_URL=https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk

# Server Config
NODE_ENV=production
```

**Note**: After adding variables, redeploy your application for changes to take effect.

---

## 🔍 Testing

### 1. Test Backend API
```bash
# Health check
curl http://localhost:3001/api/health

# Get frontend config (includes map API key)
curl http://localhost:3001/api/config/frontend

# Get Windy keys status (debug endpoint)
curl http://localhost:3001/api/config/windy-keys

# Test weather API
curl "http://localhost:3001/api/weather?lat=50.4&lon=14.3"
```

### 2. Test Frontend
1. Open http://localhost:3000
2. Map should load (Windy or Leaflet fallback)
3. Click on map to select location
4. Weather data should appear in Weather tab
5. Crop recommendations should appear in Crop Recommendations tab

---

## 🎯 How It Works Now

### Request Flow:
```
1. User clicks on map
   ↓
2. Frontend sends location to backend
   ↓
3. Backend uses WINDY_POINT_API_KEY to fetch weather
   ↓
4. Backend saves to Supabase database
   ↓
5. Backend returns weather data
   ↓
6. Frontend calculates crop recommendations
   ↓
7. Frontend saves recommendations to database
   ↓
8. User sees results in UI
```

### API Key Flow:
```
Backend Startup:
- Loads all keys from .env
- Creates WINDY_API_KEYS map
- Validates configuration
- Logs status to console

Frontend Initialization:
- Fetches config from /api/config/frontend
- Receives WINDY_MAP_API_KEY (safe to expose)
- Initializes Windy Map
- Falls back to Leaflet if Windy fails
```

---

## 🔐 Security Best Practices

### ✅ Good Practices:
- Store keys in environment variables
- Never commit `.env` files to Git
- Use specific keys for different services
- Rotate keys periodically
- Monitor API usage

### ⚠️ Important Notes:
- **Point API key**: Backend only, never exposed to frontend
- **Map API key**: Safe to expose (client-side map display)
- **Webcams/Plugins keys**: Reserved for future features
- Default fallback keys are included for development only

---

## 📚 Additional Documentation

- `WINDY_API_KEYS.md` - Original API keys documentation
- `windy_api_consolidation.md` - Complete implementation guide
- `windy_api_quick_reference.md` - Quick reference guide
- `VERCEL_ENV_SETUP.md` - Vercel deployment guide
- `SUPABASE_SETUP.md` - Database setup guide

---

## 🎉 Benefits of Centralized Configuration

| Before | After |
|--------|-------|
| Keys scattered across 5+ files | Single configuration map |
| No validation | Automatic validation on startup |
| Manual logging needed | Built-in startup logging |
| Difficult to maintain | Easy to update in one place |
| No type safety | Full TypeScript support |
| Silent failures | Clear error messages |

---

## 🆘 Troubleshooting

### Issue: Port 3001 already in use
```bash
# Find and kill the process
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process -Force

# Then restart
npm run dev
```

### Issue: API keys not loading
- Check `.env` file exists in `backend/` directory
- Verify no syntax errors in `.env` file
- Restart backend server after changes
- Check startup logs for warnings

### Issue: Map not loading
- Check browser console for errors
- Verify backend is running on port 3001
- Test frontend config endpoint: `curl http://localhost:3001/api/config/frontend`
- Try the Leaflet fallback mode

---

## ✨ Current Status

- ✅ Backend running on http://localhost:3001
- ✅ Centralized Windy API configuration implemented
- ✅ All services updated to use unified config
- ✅ Startup logging enabled
- ✅ Documentation updated
- ✅ Ready for production deployment

**All configuration is centralized and ready to use! �**
