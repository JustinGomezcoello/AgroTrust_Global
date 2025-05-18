import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Verify endpoint
app.post('/api/verify', async (req, res) => {
  try {
    const { payload, action, signal } = req.body;
    const app_id = process.env.APP_ID;

    // TODO: Implement actual verification logic
    console.log('Received verification request:', { action, signal });
    
    res.json({ 
      status: 200,
      verifyRes: {
        success: true,
        code: "success"
      }
    });
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
