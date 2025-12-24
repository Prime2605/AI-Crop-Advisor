import axios from 'axios';
import config from '../config';

// =============================================================================
// WEATHER SERVICE - Fetches weather data from WeatherAPI.com
// =============================================================================

export interface WeatherData {
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    cloudCover: number;
    condition: string;
    icon: string;
    location: {
        name: string;
        region: string;
        country: string;
    };
    forecast?: {
        date: string;
        maxTemp: number;
        minTemp: number;
        condition: string;
    }[];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
        const response = await axios.get(`${config.weatherApi.baseUrl}/forecast.json`, {
            params: {
                key: config.weatherApi.key,
                q: `${lat},${lon}`,
                days: 5,
                aqi: 'no',
            },
            timeout: 10000,
        });

        const data = response.data;
        const current = data.current;
        const location = data.location;

        return {
            temperature: current.temp_c,
            humidity: current.humidity,
            precipitation: current.precip_mm,
            windSpeed: current.wind_kph,
            windDirection: current.wind_degree,
            pressure: current.pressure_mb,
            cloudCover: current.cloud,
            condition: current.condition.text,
            icon: current.condition.icon,
            location: {
                name: location.name,
                region: location.region,
                country: location.country,
            },
            forecast: data.forecast?.forecastday?.map((day: any) => ({
                date: day.date,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c,
                condition: day.day.condition.text,
            })),
        };
    } catch (error: any) {
        console.error('Weather API error:', error.message);
        // Return fallback data
        return getFallbackWeather(lat, lon);
    }
}

function getFallbackWeather(lat: number, lon: number): WeatherData {
    // Estimate temp based on latitude
    const absLat = Math.abs(lat);
    let temp = 25;
    if (absLat < 23.5) temp = 30;
    else if (absLat < 35) temp = 25;
    else if (absLat < 55) temp = 15;
    else temp = 5;

    return {
        temperature: temp,
        humidity: 60,
        precipitation: 0,
        windSpeed: 10,
        windDirection: 180,
        pressure: 1013,
        cloudCover: 30,
        condition: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        location: {
            name: 'Unknown',
            region: '',
            country: '',
        },
    };
}
