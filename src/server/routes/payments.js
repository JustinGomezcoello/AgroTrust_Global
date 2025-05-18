import express from 'express';
import crypto from 'crypto';

const router = express.Router();

// Store for keeping track of initiated transactions
const pendingTransactions = new Map();

// Initiate a new payment transaction
router.post('/initiate-payment', async (req, res) => {
  try {
    const { amount, recipientAddress, description, token } = req.body;
    const paymentId = crypto.randomUUID();

    // Save the pending transaction details
    pendingTransactions.set(paymentId, {
      status: 'pending',
      timestamp: Date.now(),
      amount,
      recipientAddress,
      description,
      token
    });

    res.json({ id: paymentId });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ error: 'Error initiating payment' });
  }
});

// Check payment status
router.get('/payment-status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const transaction = pendingTransactions.get(paymentId);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ error: 'Error checking payment status' });
  }
});

export default router;
