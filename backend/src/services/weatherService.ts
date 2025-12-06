import axios from 'axios';
import { WeatherData } from '../types';

const WINDY_POINT_API_KEY = process.env.WINDY_POINT_API_KEY || process.env.WINDY_API_KEY || 'n0HATHjcJTliIOKd3jXeCm440JutQdSN';

if (!WINDY_POINT_API_KEY) {
  console.warn('WARNING: WINDY_POINT_API_KEY is not set in environment variables');
}

/**
 * Fetches weather data from Windy Point Forecast API
 * Documentation: https://api.windy.com/api/point-forecast/v2.0/docs
 */
export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  if (!WINDY_POINT_API_KEY) {
    throw new Error('WINDY_POINT_API_KEY is not configured');
  }

  try {
    // Windy Point Forecast API endpoint
    // Using the actual Windy API structure
    const url = `https://api.windy.com/api/point-forecast/v2.0/forecast`;
    
    const response = await axios.get(url, {
      params: {
        lat,
        lon,
        key: WINDY_POINT_API_KEY,
        model: 'gfs', // Global Forecast System model
        levels: ['surface'],
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    // Transform Windy API response to our WeatherData format
    const data = response.data;
    
    // Windy API returns data in a specific structure
    // Extract current weather from the first timestamp
    const timestamps = data.ts || [];
    const currentTs = timestamps[0] || Date.now() / 1000;
    const currentData = data.data || {};
    
    // Extract surface level data
    const surface = currentData[`${currentTs}`]?.surface || {};
    
    // Map Windy API fields to our format
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
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch weather data: ${error.response?.status} ${error.response?.statusText} - ${error.message}`
      );
    }
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

