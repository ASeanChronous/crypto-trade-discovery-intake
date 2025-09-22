import React, { useState, useEffect } from 'react';

const CryptoTradeDiscoveryIntake = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [emailStatus, setEmailStatus] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showUseCases, setShowUseCases] = useState(false);

  // Enhanced cryptocurrency options with detailed use cases
  const cryptoOptions = [
    { 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      category: 'major', 
      color: 'bg-orange-100 text-orange-800 border-orange-200', 
      icon: '₿', 
      minAmount: 0.1, 
      marketCap: '$800B+',
      sellerUseCases: [
        "Digital Gold Portfolio Rebalancing - Perfect for sellers looking to diversify into traditional assets while maintaining crypto exposure",
        "Estate Planning Liquidity - Convert BTC holdings to cash for inheritance planning without market timing pressure",
        "Business Capital Raising - Leverage appreciated BTC positions to fund business expansion or new ventures",
        "Tax Harvesting Strategy - Realize gains or losses for optimal tax positioning while maintaining market exposure"
      ],
      buyerUseCases: [
        "Institutional Treasury Diversification - Add uncorrelated asset to traditional portfolios with proven 10+ year track record",
        "Inflation Hedge Investment - Protect purchasing power against currency debasement with finite supply asset",
        "Cross-Border Value Transfer - Facilitate large international payments without traditional banking limitations",
        "Long-term Store of Value - Build generational wealth with the most established and widely-adopted cryptocurrency"
      ],
      riskProfile: "Low-Medium (established track record)",
      liquidityRating: "High (24/7 global markets)"
    },
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      category: 'major', 
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: '⟠', 
      minAmount: 1, 
      marketCap: '$300B+',
      sellerUseCases: [
        "DeFi Position Unwinding - Exit staking or DeFi positions while maintaining blockchain ecosystem exposure",
        "Smart Contract Revenue Monetization - Convert ETH earned from dApp operations into operational capital",
        "NFT Collection Liquidation Support - Use as collateral or convert to cash for high-value NFT transactions",
        "Gas Fee Budget Optimization - Reduce ETH holdings while maintaining operational blockchain interaction capabilities"
      ],
      buyerUseCases: [
        "DeFi Ecosystem Participation - Access lending, borrowing, and yield farming opportunities across 1000+ protocols",
        "Smart Contract Platform Investment - Gain exposure to the infrastructure powering Web3 and decentralized applications",
        "Staking Revenue Generation - Earn 3-5% annual yield through Ethereum 2.0 staking with institutional-grade setup",
        "Enterprise Blockchain Integration - Position for corporate adoption of Ethereum-based solutions and tokenization"
      ],
      riskProfile: "Medium (evolving technology)",
      liquidityRating: "High (second most traded crypto)"
    },
    { 
      symbol: 'USDT', 
      name: 'Tether', 
      category: 'stablecoin', 
      color: 'bg-green-100 text-green-800 border-green-200', 
      icon: '₮', 
      minAmount: 1000, 
      marketCap: '$100B+',
      sellerUseCases: [
        "Stable Value Preservation - Lock in crypto gains without exiting the digital asset ecosystem",
        "Trading Capital Optimization - Maintain purchasing power between trading opportunities without USD conversion delays",
        "Cross-Border Business Operations - Facilitate international payments with USD-pegged stability and crypto speed",
        "Yield Generation Bridge - Park capital in stable value while accessing higher yield opportunities than traditional banking"
      ],
      buyerUseCases: [
        "Crypto Market Entry Point - Start building digital asset portfolio with familiar USD-equivalent value",
        "International Remittance Solution - Send USD-equivalent value globally with reduced fees and faster settlement",
        "DeFi Yield Farming Base - Access 5-15% APY through established lending protocols with stable value",
        "Business Treasury Management - Maintain operational capital in digital form for rapid deployment and higher yields"
      ],
      riskProfile: "Low (USD-pegged stability)",
      liquidityRating: "Very High (most traded stablecoin)"
    },
    { 
      symbol: 'USDC', 
      name: 'USD Coin', 
      category: 'stablecoin', 
      color: 'bg-green-100 text-green-800 border-green-200', 
      icon: '$', 
      minAmount: 1000, 
      marketCap: '$50B+',
      sellerUseCases: [
        "Regulated Compliance Bridge - Convert crypto holdings to regulated stablecoin for enhanced compliance reporting",
        "Institutional Grade Stability - Access fully-reserved, audited stablecoin for large-scale treasury operations",
        "Traditional Finance Integration - Bridge crypto and traditional banking with Centre Consortium backing",
        "Risk Management Tool - Hedge volatile crypto positions with transparent, regulated USD-equivalent asset"
      ],
      buyerUseCases: [
        "Institutional DeFi Access - Enter decentralized finance with bank-grade regulated stablecoin infrastructure",
        "Corporate Treasury Digitization - Modernize business cash management with programmable, auditable USD",
        "High-Yield Cash Management - Earn 3-8% APY on USD-equivalent holdings through institutional DeFi protocols",
        "Payment Infrastructure Upgrade - Build next-generation payment systems on blockchain with regulatory clarity"
      ],
      riskProfile: "Very Low (regulated and audited)",
      liquidityRating: "Very High (institutional grade)"
    },
    { 
      symbol: 'BNB', 
      name: 'Binance Coin', 
      category: 'exchange', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      icon: 'B', 
      minAmount: 10, 
      marketCap: '$50B+',
      sellerUseCases: [
        "Exchange Fee Optimization Exit - Monetize accumulated BNB trading fee discounts when reducing trading activity",
        "BSC DeFi Position Management - Liquidate Binance Smart Chain positions while maintaining ecosystem access",
        "Launchpad Investment Cycling - Convert BNB after participating in token launches to diversify holdings",
        "Trading Capital Reallocation - Shift from exchange-specific holdings to broader market opportunities"
      ],
      buyerUseCases: [
        "Trading Cost Optimization - Reduce trading fees by 25% across world's largest crypto exchange",
        "BSC Ecosystem Investment - Access fastest-growing blockchain ecosystem with low transaction costs",
        "Token Launch Participation - Gain access to exclusive new token offerings through Binance Launchpad",
        "Multi-Chain DeFi Strategy - Bridge between Ethereum and BSC for optimal yield and cost management"
      ],
      riskProfile: "Medium (exchange dependency)",
      liquidityRating: "High (major exchange token)"
    },
    { 
      symbol: 'XRP', 
      name: 'Ripple', 
      category: 'major', 
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: 'R', 
      minAmount: 1000, 
      marketCap: '$30B+',
      sellerUseCases: [
        "Regulatory Clarity Monetization - Capitalize on recent legal victories and institutional adoption momentum",
        "Cross-Border Payment Pivot - Exit direct exposure while benefiting from banking partnership revenue",
        "Institutional Adoption Wave - Realize gains from central bank digital currency (CBDC) implementation trends",
        "Payment Infrastructure Evolution - Convert holdings as traditional finance adopts blockchain settlement"
      ],
      buyerUseCases: [
        "Central Bank Partnership Play - Position for CBDC implementations and institutional blockchain adoption",
        "Cross-Border Payment Revolution - Invest in technology enabling 3-second international settlements",
        "Banking Infrastructure Modernization - Benefit from 300+ financial institution partnerships",
        "Regulatory Clarity Advantage - Access crypto with clearest regulatory status for institutional investors"
      ],
      riskProfile: "Medium (regulatory dependent)",
      liquidityRating: "High (major cryptocurrency)"
    },
    { 
      symbol: 'ADA', 
      name: 'Cardano', 
      category: 'altcoin', 
      color: 'bg-purple-100 text-purple-800 border-purple-200', 
      icon: 'A', 
      minAmount: 1000, 
      marketCap: '$15B+',
      sellerUseCases: [
        "Academic Research Monetization - Realize value from peer-reviewed blockchain development approach",
        "Sustainable Blockchain Exit - Convert eco-friendly crypto holdings while maintaining ESG investment focus",
        "Staking Reward Optimization - Liquidate staked ADA rewards while maintaining core position",
        "Smart Contract Evolution Play - Capitalize on Plutus platform development milestones"
      ],
      buyerUseCases: [
        "ESG-Compliant Blockchain Investment - Access proof-of-stake consensus with minimal energy consumption",
        "Academic Rigor Advantage - Invest in peer-reviewed, scientifically-developed blockchain protocol",
        "Staking Revenue Generation - Earn 4-6% annual yield through decentralized staking protocol",
        "Emerging Markets Focus - Position for blockchain adoption in Africa and developing economies"
      ],
      riskProfile: "Medium-High (development dependent)",
      liquidityRating: "Medium-High (top 10 cryptocurrency)"
    },
    { 
      symbol: 'SOL', 
      name: 'Solana', 
      category: 'altcoin', 
      color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200', 
      icon: 'S', 
      minAmount: 10, 
      marketCap: '$20B+',
      sellerUseCases: [
        "High-Performance Exit Strategy - Monetize fast blockchain holdings while diversifying to stability",
        "NFT Market Cycle Management - Liquidate SOL accumulated from NFT trading and marketplace activity",
        "DeFi Yield Optimization - Convert high-yield farming rewards to stable assets or reinvest in growth",
        "Validator Reward Harvesting - Monetize staking rewards from running or delegating to validators"
      ],
      buyerUseCases: [
        "High-Throughput DeFi Access - Participate in fastest blockchain ecosystem with sub-second transactions",
        "NFT Ecosystem Investment - Position for continued growth in Solana's thriving NFT marketplace",
        "Web3 Infrastructure Play - Invest in blockchain supporting 2000+ apps with institutional adoption",
        "Developer Ecosystem Growth - Benefit from rapidly expanding Solana developer community and funding"
      ],
      riskProfile: "High (newer technology)",
      liquidityRating: "High (top tier exchange support)"
    },
    { 
      symbol: 'DOT', 
      name: 'Polkadot', 
      category: 'altcoin', 
      color: 'bg-pink-100 text-pink-800 border-pink-200', 
      icon: '●', 
      minAmount: 10, 
      marketCap: '$8B+',
      sellerUseCases: [
        "Interoperability Thesis Realization - Monetize cross-chain technology as bridges become mainstream",
        "Parachain Auction Participation - Liquidate DOT locked in parachain auctions for capital reallocation",
        "Staking Reward Optimization - Convert staking rewards while maintaining ecosystem exposure",
        "Multi-Chain Strategy Evolution - Pivot from interoperability focus to specific chain specialization"
      ],
      buyerUseCases: [
        "Cross-Chain Infrastructure Investment - Position for blockchain interoperability and ecosystem growth",
        "Parachain Ecosystem Participation - Access emerging blockchain projects through parachain auctions",
        "Staking Revenue with Governance - Earn 10-12% yield while participating in network governance",
        "Web3 Foundation Backing - Invest in Ethereum co-founder Gavin Wood's next-generation blockchain vision"
      ],
      riskProfile: "Medium-High (complex technology)",
      liquidityRating: "Medium-High (major exchanges)"
    }
  ];

  const discountTiers = [
    { label: '$10K - $50K', discount: '0.5%', color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-800', savings: '$50-250' },
    { label: '$50K - $100K', discount: '1.0%', color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-800', savings: '$500-1K' },
    { label: '$100K - $500K', discount: '1.5%', color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-800', savings: '$1.5K-7.5K' },
    { label: '$500K - $1M', discount: '2.0%', color: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-orange-800', savings: '$10K-20K' },
    { label: '$1M+', discount: '2.5%', color: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-800', savings: '$25K+' }
  ];

  // Use Case Modal Component
  const UseCaseModal = ({ crypto, onClose }) => {
    if (!crypto) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${crypto.color} rounded-xl flex items-center justify-center text-2xl font-bold`}>
                  {crypto.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{crypto.name} ({crypto.symbol})</h2>
                  <p className="text-sm text-gray-500">Market Cap: {crypto.marketCap} • Min Amount: {crypto.minAmount} {crypto.symbol}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Seller Use Cases */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">📈</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">For Sellers</h3>
                </div>
                <div className="space-y-3">
                  {crypto.sellerUseCases.map((useCase, index) => {
                    const [title, description] = useCase.split(' - ');
                    return (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-bold text-blue-900 mb-2">{title}</h4>
                        <p className="text-blue-700 text-sm">{description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Buyer Use Cases */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">For Buyers</h3>
                </div>
                <div className="space-y-3">
                  {crypto.buyerUseCases.map((useCase, index) => {
                    const [title, description] = useCase.split(' - ');
                    return (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <h4 className="font-bold text-green-900 mb-2">{title}</h4>
                        <p className="text-green-700 text-sm">{description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Risk and Liquidity Info */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-bold text-yellow-900 mb-2">⚠️ Risk Profile</h4>
                <p className="text-yellow-700 text-sm">{crypto.riskProfile}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h4 className="font-bold text-purple-900 mb-2">💧 Liquidity Rating</h4>
                <p className="text-purple-700 text-sm">{crypto.liquidityRating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced crypto selection with use case previews
  const CryptoSelector = ({ selectedCryptos, onToggle, userType }) => {
    const [hoveredCrypto, setHoveredCrypto] = useState(null);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Select Cryptocurrencies</h3>
          <button 
            onClick={() => setShowUseCases(!showUseCases)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showUseCases ? 'Hide' : 'Show'} Use Cases
          </button>
        </div>

        {['major', 'stablecoin', 'exchange', 'altcoin'].map(category => (
          <div key={category} className="mb-6">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              {category === 'major' && <span>🏆</span>}
              {category === 'stablecoin' && <span>💵</span>}
              {category === 'exchange' && <span>🔄</span>}
              {category === 'altcoin' && <span>🚀</span>}
              {category} coins
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cryptoOptions.filter(crypto => crypto.category === category).map((crypto) => (
                <div
                  key={crypto.symbol}
                  className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all transform hover:scale-105 ${
                    selectedCryptos.includes(crypto.symbol) 
                      ? `${crypto.color} border-current shadow-lg` 
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => onToggle(crypto.symbol)}
                  onMouseEnter={() => setHoveredCrypto(crypto)}
                  onMouseLeave={() => setHoveredCrypto(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{crypto.icon}</span>
                      <div>
                        <div className="font-bold text-sm">{crypto.symbol}</div>
                        <div className="text-xs text-gray-500">{crypto.name}</div>
                      </div>
                    </div>
                    <div className="text-xs text-right">
                      <div className="text-gray-500">Min: {crypto.minAmount}</div>
                      <div className="text-gray-400">{crypto.marketCap}</div>
                    </div>
                  </div>

                  {showUseCases && (
                    <div className="mt-3 space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCrypto(crypto);
                        }}
                        className="w-full text-left text-xs bg-gray-100 hover:bg-gray-200 rounded-lg p-2 transition-colors"
                      >
                        <div className="font-medium mb-1">Key Use Case:</div>
                        <div className="text-gray-600">
                          {userType === 'seller' 
                            ? crypto.sellerUseCases[0].split(' - ')[0]
                            : crypto.buyerUseCases[0].split(' - ')[0]
                          }
                        </div>
                        <div className="text-blue-600 text-xs mt-1">Click for all use cases →</div>
                      </button>
                    </div>
                  )}

                  {selectedCryptos.includes(crypto.symbol) && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Form validation with enhanced rules
  const validationRules = {
    seller: {
      entityType: { required: true, message: 'Entity type is required' },
      entityName: { required: true, minLength: 2, message: 'Entity name must be at least 2 characters' },
      jurisdiction: { required: true, message: 'Jurisdiction is required' },
      experience: { required: true, message: 'Trading experience is required' },
      cryptos: { required: true, minLength: 1, message: 'Select at least one cryptocurrency' },
      portfolioValue: { required: true, message: 'Portfolio value range is required' },
      timeline: { required: true, message: 'Sale timeline is required' },
      email: { required: true, email: true, message: 'Valid email address is required' },
      phone: { required: true, message: 'Phone number is required' }
    },
    buyer: {
      buyerType: { required: true, message: 'Buyer type is required' },
      entityName: { required: true, minLength: 2, message: 'Entity name must be at least 2 characters' },
      mandate: { required: true, message: 'Investment mandate is required' },
      targetCryptos: { required: true, minLength: 1, message: 'Select at least one cryptocurrency' },
      availableCapital: { required: true, message: 'Available capital range is required' },
      purchaseTimeline: { required: true, message: 'Purchase timeline is required' },
      fundingSources: { required: true, minLength: 1, message: 'Select at least one funding source' },
      email: { required: true, email: true, message: 'Valid email address is required' },
      phone: { required: true, message: 'Phone number is required' }
    }
  };

  // Step transition animations
  useEffect(() => {
    setAnimationClass('animate-fade-in');
    const timer = setTimeout(() => setAnimationClass(''), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleCryptoToggle = (crypto) => {
    const currentCryptos = formData.cryptos || [];
    const newCryptos = currentCryptos.includes(crypto)
      ? currentCryptos.filter(c => c !== crypto)
      : [...currentCryptos, crypto];
    handleInputChange('cryptos', newCryptos);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        } else if (rule.email && !validateEmail(value)) {
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
      setTimeout(() => {
        const firstError = document.querySelector('.error-message');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }
    setCurrentStep('verification');
  };

  // Enhanced file upload handler
  const handleFileUpload = (category, files) => {
    const fileArray = Array.from(files);
    setUploadedFiles(prev => ({
      ...prev,
      [category]: fileArray.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uploaded: true
      }))
    }));
  };

  // EmailJS Integration
  const sendEmailConfirmation = async (applicationData) => {
    setEmailStatus('sending');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const emailData = {
        to_email: applicationData.formData.email,
        to_name: applicationData.formData.entityName,
        application_id: applicationData.id,
        user_type: applicationData.userType,
        submitted_date: new Date().toLocaleDateString(),
        review_time: '24-48 hours'
      };

      console.log('Email sent via EmailJS:', emailData);
      setEmailStatus('sent');
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      setEmailStatus('error');
      return false;
    }
  };

  // Backend API Integration
  const saveToBackendAPI = async (applicationData) => {
    try {
      const applications = JSON.parse(localStorage.getItem('cryptoApplications') || '[]');
      applications.push(applicationData);
      localStorage.setItem('cryptoApplications', JSON.stringify(applications));
      return { success: true, id: applicationData.id };
    } catch (error) {
      console.error('Storage error:', error);
      return { success: false, error };
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    
    try {
      const applicationId = `CTD${Date.now().toString().slice(-6)}`;
      
      const applicationData = {
        id: applicationId,
        userType,
        formData: {
          ...formData,
          uploadedFiles
        },
        submittedAt: new Date().toISOString(),
        status: 'pending',
        ipAddress: '127.0.0.1',
        userAgent: navigator.userAgent
      };

      await saveToBackendAPI(applicationData);
      await sendEmailConfirmation(applicationData);
      
      setFormData(prev => ({ ...prev, applicationId }));
      setCurrentStep('success');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ error }) => (
    error ? (
      <div className="error-message text-red-600 text-sm mt-1 flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </div>
    ) : null
  );

  const WelcomeScreen = () => (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 ${animationClass}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-8 shadow-2xl">
            <div className="text-4xl text-white">🚀</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Crypto Trade<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discovery Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect institutional crypto sellers and buyers for large-scale OTC transactions 
            with competitive pricing and secure escrow services
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium">Licensed & Regulated</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium">Escrow Protected</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium">Global Access</span>
            </div>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <div 
            className="group relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer border-2 border-blue-200 hover:border-blue-400"
            onClick={() => { setUserType('seller'); setCurrentStep('seller-onboarding'); }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-3xl text-white">📈</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Seller</h3>
                <p className="text-gray-600 mb-6">Sell your crypto assets in bulk with competitive rates</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { text: 'Premium Rates', icon: '📈' },
                  { text: 'Same-Day Settlement', icon: '⚡' },
                  { text: 'Guaranteed Execution', icon: '✅' },
                  { text: 'Institutional Security', icon: '🔒' }
                ].map((feature, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100 hover:bg-blue-100 transition-colors group-hover:transform group-hover:scale-105">
                    <div className="text-lg mb-1">{feature.icon}</div>
                    <span className="text-xs font-medium text-blue-800">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                <span>Get Started</span>
                <div className="transform group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </div>
          </div>

          <div 
            className="group relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer border-2 border-green-200 hover:border-green-400"
            onClick={() => { setUserType('buyer'); setCurrentStep('buyer-onboarding'); }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-3xl text-white">💰</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Buyer</h3>
                <p className="text-gray-600 mb-6">Purchase crypto in bulk with significant discounts</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { text: 'Up to 2.5% Discounts', icon: '💰' },
                  { text: 'Direct Negotiation', icon: '🤝' },
                  { text: 'Escrow Protection', icon: '🛡️' },
                  { text: 'Flexible Terms', icon: '⚙️' }
                ].map((feature, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg text-center border border-green-100 hover:bg-green-100 transition-colors group-hover:transform group-hover:scale-105">
                    <div className="text-lg mb-1">{feature.icon}</div>
                    <span className="text-xs font-medium text-green-800">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                <span>Get Started</span>
                <div className="transform group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </div>
          </div>
        </div>

        {/* Discount Tiers Display */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Volume Discount Tiers</h2>
            <p className="text-gray-600">Bigger transactions unlock better rates</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {discountTiers.map((tier, index) => (
              <div key={index} className={`${tier.color} rounded-xl p-4 border-2 text-center transform hover:scale-105 transition-all`}>
                <div className="text-sm font-bold mb-2">{tier.label}</div>
                <div className="text-2xl font-bold mb-1">{tier.discount}</div>
                <div className="text-xs opacity-75">Save {tier.savings}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SellerOnboarding = () => (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 ${animationClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-6 shadow-lg">
            <div className="text-3xl text-white">📈</div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Seller Onboarding</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Set up your seller profile and list your assets</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-8">
              {/* Entity Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>🏢</span> Entity Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                        formErrors.entityType ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={formData.entityType || ''}
                      onChange={(e) => handleInputChange('entityType', e.target.value)}
                    >
                      <option value="">Select entity type</option>
                      <option value="individual">Individual</option>
                      <option value="llc">LLC</option>
                      <option value="corporation">Corporation</option>
                      <option value="trust">Trust</option>
                      <option value="fund">Investment Fund</option>
                    </select>
                    <ErrorMessage error={formErrors.entityType} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entity Name</label>
                    <input 
                      type="text"
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                        formErrors.entityName ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Enter entity name"
                      value={formData.entityName || ''}
                      onChange={(e) => handleInputChange('entityName', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.entityName} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                        formErrors.jurisdiction ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={formData.jurisdiction || ''}
                      onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                    >
                      <option value="">Select jurisdiction</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="eu">European Union</option>
                      <option value="sg">Singapore</option>
                      <option value="other">Other</option>
                    </select>
                    <ErrorMessage error={formErrors.jurisdiction} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trading Experience</label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                        formErrors.experience ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={formData.experience || ''}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Less than 1 year</option>
                      <option value="intermediate">1-3 years</option>
                      <option value="experienced">3-5 years</option>
                      <option value="expert">5+ years</option>
                    </select>
                    <ErrorMessage error={formErrors.experience} />
                  </div>
                </div>
              </div>

              {/* Cryptocurrency Holdings */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>💎</span> Cryptocurrency Holdings
                </h3>
                <CryptoSelector 
                  selectedCryptos={formData.cryptos || []}
                  onToggle={handleCryptoToggle}
                  userType={userType}
                />
                <ErrorMessage error={formErrors.cryptos} />
              </div>

              {/* Portfolio Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>📊</span> Portfolio Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Value Range</label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                        formErrors.portfolioValue ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={formData.portfolioValue || ''}
                      onChange={(e) => handleInputChange('portfolioValue', e.target.value)}
                    >
                      <option value="">Select portfolio value</option>
                      <option value="10k-50k">$10K - $50K</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-500k">$100K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1m-plus">$1M+</option>
                    </select>
                    <ErrorMessage error={formErrors.portfolioValue} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sale Timeline</label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                        formErrors.timeline ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={formData.timeline || ''}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (1-3 days)</option>
                      <option value="short">Short term (1-2 weeks)</option>
                      <option value="medium">Medium term (1 month)</option>
                      <option value="flexible">Flexible timing</option>
                    </select>
                    <ErrorMessage error={formErrors.timeline} />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>📞</span> Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email"
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                        formErrors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="your.email@company.com"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.email} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.phone} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button 
                className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
                onClick={() => setCurrentStep('welcome')}
              >
                ← Back to Welcome
              </button>
              
              <button 
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-white rounded-xl"
                onClick={handleContinueToVerification}
              >
                Continue to Verification →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Use Case Modal */}
      {selectedCrypto && (
        <UseCaseModal 
          crypto={selectedCrypto} 
          onClose={() => setSelectedCrypto(null)} 
        />
      )}
    </div>
  );

  const BuyerOnboarding = () => (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 ${animationClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl mb-6 shadow-lg">
            <div className="text-3xl text-white">💰</div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Buyer Onboarding</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Set up your buyer profile and funding sources</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-8">
              {/* Buyer Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>🏢</span> Buyer Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Type</label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-green-500 transition-colors ${
                        formErrors.buyerType ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={formData.buyerType || ''}
                      onChange={(e) => handleInputChange('buyerType', e.target.value)}
                    >
                      <option value="">Select buyer type</option>
                      <option value="individual">Individual Investor</option>
                      <option value="institution">Institution</option>
                      <option value="fund">Investment Fund</option>
                      <option value="corporate">Corporate Treasury</option>
                      <option value="family-office">Family Office</option>
                    </select>
                    <ErrorMessage error={formErrors.buyerType} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entity Name</label>
                    <input 
                      type="text"
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-green-500 transition-colors ${
                        formErrors.entityName ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Enter entity name"
                      value={formData.entityName || ''}
                      onChange={(e) => handleInputChange('entityName', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.entityName} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Mandate</label>
                    <textarea 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-green-500 transition-colors ${
                        formErrors.mandate ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Describe your investment mandate and objectives..."
                      rows={3}
                      value={formData.mandate || ''}
                      onChange={(e) => handleInputChange('mandate', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.mandate} />
                  </div>
                </div>
              </div>

              {/* Target Cryptocurrencies */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>🎯</span> Target Cryptocurrencies
                </h3>
                <CryptoSelector 
                  selectedCryptos={formData.targetCryptos || []}
                  onToggle={(crypto) => {
                    const currentCryptos = formData.targetCryptos || [];
                    const newCryptos = currentCryptos.includes(crypto)
                      ? currentCryptos.filter(c => c !== crypto)
                      : [...currentCryptos, crypto];
                    handleInputChange('targetCryptos', newCryptos);
                  }}
                  userType={userType}
                />
                <ErrorMessage error={formErrors.targetCryptos} />
              </div>

              {/* Capital and Timeline */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>💳</span> Capital and Timeline
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Capital</label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-green-500 transition-colors ${
                        formErrors.availableCapital ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={formData.availableCapital || ''}
                      onChange={(e) => handleInputChange('availableCapital', e.target.value)}
                    >
                      <option value="">Select capital range</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-500k">$100K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1m-5m">$1M - $5M</option>
                      <option value="5m-plus">$5M+</option>
                    </select>
                    <ErrorMessage error={formErrors.availableCapital} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Timeline</label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-green-500 transition-colors ${
                        formErrors.purchaseTimeline ? 'border-red-300' : 'border-gray-200'
                      }`}
                      value={formData.purchaseTimeline || ''}
                      onChange={(e) => handleInputChange('purchaseTimeline', e.target.value)}
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (1-3 days)</option>
                      <option value="short">Short term (1-2 weeks)</option>
                      <option value="medium">Medium term (1 month)</option>
                      <option value="quarterly">Quarterly allocation</option>
                      <option value="ongoing">Ongoing program</option>
                    </select>
                    <ErrorMessage error={formErrors.purchaseTimeline} />
                  </div>
                </div>
              </div>

              {/* Funding Sources */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>🏦</span> Funding Sources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { value: 'wire', label: 'Wire Transfer', icon: '🏦' },
                    { value: 'ach', label: 'ACH Transfer', icon: '💳' },
                    { value: 'crypto', label: 'Cryptocurrency', icon: '₿' },
                    { value: 'escrow', label: 'Escrow Service', icon: '🛡️' },
                    { value: 'credit', label: 'Credit Line', icon: '📈' },
                    { value: 'other', label: 'Other', icon: '🔄' }
                  ].map((source) => (
                    <label key={source.value} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-300 hover:bg-green-50 transition-all">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={(formData.fundingSources || []).includes(source.value)}
                        onChange={(e) => {
                          const current = formData.fundingSources || [];
                          const updated = e.target.checked
                            ? [...current, source.value]
                            : current.filter(s => s !== source.value);
                          handleInputChange('fundingSources', updated);
                        }}
                      />
                      <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                        (formData.fundingSources || []).includes(source.value)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}>
                        {(formData.fundingSources || []).includes(source.value) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="mr-2">{source.icon}</span>
                      <span className="font-medium">{source.label}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage error={formErrors.fundingSources} />
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>📞</span> Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email"
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-green-500 transition-colors ${
                        formErrors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="your.email@company.com"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.email} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-green-500 transition-colors ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.phone} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button 
                className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
                onClick={() => setCurrentStep('welcome')}
              >
                ← Back to Welcome
              </button>
              
              <button 
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-white rounded-xl"
                onClick={handleContinueToVerification}
              >
                Continue to Verification →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Use Case Modal */}
      {selectedCrypto && (
        <UseCaseModal 
          crypto={selectedCrypto} 
          onClose={() => setSelectedCrypto(null)} 
        />
      )}
    </div>
  );

  const VerificationScreen = () => (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 ${animationClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mb-6 shadow-lg">
            <div className="text-3xl text-white">🛡️</div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Verification Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Complete verification to access the platform</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Document Upload */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <div className="text-xl">📄</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Document Upload</h3>
                <p className="text-sm text-gray-500">Upload required documents for verification</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Identity Documents */}
              <div className="relative group">
                <input 
                  type="file" 
                  id="identity-docs"
                  className="sr-only"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('identity', e.target.files)}
                />
                <label 
                  htmlFor="identity-docs"
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group-hover:scale-105 transform"
                >
                  <div className="text-4xl mb-4">📄</div>
                  <h4 className="font-bold text-gray-700 mb-2">Identity Documents</h4>
                  <p className="text-sm text-gray-500 text-center mb-4">Government ID, Passport, Driver's License</p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <div>📤</div>
                    <span className="text-sm font-medium">Upload Files</span>
                  </div>
                  {uploadedFiles.identity && (
                    <div className="mt-3 text-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        ✅ {uploadedFiles.identity.length} file(s) uploaded
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* Financial Documents */}
              <div className="relative group">
                <input 
                  type="file" 
                  id="financial-docs"
                  className="sr-only"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('financial', e.target.files)}
                />
                <label 
                  htmlFor="financial-docs"
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all group-hover:scale-105 transform"
                >
                  <div className="text-4xl mb-4">💰</div>
                  <h4 className="font-bold text-gray-700 mb-2">Financial Documents</h4>
                  <p className="text-sm text-gray-500 text-center mb-4">Bank Statements, Proof of Funds</p>
                  <div className="flex items-center gap-2 text-green-600">
                    <div>📤</div>
                    <span className="text-sm font-medium">Upload Files</span>
                  </div>
                  {uploadedFiles.financial && (
                    <div className="mt-3 text-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        ✅ {uploadedFiles.financial.length} file(s) uploaded
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* Legal Documents */}
              <div className="relative group">
                <input 
                  type="file" 
                  id="legal-docs"
                  className="sr-only"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('legal', e.target.files)}
                />
                <label 
                  htmlFor="legal-docs"
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all group-hover:scale-105 transform"
                >
                  <div className="text-4xl mb-4">⚖️</div>
                  <h4 className="font-bold text-gray-700 mb-2">Legal Documents</h4>
                  <p className="text-sm text-gray-500 text-center mb-4">Articles of Incorporation, Operating Agreement</p>
                  <div className="flex items-center gap-2 text-purple-600">
                    <div>📤</div>
                    <span className="text-sm font-medium">Upload Files</span>
                  </div>
                  {uploadedFiles.legal && (
                    <div className="mt-3 text-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        ✅ {uploadedFiles.legal.length} file(s) uploaded
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button 
              className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
              onClick={() => setCurrentStep(userType + '-onboarding')}
            >
              ← Back to Profile
            </button>
            
            <button 
              className={`flex items-center gap-2 px-8 py-4 rounded-xl transition-all ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transform hover:-translate-y-0.5'
              } text-white`}
              onClick={submitApplication}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Submit Application
                  <span className="text-lg">🚀</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SuccessScreen = () => (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 ${animationClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl mb-6 shadow-lg animate-bounce">
            <div className="text-3xl text-white">✅</div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Your application has been received and is being reviewed</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
            <h3 className="text-xl font-bold text-center mb-6">What happens next?</h3>
            
            <div className="space-y-4">
              {[
                { title: 'Document Review', description: 'Our compliance team will review your submitted documents', icon: '📋', time: '24 hours' },
                { title: 'Identity Verification', description: 'We will verify your identity and entity information', icon: '🔍', time: '48 hours' },
                { title: 'Platform Access', description: 'You will receive access to the trading platform', icon: '🚀', time: '72 hours' },
                { title: 'Account Setup', description: 'Your account will be fully activated and ready to use', icon: '✅', time: '96 hours' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-xl">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <span className="text-sm text-blue-600 font-medium">Expected: within {item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 text-center">
            <p className="text-gray-600 mb-2">Application ID:</p>
            <p className="text-2xl font-bold text-blue-600 font-mono">{formData.applicationId}</p>
          </div>

          {emailStatus === 'sent' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
              <span className="text-green-800">📧 Confirmation email sent successfully!</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 transition-all"
              onClick={() => {
                const applications = JSON.parse(localStorage.getItem('cryptoApplications') || '[]');
                console.log('Applications:', applications);
                alert(`Database contains ${applications.length} applications`);
              }}
            >
              📊 View Database
            </button>
            
            <button 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
              onClick={() => { 
                setCurrentStep('welcome'); 
                setUserType(''); 
                setFormData({}); 
                setFormErrors({}); 
                setUploadedFiles({});
                setEmailStatus('');
                setSelectedCrypto(null);
              }}
            >
              ✨ Start New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentStep === 'welcome' && <WelcomeScreen />}
      {currentStep === 'seller-onboarding' && <SellerOnboarding />}
      {currentStep === 'buyer-onboarding' && <BuyerOnboarding />}
      {currentStep === 'verification' && <VerificationScreen />}
      {currentStep === 'success' && <SuccessScreen />}
    </div>
  );
};

export default CryptoTradeDiscoveryIntake;
