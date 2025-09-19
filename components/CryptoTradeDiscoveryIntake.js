import React, { useState } from 'react';

const CryptoTradeDiscoveryIntake = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expanded cryptocurrency options
  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', minAmount: 0.1, category: 'major' },
    { symbol: 'ETH', name: 'Ethereum', minAmount: 1, category: 'major' },
    { symbol: 'USDT', name: 'Tether', minAmount: 1000, category: 'stablecoin' },
    { symbol: 'USDC', name: 'USD Coin', minAmount: 1000, category: 'stablecoin' },
    { symbol: 'BNB', name: 'Binance Coin', minAmount: 10, category: 'exchange' },
    { symbol: 'XRP', name: 'Ripple', minAmount: 1000, category: 'major' },
    { symbol: 'ADA', name: 'Cardano', minAmount: 1000, category: 'altcoin' },
    { symbol: 'SOL', name: 'Solana', minAmount: 50, category: 'altcoin' },
    { symbol: 'DOT', name: 'Polkadot', minAmount: 100, category: 'altcoin' },
    { symbol: 'MATIC', name: 'Polygon', minAmount: 1000, category: 'altcoin' },
    { symbol: 'AVAX', name: 'Avalanche', minAmount: 100, category: 'altcoin' },
    { symbol: 'LINK', name: 'Chainlink', minAmount: 100, category: 'altcoin' },
    { symbol: 'LTC', name: 'Litecoin', minAmount: 10, category: 'major' },
    { symbol: 'UNI', name: 'Uniswap', minAmount: 100, category: 'defi' },
    { symbol: 'AAVE', name: 'Aave', minAmount: 50, category: 'defi' },
    { symbol: 'COMP', name: 'Compound', minAmount: 10, category: 'defi' },
    { symbol: 'SUSHI', name: 'SushiSwap', minAmount: 500, category: 'defi' },
    { symbol: 'MKR', name: 'Maker', minAmount: 5, category: 'defi' },
    { symbol: 'ALGO', name: 'Algorand', minAmount: 1000, category: 'altcoin' },
    { symbol: 'ATOM', name: 'Cosmos', minAmount: 100, category: 'altcoin' }
  ];

  // Volume-based discount tiers
  const discountTiers = [
    { min: 10000, max: 49999, discount: 0.5, label: '$10K - $50K' },
    { min: 50000, max: 99999, discount: 1.0, label: '$50K - $100K' },
    { min: 100000, max: 499999, discount: 1.5, label: '$100K - $500K' },
    { min: 500000, max: 999999, discount: 2.0, label: '$500K - $1M' },
    { min: 1000000, max: Infinity, discount: 2.5, label: '$1M+' }
  ];

  // Form validation rules
  const validationRules = {
    seller: {
      entityType: { required: true, message: 'Entity type is required' },
      entityName: { required: true, minLength: 2, message: 'Entity name must be at least 2 characters' },
      jurisdiction: { required: true, message: 'Jurisdiction is required' },
      experience: { required: true, message: 'Trading experience is required' },
      cryptos: { required: true, minLength: 1, message: 'Select at least one cryptocurrency' },
      portfolioValue: { required: true, message: 'Portfolio value range is required' },
      timeline: { required: true, message: 'Sale timeline is required' }
    },
    buyer: {
      buyerType: { required: true, message: 'Buyer type is required' },
      entityName: { required: true, minLength: 2, message: 'Entity name must be at least 2 characters' },
      mandate: { required: true, message: 'Investment mandate is required' },
      targetCryptos: { required: true, minLength: 1, message: 'Select at least one cryptocurrency' },
      availableCapital: { required: true, message: 'Available capital range is required' },
      purchaseTimeline: { required: true, message: 'Purchase timeline is required' },
      fundingSources: { required: true, minLength: 1, message: 'Select at least one funding source' }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = (type) => {
    const rules = validationRules[type];
    const errors = {};

    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = formData[field];

      if (rule.required) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          errors[field] = rule.message;
        } else if (rule.minLength && value.length < rule.minLength) {
          errors[field] = rule.message;
        }
      }
    });

    return errors;
  };

  const handleContinueToVerification = () => {
    const errors = validateForm(userType);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setCurrentStep('verification');
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Mock email send and database save
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate application ID
      const applicationId = `CTD${Date.now().toString().slice(-6)}`;
      
      // Store in localStorage for demo (in production, this would be database)
      const applicationData = {
        id: applicationId,
        userType,
        formData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      
      // Save to localStorage (demo database)
      const applications = JSON.parse(localStorage.getItem('cryptoApplications') || '[]');
      applications.push(applicationData);
      localStorage.setItem('cryptoApplications', JSON.stringify(applications));
      
      setFormData(prev => ({ ...prev, applicationId }));
      setCurrentStep('success');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Error message component
  const ErrorMessage = ({ error }) => (
    error ? <div className="error-message" style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>{error}</div> : null
  );

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

      <div className="card" style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Volume Discount Tiers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {discountTiers.map((tier, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333' }}>{tier.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#28a745' }}>{tier.discount}% off</div>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#e8f4fd', borderRadius: '8px', border: '1px solid #bee5eb' }}>
          <h4 style={{ marginBottom: '12px', color: '#0c5460' }}>🌟 New: Expanded Cryptocurrency Support</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {['Major', 'DeFi', 'Stablecoins', 'Altcoins'].map(category => (
              <span key={category} style={{ 
                padding: '4px 12px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                borderRadius: '16px', 
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                {category}
              </span>
            ))}
          </div>
          <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#0c5460' }}>
            Now supporting {cryptoOptions.length} cryptocurrencies across all major categories
          </p>
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
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Entity Type *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.entityType ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.entityType || ''}
                onChange={(e) => handleInputChange('entityType', e.target.value)}
              >
                <option value="">Select Entity Type</option>
                <option value="individual">Individual</option>
                <option value="llc">LLC</option>
                <option value="corporation">Corporation</option>
                <option value="trust">Trust</option>
                <option value="fund">Investment Fund</option>
              </select>
              <ErrorMessage error={formErrors.entityType} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Company/Full Name *
              </label>
              <input 
                type="text" 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.entityName ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                placeholder="Enter full legal name"
                value={formData.entityName || ''}
                onChange={(e) => handleInputChange('entityName', e.target.value)}
              />
              <ErrorMessage error={formErrors.entityName} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Jurisdiction *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.jurisdiction ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.jurisdiction || ''}
                onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
              >
                <option value="">Select Jurisdiction</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="EU">European Union</option>
                <option value="SG">Singapore</option>
                <option value="CH">Switzerland</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="JP">Japan</option>
                <option value="other">Other</option>
              </select>
              <ErrorMessage error={formErrors.jurisdiction} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Trading Experience *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.experience ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.experience || ''}
                onChange={(e) => handleInputChange('experience', e.target.value)}
              >
                <option value="">Select Experience Level</option>
                <option value="beginner">Less than 1 year</option>
                <option value="intermediate">1-3 years</option>
                <option value="advanced">3-5 years</option>
                <option value="expert">5+ years</option>
                <option value="institutional">Institutional Trader</option>
              </select>
              <ErrorMessage error={formErrors.experience} />
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
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Primary Cryptocurrencies to Sell *
              </label>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '8px', 
                maxHeight: '200px', 
                overflowY: 'auto', 
                border: `2px solid ${formErrors.cryptos ? '#dc3545' : '#e1e5e9'}`, 
                borderRadius: '8px', 
                padding: '12px' 
              }}>
                {['major', 'stablecoin', 'defi', 'altcoin', 'exchange'].map(category => (
                  <div key={category}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#666', marginBottom: '4px', textTransform: 'uppercase' }}>
                      {category}
                    </div>
                    {cryptoOptions.filter(crypto => crypto.category === category).map((crypto) => (
                      <label key={crypto.symbol} style={{ display: 'flex', alignItems: 'center', padding: '6px', border: '1px solid #e1e5e9', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', marginBottom: '2px' }}>
                        <input 
                          type="checkbox" 
                          style={{ marginRight: '6px' }}
                          checked={(formData.cryptos || []).includes(crypto.symbol)}
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
                        <span style={{ fontSize: '11px', color: '#666', marginLeft: '4px' }}>({crypto.name})</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
              <ErrorMessage error={formErrors.cryptos} />
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                Selected: {(formData.cryptos || []).length} cryptocurrencies
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Total Portfolio Value (USD) *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.portfolioValue ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.portfolioValue || ''}
                onChange={(e) => handleInputChange('portfolioValue', e.target.value)}
              >
                <option value="">Select Portfolio Range</option>
                <option value="10k-50k">$10K - $50K (0.5% premium)</option>
                <option value="50k-100k">$50K - $100K (1.0% premium)</option>
                <option value="100k-500k">$100K - $500K (1.5% premium)</option>
                <option value="500k-1m">$500K - $1M (2.0% premium)</option>
                <option value="1m-5m">$1M - $5M (2.5% premium)</option>
                <option value="5m+">$5M+ (Custom rates)</option>
              </select>
              <ErrorMessage error={formErrors.portfolioValue} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Preferred Sale Timeline *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.timeline ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.timeline || ''}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              >
                <option value="">Select Timeline</option>
                <option value="immediate">Immediate (24-48 hours)</option>
                <option value="week">Within 1 week</option>
                <option value="month">Within 1 month</option>
                <option value="quarterly">Quarterly</option>
                <option value="flexible">Flexible timing</option>
              </select>
              <ErrorMessage error={formErrors.timeline} />
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
          onClick={handleContinueToVerification}
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
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Buyer Type *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.buyerType ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.buyerType || ''}
                onChange={(e) => handleInputChange('buyerType', e.target.value)}
              >
                <option value="">Select Buyer Type</option>
                <option value="individual">High Net Worth Individual</option>
                <option value="family-office">Family Office</option>
                <option value="fund">Hedge Fund</option>
                <option value="institutional">Institutional Investor</option>
                <option value="corporate">Corporate Treasury</option>
                <option value="exchange">Exchange/Market Maker</option>
                <option value="pension">Pension Fund</option>
                <option value="insurance">Insurance Company</option>
              </select>
              <ErrorMessage error={formErrors.buyerType} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Entity Name *
              </label>
              <input 
                type="text" 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.entityName ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                placeholder="Enter entity or full name"
                value={formData.entityName || ''}
                onChange={(e) => handleInputChange('entityName', e.target.value)}
              />
              <ErrorMessage error={formErrors.entityName} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Investment Mandate *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.mandate ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.mandate || ''}
                onChange={(e) => handleInputChange('mandate', e.target.value)}
              >
                <option value="">Select Investment Focus</option>
                <option value="diversification">Portfolio Diversification</option>
                <option value="speculation">Speculative Investment</option>
                <option value="arbitrage">Arbitrage Opportunities</option>
                <option value="long-term">Long-term Holdings</option>
                <option value="treasury">Treasury Management</option>
                <option value="yield">Yield Generation</option>
                <option value="hedging">Risk Hedging</option>
              </select>
              <ErrorMessage error={formErrors.mandate} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Available Capital (USD) *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.availableCapital ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.availableCapital || ''}
                onChange={(e) => handleInputChange('availableCapital', e.target.value)}
              >
                <option value="">Select Capital Range</option>
                <option value="10k-50k">$10K - $50K (0.5% discount)</option>
                <option value="50k-100k">$50K - $100K (1.0% discount)</option>
                <option value="100k-500k">$100K - $500K (1.5% discount)</option>
                <option value="500k-1m">$500K - $1M (2.0% discount)</option>
                <option value="1m-5m">$1M - $5M (2.5% discount)</option>
                <option value="5m-10m">$5M - $10M (Custom rates)</option>
                <option value="10m+">$10M+ (Premium rates)</option>
              </select>
              <ErrorMessage error={formErrors.availableCapital} />
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
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Target Cryptocurrencies *
              </label>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '8px', 
                maxHeight: '200px', 
                overflowY: 'auto', 
                border: `2px solid ${formErrors.targetCryptos ? '#dc3545' : '#e1e5e9'}`, 
                borderRadius: '8px', 
                padding: '12px' 
              }}>
                {['major', 'stablecoin', 'defi', 'altcoin', 'exchange'].map(category => (
                  <div key={category}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#666', marginBottom: '4px', textTransform: 'uppercase' }}>
                      {category}
                    </div>
                    {cryptoOptions.filter(crypto => crypto.category === category).map((crypto) => (
                      <label key={crypto.symbol} style={{ display: 'flex', alignItems: 'center', padding: '6px', border: '1px solid #e1e5e9', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', marginBottom: '2px' }}>
                        <input 
                          type="checkbox" 
                          style={{ marginRight: '6px' }}
                          checked={(formData.targetCryptos || []).includes(crypto.symbol)}
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
                        <span style={{ fontSize: '11px', color: '#666', marginLeft: '4px' }}>({crypto.name})</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
              <ErrorMessage error={formErrors.targetCryptos} />
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                Selected: {(formData.targetCryptos || []).length} cryptocurrencies
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Purchase Timeline *
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: `2px solid ${formErrors.purchaseTimeline ? '#dc3545' : '#e1e5e9'}`, 
                  borderRadius: '8px', 
                  fontSize: '14px' 
                }}
                value={formData.purchaseTimeline || ''}
                onChange={(e) => handleInputChange('purchaseTimeline', e.target.value)}
              >
                <option value="">Select Timeline</option>
                <option value="immediate">Immediate execution</option>
                <option value="week">Within 1 week</option>
                <option value="month">Within 1 month</option>
                <option value="quarterly">Quarterly allocation</option>
                <option value="annual">Annual allocation</option>
                <option value="flexible">Flexible timing</option>
              </select>
              <ErrorMessage error={formErrors.purchaseTimeline} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                Expected Discount Target
              </label>
              <select 
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '14px' }}
                value={formData.discountTarget || ''}
                onChange={(e) => handleInputChange('discountTarget', e.target.value)}
              >
                <option value="">Select Target Discount</option>
                <option value="0.5">0.5% below market</option>
                <option value="1.0">1.0% below market</option>
                <option value="1.5">1.5% below market</option>
                <option value="2.0">2.0% below market</option>
                <option value="2.5">2.5% below market</option>
                <option value="custom">Custom negotiation</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#333' }}>
          <span style={{ marginRight: '8px' }}>💳</span>
          Funding Sources *
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { name: 'Wire Transfer', desc: 'Traditional bank wire', icon: '🏦' },
            { name: 'Stablecoin', desc: 'USDT, USDC payment', icon: '💰' },
            { name: 'Corporate Credit', desc: 'Business line of credit', icon: '💳' },
            { name: 'Asset-Backed', desc: 'Collateralized funding', icon: '🏠' },
            { name: 'Cryptocurrency', desc: 'Direct crypto payment', icon: '₿' },
            { name: 'Letter of Credit', desc: 'Bank letter of credit', icon: '📄' }
          ].map((method, index) => (
            <label 
              key={index} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '16px', 
                border: `2px solid ${formErrors.fundingSources ? '#dc3545' : '#e1e5e9'}`, 
                borderRadius: '8px', 
                cursor: 'pointer', 
                transition: 'border-color 0.2s',
                backgroundColor: (formData.fundingSources || []).includes(method.name) ? '#f8f9fa' : 'white'
              }}
            >
              <input 
                type="checkbox" 
                style={{ marginRight: '12px' }}
                checked={(formData.fundingSources || []).includes(method.name)}
                onChange={(e) => {
                  const current = formData.fundingSources || [];
                  if (e.target.checked) {
                    handleInputChange('fundingSources', [...current, method.name]);
                  } else {
                    handleInputChange('fundingSources', current.filter(f => f !== method.name));
                  }
                }}
              />
              <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>{method.icon}</span>
              <div>
                <div style={{ fontWeight: '500', fontSize: '14px' }}>{method.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{method.desc}</div>
              </div>
            </label>
          ))}
        </div>
        <ErrorMessage error={formErrors.fundingSources} />
        <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '8px' }}>
          Selected: {(formData.fundingSources || []).length} funding sources
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
          onClick={handleContinueToVerification}
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

      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#e8f4fd', border: '1px solid #bee5eb' }}>
        <h3 style={{ marginBottom: '16px', color: '#0c5460' }}>📧 Email & Database Integration</h3>
        <p style={{ fontSize: '0.9rem', color: '#0c5460', marginBottom: '12px' }}>
          Upon submission, your application will be:
        </p>
        <ul style={{ fontSize: '0.9rem', color: '#0c5460', paddingLeft: '20px' }}>
          <li>Automatically saved to our secure database</li>
          <li>Email confirmation sent to your registered address</li>
          <li>Compliance team notified for review</li>
          <li>Real-time status updates via email</li>
        </ul>
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
          style={{ 
            padding: '12px 24px', 
            backgroundColor: isSubmitting ? '#6c757d' : '#6f42c1', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onClick={submitApplication}
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Submitting...' : 'Submit Application'}
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
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Email Confirmation Sent</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Check your email for application confirmation and tracking details</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', marginRight: '16px', marginTop: '4px' }}>2</div>
            <div>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Compliance Review (24-48 hours)</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Our team verifies your documents and conducts background checks</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', marginRight: '16px', marginTop: '4px' }}>3</div>
            <div>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Account Activation</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Receive platform access credentials and account manager assignment</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#e3f2fd', color: '#1976d2', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', marginRight: '16px', marginTop: '4px' }}>4</div>
            <div>
              <p style={{ fontWeight: '500', marginBottom: '4px' }}>Deal Matching</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Start receiving {userType === 'seller' ? 'buyer' : 'seller'} opportunities based on your profile</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '32px', backgroundColor: '#e8f5e8', border: '1px solid #c3e6cb' }}>
        <h3 style={{ marginBottom: '16px', color: '#155724' }}>📊 Application Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: '#155724', fontWeight: 'bold' }}>USER TYPE</p>
            <p style={{ fontSize: '0.9rem', color: '#155724', textTransform: 'capitalize' }}>{userType}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: '#155724', fontWeight: 'bold' }}>ENTITY</p>
            <p style={{ fontSize: '0.9rem', color: '#155724' }}>{formData.entityName || 'Not specified'}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: '#155724', fontWeight: 'bold' }}>CRYPTOCURRENCIES</p>
            <p style={{ fontSize: '0.9rem', color: '#155724' }}>
              {((userType === 'seller' ? formData.cryptos : formData.targetCryptos) || []).length} selected
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: '#155724', fontWeight: 'bold' }}>CAPITAL RANGE</p>
            <p style={{ fontSize: '0.9rem', color: '#155724' }}>
              {userType === 'seller' ? formData.portfolioValue : formData.availableCapital || 'Not specified'}
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#666', marginBottom: '8px' }}>
          Application ID: <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#333' }}>{formData.applicationId}</span>
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Save this ID for future reference and support inquiries
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button 
          className="btn"
          style={{ padding: '12px 24px', border: '2px solid #ddd', backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => {
            const applications = JSON.parse(localStorage.getItem('cryptoApplications') || '[]');
            console.log('All Applications:', applications);
            alert(`Found ${applications.length} application(s) in database`);
          }}
        >
          📊 View Database
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => { setCurrentStep('welcome'); setUserType(''); setFormData({}); setFormErrors({}); }}
        >
          Start New Application
        </button>
      </div>
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
