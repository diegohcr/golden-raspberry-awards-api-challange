import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Golden Raspberry Awards API is running!' });
});

export default router;
