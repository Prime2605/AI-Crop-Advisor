import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export function WeatherTab() {
  const { state } = useApp();
  const { weatherData, loading, error, selectedLocation } = state;

  if (!selectedLocation) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: '#666',
        }}
      >
        <p>Click on the map to select a location</p>
      </div>
    );
  }

  if (loading.weather) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '24px',
          color: '#d32f2f',
        }}
      >
        <p style={{ fontWeight: '600', marginBottom: '8px' }}>Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: '#666',
        }}
      >
        <p>No weather data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '24px' }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginTop: 0, marginBottom: '24px', color: '#1976d2' }}
      >
        Current Weather
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: '24px' }}
      >
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
          Location: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
        </p>
        <p style={{ color: '#666', fontSize: '12px', marginBottom: '16px' }}>
          Last updated: {new Date(weatherData.timestamp).toLocaleString()}
        </p>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gap: '16px',
        }}
      >
        {[
          { label: 'Temperature', value: `${weatherData.temperature.toFixed(1)}°C`, icon: '🌡️' },
          { label: 'Precipitation', value: `${weatherData.precipitation.toFixed(1)} mm`, icon: '🌧️' },
          { label: 'Wind Speed', value: `${weatherData.windSpeed.toFixed(1)} m/s`, icon: '💨' },
          { label: 'Wind Direction', value: `${weatherData.windDirection.toFixed(0)}°`, icon: '🧭' },
          { label: 'Humidity', value: `${weatherData.humidity.toFixed(1)}%`, icon: '💧' },
          { label: 'Pressure', value: `${weatherData.pressure.toFixed(1)} hPa`, icon: '📊' },
          { label: 'Cloud Cover', value: `${weatherData.cloudCover.toFixed(1)}%`, icon: '☁️' },
        ].map((item, index) => (
          <WeatherCard
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
            index={index}
          />
        ))}
      </div>

      {weatherData.forecast && weatherData.forecast.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: '32px' }}
        >
          <h3 style={{ marginBottom: '16px', color: '#1976d2' }}>Forecast</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {weatherData.forecast.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                style={{
                  padding: '12px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: '600' }}>
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>
                    {new Date(item.date).toLocaleTimeString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontWeight: '600' }}>
                    {item.temperature.toFixed(1)}°C
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>
                    {item.precipitation.toFixed(1)} mm | {item.windSpeed.toFixed(1)} m/s
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function WeatherCard({
  label,
  value,
  icon,
  index,
}: {
  label: string;
  value: string;
  icon: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      style={{
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
      }}
    >
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        style={{ fontSize: '24px' }}
      >
        {icon}
      </motion.span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{label}</p>
        <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '600' }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

