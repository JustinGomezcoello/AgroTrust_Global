import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISuccessResult } from '@worldcoin/idkit';
import { useAuth } from '../context/AuthContext';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { verifyWorldID } from '../utils/verificationHelpers';
import VerificationButton from '../components/VerificationButton';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserProof } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (result: ISuccessResult) => {
    setIsVerifying(true);
    setError(null);
    
    try {
      const verificationResult = await verifyWorldID({
        merkle_root: result.merkle_root,
        nullifier_hash: result.nullifier_hash,
        proof: result.proof,
        verification_level: result.verification_level
      });
      
      if (verificationResult.success) {
        setUserProof({
          merkle_root: result.merkle_root,
          nullifier_hash: result.nullifier_hash,
          proof: result.proof,
          verification_level: result.verification_level
        });
        navigate('/dashboard');
      } else {
        setError(verificationResult.error || 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white">
          <h1 className="text-4xl font-bold mb-4">World ID Authentication Demo</h1>
          <p className="text-xl opacity-90">Experience Proof of Personhood without revealing your identity</p>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">How It Works</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Privacy-First Verification</h3>
                    <p className="text-gray-600">Prove you're human without sharing personal data</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">One-Click Authentication</h3>
                    <p className="text-gray-600">Simple verification process using World ID</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-amber-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Zero Knowledge Proofs</h3>
                    <p className="text-gray-600">Advanced cryptography to protect your identity</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verify with World ID</h2>
              <p className="text-gray-600 mb-8 text-center">Click below to verify your identity using World ID</p>
              
              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className={`transform transition-transform duration-300 ${isVerifying ? 'opacity-70' : 'hover:scale-105'}`}>
                <VerificationButton
                  appId="app_3e7d0782d2b470ebcdbbac2bf38893d2"
                  action="world-id-authentication"
                  onSuccess={handleVerify}
                />
              </div>
              
              {isVerifying && (
                <div className="mt-4 text-blue-600">
                  Verifying your identity...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;