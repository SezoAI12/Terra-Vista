
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const Investments: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'discovery' | 'development' | 'ai-advisory'>('discovery');
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string; name: string } | null>(null);
  const [financialTab, setFinancialTab] = useState('overview');
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [aiRecommendationStep, setAiRecommendationStep] = useState(1);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiProcessingStep, setAiProcessingStep] = useState('');

  // New state for Discovery features
  const [showAssetAnalyzer, setShowAssetAnalyzer] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showFinancialModeling, setShowFinancialModeling] = useState(false);
  const [financialModelData, setFinancialModelData] = useState({
    propertyPrice: 5000000,
    downPayment: 25,
    loanTerm: 25,
    interestRate: 3.5,
    rentalIncome: 35000,
    operatingExpenses: 15,
    vacancyRate: 5,
    capitalGrowth: 6
  });
  const [showRiskModeling, setShowRiskModeling] = useState(false);
  const [riskScenarios, setRiskScenarios] = useState({
    bestCase: { growth: 8.5, rental: 40000, vacancy: 2 },
    baseCase: { growth: 6.0, rental: 35000, vacancy: 5 },
    worstCase: { growth: 2.5, rental: 28000, vacancy: 12 }
  });
  const [showPredictiveInsights, setShowPredictiveInsights] = useState(false);
  const [showOpportunities, setShowOpportunities] = useState(false);

  // New state for Development Advisory features
  const [showHolisticPlanning, setShowHolisticPlanning] = useState(false);
  const [developmentProject, setDevelopmentProject] = useState({
    landSize: 10000,
    location: 'Dubai Marina',
    projectType: 'mixed-use',
    budget: 25000000,
    timeline: 36
  });
  const [showMarketRecommendations, setShowMarketRecommendations] = useState(false);
  const [showFinancialIntelligence, setShowFinancialIntelligence] = useState(false);
  const [showDevelopmentAdvisory, setShowDevelopmentAdvisory] = useState(false);
  const [showProjectTracking, setShowProjectTracking] = useState(false);

  // Investment Dashboard Data
  const [portfolioData] = useState({
    totalInvestment: 15750000,
    totalValue: 18900000,
    irr: 18.5,
    roi: 20.2,
    monthlyIncome: 125000,
    properties: 12,
    countries: 5,
    topPerformer: 'Dubai Marina Penthouse',
    topPerformerGain: 28.5
  });

  // AI Recommendations Data
  const [aiRecommendations] = useState([
    {
      id: 1,
      type: 'rebalance',
      priority: 'high',
      title: 'Geographic Rebalancing Strategy',
      description: 'Reduce UAE exposure from 43% to 35% and increase Turkey allocation to 38% for optimal risk-adjusted returns.',
      impact: '+3.2% portfolio ROI',
      confidence: 92,
      timeframe: '3-6 months',
      reasoning: 'Turkey market showing strong fundamentals with 18.5% growth potential vs UAE market saturation indicators.',
      actionItems: [
        'Sell 2 Dubai properties in Q2 2024',
        'Acquire 3 Istanbul commercial units',
        'Maintain Iraq exposure at current 17%'
      ],
      expectedOutcome: 'Portfolio ROI increase from 20.2% to 23.4%',
      riskMitigation: 'Diversified currency exposure, reduced single-market dependency'
    },
    {
      id: 2,
      type: 'acquisition',
      priority: 'high',
      title: 'Strategic Acquisition Opportunity',
      description: 'Acquire mixed-use development in Erbil Kurdistan region with exceptional growth potential.',
      impact: '+$420K annual income',
      confidence: 89,
      timeframe: '30-45 days',
      reasoning: 'Kurdistan region reconstruction boom, limited supply, high rental demand from oil sector growth.',
      actionItems: [
        'Secure $2.8M financing at 4.2% rate',
        'Complete due diligence within 21 days',
        'Negotiate 15% below asking price'
      ],
      expectedOutcome: '25.4% ROI with 3.9-year payback period',
      riskMitigation: 'Political risk insurance, local partnership structure'
    },
    {
      id: 3,
      type: 'optimization',
      priority: 'medium',
      title: 'Rental Income Optimization',
      description: 'Implement dynamic pricing strategy across 8 rental properties to maximize income potential.',
      impact: '+$18K monthly income',
      confidence: 94,
      timeframe: '2-4 weeks',
      reasoning: 'Market analysis shows 15-22% rental rate increases possible with strategic positioning and amenity upgrades.',
      actionItems: [
        'Install smart home features in 4 properties',
        'Upgrade furnishing packages',
        'Implement seasonal pricing model'
      ],
      expectedOutcome: 'Monthly rental income increase from $125K to $143K',
      riskMitigation: 'Gradual implementation, tenant retention programs'
    },
    {
      id: 4,
      type: 'financing',
      priority: 'medium',
      title: 'Debt Restructuring Opportunity',
      description: 'Refinance 5 properties to capitalize on favorable interest rate environment.',
      impact: 'Save $240K annually',
      confidence: 87,
      timeframe: '60-90 days',
      reasoning: 'Current rates 1.8% below portfolio average, potential for significant interest savings.',
      actionItems: [
        'Negotiate with 3 preferred lenders',
        'Consolidate smaller loans',
        'Lock rates before Q2 2024'
      ],
      expectedOutcome: 'Reduce average interest rate from 4.2% to 2.4%',
      riskMitigation: 'Rate lock agreements, maintain credit facility backup'
    },
    {
      id: 5,
      type: 'diversification',
      priority: 'low',
      title: 'Sector Diversification Strategy',
      description: 'Add hospitality sector exposure through boutique hotel investment in Dubai Marina.',
      impact: '+12% portfolio diversification',
      confidence: 78,
      timeframe: '6-12 months',
      reasoning: 'Tourism recovery driving hospitality demand, limited quality supply in prime locations.',
      actionItems: [
        'Identify 3-4 boutique hotel opportunities',
        'Secure hospitality management partner',
        'Analyze tourism trend projections'
      ],
      expectedOutcome: 'Reduce portfolio correlation risk by 12%',
      riskMitigation: 'Professional management, tourism insurance coverage'
    }
  ]);

  // AI-Curated Opportunities
  const [opportunities] = useState([
    {
      id: 1,
      title: 'Luxury Apartment Complex - Istanbul',
      location: 'Şişli, Istanbul, Turkey',
      price: 'USD 4,200,000',
      originalPrice: 4200000,
      currency: 'USD',
      type: 'Residential Complex',
      growthScore: 94,
      roi: '22.3%',
      irr: '19.8%',
      rentalYield: '9.2%',
      paybackPeriod: '4.2 years',
      riskLevel: 'Medium',
      image: 'https://readdy.ai/api/search-image?query=luxury%20apartment%20complex%20Istanbul%20modern%20architecture%20glass%20facade%20urban%20development%2C%20professional%20real%20estate%20photography%2C%20bright%20natural%20lighting%2C%20minimal%20style&width=400&height=300&seq=20&orientation=landscape',
      developer: 'Premium Properties Turkey',
      completionDate: '2025-Q3',
      unitMix: {
        studio: 20,
        oneBR: 35,
        twoBR: 30,
        threeBR: 15
      },
      marketAnalysis: {
        demand: 'Very High',
        competition: 'Medium',
        priceAppreciation: '+15.2% annually',
        rentalDemand: 'Excellent'
      },
      financials: {
        totalCost: 4200000,
        expectedRevenue: 5800000,
        annualRental: 388000,
        maintenanceCost: 42000,
        netAnnualIncome: 346000
      },
      risks: [
        'Currency fluctuation',
        'Construction delays',
        'Market saturation'
      ],
      opportunities: [
        'Tourism growth',
        'Infrastructure development',
        'Government incentives'
      ],
      swotAnalysis: {
        strengths: ['Prime location', 'Modern design', 'Strong developer reputation'],
        weaknesses: ['High initial investment', 'Currency exposure'],
        opportunities: ['Growing tourism sector', 'Government infrastructure projects'],
        threats: ['Economic volatility', 'Regulatory changes']
      },
      historicalPerformance: {
        year2019: 3800000,
        year2020: 3650000,
        year2021: 3900000,
        year2022: 4050000,
        year2023: 4200000
      }
    },
    {
      id: 2,
      title: 'Commercial Office Development - Dubai',
      location: 'Business Bay, Dubai, UAE',
      price: 'AED 12,500,000',
      originalPrice: 12500000,
      currency: 'AED',
      type: 'Commercial Office',
      growthScore: 91,
      roi: '19.7%',
      irr: '17.2%',
      rentalYield: '8.8%',
      paybackPeriod: '5.1 years',
      riskLevel: 'Low',
      image: 'https://readdy.ai/api/search-image?query=modern%20commercial%20office%20building%20Dubai%20Business%20Bay%20glass%20tower%20contemporary%20architecture%2C%20professional%20real%20estate%20photography%2C%20bright%20lighting%2C%20minimal%20background&width=400&height=300&seq=21&orientation=landscape',
      developer: 'Emirates Development Group',
      completionDate: '2025-Q1',
      unitMix: {
        smallOffice: 40,
        mediumOffice: 25,
        largeOffice: 15,
        retail: 20
      },
      marketAnalysis: {
        demand: 'High',
        competition: 'Medium',
        priceAppreciation: '+12.8% annually',
        rentalDemand: 'Strong'
      },
      financials: {
        totalCost: 12500000,
        expectedRevenue: 17200000,
        annualRental: 1100000,
        maintenanceCost: 125000,
        netAnnualIncome: 975000
      },
      risks: [
        'Economic slowdown',
        'Oversupply risk',
        'Regulatory changes'
      ],
      opportunities: [
        'Expo legacy effect',
        'Business hub growth',
        'Tax advantages'
      ],
      swotAnalysis: {
        strengths: ['Strategic location', 'High-quality amenities', 'Strong rental demand'],
        weaknesses: ['High competition', 'Economic sensitivity'],
        opportunities: ['Business district expansion', 'International companies'],
        threats: ['Market oversupply', 'Economic cycles']
      },
      historicalPerformance: {
        year2019: 11200000,
        year2020: 10800000,
        year2021: 11500000,
        year2022: 12000000,
        year2023: 12500000
      }
    },
    {
      id: 3,
      title: 'Mixed-Use Development - Erbil',
      location: 'Empire District, Erbil, Iraq',
      price: 'USD 2,800,000',
      originalPrice: 2800000,
      currency: 'USD',
      type: 'Mixed-Use',
      growthScore: 88,
      roi: '25.4%',
      irr: '21.6%',
      rentalYield: '11.8%',
      paybackPeriod: '3.9 years',
      riskLevel: 'High',
      image: 'https://readdy.ai/api/search-image?query=mixed-use%20development%20Erbil%20Kurdistan%20modern%20architecture%20residential%20commercial%20complex%2C%20professional%20real%20estate%20photography%2C%20bright%20natural%20lighting%2C%20clean%20background&width=400&height=300&seq=22&orientation=landscape',
      developer: 'Kurdistan Real Estate Co.',
      completionDate: '2025-Q2',
      unitMix: {
        residential: 60,
        commercial: 25,
        retail: 15
      },
      marketAnalysis: {
        demand: 'Very High',
        competition: 'Low',
        priceAppreciation: '+18.5% annually',
        rentalDemand: 'Excellent'
      },
      financials: {
        totalCost: 2800000,
        expectedRevenue: 4200000,
        annualRental: 330000,
        maintenanceCost: 28000,
        netAnnualIncome: 302000
      },
      risks: [
        'Political stability',
        'Security concerns',
        'Limited liquidity'
      ],
      opportunities: [
        'Economic reconstruction',
        'Oil sector growth',
        'Infrastructure development'
      ],
      swotAnalysis: {
        strengths: ['High ROI potential', 'Low competition', 'Growing economy'],
        weaknesses: ['Political risk', 'Limited exit options'],
        opportunities: ['Reconstruction boom', 'Oil revenue growth'],
        threats: ['Political instability', 'Security risks']
      },
      historicalPerformance: {
        year2019: 2200000,
        year2020: 2100000,
        year2021: 2400000,
        year2022: 2650000,
        year2023: 2800000
      }
    }
  ]);

  // Market Watchlist
  const [watchlistData] = useState({
    currencies: [
      { name: 'AED', rate: 3.67, change: '+0.2%', trend: 'up' },
      { name: 'TRY', rate: 29.85, change: '-1.2%', trend: 'down' },
      { name: 'EUR', rate: 1.09, change: '+0.5%', trend: 'up' },
      { name: 'IQD', rate: 1310, change: '+0.1%', trend: 'up' }
    ],
    regions: [
      { name: 'Dubai', performance: '+18.5%', demand: 'Very High', trend: 'up' },
      { name: 'Istanbul', performance: '+15.2%', demand: 'High', trend: 'up' },
      { name: 'Erbil', performance: '+22.1%', demand: 'High', trend: 'up' },
      { name: 'Riyadh', performance: '+12.8%', demand: 'Medium', trend: 'stable' }
    ]
  });

  // Simulation State
  const [simulationData, setSimulationData] = useState({
    interestRateChange: 0,
    inflationRate: 3.2,
    economicGrowth: 2.8,
    currencyFluctuation: 0
  });

  // Load user data
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Financial Modeling Calculations
  const calculateFinancialModel = () => {
    const loanAmount = financialModelData.propertyPrice * (1 - financialModelData.downPayment / 100);
    const monthlyRate = financialModelData.interestRate / 100 / 12;
    const numPayments = financialModelData.loanTerm * 12;
    
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const annualMortgage = monthlyPayment * 12;
    const grossRental = financialModelData.rentalIncome * 12;
    const operatingCosts = grossRental * (financialModelData.operatingExpenses / 100);
    const vacancyCost = grossRental * (financialModelData.vacancyRate / 100);
    const netRental = grossRental - operatingCosts - vacancyCost;
    const cashFlow = netRental - annualMortgage;
    const cashOnCash = (cashFlow / (financialModelData.propertyPrice * financialModelData.downPayment / 100)) * 100;
    
    return {
      monthlyPayment: monthlyPayment.toFixed(0),
      annualMortgage: annualMortgage.toFixed(0),
      grossRental: grossRental.toFixed(0),
      netRental: netRental.toFixed(0),
      cashFlow: cashFlow.toFixed(0),
      cashOnCash: cashOnCash.toFixed(1),
      totalInvestment: (financialModelData.propertyPrice * financialModelData.downPayment / 100).toFixed(0)
    };
  };

  // Risk Scenario Calculations
  const calculateRiskScenario = (scenario: any) => {
    const annualRental = scenario.rental * 12;
    const netRental = annualRental * (1 - scenario.vacancy / 100) * 0.85; // 15% operating expenses
    const futureValue = financialModelData.propertyPrice * Math.pow(1 + scenario.growth / 100, 10);
    const totalReturn = (netRental * 10) + (futureValue - financialModelData.propertyPrice);
    const roi = (totalReturn / financialModelData.propertyPrice) * 100;
    
    return {
      netRental: netRental.toFixed(0),
      futureValue: futureValue.toFixed(0),
      totalReturn: totalReturn.toFixed(0),
      roi: roi.toFixed(1)
    };
  };

  // Handle AI Recommendations
  const handleAIRecommendations = async () => {
    setShowAIRecommendations(true);
    setIsProcessingAI(true);
    setAiRecommendationStep(1);

    const aiProcessingSteps = [
      'Analyzing current market conditions...',
      'Evaluating portfolio composition...',
      'Assessing risk factors...',
      'Calculating optimal allocations...',
      'Generating personalized recommendations...',
      'Finalizing investment strategy...'
    ];

    // Simulate AI processing
    for (let i = 0; i < aiProcessingSteps.length; i++) {
      setAiProcessingStep(aiProcessingSteps[i]);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsProcessingAI(false);
    setAiRecommendationStep(2);
  };

  // New handlers added from modified content
  const handleViewOpportunityDetails = (opportunity: any) => {
    alert(`Property Details: ${opportunity.title}\n\n📍 Location: ${opportunity.location}\n💰 Price: ${opportunity.price}\n📊 ROI: ${opportunity.roi}\n📈 Growth: ${opportunity.growthScore}\n🏗️ Type: ${opportunity.type}\n⭐ AI Score: ${opportunity.growthScore}\n\n🔍 Key Features:\n${opportunity.highlights?.map((f: string) => `• ${f}`).join('\\n') || '• Prime location\\n• High growth potential\\n• Strong rental demand'}\n\n📋 Investment Analysis:\n• Market Cap Rate: 7.2%\\n• Cash Flow: AED 45K/month\\n• Break-even: 8.5 years\\n• Market Trend: Bullish (+15%)\\n• Liquidity Score: High\\n• Risk Assessment: Low-Medium\\n\\n📞 Contact: investment@terravista.ai\\n🌐 Schedule viewing available`);
  };

  const handleAnalyzeAsset = (asset: any) => {
    alert(`Asset Deep Dive Analysis: ${asset.title}\n\n🏢 Property Analysis:\n• Current Value: ${asset.currentValue || asset.price}\n• Historical Growth: +${asset.historicalGrowth || '15.2'}% (5yr avg)\n• Market Position: ${asset.marketPosition || 'Premium'}\n• Comparable Sales: ${asset.comparableSales || '12'} properties\n\n📊 Financial Metrics:\n• Cap Rate: ${asset.capRate || '7.2'}%\\n• Cash-on-Cash: ${asset.cashOnCash || '12.5'}%\\n• Debt Service Coverage: ${asset.dscr || '1.35'}\\n• Price per Sq Ft: ${asset.pricePerSqFt || 'AED 1,250'}\n\n🎯 SWOT Analysis:\nStrengths: ${asset.swotAnalysis?.strengths.join(', ') || 'Prime location, Modern design, Strong demand'}\\nWeaknesses: ${asset.swotAnalysis?.weaknesses.join(', ') || 'High initial investment, Market competition'}\\nOpportunities: ${asset.swotAnalysis?.opportunities.join(', ') || 'Growing tourism, Infrastructure development'}\\nThreats: ${asset.swotAnalysis?.threats.join(', ') || 'Economic volatility, Regulatory changes'}\\n\\n📈 Recommendation: ${asset.recommendation || 'Strong Buy - High growth potential with manageable risk profile'}`);
  };

  const handleHelpSupport = () => {
    alert(`🆘 Help & Support Center\\n\\n📞 24/7 Support Hotline: +971 4 123 4567\\n📧 Email Support: support@terravista.ai\\n💬 Live Chat: Available 24/7\\n📱 WhatsApp: +971 50 123 4567\\n\\n📚 Self-Service Options:\\n• Knowledge Base & FAQs\\n• Video Tutorials & Guides\\n• Webinar Training Sessions\\n• Community Forum\\n\\n🎯 Specialized Support:\\n• Technical Issues\\n• Investment Guidance\\n• Platform Navigation\\n• Account Management\\n\\n⏰ Average Response Time: < 2 hours\\n🌟 Customer Satisfaction: 4.9/5 stars`);
  };

  const handleDownloadPlans = (property: any) => {
    alert(`📋 Downloading Investment Plans for: ${property.title}\\n\\n📄 Documents Being Prepared:\\n• Executive Summary (PDF)\\n• Financial Projections (Excel)\\n• Market Analysis Report (PDF)\\n• Risk Assessment Matrix (PDF)\\n• Investment Timeline (PDF)\\n• Due Diligence Checklist (PDF)\\n\\n📊 Plan Includes:\\n• 5-year financial forecast\\n• Market comparables analysis\\n• Investment strategy recommendations\\n• Exit strategy options\\n• Tax implications overview\\n\\n⏳ Estimated preparation time: 2-3 minutes\\n📧 Plans will be sent to your registered email\\n🔒 All documents are encrypted and secure`);
  };

  const handle3DWalkthrough = (property: any) => {
    alert(`🏠 3D Virtual Walkthrough: ${property.title}\\n\\n🎮 Features Available:\\n• 360° Virtual Tour\\n• Interactive Floor Plans\\n• Augmented Reality Mode\\n• Measurement Tools\\n• Lighting Simulation\\n• Furniture Placement\\n\\n📱 Access Options:\\n• Web Browser (Chrome, Safari, Firefox)\\n• Mobile App (iOS/Android)\\n• VR Headset Compatible\\n• Share Link with Colleagues\\n\\n⏱️ Tour Duration: 10-15 minutes\\n🔧 Navigation: Mouse/touch controls\\n📷 Screenshots: Enabled\\n📞 Live Guide: Available on request\\n\\n🚀 Starting 3D experience...`);
  };

  const handleFeasibilityStudy = () => {
    alert(`📊 Comprehensive Feasibility Study\\n\\n🏗️ Development Analysis Includes:\\n\\n1️⃣ MARKET FEASIBILITY\\n• Target market analysis\\n• Demand assessment\\n• Competition evaluation\\n• Pricing strategy\\n\\n2️⃣ TECHNICAL FEASIBILITY\\n• Site analysis & geotechnical study\\n• Architectural design review\\n• Engineering assessments\\n• Construction timeline\\n\\n3️⃣ FINANCIAL FEASIBILITY\\n• Development costs breakdown\\n• Revenue projections\\n• Cash flow analysis\\n• ROI & IRR calculations\\n• Break-even analysis\\n\\n4️⃣ REGULATORY FEASIBILITY\\n• Zoning compliance\\n• Permit requirements\\n• Environmental impact\\n• Legal considerations\\n\\n5️⃣ RISK ANALYSIS\\n• Market risks\\n• Construction risks\\n• Financial risks\\n• Mitigation strategies\\n\\n📋 Deliverables:\\n• 50+ page comprehensive report\\n• Executive summary\\n• Financial models (Excel)\\n• Risk assessment matrix\\n• Recommendations & next steps\\n\\n⏱️ Study Duration: 2-3 weeks\\n💰 Investment: Starting from AED 25,000\\n📞 Contact: feasibility@terravista.ai`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'rebalance': return 'ri-scales-3-line';
      case 'acquisition': return 'ri-building-line';
      case 'optimization': return 'ri-settings-3-line';
      case 'financing': return 'ri-bank-line';
      case 'diversification': return 'ri-pie-chart-line';
      default: return 'ri-lightbulb-line';
    }
  };

  // Chart placeholder instead of Chart.js implementation
  const ForecastChart = () => (
    <div className="h-80 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      <div className="text-center relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <i className="ri-line-chart-line text-4xl text-white"></i>
        </div>
        <p className="text-2xl font-black text-gray-900 mb-3">5-Year AI Portfolio Forecast</p>
        <p className="text-gray-600 mb-6">Interactive portfolio growth prediction with confidence bands</p>
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">$18.9M</div>
            <div className="text-sm text-gray-600">Current Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">$41.8M</div>
            <div className="text-sm text-gray-600">2029 Forecast</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <div className="text-sm text-gray-600">AI Confidence</div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleSimulationChange = (key: string, value: number) => {
    setSimulationData(prev => ({ ...prev, [key]: value }));
  };

  const runSimulation = () => {
    // Simulate the impact of changes
    const baseROI = portfolioData.roi;
    const interestImpact = simulationData.interestRateChange * -2; // 2% ROI decrease per 1% interest increase
    const inflationImpact = (simulationData.inflationRate - 3.2) * -1.5;
    const growthImpact = (simulationData.economicGrowth - 2.8) * 3;
    const currencyImpact = simulationData.currencyFluctuation * 0.8;
    
    const adjustedROI = baseROI + interestImpact + inflationImpact + growthImpact + currencyImpact;
    
    alert(`Simulation Results:\\nAdjusted ROI: ${adjustedROI.toFixed(1)}%\\nImpact: ${(adjustedROI - baseROI).toFixed(1)}% vs current portfolio`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={currentUser?.role} userName={currentUser?.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Hub</h1>
          <p className="text-gray-600">Comprehensive investment analytics & development advisory platform</p>
        </div>

        {/* Main Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('discovery')}
              className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === 'discovery'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-search-eye-line mr-2"></i>
              Opportunity Discovery & Deep Evaluation
            </button>
            <button
              onClick={() => setActiveTab('development')}
              className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === 'development'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-building-line mr-2"></i>
              Development Advisory & Investment Planning
            </button>
            <button
              onClick={() => {
                navigate('/ai-advisory');
              }}
              className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === 'ai-advisory'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-robot-line mr-2"></i>
              AI Investment Advisory
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'discovery' && (
          <div className="space-y-8">
            {/* Help & Support Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-200">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-customer-service-2-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Getting Started?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our investment experts are here to guide you through every step of your real estate journey
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={handleHelpSupport}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-headphone-line mr-2"></i>
                  24/7 Support
                </button>
                <button 
                  onClick={handleHelpSupport}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-book-open-line mr-2"></i>
                  Knowledge Base
                </button>
                <button 
                  onClick={handleHelpSupport}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-video-line mr-2"></i>
                  Video Tutorials
                </button>
              </div>
            </div>

            {/* Real Estate Opportunities */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-building-line mr-3 text-blue-600"></i>
                    Real Estate Opportunities
                  </h3>
                  <p className="text-gray-600">AI-flagged high-potential properties with verified viability</p>
                </div>
                <button 
                  onClick={() => setShowOpportunities(!showOpportunities)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-search-line mr-2"></i>
                  Browse All Opportunities
                </button>
              </div>

              {showOpportunities && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {opportunities.map((opportunity, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          opportunity.growthScore >= 90 ? 'bg-green-100 text-green-700' :
                          opportunity.growthScore >= 80 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          AI Score: {opportunity.growthScore}
                        </span>
                        <i className="ri-bookmark-line text-gray-400 hover:text-blue-600 cursor-pointer"></i>
                      </div>
                      
                      <h4 className="font-bold text-gray-900 mb-2">{opportunity.title}</h4>
                      <p className="text-gray-600 text-sm mb-4 flex items-center">
                        <i className="ri-map-pin-line mr-2"></i>
                        {opportunity.location}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-bold text-gray-900">{opportunity.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ROI:</span>
                          <span className="font-bold text-green-600">{opportunity.roi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Growth:</span>
                          <span className="font-bold text-blue-600">{opportunity.irr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium text-gray-900">{opportunity.type}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <h5 className="font-medium text-gray-900 text-sm">Key Features:</h5>
                        <div className="flex flex-wrap gap-1">
                          {['Prime Location', 'High Growth', 'Strong Demand'].slice(0, 3).map((feature: string, fIndex: number) => (
                            <span key={fIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {feature}
                            </span>
                          ))}
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            +3 more
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleViewOpportunityDetails(opportunity)}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Asset Analyzer */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-search-2-line mr-3 text-green-600"></i>
                    Asset Analyzer (Deep Dive)
                  </h3>
                  <p className="text-gray-600 mt-2">Real-time valuation, historical performance, and SWOT analysis</p>
                </div>
                <button 
                  onClick={() => setShowAssetAnalyzer(!showAssetAnalyzer)}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-analysis-line mr-2"></i>
                  Start Analysis
                </button>
              </div>

              {showAssetAnalyzer && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {opportunities.slice(0, 2).map((asset, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <i className="ri-building-4-line text-green-600 text-xl"></i>
                          <span className="font-bold text-gray-900">{asset.title}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          asset.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                          asset.riskLevel === 'Medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {asset.riskLevel} Risk
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">{asset.price}</div>
                          <div className="text-sm text-gray-600">Current Value</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">+15.2%</div>
                          <div className="text-sm text-gray-600">5yr Growth</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cap Rate:</span>
                          <span className="font-medium">7.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cash-on-Cash:</span>
                          <span className="font-medium">12.5%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">DSCR:</span>
                          <span className="font-medium">1.35</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Comparables:</span>
                          <span className="font-medium">12 properties</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleAnalyzeAsset(asset)}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                      >
                        <i className="ri-focus-3-line mr-2"></i>
                        Analyze Asset
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Advanced Financial Modeling */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-calculator-line mr-3 text-purple-600"></i>
                    Advanced Financial Modeling
                  </h3>
                  <p className="text-gray-600">ROI/IRR analysis and multi-market comparative reports</p>
                </div>
                {/* Removed button as modals are handled separately */}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Parameters */}
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4">ROI & IRR Analysis</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment</label>
                        <input
                          type="text"
                          placeholder="AED 2,500,000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Annual Rental Income</label>
                        <input
                          type="text"
                          placeholder="AED 180,000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Annual Appreciation</label>
                        <input
                          type="text"
                          placeholder="5.5%"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Holding Period</label>
                        <input
                          type="text"
                          placeholder="10 years"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap">
                      Calculate ROI & IRR
                    </button>
                  </div>
                </div>
                {/* Multi-Market Analysis */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4">Multi-Market Analysis</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors whitespace-nowrap">Dubai</button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">Istanbul</button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">Baghdad</button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <span className="text-sm font-medium">Average ROI</span>
                        <span className="text-sm font-bold text-green-600">12.8%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <span className="text-sm font-medium">Market Growth</span>
                        <span className="text-sm font-bold text-blue-600">+18.5%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <span className="text-sm font-medium">Risk Level</span>
                        <span className="text-sm font-bold text-yellow-600">Medium</span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                      Compare Markets
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => handleDownloadPlans({ title: 'Financial Model Report' })}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download Plans
                </button>
                <button 
                  onClick={() => handle3DWalkthrough({ title: 'Financial Dashboard' })}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-3d-view-line mr-2"></i>
                  3D Walkthrough
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap">
                  <i className="ri-calculator-line mr-2"></i>
                  Custom Analysis
                </button>
              </div>
            </div>

            {/* Risk & Scenario Modeling */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-shield-check-line mr-3 text-red-600"></i>
                    Risk & Scenario Modeling
                  </h3>
                  <p className="text-gray-600">Monte Carlo simulations and What-if scenario analysis</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monte Carlo Simulations */}
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-dice-line mr-2 text-purple-600"></i>
                      Monte Carlo Simulations
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-purple-900">Simulation Results</span>
                          <span className="text-xs text-purple-700">10,000 iterations</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-600">25.8%</div>
                            <div className="text-xs text-gray-600">Best Case</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">18.5%</div>
                            <div className="text-xs text-gray-600">Most Likely</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-red-600">12.3%</div>
                            <div className="text-xs text-gray-600">Worst Case</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Risk Distribution</div>
                        <div className="space-y-2">
                          {[
                            { range: '> 20% ROI', probability: 35, color: 'bg-green-500' },
                            { range: '15-20% ROI', probability: 40, color: 'bg-blue-500' },
                            { range: '10-15% ROI', probability: 20, color: 'bg-yellow-500' },
                            { range: '< 10% ROI', probability: 5, color: 'bg-red-500' }
                          ].map((risk, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{risk.range}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`${risk.color} h-2 rounded-full`}
                                    style={{width: `${risk.probability}%`}}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium w-8 text-right">{risk.probability}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                          <div className="font-bold text-gray-900">85%</div>
                          <div className="text-xs text-gray-600">Confidence Level</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                          <div className="font-bold text-gray-900">AED 2.8M</div>
                          <div className="text-xs text-gray-600">Value at Risk</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        {[
                          { factor: 'Market Volatility', impact: 'High', severity: 65 },
                          { factor: 'Interest Rate Changes', impact: 'Medium', severity: 45 },
                          { factor: 'Vacancy Risk', impact: 'Medium', severity: 35 },
                          { factor: 'Property Maintenance', impact: 'Low', severity: 20 }
                        ].map((factor, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{factor.factor}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                factor.impact === 'High' ? 'bg-red-100 text-red-700' :
                                factor.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {factor.impact}
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-red-500 h-2 rounded-full"
                                  style={{width: `${factor.severity}%`}}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* What-if Scenario Modeling */}
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-settings-3-line mr-2 text-orange-600"></i>
                      What-if Scenario Modeling
                    </h4>
                    
                    <div className="space-y-6">
                      {/* Interactive Sliders */}
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-4">Interactive Variable Sliders</div>
                        <div className="space-y-4">
                          {[
                            { label: 'Rental Growth Rate', current: 3, min: 0, max: 8, unit: '%', impact: '+5.2% ROI' },
                            { label: 'Vacancy Rate', current: 5, min: 0, max: 15, unit: '%', impact: '-2.1% ROI' },
                            { label: 'Property Appreciation', current: 4, min: 0, max: 10, unit: '%', impact: '+3.8% ROI' },
                            { label: 'Interest Rate', current: 4.5, min: 2, max: 8, unit: '%', impact: '-1.5% ROI' }
                          ].map((slider, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">{slider.label}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-bold text-gray-900">{slider.current}{slider.unit}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    slider.impact.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                  }`}>
                                    {slider.impact}
                                  </span>
                                </div>
                              </div>
                              <div className="relative">
                                <input 
                                  type="range" 
                                  min={slider.min} 
                                  max={slider.max} 
                                  defaultValue={slider.current}
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>{slider.min}{slider.unit}</span>
                                  <span>{slider.max}{slider.unit}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Scenario Comparison */}
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Scenario Comparison</div>
                        <div className="space-y-2">
                          {[
                            { scenario: 'Current Settings', roi: '18.5%', npv: 'AED 1.2M', payback: '8.2 years', status: 'base' },
                            { scenario: 'Optimistic Market', roi: '24.7%', npv: 'AED 1.8M', payback: '6.5 years', status: 'good' },
                            { scenario: 'Conservative Market', roi: '14.2%', npv: 'AED 850K', payback: '10.8 years', status: 'cautious' },
                            { scenario: 'Stress Test', roi: '9.8%', npv: 'AED 420K', payback: '15.2 years', status: 'risk' }
                          ].map((scenario, index) => (
                            <div key={index} className={`p-3 rounded-lg border ${
                              scenario.status === 'base' ? 'bg-blue-50 border-blue-200' :
                              scenario.status === 'good' ? 'bg-green-50 border-green-200' :
                              scenario.status === 'cautious' ? 'bg-yellow-50 border-yellow-200' :
                              'bg-red-50 border-red-200'
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">{scenario.scenario}</span>
                                <span className={`text-sm font-bold ${
                                  scenario.status === 'base' ? 'text-blue-600' :
                                  scenario.status === 'good' ? 'text-green-600' :
                                  scenario.status === 'cautious' ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {scenario.roi}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">NPV:</span>
                                  <span className="font-medium">{scenario.npv}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Payback:</span>
                                  <span className="font-medium">{scenario.payback}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Risk Mitigation Strategies */}
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Risk Mitigation Strategies</div>
                        <div className="space-y-2">
                          {[
                            { strategy: 'Diversify Property Types', impact: 'Reduce portfolio risk by 25%', cost: 'Low', effectiveness: 85 },
                            { strategy: 'Long-term Lease Agreements', impact: 'Stabilize cash flow', cost: 'None', effectiveness: 75 },
                            { strategy: 'Insurance Coverage', impact: 'Protect against major losses', cost: 'Medium', effectiveness: 90 },
                            { strategy: 'Reserve Fund (6 months)', impact: 'Cover unexpected expenses', cost: 'High', effectiveness: 95 }
                          ].map((strategy, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">{strategy.strategy}</span>
                                <div className="flex items-center space-x-2">
                                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                    strategy.cost === 'Low' ? 'bg-green-100 text-green-700' :
                                    strategy.cost === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    strategy.cost === 'None' ? 'bg-blue-100 text-blue-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {strategy.cost} Cost
                                  </span>
                                  <div className="w-12 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-500 h-2 rounded-full"
                                      style={{width: `${strategy.effectiveness}%`}}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs text-gray-600">{strategy.impact}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-medium whitespace-nowrap">
                  <i className="ri-refresh-line mr-2"></i>
                  Run New Simulation
                </button>
                <button 
                  onClick={() => handleDownloadPlans({ title: 'Risk Analysis Report' })}
                  className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-download-line mr-2"></i>
                  Export Risk Report
                </button>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap">
                  <i className="ri-save-line mr-2"></i>
                  Save Scenarios
                </button>
              </div>
            </div>

            {/* Predictive Insights */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-crystal-ball-line mr-3 text-indigo-600"></i>
                    Predictive Insights
                  </h3>
                  <p className="text-gray-600">AI-powered 5-year market projections via time-series analysis</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Market Forecasting */}
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-line-chart-line mr-2 text-blue-600"></i>
                      5-Year Market Projections
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-indigo-600 mb-1">AED 4.8M</div>
                          <div className="text-sm text-gray-600">Projected Property Value (2029)</div>
                          <div className="text-xs text-green-600">+92% from current value</div>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {[
                            { year: '2025', value: '2.7M', growth: '+8%' },
                            { year: '2026', value: '3.1M', growth: '+15%' },
                            { year: '2027', value: '3.6M', growth: '+16%' },
                            { year: '2028', value: '4.2M', growth: '+17%' },
                            { year: '2029', value: '4.8M', growth: '+14%' }
                          ].map((projection, index) => (
                            <div key={index} className="text-center p-2 bg-white rounded text-xs">
                              <div className="font-bold text-gray-900">{projection.value}</div>
                              <div className="text-gray-600">{projection.year}</div>
                              <div className="text-green-600 text-xs">{projection.growth}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Market Trend Analysis</div>
                        <div className="space-y-3">
                          {[
                            { trend: 'Population Growth', impact: 'High', direction: 'up', projection: '+3.2% annually', confidence: 92 },
                            { trend: 'Tourism Recovery', impact: 'Very High', direction: 'up', projection: '+25% by 2026', confidence: 88 },
                            { trend: 'Infrastructure Development', impact: 'High', direction: 'up', projection: 'Metro expansion 2025', confidence: 95 },
                            { trend: 'Interest Rate Stability', impact: 'Medium', direction: 'stable', projection: '4-5% range', confidence: 75 }
                          ].map((trend, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <i className={`ri-arrow-${trend.direction === 'up' ? 'up' : trend.direction === 'down' ? 'down' : 'right'}-line text-${trend.direction === 'up' ? 'green' : trend.direction === 'down' ? 'red' : 'blue'}-600`}></i>
                                  <span className="text-sm font-medium text-gray-900">{trend.trend}</span>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  trend.impact === 'Very High' ? 'bg-purple-100 text-purple-700' :
                                  trend.impact === 'High' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {trend.impact}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{trend.projection}</span>
                                <div className="flex items-center space-x-1">
                                  <span className="text-gray-600">Confidence:</span>
                                  <span className="font-bold text-green-600">{trend.confidence}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Rental Yield Projections</div>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { period: 'Year 1', yield: '8.2%', income: 'AED 205K' },
                            { period: 'Year 2', yield: '8.8%', income: 'AED 245K' },
                            { period: 'Year 3', yield: '9.4%', income: 'AED 290K' },
                            { period: 'Year 5', yield: '10.1%', income: 'AED 385K' }
                          ].map((rental, index) => (
                            <div key={index} className="p-3 bg-green-50 rounded-lg text-center">
                              <div className="font-bold text-green-600">{rental.yield}</div>
                              <div className="text-xs text-gray-600">{rental.period}</div>
                              <div className="text-xs text-gray-700">{rental.income}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis & Exit Strategy */}
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-robot-line mr-2 text-purple-600"></i>
                      AI-Powered Analysis
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-purple-900 mb-2">Machine Learning Confidence</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center">
                            <div className="text-xl font-bold text-purple-600">94.2%</div>
                            <div className="text-xs text-gray-600">Model Accuracy</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-purple-600">12,500+</div>
                            <div className="text-xs text-gray-600">Data Points</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Algorithm Insights</div>
                        <div className="space-y-2">
                          {[
                            { insight: 'Seasonal Price Patterns', finding: 'Q1 shows 12% higher prices', confidence: 89 },
                            { insight: 'Correlation Analysis', finding: 'Metro proximity = +18% value', confidence: 95 },
                            { insight: 'Demand Forecasting', finding: 'Peak demand in 2026-2027', confidence: 87 },
                            { insight: 'Competition Analysis', finding: 'Supply gap of 15% in area', confidence: 92 }
                          ].map((insight, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">{insight.insight}</span>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                                  {insight.confidence}%
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">{insight.finding}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Risk-Adjusted Returns</div>
                        <div className="space-y-2">
                          {[
                            { metric: 'Sharpe Ratio', value: '1.45', status: 'Excellent' },
                            { metric: 'Volatility', value: '12.3%', status: 'Low' },
                            { metric: 'Max Drawdown', value: '-8.5%', status: 'Acceptable' },
                            { metric: 'Beta Coefficient', value: '0.73', status: 'Defensive' }
                          ].map((metric, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">{metric.metric}</span>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">{metric.value}</span>
                                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                  metric.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                                  metric.status === 'Low' || metric.status === 'Defensive' ? 'bg-blue-100 text-blue-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {metric.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-logout-circle-line mr-2 text-orange-600"></i>
                      Exit Strategy Planning
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Optimal Exit Windows</div>
                        <div className="space-y-2">
                          {[
                            { window: 'Year 3 (2027)', value: 'AED 3.6M', roi: '+44%', recommendation: 'Good', reason: 'Market peak expected' },
                            { window: 'Year 5 (2029)', value: 'AED 4.8M', roi: '+92%', recommendation: 'Optimal', reason: 'Maximum appreciation' },
                            { window: 'Year 7 (2031)', value: 'AED 5.4M', roi: '+116%', recommendation: 'Extended', reason: 'Long-term growth' }
                          ].map((exit, index) => (
                            <div key={index} className={`p-3 rounded-lg border ${
                              exit.recommendation === 'Optimal' ? 'bg-green-50 border-green-200' :
                              exit.recommendation === 'Good' ? 'bg-blue-50 border-blue-200' :
                              'bg-yellow-50 border-yellow-200'
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">{exit.window}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-gray-900">{exit.value}</span>
                                  <span className="text-green-600 font-bold">{exit.roi}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{exit.reason}</span>
                                <span className={`px-2 py-1 rounded-full font-bold ${
                                  exit.recommendation === 'Optimal' ? 'bg-green-100 text-green-700' :
                                  exit.recommendation === 'Good' ? 'bg-blue-100 text-blue-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {exit.recommendation}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-3">Exit Strategy Options</div>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { strategy: 'Direct Sale to End User', timeframe: '3-6 months', fees: '2-3%', liquidity: 'High' },
                            { strategy: 'Investor Sale', timeframe: '1-3 months', fees: '1-2%', liquidity: 'Very High' },
                            { strategy: 'Auction Sale', timeframe: '6-8 weeks', fees: '3-5%', liquidity: 'Guaranteed' },
                            { strategy: 'Partial Sale (Fractional)', timeframe: '2-4 months', fees: '4-6%', liquidity: 'Medium' }
                          ].map((strategy, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">{strategy.strategy}</span>
                                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                  strategy.liquidity === 'Very High' || strategy.liquidity === 'Guaranteed' ? 'bg-green-100 text-green-700' :
                                  strategy.liquidity === 'High' ? 'bg-blue-100 text-blue-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {strategy.liquidity}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs text-gray-600">
                                <span>Time: {strategy.timeframe}</span>
                                <span>Fees: {strategy.fees}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => handleDownloadPlans({ title: 'Predictive Analysis Report' })}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download Forecast
                </button>
                <button 
                  onClick={() => handle3DWalkthrough({ title: 'Interactive Projections' })}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-3d-view-line mr-2"></i>
                  3D Market View
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                  <i className="ri-calendar-line mr-2"></i>
                  Schedule Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'development' && (
          <div className="space-y-8">
            {/* Holistic Investment Planning */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-building-2-line mr-3 text-green-600"></i>
                    Holistic Investment Planning
                  </h2>
                  <p className="text-gray-600 mt-2">Comprehensive financial, commercial, engineering & architectural insights</p>
                </div>
                <button 
                  onClick={handleFeasibilityStudy}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-file-chart-line mr-2"></i>
                  Full Feasibility Study
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Project Overview</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                        <input
                          type="text"
                          placeholder="Marina Heights Development"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          placeholder="Dubai Marina, UAE"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget</label>
                          <input
                            type="text"
                            placeholder="AED 50M"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                          <input
                            type="text"
                            placeholder="36 months"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Financial Analysis</h3>
                    <p className="text-sm text-gray-700">ROI projections, cash flow modeling, financing options</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Commercial Intelligence</h3>
                    <p className="text-sm text-gray-700">Market demand analysis, pricing strategy, sales forecasting</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Engineering Assessment</h3>
                    <p className="text-sm text-gray-700">Structural feasibility, construction methodology, cost optimization</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Architectural Design</h3>
                    <p className="text-sm text-gray-700">Space optimization, aesthetic appeal, regulatory compliance</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-bold text-blue-800 mb-2">Financial Analysis</h4>
                    <p className="text-sm text-blue-700">ROI projections, cash flow modeling, financing options</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <h4 className="font-bold text-purple-800 mb-2">Commercial Intelligence</h4>
                    <p className="text-sm text-purple-700">Market demand analysis, pricing strategy, sales forecasting</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl">
                    <h4 className="font-bold text-orange-800 mb-2">Engineering Assessment</h4>
                    <p className="text-sm text-orange-700">Structural feasibility, construction methodology, cost optimization</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-bold text-green-800 mb-2">Architectural Design</h4>
                    <p className="text-sm text-green-700">Space optimization, aesthetic appeal, regulatory compliance</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-lightbulb-line mr-2"></i>
                  Integrated Development Approach
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-team-line text-green-600 text-2xl"></i>
                    </div>
                    <h5 className="font-bold text-green-900 mb-2">Cross-Functional Team</h5>
                    <p className="text-sm text-green-800">Our experts work together to ensure all aspects align perfectly</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-git-merge-line text-green-600 text-2xl"></i>
                    </div>
                    <h5 className="font-bold text-green-900 mb-2">Unified Strategy</h5>
                    <p className="text-sm text-green-800">Single comprehensive plan integrating all development aspects</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-rocket-line text-green-600 text-2xl"></i>
                    </div>
                    <h5 className="font-bold text-green-900 mb-2">Optimized Execution</h5>
                    <p className="text-sm text-green-800">Streamlined process reducing risks and maximizing returns</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market-Based Recommendations */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-compass-3-line mr-3 text-blue-600"></i>
                    Market Recommendations
                  </h2>
                  <p className="text-gray-600 mt-2">Optimal development areas, unit mix, and construction style guidance</p>
                </div>
                <button 
                  onClick={() => setShowMarketRecommendations(!showMarketRecommendations)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-lightbulb-line mr-2"></i>
                  Get Recommendations
                </button>
              </div>

              {showMarketRecommendations && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Optimal Areas</h3>
                    <div className="space-y-3">
                      {[
                        { area: 'Dubai Marina', score: 95, demand: 'Very High' },
                        { area: 'Downtown Dubai', score: 92, demand: 'High' },
                        { area: 'Business Bay', score: 88, demand: 'High' },
                        { area: 'JLT', score: 85, demand: 'Medium' }
                      ].map((area, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <div className="font-medium text-gray-900">{area.area}</div>
                            <div className="text-xs text-gray-600">Demand: {area.demand}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-blue-600">{area.score}%</div>
                            <div className="text-xs text-gray-600">AI Score</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Unit Mix Optimization</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">1 Bedroom</span>
                          <span className="text-sm font-bold text-purple-600">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '25%'}}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">2 Bedroom</span>
                          <span className="text-sm font-bold text-purple-600">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">3 Bedroom</span>
                          <span className="text-sm font-bold text-purple-600">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '30%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Construction Style</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-lg border border-green-200">
                        <div className="font-medium text-green-800 mb-1">Recommended: Modern Contemporary</div>
                        <div className="text-xs text-gray-600">High market appeal, premium pricing potential</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Market Appeal:</span>
                          <span className="font-bold text-green-600">95%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cost Efficiency:</span>
                          <span className="font-bold text-blue-600">88%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ROI Potential:</span>
                          <span className="font-bold text-purple-600">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Financial & Commercial Intelligence */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-money-dollar-circle-line mr-3 text-purple-600"></i>
                    Financial & Commercial Intelligence
                  </h2>
                  <p className="text-gray-600 mt-2">Data-backed pricing forecasts and pro-forma generation</p>
                </div>
                <button 
                  onClick={() => setShowFinancialIntelligence(!showFinancialIntelligence)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-bar-chart-box-line mr-2"></i>
                  Generate Intelligence
                </button>
              </div>

              {showFinancialIntelligence && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Pricing Forecast</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="text-center mb-3">
                          <div className="text-2xl font-bold text-purple-600">AED 1,850 /sq ft</div>
                          <div className="text-sm text-gray-600">Recommended Launch Price</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-green-600">AED 2,100</div>
                            <div className="text-gray-600">Year 3 Price</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-blue-600">13.5%</div>
                            <div className="text-gray-600">Annual Growth</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Market Comparable:</span>
                          <span className="font-medium">AED 1,780 /sq ft</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Premium Positioning:</span>
                          <span className="font-medium text-green-600">+3.9%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Absorption Rate:</span>
                          <span className="font-medium">85% in 18 months</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Pro-Forma Analysis</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white rounded-lg border text-center">
                          <div className="text-lg font-bold text-blue-600">AED 65M</div>
                          <div className="text-xs text-gray-600">Total Revenue</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border text-center">
                          <div className="text-lg font-bold text-green-600">AED 18M</div>
                          <div className="text-xs text-gray-600">Net Profit</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Construction Cost:</span>
                          <span className="font-medium">AED 35M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Land Cost:</span>
                          <span className="font-medium">AED 8M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Marketing & Sales:</span>
                          <span className="font-medium">AED 2.5M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Financing Cost:</span>
                          <span className="font-medium">AED 1.5M</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span className="text-gray-900">Net Margin:</span>
                          <span className="text-green-600">27.7%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Development Advisory Services */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-draft-line mr-3 text-orange-600"></i>
                    Development Advisory
                  </h2>
                  <p className="text-gray-600 mt-2">AI-generated blueprints and technical specifications</p>
                </div>
                <button 
                  onClick={() => setShowDevelopmentAdvisory(!showDevelopmentAdvisory)}
                  className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-pencil-ruler-2-line mr-2"></i>
                  Access Advisory
                </button>
              </div>

              {showDevelopmentAdvisory && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                      <h3 className="font-bold text-gray-900 mb-4">Land Use Optimization</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-white rounded-lg border text-center">
                            <div className="text-lg font-bold text-orange-600">85%</div>
                            <div className="text-xs text-gray-600">Plot Ratio</div>
                          </div>
                          <div className="p-3 bg-white rounded-lg border text-center">
                            <div className="text-lg font-bold text-green-600">15%</div>
                            <div className="text-xs text-gray-600">Green Space</div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Building Coverage:</span>
                            <span className="font-medium">65%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Parking Ratio:</span>
                            <span className="font-medium">1.5 per unit</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amenity Space:</span>
                            <span className="font-medium">20%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <h3 className="font-bold text-gray-900 mb-4">Technical Specifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-600 mr-2"></i>
                          Structural: Reinforced concrete frame
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-600 mr-2"></i>
                          Foundation: Pile foundation system
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-600 mr-2"></i>
                          MEP: Smart building systems
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-600 mr-2"></i>
                          Facade: Double-glazed curtain wall
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border border-gray-300">
                      <div className="text-center">
                        <i className="ri-building-line text-4xl text-gray-400 mb-2"></i>
                        <p className="text-gray-600 font-medium">AI-Generated Blueprint</p>
                        <p className="text-sm text-gray-500">3D visualization and floor plans</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors font-medium text-sm whitespace-nowrap">
                        <i className="ri-download-line mr-2"></i>
                        Download Plans
                      </button>
                      <button className="p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors font-medium text-sm whitespace-nowrap">
                        <i className="ri-3d-view mr-2"></i>
                        3D Walkthrough
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Project Management & Tracking */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <i className="ri-calendar-check-line mr-3 text-indigo-600"></i>
                    Project Management & Tracking
                  </h2>
                  <p className="text-gray-600 mt-2">Timeline and budget management with Gantt chart visualization</p>
                </div>
                <button 
                  onClick={() => setShowProjectTracking(!showProjectTracking)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-dashboard-3-line mr-2"></i>
                  Open Dashboard
                </button>
              </div>

              {showProjectTracking && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-blue-600">68%</div>
                      <div className="text-sm text-gray-600">Overall Progress</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">AED 32M</div>
                      <div className="text-sm text-gray-600">Budget Spent</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-orange-600">18</div>
                      <div className="text-sm text-gray-600">Months Remaining</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-purple-600">156</div>
                      <div className="text-sm text-gray-600">Units Sold</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                      <h3 className="font-bold text-gray-900 mb-4">Project Timeline (Gantt Chart)</h3>
                      <div className="space-y-3">
                        {[
                          { phase: 'Foundation', progress: 100, status: 'Completed', color: 'bg-green-500' },
                          { phase: 'Structure', progress: 85, status: 'In Progress', color: 'bg-blue-500' },
                          { phase: 'MEP Installation', progress: 45, status: 'In Progress', color: 'bg-yellow-500' },
                          { phase: 'Finishing', progress: 15, status: 'Starting', color: 'bg-orange-500' },
                          { phase: 'Handover', progress: 0, status: 'Pending', color: 'bg-gray-400' }
                        ].map((phase, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-900">{phase.phase}</span>
                              <span className="text-sm text-gray-600">{phase.status}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${phase.color}`}
                                style={{width: `${phase.progress}%`}}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{phase.progress}% Complete</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <h3 className="font-bold text-gray-900 mb-4">Financial Tracking</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-center mb-3">
                            <div className="text-2xl font-bold text-green-600">AED 32M</div>
                            <div className="text-sm text-gray-600">Total Spent (64%)</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{width: '64%'}}></div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Construction:</span>
                            <span className="font-medium">AED 24M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Materials:</span>
                            <span className="font-medium">AED 5.5M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Labor:</span>
                            <span className="font-medium">AED 2.5M</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-bold">
                            <span className="text-gray-900">Remaining:</span>
                            <span className="text-blue-600">AED 18M</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Sales Tracking</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-xl font-bold text-blue-600">156 / 200</div>
                        <div className="text-sm text-gray-600">Units Sold</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-xl font-bold text-green-600">AED 42M</div>
                        <div className="text-sm text-gray-600">Sales Revenue</div>
                        <div className="text-xs text-green-600 mt-1">65% of target</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-xl font-bold text-purple-600">AED 2.7M</div>
                        <div className="text-sm text-gray-600">Avg. Price/Unit</div>
                        <div className="text-xs text-purple-600 mt-1">+8% vs launch</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Asset Analyzer Modal */}
        {showAssetAnalyzer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Asset Analyzer - Deep Dive</h2>
                    <p className="text-green-100">Real-time valuation and comprehensive analysis</p>
                  </div>
                  <button
                    onClick={() => setShowAssetAnalyzer(false)}
                    className="text-white/80 hover:text-white p-2"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {opportunities.map((asset) => (
                    <div key={asset.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                         onClick={() => setSelectedAsset(asset)}>
                      <img src={asset.image} alt={asset.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">{asset.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{asset.location}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Growth Score</span>
                          <span className="font-semibold text-green-600">{asset.growthScore}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Risk Level</span>
                          <span className={`font-semibold text-sm ${
                            asset.riskLevel === 'Low' ? 'text-green-600' :
                            asset.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>{asset.riskLevel}</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm">
                        Analyze Asset
                      </button>
                    </div>
                  ))}
                </div>
                
                {selectedAsset && (
                  <div className="mt-8 border-t pt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Deep Analysis: {selectedAsset.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* SWOT Analysis */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">SWOT Analysis</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-green-700 mb-2">Strengths</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {selectedAsset.swotAnalysis.strengths.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start">
                                  <i className="ri-add-line text-green-600 mr-2 mt-0.5"></i>{item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-700 mb-2">Weaknesses</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {selectedAsset.swotAnalysis.weaknesses.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-start">
                                  <i className="ri-subtract-line text-red-600 mr-2 mt-0.5"></i>{item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Historical Performance */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Historical Performance</h4>
                        <div className="space-y-3">
                          {Object.entries(selectedAsset.historicalPerformance).map(([year, value]) => (
                            <div key={year} className="flex justify-between items-center">
                              <span className="text-gray-600">{year.replace('year', '')}</span>
                              <span className="font-semibold text-gray-900">
                                ${(value as number).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-3 bg-green-100 rounded-lg">
                          <div className="text-sm text-green-800">
                            <i className="ri-trending-up-line mr-2"></i>
                            5-Year Growth: +{(((selectedAsset.historicalPerformance.year2023 - selectedAsset.historicalPerformance.year2019) / selectedAsset.historicalPerformance.year2019) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Financial Modeling Modal */}
        {showFinancialModeling && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Advanced Financial Modeling</h2>
                    <p className="text-purple-100">ROI/IRR analysis with detailed breakdowns</p>
                  </div>
                  <button
                    onClick={() => setShowFinancialModeling(false)}
                    className="text-white/80 hover:text-white p-2"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Parameters */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Parameters</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Price: ${financialModelData.propertyPrice.toLocaleString()}
                        </label>
                        <input
                          type="range"
                          min="1000000"
                          max="20000000"
                          step="100000"
                          value={financialModelData.propertyPrice}
                          onChange={(e) => setFinancialModelData(prev => ({
                            ...prev,
                            propertyPrice: parseInt(e.target.value)
                          }))}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Down Payment: {financialModelData.downPayment}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          step="5"
                          value={financialModelData.downPayment}
                          onChange={(e) => setFinancialModelData(prev => ({
                            ...prev,
                            downPayment: parseInt(e.target.value)
                          }))}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Interest Rate: {financialModelData.interestRate}%
                        </label>
                        <input
                          type="range"
                          min="2"
                          max="8"
                          step="0.1"
                          value={financialModelData.interestRate}
                          onChange={(e) => setFinancialModelData(prev => ({
                            ...prev,
                            interestRate: parseFloat(e.target.value)
                          }))}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monthly Rental: ${financialModelData.rentalIncome.toLocaleString()}
                        </label>
                        <input
                          type="range"
                          min="10000"
                          max="100000"
                          step="1000"
                          value={financialModelData.rentalIncome}
                          onChange={(e) => setFinancialModelData(prev => ({
                            ...prev,
                            rentalIncome: parseInt(e.target.value)
                          }))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Financial Results */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Analysis Results</h3>
                    {(() => {
                      const results = calculateFinancialModel();
                      return (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Investment Summary</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">Total Investment</div>
                                <div className="text-lg font-bold text-blue-600">${parseInt(results.totalInvestment).toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Monthly Payment</div>
                                <div className="text-lg font-bold text-red-600">${parseInt(results.monthlyPayment).toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Annual Cash Flow</div>
                                <div className={`text-lg font-bold ${parseInt(results.cashFlow) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  ${parseInt(results.cashFlow).toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Cash-on-Cash ROI</div>
                                <div className={`text-lg font-bold ${parseFloat(results.cashOnCash) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {results.cashOnCash}%
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Annual Breakdown</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Gross Rental Income</span>
                                <span className="font-semibold text-green-600">${parseInt(results.grossRental).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Net Rental Income</span>
                                <span className="font-semibold text-green-600">${parseInt(results.netRental).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Annual Mortgage</span>
                                <span className="font-semibold text-red-600">-${parseInt(results.annualMortgage).toLocaleString()}</span>
                              </div>
                              <div className="border-t pt-2">
                                <div className="flex justify-between">
                                  <span className="font-semibold text-gray-900">Net Cash Flow</span>
                                  <span className={`font-bold ${parseInt(results.cashFlow) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ${parseInt(results.cashFlow).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Modeling Modal */}
        {showRiskModeling && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Risk & Scenario Modeling</h2>
                    <p className="text-orange-100">Monte Carlo simulations and sensitivity analysis</p>
                  </div>
                  <button
                    onClick={() => setShowRiskModeling(false)}
                    className="text-white/80 hover:text-white p-2"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {Object.entries(riskScenarios).map(([scenario, data]) => {
                    const results = calculateRiskScenario(data);
                    return (
                      <div key={scenario} className={`rounded-lg p-6 border-2 ${
                        scenario === 'bestCase' ? 'bg-green-50 border-green-200' :
                        scenario === 'baseCase' ? 'bg-blue-50 border-blue-200' :
                        'bg-red-50 border-red-200'
                      }`}>
                        <h3 className={`font-bold text-lg mb-4 ${
                          scenario === 'bestCase' ? 'text-green-800' :
                          scenario === 'baseCase' ? 'text-blue-800' :
                          'text-red-800'
                        }`}>
                          {scenario === 'bestCase' ? 'Best Case' :
                           scenario === 'baseCase' ? 'Base Case' : 'Worst Case'} Scenario
                        </h3>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-gray-600">Annual Growth</div>
                            <div className="font-semibold">{data.growth}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Monthly Rental</div>
                            <div className="font-semibold">${data.rental.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Vacancy Rate</div>
                            <div className="font-semibold">{data.vacancy}%</div>
                          </div>
                          <div className="border-t pt-3">
                            <div className="text-sm text-gray-600">10-Year ROI</div>
                            <div className={`text-xl font-bold ${
                              scenario === 'bestCase' ? 'text-green-600' :
                              scenario === 'baseCase' ? 'text-blue-600' :
                              'text-red-600'
                            }`}>
                              {results.roi}%
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Property Value (2034)</div>
                            <div className="font-semibold">${parseInt(results.futureValue).toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Monte Carlo Simulation Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">68%</div>
                      <div className="text-sm text-gray-600">Probability of Positive Returns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$847K</div>
                      <div className="text-sm text-gray-600">Expected 10-Year Profit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">±$234K</div>
                      <div className="text-sm text-gray-600">95% Confidence Interval</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">Medium</div>
                      <div className="text-sm text-gray-600">Overall Risk Level</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Predictive Insights Modal */}
        {showPredictiveInsights && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">AI Predictive Insights</h2>
                    <p className="text-pink-100">5-year market projections and exit strategies</p>
                  </div>
                  <button
                    onClick={() => setShowPredictiveInsights(false)}
                    className="text-white/80 hover:text-white p-2"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <i className="ri-crystal-ball-line text-4xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">5-Year AI Portfolio Forecast</h3>
                  <p className="text-gray-600 mb-6">Time-series analysis with confidence bands</p>
                  
                  <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">$18.9M</div>
                      <div className="text-sm text-gray-600">Current Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">$41.8M</div>
                      <div className="text-sm text-gray-600">2029 Forecast</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">87%</div>
                      <div className="text-sm text-gray-600">AI Confidence</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Market Projections by Region</h4>
                    <div className="space-y-4">
                      {[
                        { region: 'Dubai, UAE', growth: '+12.5% annually', confidence: 'High' },
                        { region: 'Istanbul, Turkey', growth: '+18.2% annually', confidence: 'Medium' },
                        { region: 'Erbil, Iraq', growth: '+22.1% annually', confidence: 'Medium' },
                        { region: 'Riyadh, Saudi Arabia', growth: '+15.8% annually', confidence: 'High' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-gray-700">{item.region}</span>
                          <div className="text-right">
                            <div className="font-semibold text-green-600">{item.growth}</div>
                            <div className="text-xs text-gray-500">{item.confidence} confidence</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Exit Strategy Recommendations</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <div className="font-semibold text-green-700">Optimal Exit: 2027-2028</div>
                        <div className="text-sm text-gray-600">Peak market cycle with maximum returns</div>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <div className="font-semibold text-blue-700">Portfolio Rebalancing: 2026</div>
                        <div className="text-sm text-gray-600">Shift from UAE to emerging markets</div>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <div className="font-semibold text-purple-700">Strategic Hold: Turkey Assets</div>
                        <div className="text-sm text-gray-600">Long-term growth potential through 2030</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Holistic Planning Modal */}
        {showHolisticPlanning && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Holistic Investment Planning</h2>
                    <p className="text-blue-100">360° unified project development strategy</p>
                  </div>
                  <button
                    onClick={() => setShowHolisticPlanning(false)}
                    className="text-white/80 hover:text-white p-2"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <i className="ri-funds-line text-3xl text-blue-600 mb-3"></i>
                    <h4 className="font-semibold text-gray-900 mb-2">Financial Analysis</h4>
                    <p className="text-sm text-gray-600">ROI projections, cash flow modeling, and financing structures</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <i className="ri-store-3-line text-3xl text-green-600 mb-3"></i>
                    <h4 className="font-semibold text-gray-900 mb-2">Commercial Intelligence</h4>
                    <p className="text-sm text-gray-600">Market demand analysis and competitive positioning</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <i className="ri-hammer-line text-3xl text-orange-600 mb-3"></i>
                    <h4 className="font-semibold text-gray-900 mb-2">Engineering Insights</h4>
                    <p className="text-sm text-gray-600">Construction feasibility and technical specifications</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <i className="ri-building-4-line text-3xl text-purple-600 mb-3"></i>
                    <h4 className="font-semibold text-gray-900 mb-2">Architectural Design</h4>
                    <p className="text-sm text-gray-600">Space optimization and aesthetic considerations</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Master Development Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Project Overview</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Investment</span>
                          <span className="font-semibold">${developmentProject.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timeline</span>
                          <span className="font-semibold">{developmentProject.timeline} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location</span>
                          <span className="font-semibold">{developmentProject.location}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Financial Projections</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected Revenue</span>
                          <span className="font-semibold text-green-600">${(developmentProject.budget * 1.4).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projected Profit</span>
                          <span className="font-semibold text-green-600">${(developmentProject.budget * 0.4).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ROI</span>
                          <span className="font-semibold text-green-600">40%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Recommendations Modal */}
        {showAIRecommendations && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <i className="ri-robot-line text-3xl"></i>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black">AI Portfolio Recommendations</h2>
                      <p className="text-blue-100">Personalized investment strategy optimization</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowAIRecommendations(false);
                      setAiRecommendationStep(1);
                      setIsProcessingAI(false);
                    }}
                    className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
                    <span>AI Analysis Progress</span>
                    <span>{aiRecommendationStep === 1 ? 'Processing...' : 'Complete'}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: aiRecommendationStep === 1 ? '45%' : '100%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 max-h-96 overflow-y-auto">
                {/* Step 1: AI Processing */}
                {aiRecommendationStep === 1 && (
                  <div className="text-center space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Analyzing Your Portfolio</h3>
                      <p className="text-gray-600">Advanced algorithms processing market data and portfolio optimization strategies</p>
                    </div>

                    {isProcessingAI && (
                      <>
                        <div className="flex justify-center">
                          <div className="w-32 h-32 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        </div>

                        <div className="space-y-4">
                          <div className="text-lg font-semibold text-purple-600">
                            {aiProcessingStep || 'Initializing AI analysis...'}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                            <div className="bg-blue-50 p-4 rounded-2xl">
                              <i className="ri-global-line text-blue-600 text-2xl mb-2"></i>
                              <div className="font-bold text-blue-900">Market Analysis</div>
                              <div className="text-blue-700">15 regions, 50+ indicators</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl">
                              <i className="ri-pie-chart-line text-green-600 text-2xl mb-2"></i>
                              <div className="font-bold text-green-900">Portfolio Optimization</div>
                              <div className="text-green-700">Risk-adjusted allocations</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-2xl">
                              <i className="ri-brain-line text-purple-600 text-2xl mb-2"></i>
                              <div className="font-bold text-purple-900">AI Recommendations</div>
                              <div className="text-purple-700">Strategic action plans</div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Step 2: AI Recommendations */}
                {aiRecommendationStep === 2 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-check-line text-white text-3xl"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized AI Recommendations</h3>
                      <p className="text-gray-600">Based on comprehensive analysis of your portfolio and market conditions</p>
                    </div>

                    {/* Portfolio Summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <i className="ri-dashboard-line mr-2"></i>
                        Portfolio Health Score
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-black text-green-600 mb-1">A+</div>
                          <div className="text-sm text-gray-600">Overall Grade</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-blue-600 mb-1">92%</div>
                          <div className="text-sm text-gray-600">AI Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-purple-600 mb-1">+3.2%</div>
                          <div className="text-sm text-gray-600">Potential ROI Boost</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-orange-600 mb-1">5</div>
                          <div className="text-sm text-gray-600">Action Items</div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations List */}
                    <div className="space-y-6">
                      {aiRecommendations.map((recommendation) => (
                        <div key={recommendation.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                recommendation.type === 'rebalance' ? 'bg-blue-100' :
                                recommendation.type === 'acquisition' ? 'bg-green-100' :
                                recommendation.type === 'optimization' ? 'bg-purple-100' :
                                recommendation.type === 'financing' ? 'bg-orange-100' : 'bg-gray-100'
                              }`}>
                                <i className={`${getRecommendationIcon(recommendation.type)} ${
                                  recommendation.type === 'rebalance' ? 'text-blue-600' :
                                  recommendation.type === 'acquisition' ? 'text-green-600' :
                                  recommendation.type === 'optimization' ? 'text-purple-600' :
                                  recommendation.type === 'financing' ? 'text-orange-600' : 'text-gray-600'
                                } text-xl`}></i>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{recommendation.title}</h4>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(recommendation.priority)}`}>
                                    {recommendation.priority.toUpperCase()} PRIORITY
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    <i className="ri-time-line mr-1"></i>
                                    {recommendation.timeframe}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">{recommendation.impact}</div>
                              <div className="text-sm text-gray-500">AI Confidence: {recommendation.confidence}%</div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4">{recommendation.description}</p>
                          
                          <div className="bg-gray-50 rounded-xl p-4 mb-4">
                            <h5 className="font-semibold text-gray-900 mb-2">AI Reasoning:</h5>
                            <p className="text-sm text-gray-700">{recommendation.reasoning}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Action Items:</h5>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {recommendation.actionItems.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <i className="ri-arrow-right-s-line text-blue-600 mt-0.5 mr-1 flex-shrink-0"></i>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Expected Outcome:</h5>
                              <p className="text-sm text-green-700 font-medium">{recommendation.expectedOutcome}</p>
                              <h5 className="font-semibold text-gray-900 mb-1 mt-3">Risk Mitigation:</h5>
                              <p className="text-sm text-gray-700">{recommendation.riskMitigation}</p>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-3">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                              Learn More
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                              Implement Strategy
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary Actions */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <i className="ri-rocket-line mr-2"></i>
                        Implementation Roadmap
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <i className="ri-timer-line text-red-600 text-xl"></i>
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-1">Immediate (30 days)</h5>
                          <p className="text-sm text-gray-600">2 high-priority actions</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <i className="ri-calendar-line text-yellow-600 text-xl"></i>
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-1">Short-term (3-6 months)</h5>
                          <p className="text-sm text-gray-600">2 medium-priority actions</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <i className="ri-line-chart-line text-green-600 text-xl"></i>
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-1">Long-term (6+ months)</h5>
                          <p className="text-sm text-gray-600">1 strategic initiative</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <i className="ri-shield-check-line mr-1"></i>
                  AI recommendations based on 10,000+ data points and market analysis
                </div>
                
                {aiRecommendationStep === 2 && (
                  <div className="flex space-x-3">
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-semibold">
                      <i className="ri-download-line mr-2"></i>
                      Download Report
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                      <i className="ri-calendar-line mr-2"></i>
                      Schedule Consultation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Opportunity Detail Modal */}
        {selectedOpportunity && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedOpportunity.title}</h2>
                  <p className="text-gray-600">{selectedOpportunity.location}</p>
                </div>
                <button
                  onClick={() => setSelectedOpportunity(null)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Property Image */}
                  <div>
                    <img 
                      src={selectedOpportunity.image}
                      alt={selectedOpportunity.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  {/* Key Metrics */}
                  <div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-gray-900 mb-2">{selectedOpportunity.price}</div>
                        <div className="flex items-center justify-center space-x-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            Growth Score: {selectedOpportunity.growthScore}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            AI Confidence: 94%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-600">{selectedOpportunity.roi}</div>
                          <div className="text-sm text-gray-600">Expected ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600">{selectedOpportunity.irr}</div>
                          <div className="text-sm text-gray-600">IRR</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-purple-600">{selectedOpportunity.rentalYield}</div>
                          <div className="text-sm text-gray-600">Rental Yield</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-orange-600">{selectedOpportunity.paybackPeriod}</div>
                          <div className="text-sm text-gray-600">Payback Period</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis Tabs */}
                <div className="border-b mb-6">
                  <div className="flex space-x-8">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'financials', label: 'Financials' },
                      { id: 'risks', label: 'Risk Analysis' },
                      { id: 'forecast', label: 'Forecast' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium"
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content - Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Unit Mix */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Unit Mix Breakdown</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedOpportunity.unitMix).map(([type, count]) => (
                        <div key={type} className="flex justify-between items-center">
                          <span className="text-gray-700 capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-semibold text-gray-900">{count} units</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market Analysis */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Market Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Demand Level</span>
                        <span className="font-semibold text-green-600">{selectedOpportunity.marketAnalysis.demand}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Competition</span>
                        <span className="font-semibold text-yellow-600">{selectedOpportunity.marketAnalysis.competition}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Price Appreciation</span>
                        <span className="font-semibold text-blue-600">{selectedOpportunity.marketAnalysis.priceAppreciation}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Rental Demand</span>
                        <span className="font-semibold text-green-600">{selectedOpportunity.marketAnalysis.rentalDemand}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Save to Watchlist
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Download Full Report
                  </button>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Investments;
