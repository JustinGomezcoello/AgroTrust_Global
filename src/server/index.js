import express from 'express';
import cors from 'cors';
import axios from 'axios';
import paymentRoutes from './routes/payments';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', paymentRoutes);

app.get('/api/nonce', (req, res) => {
  const nonce = Math.floor(Math.random() * 100000).toString();
  res.json({ nonce });
});

app.post('/api/verify', async (req, res) => {
  try {
    const { merkle_root, nullifier_hash, proof, credential_type, signal } = req.body;

    // Enviar a la API de verificación de Worldcoin
    const response = await axios.post('https://developer.worldcoin.org/api/v1/verify', {
      app_id: 'app_3e7d0782d2b470ebcdbbac2bf38893d2', // Tu App ID real
      credential_type,
      merkle_root,
      nullifier_hash,
      proof,
      signal
    });

    if (response.data.success) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: 'Invalid World ID proof' });
    }
  } catch (error) {
    console.error('Error verifying World ID proof:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('AgroTrust Global backend funcionando!');
});

