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

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await axios.post(
            'https://models.inference.ai.azure.com/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are an expert agricultural AI advisor.' },
                    { role: 'user', content: message }
                ],
                max_tokens: 1024
            },
            {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiResponse = response.data?.choices?.[0]?.message?.content || 'No response from AI';

        return res.json({ response: aiResponse });
    } catch (error: any) {
        console.error('AI Chat error:', error.message);
        return res.json({
            response: 'AI is currently unavailable. Please try again later.'
        });
    }
}
