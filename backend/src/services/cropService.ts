import { CropRecommendation, CropRecommendationRequest } from '../types';

/**
 * Placeholder crop recommendation service
 * In production, this would use ML models or agricultural databases
 */
export function getCropRecommendations(
  request: CropRecommendationRequest
): CropRecommendation[] {
  const { location, weather } = request;
  
  // Simple heuristic-based recommendations
  // In production, this would be replaced with actual ML models or expert systems
  
  const crops: CropRecommendation[] = [
    {
      cropName: 'Wheat',
      suitability: calculateSuitability(weather, 'wheat'),
      expectedYieldIndex: calculateYieldIndex(weather, 'wheat'),
      sustainabilityTag: 'High',
      reasons: getReasons(weather, 'wheat'),
    },
    {
      cropName: 'Rice',
      suitability: calculateSuitability(weather, 'rice'),
      expectedYieldIndex: calculateYieldIndex(weather, 'rice'),
      sustainabilityTag: weather.precipitation > 100 ? 'High' : 'Medium',
      reasons: getReasons(weather, 'rice'),
    },
    {
      cropName: 'Corn',
      suitability: calculateSuitability(weather, 'corn'),
      expectedYieldIndex: calculateYieldIndex(weather, 'corn'),
      sustainabilityTag: 'Medium',
      reasons: getReasons(weather, 'corn'),
    },
    {
      cropName: 'Soybeans',
      suitability: calculateSuitability(weather, 'soybeans'),
      expectedYieldIndex: calculateYieldIndex(weather, 'soybeans'),
      sustainabilityTag: 'High',
      reasons: getReasons(weather, 'soybeans'),
    },
    {
      cropName: 'Potatoes',
      suitability: calculateSuitability(weather, 'potatoes'),
      expectedYieldIndex: calculateYieldIndex(weather, 'potatoes'),
      sustainabilityTag: 'Medium',
      reasons: getReasons(weather, 'potatoes'),
    },
  ];

  // Sort by suitability (descending)
  return crops.sort((a, b) => b.suitability - a.suitability);
}

function calculateSuitability(weather: any, crop: string): number {
  let score = 50; // Base score

  // Temperature-based scoring
  const tempRanges: Record<string, { min: number; max: number; optimal: number }> = {
    wheat: { min: 10, max: 25, optimal: 18 },
    rice: { min: 20, max: 35, optimal: 28 },
    corn: { min: 15, max: 30, optimal: 22 },
    soybeans: { min: 18, max: 30, optimal: 24 },
    potatoes: { min: 10, max: 25, optimal: 18 },
  };

  const range = tempRanges[crop];
  if (range) {
    const tempDiff = Math.abs(weather.temperature - range.optimal);
    const tempScore = Math.max(0, 100 - (tempDiff * 5));
    score = (score + tempScore) / 2;
  }

  // Precipitation-based scoring
  const precipRanges: Record<string, { min: number; max: number }> = {
    wheat: { min: 30, max: 80 },
    rice: { min: 100, max: 200 },
    corn: { min: 50, max: 100 },
    soybeans: { min: 40, max: 90 },
    potatoes: { min: 50, max: 100 },
  };

  const precipRange = precipRanges[crop];
  if (precipRange) {
    if (
      weather.precipitation >= precipRange.min &&
      weather.precipitation <= precipRange.max
    ) {
      score += 20;
    } else {
      score -= Math.abs(weather.precipitation - (precipRange.min + precipRange.max) / 2) / 5;
    }
  }

  // Humidity-based scoring
  if (weather.humidity >= 40 && weather.humidity <= 80) {
    score += 10;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function calculateYieldIndex(weather: any, crop: string): number {
  const suitability = calculateSuitability(weather, crop);
  // Yield index is typically correlated with suitability but can have different factors
  return Math.round(suitability * 0.9 + Math.random() * 10);
}

function getReasons(weather: any, crop: string): string[] {
  const reasons: string[] = [];

  if (weather.temperature >= 15 && weather.temperature <= 30) {
    reasons.push('Optimal temperature range');
  }

  if (weather.precipitation >= 40 && weather.precipitation <= 100) {
    reasons.push('Adequate precipitation');
  }

  if (weather.humidity >= 40 && weather.humidity <= 70) {
    reasons.push('Suitable humidity levels');
  }

  if (weather.windSpeed < 20) {
    reasons.push('Low wind stress');
  }

  if (reasons.length === 0) {
    reasons.push('Moderate growing conditions');
  }

  return reasons;
}

