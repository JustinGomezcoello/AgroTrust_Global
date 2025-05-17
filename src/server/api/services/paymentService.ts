import axios from 'axios';
import { MiniAppPaymentSuccessPayload } from '../../../types/worldcoin';
import { getReference } from '../../../utils/dbConfig';

export async function verifyTransaction(payload: MiniAppPaymentSuccessPayload): Promise<boolean> {
  const reference = getReference();
  if (!reference || payload.reference !== reference) return false;

  try {
    const response = await axios.get(`https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
      },
      params: {
        app_id: process.env.APP_ID,
      },
    });

    const transaction = response.data;
    return transaction.reference === reference && transaction.status !== 'failed';
  } catch (error) {
    console.error('Transaction verification error:', (error as any).response?.data || error);
    return false;
  }
}