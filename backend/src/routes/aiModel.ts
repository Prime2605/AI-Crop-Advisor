import { Router, Request, Response } from 'express';
import { getSupabaseClient } from '../services/database';

const supabase = getSupabaseClient();

const router = Router();

// Get all AI models
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('ai_models')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error: any) {
    console.error('Error fetching AI models:', error);
    res.status(500).json({
      error: 'Failed to fetch AI models',
      message: error.message,
    });
  }
});

// Get specific AI model
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('ai_models')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'AI model not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error: any) {
    console.error('Error fetching AI model:', error);
    res.status(500).json({
      error: 'Failed to fetch AI model',
      message: error.message,
    });
  }
});

// Create new AI model
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, version, description, status, accuracy, metrics, config } = req.body;

    if (!name || !version) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Name and version are required',
      });
    }

    const { data, error } = await supabase
      .from('ai_models')
      .insert({
        name,
        version,
        description,
        status: status || 'active',
        accuracy,
        metrics,
        config,
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    console.error('Error creating AI model:', error);
    res.status(500).json({
      error: 'Failed to create AI model',
      message: error.message,
    });
  }
});

// Update AI model
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { status, accuracy, metrics, config, description } = req.body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (accuracy !== undefined) updateData.accuracy = accuracy;
    if (metrics) updateData.metrics = metrics;
    if (config) updateData.config = config;
    if (description) updateData.description = description;

    const { data, error } = await supabase
      .from('ai_models')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'AI model not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error: any) {
    console.error('Error updating AI model:', error);
    res.status(500).json({
      error: 'Failed to update AI model',
      message: error.message,
    });
  }
});

// Delete AI model
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from('ai_models')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'AI model not found' });
      }
      throw error;
    }

    res.json({ success: true, message: 'AI model deleted' });
  } catch (error: any) {
    console.error('Error deleting AI model:', error);
    res.status(500).json({
      error: 'Failed to delete AI model',
      message: error.message,
    });
  }
});

export default router;

