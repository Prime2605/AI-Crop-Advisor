import axios from 'axios';
import { WeatherData } from '../types';
import { getWindyApiKey } from '../config/windyConfig';

// WeatherAPI.com API key
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '2966f797a82341918f382530250712';
const WINDY_POINT_API_KEY = getWindyApiKey('pointApi');

/**
 * Fetches weather data from WeatherAPI.com (primary)
 * Falls back to Windy API if WeatherAPI fails
 */
export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    // Try WeatherAPI.com first
    return await fetchFromWeatherApi(lat, lon);
  } catch (error: any) {
    console.warn('WeatherAPI.com failed, trying Windy API:', error.message);
    return await fetchFromWindyApi(lat, lon);
  }
}

/**
 * Fetch weather from WeatherAPI.com
 */
async function fetchFromWeatherApi(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.weatherapi.com/v1/forecast.json`;

  const response = await axios.get(url, {
    params: {
      key: WEATHER_API_KEY,
      q: `${lat},${lon}`,
      days: 7,
      aqi: 'no',
      alerts: 'no',
    },
  });

  const data = response.data;
  const current = data.current;
  const location = data.location;

  return {
    temperature: current.temp_c,
    precipitation: current.precip_mm,
    windSpeed: current.wind_kph,
    windDirection: current.wind_degree,
    humidity: current.humidity,
    pressure: current.pressure_mb,
    cloudCover: current.cloud,
    timestamp: new Date().toISOString(),
    location: {
      name: location.name,
      region: location.region,
      country: location.country,
    },
    condition: {
      text: current.condition.text,
      icon: current.condition.icon,
    },
    forecast: data.forecast.forecastday.slice(0, 5).map((day: any) => ({
      date: day.date,
      temperature: day.day.avgtemp_c,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      precipitation: day.day.totalprecip_mm,
      windSpeed: day.day.maxwind_kph,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    })),
  };
}

/**
 * Fallback: Fetch weather from Windy API
 */
async function fetchFromWindyApi(lat: number, lon: number): Promise<WeatherData> {
  if (!WINDY_POINT_API_KEY) {
    throw new Error('No weather API keys configured');
  }

  const url = `https://api.windy.com/api/point-forecast/v2.0/forecast`;

  const response = await axios.get(url, {
    params: {
      lat,
      lon,
      key: WINDY_POINT_API_KEY,
      model: 'gfs',
      levels: ['surface'],
    },
    headers: {
      'Accept': 'application/json',
    },
  });

  const data = response.data;
  const timestamps = data.ts || [];
  const currentTs = timestamps[0] || Date.now() / 1000;
  const currentData = data.data || {};
  const surface = currentData[`${currentTs}`]?.surface || {};

  return {
    temperature: surface.temp || surface['2m']?.temp || 15,
    precipitation: surface.precip || surface.precipitation || 0,
    windSpeed: surface.windSpeed || surface.ws || 0,
    windDirection: surface.windDirection || surface.wd || 0,
    humidity: surface.rh || surface.humidity || 50,
    pressure: surface.pressure || surface.pres || 1013.25,
    cloudCover: surface.cloudTotal || surface.cloud || 0,
    timestamp: new Date().toISOString(),
    forecast: timestamps.slice(1, 6).map((ts: number) => {
      const forecastData = data.data?.[`${ts}`]?.surface || {};
      return {
        date: new Date(ts * 1000).toISOString(),
        temperature: forecastData.temp || forecastData['2m']?.temp || 15,
        precipitation: forecastData.precip || forecastData.precipitation || 0,
        windSpeed: forecastData.windSpeed || forecastData.ws || 0,
      };
    }),
  };
}
