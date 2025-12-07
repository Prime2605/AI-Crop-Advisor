import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather';
import cropRecommendRoutes from './routes/cropRecommend';
import analyticsRoutes from './routes/analytics';
import aiModelRoutes from './routes/aiModel';
import configRoutes from './routes/config';
import cropsRoutes from './routes/crops';
import aiChatRoutes from './routes/aiChat';
import { connectDatabase } from './services/database';
import { logWindyConfigStatus } from './config/windyConfig';



// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.use('/api/weather', weatherRoutes);
app.use('/api/crop-recommend', cropRecommendRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai-models', aiModelRoutes);
app.use('/api/config', configRoutes);
app.use('/api/crops', cropsRoutes);
app.use('/api/ai', aiChatRoutes);

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

// Initialize database connection
connectDatabase().catch(console.error);

// Only start server if not in Vercel serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);

    // Log Windy API configuration status
    logWindyConfigStatus();

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      console.warn('⚠️  WARNING: Supabase credentials are not set in environment variables');
    }
  });
}

// Export for local development
export default app;

