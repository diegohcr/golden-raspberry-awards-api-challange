import { Router } from 'express';
import { getIntervals } from './controllers/awardController';

const router = Router();

router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

router.get('/awards/intervals', getIntervals);

export default router;
