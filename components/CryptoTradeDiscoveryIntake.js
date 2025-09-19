import React, { useState } from 'react';

const CryptoTradeDiscoveryIntake = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({});

  // Volume-based discount tiers
  const discountTiers = [
    { min: 10000, max: 49999, discount: 0.5, label: '$10K - $50K' },
    { min: 50000, max: 99999, discount: 1.0, label: '$50K - $100K' },
    { min: 100000, max: 499999, discount: 1.5, label: '$100K - $500K' },
    { min: 500000, max: 999999, discount: 2.0, label: '$500K - $1M' },
    { min: 1000000, max: Infinity, discount: 2.5, label: '$1M+' }
  ];

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', minAmount: 0.1 },
    { symbol: 'ETH', name: 'Ethereum', minAmount: 1 },
    { symbol: 'USDT', name: 'Tether', minAmount: 1000 },
    { symbol: 'BNB', name: 'Binance Coin', minAmount: 10 },
    { symbol: 'ADA', name: 'Cardano', minAmount: 1000 },
    { symbol: 'SOL', name: 'Solana', minAmount: 50 },
    { symbol: 'DOT', name: 'Polkadot', minAmount: 100 },
    { symbol: 'MATIC', name: 'Polygon', minAmount: 1000 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          {discountTiers.map((tier, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333' }}>{tier.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#28a745' }}>{tier.discount}% off</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SellerOnboarding = () => (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '30px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📈</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#333' }}>Seller Onboarding</h2>
        <p style={{ color: '#666' }}>Let's set up your seller profile and verify your assets</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#333' }}>
            <span style={{ marginRight: '8px' }}>👥</span>
            Entity Information
          </h3>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Entity Type</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('entityType', e.target.value)}
              >
                <option value="">Select Entity Type</option>
                <option value="individual">Individual</option>
                <option value="llc">LLC</option>
                <option value="corporation">Corporation</option>
                <option value="trust">Trust</option>
                <option value="fund">Investment Fund</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Company/Full Name</label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                placeholder="Enter full legal name"
                onChange={(e) => handleInputChange('entityName', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Jurisdiction</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
              >
                <option value="">Select Jurisdiction</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="EU">European Union</option>
                <option value="SG">Singapore</option>
                <option value="CH">Switzerland</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Trading Experience</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('experience', e.target.value)}
              >
                <option value="">Select Experience Level</option>
                <option value="beginner">Less than 1 year</option>
                <option value="intermediate">1-3 years</option>
                <option value="advanced">3-5 years</option>
                <option value="expert">5+ years</option>
                <option value="institutional">Institutional Trader</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#333' }}>
            <span style={{ marginRight: '8px' }}>₿</span>
            Asset Portfolio
          </h3>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Primary Cryptocurrencies to Sell</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '200px', overflowY: 'auto', border: '2px solid #e1e5e9', borderRadius: '8px', padding: '12px' }}>
                {cryptoOptions.map((crypto) => (
                  <label key={crypto.symbol} style={{ display: 'flex', alignItems: 'center', padding: '8px', border: '1px solid #e1e5e9', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                    <input 
                      type="checkbox" 
                      style={{ marginRight: '8px' }}
                      onChange={(e) => {
                        const current = formData.cryptos || [];
                        if (e.target.checked) {
                          handleInputChange('cryptos', [...current, crypto.symbol]);
                        } else {
                          handleInputChange('cryptos', current.filter(c => c !== crypto.symbol));
                        }
                      }}
                    />
                    <span style={{ fontWeight: '500' }}>{crypto.symbol}</span>
                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>({crypto.name})</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Total Portfolio Value (USD)</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('portfolioValue', e.target.value)}
              >
                <option value="">Select Portfolio Range</option>
                <option value="10k-50k">$10K - $50K</option>
                <option value="50k-100k">$50K - $100K</option>
                <option value="100k-500k">$100K - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-5m">$1M - $5M</option>
                <option value="5m+">$5M+</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Preferred Sale Timeline</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              >
                <option value="">Select Timeline</option>
                <option value="immediate">Immediate (24-48 hours)</option>
                <option value="week">Within 1 week</option>
                <option value="month">Within 1 month</option>
                <option value="flexible">Flexible timing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#333' }}>
          <span style={{ marginRight: '8px' }}>🛡️</span>
          Verification Requirements
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '12px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📄</div>
            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>KYC Documentation</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Government ID, proof of address, entity documents</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '12px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>₿</div>
            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Asset Verification</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Wallet signatures, custody statements, audit reports</p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f3e5f5', borderRadius: '12px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛡️</div>
            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Compliance Check</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>AML screening, sanctions list, source of funds</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button 
          className="btn"
          style={{ padding: '12px 24px', border: '2px solid #ddd', backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => setCurrentStep('welcome')}
        >
          ← Back to Home
        </button>
        <button 
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => setCurrentStep('verification')}
        >
          Continue to Verification →
        </button>
      </div>
    </div>
  );

  const BuyerOnboarding = () => (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '30px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💰</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#333' }}>Buyer Onboarding</h2>
        <p style={{ color: '#666' }}>Set up your buyer profile and funding sources</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#333' }}>
            <span style={{ marginRight: '8px' }}>👥</span>
            Buyer Profile
          </h3>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Buyer Type</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('buyerType', e.target.value)}
              >
                <option value="">Select Buyer Type</option>
                <option value="individual">High Net Worth Individual</option>
                <option value="family-office">Family Office</option>
                <option value="fund">Hedge Fund</option>
                <option value="institutional">Institutional Investor</option>
                <option value="corporate">Corporate Treasury</option>
                <option value="exchange">Exchange/Market Maker</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Investment Mandate</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('mandate', e.target.value)}
              >
                <option value="">Select Investment Focus</option>
                <option value="diversification">Portfolio Diversification</option>
                <option value="speculation">Speculative Investment</option>
                <option value="arbitrage">Arbitrage Opportunities</option>
                <option value="long-term">Long-term Holdings</option>
                <option value="treasury">Treasury Management</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Available Capital (USD)</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('availableCapital', e.target.value)}
              >
                <option value="">Select Capital Range</option>
                <option value="10k-50k">$10K - $50K</option>
                <option value="50k-100k">$50K - $100K</option>
                <option value="100k-500k">$100K - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-5m">$1M - $5M</option>
                <option value="5m-10m">$5M - $10M</option>
                <option value="10m+">$10M+</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#333' }}>
            <span style={{ marginRight: '8px' }}>₿</span>
            Purchase Requirements
          </h3>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Target Cryptocurrencies</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '200px', overflowY: 'auto', border: '2px solid #e1e5e9', borderRadius: '8px', padding: '12px' }}>
                {cryptoOptions.map((crypto) => (
                  <label key={crypto.symbol} style={{ display: 'flex', alignItems: 'center', padding: '8px', border: '1px solid #e1e5e9', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                    <input 
                      type="checkbox" 
                      style={{ marginRight: '8px' }}
                      onChange={(e) => {
                        const current = formData.targetCryptos || [];
                        if (e.target.checked) {
                          handleInputChange('targetCryptos', [...current, crypto.symbol]);
                        } else {
                          handleInputChange('targetCryptos', current.filter(c => c !== crypto.symbol));
                        }
                      }}
                    />
                    <span style={{ fontWeight: '500' }}>{crypto.symbol}</span>
                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>({crypto.name})</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Purchase Timeline</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('purchaseTimeline', e.target.value)}
              >
                <option value="">Select Timeline</option>
                <option value="immediate">Immediate execution</option>
                <option value="week">Within 1 week</option>
                <option value="month">Within 1 month</option>
                <option value="quarterly">Quarterly allocation</option>
                <option value="flexible">Flexible timing</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>Expected Discount Target</label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                onChange={(e) => handleInputChange('discountTarget', e.target.value)}
              >
                <option value="">Select Target Discount</option>
                <option value="0.5">0.5% below market</option>
                <option value="1.0">1.0% below market</option>
                <option value="1.5">1.5% below market</option>
                <option value="2.0">2.0% below market</option>
                <option value="2.5">2.5% below market</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#333' }}>
          <span style={{ marginRight: '8px' }}>💳</span>
          Funding Sources
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { name: 'Wire Transfer', desc: 'Traditional bank wire' },
            { name: 'Stablecoin', desc: 'USDT, USDC payment' },
            { name: 'Corporate Credit', desc: 'Business line of credit' },
            { name: 'Asset-Backed', desc: 'Collateralized funding' }
          ].map((method, index) => (
            <label key={index} style={{ display: 'flex', alignItems: 'center', padding: '16px', border: '2px solid #e1e5e9', borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <input 
                type="checkbox" 
                style={{ marginRight: '12px' }}
                onChange={(e) => {
                  const current = formData.fundingSources || [];
                  if (e.target.checked) {
                    handleInputChange('fundingSources', [...current, method.name]);
                  } else {
                    handleInputChange('fundingSources', current.filter(f => f !== method.name));
                  }
                }}
              />
              <div>
                <div style={{ fontWeight: '500', fontSize: '14px' }}>{method.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{method.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button 
          className="btn"
          style={{ padding: '12px 24px', border: '2px solid #ddd', backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => setCurrentStep('welcome')}
        >
          ← Back to Home
        </button>
        <button 
          className="btn btn-success"
          onClick={() => setCurrentStep('verification')}
        >
          Continue to Verification →
        </button>
      </div>
    </div>
  );

  const VerificationScreen = () => (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '30px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛡️</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#333' }}>Verification Process</h2>
        <p style={{ color: '#666' }}>Complete verification to access the platform</p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Document Upload</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ border: '2px dashed #ddd', borderRadius: '12px', padding: '30px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📄</div>
            <p style={{ fontWeight: '500', marginBottom: '4px' }}>Identity Documents</p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>Government ID, Passport</p>
            <button style={{ color: '#007bff', background: 'none', border: 'none', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}>Upload Files</button>
          </div>
          <div style={{ border: '2px dashed #ddd', borderRadius: '12px', padding: '30px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🏠</div>
            <p style={{ fontWeight: '500', marginBottom: '4px' }}>Proof of Address</p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>Utility Bill, Bank Statement</p>
            <button style={{ color: '#007bff', background: 'none', border: 'none', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}>Upload Files</button>
          </div>
          {userType === 'seller' && (
            <div style={{ border: '2px dashed #ddd', borderRadius: '12px', padding: '30px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>₿</div>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Asset Verification</p>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>Wallet Signatures, Custody Reports</p>
              <button style={{ color: '#007bff', background: 'none', border: 'none', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}>Upload Files</button>
            </div>
          )}
          {userType === 'buyer' && (
            <div style={{ border: '2px dashed #ddd', borderRadius: '12px', padding: '30px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💰</div>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Proof of Funds</p>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>Bank Statements, Credit Lines</p>
              <button style={{ color: '#007bff', background: 'none', border: 'none', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}>Upload Files</button>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Compliance Checklist</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {[
            'Identity verification completed',
            'Address verification completed',
            'Source of funds documented',
            'Sanctions screening passed',
            'AML compliance check completed',
            'Terms and conditions accepted'
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <span style={{ fontSize: '1.2rem', marginRight: '12px' }}>⚠️</span>
              <span style={{ fontSize: '0.9rem', flex: 1 }}>{item}</span>
              <span style={{ fontSize: '1.2rem', opacity: 0.3 }}>✅</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button 
          className="btn"
          style={{ padding: '12px 24px', border: '2px solid #ddd', backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => setCurrentStep(userType + '-onboarding')}
        >
          ← Back to Profile
        </button>
        <button 
          className="btn"
          style={{ padding: '12px 24px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => setCurrentStep('success')}
        >
          Submit Application
        </button>
      </div>
    </div>
  );

  const SuccessScreen = () => (
    <div className="container" style={{ maxWidth: '600px', paddingTop: '50px', textAlign: 'center' }}>
      <div style={{ fontSize: '5rem', marginBottom: '24px' }}>✅</div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#333' }}>Application Submitted!</h2>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '32px' }}>
        Thank you for joining Crypto Trade Discovery Intake. Your application is being reviewed by our compliance team.
      </p>

      <div className="card" style={{ marginBottom: '32px', textAlign: 'left' }}>
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>What Happens Next?</h3>
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', marginRight: '16px', marginTop: '4px' }}>1</div>
            <div>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Compliance Review (24-48 hours)</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Our team verifies your documents and conducts background checks</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', marginRight: '16px', marginTop: '4px' }}>2</div>
            <div>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Account Activation</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Receive platform access credentials and account manager assignment</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', marginRight: '16px', marginTop: '4px' }}>3</div>
            <div>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Deal Matching</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Start receiving {userType === 'seller' ? 'buyer' : 'seller'} opportunities based on your profile</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#666' }}>
          Application ID: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>CTD{Date.now().toString().slice(-6)}</span>
        </p>
      </div>

      <button 
        className="btn btn-primary"
        onClick={() => { setCurrentStep('welcome'); setUserType(''); setFormData({}); }}
      >
        Start New Application
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {currentStep === 'welcome' && <WelcomeScreen />}
      {currentStep === 'seller-onboarding' && <SellerOnboarding />}
      {currentStep === 'buyer-onboarding' && <BuyerOnboarding />}
      {currentStep === 'verification' && <VerificationScreen />}
      {currentStep === 'success' && <SuccessScreen />}
    </div>
  );
};

export default CryptoTradeDiscoveryIntake;
