import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRouter from './routes/analyze';
import chatRouter from './routes/chat';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Paper2Agent Backend is running' });
});

app.use('/api/analyze', analyzeRouter);
app.use('/api/chat', chatRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});