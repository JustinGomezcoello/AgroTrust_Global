// utils/sendPayment.ts
import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js';
import axios from 'axios';

export const sendPayment = async (reference: string) => {
  const payload: PayCommandInput = {
    reference,
    to: '0x3d568d2f18445ea75726321d6711dc583fc014b2', // Replace with actual receiver address
    tokens: [
      {
        symbol: Tokens.WLD,
        token_amount: tokenToDecimals(1, Tokens.WLD).toString(),
      },
      {
        symbol: Tokens.USDCE,
        token_amount: tokenToDecimals(3, Tokens.USDCE).toString(),
      },
    ],
    description: 'Purchase in marketplace',
  };

  if (!MiniKit.isInstalled()) {
    alert('World App is not installed.');
    return;
  }

  const { finalPayload } = await MiniKit.commandsAsync.pay(payload);

  if (finalPayload.status === 'success') {
    const res = await axios.post('https://5770-190-9-183-30.ngrok-free.app/api/payments/confirm-payment', finalPayload);
    return res.data;
  }

  throw new Error('Payment was not successful.');
};