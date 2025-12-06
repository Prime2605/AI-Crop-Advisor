import { Router, Request, Response } from 'express';
import { getDashboardAnalytics, getCropPerformance, recordAnalyticsEvent } from '../services/supabaseService';

const router = Router();

// Get analytics dashboard data
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const analytics = await getDashboardAnalytics();
    res.json(analytics);
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      error: 'Failed to fetch analytics',
      message: error.message,
    });
  }
});

// Get crop performance metrics
router.get('/crop-performance', async (req: Request, res: Response) => {
  try {
    const cropPerformance = await getCropPerformance();
    res.json(cropPerformance);
  } catch (error: any) {
    console.error('Error fetching crop performance:', error);
    res.status(500).json({
      error: 'Failed to fetch crop performance',
      message: error.message,
    });
  }
});

// Record analytics event
router.post('/event', async (req: Request, res: Response) => {
  try {
    const { metric, value, metadata } = req.body;

    if (!metric || value === undefined) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Metric and value are required',
      });
    }

    const analytics = await recordAnalyticsEvent(metric, value, metadata);
    res.json({ success: true, analytics });
  } catch (error: any) {
    console.error('Error recording analytics:', error);
    res.status(500).json({
      error: 'Failed to record analytics',
      message: error.message,
    });
  }
});

export default router;

