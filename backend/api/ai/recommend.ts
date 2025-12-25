import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { lat, lon, temperature, humidity, precipitation } = req.body;

    const prompt = `As an agricultural expert, recommend the top 10 crops suitable for:
Location: ${lat}, ${lon}
Temperature: ${temperature}°C
Humidity: ${humidity}%
Precipitation: ${precipitation}mm

Return ONLY a valid JSON array with exactly 10 crops, each with: name, scientificName, suitability (0-100), and reason.
Example format: [{"name":"Rice","scientificName":"Oryza sativa","suitability":95,"reason":"Perfect for this climate"}]`;

    try {
        const response = await axios.post(
            'https://models.inference.ai.azure.com/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are an agricultural expert. Respond with ONLY valid JSON.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 1500
            },
            {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        let recommendations = response.data?.choices?.[0]?.message?.content || '[]';
        recommendations = recommendations.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        const parsed = JSON.parse(recommendations);

        return res.json({ recommendations: parsed });
    } catch (error: any) {
        console.error('AI Recommend error:', error.message);

        // Fallback recommendations
        const fallback = [
            { name: 'Rice', scientificName: 'Oryza sativa', suitability: 85, reason: 'Adaptable to various climates' },
            { name: 'Wheat', scientificName: 'Triticum aestivum', suitability: 80, reason: 'Versatile grain crop' },
            { name: 'Corn', scientificName: 'Zea mays', suitability: 75, reason: 'High yield potential' }
        ];

        return res.json({ recommendations: fallback });
    }
}
