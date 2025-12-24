import { useState, useEffect } from 'react';
import { getWeather, getCropRecommendations } from '../api';
import { WeatherData, CropRecommendation, Location } from '../types';
import { CursorTrail } from './CursorTrail';
import '../dashboard-unified.css';
import '../chat-panel.css';
import '../cursor-effects.css';

declare global {
    interface Window {
        L: any;
    }
}

export function Dashboard3D() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [crops, setCrops] = useState<CropRecommendation[]>([]);
    const [location, setLocation] = useState<Location>({ lat: 28.6, lon: 77.2 });
    const [loading, setLoading] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
    const [chatInput, setChatInput] = useState('');

    useEffect(() => {
        initMap();
    }, []);

    useEffect(() => {
        if (location) fetchData();
    }, [location]);

    const initMap = () => {
        // Load Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        // Load Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => {
            if (!window.L) return;
            const L = window.L;

            // Create map with all controls enabled
            const mapInstance = L.map('unified-map', {
                center: [location.lat, location.lon],
                zoom: 5,
                zoomControl: true,      // Enable zoom buttons
                dragging: true,         // Enable dragging
                touchZoom: true,        // Enable touch zoom
                scrollWheelZoom: true,  // Enable scroll wheel zoom
                doubleClickZoom: true,  // Enable double click zoom
                boxZoom: true,          // Enable box zoom
                keyboard: true,         // Enable keyboard navigation
            });

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
                minZoom: 2,
            }).addTo(mapInstance);

            // Add marker on click
            let marker: any = null;
            mapInstance.on('click', (e: any) => {
                const { lat, lng } = e.latlng;

                if (marker) {
                    marker.setLatLng(e.latlng);
                } else {
                    marker = L.marker(e.latlng, {
                        draggable: true, // Make marker draggable too
                    }).addTo(mapInstance);

                    // Update location when marker is dragged
                    marker.on('dragend', () => {
                        const pos = marker.getLatLng();
                        setLocation({ lat: pos.lat, lon: pos.lng });
                    });
                }

                setLocation({ lat, lon: lng });
            });
        };
        document.head.appendChild(script);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const weatherData = await getWeather(location.lat, location.lon);
            setWeather(weatherData);

            const cropData = await getCropRecommendations(location, {
                temperature: weatherData.temperature,
                humidity: weatherData.humidity,
                precipitation: weatherData.precipitation,
            });
            setCrops(cropData.slice(0, 10));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCropIcon = (name: string) => {
        const lowerName = name.toLowerCase();

        // Vegetables
        if (lowerName.includes('tomato')) return '🍅';
        if (lowerName.includes('potato')) return '🥔';
        if (lowerName.includes('carrot')) return '🥕';
        if (lowerName.includes('onion')) return '🧅';
        if (lowerName.includes('garlic')) return '🧄';
        if (lowerName.includes('pepper') || lowerName.includes('chili') || lowerName.includes('capsicum')) return '🌶️';
        if (lowerName.includes('eggplant') || lowerName.includes('brinjal')) return '🍆';
        if (lowerName.includes('cucumber')) return '🥒';
        if (lowerName.includes('lettuce') || lowerName.includes('cabbage')) return '🥬';
        if (lowerName.includes('broccoli')) return '🥦';
        if (lowerName.includes('spinach') || lowerName.includes('kale')) return '🥬';
        if (lowerName.includes('pumpkin')) return '🎃';
        if (lowerName.includes('squash') || lowerName.includes('zucchini')) return '🥒';

        // Grains & Cereals
        if (lowerName.includes('rice') || lowerName.includes('paddy')) return '🌾';
        if (lowerName.includes('wheat')) return '🌾';
        if (lowerName.includes('corn') || lowerName.includes('maize')) return '🌽';
        if (lowerName.includes('barley') || lowerName.includes('oat') || lowerName.includes('rye')) return '🌾';
        if (lowerName.includes('millet') || lowerName.includes('sorghum')) return '🌾';

        // Fruits
        if (lowerName.includes('mango')) return '🥭';
        if (lowerName.includes('banana')) return '🍌';
        if (lowerName.includes('apple')) return '🍎';
        if (lowerName.includes('orange') || lowerName.includes('citrus')) return '🍊';
        if (lowerName.includes('grape')) return '🍇';
        if (lowerName.includes('watermelon')) return '🍉';
        if (lowerName.includes('melon')) return '🍈';
        if (lowerName.includes('strawberry')) return '🍓';
        if (lowerName.includes('cherry')) return '🍒';
        if (lowerName.includes('peach') || lowerName.includes('apricot')) return '🍑';
        if (lowerName.includes('pineapple')) return '🍍';
        if (lowerName.includes('coconut')) return '🥥';
        if (lowerName.includes('avocado')) return '🥑';
        if (lowerName.includes('lemon') || lowerName.includes('lime')) return '🍋';
        if (lowerName.includes('papaya')) return '🍈';
        if (lowerName.includes('kiwi')) return '🥝';
        if (lowerName.includes('fig') || lowerName.includes('date')) return '🍇';

        // Legumes & Pulses
        if (lowerName.includes('bean') || lowerName.includes('soybean')) return '🫘';
        if (lowerName.includes('pea') || lowerName.includes('chickpea') || lowerName.includes('lentil')) return '🫛';
        if (lowerName.includes('peanut') || lowerName.includes('groundnut')) return '🥜';

        // Root Crops & Tubers
        if (lowerName.includes('cassava') || lowerName.includes('tapioca')) return '🥔';
        if (lowerName.includes('yam') || lowerName.includes('taro')) return '🍠';
        if (lowerName.includes('sweet potato')) return '🍠';
        if (lowerName.includes('beet') || lowerName.includes('radish') || lowerName.includes('turnip')) return '🥕';
        if (lowerName.includes('ginger')) return '🫚';

        // Cash Crops
        if (lowerName.includes('cotton')) return '☁️';
        if (lowerName.includes('sugarcane') || lowerName.includes('sugar')) return '🎋';
        if (lowerName.includes('tobacco')) return '🚬';
        if (lowerName.includes('coffee')) return '☕';
        if (lowerName.includes('tea')) return '🍵';
        if (lowerName.includes('cocoa') || lowerName.includes('cacao')) return '🍫';

        // Herbs & Spices
        if (lowerName.includes('mint') || lowerName.includes('basil') || lowerName.includes('cilantro') || lowerName.includes('parsley')) return '🌿';
        if (lowerName.includes('turmeric')) return '🟡';
        if (lowerName.includes('cardamom') || lowerName.includes('cinnamon') || lowerName.includes('clove')) return '🌰';

        // Nuts
        if (lowerName.includes('almond')) return '🌰';
        if (lowerName.includes('cashew')) return '🌰';
        if (lowerName.includes('walnut') || lowerName.includes('pecan')) return '🌰';
        if (lowerName.includes('pistachio')) return '🌰';

        // Oilseeds
        if (lowerName.includes('sunflower')) return '🌻';
        if (lowerName.includes('mustard')) return '🌼';
        if (lowerName.includes('sesame')) return '🌾';
        if (lowerName.includes('safflower') || lowerName.includes('linseed') || lowerName.includes('flax')) return '🌼';

        // Default
        return '🌱';
    };

    const handleSendMessage = async () => {
        if (!chatInput.trim()) return;

        const userMessage = chatInput;
        setChatInput('');
        setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            const response = await fetch('http://localhost:3001/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setChatMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        }
    };

    return (
        <div className="unified-dashboard">
            {/* Cursor Trail Effect */}
            <CursorTrail />

            {/* Header */}
            <header className="unified-header">
                <div className="header-left">
                    <div className="logo-icon">🌾</div>
                    <h1>AI Crop Predictor</h1>
                </div>
                <button className="ai-chat-btn" onClick={() => setChatOpen(!chatOpen)}>
                    AI Chat Assistant
                </button>
            </header>

            {/* Main Content Grid */}
            <div className="unified-grid">
                {/* Left Column */}
                <aside className="left-panel">
                    {/* Weather Card */}
                    <div className="info-card weather-card">
                        <h2>🌤️ Weather Information</h2>
                        {weather ? (
                            <>
                                <div className="weather-main-stat">
                                    <span className="temp-large">{Math.round(weather.temperature)}°C</span>
                                    <span className="condition">{weather.condition}</span>
                                </div>
                                <div className="weather-details-grid">
                                    <div className="detail">
                                        <span className="label">Humidity</span>
                                        <span className="value">{weather.humidity}%</span>
                                    </div>
                                    <div className="detail">
                                        <span className="label">Wind</span>
                                        <span className="value">{weather.windSpeed} km/h</span>
                                    </div>
                                    <div className="detail">
                                        <span className="label">Pressure</span>
                                        <span className="value">{weather.pressure} hPa</span>
                                    </div>
                                    <div className="detail">
                                        <span className="label">Rain</span>
                                        <span className="value">{weather.precipitation} mm</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Loading weather data...</p>
                        )}
                    </div>

                    {/* Location Card */}
                    <div className="info-card location-card">
                        <h2>📍 Location</h2>
                        {weather ? (
                            <>
                                <p className="location-name">{weather.location.name}</p>
                                <p className="location-coords">
                                    {location.lat.toFixed(2)}°N, {location.lon.toFixed(2)}°E
                                </p>
                                <p className="location-country">{weather.location.country}</p>
                            </>
                        ) : (
                            <p>Select location on map</p>
                        )}
                    </div>

                    {/* Statistics Card */}
                    <div className="info-card stats-card">
                        <h2>📊 Statistics</h2>
                        <div className="stats-grid">
                            <div className="stat">
                                <span className="stat-value">{crops.length}</span>
                                <span className="stat-label">Crops Available</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">
                                    {crops.length > 0 ? Math.round(crops.reduce((sum, c) => sum + c.suitability, 0) / crops.length) : 0}%
                                </span>
                                <span className="stat-label">Avg Suitability</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Center - Map */}
                <main className="center-panel">
                    <div className="info-card map-card">
                        <h2>🗺️ Interactive Map</h2>
                        <div id="unified-map" className="map-container"></div>
                        <p className="map-hint">Click anywhere on the map to select a location</p>
                    </div>
                </main>

                {/* Right Column */}
                <aside className="right-panel">
                    {/* Crop Recommendations */}
                    <div className="info-card crops-card">
                        <h2>🌾 Top Crop Recommendations</h2>
                        {loading ? (
                            <div className="loading">Loading...</div>
                        ) : crops.length > 0 ? (
                            <div className="crops-list">
                                {crops.slice(0, 6).map((crop) => (
                                    <div key={crop.id} className="crop-item">
                                        <div className="crop-icon">{getCropIcon(crop.common_name)}</div>
                                        <div className="crop-info">
                                            <div className="crop-name">{crop.common_name}</div>
                                            <div className="crop-scientific">{crop.scientific_name}</div>
                                        </div>
                                        <div className="crop-score">{crop.suitability}%</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Select a location to see recommendations</p>
                        )}
                    </div>

                    {/* AI Predictions */}
                    <div className="info-card ai-card">
                        <h2>🤖 AI Predictions</h2>
                        {crops.length > 0 ? (
                            <div className="predictions">
                                <p>Based on current weather conditions:</p>
                                <ul>
                                    <li>✅ {crops[0]?.common_name} shows highest suitability</li>
                                    <li>📈 Temperature is optimal for {crops.filter(c => c.suitability >= 70).length} crops</li>
                                    <li>💧 Humidity levels favor {crops.filter(c => c.suitability >= 80).length} high-yield crops</li>
                                </ul>
                            </div>
                        ) : (
                            <p>AI predictions will appear after selecting a location</p>
                        )}
                    </div>
                </aside>
            </div>

            {/* AI Chat Panel - Slides from Right */}
            <div className={`chat-panel ${chatOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <h2>AI Crop Advisor Chat</h2>
                    <button className="close-chat" onClick={() => setChatOpen(false)}>✕</button>
                </div>

                <div className="chat-messages">
                    {chatMessages.length === 0 ? (
                        <div className="chat-welcome">
                            <p>👋 Hello! I'm your AI crop advisor.</p>
                            <p>Ask me anything about:</p>
                            <ul>
                                <li>🌾 Crop recommendations</li>
                                <li>🌤️ Weather impacts</li>
                                <li>🌱 Growing tips</li>
                                <li>📊 Yield optimization</li>
                            </ul>
                        </div>
                    ) : (
                        chatMessages.map((msg, idx) => (
                            <div key={idx} className={`chat-message ${msg.role}`}>
                                <div className="message-avatar">
                                    {msg.role === 'user' ? '👤' : '🤖'}
                                </div>
                                <div className="message-content">{msg.content}</div>
                            </div>
                        ))
                    )}
                </div>

                <div className="chat-input-area">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Ask about crops, weather, or farming..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="chat-send-btn" onClick={handleSendMessage}>
                        Send ✨
                    </button>
                </div>
            </div>

            {/* Overlay when chat is open */}
            {chatOpen && <div className="chat-overlay" onClick={() => setChatOpen(false)} />}
        </div>
    );
}
