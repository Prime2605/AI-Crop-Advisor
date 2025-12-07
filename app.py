"""
AI Crop Advisor - Python Flask Backend
Alternative Python implementation of the backend API
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import requests
from datetime import datetime
from typing import Dict, List, Any
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ============================================================================
# Centralized Windy API Configuration
# Single source of truth for all Windy API keys
# ============================================================================
WINDY_API_KEYS = {
    'point_api': os.getenv('WINDY_POINT_API_KEY') or os.getenv('WINDY_API_KEY') or 'OEk44lpC9UVAH0dZFKriWWhZTnCzzHS8',
    'map_api': os.getenv('WINDY_MAP_API_KEY') or os.getenv('WINDY_API_KEY') or 'n0HATHjcJTliIOKd3jXeCm440JutQdSN',
    'webcams_api': os.getenv('WINDY_WEBCAMS_API_KEY') or os.getenv('WINDY_API_KEY') or '5b1DAHQSsXDpd0omCdze5FNZwZQyuMId',
    'plugins_api': os.getenv('WINDY_PLUGINS_API_KEY') or os.getenv('WINDY_API_KEY') or 'FOivatxLurzL1yp0jHmHwrWVRgjcem4M',
}

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://tpmpjkfmkdbukusgarkr.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk')


# Supabase client setup
try:
    from supabase import create_client, Client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    SUPABASE_AVAILABLE = True
except ImportError:
    print("⚠️  Supabase client not installed. Run: pip install supabase")
    SUPABASE_AVAILABLE = False
    supabase = None


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.now().isoformat(),
        'environment': os.getenv('NODE_ENV', 'development'),
        'python_version': os.sys.version
    })


@app.route('/api/config/frontend', methods=['GET'])
def get_frontend_config():
    """Get frontend configuration (safe to expose)"""
    return jsonify({
        'windyMapApiKey': WINDY_API_KEYS['map_api'],
        'apiBaseUrl': '/api'
    })



@app.route('/api/weather', methods=['GET'])
def get_weather():
    """Get weather data for a location"""
    try:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
        
        if not (-90 <= lat <= 90):
            return jsonify({'error': 'Invalid latitude'}), 400
        if not (-180 <= lon <= 180):
            return jsonify({'error': 'Invalid longitude'}), 400
        
        # Fetch weather from Windy API
        weather_data = fetch_weather_data(lat, lon)
        
        # Save to Supabase if available
        if SUPABASE_AVAILABLE:
            try:
                save_weather_to_db(lat, lon, weather_data)
            except Exception as e:
                print(f"Error saving to database: {e}")
        
        return jsonify(weather_data)
        
    except ValueError:
        return jsonify({'error': 'Invalid coordinates'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/crop-recommend', methods=['POST'])
def get_crop_recommendations():
    """Get crop recommendations based on location and weather"""
    try:
        data = request.get_json()
        location = data.get('location')
        weather = data.get('weather')
        
        if not location or 'lat' not in location or 'lon' not in location:
            return jsonify({'error': 'Invalid location'}), 400
        if not weather:
            return jsonify({'error': 'Invalid weather data'}), 400
        
        # Generate crop recommendations
        recommendations = generate_crop_recommendations(location, weather)
        
        # Save to Supabase if available
        if SUPABASE_AVAILABLE:
            try:
                save_recommendations_to_db(location, recommendations)
            except Exception as e:
                print(f"Error saving recommendations: {e}")
        
        return jsonify(recommendations)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/analytics/dashboard', methods=['GET'])
def get_dashboard_analytics():
    """Get dashboard analytics data"""
    if not SUPABASE_AVAILABLE:
        return jsonify({
            'overview': {'totalRecommendations': 0, 'totalWeatherQueries': 0, 'recentWeatherQueries': 0},
            'recommendationsByCrop': [],
            'sustainabilityStats': [],
            'recentRecommendations': [],
            'dailyRecommendations': []
        })
    
    try:
        # Get analytics from Supabase
        analytics = get_analytics_from_db()
        return jsonify(analytics)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/ai-models', methods=['GET'])
def get_ai_models():
    """Get all AI models"""
    if not SUPABASE_AVAILABLE:
        return jsonify([])
    
    try:
        response = supabase.table('ai_models').select('*').order('created_at', desc=True).execute()
        return jsonify(response.data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def fetch_weather_data(lat: float, lon: float) -> Dict[str, Any]:
    """Fetch weather data from Windy Point Forecast API"""
    url = 'https://api.windy.com/api/point-forecast/v2.0/forecast'
    
    params = {
        'lat': lat,
        'lon': lon,
        'key': WINDY_API_KEYS['point_api'],
        'model': 'gfs',
        'levels': ['surface']
    }

    
    response = requests.get(url, params=params, headers={'Accept': 'application/json'})
    response.raise_for_status()
    
    data = response.json()
    
    # Extract current weather
    timestamps = data.get('ts', [])
    current_ts = timestamps[0] if timestamps else int(datetime.now().timestamp())
    current_data = data.get('data', {}).get(str(current_ts), {}).get('surface', {})
    
    # Build weather response
    weather = {
        'temperature': current_data.get('temp', current_data.get('2m', {}).get('temp', 15)),
        'precipitation': current_data.get('precip', current_data.get('precipitation', 0)),
        'windSpeed': current_data.get('windSpeed', current_data.get('ws', 0)),
        'windDirection': current_data.get('windDirection', current_data.get('wd', 0)),
        'humidity': current_data.get('rh', current_data.get('humidity', 50)),
        'pressure': current_data.get('pressure', current_data.get('pres', 1013.25)),
        'cloudCover': current_data.get('cloudTotal', current_data.get('cloud', 0)),
        'timestamp': datetime.now().isoformat(),
        'forecast': []
    }
    
    # Add forecast data
    for ts in timestamps[1:6]:
        forecast_data = data.get('data', {}).get(str(ts), {}).get('surface', {})
        weather['forecast'].append({
            'date': datetime.fromtimestamp(ts).isoformat(),
            'temperature': forecast_data.get('temp', forecast_data.get('2m', {}).get('temp', 15)),
            'precipitation': forecast_data.get('precip', forecast_data.get('precipitation', 0)),
            'windSpeed': forecast_data.get('windSpeed', forecast_data.get('ws', 0))
        })
    
    return weather


def generate_crop_recommendations(location: Dict, weather: Dict) -> List[Dict]:
    """Generate crop recommendations based on weather data"""
    crops = [
        {'name': 'Wheat', 'temp_range': (10, 25), 'precip_range': (30, 80)},
        {'name': 'Rice', 'temp_range': (20, 35), 'precip_range': (100, 200)},
        {'name': 'Corn', 'temp_range': (15, 30), 'precip_range': (50, 100)},
        {'name': 'Soybeans', 'temp_range': (18, 30), 'precip_range': (40, 90)},
        {'name': 'Potatoes', 'temp_range': (10, 25), 'precip_range': (50, 100)}
    ]
    
    recommendations = []
    temp = weather.get('temperature', 20)
    precip = weather.get('precipitation', 50)
    humidity = weather.get('humidity', 60)
    wind_speed = weather.get('windSpeed', 5)
    
    for crop in crops:
        suitability = calculate_suitability(temp, precip, humidity, wind_speed, crop)
        yield_index = int(suitability * 0.9)
        sustainability = 'High' if suitability >= 70 else 'Medium' if suitability >= 50 else 'Low'
        
        reasons = []
        if 15 <= temp <= 30:
            reasons.append('Optimal temperature range')
        if 40 <= precip <= 100:
            reasons.append('Adequate precipitation')
        if 40 <= humidity <= 70:
            reasons.append('Suitable humidity levels')
        if wind_speed < 20:
            reasons.append('Low wind stress')
        if not reasons:
            reasons.append('Moderate growing conditions')
        
        recommendations.append({
            'cropName': crop['name'],
            'suitability': round(suitability),
            'expectedYieldIndex': yield_index,
            'sustainabilityTag': sustainability,
            'reasons': reasons
        })
    
    # Sort by suitability
    recommendations.sort(key=lambda x: x['suitability'], reverse=True)
    return recommendations


def calculate_suitability(temp: float, precip: float, humidity: float, wind_speed: float, crop: Dict) -> float:
    """Calculate crop suitability score"""
    score = 50.0
    
    # Temperature scoring
    temp_min, temp_max = crop['temp_range']
    temp_optimal = (temp_min + temp_max) / 2
    temp_diff = abs(temp - temp_optimal)
    temp_score = max(0, 100 - (temp_diff * 5))
    score = (score + temp_score) / 2
    
    # Precipitation scoring
    precip_min, precip_max = crop['precip_range']
    if precip_min <= precip <= precip_max:
        score += 20
    else:
        score -= abs(precip - (precip_min + precip_max) / 2) / 5
    
    # Humidity scoring
    if 40 <= humidity <= 80:
        score += 10
    
    # Wind scoring
    if wind_speed < 20:
        score += 5
    
    return max(0, min(100, score))


def save_weather_to_db(lat: float, lon: float, weather_data: Dict):
    """Save weather data to Supabase"""
    if not SUPABASE_AVAILABLE:
        return
    
    # Find or create location
    location_result = supabase.table('locations').select('id').eq('lat', lat).eq('lon', lon).execute()
    
    if location_result.data:
        location_id = location_result.data[0]['id']
    else:
        location_result = supabase.table('locations').insert({'lat': lat, 'lon': lon}).execute()
        location_id = location_result.data[0]['id']
    
    # Save weather data
    supabase.table('weather_data').insert({
        'location_id': location_id,
        'temperature': weather_data['temperature'],
        'precipitation': weather_data['precipitation'],
        'wind_speed': weather_data['windSpeed'],
        'wind_direction': weather_data['windDirection'],
        'humidity': weather_data['humidity'],
        'pressure': weather_data['pressure'],
        'cloud_cover': weather_data['cloudCover'],
        'timestamp': weather_data['timestamp'],
        'forecast_data': weather_data.get('forecast')
    }).execute()


def save_recommendations_to_db(location: Dict, recommendations: List[Dict]):
    """Save crop recommendations to Supabase"""
    if not SUPABASE_AVAILABLE:
        return
    
    # Find or create location
    location_result = supabase.table('locations').select('id').eq('lat', location['lat']).eq('lon', location['lon']).execute()
    
    if location_result.data:
        location_id = location_result.data[0]['id']
    else:
        location_result = supabase.table('locations').insert({'lat': location['lat'], 'lon': location['lon']}).execute()
        location_id = location_result.data[0]['id']
    
    # Save recommendations
    recommendations_data = [{
        'location_id': location_id,
        'crop_name': rec['cropName'],
        'suitability': rec['suitability'],
        'expected_yield_index': rec['expectedYieldIndex'],
        'sustainability_tag': rec['sustainabilityTag'],
        'reasons': rec['reasons'],
        'model_version': 'v1.0'
    } for rec in recommendations]
    
    supabase.table('recommendations').insert(recommendations_data).execute()


def get_analytics_from_db() -> Dict:
    """Get analytics data from Supabase"""
    # Get counts
    recommendations_count = supabase.table('recommendations').select('*', count='exact').execute()
    weather_count = supabase.table('weather_data').select('*', count='exact').execute()
    
    # Get recommendations by crop
    recommendations = supabase.table('recommendations').select('crop_name, suitability, expected_yield_index').execute()
    
    # Group by crop
    crop_stats = {}
    for rec in recommendations.data:
        crop = rec['crop_name']
        if crop not in crop_stats:
            crop_stats[crop] = {'count': 0, 'total_suitability': 0, 'total_yield': 0}
        crop_stats[crop]['count'] += 1
        crop_stats[crop]['total_suitability'] += rec['suitability']
        crop_stats[crop]['total_yield'] += rec['expected_yield_index']
    
    recommendations_by_crop = [{
        '_id': crop,
        'count': stats['count'],
        'avgSuitability': stats['total_suitability'] / stats['count'],
        'avgYield': stats['total_yield'] / stats['count']
    } for crop, stats in crop_stats.items()]
    
    return {
        'overview': {
            'totalRecommendations': recommendations_count.count or 0,
            'totalWeatherQueries': weather_count.count or 0,
            'recentWeatherQueries': weather_count.count or 0
        },
        'recommendationsByCrop': recommendations_by_crop,
        'sustainabilityStats': [],
        'recentRecommendations': [],
        'dailyRecommendations': []
    }


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('NODE_ENV', 'development') == 'development'
    
    print(f"🚀 Starting Flask server on http://localhost:{port}")
    print(f"📊 Health check: http://localhost:{port}/api/health")
    
    # Log Windy API configuration
    print("🗺️  Windy API Configuration:")
    print(f"   - Point API: {WINDY_API_KEYS['point_api'][:8]}...")
    print(f"   - Map API: {WINDY_API_KEYS['map_api'][:8]}...")
    print(f"   - Webcams API: {WINDY_API_KEYS['webcams_api'][:8]}...")
    print(f"   - Plugins API: {WINDY_API_KEYS['plugins_api'][:8]}...")
    
    if not SUPABASE_AVAILABLE:
        print("⚠️  WARNING: Supabase client not available. Database features disabled.")
    else:
        print("✅ Supabase client connected")
    
    app.run(host='0.0.0.0', port=port, debug=debug)

