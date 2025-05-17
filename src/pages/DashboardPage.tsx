import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Key, Shield } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { userProof } = useAuth();

  if (!userProof) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-8 text-white">
          <div className="flex items-center">
            <UserCheck className="h-10 w-10 mr-3" />
            <h1 className="text-3xl font-bold">Authentication Successful</h1>
          </div>
          <p className="mt-2 text-white/80">You've successfully verified your identity with World ID!</p>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Verification Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <div className="flex items-center mb-3">
                <Key className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-gray-800">Nullifier Hash</h3>
              </div>
              <p className="text-sm font-mono bg-gray-100 p-3 rounded break-all">{userProof.nullifier_hash}</p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-medium text-gray-800">Verification Level</h3>
              </div>
              <p className="text-sm bg-green-100 text-green-800 py-2 px-3 rounded inline-block">{userProof.verification_level}</p>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">What does this mean?</h3>
            <p className="text-gray-600">
              You have proven that you are a unique human without revealing any personal information. 
              This authentication can be used to:
            </p>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Access services that require proof of personhood
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Prevent sybil attacks and bot activity
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Participate in systems that require one-person-one-vote
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;