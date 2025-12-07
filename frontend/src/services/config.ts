import axios from 'axios';

interface FrontendConfig {
  windyMapApiKey: string;
  apiBaseUrl: string;
}

let cachedConfig: FrontendConfig | null = null;

export async function getFrontendConfig(): Promise<FrontendConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await axios.get<FrontendConfig>('/api/config/frontend');
    cachedConfig = response.data;
    return cachedConfig;
  } catch (error) {
    console.warn('Failed to fetch frontend config, using defaults:', error);
    // Fallback to default Map Forecast API key
    return {
      windyMapApiKey: 'n0HATHjcJTliIOKd3jXeCm440JutQdSN',
      apiBaseUrl: '/api',
    };
  }
}

