import { Router, Request, Response } from 'express';
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from '@worldcoin/minikit-js';
import dotenv from 'dotenv';

dotenv.config();

const verifyRouter = Router();

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal: string | undefined;
}

verifyRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { payload, action, signal } = req.body as IRequestPayload;
    const app_id = process.env.APP_ID as `app_${string}`;

    const verifyRes = await verifyCloudProof(
      payload,
      app_id,
      action,
      signal
    ) as IVerifyResponse;

    if (verifyRes.success) {
      // Verification successful
      return res.json({ verifyRes, status: 200 });
    } else {
      // Verification failed
      return res.json({ verifyRes, status: 400 });
    }
  } catch (error) {
    console.error('Error verifying proof:', error);
    return res.status(500).json({ 
      error: 'Error processing verification', 
      status: 500 
    });
  }
});

export default verifyRouter;