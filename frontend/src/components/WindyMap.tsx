import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

// Extend Window interface to include windyAPI
declare global {
  interface Window {
    windyAPI?: any;
  }
}

interface WindyMapProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

export function WindyMap({ onLocationSelect }: WindyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const pickerRef = useRef<any>(null);
  const { state } = useApp();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Wait for Windy API to be available
    const initMap = () => {
      if (!window.windyAPI) {
        console.warn('Windy API not loaded yet, retrying...');
        setTimeout(initMap, 100);
        return;
      }

      try {
        // Initialize Windy map
        // Documentation: https://api.windy.com/assets/map-forecast/docs/
        // Note: Adjust initialization based on actual Windy API documentation
        const options = {
          key: '', // API key should be passed via backend config or environment
          // For now, we'll use the public demo or require key from backend
          lat: state.selectedLocation?.lat || 50.4,
          lon: state.selectedLocation?.lon || 14.3,
          zoom: 5,
        };

        // Initialize the map
        // This is a placeholder - adjust based on actual Windy API initialization
        window.windyAPI?.init(options, (windyAPI: any) => {
          mapInstanceRef.current = windyAPI;

          // Add click handler to map
          windyAPI.on('click', (data: any) => {
            const { lat, lon } = data;
            onLocationSelect(lat, lon);
          });

          // Enable picker (crosshair) for location selection
          pickerRef.current = windyAPI.picker({
            onPick: (data: any) => {
              const { lat, lon } = data;
              onLocationSelect(lat, lon);
            },
          });

          // Center on selected location if available
          if (state.selectedLocation) {
            windyAPI.map.setView(
              [state.selectedLocation.lat, state.selectedLocation.lon],
              10
            );
          }
        });
      } catch (error) {
        console.error('Failed to initialize Windy map:', error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (pickerRef.current) {
        pickerRef.current.stop();
      }
      if (mapInstanceRef.current) {
        // Cleanup map instance if needed
      }
    };
  }, []); // Only run once on mount

  // Update map center when location changes
  useEffect(() => {
    if (mapInstanceRef.current && state.selectedLocation) {
      mapInstanceRef.current.map?.setView(
        [state.selectedLocation.lat, state.selectedLocation.lon],
        10
      );
    }
  }, [state.selectedLocation]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
      id="windy"
    />
  );
}

