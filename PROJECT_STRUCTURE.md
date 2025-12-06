# Project Structure

## Complete File Tree

```
Crop Advisor/
├── backend/
│   ├── src/
│   │   ├── index.ts                    # Express server entry point
│   │   ├── routes/
│   │   │   ├── weather.ts              # GET /api/weather route
│   │   │   └── cropRecommend.ts        # POST /api/crop-recommend route
│   │   ├── services/
│   │   │   ├── weatherService.ts       # Windy Point Forecast API integration
│   │   │   └── cropService.ts          # Crop recommendation logic (heuristic-based)
│   │   └── types/
│   │       └── index.ts                # TypeScript type definitions
│   ├── package.json
│   ├── tsconfig.json
│   ├── .gitignore
│   └── env.example                      # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx              # Top navigation bar
│   │   │   ├── WindyMap.tsx           # Windy Map integration component
│   │   │   ├── SidePanel.tsx          # Right side panel with tabs
│   │   │   ├── WeatherTab.tsx          # Weather display component
│   │   │   └── CropRecommendationsTab.tsx  # Crop recommendations table
│   │   ├── context/
│   │   │   └── AppContext.tsx         # React Context for global state
│   │   ├── hooks/
│   │   │   └── useWeather.ts           # Custom hook for weather data fetching
│   │   ├── services/
│   │   │   └── api.ts                  # API service layer (axios)
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript type definitions
│   │   ├── App.tsx                     # Main app component
│   │   ├── main.tsx                    # React entry point
│   │   └── index.css                   # Global styles
│   ├── index.html                      # HTML template with Windy script
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts                  # Vite configuration with proxy
│   └── .gitignore
│
├── README.md                           # Main documentation
├── SETUP.md                            # Quick setup guide
└── PROJECT_STRUCTURE.md                # This file
```

## Key Files Explained

### Backend

- **`backend/src/index.ts`**: Express server setup, middleware, route registration
- **`backend/src/routes/weather.ts`**: Handles GET requests for weather data
- **`backend/src/routes/cropRecommend.ts`**: Handles POST requests for crop recommendations
- **`backend/src/services/weatherService.ts`**: Integrates with Windy Point Forecast API
- **`backend/src/services/cropService.ts`**: Heuristic-based crop recommendation algorithm

### Frontend

- **`frontend/src/App.tsx`**: Main app component, layout structure
- **`frontend/src/components/WindyMap.tsx`**: Windy Map integration with click handler
- **`frontend/src/components/SidePanel.tsx`**: Tabbed panel container
- **`frontend/src/components/WeatherTab.tsx`**: Displays current weather and forecast
- **`frontend/src/components/CropRecommendationsTab.tsx`**: Sortable crop recommendations table
- **`frontend/src/context/AppContext.tsx`**: Global state management (location, weather, crops)
- **`frontend/src/hooks/useWeather.ts`**: Automatically fetches weather when location changes

## Environment Variables

### Backend (.env)
```
WINDY_POINT_API_KEY=your_key_here
WINDY_MAP_API_KEY=your_key_here
PORT=3001
NODE_ENV=development
```

### Frontend
- Uses Vite proxy to forward `/api` requests to backend
- No environment variables required (can add `VITE_API_URL` if needed)

## API Endpoints

### Backend API (http://localhost:3001)

1. **Health Check**
   - `GET /api/health`
   - Returns server status

2. **Weather Data**
   - `GET /api/weather?lat={lat}&lon={lon}`
   - Returns weather data for location

3. **Crop Recommendations**
   - `POST /api/crop-recommend`
   - Body: `{ location: { lat, lon }, weather: { temperature, precipitation, humidity, windSpeed } }`
   - Returns array of crop recommendations

## State Management

Global state (via React Context) includes:
- `selectedLocation`: Current map location
- `weatherData`: Fetched weather information
- `cropRecommendations`: Array of crop recommendations
- `loading`: Loading states for weather and crops
- `error`: Error message if any

## Data Flow

1. User clicks on map → `WindyMap` calls `onLocationSelect`
2. `App.tsx` updates `selectedLocation` in context
3. `useWeather` hook detects location change
4. Hook calls `fetchWeather` API service
5. Backend calls Windy Point Forecast API
6. Weather data stored in context
7. Hook automatically calls `fetchCropRecommendations`
8. Backend runs crop recommendation algorithm
9. Recommendations stored in context
10. UI components re-render with new data

