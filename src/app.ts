import express from 'express';
import routes from './routes';
import { initDB } from './database/db';
import { loadCsv } from './utils/csvLoader';

const app = express();

app.use(express.json());
app.use('/api', routes);

const startServer = async (): Promise<any> => {
  await initDB();
  await loadCsv('../../data/movielist.csv');

  const server = app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
    console.log('Access http://localhost:3000/api/awards/intervals');
  });

  return server;
};

export { app, startServer };
