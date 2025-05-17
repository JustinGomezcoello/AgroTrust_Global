import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';

type AuthContextType = {
  isAuthenticated: boolean;
  walletAddress: string | null;
  username: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const connect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        // Get nonce from backend
        const nonceResponse = await fetch('/api/nonce');
        const { nonce } = await nonceResponse.json();
        
        // Create SIWE message
        const domain = window.location.host;
        const origin = window.location.origin;
        const statement = 'Sign in with Ethereum to AgroTrust Global';
        
        const message = `${domain} wants you to sign in with your Ethereum account:\n${address}\n\n${statement}\n\nURI: ${origin}\nVersion: 1\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}`;
        
        // Sign message
        const signature = await signer.signMessage(message);
        
        // Verify signature with backend
        const verifyResponse = await fetch('/api/verify-siwe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, signature, address })
        });
        
        if (verifyResponse.ok) {
          setWalletAddress(address);
          setUsername(`User_${address.slice(2, 8)}`);
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const disconnect = () => {
    setWalletAddress(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!walletAddress,
      walletAddress,
      username,
      connect,
      disconnect
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};