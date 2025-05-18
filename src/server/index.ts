import axios from 'axios';
import express from 'express';
import paymentRoutes from './api/routes/paymentRoutes'

const app = express();
const PORT = 5173;

//app.use(cors());
app.use(express.json());
app.use('/api/payments', paymentRoutes);


app.get('/api/nonce', (req, res) => {
  const nonce = Math.floor(Math.random() * 100000).toString();
  res.json({ nonce });
});

app.post('/api/verify', async (req, res) => {
  try {
    const { merkle_root, nullifier_hash, proof, credential_type, signal } = req.body;

    // Enviar a la API de verificación de Worldcoin
    const response = await axios.post('https://5770-190-9-183-30.ngrok-free.app/api/v1/verify', {
      app_id: 'app_130d37495d2efb307d470dfea2607867', // Tu App ID real
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

