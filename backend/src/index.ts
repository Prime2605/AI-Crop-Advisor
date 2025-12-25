import express from 'express';
import cors from 'cors';
import config, { logConfigStatus } from './config';
import { getWeather } from './services/weather';
import { testConnection, chat, getCropRecommendations, isAIAvailable, getWorkingModel } from './services/ai';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =============================================================================
// ROUTES
// =============================================================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        aiAvailable: isAIAvailable(),
        aiModel: getWorkingModel() || 'fallback',
    });
});

// Frontend config (exposes safe-to-share keys)
app.get('/api/config/frontend', (req, res) => {
    res.json({
        windyMapApiKey: config.windy.mapKey,
        apiBaseUrl: '/api',
    });
});

// Weather data
app.get('/api/weather', async (req, res) => {
    try {
        const lat = parseFloat(req.query.lat as string);
        const lon = parseFloat(req.query.lon as string);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ error: 'Invalid lat/lon parameters' });
        }

        const weather = await getWeather(lat, lon);
        res.json(weather);
    } catch (error: any) {
        console.error('Weather error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// AI Chat
app.post('/api/ai/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await chat(message);
        res.json({
            success: true,
            response,
            aiPowered: isAIAvailable(),
            model: getWorkingModel() || 'fallback',
        });
    } catch (error: any) {
        res.json({
            success: true,
            response: 'I can help with crop recommendations. What would you like to know?',
            aiPowered: false,
            model: 'fallback',
        });
    }
});

// AI Crop Recommendations
app.post('/api/ai/recommend', async (req, res) => {
    try {
        const { lat, lon, temperature, humidity, precipitation } = req.body;

        // Determine climate zone
        let climate = 'subtropical';
        if (lat !== undefined) {
            const absLat = Math.abs(lat);
            if (absLat < 23.5) climate = 'tropical';
            else if (absLat < 35) climate = 'subtropical';
            else if (absLat < 55) climate = 'temperate';
            else climate = 'cool-temperate';
        }

        // Pass weather data to ChatGPT for better recommendations
        const weather = (temperature || humidity || precipitation) ? {
            temperature: temperature || 25,
            humidity: humidity || 60,
            precipitation: precipitation || 0,
        } : undefined;

        const crops = await getCropRecommendations(lat || 0, lon || 0, climate, weather);

        const recommendations = crops.map((crop, idx) => ({
            id: `crop-${idx + 1}`,
            common_name: crop.name,
            scientific_name: crop.scientificName,
            description: crop.reason,
            suitability: crop.suitability,
        }));

        res.json({
            success: true,
            climateZone: climate,
            recommendations,
            aiPowered: isAIAvailable(),
            model: getWorkingModel() || 'fallback',
        });
    } catch (error: any) {
        console.error('Recommend error:', error.message);
        res.json({
            success: true,
            climateZone: 'subtropical',
            recommendations: [
                { id: '1', common_name: 'Rice', scientific_name: 'Oryza sativa', description: 'Staple grain', suitability: 90 },
                { id: '2', common_name: 'Wheat', scientific_name: 'Triticum aestivum', description: 'Cereal grain', suitability: 85 },
                { id: '3', common_name: 'Corn', scientific_name: 'Zea mays', description: 'Versatile grain', suitability: 80 },
            ],
            aiPowered: false,
            model: 'fallback',
        });
    }
});

// AI Status
app.get('/api/ai/status', async (req, res) => {
    res.json({
        success: true,
        aiAvailable: isAIAvailable(),
        model: getWorkingModel() || 'fallback',
    });
});

// =============================================================================
// STARTUP
// =============================================================================

async function start() {
    logConfigStatus();

    console.log('🔄 Testing AI connection...');
    await testConnection();

    app.listen(config.port, () => {
        console.log(`\n🚀 Server running on http://localhost:${config.port}`);
        console.log(`📊 Health: http://localhost:${config.port}/api/health`);
        console.log(`🌤️  Weather: http://localhost:${config.port}/api/weather?lat=28.6&lon=77.2`);
        console.log(`💬 AI Chat: POST http://localhost:${config.port}/api/ai/chat`);
        console.log(`🌱 Crops: POST http://localhost:${config.port}/api/ai/recommend\n`);
    });
}

// Only start server in development (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
    start().catch(console.error);
}

// Export for Vercel serverless
export default app;
