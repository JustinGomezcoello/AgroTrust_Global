import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Star, MapPin, Building, DollarSign, Leaf } from 'lucide-react';
import WalletAuthButton from '../components/WalletAuthButton';
import { processWorldAppPayment } from '../utils/paymentHelpers';

// Imágenes reales y de alta calidad de cacao y banano
const PRODUCTS = [
  {
    id: '1',
    name: 'Cacao Arriba Nacional',
    type: 'cacao',
    price: 2100,
    company: 'Ecuacacao Export',
    location: 'Guayaquil, Ecuador',
    rating: 4.9,
    image: 'https://concepto.de/wp-content/uploads/2018/08/cacao-e1533849112880.jpg',
    description: 'Cacao fino de aroma, variedad Arriba Nacional, reconocido mundialmente por su sabor y calidad.'
  },
  {
    id: '2',
    name: 'Banano Premium Cavendish',
    type: 'banana',
    price: 1200,
    company: 'TropicalFruit S.A.',
    location: 'Machala, Ecuador',
    rating: 4.8,
    image: 'https://efructifera.com/wp-content/uploads/2021/07/cavendish-banana-1.jpg',
    description: 'Banano Cavendish de exportación, seleccionado y empacado bajo los más altos estándares.'
  },
  {
    id: '3',
    name: 'Cacao Orgánico Fino',
    type: 'cacao',
    price: 1950,
    company: 'BioCacao Ecuador',
    location: 'Los Ríos, Ecuador',
    rating: 4.7,
    image: 'https://www.larepublica.ec/wp-content/uploads/2023/07/Chocolate-612x381.jpg',
    description: 'Cacao orgánico certificado, ideal para chocolatería gourmet y exportación.'
  },
  {
    id: '4',
    name: 'Banano Orgánico',
    type: 'banana',
    price: 1300,
    company: 'GreenAndes',
    location: 'El Oro, Ecuador',
    rating: 4.6,
    image: 'https://producebusiness.com/wp-content/uploads/2018/12/novemberbananas1.jpg',
    description: 'Banano orgánico de plantaciones sostenibles, sabor dulce y textura perfecta.'
  },
  {
    id: '5',
    name: 'Cacao en Grano Seleccionado',
    type: 'cacao',
    price: 2200,
    company: 'Amazonia Gold',
    location: 'Sucumbíos, Ecuador',
    rating: 4.95,
    image: 'https://www.sisinternational.com/wp-content/uploads/2023/01/cocoa-market-research.jpg.webp',
    description: 'Granos de cacao seleccionados a mano, ideales para exportación y chocolatería fina.'
  },
  {
    id: '6',
    name: 'Banano Extra Dulce',
    type: 'banana',
    price: 1250,
    company: 'BananaWorld',
    location: 'Guayas, Ecuador',
    rating: 4.7,
    image: 'https://producebusiness.com/wp-content/uploads/2024/10/novemberbananasfeature.png',
    description: 'Banano extra dulce, ideal para mercados internacionales exigentes.'
  }
];

const PALETTE = {
  background: '#2d2320', // chocolate oscuro
  card: '#3b2f2a',      // marrón intermedio
  accent: '#7c5e3c',    // marrón claro/acento
  beige: '#f5e9da',     // beige claro
  green: '#7ed957',     // verde acento
  greenDark: '#3a5a40', // verde oscuro
  gold: '#e2b857',      // dorado suave
};

const MERCHANT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678'; // Replace with actual merchant address

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  company: string;
  location: string;
  rating: number;
  image: string;
  description: string;
}

const MarketplacePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'cacao' | 'banana'>('all');
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesType && matchesPrice;
  });

  const handlePurchase = async (product: Product) => {
    if (!isAuthenticated) {
      alert('Por favor conecta tu World App wallet para comprar');
      return;
    }

    try {
      setLoadingProductId(product.id);
      const paymentId = await processWorldAppPayment({
        amount: product.price,
        recipientAddress: MERCHANT_ADDRESS,
        description: `Compra de ${product.name} - ${product.company}`,
        token: 'USDC'
      });

      // You might want to poll your backend here to check payment status
      console.log('Payment initiated:', paymentId);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Error al procesar el pago. Por favor intenta de nuevo.');
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: PALETTE.background,
      width: '100vw',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      {/* Header del Marketplace */}      <div className="relative py-8">
        <div className="absolute left-4 top-4 z-20">
          <Link to="/" className="block transition-transform hover:scale-110">
            <Leaf style={{ color: PALETTE.green, width: 48, height: 48 }} className="hover:opacity-100 opacity-70" />
          </Link>
        </div>        <div className="absolute right-4 top-4 z-20">
          {!isAuthenticated && <WalletAuthButton />}
        </div>
        <div className="text-center relative">
          <h1 className="text-4xl font-bold mb-2" style={{ color: PALETTE.beige }}>Marketplace AgroTrust</h1>
          <p className="text-xl mb-2" style={{ color: PALETTE.green }}>Cacao y Banano Ecuatoriano para el Mundo</p>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: PALETTE.beige, opacity: 0.8 }}>
            Descubre, conecta y compra los mejores productos agrícolas de Ecuador, directamente de productores certificados a compradores globales.
          </p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="w-full px-4 py-6 flex flex-col md:flex-row gap-6 items-center animate-fadeInUp" 
        style={{ position: 'sticky', top: 0, background: PALETTE.background, zIndex: 10 }}>
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: PALETTE.green, width: 20, height: 20 }} />
            <input
              type="text"
              placeholder="Buscar productos, empresas o ubicaciones..."
              className="w-full pl-10 pr-4 py-2 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm"
              style={{ background: PALETTE.card, color: PALETTE.beige, border: `1px solid ${PALETTE.accent}` }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="py-2 px-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm"
            style={{ background: PALETTE.card, color: PALETTE.beige, border: `1px solid ${PALETTE.accent}` }}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'cacao' | 'banana')}
          >
            <option value="all">Todos los productos</option>
            <option value="cacao">Cacao</option>
            <option value="banana">Banano</option>
          </select>
          <div className="flex flex-col items-start">
            <label className="text-xs mb-1" style={{ color: PALETTE.beige, opacity: 0.8 }}>Precio máx. ($/ton)</label>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-32"
              style={{ accentColor: PALETTE.green }}
            />
            <span className="text-xs mt-1 font-semibold" style={{ color: PALETTE.green }}>{`$${priceRange}`}</span>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="w-full h-[calc(100vh-120px)] overflow-y-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="rounded-3xl shadow-xl overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 group animate-fadeInUp border"
              style={{
                animationDelay: `${idx * 80}ms`,
                background: PALETTE.card,
                borderColor: PALETTE.accent
              }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:brightness-95 transition duration-300"
                  loading="lazy"
                  style={{ objectPosition: 'center', background: '#1a1a1a' }}
                />
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-md"
                  style={{
                    background: product.type === 'cacao' ? PALETTE.gold : PALETTE.green,
                    color: product.type === 'cacao' ? '#3b2f2a' : '#232b25',
                    letterSpacing: 1
                  }}>
                  {product.type === 'cacao' ? 'Cacao' : 'Banano'}
                </span>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold group-hover:text-green-300 transition-colors" style={{ color: PALETTE.beige }}>{product.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5" style={{ color: PALETTE.gold }} />
                    <span className="ml-1 text-base font-semibold" style={{ color: PALETTE.gold }}>{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm mb-2 min-h-[48px]" style={{ color: PALETTE.beige, opacity: 0.85 }}>{product.description}</p>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center" style={{ color: PALETTE.green }}><Building className="h-4 w-4 mr-2" />{product.company}</div>
                  <div className="flex items-center" style={{ color: PALETTE.greenDark }}><MapPin className="h-4 w-4 mr-2" />{product.location}</div>
                  <div className="flex items-center font-bold text-lg" style={{ color: PALETTE.gold }}><DollarSign className="h-5 w-5 mr-2" />${product.price}<span className="text-xs font-normal ml-1" style={{ color: PALETTE.beige }}>/ton</span></div>
                </div>
                <button
                  onClick={() => handlePurchase(product)}
                  className={`mt-4 w-full py-2 px-4 rounded-xl font-bold shadow-md transition-all duration-200 text-lg ${loadingProductId === product.id ? 'opacity-75' : ''}`}
                  style={isAuthenticated ? {
                    background: PALETTE.green,
                    color: PALETTE.card,
                    border: 'none'
                  } : {
                    background: PALETTE.accent,
                    color: PALETTE.beige,
                    border: `1.5px solid ${PALETTE.green}`,
                    cursor: 'not-allowed'
                  }}
                  disabled={!isAuthenticated || loadingProductId === product.id}
                >
                  {loadingProductId === product.id ? 'Procesando...' : (isAuthenticated ? 'Comprar ahora' : 'Conecta tu wallet para comprar')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fadeInUp">
            <p style={{ color: PALETTE.beige }}>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      {/* Animaciones personalizadas */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.9s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-fadeInUp.delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 18s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketplacePage;