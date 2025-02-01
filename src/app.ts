import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT != null || 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
