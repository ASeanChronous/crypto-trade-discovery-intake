'use client'
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Upload, Users, TrendingUp, Shield, Bitcoin, DollarSign } from 'lucide-react';

const TailwindCryptoIntake = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', category: 'major', color: 'bg-orange-100 text-orange-800' },
    { symbol: 'ETH', name: 'Ethereum', category: 'major', color: 'bg-blue-100 text-blue-800' },
    { symbol: 'USDT', name: 'Tether', category: 'stablecoin', color: 'bg-green-100 text-green-800' },
    { symbol: 'USDC', name: 'USD Coin', category: 'stablecoin', color: 'bg-green-100 text-green-800' },
    { symbol: 'BNB', name: 'Binance Coin', category: 'exchange', color: 'bg-yellow-100 text-yellow-800' },
    { symbol: 'ADA', name: 'Cardano', category: 'altcoin', color: 'bg-purple-100 text-purple-800' },
    { symbol: 'SOL', name: 'Solana', category: 'altcoin', color: 'bg-purple-100 text-purple-800' },
    { symbol: 'DOT', name: 'Polkadot', category: 'altcoin', color: 'bg-pink-100 text-pink-800' },
    { symbol: 'MATIC', name: 'Polygon', category: 'altcoin', color: 'bg-indigo-100 text-indigo-800' },
    { symbol: 'UNI', name: 'Uniswap', category: 'defi', color: 'bg-red-100 text-red-800' },
    { symbol: 'LINK', name: 'Chainlink', category: 'defi', color: 'bg-blue-100 text-blue-800' },
    { symbol: 'AAVE', name: 'Aave', category: 'defi', color: 'bg-cyan-100 text-cyan-800' }
  ];

  const discountTiers = [
    { label: '$10K - $50K', discount: '0.5%', color: 'bg-green-50 border-green-200 text-green-800' },
    { label: '$50K - $100K', discount: '1.0%', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { label: '$100K - $500K', discount: '1.5%', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { label: '$500K - $1M', discount: '2.0%', color: 'bg-orange-50 border-orange-200 text-orange-800' },
    { label: '$1M+', discount: '2.5%', color: 'bg-red-50 border-red-200 text-red-800' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Bitcoin className="w-16 h-16 text-orange-500 animate-bounce-subtle" />
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              Crypto Trade Discovery Intake
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            Professional bulk cryptocurrency trading platform with volume discounts up to 2.5%
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <div 
            className="group card hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400"
            onClick={() => { setUserType('seller'); setCurrentStep('seller-onboarding'); }}
          >
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Seller</h3>
              <p className="text-gray-600 mb-6">Sell your crypto assets in bulk with competitive rates</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Volume-based rates</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Same-day processing</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Guaranteed settlement</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Institutional security</span>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="group card hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-400"
            onClick={() => { setUserType('buyer'); setCurrentStep('buyer-onboarding'); }}
          >
            <div className="text-center">
              <DollarSign className="w-16 h-16 text-green-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Buyer</h3>
              <p className="text-gray-600 mb-6">Purchase crypto in bulk with significant discounts</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-green-800">Up to 2.5% discounts</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-green-800">Direct negotiations</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-green-800">Escrow protection</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-green-800">Flexible payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Volume Discount Tiers</h3>
          <div className="discount-grid">
            {discountTiers.map((tier, index) => (
              <div key={index} className={`${tier.color} p-4 rounded-xl border-2 text-center transform hover:scale-105 transition-transform`}>
                <div className="font-semibold text-sm mb-1">{tier.label}</div>
                <div className="text-2xl font-bold">{tier.discount} off</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h4 className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2">
              <Bitcoin className="w-6 h-6 text-orange-500" />
              Expanded Cryptocurrency Support
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Major Coins', 'Stablecoins', 'DeFi Tokens', 'Altcoins'].map((category, index) => (
                <div key={index} className="bg-white p-3 rounded-lg text-center shadow-sm border">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Supporting {cryptoOptions.length}+ cryptocurrencies across all major categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Add other screens with Tailwind classes...
  // (I'll provide the complete Tailwind version in the next response)

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'welcome' && <WelcomeScreen />}
      {/* Other screens will be added */}
    </div>
  );
};

export default TailwindCryptoIntake;
