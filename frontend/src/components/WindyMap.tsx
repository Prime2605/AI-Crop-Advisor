import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getFrontendConfig } from '../services/config';
import axios from 'axios';

// Extend Window interface
declare global {
  interface Window {
    windyAPI?: any;
    windyInit?: (options: any, callback: (api: any) => void) => void;
    L?: any;
  }
}

interface WindyMapProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

interface CropRecommendation {
  id: string;
  common_name: string;
  scientific_name: string;
  suitability: number;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  condition?: { text: string; icon: string };
  location?: { name: string; region: string; country: string };
  forecast?: Array<{
    date: string;
    temperature: number;
    maxTemp?: number;
    minTemp?: number;
    condition?: string;
    icon?: string;
  }>;
}

export function WindyMap({ onLocationSelect }: WindyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const pickerRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useApp();

  // Fetch weather data for a location
  const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
    try {
      const response = await axios.get('/api/weather', { params: { lat, lon } });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
    return null;
  };

  // Fetch crop recommendations for a location
  const fetchCropRecommendations = async (lat: number, lon: number) => {
    try {
      const response = await axios.post('/api/ai/recommend', { lat, lon });
      if (response.data.success) {
        return {
          crops: response.data.recommendations,
          climateZone: response.data.climateZone,
        };
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
    return { crops: [], climateZone: 'unknown' };
  };

  // Create popup HTML content with weather data
  const createPopupContent = (
    lat: number,
    lon: number,
    weather: WeatherData | null,
    crops: CropRecommendation[],
    climateZone: string,
    loading: boolean
  ): string => {
    if (loading) {
      return `
        <div style="min-width: 320px; padding: 12px;">
          <div style="display: flex; align-items: center; gap: 10px; color: #1976d2;">
            <div style="width: 24px; height: 24px; border: 3px solid #e3f2fd; border-top-color: #1976d2; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <span style="font-weight: 500;">Loading weather & crop data...</span>
          </div>
          <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        </div>
      `;
    }

    // Weather section HTML
    const weatherSection = weather ? `
      <div style="background: linear-gradient(135deg, #1976d2, #42a5f5); color: white; padding: 16px; margin: -14px -14px 12px -14px; border-radius: 8px 8px 0 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div style="font-size: 18px; font-weight: 700;">${weather.location?.name || 'Location'}</div>
            <div style="font-size: 12px; opacity: 0.85; margin-top: 2px;">${weather.location?.region || ''}, ${weather.location?.country || ''}</div>
            <div style="font-size: 11px; opacity: 0.7; margin-top: 4px;">${lat.toFixed(4)}°, ${lon.toFixed(4)}°</div>
          </div>
          ${weather.condition?.icon ? `<img src="https:${weather.condition.icon}" style="width: 56px; height: 56px;" alt="${weather.condition.text}"/>` : ''}
        </div>
        <div style="margin-top: 12px; display: flex; align-items: baseline; gap: 8px;">
          <span style="font-size: 42px; font-weight: 700;">${Math.round(weather.temperature)}°C</span>
          <span style="font-size: 14px; opacity: 0.9;">${weather.condition?.text || ''}</span>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px;">
        <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 18px;">💧</div>
          <div style="font-size: 14px; font-weight: 600; color: #1976d2;">${weather.humidity}%</div>
          <div style="font-size: 10px; color: #888;">Humidity</div>
        </div>
        <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 18px;">💨</div>
          <div style="font-size: 14px; font-weight: 600; color: #1976d2;">${weather.windSpeed} km/h</div>
          <div style="font-size: 10px; color: #888;">Wind</div>
        </div>
        <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 18px;">🌧️</div>
          <div style="font-size: 14px; font-weight: 600; color: #1976d2;">${weather.precipitation} mm</div>
          <div style="font-size: 10px; color: #888;">Precip</div>
        </div>
        <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 18px;">🌡️</div>
          <div style="font-size: 14px; font-weight: 600; color: #1976d2;">${climateZone}</div>
          <div style="font-size: 10px; color: #888;">Climate</div>
        </div>
      </div>

      ${weather.forecast && weather.forecast.length > 0 ? `
        <div style="margin-bottom: 16px;">
          <div style="font-size: 13px; font-weight: 600; color: #333; margin-bottom: 8px;">📅 5-Day Forecast</div>
          <div style="display: flex; gap: 6px; overflow-x: auto;">
            ${weather.forecast.slice(0, 5).map((day: any) => `
              <div style="flex: 1; min-width: 55px; text-align: center; padding: 8px 4px; background: #f0f7ff; border-radius: 8px;">
                <div style="font-size: 10px; color: #888;">${new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}</div>
                ${day.icon ? `<img src="https:${day.icon}" style="width: 32px; height: 32px;" alt="${day.condition}"/>` : ''}
                <div style="font-size: 12px; font-weight: 600; color: #333;">${Math.round(day.maxTemp || day.temperature)}°</div>
                ${day.minTemp != null ? `<div style="font-size: 10px; color: #888;">${Math.round(day.minTemp)}°</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    ` : `
      <div style="background: linear-gradient(135deg, #1976d2, #42a5f5); color: white; padding: 16px; margin: -14px -14px 12px -14px; border-radius: 8px 8px 0 0;">
        <div style="font-size: 16px; font-weight: 700;">📍 Location</div>
        <div style="font-size: 13px; margin-top: 6px; opacity: 0.9;">
          ${lat.toFixed(4)}°, ${lon.toFixed(4)}°
        </div>
      </div>
      <div style="padding: 12px; background: #fff3cd; border-radius: 8px; margin-bottom: 16px; color: #856404; font-size: 12px;">
        ⚠️ Weather data unavailable for this location
      </div>
    `;

    // Crop recommendations section
    const cropList = crops.slice(0, 5).map(crop => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div>
          <div style="font-weight: 600; color: #333;">${crop.common_name}</div>
          <div style="font-size: 11px; color: #888; font-style: italic;">${crop.scientific_name}</div>
        </div>
        <div style="background: linear-gradient(135deg, #4caf50, #81c784); color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">
          ${Math.round(crop.suitability)}%
        </div>
      </div>
    `).join('');

    return `
      <div style="min-width: 340px; max-width: 400px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        ${weatherSection}
        
        <div style="font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <span>🌱</span> Recommended Crops
        </div>
        
        ${crops.length > 0 ? cropList : '<div style="color: #888; padding: 12px; text-align: center;">No recommendations available</div>'}
        
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e0e0e0; text-align: center;">
          <div style="font-size: 11px; color: #888;">Click "Crop Recommendations" tab for more details</div>
        </div>
      </div>
    `;
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let retryCount = 0;
    const maxRetries = 50;

    const initMap = async () => {
      if (typeof window.windyAPI === 'undefined' && typeof window.windyInit === 'undefined') {
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(initMap, 100);
          return;
        } else {
          setMapError('Using OpenStreetMap (Windy unavailable)');
          setIsLoading(false);
          initFallbackMap();
          return;
        }
      }

      try {
        setIsLoading(true);
        const config = await getFrontendConfig();

        const initWindyMap = () => {
          const options = {
            key: config.windyMapApiKey,
            lat: state.selectedLocation?.lat || 50.4,
            lon: state.selectedLocation?.lon || 14.3,
            zoom: 5,
          };

          if (window.windyAPI && typeof window.windyAPI.init === 'function') {
            window.windyAPI.init(options, (windyAPI: any) => {
              mapInstanceRef.current = windyAPI;
              setupMapHandlers(windyAPI);
              setIsLoading(false);
              setMapError(null);
            });
            return;
          }

          if (window.windyInit && typeof window.windyInit === 'function') {
            window.windyInit(options, (windyAPI: any) => {
              mapInstanceRef.current = windyAPI;
              setupMapHandlers(windyAPI);
              setIsLoading(false);
              setMapError(null);
            });
            return;
          }

          initFallbackMap();
        };

        initWindyMap();
      } catch (error) {
        console.error('Failed to initialize Windy map:', error);
        setMapError('Failed to load Windy map. Using fallback.');
        initFallbackMap();
      }
    };

    const setupMapHandlers = (windyAPI: any) => {
      try {
        if (windyAPI.on && typeof windyAPI.on === 'function') {
          windyAPI.on('click', (data: any) => {
            const lat = data.lat || data[0];
            const lon = data.lon || data[1];
            if (lat && lon) {
              onLocationSelect(lat, lon);
            }
          });
        }

        if (state.selectedLocation && windyAPI.map && windyAPI.map.setView) {
          windyAPI.map.setView([state.selectedLocation.lat, state.selectedLocation.lon], 10);
        }
      } catch (error) {
        console.error('Error setting up map handlers:', error);
      }
    };

    const initFallbackMap = () => {
      if (!mapContainerRef.current) return;

      if (window.L) {
        initLeafletMap();
        return;
      }

      if (!document.querySelector('link[href*="leaflet"]')) {
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCSS);
      }

      if (!document.querySelector('script[src*="leaflet"]')) {
        const leafletJS = document.createElement('script');
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.onload = () => initLeafletMap();
        leafletJS.onerror = () => {
          setMapError('Map libraries failed to load');
          setIsLoading(false);
        };
        document.body.appendChild(leafletJS);
      } else {
        setTimeout(initLeafletMap, 100);
      }
    };

    const initLeafletMap = () => {
      if (!mapContainerRef.current || !window.L) {
        setTimeout(initLeafletMap, 100);
        return;
      }

      try {
        const L = window.L;

        if (mapInstanceRef.current && mapInstanceRef.current.remove) {
          mapInstanceRef.current.remove();
        }

        const map = L.map(mapContainerRef.current, {
          center: [state.selectedLocation?.lat || 20, state.selectedLocation?.lon || 0],
          zoom: 3,
          zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors | AI Crop Advisor',
          maxZoom: 19,
        }).addTo(map);

        // Enhanced click handler with weather + crops
        map.on('click', async (e: any) => {
          const lat = e.latlng.lat;
          const lon = e.latlng.lng;
          onLocationSelect(lat, lon);

          if (markerRef.current) {
            map.removeLayer(markerRef.current);
          }

          if (popupRef.current) {
            map.closePopup(popupRef.current);
          }

          markerRef.current = L.marker([lat, lon], {
            icon: L.divIcon({
              className: 'custom-marker',
              html: `<div style="
                background: linear-gradient(135deg, #1976d2, #42a5f5); 
                width: 28px; 
                height: 28px; 
                border-radius: 50% 50% 50% 0; 
                transform: rotate(-45deg);
                border: 3px solid white; 
                box-shadow: 0 3px 10px rgba(0,0,0,0.3);
              "></div>`,
              iconSize: [28, 28],
              iconAnchor: [14, 28],
              popupAnchor: [0, -28],
            }),
          }).addTo(map);

          // Show loading popup immediately
          popupRef.current = L.popup({
            maxWidth: 450,
            className: 'crop-weather-popup',
          })
            .setLatLng([lat, lon])
            .setContent(createPopupContent(lat, lon, null, [], '', true))
            .openOn(map);

          // Fetch weather and recommendations in parallel
          const [weather, { crops, climateZone }] = await Promise.all([
            fetchWeatherData(lat, lon),
            fetchCropRecommendations(lat, lon),
          ]);

          // Update popup with results
          if (popupRef.current && map.hasLayer(popupRef.current)) {
            popupRef.current.setContent(createPopupContent(lat, lon, weather, crops, climateZone, false));
          }

          map.setView([lat, lon], Math.max(map.getZoom(), 6), {
            animate: true,
            duration: 0.5,
          });
        });

        mapInstanceRef.current = map;
        setIsLoading(false);
        setMapError(null);
      } catch (error) {
        console.error('Failed to initialize Leaflet map:', error);
        setMapError('Map initialization failed');
        setIsLoading(false);
      }
    };

    const timer = setTimeout(initMap, 500);

    return () => {
      clearTimeout(timer);
      if (pickerRef.current && typeof pickerRef.current.stop === 'function') {
        pickerRef.current.stop();
      }
      if (mapInstanceRef.current) {
        if (mapInstanceRef.current.remove) {
          mapInstanceRef.current.remove();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && state.selectedLocation) {
      try {
        if (mapInstanceRef.current.setView) {
          mapInstanceRef.current.setView(
            [state.selectedLocation.lat, state.selectedLocation.lon],
            10,
            { animate: true, duration: 0.5 }
          );
        }
      } catch (error) {
        console.error('Error updating map center:', error);
      }
    }
  }, [state.selectedLocation]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#e3f2fd',
      }}
      id="windy"
    >
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            padding: '24px 32px',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '28px',
              height: '28px',
              border: '3px solid #e3f2fd',
              borderTopColor: '#1976d2',
              borderRadius: '50%',
            }}
          />
          <div>
            <p style={{ margin: 0, color: '#1976d2', fontWeight: '600', fontSize: '16px' }}>Loading Map</p>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: '13px' }}>Click anywhere for weather & crop info</p>
          </div>
        </motion.div>
      )}

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '12px 24px',
            backgroundColor: 'rgba(25, 118, 210, 0.95)',
            borderRadius: '24px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>👆</span> Click anywhere for weather & crop recommendations
        </motion.div>
      )}

      {mapError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            padding: '12px 16px',
            backgroundColor: '#fff3cd',
            borderRadius: '8px',
            border: '1px solid #ffc107',
            fontSize: '14px',
            color: '#856404',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '300px',
          }}
        >
          <strong>Note:</strong> {mapError}
        </motion.div>
      )}
    </div>
  );
}
