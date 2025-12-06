import { useState } from 'react';
import { WeatherTab } from './WeatherTab';
import { CropRecommendationsTab } from './CropRecommendationsTab';

export function SidePanel() {
  const [activeTab, setActiveTab] = useState<'weather' | 'crops'>('weather');

  return (
    <div
      style={{
        width: '400px',
        height: '100%',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
        }}
      >
        <button
          onClick={() => setActiveTab('weather')}
          style={{
            flex: 1,
            padding: '16px',
            border: 'none',
            backgroundColor: activeTab === 'weather' ? '#ffffff' : 'transparent',
            cursor: 'pointer',
            fontWeight: activeTab === 'weather' ? '600' : '400',
            color: activeTab === 'weather' ? '#1976d2' : '#666',
            borderBottom: activeTab === 'weather' ? '2px solid #1976d2' : '2px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          Weather
        </button>
        <button
          onClick={() => setActiveTab('crops')}
          style={{
            flex: 1,
            padding: '16px',
            border: 'none',
            backgroundColor: activeTab === 'crops' ? '#ffffff' : 'transparent',
            cursor: 'pointer',
            fontWeight: activeTab === 'crops' ? '600' : '400',
            color: activeTab === 'crops' ? '#1976d2' : '#666',
            borderBottom: activeTab === 'crops' ? '2px solid #1976d2' : '2px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          Crop Recommendations
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'weather' && <WeatherTab />}
        {activeTab === 'crops' && <CropRecommendationsTab />}
      </div>
    </div>
  );
}

