import axios from 'axios';
import { WeatherData, CropRecommendation, Location } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const response = await api.get<WeatherData>('/weather', {
    params: { lat, lon },
  });
  return response.data;
}

export async function fetchCropRecommendations(
  location: Location,
  weather: WeatherData
): Promise<CropRecommendation[]> {
  const response = await api.post<CropRecommendation[]>('/crop-recommend', {
    location,
    weather: {
      temperature: weather.temperature,
      precipitation: weather.precipitation,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
    },
  });
  return response.data;
}

