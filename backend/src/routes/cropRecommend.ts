import { Router, Request, Response } from 'express';
import { getCropRecommendations } from '../services/cropService';
import { CropRecommendationRequest } from '../types';
import { findOrCreateLocation, saveRecommendations } from '../services/supabaseService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { location, weather } = req.body;

    if (!location || typeof location.lat !== 'number' || typeof location.lon !== 'number') {
      return res.status(400).json({
        error: 'Invalid location',
        message: 'Location object with lat and lon (numbers) is required',
      });
    }

    if (!weather) {
      return res.status(400).json({
        error: 'Invalid weather data',
        message: 'Weather object is required',
      });
    }

    const request: CropRecommendationRequest = {
      location: {
        lat: location.lat,
        lon: location.lon,
      },
      weather: {
        temperature: weather.temperature || 0,
        precipitation: weather.precipitation || 0,
        humidity: weather.humidity || 0,
        windSpeed: weather.windSpeed || 0,
      },
    };

    const recommendations = getCropRecommendations(request);
    
    // Save to database
    try {
      const locationId = await findOrCreateLocation(location.lat, location.lon);
      await saveRecommendations(locationId, recommendations);
    } catch (dbError) {
      console.error('Error saving recommendations to database:', dbError);
      // Continue even if database save fails
    }

    res.json(recommendations);
  } catch (error: any) {
    console.error('Error generating crop recommendations:', error);
    res.status(500).json({
      error: 'Failed to generate crop recommendations',
      message: error.message,
    });
  }
});

export default router;

