import express from 'express';
import { CropDatabaseService } from '../services/cropDatabaseService';
import { getSupabaseClient } from '../services/database';

const router = express.Router();

// Simple keyword matching for crop-related questions
const cropKeywords = [
    'grow', 'plant', 'cultivate', 'harvest', 'crop', 'vegetable', 'fruit',
    'tropical', 'temperate', 'climate', 'season', 'water', 'soil', 'fertilizer',
    'best', 'suitable', 'recommend', 'rice', 'wheat', 'maize', 'corn', 'potato',
    'tomato', 'mango', 'banana', 'coffee', 'tea', 'spice', 'herb'
];

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

/**
 * POST /api/ai/chat
 * AI-powered chat about crops and agriculture
 */
router.post('/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body as { message: string; history?: ChatMessage[] };

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Message is required',
            });
        }

        const lowerMessage = message.toLowerCase();
        let response = '';
        let relatedCrops: any[] = [];

        // Detect query intent
        const isAskingAboutCrops = cropKeywords.some(kw => lowerMessage.includes(kw));
        const isAskingAboutCategories = lowerMessage.includes('categor') || lowerMessage.includes('type');
        const isAskingForList = lowerMessage.includes('list') || lowerMessage.includes('all') || lowerMessage.includes('show');
        const isAskingAboutTropical = lowerMessage.includes('tropical');
        const isAskingAboutTemperate = lowerMessage.includes('temperate');
        const isAskingAboutVegetables = lowerMessage.includes('vegetable');
        const isAskingAboutFruits = lowerMessage.includes('fruit');
        const isAskingAboutCereals = lowerMessage.includes('cereal') || lowerMessage.includes('grain');
        const isAskingAboutSpices = lowerMessage.includes('spice') || lowerMessage.includes('herb');

        // Search for relevant crops based on query
        let searchCategory = '';
        if (isAskingAboutTropical) searchCategory = 'tropical-crops';
        else if (isAskingAboutTemperate) searchCategory = 'temperate-crops';
        else if (isAskingAboutVegetables) searchCategory = 'vegetables';
        else if (isAskingAboutFruits) searchCategory = 'fruits';
        else if (isAskingAboutCereals) searchCategory = 'cereals';
        else if (isAskingAboutSpices) searchCategory = 'spices';

        if (searchCategory) {
            try {
                const result = await CropDatabaseService.getCropsByCategory(searchCategory, 10, 0);
                relatedCrops = result.crops || [];
            } catch (err) {
                console.log('Category search error:', err);
            }
        }

        // If no category match, try text search
        if (relatedCrops.length === 0 && isAskingAboutCrops) {
            try {
                // Extract potential crop names from message
                const words = message.split(/\s+/);
                for (const word of words) {
                    if (word.length > 3) {
                        const result = await CropDatabaseService.searchCrops({
                            query: word,
                            limit: 5,
                            offset: 0,
                        });
                        if (result.crops && result.crops.length > 0) {
                            relatedCrops = result.crops;
                            break;
                        }
                    }
                }
            } catch (err) {
                console.log('Search error:', err);
            }
        }

        // Generate response based on context
        if (isAskingAboutCategories) {
            try {
                const categories = await CropDatabaseService.getAllCategories();
                const categoryNames = categories.slice(0, 15).map((c: any) => c.name).join(', ');
                response = `I have information about many crop categories including: ${categoryNames}. What specific category would you like to know more about?`;
            } catch (err) {
                response = 'I can help you with information about various crop categories like vegetables, fruits, cereals, spices, tropical crops, and more. What interests you?';
            }
        } else if (relatedCrops.length > 0) {
            const cropList = relatedCrops.map((c: any) =>
                `**${c.common_name}** (${c.scientific_name}): ${c.description?.substring(0, 100) || 'No description available'}...`
            ).join('\n\n');

            response = `Based on your query, here are some relevant crops:\n\n${cropList}\n\nWould you like more details about any of these crops?`;
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = `Hello! I'm your AI Crop Advisor. I can help you with:\n\n` +
                `• **Crop recommendations** - What crops to grow based on your climate\n` +
                `• **Growing information** - How to cultivate specific crops\n` +
                `• **Climate suitability** - Which crops suit tropical, temperate, or arid regions\n` +
                `• **Crop categories** - Information about vegetables, fruits, cereals, spices, and more\n\n` +
                `What would you like to know about?`;
        } else if (lowerMessage.includes('help')) {
            response = `Here are some things you can ask me:\n\n` +
                `• "What vegetables can I grow in tropical climates?"\n` +
                `• "Tell me about rice cultivation"\n` +
                `• "What fruits are suitable for temperate regions?"\n` +
                `• "List popular spices and herbs"\n` +
                `• "What are the major cereal crops?"\n\n` +
                `Just ask naturally and I'll do my best to help!`;
        } else {
            // Default response with helpful suggestions
            response = `I understand you're asking about "${message}". Let me help you find relevant information.\n\n` +
                `Try asking about:\n` +
                `• Specific crops (e.g., "Tell me about tomatoes")\n` +
                `• Climate-based recommendations (e.g., "Tropical fruits")\n` +
                `• Crop categories (e.g., "What vegetables are available?")\n\n` +
                `What specific aspect would you like to explore?`;
        }

        res.json({
            success: true,
            response,
            relatedCrops: relatedCrops.slice(0, 5).map((c: any) => ({
                id: c.id,
                common_name: c.common_name,
                scientific_name: c.scientific_name,
            })),
        });
    } catch (error) {
        console.error('AI Chat error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process message',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * GET /api/ai/suggestions
 * Get suggested questions based on available data
 */
router.get('/suggestions', async (req, res) => {
    try {
        const suggestions = [
            'What crops can I grow in tropical climates?',
            'Tell me about rice cultivation',
            'What vegetables are best for temperate regions?',
            'List popular spices and their uses',
            'What are the major cereal crops worldwide?',
            'Which fruits grow in subtropical areas?',
            'What crops need less water?',
            'Tell me about medicinal plants',
        ];

        res.json({
            success: true,
            suggestions,
        });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch suggestions',
        });
    }
});

/**
 * POST /api/ai/recommend
 * Get crop recommendations based on location and conditions
 */
router.post('/recommend', async (req, res) => {
    try {
        const { lat, lon, climate, conditions } = req.body;

        // Determine climate zone from latitude
        let climateZone = climate || 'subtropical';
        if (!climate && lat) {
            const absLat = Math.abs(lat);
            if (absLat < 23.5) climateZone = 'tropical';
            else if (absLat < 35) climateZone = 'subtropical';
            else if (absLat < 55) climateZone = 'temperate';
            else climateZone = 'cool-temperate';
        }

        // Get crops suitable for this climate
        const categoryMap: Record<string, string> = {
            'tropical': 'tropical-crops',
            'subtropical': 'subtropical-crops',
            'temperate': 'temperate-crops',
            'cool-temperate': 'cool-temperate-crops',
        };

        const category = categoryMap[climateZone] || 'major-crops';
        const result = await CropDatabaseService.getCropsByCategory(category, 10, 0);

        res.json({
            success: true,
            climateZone,
            recommendations: (result.crops || []).map((c: any) => ({
                id: c.id,
                common_name: c.common_name,
                scientific_name: c.scientific_name,
                description: c.description,
                suitability: Math.random() * 30 + 70, // Mock suitability score
            })),
        });
    } catch (error) {
        console.error('Recommendation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get recommendations',
        });
    }
});

export default router;
