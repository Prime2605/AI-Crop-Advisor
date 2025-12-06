# AI Crop Advisor

A production-quality full-stack web application that provides crop recommendations based on weather data and location. Built with React + TypeScript (frontend) and Node.js + Express + TypeScript (backend).

## ✨ Features

- **Interactive Weather Map**: Full-screen Windy Map integration for global weather visualization
- **Location Selection**: Click anywhere on the map to select a location
- **Real-time Weather Data**: Fetches accurate weather data using Windy Point Forecast API
- **Crop Recommendations**: AI-powered crop suitability analysis with ranked recommendations
- **AI Dashboard**: Comprehensive analytics dashboard with charts and AI model management
- **Database Integration**: MongoDB database for storing weather data, recommendations, and analytics
- **Smooth Animations**: Beautiful UI animations powered by Framer Motion
- **Modern UI**: Clean, responsive interface with tabbed panels and interactive charts

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- React Context for state management
- Axios for API calls
- Framer Motion for animations
- Recharts for data visualization
- Lucide React for icons

### Backend
- Node.js + Express + TypeScript
- Axios for external API calls
- dotenv for environment configuration
- MongoDB with Mongoose for database
- Prisma for type-safe database access

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express server entry point
│   │   ├── routes/               # API route handlers
│   │   │   ├── weather.ts
│   │   │   └── cropRecommend.ts
│   │   ├── services/             # Business logic
│   │   │   ├── weatherService.ts
│   │   │   └── cropService.ts
│   │   └── types/                # TypeScript type definitions
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/           # React components
    │   │   ├── Navbar.tsx
    │   │   ├── WindyMap.tsx
    │   │   ├── SidePanel.tsx
    │   │   ├── WeatherTab.tsx
    │   │   └── CropRecommendationsTab.tsx
    │   ├── context/              # React Context for state
    │   │   └── AppContext.tsx
    │   ├── hooks/                # Custom React hooks
    │   │   └── useWeather.ts
    │   ├── services/             # API service layer
    │   │   └── api.ts
    │   ├── types/                # TypeScript types
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Windy API keys:
  - `WINDY_POINT_API_KEY` (for weather data)
  - `WINDY_MAP_API_KEY` (for map display)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your configuration:
   ```
   WINDY_POINT_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
   WINDY_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
   WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
   DATABASE_URL=mongodb://localhost:27017/crop-advisor
   MONGODB_URI=mongodb://localhost:27017/crop-advisor
   PORT=3001
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The Windy API key is configured in the backend environment variables
   - The Windy Map script is loaded in `index.html`
   - API key is automatically used by the backend service

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

### Backend API

#### Core Endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/weather?lat={lat}&lon={lon}` - Fetch weather data for a location
- `POST /api/crop-recommend` - Get crop recommendations
  ```json
  {
    "location": { "lat": 50.4, "lon": 14.3 },
    "weather": {
      "temperature": 20,
      "precipitation": 50,
      "humidity": 60,
      "windSpeed": 5
    }
  }
  ```

#### Analytics Endpoints
- `GET /api/analytics/dashboard` - Get dashboard analytics data
- `GET /api/analytics/crop-performance` - Get crop performance metrics
- `POST /api/analytics/event` - Record analytics event

#### AI Model Endpoints
- `GET /api/ai-models` - Get all AI models
- `GET /api/ai-models/:id` - Get specific AI model
- `POST /api/ai-models` - Create new AI model
- `PUT /api/ai-models/:id` - Update AI model
- `DELETE /api/ai-models/:id` - Delete AI model

## Windy API Integration Notes

### Windy Point Forecast API
- The backend uses the Windy Point Forecast API to fetch weather data
- API key is stored in `WINDY_POINT_API_KEY` environment variable
- The service layer (`weatherService.ts`) handles API calls and data transformation
- **Important**: Verify the actual Windy API endpoint URL and request format in the official documentation, as the current implementation uses placeholder structures

### Windy Map API
- The frontend loads the Windy Map script from `https://api.windy.com/assets/map-forecast/libBoot.js`
- Map initialization happens in the `WindyMap` component
- **Important**: The Windy Map API initialization code may need adjustment based on the actual API documentation. The current implementation provides a structure that should be adapted to the real API.

## Development Commands

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run type-check` - Type check without building

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Type check without building

## Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Click anywhere on the map to select a location
4. Weather data will automatically load in the Weather tab
5. Crop recommendations will appear in the Crop Recommendations tab
6. Use the sortable table headers to sort crops by different criteria

## Important Notes

- **API Keys**: Never commit API keys to version control. Always use environment variables.
- **Windy API**: The Windy API integration code includes placeholders that should be verified against the official documentation.
- **Crop Recommendations**: The current crop recommendation service uses simple heuristics. In production, this should be replaced with ML models or expert systems.

## New Features

### AI Dashboard
Access the AI Dashboard by clicking the "AI Dashboard" button in the navbar. The dashboard includes:
- **Overview**: Key metrics and statistics
- **Analytics**: Interactive charts and visualizations
- **AI Models**: Manage and monitor AI models

### Database Integration
All weather queries and recommendations are automatically saved to MongoDB for:
- Historical data analysis
- Analytics and reporting
- Model training data

### Animations
The UI features smooth animations powered by Framer Motion:
- Page transitions
- Card hover effects
- Loading animations
- Staggered list animations

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

## Enhancements

See [ENHANCEMENTS.md](./ENHANCEMENTS.md) for a complete list of enhancements and features.

## Next Steps

1. ✅ Windy API integration completed
2. ✅ Database integration completed
3. ✅ AI Dashboard created
4. ✅ Animations added
5. ⏳ Add error boundaries for better error handling
6. ⏳ Implement caching for weather data
7. ⏳ Add unit and integration tests
8. ⏳ Deploy to Vercel (see DEPLOYMENT.md)

