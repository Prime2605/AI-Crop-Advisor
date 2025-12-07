# Windy API Keys Configuration

## All Windy API Keys

### Map Forecast API Key
```
n0HATHjcJTliIOKd3jXeCm440JutQdSN
```
**Usage**: Frontend map display (Windy Map Forecast API)

### Point Forecast API Key
```
OEk44lpC9UVAH0dZFKriWWhZTnCzzHS8
```
**Usage**: Backend weather data fetching (Windy Point Forecast API)

### Webcams API Key
```
5b1DAHQSsXDpd0omCdze5FNZwZQyuMId
```
**Usage**: Webcam data (future feature)

### Plugins API Key
```
FOivatxLurzL1yp0jHmHwrWVRgjcem4M
```
**Usage**: Windy plugins (future feature)

## Where to Add These Keys

### 1. Backend `.env` File

Create or update `backend/.env`:

```env
# Windy API Keys
WINDY_POINT_API_KEY=OEk44lpC9UVAH0dZFKriWWhZTnCzzHS8
WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_WEBCAMS_API_KEY=5b1DAHQSsXDpd0omCdze5FNZwZQyuMId
WINDY_PLUGINS_API_KEY=FOivatxLurzL1yp0jHmHwrWVRgjcem4M
WINDY_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN

# Supabase Configuration
SUPABASE_URL=https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk

PORT=3001
NODE_ENV=development
```

### 2. Vercel Environment Variables

Go to: https://vercel.com/prime-r-ss-projects/crop-advisor → Settings → Environment Variables

Add all the keys listed above.

## How It Works

### Backend (Node.js/Express)
- Uses `WINDY_POINT_API_KEY` for weather data API calls
- Exposes `WINDY_MAP_API_KEY` via `/api/config/frontend` endpoint

### Frontend (React)
- Fetches `WINDY_MAP_API_KEY` from backend config endpoint
- Uses it to initialize Windy Map
- Falls back to Leaflet/OpenStreetMap if Windy fails

### Python Backend (app.py)
- Uses same environment variables
- Can be used as alternative backend

## Security Notes

- ✅ Point Forecast key: Only in backend (never exposed to frontend)
- ✅ Map Forecast key: Safe to expose to frontend (via config endpoint)
- ✅ Webcams/Plugins keys: Reserved for future features
- ⚠️ Never commit `.env` files to Git
- ⚠️ Always use environment variables, never hardcode keys

## Testing

After updating `.env`:

1. Restart backend server
2. Check console for API key warnings
3. Test map loading in frontend
4. Test weather API: `http://localhost:3001/api/weather?lat=50.4&lon=14.3`

