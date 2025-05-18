import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Star, MapPin, Building, DollarSign } from 'lucide-react';
import { sendPayment } from '../utils/sendPayment';

type Product = {
  id: string;
  name: string;
  type: 'cacao' | 'banana';
  price: number;
  company: string;
  location: string;
  rating: number;
  image: string;
  description: string;
};

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Cacao Nibs',
    type: 'cacao',
    price: 0.01,
    company: 'BANACACAO',
    location: 'Guayaquil, Ecuador',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/4919737/pexels-photo-4919737.jpeg',
    description: 'High-quality fermented cacao nibs from Ecuador\'s finest plantations.'
  },
  {
    id: '2',
    name: 'Organic Bananas',
    type: 'banana',
    price: 0.01,
    company: 'BioFruit S.A',
    location: 'Machala, Ecuador',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg',
    description: 'Fresh organic bananas grown in sustainable plantations.'
  },
  {
    id: '3',
    name: 'Dark Cacao Beans',
    type: 'cacao',
    price: 2100,
    company: 'DAFRUS',
    location: 'Quito, Ecuador',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/867464/pexels-photo-867464.jpeg',
    description: 'Premium dark cacao beans with rich flavor profile.'
  },
  {
    id: '4',
    name: 'Export Bananas',
    type: 'banana',
    price: 1150,
    company: 'TropiSales',
    location: 'Guayaquil, Ecuador',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg',
    description: 'Export-quality bananas perfect for international markets.'
  }
];

const MarketplacePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'cacao' | 'banana'>('all');
  const [priceRange, setPriceRange] = useState<number>(3000);

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
    alert('Please connect your wallet to make a purchase');
    return;
  }

  try {
    const res = await fetch('/api/payments/initiate-payment', { method: 'POST' });
    const { id } = await res.json();

    const result = await sendPayment(id);

    if (result.success) {
      alert(`✅ Payment successful for ${product.name}!`);
    } else {
      alert('❌ Payment failed to confirm');
    }
  } catch (err) {
    console.error(err);
    alert('❌ Error during payment');
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Agricultural Marketplace</h1>
        <p className="text-gray-600">Discover premium cacao and banana products from Ecuador's trusted suppliers.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products, companies, or locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="w-48">
            <select
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'all' | 'cacao' | 'banana')}
            >
              <option value="all">All Products</option>
              <option value="cacao">Cacao</option>
              <option value="banana">Bananas</option>
            </select>
          </div>

          <div className="w-48">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Max Price ($/ton)</label>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-600 mt-1">${priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  {product.company}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {product.location}
                </div>
                <div className="flex items-center text-sm font-semibold text-gray-900">
                  <DollarSign className="h-4 w-4 mr-2" />
                  ${product.price}/ton
                </div>
              </div>
              
              <button
                onClick={() => handlePurchase(product)}
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? 'Purchase Now' : 'Connect Wallet to Purchase'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;