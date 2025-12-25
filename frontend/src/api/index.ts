import axios from 'axios';
import { WeatherData, CropRecommendation, Location } from '../types';

const API_BASE = import.meta.env.PROD
    ? 'https://ai-crop-advisor-m15b-5f18vc8i8-prime-r-ss-projects.vercel.app/api'
    : 'http://localhost:3001/api';

// Fetch frontend config (includes Windy Map API key)
export async function getConfig(): Promise<{ windyMapApiKey: string }> {
    try {
        const res = await axios.get(`${API_BASE}/config/frontend`);
        return res.data;
    } catch {
        return { windyMapApiKey: 'n0HATHjcJTliIOKd3jXeCm440JutQdSN' };
    }
}

// Fetch weather data
export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
    const res = await axios.get(`${API_BASE}/weather`, { params: { lat, lon } });
    return res.data;
}

// Fetch crop recommendations with weather data for ChatGPT
export async function getCropRecommendations(
    location: Location,
    weather?: { temperature: number; humidity: number; precipitation: number }
): Promise<CropRecommendation[]> {
    const res = await axios.post(`${API_BASE}/ai/recommend`, {
        lat: location.lat,
        lon: location.lon,
        temperature: weather?.temperature,
        humidity: weather?.humidity,
        precipitation: weather?.precipitation,
    });
    return res.data.recommendations || [];
}

// AI Chat
export async function sendChatMessage(message: string): Promise<string> {
    const res = await axios.post(`${API_BASE}/ai/chat`, { message });
    return res.data.response;
}
