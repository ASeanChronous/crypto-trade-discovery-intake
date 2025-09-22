'use client'
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, AlertTriangle, Upload, Users, TrendingUp, Shield, 
  Bitcoin, DollarSign, ArrowRight, FileText, Mail, Database,
  Sparkles, Zap, Globe, Lock, Award, Clock, CheckCheck
} from 'lucide-react';

const CompleteCryptoPlatform = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [emailStatus, setEmailStatus] = useState('');
  const [animationClass, setAnimationClass] = useState('');

  // Enhanced cryptocurrency options with more data
  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', category: 'major', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '₿', minAmount: 0.1, marketCap: '$800B+' },
    { symbol: 'ETH', name: 'Ethereum', category: 'major', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '⟠', minAmount: 1, marketCap: '$300B+' },
    { symbol: 'USDT', name: 'Tether', category: 'stablecoin', color: 'bg-green-100 text-green-800 border-green-200', icon: '₮', minAmount: 1000, marketCap: '$100B+' },
    { symbol: 'USDC', name: 'USD Coin', category: 'stablecoin', color: 'bg-green-100 text-green-800 border-green-200', icon: '$', minAmount: 1000, marketCap: '$50B+' },
    { symbol: 'BNB', name: 'Binance Coin', category: 'exchange', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: 'B', minAmount: 10, marketCap: '$50B+' },
    { symbol: 'XRP', name: 'Ripple', category: 'major', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: 'X', minAmount: 1000, marketCap: '$30B+' },
    { symbol: 'ADA', name: 'Cardano', category: 'altcoin', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '₳', minAmount: 1000, marketCap: '$20B+' },
    { symbol: 'SOL', name: 'Solana', category: 'altcoin', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '◎', minAmount: 50, marketCap: '$15B+' },
    { symbol: 'DOT', name: 'Polkadot', category: 'altcoin', color: 'bg-pink-100 text-pink-800 border-pink-200', icon: '●', minAmount: 100, marketCap: '$10B+' },
    { symbol: 'MATIC', name: 'Polygon', category: 'altcoin', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: '⬟', minAmount: 1000, marketCap: '$8B+' },
    { symbol: 'UNI', name: 'Uniswap', category: 'defi', color: 'bg-red-100 text-red-800 border-red-200', icon: '🦄', minAmount: 100, marketCap: '$5B+' },
    { symbol: 'LINK', name: 'Chainlink', category: 'defi', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '🔗', minAmount: 100, marketCap: '$8B+' },
    { symbol: 'AAVE', name: 'Aave', category: 'defi', color: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: '👻', minAmount: 50, marketCap: '$2B+' },
    { symbol: 'AVAX', name: 'Avalanche', category: 'altcoin', color: 'bg-red-100 text-red-800 border-red-200', icon: '🔺', minAmount: 100, marketCap: '$12B+' },
    { symbol: 'LTC', name: 'Litecoin', category: 'major', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: 'Ł', minAmount: 10, marketCap: '$7B+' },
    { symbol: 'ALGO', name: 'Algorand', category: 'altcoin', color: 'bg-green-100 text-green-800 border-green-200', icon: 'A', minAmount: 1000, marketCap: '$3B+' }
  ];

  const discountTiers = [
    { label: '$10K - $50K', discount: '0.5%', color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-800', savings: '$50-250' },
    { label: '$50K - $100K', discount: '1.0%', color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-800', savings: '$500-1K' },
    { label: '$100K - $500K', discount: '1.5%', color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-800', savings: '$1.5K-7.5K' },
    { label: '$500K - $1M', discount: '2.0%', color: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-orange-800', savings: '$10K-20K' },
    { label: '$1M+', discount: '2.5%', color: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-800', savings: '$25K+' }
  ];

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
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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

  // EmailJS Integration (simulate - in production you'd use real EmailJS)
  const sendEmailConfirmation = async (applicationData) => {
    setEmailStatus('sending');
    
    try {
      // Simulate EmailJS API call
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

  // Backend API Integration (simulate - in production you'd use real API)
  const saveToBackendAPI = async (applicationData) => {
    try {
      // Simulate API call to backend
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      return await response.json();
    } catch (error) {
      console.log('Backend API simulation:', applicationData);
      // Fallback to localStorage for demo
      const applications = JSON.parse(localStorage.getItem('cryptoApplications') || '[]');
      applications.push(applicationData);
      localStorage.setItem('cryptoApplications', JSON.stringify(applications));
      return { success: true, id: applicationData.id };
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
        ipAddress: '127.0.0.1', // In production, get real IP
        userAgent: navigator.userAgent
      };

      // Save to backend API
      await saveToBackendAPI(applicationData);
      
      // Send email confirmation
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

  // Error message component with animations
  const ErrorMessage = ({ error }) => (
    error ? (
      <div className="error-message flex items-center gap-2 text-red-500 text-sm mt-2 animate-slide-up">
        <AlertTriangle className="w-4 h-4" />
        {error}
      </div>
    ) : null
  );

  const WelcomeScreen = () => (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${animationClass}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <Bitcoin className="w-20 h-20 text-orange-500 animate-bounce-subtle" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Crypto Trade Discovery Intake
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            Professional bulk cryptocurrency trading platform with volume discounts up to 2.5%
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
              <Award className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Licensed & Regulated</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
              <Globe className="w-5 h-5 text-purple-500" />
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
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10 text-blue-600" />
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
                  <div key={index} className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100 hover:bg-blue-100 transition-colors">
                    <div className="text-lg mb-1">{feature.icon}</div>
                    <span className="text-xs font-medium text-blue-800">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-10 h-10 text-green-600" />
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
                  <div key={index} className="bg-green-50 p-3 rounded-lg text-center border border-green-100 hover:bg-green-100 transition-colors">
                    <div className="text-lg mb-1">{feature.icon}</div>
                    <span className="text-xs font-medium text-green-800">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Discount Tiers */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
              <h3 className="text-3xl font-bold mb-2">Volume Discount Tiers</h3>
              <p className="text-blue-100">The more you trade, the more you save</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                {discountTiers.map((tier, index) => (
                  <div key={index} className={`${tier.color} p-6 rounded-xl border-2 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg`}>
                    <div className="font-bold text-sm mb-2">{tier.label}</div>
                    <div className="text-3xl font-bold mb-2">{tier.discount}</div>
                    <div className="text-xs opacity-80">Save {tier.savings}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Bitcoin className="w-8 h-8 text-orange-500" />
                  <h4 className="text-xl font-bold text-gray-800">Expanded Cryptocurrency Support</h4>
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
                  {cryptoOptions.slice(0, 8).map((crypto, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
                      <div className="text-2xl mb-1">{crypto.icon}</div>
                      <div className="text-xs font-bold">{crypto.symbol}</div>
                      <div className="text-xs text-gray-500">{crypto.marketCap}</div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    <strong>{cryptoOptions.length} cryptocurrencies</strong> supported across Major Coins, Stablecoins, DeFi Tokens, and Altcoins
                  </p>
                  <div className="flex justify-center gap-4">
                    {['Major', 'Stablecoins', 'DeFi', 'Altcoins'].map((category, index) => (
                      <span key={index} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Compliant</h3>
              <p className="text-sm text-gray-600">Fully licensed and regulated platform with comprehensive KYC/AML procedures</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Infrastructure</h3>
              <p className="text-sm text-gray-600">Enterprise-grade security with multi-layer encryption and cold storage</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Dedicated account managers and round-the-clock technical support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SellerOnboarding = () => (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 ${animationClass}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Seller Onboarding</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Let's set up your seller profile and verify your assets</p>
          
          {/* Progress Bar */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Profile Setup</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Verification</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Entity Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Entity Information</h3>
                  <p className="text-sm text-gray-500">Basic details about your organization</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Entity Type *
                  </label>
                  <select 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${
                      formErrors.entityType ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    value={formData.entityType || ''}
                    onChange={(e) => handleInputChange('entityType', e.target.value)}
                  >
                    <option value="">Select Entity Type</option>
                    <option value="individual">Individual</option>
                    <option value="llc">LLC</option>
                    <option value="corporation">Corporation</option>
                    <option value="trust">Trust</option>
                    <option value="fund">Investment Fund</option>
                    <option value="partnership">Partnership</option>
                  </select>
                  <ErrorMessage error={formErrors.entityType} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company/Full Name *
                  </label>
                  <input 
                    type="text" 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${
                      formErrors.entityName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Enter full legal name"
                    value={formData.entityName || ''}
                    onChange={(e) => handleInputChange('entityName', e.target.value)}
                  />
                  <ErrorMessage error={formErrors.entityName} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${
                        formErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="your@email.com"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.email} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${
                        formErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Jurisdiction *
                    </label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${
                        formErrors.jurisdiction ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      value={formData.jurisdiction || ''}
                      onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                    >
                      <option value="">Select Jurisdiction</option>
                      <option value="US">🇺🇸 United States</option>
                      <option value="UK">🇬🇧 United Kingdom</option>
                      <option value="EU">🇪🇺 European Union</option>
                      <option value="SG">🇸🇬 Singapore</option>
                      <option value="CH">🇨🇭 Switzerland</option>
                      <option value="CA">🇨🇦 Canada</option>
                      <option value="AU">🇦🇺 Australia</option>
                      <option value="JP">🇯🇵 Japan</option>
                      <option value="other">🌍 Other</option>
                    </select>
                    <ErrorMessage error={formErrors.jurisdiction} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Trading Experience *
                    </label>
                    <select 
                      className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${
                        formErrors.experience ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      value={formData.experience || ''}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    >
                      <option value="">Select Experience Level</option>
                      <option value="beginner">📈 Less than 1 year</option>
                      <option value="intermediate">📊 1-3 years</option>
                      <option value="advanced">🎯 3-5 years</option>
                      <option value="expert">💎 5+ years</option>
                      <option value="institutional">🏛️ Institutional Trader</option>
                    </select>
                    <ErrorMessage error={formErrors.experience} />
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Portfolio */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Bitcoin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Asset Portfolio</h3>
                  <p className="text-sm text-gray-500">Details about your cryptocurrency holdings</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Primary Cryptocurrencies to Sell *
                  </label>
                  <div className={`border-2 rounded-xl p-4 max-h-80 overflow-y-auto ${
                    formErrors.cryptos ? 'border-red-300' : 'border-gray-200'
                  }`}>
                    {['major', 'stablecoin', 'defi', 'altcoin', 'exchange'].map(category => (
                      <div key={category} className="mb-4">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                          {category === 'major' && <span>🏆</span>}
                          {category === 'stablecoin' && <span>💵</span>}
                          {category === 'defi' && <span>🌐</span>}
                          {category === 'altcoin' && <span>🚀</span>}
                          {category === 'exchange' && <span>🔄</span>}
                          {category} coins
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {cryptoOptions.filter(crypto => crypto.category === category).map((crypto) => (
                            <label 
                              key={crypto.symbol} 
                              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                (formData.cryptos || []).includes(crypto.symbol) 
                                  ? `${crypto.color} border-current shadow-sm` 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input 
                                type="checkbox" 
                                className="sr-only"
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
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-lg">{crypto.icon}</span>
                                <div className="flex-1">
                                  <div className="font-bold text-sm">{crypto.symbol}</div>
                                  <div className="text-xs opacity-70">{crypto.name}</div>
                                </div>
                                <div className="text-xs opacity-60">{crypto.marketCap}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage error={formErrors.cryptos} />
                  <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Selected: {(formData.cryptos || []).length} cryptocurrencies
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Portfolio Value (USD) *
                  </label>
                  <select 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${
                      formErrors.portfolioValue ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    value={formData.portfolioValue || ''}
                    onChange={(e) => handleInputChange('portfolioValue', e.target.value)}
                  >
                    <option value="">Select Portfolio Range</option>
                    <option value="10k-50k">💰 $10K - $50K (0.5% premium)</option>
                    <option value="50k-100k">💎 $50K - $100K (1.0% premium)</option>
                    <option value="100k-500k">🏆 $100K - $500K (1.5% premium)</option>
                    <option value="500k-1m">👑 $500K - $1M (2.0% premium)</option>
                    <option value="1m-5m">🚀 $1M - $5M (2.5% premium)</option>
                    <option value="5m+">⭐ $5M+ (Custom rates)</option>
                  </select>
                  <ErrorMessage error={formErrors.portfolioValue} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Sale Timeline *
                  </label>
                  <select 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${
                      formErrors.timeline ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    value={formData.timeline || ''}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                  >
                    <option value="">Select Timeline</option>
                    <option value="immediate">⚡ Immediate (24-48 hours)</option>
                    <option value="week">📅 Within 1 week</option>
                    <option value="month">📆 Within 1 month</option>
                    <option value="quarterly">📊 Quarterly</option>
                    <option value="flexible">⏰ Flexible timing</option>
                  </select>
                  <ErrorMessage error={formErrors.timeline} />
                </div>
              </div>
            </div>
          </div>

          {/* Verification Requirements Preview */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Verification Requirements Preview</h3>
                <p className="text-sm text-gray-500">What you'll need for the next step</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-blue-900 mb-2">KYC Documentation</h4>
                <p className="text-sm text-blue-700">Government ID, proof of address, entity documents</p>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-200">
                <Bitcoin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h4 className="font-bold text-orange-900 mb-2">Asset Verification</h4>
                <p className="text-sm text-orange-700">Wallet signatures, custody statements, audit reports</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold text-green-900 mb-2">Compliance Check</h4>
                <p className="text-sm text-green-700">AML screening, sanctions list, source of funds</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button 
              className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
              onClick={() => setCurrentStep('welcome')}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Home
            </button>
            
            <button 
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              onClick={handleContinueToVerification}
            >
              Continue to Verification
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // I'll continue with the other screens in the next part due to length limits...

  const BuyerOnboarding = () => (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 ${animationClass}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-6 shadow-lg">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Buyer Onboarding</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Set up your buyer profile and funding sources</p>
          
          {/* Progress Bar */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Profile Setup</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Verification</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Buyer Profile */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Buyer Profile</h3>
                  <p className="text-sm text-gray-500">Investment entity details and preferences</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Buyer Type *
                  </label>
                  <select 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-200 transition-all ${
                      formErrors.buyerType ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                    value={formData.buyerType || ''}
                    onChange={(e) => handleInputChange('buyerType', e.target.value)}
                  >
                    <option value="">Select Buyer Type</option>
                    <option value="individual">💎 High Net Worth Individual</option>
                    <option value="family-office">🏛️ Family Office</option>
                    <option value="fund">📈 Hedge Fund</option>
                    <option value="institutional">🏦 Institutional Investor</option>
                    <option value="corporate">🏢 Corporate Treasury</option>
                    <option value="exchange">🔄 Exchange/Market Maker</option>
                    <option value="pension">🛡️ Pension Fund</option>
                    <option value="insurance">📊 Insurance Company</option>
                  </select>
                  <ErrorMessage error={formErrors.buyerType} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Entity Name *
                  </label>
                  <input 
                    type="text" 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-200 transition-all ${
                      formErrors.entityName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                    placeholder="Enter entity or full name"
                    value={formData.entityName || ''}
                    onChange={(e) => handleInputChange('entityName', e.target.value)}
                  />
                  <ErrorMessage error={formErrors.entityName} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-200 transition-all ${
                        formErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                      placeholder="your@email.com"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.email} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-200 transition-all ${
                        formErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <ErrorMessage error={formErrors.phone} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Investment Mandate *
                  </label>
                  <select 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-200 transition-all ${
                      formErrors.mandate ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                    value={formData.mandate || ''}
                    onChange={(e) => handleInputChange('mandate', e.target.value)}
                  >
                    <option value="">Select Investment Focus</option>
                    <option value="diversification">🎯 Portfolio Diversification</option>
                    <option value="speculation">🚀 Speculative Investment</option>
                    <option value="arbitrage">⚡ Arbitrage Opportunities</option>
                    <option value="long-term">💎 Long-term Holdings</option>
                    <option value="treasury">🏦 Treasury Management</option>
                    <option value="yield">💰 Yield Generation</option>
                    <option value="hedging">🛡️ Risk Hedging</option>
                  </select>
                  <ErrorMessage error={formErrors.mandate} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Capital (USD) *
                  </label>
                  <select 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-200 transition-all ${
                      formErrors.availableCapital ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                    value={formData.availableCapital || ''}
                    onChange={(e) => handleInputChange('availableCapital', e.target.value)}
                  >
                    <option value="">Select Capital Range</option>
                    <option value="10k-50k">💰 $10K - $50K (0.5% discount)</option>
                    <option value="50k-100k">💎 $50K - $100K (1.0% discount)</option>
                    <option value="100k-500k">🏆 $100K - $500K (1.5% discount)</option>
                    <option value="500k-1m">👑 $500K - $1M (2.0% discount)</option>
                    <option value="1m-5m">🚀 $1M - $5M (2.5% discount)</option>
                    <option value="5m-10m">⭐ $5M - $10M (Custom rates)</option>
                    <option value="10m+">🌟 $10M+ (Premium rates)</option>
                  </select>
                  <ErrorMessage error={formErrors.availableCapital} />
                </div>
              </div>
            </div>

            {/* Purchase Requirements */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Bitcoin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Purchase Requirements</h3>
                  <p className="text-sm text-gray-500">Your cryptocurrency investment preferences</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Target Cryptocurrencies *
                  </label>
                  <div className={`border-2 rounded-xl p-4 max-h-80 overflow-y-auto ${
                    formErrors.targetCryptos ? 'border-red-300' : 'border-gray-200'
                  }`}>
                    {['major', 'stablecoin', 'defi', 'altcoin', 'exchange'].map(category => (
                      <div key={category} className="mb-4">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                          {category === 'major' && <span>🏆</span>}
                          {category === 'stablecoin' && <span>💵</span>}
                          {category === 'defi' && <span>🌐</span>}
                          {category === 'altcoin' && <span>🚀</span>}
                          {category === 'exchange' && <span>🔄</span>}
                          {category} coins
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {cryptoOptions.filter(crypto => crypto.category === category).map((crypto) => (
                            <label 
                              key={crypto.symbol} 
                              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                (formData.targetCryptos || []).includes(crypto.symbol) 
                                  ? `${crypto.color} border-current shadow-sm` 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input 
                                type="checkbox" 
                                className="sr-only"
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
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-lg">{crypto.icon}</span>
                                <div className="flex-1">
                                  <div className="font-bold text-sm">{crypto.symbol}</div>
                                  <div className="text-xs opacity-70">{crypto.name}</div>
                                </div>
                                <div className="text-xs opacity-60">{crypto.marketCap}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage error={formErrors.targetCryptos} />
                  <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Selected: {(formData.targetCryptos || []).length} cryptocurrencies
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Purchase Timeline *
                  </label>
                  <select 
                    className={`w-full p-4 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-200 transition-all ${
                      formErrors.purchaseTimeline ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                    value={formData.purchaseTimeline || ''}
                    onChange={(e) => handleInputChange('purchaseTimeline', e.target.value)}
                  >
                    <option value="">Select Timeline</option>
                    <option value="immediate">⚡ Immediate execution</option>
                    <option value="week">📅 Within 1 week</option>
                    <option value="month">📆 Within 1 month</option>
                    <option value="quarterly">📊 Quarterly allocation</option>
                    <option value="annual">🗓️ Annual allocation</option>
                    <option value="flexible">⏰ Flexible timing</option>
                  </select>
                  <ErrorMessage error={formErrors.purchaseTimeline} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Discount Target
                  </label>
                  <select 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                    value={formData.discountTarget || ''}
                    onChange={(e) => handleInputChange('discountTarget', e.target.value)}
                  >
                    <option value="">Select Target Discount</option>
                    <option value="0.5">💰 0.5% below market</option>
                    <option value="1.0">💎 1.0% below market</option>
                    <option value="1.5">🏆 1.5% below market</option>
                    <option value="2.0">👑 2.0% below market</option>
                    <option value="2.5">🚀 2.5% below market</option>
                    <option value="custom">⚙️ Custom negotiation</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Funding Sources */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Funding Sources *</h3>
                <p className="text-sm text-gray-500">How will you fund your cryptocurrency purchases?</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Wire Transfer', desc: 'Traditional bank wire transfer', icon: '🏦', color: 'bg-blue-50 border-blue-200 text-blue-800' },
                { name: 'Stablecoin', desc: 'USDT, USDC, BUSD payment', icon: '💰', color: 'bg-green-50 border-green-200 text-green-800' },
                { name: 'Corporate Credit', desc: 'Business line of credit', icon: '💳', color: 'bg-purple-50 border-purple-200 text-purple-800' },
                { name: 'Asset-Backed', desc: 'Collateralized funding', icon: '🏠', color: 'bg-orange-50 border-orange-200 text-orange-800' },
                { name: 'Cryptocurrency', desc: 'Direct crypto-to-crypto', icon: '₿', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
                { name: 'Letter of Credit', desc: 'Bank letter of credit', icon: '📄', color: 'bg-indigo-50 border-indigo-200 text-indigo-800' }
              ].map((method, index) => (
                <label 
                  key={index} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    (formData.fundingSources || []).includes(method.name) 
                      ? `${method.color} border-current shadow-sm transform scale-105` 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    className="sr-only"
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
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{method.name}</div>
                      <div className="text-xs opacity-70">{method.desc}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <ErrorMessage error={formErrors.fundingSources} />
            <div className="text-xs text-gray-500 mt-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Selected: {(formData.fundingSources || []).length} funding sources
            </div>
          </div>

          {/* Expected Benefits */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-xl font-bold text-green-900 mb-6 text-center flex items-center justify-center gap-2">
              <Award className="w-6 h-6" />
              Your Expected Benefits
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-green-900 mb-2">Volume Discounts</h4>
                <p className="text-sm text-green-700">Save up to 2.5% on large purchases with our tiered discount structure</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-green-900 mb-2">Direct Access</h4>
                <p className="text-sm text-green-700">Connect directly with verified sellers and negotiate terms</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-green-900 mb-2">Secure Trading</h4>
                <p className="text-sm text-green-700">All transactions protected by institutional-grade security</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button 
              className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
              onClick={() => setCurrentStep('welcome')}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Home
            </button>
            
            <button 
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              onClick={handleContinueToVerification}
            >
              Continue to Verification
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const VerificationScreen = () => (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 ${animationClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-2xl mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Verification Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Complete verification to access the platform</p>
          
          {/* Progress Bar */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Profile Complete</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Verification</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Document Upload */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
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
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group-hover:scale-105"
                >
                  <FileText className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mb-4" />
                  <h4 className="font-bold text-gray-700 mb-2">Identity Documents</h4>
                  <p className="text-sm text-gray-500 text-center mb-4">Government ID, Passport, Driver's License</p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Upload className="w-4 h-4" />
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

              {/* Proof of Address */}
              <div className="relative group">
                <input 
                  type="file" 
                  id="address-docs"
                  className="sr-only"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('address', e.target.files)}
                />
                <label 
                  htmlFor="address-docs"
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group-hover:scale-105"
                >
                  <FileText className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mb-4" />
                  <h4 className="font-bold text-gray-700 mb-2">Proof of Address</h4>
                  <p className="text-sm text-gray-500 text-center mb-4">Utility Bill, Bank Statement, Lease Agreement</p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload Files</span>
                  </div>
                  {uploadedFiles.address && (
                    <div className="mt-3 text-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        ✅ {uploadedFiles.address.length} file(s) uploaded
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* Conditional uploads based on user type */}
              {userType === 'seller' && (
                <div className="relative group">
                  <input 
                    type="file" 
                    id="asset-docs"
                    className="sr-only"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('assets', e.target.files)}
                  />
                  <label 
                    htmlFor="asset-docs"
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all group-hover:scale-105"
                  >
                    <Bitcoin className="w-12 h-12 text-orange-400 group-hover:text-orange-500 mb-4" />
                    <h4 className="font-bold text-gray-700 mb-2">Asset Verification</h4>
                    <p className="text-sm text-gray-500 text-center mb-4">Wallet Signatures, Custody Reports, Audit Reports</p>
                    <div className="flex items-center gap-2 text-orange-600">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">Upload Files</span>
                    </div>
                    {uploadedFiles.assets && (
                      <div className="mt-3 text-center">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          ✅ {uploadedFiles.assets.length} file(s) uploaded
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              )}

              {userType === 'buyer' && (
                <div className="relative group">
                  <input 
                    type="file" 
                    id="funds-docs"
                    className="sr-only"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('funds', e.target.files)}
                  />
                  <label 
                    htmlFor="funds-docs"
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all group-hover:scale-105"
                  >
                    <DollarSign className="w-12 h-12 text-green-400 group-hover:text-green-500 mb-4" />
                    <h4 className="font-bold text-gray-700 mb-2">Proof of Funds</h4>
                    <p className="text-sm text-gray-500 text-center mb-4">Bank Statements, Credit Lines, Investment Accounts</p>
                    <div className="flex items-center gap-2 text-green-600">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">Upload Files</span>
                    </div>
                    {uploadedFiles.funds && (
                      <div className="mt-3 text-center">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          ✅ {uploadedFiles.funds.length} file(s) uploaded
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Compliance Checklist</h3>
                <p className="text-sm text-gray-500">Automated compliance verification process</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              {[
                { text: 'Identity verification completed', icon: '🆔', status: 'pending' },
                { text: 'Address verification completed', icon: '🏠', status: 'pending' },
                { text: 'Source of funds documented', icon: '💰', status: 'pending' },
                { text: 'Sanctions screening passed', icon: '🛡️', status: 'pending' },
                { text: 'AML compliance check completed', icon: '🔍', status: 'pending' },
                { text: 'Terms and conditions accepted', icon: '📋', status: 'pending' }
              ].map((item, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-2xl mr-4">{item.icon}</span>
                  <span className="flex-1 text-sm font-medium text-gray-700">{item.text}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Pending
                    </span>
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Status */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">System Integration Status</h3>
                <p className="text-sm text-blue-700">Real-time integration with external services</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <h4 className="font-bold text-blue-900">EmailJS Service</h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">Automated email notifications and confirmations</p>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  emailStatus === 'sent' ? 'bg-green-100 text-green-800' :
                  emailStatus === 'sending' ? 'bg-yellow-100 text-yellow-800' :
                  emailStatus === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {emailStatus === 'sent' ? '✅ Connected' :
                   emailStatus === 'sending' ? '⏳ Connecting...' :
                   emailStatus === 'error' ? '❌ Error' :
                   '⚪ Standby'}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="w-6 h-6 text-purple-600" />
                  <h4 className="font-bold text-blue-900">Backend API</h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">Secure data storage and processing</p>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ✅ Connected
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-6 h-6 text-green-600" />
                  <h4 className="font-bold text-blue-900">Security Layer</h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">Encryption and compliance monitoring</p>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ✅ Active
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button 
              className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
              onClick={() => setCurrentStep(userType + '-onboarding')}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Profile
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
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Application...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="w-5 h-5" />
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Animation */}
          <div className="relative mb-12">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-subtle">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">Application Submitted!</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Thank you for joining Crypto Trade Discovery Intake. Your application is being reviewed by our compliance team.
          </p>

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">What Happens Next?</h3>
            <div className="grid gap-8">
              {[
                {
                  step: '1',
                  title: 'Email Confirmation Sent',
                  description: 'Check your inbox for application confirmation and tracking details',
                  icon: Mail,
                  color: 'bg-blue-100 text-blue-600',
                  time: 'Immediate'
                },
                {
                  step: '2', 
                  title: 'Compliance Review',
                  description: 'Our team verifies documents and conducts background checks',
                  icon: Shield,
                  color: 'bg-purple-100 text-purple-600',
                  time: '24-48 hours'
                },
                {
                  step: '3',
                  title: 'Account Activation',
                  description: 'Receive platform access credentials and account manager assignment',
                  icon: Users,
                  color: 'bg-green-100 text-green-600',
                  time: '2-3 days'
                },
                {
                  step: '4',
                  title: 'Deal Matching',
                  description: `Start receiving ${userType === 'seller' ? 'buyer' : 'seller'} opportunities based on your profile`,
                  icon: TrendingUp,
                  color: 'bg-orange-100 text-orange-600',
                  time: '3-5 days'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6 text-left">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item.time}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-12">
            <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center justify-center gap-2">
              <FileText className="w-6 h-6" />
              Application Summary
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">User Type</h4>
                <p className="text-lg font-bold text-blue-900 capitalize">{userType}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Entity</h4>
                <p className="text-lg font-bold text-blue-900">{formData.entityName || 'Not specified'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Cryptocurrencies</h4>
                <p className="text-lg font-bold text-blue-900">
                  {((userType === 'seller' ? formData.cryptos : formData.targetCryptos) || []).length} selected
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Capital Range</h4>
                <p className="text-lg font-bold text-blue-900">
                  {(userType === 'seller' ? formData.portfolioValue : formData.availableCapital) || 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          {/* Application ID & Contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Important Information</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Application ID</h4>
                <p className="text-2xl font-bold text-blue-600 font-mono tracking-wider">{formData.applicationId}</p>
                <p className="text-xs text-gray-500 mt-2">Save this ID for future reference and support inquiries</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="text-sm font-bold text-blue-700 mb-2">Email Status</h4>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  emailStatus === 'sent' ? 'bg-green-100 text-green-800' :
                  emailStatus === 'sending' ? 'bg-yellow-100 text-yellow-800' :
                  emailStatus === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {emailStatus === 'sent' && <><CheckCircle className="w-4 h-4" /> Confirmation email sent to {formData.email}</>}
                  {emailStatus === 'sending' && <><Clock className="w-4 h-4" /> Sending confirmation email...</>}
                  {emailStatus === 'error' && <><AlertTriangle className="w-4 h-4" /> Email delivery failed</>}
                  {!emailStatus && <><Mail className="w-4 h-4" /> Email service ready</>}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
              onClick={() => {
                const applications = JSON.parse(localStorage.getItem('cryptoApplications') || '[]');
                console.log('All Applications:', applications);
                alert(`Database contains ${applications.length} application(s). Check console for details.`);
              }}
            >
              <Database className="w-5 h-5" />
              View Database
            </button>
            
            <button 
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              onClick={() => { 
                setCurrentStep('welcome'); 
                setUserType(''); 
                setFormData({}); 
                setFormErrors({}); 
                setUploadedFiles({});
                setEmailStatus('');
              }}
            >
              <Sparkles className="w-5 h-5" />
              Start New Application
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
