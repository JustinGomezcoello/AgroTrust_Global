import VerificationButton from '../components/VerificationButton';
import { Sprout } from 'lucide-react';

const HomePage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1635491201370-1abd16f0cde0?q=80&w=1826&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ')", // Nueva imagen de fondo
      }}
    >
      <div className="flex items-center mb-6">
        <Sprout className="h-16 w-16 text-green-600" /> {/* Ícono de la planta */}
        <span className="ml-2 text-3xl font-semibold text-white">AgroTrust Global</span>
      </div>
      <VerificationButton />
    </div>
  );
};

export default HomePage;