import express from 'express';
import { getFrontendWindyConfig, WINDY_API_KEYS } from '../config/windyConfig';


const router = express.Router();

/**
 * Get frontend configuration
 * Returns safe-to-expose configuration for the client-side
 */
router.get('/frontend', (req, res) => {
  try {
    res.json(getFrontendWindyConfig());
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch config', message: error.message });
  }
});

/**
 * Get all Windy API keys (backend only - not exposed to frontend)
 * This endpoint should be protected in production
 */
router.get('/windy-keys', (req, res) => {
  try {
    res.json({
      pointApi: WINDY_API_KEYS.pointApi.substring(0, 10) + '...',
      mapApi: WINDY_API_KEYS.mapApi.substring(0, 10) + '...',
      webcamsApi: WINDY_API_KEYS.webcamsApi.substring(0, 10) + '...',
      pluginsApi: WINDY_API_KEYS.pluginsApi.substring(0, 10) + '...',
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch keys', message: error.message });
  }
});

export default router;

