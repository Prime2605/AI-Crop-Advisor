# Python Backend (Flask) - Alternative Implementation

## Overview

This is a Python Flask alternative to the Node.js/Express backend. It provides the same API endpoints and functionality.

## Installation

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

Or install individually:
```bash
pip install Flask flask-cors requests supabase python-dotenv
```

### 2. Set Environment Variables

Create a `.env` file in the root directory:

```env
WINDY_POINT_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
SUPABASE_URL=https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development Mode

```bash
python app.py
```

Or with Flask CLI:
```bash
flask run
```

The server will start on: **http://localhost:5000**

### Production Mode

```bash
gunicorn app:app --bind 0.0.0.0:5000
```

## API Endpoints

All endpoints match the Node.js backend:

- `GET /api/health` - Health check
- `GET /api/weather?lat={lat}&lon={lon}` - Get weather data
- `POST /api/crop-recommend` - Get crop recommendations
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/ai-models` - Get AI models

## Features

✅ Same API endpoints as Node.js backend  
✅ Windy API integration  
✅ Supabase database integration  
✅ CORS enabled  
✅ Error handling  
✅ Environment variable support  

## Usage with Frontend

Update `frontend/vite.config.ts` to point to Python backend:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:5000',  // Python backend port
    changeOrigin: true,
  },
}
```

## Advantages of Python Backend

1. **Better for ML/AI**: Easier to integrate Python ML libraries
2. **Data Science**: Better ecosystem for data processing
3. **Flexibility**: Can use scikit-learn, pandas, numpy, etc.
4. **Alternative**: Good backup if Node.js has issues

## Disadvantages

1. **Performance**: Generally slower than Node.js for I/O operations
2. **Ecosystem**: Smaller ecosystem for web APIs
3. **Deployment**: Different deployment process

## When to Use Python Backend

- ✅ You want to add ML models (scikit-learn, TensorFlow, PyTorch)
- ✅ You need data processing (pandas, numpy)
- ✅ You prefer Python over JavaScript
- ✅ You're building AI/ML features

## When to Use Node.js Backend

- ✅ You want better performance for API endpoints
- ✅ You prefer JavaScript/TypeScript
- ✅ You want to keep everything in one language
- ✅ You need real-time features (WebSockets)

## Running Both Backends

You can run both backends simultaneously on different ports:

- Node.js: `http://localhost:3001`
- Python: `http://localhost:5000`

Just update the frontend proxy to point to whichever you prefer.

