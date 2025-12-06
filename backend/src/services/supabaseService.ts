import { getSupabaseClient } from './database';
import { Location, WeatherData, CropRecommendation } from '../types';

const supabase = getSupabaseClient();

// Location operations
export async function findOrCreateLocation(lat: number, lon: number) {
  // Try to find existing location
  const { data: existing, error: findError } = await supabase
    .from('locations')
    .select('id')
    .eq('lat', lat)
    .eq('lon', lon)
    .single();

  if (existing) {
    return existing.id;
  }

  // Create new location
  const { data, error } = await supabase
    .from('locations')
    .insert({ lat, lon })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating location:', error);
    throw error;
  }

  return data.id;
}

// Weather data operations
export async function saveWeatherData(locationId: string, weatherData: WeatherData) {
  const { data, error } = await supabase
    .from('weather_data')
    .insert({
      location_id: locationId,
      temperature: weatherData.temperature,
      precipitation: weatherData.precipitation,
      wind_speed: weatherData.windSpeed,
      wind_direction: weatherData.windDirection,
      humidity: weatherData.humidity,
      pressure: weatherData.pressure,
      cloud_cover: weatherData.cloudCover,
      timestamp: weatherData.timestamp,
      forecast_data: weatherData.forecast || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving weather data:', error);
    throw error;
  }

  return data;
}

// Recommendation operations
export async function saveRecommendations(locationId: string, recommendations: CropRecommendation[]) {
  const recommendationsData = recommendations.map((rec) => ({
    location_id: locationId,
    crop_name: rec.cropName,
    suitability: rec.suitability,
    expected_yield_index: rec.expectedYieldIndex,
    sustainability_tag: rec.sustainabilityTag,
    reasons: rec.reasons,
    model_version: 'v1.0',
  }));

  const { data, error } = await supabase
    .from('recommendations')
    .insert(recommendationsData)
    .select();

  if (error) {
    console.error('Error saving recommendations:', error);
    throw error;
  }

  return data;
}

// Analytics operations
export async function recordAnalyticsEvent(metric: string, value: number, metadata?: any) {
  const { data, error } = await supabase
    .from('analytics')
    .insert({
      metric,
      value,
      metadata: metadata || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error recording analytics:', error);
    throw error;
  }

  return data;
}

// Get dashboard analytics
export async function getDashboardAnalytics() {
  // Get total recommendations
  const { count: totalRecommendations } = await supabase
    .from('recommendations')
    .select('*', { count: 'exact', head: true });

  // Get total weather queries
  const { count: totalWeatherQueries } = await supabase
    .from('weather_data')
    .select('*', { count: 'exact', head: true });

  // Get recent weather queries (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const { count: recentWeatherQueries } = await supabase
    .from('weather_data')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());

  // Get recommendations by crop
  const { data: recommendationsByCrop } = await supabase
    .from('recommendations')
    .select('crop_name, suitability, expected_yield_index')
    .then(({ data, error }) => {
      if (error) return { data: null, error };
      // Group by crop_name
      const grouped = (data || []).reduce((acc: any, rec: any) => {
        if (!acc[rec.crop_name]) {
          acc[rec.crop_name] = {
            _id: rec.crop_name,
            count: 0,
            totalSuitability: 0,
            totalYield: 0,
          };
        }
        acc[rec.crop_name].count++;
        acc[rec.crop_name].totalSuitability += rec.suitability;
        acc[rec.crop_name].totalYield += rec.expected_yield_index;
        return acc;
      }, {});

      return {
        data: Object.values(grouped).map((item: any) => ({
          _id: item._id,
          count: item.count,
          avgSuitability: item.totalSuitability / item.count,
          avgYield: item.totalYield / item.count,
        })),
        error: null,
      };
    });

  // Get sustainability stats
  const { data: sustainabilityStats } = await supabase
    .from('recommendations')
    .select('sustainability_tag')
    .then(({ data, error }) => {
      if (error) return { data: null, error };
      const grouped = (data || []).reduce((acc: any, rec: any) => {
        acc[rec.sustainability_tag] = (acc[rec.sustainability_tag] || 0) + 1;
        return acc;
      }, {});

      return {
        data: Object.entries(grouped).map(([tag, count]) => ({
          _id: tag,
          count,
        })),
        error: null,
      };
    });

  // Get recent recommendations
  const { data: recentRecommendations } = await supabase
    .from('recommendations')
    .select(`
      *,
      locations (
        lat,
        lon
      )
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  // Get daily recommendations for last 7 days
  const { data: dailyRecommendations } = await supabase
    .from('recommendations')
    .select('created_at')
    .gte('created_at', sevenDaysAgo.toISOString())
    .then(({ data, error }) => {
      if (error) return { data: null, error };
      const grouped = (data || []).reduce((acc: any, rec: any) => {
        const date = new Date(rec.created_at).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return {
        data: Object.entries(grouped).map(([date, count]) => ({
          _id: date,
          count,
        })),
        error: null,
      };
    });

  return {
    overview: {
      totalRecommendations: totalRecommendations || 0,
      totalWeatherQueries: totalWeatherQueries || 0,
      recentWeatherQueries: recentWeatherQueries || 0,
    },
    recommendationsByCrop: recommendationsByCrop?.data || [],
    sustainabilityStats: sustainabilityStats?.data || [],
    recentRecommendations: recentRecommendations || [],
    dailyRecommendations: dailyRecommendations?.data || [],
  };
}

// Get crop performance
export async function getCropPerformance() {
  const { data } = await supabase
    .from('recommendations')
    .select('crop_name, suitability, expected_yield_index, sustainability_tag')
    .then(({ data, error }) => {
      if (error) return { data: null, error };
      const grouped = (data || []).reduce((acc: any, rec: any) => {
        if (!acc[rec.crop_name]) {
          acc[rec.crop_name] = {
            _id: rec.crop_name,
            totalSuitability: 0,
            totalYield: 0,
            count: 0,
            highSustainability: 0,
          };
        }
        acc[rec.crop_name].count++;
        acc[rec.crop_name].totalSuitability += rec.suitability;
        acc[rec.crop_name].totalYield += rec.expected_yield_index;
        if (rec.sustainability_tag === 'High') {
          acc[rec.crop_name].highSustainability++;
        }
        return acc;
      }, {});

      return {
        data: Object.values(grouped).map((item: any) => ({
          _id: item._id,
          avgSuitability: item.totalSuitability / item.count,
          avgYield: item.totalYield / item.count,
          count: item.count,
          highSustainability: item.highSustainability,
        })),
        error: null,
      };
    });

  return data?.data || [];
}

