import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MiniKit } from '@worldcoin/minikit-js';
import { Wallet } from 'lucide-react';
import crypto from 'crypto';

const WalletAuthButton = () => {
  const { setUserProof } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);

      // Check if World App is installed
      if (!MiniKit.isInstalled()) {
        alert('Por favor instala World App para continuar');
        return;
      }      // Use MiniKit to verify identity with World App
      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: 'login',
        signal: crypto.randomUUID(),
        credential_types: ['orb']
      });

      // Make sure the verification was successful
      if (finalPayload.status !== 'success') {
        throw new Error('Error al verificar con World App');
      }

      // If successful, set the user proof
      setUserProof({
        nullifier_hash: finalPayload.credential,
        verification_level: 'world_app'
      });
      
    } catch (error) {
      console.error('Error conectando wallet:', error);
      alert('Error al conectar la wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="flex items-center gap-2 bg-[#3b2f2a] hover:bg-[#4b3f3a] text-[#f5e9da] px-4 py-2 rounded-xl transition-all duration-200 font-bold shadow-md"
    >
      <Wallet className="h-5 w-5" />
      {isConnecting ? 'Conectando...' : 'Conectar Wallet'}
    </button>
  );
};

export default WalletAuthButton;
