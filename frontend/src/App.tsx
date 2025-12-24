import { useState, useEffect, useCallback } from 'react';
import { getWeather, getCropRecommendations } from './api';
import { Location, WeatherData, CropRecommendation } from './types';
import { ChatTab } from './components/ChatTab';
import { LocationSearch } from './components/LocationSearch';
import { CropDetailModal } from './components/CropDetailModal';
import { Dashboard3D } from './components/Dashboard3D';

declare global {
    interface Window {
        L: any;
    }
}

type Tab = 'weather' | 'crops' | 'chat';
type View = 'main' | '3d';

function App() {
    const [view, setView] = useState<View>('3d'); // Default to new unified dashboard
    const [location, setLocation] = useState<Location | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [crops, setCrops] = useState<CropRecommendation[]>([]);
    const [loading, setLoading] = useState({ weather: false, crops: false });
    const [error, setError] = useState<string | null>(null);
    const [mapReady, setMapReady] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('weather');
    const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(null);
    const [map, setMap] = useState<any>(null);

    // Initialize Leaflet map
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => {
            initMap();
        };
        document.head.appendChild(script);

        return () => {
            link.remove();
            script.remove();
        };
    }, []);

    const initMap = useCallback(() => {
        const L = window.L;
        if (!L) return;

        const mapInstance = L.map('map').setView([20, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(mapInstance);

        let marker: any = null;

        mapInstance.on('click', (e: any) => {
            const { lat, lng } = e.latlng;

            if (marker) {
                marker.setLatLng(e.latlng);
            } else {
                marker = L.marker(e.latlng).addTo(mapInstance);
            }

            setLocation({ lat, lon: lng });
            setActiveTab('weather');
        });

        setMap(mapInstance);
        setMapReady(true);
    }, []);

    const handleLocationSelect = (loc: Location) => {
        setLocation(loc);
        setActiveTab('weather');

        // Update map position
        if (map && window.L) {
            map.setView([loc.lat, loc.lon], 10);

            // Add marker
            const L = window.L;
            L.marker([loc.lat, loc.lon]).addTo(map);
        }
    };

    // Fetch data when location changes
    useEffect(() => {
        if (!location) return;

        const fetchData = async () => {
            setError(null);

            // Fetch weather
            setLoading(l => ({ ...l, weather: true }));
            try {
                const weatherData = await getWeather(location.lat, location.lon);
                setWeather(weatherData);
            } catch (err: any) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(l => ({ ...l, weather: false }));
            }

            // Fetch crop recommendations
            setLoading(l => ({ ...l, crops: true }));
            try {
                const weatherData = weather || await getWeather(location.lat, location.lon);
                const cropData = await getCropRecommendations(location, {
                    temperature: weatherData.temperature,
                    humidity: weatherData.humidity,
                    precipitation: weatherData.precipitation,
                });
                setCrops(cropData);
            } catch (err: any) {
                console.error('Failed to fetch crops:', err);
            } finally {
                setLoading(l => ({ ...l, crops: false }));
            }
        };

        fetchData();
    }, [location]);

    // If 3D view is active, show Dashboard3D
    if (view === '3d') {
        return <Dashboard3D />;
    }

    return (
        <div className="app">
            {/* Map */}
            <div className="map-container">
                <LocationSearch onLocationSelect={handleLocationSelect} />

                {/* 3D View Toggle Button */}
                <button
                    className="view-3d-button glass-panel"
                    onClick={() => setView('3d')}
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '20px',
                        zIndex: 1000,
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #D4AF37 0%, #B8941E 100%)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    🌍 View 3D Dashboard
                </button>

                <div id="map" className="map" />
                {!mapReady && (
                    <div className="map-loading">
                        <div className="spinner" />
                        <p>Loading map...</p>
                    </div>
                )}
            </div>

            {/* Side Panel */}
            <div className="side-panel">
                <div className="panel-header">
                    <h1>🌱 Crop Advisor</h1>
                    <p>AI-Powered Agriculture Intelligence</p>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'weather' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('weather')}
                    >
                        ☀️ Weather
                    </button>
                    <button
                        className={`tab ${activeTab === 'crops' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('crops')}
                    >
                        🌾 Crops
                    </button>
                    <button
                        className={`tab ${activeTab === 'chat' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('chat')}
                    >
                        💬 AI Chat
                    </button>
                </div>

                <div className="panel-content">
                    {error && <div className="error-banner">{error}</div>}

                    {activeTab === 'weather' && (
                        <>
                            {!location ? (
                                <div className="empty-state">
                                    <div className="icon">📍</div>
                                    <p>Search or click on the map to select a location</p>
                                </div>
                            ) : (
                                <div className="weather-card">
                                    <h2>☀️ Weather</h2>
                                    {loading.weather ? (
                                        <div className="loading-state">
                                            <div className="spinner" />
                                        </div>
                                    ) : weather ? (
                                        <>
                                            <div className="weather-main">
                                                <div className="weather-temp">{Math.round(weather.temperature)}°C</div>
                                                <div className="weather-condition">
                                                    <div className="condition">{weather.condition}</div>
                                                    <div className="location">
                                                        {weather.location.name}
                                                        {weather.location.country && `, ${weather.location.country}`}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weather-grid">
                                                <div className="weather-stat">
                                                    <div className="label">Humidity</div>
                                                    <div className="value">{weather.humidity}%</div>
                                                </div>
                                                <div className="weather-stat">
                                                    <div className="label">Wind</div>
                                                    <div className="value">{weather.windSpeed} km/h</div>
                                                </div>
                                                <div className="weather-stat">
                                                    <div className="label">Pressure</div>
                                                    <div className="value">{weather.pressure} hPa</div>
                                                </div>
                                                <div className="weather-stat">
                                                    <div className="label">Precipitation</div>
                                                    <div className="value">{weather.precipitation} mm</div>
                                                </div>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'crops' && (
                        <div className="crops-section">
                            <h2>🌾 Recommended Crops</h2>
                            {!location ? (
                                <div className="empty-state">
                                    <div className="icon">🌱</div>
                                    <p>Select a location to see crop recommendations</p>
                                </div>
                            ) : loading.crops ? (
                                <div className="loading-state">
                                    <div className="spinner" />
                                </div>
                            ) : crops.length > 0 ? (
                                crops.map((crop) => (
                                    <div
                                        key={crop.id}
                                        className="crop-card"
                                        onClick={() => setSelectedCrop(crop)}
                                    >
                                        <div className="crop-header">
                                            <span className="crop-name">{crop.common_name}</span>
                                            <span className="crop-score">{crop.suitability}%</span>
                                        </div>
                                        <div className="crop-scientific">{crop.scientific_name}</div>
                                        <div className="crop-reason">{crop.description}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <p>No crop recommendations yet</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'chat' && <ChatTab />}
                </div>
            </div>

            {/* Crop Detail Modal */}
            {selectedCrop && (
                <CropDetailModal
                    crop={selectedCrop}
                    onClose={() => setSelectedCrop(null)}
                />
            )}
        </div>
    );
}

export default App;
