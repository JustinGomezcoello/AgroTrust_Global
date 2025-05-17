import { Request, Response } from 'express';
import { generateUUID } from '../../utils/uuidUtils';
import { MiniAppPaymentSuccessPayload } from '../../types/worldcoin';
import { saveReference } from '../../utils/dbConfig';
import { verifyTransaction } from '../api/services/paymentService';

export async function initiatePayment(req: Request, res: Response): Promise<void> {
  const uuid = generateUUID();
  saveReference(uuid);
  res.json({ id: uuid });
}

export async function verifyPayment(req: Request, res: Response): Promise<void> {
  const { payload } = req.body as { payload: MiniAppPaymentSuccessPayload };
  const success = await verifyTransaction(payload);
  res.json({ success });
}