import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import { initDB } from './database/db';
import { loadCsv } from './utils/csvLoader';

dotenv.config();

const app = express();
const PORT = process.env.PORT != null || 3000;

app.use(express.json());
app.use('/api', routes);

const startServer = async (): Promise<void> => {
  await initDB();
  await loadCsv('../../data/movielist.csv');

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start the server:', error);
});

export default app;
