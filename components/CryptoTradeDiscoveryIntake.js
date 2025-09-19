import React, { useState } from 'react';

const CryptoTradeDiscoveryIntake = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userType, setUserType] = useState('');

  const WelcomeScreen = () => (
    <div className="container" style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: '#333' }}>
        🚀 Crypto Trade Discovery Intake
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
        Professional bulk cryptocurrency trading platform with volume discounts up to 2.5%
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <div 
          className="card"
          style={{ cursor: 'pointer', border: '2px solid #007bff', transition: 'transform 0.2s' }}
          onClick={() => { setUserType('seller'); setCurrentStep('seller-onboarding'); }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📈</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#333' }}>I'm a Seller</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>Sell your crypto assets in bulk with competitive rates</p>
          <ul style={{ textAlign: 'left', color: '#666', fontSize: '0.9rem' }}>
            <li>• Volume-based premium rates</li>
            <li>• Guaranteed settlement</li>
            <li>• Institutional-grade security</li>
            <li>• Same-day processing</li>
          </ul>
        </div>

        <div 
          className="card"
          style={{ cursor: 'pointer', border: '2px solid #28a745', transition: 'transform 0.2s' }}
          onClick={() => { setUserType('buyer'); setCurrentStep('buyer-onboarding'); }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💰</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#333' }}>I'm a Buyer</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>Purchase crypto in bulk with significant discounts</p>
          <ul style={{ textAlign: 'left', color: '#666', fontSize: '0.9rem' }}>
            <li>• Up to 2.5% volume discounts</li>
            <li>• Direct seller negotiations</li>
            <li>• Escrow protection</li>
            <li>• Flexible payment options</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Volume Discount Tiers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
          {[
            { label: '$10K - $50K', discount: '0.5%' },
            { label: '$50K - $100K', discount: '1.0%' },
            { label: '$100K - $500K', discount: '1.5%' },
            { label: '$500K - $1M', discount: '2.0%' },
            { label: '$1M+', discount: '2.5%' }
          ].map((tier, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333' }}>{tier.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#28a745' }}>{tier.discount} off</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TestScreen = () => (
    <div className="container" style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h2>🚧 {userType.charAt(0).toUpperCase() + userType.slice(1)} Onboarding</h2>
      <p>This section is being built...</p>
      <button 
        className="btn btn-primary"
        style={{ marginTop: '20px' }}
        onClick={() => setCurrentStep('welcome')}
      >
        ← Back to Home
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh' }}>
      {currentStep === 'welcome' && <WelcomeScreen />}
      {(currentStep === 'seller-onboarding' || currentStep === 'buyer-onboarding') && <TestScreen />}
    </div>
  );
};

export default CryptoTradeDiscoveryIntake;
