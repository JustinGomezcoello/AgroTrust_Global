import { Request, Response } from 'express';
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from '@worldcoin/minikit-js';
import dotenv from 'dotenv';

dotenv.config();

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal: string | undefined;
}

export const verify = async (req: Request, res: Response) => {
  try {
    const { payload, action, signal } = req.body as IRequestPayload;
    const app_id = process.env.APP_ID as `app_${string}`;

    if (!app_id) {
      console.error('APP_ID not found in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const verifyRes = await verifyCloudProof(payload, app_id, action, signal) as IVerifyResponse;

    if (verifyRes.success) {
      // Verification successful
      return res.json({ verifyRes, status: 200 });
    } else {
      // Verification failed
      console.error('Verification failed:', verifyRes);
      return res.json({ verifyRes, status: 400 });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};