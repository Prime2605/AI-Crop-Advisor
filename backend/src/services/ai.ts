import axios from 'axios';
import config from '../config';

// =============================================================================
// AI SERVICE - Uses GitHub Models API for crop recommendations and chat
// =============================================================================

interface CropRecommendation {
    name: string;
    scientificName: string;
    suitability: number;
    reason: string;
}

let workingModel: string | null = null;

/**
 * Test GitHub Models API connection on startup
 */
export async function testConnection(): Promise<boolean> {
    if (!config.github.token) {
        console.log('⚠️  AI: No token configured, using fallbacks');
        return false;
    }

    for (const model of config.github.models) {
        try {
            const res = await axios.post(config.github.endpoint, {
                model,
                messages: [{ role: 'user', content: 'Hi' }],
                max_tokens: 5,
            }, {
                headers: {
                    'Authorization': `Bearer ${config.github.token}`,
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });

            if (res.data?.choices?.[0]) {
                workingModel = model;
                console.log(`✅ AI connected: ${model}`);
                return true;
            }
        } catch (e: any) {
            console.log(`❌ AI ${model}: ${e.response?.status || e.message}`);
        }
    }

    console.log('⚠️  AI unavailable, using fallback responses');
    return false;
}

/**
 * Get AI chat response
 */
export async function chat(question: string): Promise<string> {
    if (!workingModel) {
        return getFallbackChat(question);
    }

    try {
        const res = await axios.post(config.github.endpoint, {
            model: workingModel,
            messages: [
                { role: 'system', content: 'You are an expert agricultural AI advisor. Provide concise, helpful advice about crops, farming, and agriculture.' },
                { role: 'user', content: question },
            ],
            temperature: 0.7,
            max_tokens: 1024,
        }, {
            headers: {
                'Authorization': `Bearer ${config.github.token}`,
                'Content-Type': 'application/json',
            },
            timeout: 20000,
        });

        return res.data?.choices?.[0]?.message?.content || getFallbackChat(question);
    } catch (e: any) {
        console.error('AI chat error:', e.message);
        return getFallbackChat(question);
    }
}

/**
 * Get crop recommendations from AI based on location and weather
 */
export async function getCropRecommendations(
    lat: number,
    lon: number,
    climate: string,
    weather?: { temperature: number; humidity: number; precipitation: number }
): Promise<CropRecommendation[]> {
    if (!workingModel) {
        console.log('AI not available, using fallback crops');
        return getDefaultCrops(climate);
    }

    const weatherInfo = weather
        ? `Temperature: ${weather.temperature}°C, Humidity: ${weather.humidity}%, Rainfall: ${weather.precipitation}mm`
        : '';

    const prompt = `As an agricultural expert, recommend exactly 5 crops suitable for:
Location: ${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E
Climate Zone: ${climate}
${weatherInfo}

Respond with ONLY a JSON array (no markdown, no explanation):
[{"name":"Rice","scientificName":"Oryza sativa","suitability":95,"reason":"Perfect for warm humid climate with high rainfall"}]`;

    try {
        const res = await axios.post(config.github.endpoint, {
            model: workingModel,
            messages: [
                { role: 'system', content: 'You are an agricultural expert. Respond with ONLY a valid JSON array of crop recommendations. No markdown formatting, no explanations.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 1500,
        }, {
            headers: {
                'Authorization': `Bearer ${config.github.token}`,
                'Content-Type': 'application/json',
            },
            timeout: 20000,
        });

        const response = res.data?.choices?.[0]?.message?.content || '';
        console.log('AI response:', response.substring(0, 200) + '...');

        // Try to extract JSON from response
        const match = response.match(/\[[\s\S]*\]/);
        if (match) {
            const crops = JSON.parse(match[0]);
            console.log(`✅ Got ${crops.length} crop recommendations from AI`);
            return crops.slice(0, 5);
        }
    } catch (e: any) {
        console.error('AI recommendations error:', e.message);
    }

    console.log('Falling back to default crops');
    return getDefaultCrops(climate);
}

export function isAIAvailable(): boolean {
    return !!workingModel;
}

export function getWorkingModel(): string | null {
    return workingModel;
}

// =============================================================================
// FALLBACK DATA
// =============================================================================

function getFallbackChat(q: string): string {
    const lower = q.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) {
        return `👋 Hello! I'm AI Crop Advisor. Ask me about crops, climate zones, or growing tips!`;
    }
    if (lower.includes('rice')) {
        return `🌾 **Rice** (Oryza sativa) grows best in tropical/subtropical climates at 20-35°C with high humidity.`;
    }
    return `I can help with crop recommendations. Try asking about specific crops or climate conditions!`;
}

function getDefaultCrops(climate: string): CropRecommendation[] {
    const crops: Record<string, CropRecommendation[]> = {
        tropical: [
            { name: 'Rice', scientificName: 'Oryza sativa', suitability: 95, reason: 'Warm humid conditions ideal' },
            { name: 'Banana', scientificName: 'Musa spp.', suitability: 92, reason: 'Year-round tropical fruit' },
            { name: 'Mango', scientificName: 'Mangifera indica', suitability: 90, reason: 'King of tropical fruits' },
            { name: 'Coconut', scientificName: 'Cocos nucifera', suitability: 88, reason: 'Versatile coastal palm' },
            { name: 'Sugarcane', scientificName: 'Saccharum officinarum', suitability: 85, reason: 'High-yield sweetener' },
        ],
        subtropical: [
            { name: 'Orange', scientificName: 'Citrus sinensis', suitability: 94, reason: 'Perfect citrus climate' },
            { name: 'Avocado', scientificName: 'Persea americana', suitability: 90, reason: 'Nutrient-rich fruit' },
            { name: 'Cotton', scientificName: 'Gossypium spp.', suitability: 87, reason: 'Important fiber crop' },
            { name: 'Grape', scientificName: 'Vitis vinifera', suitability: 85, reason: 'Wine and table grapes' },
            { name: 'Pomegranate', scientificName: 'Punica granatum', suitability: 82, reason: 'Drought tolerant' },
        ],
        temperate: [
            { name: 'Wheat', scientificName: 'Triticum aestivum', suitability: 95, reason: 'Staple cereal grain' },
            { name: 'Apple', scientificName: 'Malus domestica', suitability: 92, reason: 'Cool climate fruit' },
            { name: 'Potato', scientificName: 'Solanum tuberosum', suitability: 90, reason: 'Versatile tuber' },
            { name: 'Corn', scientificName: 'Zea mays', suitability: 88, reason: 'Multi-purpose grain' },
            { name: 'Soybean', scientificName: 'Glycine max', suitability: 85, reason: 'Protein-rich legume' },
        ],
    };

    return crops[climate] || crops.subtropical;
}
