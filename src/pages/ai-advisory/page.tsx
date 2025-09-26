
import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import AIAssistant from '../../components/ai/AIAssistant';

interface AdvisoryStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface Portfolio {
  size: string;
  riskTolerance: string;
  horizon: string;
  sectors: string[];
  challenges: string;
  goals: string;
}

interface AIRecommendation {
  type: 'rebalance' | 'diversify' | 'risk' | 'timing';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  action: string;
}

const AIAdvisoryPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{email: string, role: string, name: string} | null>(null);
  const [showAdvisoryModal, setShowAdvisoryModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    size: '',
    riskTolerance: '',
    horizon: '',
    sectors: [],
    challenges: '',
    goals: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const advisorySteps: AdvisoryStep[] = [
    { id: 1, title: 'Portfolio Assessment', description: 'Current portfolio size and investment profile', completed: false },
    { id: 2, title: 'Sector Preferences', description: 'Investment sector interests and priorities', completed: false },
    { id: 3, title: 'Challenge Analysis', description: 'Current challenges and investment goals', completed: false },
    { id: 4, title: 'AI Processing', description: 'Advanced market analysis and strategy formulation', completed: false },
    { id: 5, title: 'Personalized Report', description: 'Customized recommendations and action plan', completed: false }
  ];

  const portfolioSizes = [
    { value: 'under-1m', label: 'Under $1M', description: 'Starter investor portfolio' },
    { value: '1m-5m', label: '$1M - $5M', description: 'Growing investment portfolio' },
    { value: '5m-10m', label: '$5M - $10M', description: 'Established investor portfolio' },
    { value: 'over-10m', label: 'Over $10M', description: 'High net worth portfolio' }
  ];

  const riskTolerances = [
    { value: 'conservative', label: 'Conservative', description: 'Capital preservation focus', color: 'bg-green-100 text-green-800' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced growth approach', color: 'bg-blue-100 text-blue-800' },
    { value: 'aggressive', label: 'Aggressive', description: 'High growth potential', color: 'bg-purple-100 text-purple-800' },
    { value: 'very-aggressive', label: 'Very Aggressive', description: 'Maximum returns focus', color: 'bg-red-100 text-red-800' }
  ];

  const investmentHorizons = [
    { value: 'short', label: 'Short-term (1-3 years)', description: 'Quick returns focus' },
    { value: 'medium', label: 'Medium-term (3-7 years)', description: 'Balanced approach' },
    { value: 'long', label: 'Long-term (7+ years)', description: 'Wealth building focus' }
  ];

  const investmentSectors = [
    { value: 'residential', label: 'Residential', icon: 'ri-home-4-line', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { value: 'commercial', label: 'Commercial', icon: 'ri-building-line', color: 'bg-green-50 text-green-700 border-green-200' },
    { value: 'industrial', label: 'Industrial', icon: 'ri-factory-line', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { value: 'retail', label: 'Retail', icon: 'ri-store-3-line', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { value: 'hospitality', label: 'Hospitality', icon: 'ri-hotel-line', color: 'bg-pink-50 text-pink-700 border-pink-200' },
    { value: 'mixed-use', label: 'Mixed-Use', icon: 'ri-community-line', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { value: 'land', label: 'Land Development', icon: 'ri-landscape-line', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { value: 'reits', label: 'REITs', icon: 'ri-stock-line', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' }
  ];

  const handleSectorToggle = (sector: string) => {
    setPortfolio(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startAIProcessing = async () => {
    setIsProcessing(true);
    setCurrentStep(4);
    
    const processingSteps = [
      'Analyzing current market conditions...',
      'Evaluating portfolio composition...',
      'Assessing risk factors...',
      'Calculating optimal allocations...',
      'Generating personalized recommendations...',
      'Finalizing investment strategy...'
    ];

    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(processingSteps[i]);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Generate AI recommendations based on portfolio
    const recommendations = generateAIRecommendations(portfolio);
    setAiRecommendations(recommendations);
    
    setIsProcessing(false);
    setCurrentStep(5);
    setShowReport(true);
  };

  const generateAIRecommendations = (portfolio: Portfolio): AIRecommendation[] => {
    const recommendations: AIRecommendation[] = [];

    // Portfolio rebalancing recommendation
    if (portfolio.riskTolerance === 'conservative') {
      recommendations.push({
        type: 'rebalance',
        title: 'Conservative Portfolio Rebalancing',
        description: 'Reduce exposure to high-risk sectors and increase stable income-generating assets',
        priority: 'high',
        impact: '+12% stability, -3% volatility',
        action: 'Shift 25% from commercial to residential properties in prime locations'
      });
    } else if (portfolio.riskTolerance === 'aggressive') {
      recommendations.push({
        type: 'rebalance',
        title: 'Growth-Oriented Rebalancing',
        description: 'Increase allocation to high-growth potential sectors and emerging markets',
        priority: 'high',
        impact: '+28% growth potential, +8% volatility',
        action: 'Allocate 35% to mixed-use developments and emerging districts'
      });
    }

    // Geographic diversification
    recommendations.push({
      type: 'diversify',
      title: 'Geographic Diversification Strategy',
      description: 'Spread investments across multiple markets to reduce regional risk',
      priority: 'medium',
      impact: 'Reduce single-market risk by 40%',
      action: 'Consider 30% UAE, 25% Turkey, 20% Saudi Arabia, 15% Iraq, 10% other MENA'
    });

    // Risk mitigation
    if (portfolio.size === 'over-10m') {
      recommendations.push({
        type: 'risk',
        title: 'Advanced Risk Hedging',
        description: 'Implement sophisticated risk management strategies for large portfolios',
        priority: 'high',
        impact: 'Protect against 15% market downturns',
        action: 'Establish currency hedging and implement stop-loss mechanisms'
      });
    }

    // Market timing
    recommendations.push({
      type: 'timing',
      title: 'Market Entry Timing',
      description: 'AI identifies optimal market entry points based on current conditions',
      priority: 'medium',
      impact: 'Improve entry timing by 22%',
      action: 'Enter Dubai market within 30 days, delay Turkey investments by 90 days'
    });

    return recommendations;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStepProgress = () => {
    return (currentStep / 5) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar userRole={currentUser?.role} userName={currentUser?.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with AI Advisory CTA */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              🤖 AI Investment Advisory
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              Get personalized investment recommendations powered by advanced AI analysis of market trends, risk factors, and your portfolio goals
            </p>
          </div>

          {/* AI Advisory CTA */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <i className="ri-robot-line text-4xl text-white"></i>
              </div>
            </div>
            <h2 className="text-3xl font-black mb-4">Advanced Portfolio Analysis</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-light">
              Multi-step AI consultation process with portfolio optimization, risk assessment, market intelligence, and diversification strategy
            </p>
            <button
              onClick={() => setShowAdvisoryModal(true)}
              className="bg-white text-purple-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <i className="ri-brain-line mr-3"></i>
              Start AI Consultation
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="ri-wallet-3-line text-white text-2xl"></i>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-bold">
                +12.5%
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-600 mb-2">Portfolio Value</h3>
            <p className="text-3xl font-black text-gray-900 mb-1">$8.4M</p>
            <p className="text-sm text-gray-500">Total investment value</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="ri-line-chart-line text-white text-2xl"></i>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                Monthly
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-600 mb-2">Monthly ROI</h3>
            <p className="text-3xl font-black text-gray-900 mb-1">18.2%</p>
            <p className="text-sm text-gray-500">Average return rate</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="ri-building-4-line text-white text-2xl"></i>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-bold">
                Active
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-600 mb-2">Properties</h3>
            <p className="text-3xl font-black text-gray-900 mb-1">24</p>
            <p className="text-sm text-gray-500">Investment properties</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="ri-funds-line text-white text-2xl"></i>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                +5.8%
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-600 mb-2">Monthly Income</h3>
            <p className="text-3xl font-black text-gray-900 mb-1">$125K</p>
            <p className="text-sm text-gray-500">Rental income</p>
          </div>
        </div>

        {/* AI Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <button 
            onClick={() => setShowAdvisoryModal(true)}
            className="bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 text-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center justify-between mb-4">
              <i className="ri-robot-line text-3xl group-hover:scale-110 transition-transform"></i>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="font-bold text-lg mb-2">Portfolio Optimization</h3>
            <p className="text-sm text-blue-100">AI-powered portfolio rebalancing and asset allocation recommendations</p>
          </button>

          <button 
            onClick={() => setShowAdvisoryModal(true)}
            className="bg-white/80 backdrop-blur-sm border border-gray-100 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center justify-between mb-4">
              <i className="ri-shield-check-line text-3xl text-red-600 group-hover:scale-110 transition-transform"></i>
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-red-600 transition-colors"></i>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Risk Assessment</h3>
            <p className="text-sm text-gray-600">Advanced risk evaluation with mitigation strategies</p>
          </button>

          <button 
            onClick={() => setShowAdvisoryModal(true)}
            className="bg-white/80 backdrop-blur-sm border border-gray-100 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center justify-between mb-4">
              <i className="ri-global-line text-3xl text-green-600 group-hover:scale-110 transition-transform"></i>
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-green-600 transition-colors"></i>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Market Intelligence</h3>
            <p className="text-sm text-gray-600">Real-time trend analysis and timing recommendations</p>
          </button>

          <button 
            onClick={() => setShowAdvisoryModal(true)}
            className="bg-white/80 backdrop-blur-sm border border-gray-100 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center justify-between mb-4">
              <i className="ri-pie-chart-line text-3xl text-purple-600 group-hover:scale-110 transition-transform"></i>
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-purple-600 transition-colors"></i>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Diversification Strategy</h3>
            <p className="text-sm text-gray-600">Geographic and sector allocation guidance</p>
          </button>
        </div>
      </div>

      {/* AI Advisory Modal */}
      {showAdvisoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <i className="ri-robot-line text-3xl"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black">AI Investment Advisory</h2>
                    <p className="text-blue-100">Personalized consultation process</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAdvisoryModal(false);
                    setCurrentStep(1);
                    setShowReport(false);
                    setIsProcessing(false);
                  }}
                  className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
                  <span>Step {currentStep} of 5</span>
                  <span>{Math.round(getStepProgress())}% Complete</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getStepProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-between mt-6">
                {advisorySteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentStep >= step.id ? 'bg-white text-purple-600' : 'bg-white/20 text-white/60'
                    }`}>
                      {currentStep > step.id ? <i className="ri-check-line"></i> : step.id}
                    </div>
                    <span className={`text-xs mt-2 text-center max-w-20 ${
                      currentStep >= step.id ? 'text-white' : 'text-white/60'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-96 overflow-y-auto">
              {/* Step 1: Portfolio Assessment */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Assessment</h3>
                    <p className="text-gray-600">Help us understand your current investment profile</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-4">Current Portfolio Size</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioSizes.map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setPortfolio(prev => ({ ...prev, size: size.value }))}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            portfolio.size === size.value
                              ? 'border-purple-500 bg-purple-50 shadow-lg'
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                          }`}
                        >
                          <div className="font-bold text-gray-900">{size.label}</div>
                          <div className="text-sm text-gray-600">{size.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-4">Risk Tolerance</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {riskTolerances.map((risk) => (
                        <button
                          key={risk.value}
                          onClick={() => setPortfolio(prev => ({ ...prev, riskTolerance: risk.value }))}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            portfolio.riskTolerance === risk.value
                              ? 'border-purple-500 bg-purple-50 shadow-lg'
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-gray-900">{risk.label}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${risk.color}`}>
                              {risk.label}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">{risk.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-4">Investment Horizon</label>
                    <div className="space-y-3">
                      {investmentHorizons.map((horizon) => (
                        <button
                          key={horizon.value}
                          onClick={() => setPortfolio(prev => ({ ...prev, horizon: horizon.value }))}
                          className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            portfolio.horizon === horizon.value
                              ? 'border-purple-500 bg-purple-50 shadow-lg'
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-gray-900">{horizon.label}</div>
                              <div className="text-sm text-gray-600">{horizon.description}</div>
                            </div>
                            <i className={`ri-arrow-right-line text-2xl ${
                              portfolio.horizon === horizon.value ? 'text-purple-600' : 'text-gray-400'
                            }`}></i>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Sector Preferences */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sector Preferences</h3>
                    <p className="text-gray-600">Select your preferred investment sectors (multiple selections allowed)</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {investmentSectors.map((sector) => (
                      <button
                        key={sector.value}
                        onClick={() => handleSectorToggle(sector.value)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                          portfolio.sectors.includes(sector.value)
                            ? `border-purple-500 ${sector.color} shadow-lg scale-105`
                            : `border-gray-200 ${sector.color.replace(/bg-\w+-50/, 'bg-gray-50').replace(/text-\w+-700/, 'text-gray-700').replace(/border-\w+-200/, 'border-gray-200')} hover:border-purple-300 hover:scale-105`
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <i className={`${sector.icon} text-2xl`}></i>
                          <span className="font-bold text-sm">{sector.label}</span>
                          {portfolio.sectors.includes(sector.value) && (
                            <i className="ri-check-line text-purple-600 text-xl"></i>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {portfolio.sectors.length > 0 && (
                    <div className="bg-purple-50 p-4 rounded-2xl">
                      <h4 className="font-bold text-purple-900 mb-2">Selected Sectors ({portfolio.sectors.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {portfolio.sectors.map((sector) => {
                          const sectorInfo = investmentSectors.find(s => s.value === sector);
                          return (
                            <span key={sector} className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
                              {sectorInfo?.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Challenge Analysis */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Challenge Analysis</h3>
                    <p className="text-gray-600">Tell us about your investment challenges and goals</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Current Investment Challenges</label>
                    <textarea
                      value={portfolio.challenges}
                      onChange={(e) => setPortfolio(prev => ({ ...prev, challenges: e.target.value }))}
                      rows={4}
                      placeholder="Describe any challenges you're facing with your current investments, market concerns, or areas where you need guidance..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-0 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Investment Goals & Objectives</label>
                    <textarea
                      value={portfolio.goals}
                      onChange={(e) => setPortfolio(prev => ({ ...prev, goals: e.target.value }))}
                      rows={4}
                      placeholder="What are your primary investment goals? Are you looking for passive income, capital appreciation, portfolio diversification, or specific market exposure?"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-0 transition-colors text-sm"
                    />
                  </div>

                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <div className="flex items-start space-x-3">
                      <i className="ri-lightbulb-line text-blue-600 text-xl mt-1"></i>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-2">AI Advisory Tips</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Be specific about your challenges for better recommendations</li>
                          <li>• Mention any geographic preferences or restrictions</li>
                          <li>• Include your target ROI or income requirements</li>
                          <li>• Note any liquidity or timeline constraints</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: AI Processing */}
              {currentStep === 4 && (
                <div className="text-center space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Processing Your Portfolio</h3>
                    <p className="text-gray-600">Our advanced AI is analyzing your profile and market conditions</p>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-32 h-32 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-purple-600">
                      {processingStep || 'Initializing AI analysis...'}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div className="bg-blue-50 p-4 rounded-2xl">
                        <i className="ri-global-line text-blue-600 text-2xl mb-2"></i>
                        <div className="font-bold text-blue-900">Market Analysis</div>
                        <div className="text-blue-700">Analyzing 50+ global markets</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-2xl">
                        <i className="ri-pie-chart-line text-green-600 text-2xl mb-2"></i>
                        <div className="font-bold text-green-900">Portfolio Optimization</div>
                        <div className="text-green-700">Calculating optimal allocations</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-2xl">
                        <i className="ri-shield-check-line text-purple-600 text-2xl mb-2"></i>
                        <div className="font-bold text-purple-900">Risk Assessment</div>
                        <div className="text-purple-700">Evaluating risk factors</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Personalized Report */}
              {currentStep === 5 && showReport && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-check-line text-white text-3xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized AI Report</h3>
                    <p className="text-gray-600">Based on your profile, here are our AI-powered recommendations</p>
                  </div>

                  <div className="space-y-6">
                    {aiRecommendations.map((recommendation, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              recommendation.type === 'rebalance' ? 'bg-blue-100' :
                              recommendation.type === 'diversify' ? 'bg-green-100' :
                              recommendation.type === 'risk' ? 'bg-red-100' : 'bg-purple-100'
                            }`}>
                              <i className={`${
                                recommendation.type === 'rebalance' ? 'ri-scales-3-line text-blue-600' :
                                recommendation.type === 'diversify' ? 'ri-global-line text-green-600' :
                                recommendation.type === 'risk' ? 'ri-shield-check-line text-red-600' : 'ri-time-line text-purple-600'
                              } text-xl`}></i>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{recommendation.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(recommendation.priority)}`}>
                                {recommendation.priority.toUpperCase()} PRIORITY
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{recommendation.description}</p>
                        
                        <div className="bg-white p-4 rounded-xl mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-bold text-gray-600">Expected Impact:</span>
                              <p className="text-green-600 font-bold">{recommendation.impact}</p>
                            </div>
                            <div>
                              <span className="text-sm font-bold text-gray-600">Recommended Action:</span>
                              <p className="text-gray-900 font-medium">{recommendation.action}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-4 flex items-center">
                      <i className="ri-trophy-line mr-2"></i>
                      Portfolio Score & Outlook
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-black text-green-600 mb-1">A+</div>
                        <div className="text-sm text-gray-600">Overall Grade</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black text-blue-600 mb-1">+24%</div>
                        <div className="text-sm text-gray-600">Projected Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black text-purple-600 mb-1">Low</div>
                        <div className="text-sm text-gray-600">Risk Level</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {currentStep > 1 && currentStep < 4 && (
                  <button
                    onClick={handlePreviousStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Previous
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {currentStep < 3 && (
                  <button
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 1 && (!portfolio.size || !portfolio.riskTolerance || !portfolio.horizon)) ||
                      (currentStep === 2 && portfolio.sectors.length === 0)
                    }
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                    <i className="ri-arrow-right-line ml-2"></i>
                  </button>
                )}
                
                {currentStep === 3 && (
                  <button
                    onClick={startAIProcessing}
                    disabled={!portfolio.challenges.trim() || !portfolio.goals.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-robot-line mr-2"></i>
                    Start AI Analysis
                  </button>
                )}

                {currentStep === 5 && showReport && (
                  <div className="flex space-x-3">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                      <i className="ri-download-line mr-2"></i>
                      Download Report
                    </button>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold">
                      <i className="ri-calendar-line mr-2"></i>
                      Schedule Follow-up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-40">
        <AIAssistant />
      </div>
    </div>
  );
};

export default AIAdvisoryPage;
