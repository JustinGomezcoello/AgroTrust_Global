import React from 'react';
import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js';
import axios from 'axios';

const SendPaymentButton: React.FC = () => {
  const sendPayment = async () => {
    try {
      const { data: initiateData } = await axios.post('https://5770-190-9-183-30.ngrok-free.app/api/payments/initiate-payment');
      const reference = initiateData.id;

      const payload: PayCommandInput = {
        reference,
        to: '0x3d568d2f18445ea75726321d6711dc583fc014b2',
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
        description: 'Test payment for Worldcoin MiniKit',
      };

      if (!MiniKit.isInstalled()) {
        alert('⚠️ World App is not installed.');
        return;
      }

      const { finalPayload } = await MiniKit.commandsAsync.pay(payload);

      if (finalPayload.status === 'success') {
        const verifyRes = await axios.post('https://5770-190-9-183-30.ngrok-free.app/api/payments/verify-payment', {
          payload: finalPayload,
        });

        if (verifyRes.data.success) {
          alert('✅ Payment successful and verified!');
        } else {
          alert('❌ Payment verification failed.');
        }
      } else {
        alert('❌ Payment was not completed.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('❌ Error during payment process.');
    }
  };

  return (
    <button
      onClick={sendPayment}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Send Payment with World App
    </button>
  );
};

export default SendPaymentButton;
