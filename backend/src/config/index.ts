import 'dotenv/config';

// =============================================================================
// CENTRALIZED CONFIGURATION - All API keys and settings in one place
// =============================================================================

export const config = {
    // Server
    port: parseInt(process.env.PORT || '3001'),
    nodeEnv: process.env.NODE_ENV || 'development',

    // Windy API Keys
    windy: {
        mapKey: process.env.WINDY_MAP_API_KEY || 'n0HATHjcJTliIOKd3jXeCm440JutQdSN',
        pointKey: process.env.WINDY_POINT_API_KEY || 'OEk44lpC9UVAH0dZFKriWWhZTnCzzHS8',
        webcamsKey: process.env.WINDY_WEBCAMS_API_KEY || '5b1DAHQSsXDpd0omCdze5FNZwZQyuMId',
        pluginsKey: process.env.WINDY_PLUGINS_API_KEY || 'FOivatxLurzL1yp0jHmHwrWVRgjcem4M',
    },

    // WeatherAPI.com
    weatherApi: {
        key: process.env.WEATHER_API_KEY || '2966f797a82341918f382530250712',
        baseUrl: 'https://api.weatherapi.com/v1',
    },

    // Supabase
    supabase: {
        url: process.env.SUPABASE_URL || '',
        key: process.env.SUPABASE_KEY || '',
    },

    // GitHub Models AI
    github: {
        token: process.env.GITHUB_MODELS_TOKEN || '',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4'],
    },
};

// Log configuration status on startup
export function logConfigStatus(): void {
    console.log('\n🔧 Configuration Status:');
    console.log('========================');
    console.log(`   Port: ${config.port}`);
    console.log(`   Environment: ${config.nodeEnv}`);
    console.log(`   Windy Map API: ${config.windy.mapKey ? '✅' : '❌'}`);
    console.log(`   Windy Point API: ${config.windy.pointKey ? '✅' : '❌'}`);
    console.log(`   Weather API: ${config.weatherApi.key ? '✅' : '❌'}`);
    console.log(`   Supabase: ${config.supabase.url ? '✅' : '❌'}`);
    console.log(`   GitHub Models AI: ${config.ai.token ? '✅' : '❌'}`);
    console.log('========================\n');
}

export default config;
