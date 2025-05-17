import { useState } from 'react';
import { Link } from 'react-router-dom';
import VerificationButton from '../components/VerificationButton';
import { Sprout } from 'lucide-react';


const HomePage = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleLogin = () => {
    // Aquí conectas tu lógica real de inicio de sesión
    setIsConnected(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Barra superior */}
      <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 bg-transparent text-white">
        <div className="flex items-center gap-2">
          <Sprout className="h-6 w-6 text-green-400" />
          <span className="text-lg font-bold text-green-100">AgroTrust Global</span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/marketplace" className="hover:text-green-400 transition-colors">Marketplace</Link>
          <span className={`font-semibold ${isConnected ? 'text-green-300' : 'text-red-400'}`}>
            {isConnected ? 'Conectado' : 'No conectado'}
          </span>
        </nav>
      </header>

      {/* Fondo animado con overlay oscuro */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 animate-bgZoom"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1635491201370-1abd16f0cde0?q=80&w=1826&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        <div className="flex items-center mb-6 animate-fadeInDown">
          <Sprout className="h-16 w-16 text-green-500 animate-pulse-slow" />
          <span className="ml-2 text-3xl font-semibold drop-shadow-md">
            AgroTrust Global
          </span>
        </div>
        <div className="animate-fadeInUp delay-500" onClick={handleLogin}>
          <VerificationButton />
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>
        {`
          @keyframes bgZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.07); }
          }
          .animate-bgZoom {
            animation: bgZoom 18s ease-in-out infinite alternate;
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeInDown {
            animation: fadeInDown 1s ease-out forwards;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }
          .animate-pulse-slow {
            animation: pulse 2.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
