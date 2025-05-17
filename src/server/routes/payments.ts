import type { Request, Response } from 'express';
import express from 'express';
import crypto from 'crypto';

interface PaymentRequest {
  amount: number;
  recipientAddress: string;
  description: string;
  token: string;
}

interface Transaction extends PaymentRequest {
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  transactionHash?: string;
}

const router = express.Router();

// Store for keeping track of initiated transactions
const pendingTransactions = new Map<string, Transaction>();

// Initiate a new payment transaction
router.post('/initiate-payment', async (req: Request, res: Response) => {
  try {
    const { amount, recipientAddress, description, token } = req.body as PaymentRequest;
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
router.get('/payment-status/:paymentId', async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;

    // Get the transaction details
    const transaction = pendingTransactions.get(paymentId);
    if (!transaction) {
      res.status(404).json({ success: false, error: 'Transaction not found' });
      return;
    }

    // In a real implementation, you would verify the payment with World App's API
    // For now, we'll just return the transaction status
    res.json({ 
      success: true, 
      status: transaction.status,
      details: {
        amount: transaction.amount,
        recipientAddress: transaction.recipientAddress,
        description: transaction.description,
        token: transaction.token,
        timestamp: transaction.timestamp,
        transactionHash: transaction.transactionHash
      }
    });

  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ error: 'Error checking payment status' });
  }
});

interface WebhookPayload {
  paymentId: string;
  status: 'completed' | 'failed';
  transactionHash: string;
}

// Webhook endpoint for World App payment notifications
router.post('/payment-webhook', async (req: Request, res: Response) => {
  try {
    const { paymentId, status, transactionHash } = req.body as WebhookPayload;

    // Get the transaction
    const transaction = pendingTransactions.get(paymentId);
    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    // Update transaction status
    transaction.status = status;
    transaction.transactionHash = transactionHash;
    pendingTransactions.set(paymentId, transaction);

    res.json({ success: true });
  } catch (error) {
    console.error('Error processing payment webhook:', error);
    res.status(500).json({ error: 'Error processing payment webhook' });
  }
});

export default router;
