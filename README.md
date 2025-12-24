# 🌾 AI Crop Advisor

**Premium AI-powered agricultural intelligence platform** with real-time weather data and intelligent crop recommendations.

[![GitHub](https://img.shields.io/badge/GitHub-Prime2605%2FAI--Crop--Advisor-blue)](https://github.com/Prime2605/AI-Crop-Advisor)
![Tech Stack](https://img.shields.io/badge/React-TypeScript-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![AI Powered](https://img.shields.io/badge/AI-Powered-gold)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation-step-by-step)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [Features in Detail](#-features-in-detail)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

- 🗺️ **Interactive Map** - Click anywhere in the world to get location-specific data
- 🌤️ **Live Weather Data** - Real-time temperature, humidity, wind, pressure, and precipitation
- 🌾 **Smart Crop Recommendations** - AI-powered suitability scores for 70+ crops
- 🤖 **AI Chat Assistant** - Ask questions about farming, crops, and weather impacts
- 💎 **Premium Design** - Gold & Royal Purple theme with smooth cursor effects
- 📊 **Live Statistics** - Real-time analytics and predictions
- 🎨 **Beautiful UI** - Glassmorphism, gradients, and animations

---

## �️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Leaflet** - Interactive maps
- **CSS3** - Animations & styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Supabase** - PostgreSQL database

### APIs
- **GitHub Models API** - AI chat
- **OpenWeather API** - Weather data
- **Leaflet/OSM** - Map tiles

---

## 📦 Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **pnpm** (recommended) or npm
   - Install pnpm: `npm install -g pnpm`
   - Verify: `pnpm --version`

3. **Git** (for cloning)
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify: `git --version`

4. **API Keys** (free to obtain):
   - GitHub Models token
   - OpenWeather API key
   - Supabase credentials

---

## 📥 Installation (Step-by-Step)

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd Crop-Advisor
```

### Step 2: Install Backend Dependencies

```bash
cd backend
pnpm install
```

**Expected output:** Dependencies installed successfully

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
pnpm install
```

**Expected output:** Dependencies installed successfully

---

## ⚙️ Configuration

### Step 4: Set Up Environment Variables

#### Backend Configuration

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a `.env` file:
   ```bash
   # Windows
   copy .env.example .env
   
   # Linux/Mac
   cp .env.example .env
   ```

3. Edit `.env` and add your API keys:
   ```env
   # AI Configuration
   GITHUB_MODELS_TOKEN=your_github_models_token_here
   
   # Weather API
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   
   # Database
   SUPABASE_URL=your_supabase_project_url_here
   SUPABASE_KEY=your_supabase_anon_key_here
   
   # Server
   PORT=3001
   ```

### Step 5: Get Your API Keys

#### 5.1 GitHub Models Token
1. Go to [GitHub Settings](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `read:user`
4. Copy token and paste in `.env`

#### 5.2 OpenWeather API Key
1. Go to [OpenWeather](https://openweathermap.org/api)
2. Sign up for free account
3. Go to API Keys section
4. Copy API key and paste in `.env`

#### 5.3 Supabase Credentials
1. Go to [Supabase](https://supabase.com/)
2. Create new project
3. Go to Settings → API
4. Copy URL and anon key
5. Paste in `.env`

---

## 🚀 Running the Application

### Step 6: Start the Backend Server

1. Open **Terminal 1**:
   ```bash
   cd backend
   pnpm run dev
   ```

2. **Expected output:**
   ```
   ✓ Server running on http://localhost:3001
   ✓ AI service initialized
   ✓ Weather API connected
   ```

3. Keep this terminal running!

### Step 7: Start the Frontend Server

1. Open **Terminal 2** (new terminal window):
   ```bash
   cd frontend
   pnpm run dev
   ```

2. **Expected output:**
   ```
   ✓ Local:   http://localhost:3000
   ✓ Network: use --host to expose
   ```

3. Keep this terminal running!

### Step 8: Open in Browser

1. Open your browser
2. Navigate to: `http://localhost:3000`
3. **You should see:** The AI Crop Advisor dashboard with a golden-purple theme!

---

## � Usage Guide

### Using the Dashboard

#### 1. Select a Location
- **Method 1:** Click anywhere on the map
- **Method 2:** Use the search bar (top-left)
- **Method 3:** Drag the marker to move it

#### 2. View Weather Data (Left Panel)
- Real-time temperature
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Precipitation levels
- Current location coordinates

#### 3. View Crop Recommendations (Right Panel)
- **Top crops** suitable for selected location
- **Suitability score** (0-100%)
- **Crop icons** for visual identification
- Scientific names for each crop

#### 4. Use AI Chat Assistant
1. Click **"🤖 AI Chat Assistant"** button (top-right)
2. Chat panel slides in from right
3. Type your question (e.g., "What crops grow well in hot weather?")
4. Press Enter or click "Send"
5. AI responds with helpful advice

#### 5. View AI Predictions (Bottom-right)
- Best crops for current conditions
- Temperature optimization insights
- Humidity-based recommendations

---

## 📁 Project Structure

```
Crop-Advisor/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── index.ts          # API configuration
│   │   ├── services/
│   │   │   ├── ai.ts             # AI chat service
│   │   │   └── weather.ts        # Weather API service
│   │   └── index.ts              # Express server
│   ├── .env                      # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard3D.tsx   # Main dashboard
│   │   │   ├── CursorTrail.tsx   # Cursor effects
│   │   │   └── [others]
│   │   ├── api/
│   │   │   └── index.ts          # API calls
│   │   ├── dashboard-unified.css # Main styles
│   │   ├── chat-panel.css        # Chat styles
│   │   ├── cursor-effects.css    # Cursor styles
│   │   └── App.tsx               # Root component
│   └── package.json
│
└── README.md                     # This file
```

---

## 🎯 Features in Detail

### Interactive Map
- **Technology:** Leaflet.js with OpenStreetMap tiles
- **Controls:** 
  - Pan: Click and drag
  - Zoom: Scroll wheel or +/- buttons
  - Select: Click to place marker
- **Features:** Draggable marker, smooth animations

### AI Chat
- **Powered by:** GitHub Models API
- **Capabilities:** 
  - Crop recommendations
  - Weather impact analysis
  - Growing tips
  - Yield optimization
- **UI:** Slide-in panel with message history

### Crop Database
- **70+ crops** with detailed information
- **Icons:** Beautiful emoji representation
- **Suitability scoring:** AI-calculated percentages
- **Categories:** Vegetables, grains, fruits, legumes, cash crops

### Design System
- **Primary Color:** Metallic Gold (#D4AF37)
- **Accent Color:** Royal Purple (#6A0DAD)
- **Background:** Deep Black (#000000)
- **Effects:** 
  - Smooth cursor trail
  - Hover glows
  - Card animations
  - Gradient borders

---

## 🐛 Troubleshooting

### Backend won't start
**Problem:** Port 3001 already in use  
**Solution:** 
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Frontend shows blank page
**Problem:** Backend not running  
**Solution:** Ensure backend is running on port 3001

### Map not loading
**Problem:** Leaflet CSS not loaded  
**Solution:** Clear browser cache and refresh

### AI Chat not responding
**Problem:** Invalid GitHub token  
**Solution:** Check `.env` file for correct `GITHUB_MODELS_TOKEN`

### Weather data not showing
**Problem:** Invalid API key  
**Solution:** Verify `OPENWEATHER_API_KEY` in `.env`

---

## 🔧 Development Commands

```bash
# Backend
cd backend
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run start        # Start production server

# Frontend  
cd frontend
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
```

---

## 📝 License

MIT License - feel free to use for personal or commercial projects!

---

## 🙏 Credits

- **Weather Data:** [OpenWeather API](https://openweathermap.org/)
- **AI:** [GitHub Models](https://github.com/marketplace/models)
- **Maps:** [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)
- **Icons:** Emoji

---

## 🎉 Enjoy!

**Your AI Crop Advisor is now ready to use!** 🌾✨

For issues or questions, check the [Troubleshooting](#-troubleshooting) section above.

**Happy Farming!** 🚜
