import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import { APP_ID, BACKENDURL } from '../../environtment';
import SendPaymentButton from './sendPaymentButton';

const VerificationButton = () => {
  const navigate = useNavigate();
  const { setUserProof } = useAuth();
  const [isVerified, setIsVerified] = useState(false);

  const handleSuccess = async (result: ISuccessResult) => {
    try {
      const response = await axios.post(`${BACKENDURL}api/verify`, {
        merkle_root: result.merkle_root,
        nullifier_hash: result.nullifier_hash,
        proof: result.proof,
        credential_type: result.credential_type,
        signal: 'hello',
      });

      if (response.data.success) {
        setUserProof({
          nullifier_hash: result.nullifier_hash,
          verification_level: 'orb',
        });
        setIsVerified(true); // Show payment button
      } else {
        alert('❌ Verificación fallida');
      }
    } catch (error) {
      console.error('❌ Error al verificar:', error);
      alert('❌ Hubo un error en la verificación');
    }
  };

  return (
    <div className="space-y-4">
      {!isVerified ? (
        <IDKitWidget
          app_id={APP_ID}
          action="safe-access"
          signal="hello"
          onSuccess={handleSuccess}
        >
          {({ open }) => (
            <button onClick={open} className="bg-blue-600 text-white px-4 py-2 rounded">
              Iniciar sesión con World ID
            </button>
          )}
        </IDKitWidget>
      ) : (
        <SendPaymentButton />
      )}
    </div>
  );
};

export default VerificationButton;
