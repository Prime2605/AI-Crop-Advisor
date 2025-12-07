/**
 * Centralized Windy API Configuration
 * All Windy API keys are managed in this single configuration map
 */

export interface WindyApiConfig {
    pointApi: string;      // For weather data point forecasts
    mapApi: string;        // For Windy map visualization
    webcamsApi: string;    // For weather webcams
    pluginsApi: string;    // For Windy plugins
}

/**
 * Windy API Keys Map
 * Single source of truth for all Windy API credentials
 */
export const WINDY_API_KEYS: WindyApiConfig = {
    // Point Forecast API - Used for fetching weather data
    pointApi: process.env.WINDY_POINT_API_KEY ||
        process.env.WINDY_API_KEY ||
        'OEk44lpC9UVAH0dZFKriWWhZTnCzzHS8',

    // Map API - Used for Windy map display in frontend
    mapApi: process.env.WINDY_MAP_API_KEY ||
        process.env.WINDY_API_KEY ||
        'n0HATHjcJTliIOKd3jXeCm440JutQdSN',

    // Webcams API - For weather webcam integration
    webcamsApi: process.env.WINDY_WEBCAMS_API_KEY ||
        process.env.WINDY_API_KEY ||
        '5b1DAHQSsXDpd0omCdze5FNZwZQyuMId',

    // Plugins API - For extended Windy functionality
    pluginsApi: process.env.WINDY_PLUGINS_API_KEY ||
        process.env.WINDY_API_KEY ||
        'FOivatxLurzL1yp0jHmHwrWVRgjcem4M',
};

/**
 * Validate Windy API configuration
 * Checks if at least one API key is configured
 */
export function validateWindyConfig(): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];

    // Check if using default/fallback keys
    if (!process.env.WINDY_API_KEY &&
        !process.env.WINDY_POINT_API_KEY &&
        !process.env.WINDY_MAP_API_KEY) {
        warnings.push('⚠️  No Windy API keys set in environment - using default keys');
    }

    // Validate individual keys
    if (WINDY_API_KEYS.pointApi.length < 10) {
        warnings.push('⚠️  Point API key appears invalid');
    }

    if (WINDY_API_KEYS.mapApi.length < 10) {
        warnings.push('⚠️  Map API key appears invalid');
    }

    const valid = warnings.length === 0 || warnings.length === 1;

    return { valid, warnings };
}

/**
 * Get API key for specific Windy service
 */
export function getWindyApiKey(service: keyof WindyApiConfig): string {
    return WINDY_API_KEYS[service];
}

/**
 * Get safe config for frontend (excludes sensitive keys)
 * Only exposes the map API key which is safe to expose client-side
 */
export function getFrontendWindyConfig() {
    return {
        windyMapApiKey: WINDY_API_KEYS.mapApi,
        apiBaseUrl: '/api',
    };
}

/**
 * Log configuration status on startup
 */
export function logWindyConfigStatus(): void {
    const { valid, warnings } = validateWindyConfig();

    console.log('🗺️  Windy API Configuration:');
    console.log(`   - Point API: ${WINDY_API_KEYS.pointApi.substring(0, 8)}...`);
    console.log(`   - Map API: ${WINDY_API_KEYS.mapApi.substring(0, 8)}...`);
    console.log(`   - Webcams API: ${WINDY_API_KEYS.webcamsApi.substring(0, 8)}...`);
    console.log(`   - Plugins API: ${WINDY_API_KEYS.pluginsApi.substring(0, 8)}...`);

    if (warnings.length > 0) {
        warnings.forEach(warning => console.warn(warning));
    } else {
        console.log('✅ All Windy API keys configured');
    }
}

// Export default for convenience
export default WINDY_API_KEYS;
