
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit';
import axios from 'axios';

const VerificationButton = () => {
  const handleSuccess = async (result: ISuccessResult) => {
    try {
      const response = await axios.post('https://7227-190-9-183-30.ngrok-free.app/api/verify', {
        merkle_root: result.merkle_root,
        nullifier_hash: result.nullifier_hash,
        proof: result.proof,
        credential_type: result.credential_type,
        signal: "hello"

      });

      if (response.data.success) {
        alert('✅ Verificado correctamente');
        // Aquí puedes redirigir al dashboard o mostrar contenido privado
      } else {
        alert('❌ Verificación fallida');
      }
    } catch (error) {
      console.error('Error verificando:', error);
      alert('❌ Error en la verificación');
    }
  };

  return (
    <IDKitWidget
      app_id="app_3e7d0782d2b470ebcdbbac2bf38893d2" // ← Tu App ID
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
  );
};

export default VerificationButton;
