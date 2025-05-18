import express from 'express';
import cors from 'cors';
import { verify } from './api/routes/verify';
import paymentRoutes from './api/routes/paymentRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/verify', verify);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5173;

if (process.env.NODE_ENV !== 'development') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

