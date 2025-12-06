import { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { WindyMap } from './components/WindyMap';
import { SidePanel } from './components/SidePanel';
import { AIDashboard } from './components/AIDashboard';
import { useWeather } from './hooks/useWeather';

function App() {
  const { setSelectedLocation } = useApp();
  const [currentView, setCurrentView] = useState<'map' | 'dashboard'>('map');
  useWeather(); // Automatically fetch weather when location changes

  const handleLocationSelect = (lat: number, lon: number) => {
    setSelectedLocation({ lat, lon });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      {currentView === 'map' ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              flex: 1,
              position: 'relative',
            }}
          >
            <WindyMap onLocationSelect={handleLocationSelect} />
          </div>
          <SidePanel />
        </div>
      ) : (
        <AIDashboard />
      )}
    </div>
  );
}

export default App;

