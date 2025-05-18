import React from 'react';
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js';
import { useAuth } from '../context/AuthContext';

const VerificationButton = () => {
  const { setUserProof } = useAuth();

  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) {
      alert('World App is not installed or accessible.');
      return;
    }

    const verifyPayload: VerifyCommandInput = {
      action: 'safe-access',
      signal: '0x12312', // Optional additional data
      verification_level: VerificationLevel.Orb,
    };

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

      if (finalPayload.status === 'error') {
        console.error('Verification error:', finalPayload);
        alert('❌ Verification failed.');
        return;
      }      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult,
          action: 'safe-access',
          signal: verifyPayload.signal,
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        setUserProof({
          nullifier_hash: finalPayload.nullifier_hash,
          verification_level: finalPayload.verification_level,
        });
        alert('✅ Verification successful!');
      } else {
        console.error('Backend verification failed:', data);
        alert('❌ Verification was rejected by backend.');
      }
    } catch (err) {
      console.error('Unexpected verification error:', err);
      alert('❌ Something went wrong.');
    }
  };

  return (
    <button
      onClick={handleVerify}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
    >
      Verify with World App
    </button>
  );
};

export default VerificationButton;