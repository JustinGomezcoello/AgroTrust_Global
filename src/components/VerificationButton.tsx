import React from 'react';
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit';
import { Shield } from 'lucide-react';

type VerificationButtonProps = {
  onSuccess: (result: ISuccessResult) => void;
  appId: string;
  action: string;
};

const VerificationButton: React.FC<VerificationButtonProps> = ({
  onSuccess,
  appId,
  action
}) => {
  return (
    <IDKitWidget
      app_id={appId}
      action={action}
      onSuccess={onSuccess}
      walletConnectProjectId="world_id_demo"
      signal="world_id_demo_signal"
      title="World ID Verification"
      handleVerify={async (proof) => {
        // This is required by the widget but the actual verification happens in the backend
        return true;
      }}
    >
      {({ open }) => (
        <button 
          onClick={open}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow transition-colors duration-300 flex items-center"
        >
          <Shield className="h-5 w-5 mr-2" />
          Verify with World ID
        </button>
      )}
    </IDKitWidget>
  );
};

export default VerificationButton;