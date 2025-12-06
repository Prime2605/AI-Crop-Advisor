export interface Location {
  lat: number;
  lon: number;
}

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
  suitability: number;
  expectedYieldIndex: number;
  sustainabilityTag: 'High' | 'Medium' | 'Low';
  reasons: string[];
}

export interface AppState {
  selectedLocation: Location | null;
  weatherData: WeatherData | null;
  cropRecommendations: CropRecommendation[];
  loading: {
    weather: boolean;
    crops: boolean;
  };
  error: string | null;
}

