import { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { fetchWeather, fetchCropRecommendations } from '../services/api';

export function useWeather() {
  const { state, setWeatherData, setCropRecommendations, setLoading, setError } = useApp();

  const loadWeatherData = useCallback(async (lat: number, lon: number, location: { lat: number; lon: number } | null) => {
    if (!lat || !lon) return;

    try {
      setError(null);
      setLoading('weather', true);

      const weather = await fetchWeather(lat, lon);
      setWeatherData(weather);

      // Automatically fetch crop recommendations when weather is loaded
      if (location) {
        setLoading('crops', true);
        try {
          const recommendations = await fetchCropRecommendations(
            location,
            weather
          );
          setCropRecommendations(recommendations);
        } catch (err: any) {
          console.error('Failed to fetch crop recommendations:', err);
          setError(`Failed to load crop recommendations: ${err.message}`);
        } finally {
          setLoading('crops', false);
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch weather:', err);
      setError(`Failed to load weather data: ${err.message}`);
      setWeatherData(null);
    } finally {
      setLoading('weather', false);
    }
  }, [setWeatherData, setCropRecommendations, setLoading, setError]);

  useEffect(() => {
    if (state.selectedLocation) {
      loadWeatherData(
        state.selectedLocation.lat,
        state.selectedLocation.lon,
        state.selectedLocation
      );
    }
  }, [state.selectedLocation, loadWeatherData]);

  return { loadWeatherData };
}

