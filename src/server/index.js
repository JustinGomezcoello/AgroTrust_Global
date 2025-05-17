import express from 'express';
import cors from 'cors';
import { SiweMessage } from 'siwe';
import ngrok from 'ngrok';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Store nonces in memory (use a proper database in production)
const nonces = new Set();

app.get('/api/nonce', (req, res) => {
  const nonce = Math.floor(Math.random() * 1000000).toString();
  nonces.add(nonce);
  res.json({ nonce });
});

app.post('/api/verify-siwe', async (req, res) => {
  try {
    const { message, signature, address } = req.body;
    const siweMessage = new SiweMessage(message);
    
    // Verify the signature
    const fields = await siweMessage.verify({ signature, address });
    
    if (fields.success && nonces.has(fields.data.nonce)) {
      nonces.delete(fields.data.nonce);
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/initiate-payment', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    // Generate a unique reference ID for the payment
    const referenceId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    res.json({
      success: true,
      referenceId,
      amount,
      currency
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { transactionId } = req.body;
    // Here you would verify the transaction with World ID's API
    // For demo purposes, we'll simulate a successful verification
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server and create ngrok tunnel
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  try {
    const url = await ngrok.connect(PORT);
    console.log(`ngrok tunnel created: ${url}`);
  } catch (error) {
    console.error('ngrok tunnel creation failed:', error);
  }
};

startServer();