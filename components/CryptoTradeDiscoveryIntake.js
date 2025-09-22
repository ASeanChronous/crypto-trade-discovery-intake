'use client'
import React, { useState } from 'react';

const CryptoTradeDiscoveryIntake = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userType, setUserType] = useState('');

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
              ₿
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Crypto Trade Discovery Intake
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional bulk cryptocurrency trading platform with volume discounts up to 2.5%
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200 hover:border-blue-400 cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
            onClick={() => { setUserType('seller'); setCurrentStep('seller-onboarding'); }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl text-white">📈</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Seller</h3>
              <p className="text-gray-600 mb-6">Sell your crypto assets in bulk with competitive rates</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-800">Premium Rates</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-800">Same-Day Processing</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-800">Guaranteed Settlement</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-800">Secure Trading</span>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 hover:border-green-400 cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
            onClick={() => { setUserType('buyer'); setCurrentStep('buyer-onboarding'); }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl text-white">💰</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Buyer</h3>
              <p className="text-gray-600 mb-6">Purchase crypto in bulk with significant discounts</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-800">Volume Discounts</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-800">Direct Access</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-800">Escrow Protection</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-800">Flexible Terms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Volume Discount Tiers</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: '$10K - $50K', discount: '0.5%', color: 'bg-green-50 border-green-200 text-green-800' },
              { label: '$50K - $100K', discount: '1.0%', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { label: '$100K - $500K', discount: '1.5%', color: 'bg-purple-50 border-purple-200 text-purple-800' },
              { label: '$500K - $1M', discount: '2.0%', color: 'bg-orange-50 border-orange-200 text-orange-800' },
              { label: '$1M+', discount: '2.5%', color: 'bg-red-50 border-red-200 text-red-800' }
            ].map((tier, index) => (
              <div key={index} className={`${tier.color} p-4 rounded-xl border-2 text-center`}>
                <div className="font-bold text-sm mb-1">{tier.label}</div>
                <div className="text-2xl font-bold">{tier.discount}</div>
                <div className="text-xs">discount</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SimpleForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {userType === 'seller' ? 'Seller' : 'Buyer'} Onboarding
          </h2>
          <p className="text-gray-600">This is a simplified form - full version coming next</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setCurrentStep('welcome')}
            >
              ← Back
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentStep === 'welcome' && <WelcomeScreen />}
      {(currentStep === 'seller-onboarding' || currentStep === 'buyer-onboarding') && <SimpleForm />}
    </div>
  );
};

export default CryptoTradeDiscoveryIntake;
