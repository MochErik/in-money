import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'zenith-financial-api', version: '2.0.0', time: new Date().toISOString() });
});

// Transactions mock API
app.get('/api/transactions', (req, res) => {
  res.json({ success: true, count: 0, data: [] });
});

app.listen(PORT, () => {
  console.log(`Zenith Server API running on port ${PORT}`);
});
