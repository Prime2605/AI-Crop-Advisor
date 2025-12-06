# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from env.example)
# On Windows PowerShell:
Copy-Item env.example .env

# On Linux/Mac:
cp env.example .env

# Edit .env file and add your Windy API keys:
# WINDY_POINT_API_KEY=your_actual_key_here
# WINDY_MAP_API_KEY=your_actual_key_here

# Start the backend server
npm run dev
```

The backend will start on `http://localhost:3001`

### 2. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 3. Testing the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the AI Crop Advisor interface with:
   - Top navbar with "AI Crop Advisor" title
   - Full-screen map in the center
   - Right side panel with Weather and Crop Recommendations tabs

3. **Select a location:**
   - Click anywhere on the map
   - The map should center on your selected location
   - Weather data will automatically load in the Weather tab
   - Crop recommendations will appear in the Crop Recommendations tab

4. **Test the features:**
   - Switch between Weather and Crop Recommendations tabs
   - Sort the crop recommendations table by clicking column headers
   - View detailed crop information below the table

## Troubleshooting

### Backend Issues

- **Port already in use**: Change `PORT` in `.env` file
- **API key errors**: Verify your `WINDY_POINT_API_KEY` is correctly set in `.env`
- **TypeScript errors**: Run `npm run type-check` to see detailed errors

### Frontend Issues

- **Map not loading**: 
  - Check browser console for errors
  - Verify Windy Map API script is loading in `index.html`
  - Check if Windy Map API requires initialization with API key
- **API calls failing**: 
  - Ensure backend is running on port 3001
  - Check browser console for CORS or network errors
  - Verify proxy configuration in `vite.config.ts`

### Windy API Integration

**Important Notes:**
- The Windy API integration code includes placeholder structures
- You may need to adjust:
  - API endpoint URLs in `backend/src/services/weatherService.ts`
  - Request parameters and response parsing
  - Map initialization in `frontend/src/components/WindyMap.tsx`
- Refer to official Windy API documentation:
  - Point Forecast API: https://api.windy.com/api/point-forecast/v2.0/docs
  - Map Forecast API: https://api.windy.com/assets/map-forecast/docs/

## Next Steps After Setup

1. **Verify Windy API Integration:**
   - Test the weather endpoint: `http://localhost:3001/api/weather?lat=50.4&lon=14.3`
   - Check the response format and adjust parsing if needed

2. **Customize Crop Recommendations:**
   - Edit `backend/src/services/cropService.ts` to add more crops or improve heuristics
   - Replace with actual ML models or expert systems

3. **Enhance UI:**
   - Add loading skeletons
   - Improve error messages
   - Add map controls and legends

4. **Add Features:**
   - Save favorite locations
   - Export recommendations
   - Historical weather data
   - Multiple location comparison

