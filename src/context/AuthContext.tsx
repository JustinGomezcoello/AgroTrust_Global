import { createContext, useContext, useState } from 'react';

type ProofData = {
  nullifier_hash: string;
  verification_level: string;
};

type AuthContextType = {
  userProof: ProofData | null;
  setUserProof: (proof: ProofData) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProof, setUserProof] = useState<ProofData | null>(null);

  const isAuthenticated = !!userProof;

  return (
    <AuthContext.Provider value={{ userProof, setUserProof, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
