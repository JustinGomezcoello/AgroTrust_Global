import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const VerificationButton = () => {
  const navigate = useNavigate();
  const { setUserProof } = useAuth();

  const handleSuccess = async (result: ISuccessResult) => {
    try {
      const response = await axios.post('https://680e-190-9-183-30.ngrok-free.app/api/verify', {
        merkle_root: result.merkle_root,
        nullifier_hash: result.nullifier_hash,
        proof: result.proof,
        credential_type: result.credential_type,
        signal: 'hello'
      });

      if (response.data.success) {
        setUserProof({
          nullifier_hash: result.nullifier_hash,
          verification_level: 'orb'
        });
        navigate('/marketplace');
      } else {
        alert('❌ Verificación fallida');
      }
    } catch (error) {
      console.error('❌ Error al verificar:', error);
      alert('❌ Hubo un error en la verificación');
    }
  };

  return (
    <IDKitWidget
      app_id="app_3e7d0782d2b470ebcdbbac2bf38893d2"
      action="safe-access" // debe coincidir con tu acción creada
      signal="hello"
      onSuccess={handleSuccess}
    >
      {({ open }) => (
        <button onClick={open} className="bg-blue-600 text-white px-4 py-2 rounded">
          Iniciar sesión con World ID
        </button>
      )}
    </IDKitWidget>
  );
};

export default VerificationButton;
