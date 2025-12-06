export interface WeatherData {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  cloudCover: number;
  timestamp: string;
  forecast?: {
    date: string;
    temperature: number;
    precipitation: number;
    windSpeed: number;
  }[];
}

export interface CropRecommendation {
  cropName: string;
  suitability: number; // 0-100 score
  expectedYieldIndex: number; // 0-100 index
  sustainabilityTag: 'High' | 'Medium' | 'Low';
  reasons: string[];
}

export interface Location {
  lat: number;
  lon: number;
}

export interface CropRecommendationRequest {
  location: Location;
  weather: {
    temperature: number;
    precipitation: number;
    humidity: number;
    windSpeed: number;
  };
}

