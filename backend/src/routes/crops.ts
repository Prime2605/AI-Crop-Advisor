import express from 'express';
import { CropDatabaseService } from '../services/cropDatabaseService';
import { CropSearchParams } from '../types/crops';

const router = express.Router();

/**
 * GET /api/crops
 * Get all crops with pagination
 */
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const offset = parseInt(req.query.offset as string) || 0;

        const result = await CropDatabaseService.getAllCrops(limit, offset);

        res.json({
            success: true,
            data: result.crops,
            pagination: {
                total: result.total,
                limit,
                offset,
                hasMore: offset + limit < result.total,
            },
        });
    } catch (error) {
        console.error('Error fetching crops:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch crops',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/crops/search
 * Search crops with filters
 */
router.get('/search', async (req, res) => {
    try {
        const searchParams: CropSearchParams = {
            query: req.query.q as string,
            categories: req.query.categories ? (req.query.categories as string).split(',') : undefined,
            climate_zones: req.query.climate_zones ? (req.query.climate_zones as string).split(',') : undefined,
            water_requirement: req.query.water_requirement as string,
            use_type: req.query.use_type ? (req.query.use_type as string).split(',') as any : undefined,
            language: req.query.language as string,
            limit: parseInt(req.query.limit as string) || 50,
            offset: parseInt(req.query.offset as string) || 0,
            sort_by: (req.query.sort_by as any) || 'priority_rank',
            sort_order: (req.query.sort_order as any) || 'desc',
        };

        const result = await CropDatabaseService.searchCrops(searchParams);

        res.json({
            success: true,
            data: result.crops,
            pagination: {
                total: result.total,
                limit: result.limit,
                offset: result.offset,
                hasMore: result.offset + result.limit < result.total,
            },
        });
    } catch (error) {
        console.error('Error searching crops:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search crops',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/crops/category/:slug
 * Get crops by category
 */
router.get('/category/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const limit = parseInt(req.query.limit as string) || 50;
        const offset = parseInt(req.query.offset as string) || 0;

        const result = await CropDatabaseService.getCropsByCategory(slug, limit, offset);

        res.json({
            success: true,
            data: result.crops,
            pagination: {
                total: result.total,
                limit: result.limit,
                offset: result.offset,
                hasMore: result.offset + result.limit < result.total,
            },
        });
    } catch (error) {
        console.error('Error fetching crops by category:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch crops by category',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/crops/categories
 * Get all categories
 */
router.get('/categories', async (req, res) => {
    try {
        const categories = await CropDatabaseService.getAllCategories();

        res.json({
            success: true,
            data: categories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch categories',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/crops/stats
 * Get database statistics
 */
router.get('/stats', async (req, res) => {
    try {
        const stats = await CropDatabaseService.getDatabaseStats();

        if (!stats) {
            return res.status(404).json({
                success: false,
                error: 'Statistics not found',
            });
        }

        res.json({
            success: true,
            data: stats,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch statistics',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * POST /api/crops/stats/refresh
 * Refresh database statistics
 */
router.post('/stats/refresh', async (req, res) => {
    try {
        await CropDatabaseService.refreshDatabaseStats();

        res.json({
            success: true,
            message: 'Database statistics refreshed successfully',
        });
    } catch (error) {
        console.error('Error refreshing stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to refresh statistics',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/crops/:id
 * Get a single crop by ID with full details
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const crop = await CropDatabaseService.getCropById(id);

        if (!crop) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found',
            });
        }

        res.json({
            success: true,
            data: crop,
        });
    } catch (error) {
        console.error('Error fetching crop:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch crop',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/crops/ai/training-data
 * Get crops formatted for AI training
 */
router.get('/ai/training-data', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || undefined;

        const trainingData = await CropDatabaseService.getCropsForAITraining(limit);

        res.json({
            success: true,
            data: trainingData,
            count: trainingData.length,
        });
    } catch (error) {
        console.error('Error fetching training data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch training data',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

export default router;
