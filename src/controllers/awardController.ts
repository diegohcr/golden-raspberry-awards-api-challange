import { type Request, type Response } from 'express';
import { getProducerIntervals } from '../services/intervalsService';

export const getIntervals = async (req: Request, res: Response) => {
  try {
    const result = await getProducerIntervals();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching producer intervals:', error);
    res.status(500).json({ error: 'Failed to fetch producer intervals' });
  }
};
