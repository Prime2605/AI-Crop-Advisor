import express from 'express';
import cors from 'cors';
import weatherRoutes from '../src/routes/weather';
import cropRecommendRoutes from '../src/routes/cropRecommend';
import analyticsRoutes from '../src/routes/analytics';
import aiModelRoutes from '../src/routes/aiModel';
import { connectDatabase } from '../src/services/database';

// Initialize database connection (non-blocking)
connectDatabase().catch(console.error);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// API routes
app.use('/api/weather', weatherRoutes);
app.use('/api/crop-recommend', cropRecommendRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai-models', aiModelRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Export for Vercel serverless
export default app;

