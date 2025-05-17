import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, username, disconnect } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="ml-2 font-semibold text-lg">AgroTrust Global</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/marketplace" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Marketplace
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{username}</span>
                </div>
                <button
                  onClick={disconnect}
                  className="flex items-center text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Disconnect
                </button>
              </>
            ) : (
              <div className="flex items-center text-gray-500 px-3 py-2 rounded-md text-sm font-medium">
                Not connected
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;