export interface Location {
    lat: number;
    lon: number;
}

export interface WeatherData {
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    cloudCover: number;
    condition: string;
    icon: string;
    location: {
        name: string;
        region: string;
        country: string;
    };
    forecast?: {
        date: string;
        maxTemp: number;
        minTemp: number;
        condition: string;
    }[];
}

export interface CropRecommendation {
    id: string;
    common_name: string;
    scientific_name: string;
    description: string;
    suitability: number;
}
