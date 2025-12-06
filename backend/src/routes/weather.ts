import { Router, Request, Response } from 'express';
import { fetchWeatherData } from '../services/weatherService';
import { findOrCreateLocation, saveWeatherData } from '../services/supabaseService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lon = parseFloat(req.query.lon as string);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({
        error: 'Invalid coordinates',
        message: 'Both lat and lon query parameters are required and must be valid numbers',
      });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({
        error: 'Invalid latitude',
        message: 'Latitude must be between -90 and 90',
      });
    }

    if (lon < -180 || lon > 180) {
      return res.status(400).json({
        error: 'Invalid longitude',
        message: 'Longitude must be between -180 and 180',
      });
    }

    const weatherData = await fetchWeatherData(lat, lon);
    
    // Save to database
    try {
      const locationId = await findOrCreateLocation(lat, lon);
      await saveWeatherData(locationId, weatherData);
    } catch (dbError) {
      console.error('Error saving weather data to database:', dbError);
      // Continue even if database save fails
    }

    res.json(weatherData);
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({
      error: 'Failed to fetch weather data',
      message: error.message,
    });
  }
});

export default router;

