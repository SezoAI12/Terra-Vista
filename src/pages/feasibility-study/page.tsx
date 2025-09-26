
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

interface StudySection {
  id: string;
  title: string;
  icon: string;
  items: string[];
  color: string;
  bgColor: string;
}

interface PropertyDetails {
  propertyId: string;
  propertyName: string;
  location: string;
  propertyType: string;
  landSize: string;
  currentValue: string;
  investmentBudget: string;
  expectedROI: string;
  timeline: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  investmentGoals: string;
  specificConcerns: string;
}

const FeasibilityStudyPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string; name: string } | null>(null);
  const [currentView, setCurrentView] = useState<'overview' | 'request' | 'samples'>('overview');
  const [activeSection, setActiveSection] = useState('market');
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    propertyId: '',
    propertyName: '',
    location: '',
    propertyType: '',
    landSize: '',
    currentValue: '',
    investmentBudget: '',
    expectedROI: '',
    timeline: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    investmentGoals: '',
    specificConcerns: ''
  });

  // Load user data
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const studySections: StudySection[] = [
    {
      id: 'market',
      title: 'MARKET FEASIBILITY',
      icon: 'ri-bar-chart-line',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        'Property market analysis for specific location',
        'Demand assessment for property type',
        'Comparable property evaluation',
        'Pricing strategy and market positioning'
      ]
    },
    {
      id: 'technical',
      title: 'TECHNICAL FEASIBILITY',
      icon: 'ri-tools-line',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        'Property condition assessment',
        'Renovation/development potential analysis',
        'Infrastructure and utilities evaluation',
        'Construction timeline and feasibility'
      ]
    },
    {
      id: 'financial',
      title: 'FINANCIAL FEASIBILITY',
      icon: 'ri-money-dollar-circle-line',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: [
        'Investment cost breakdown analysis',
        'Revenue projections and rental yields',
        'Cash flow analysis and projections',
        'ROI, IRR, and NPV calculations',
        'Break-even analysis and payback period'
      ]
    },
    {
      id: 'regulatory',
      title: 'REGULATORY FEASIBILITY',
      icon: 'ri-government-line',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      items: [
        'Property ownership regulations',
        'Required permits and approvals',
        'Tax implications and obligations',
        'Legal compliance requirements'
      ]
    },
    {
      id: 'risk',
      title: 'RISK ANALYSIS',
      icon: 'ri-shield-check-line',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      items: [
        'Property-specific market risks',
        'Investment and liquidity risks',
        'Regulatory and legal risks',
        'Risk mitigation strategies'
      ]
    }
  ];

  const deliverables = [
    {
      icon: 'ri-file-text-line',
      title: 'Property-Specific Report (50+ pages)',
      description: 'Comprehensive analysis tailored to your specific property investment'
    },
    {
      icon: 'ri-presentation-line',
      title: 'Executive Investment Summary',
      description: 'Key findings and recommendations for stakeholders'
    },
    {
      icon: 'ri-file-excel-line',
      title: 'Financial Models & Calculators',
      description: 'Interactive Excel models with property-specific calculations'
    },
    {
      icon: 'ri-radar-line',
      title: 'Property Risk Assessment Matrix',
      description: 'Detailed risk evaluation specific to your investment'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Investment Recommendations',
      description: 'Actionable insights and strategic next steps'
    }
  ];

  const propertyTypes = [
    'Residential Apartment',
    'Residential Villa',
    'Commercial Office',
    'Retail Space',
    'Industrial Property',
    'Mixed-Use Development',
    'Land for Development',
    'Hospitality Property',
    'Warehouse/Logistics',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPropertyDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property feasibility study request:', propertyDetails);
    alert('Thank you for your property feasibility study request! Our team will analyze your specific investment opportunity and contact you within 24 hours with a detailed proposal.');
    setCurrentView('overview');
    setPropertyDetails({
      propertyId: '',
      propertyName: '',
      location: '',
      propertyType: '',
      landSize: '',
      currentValue: '',
      investmentBudget: '',
      expectedROI: '',
      timeline: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientCompany: '',
      investmentGoals: '',
      specificConcerns: ''
    });
  };

  const sampleProperties = [
    {
      title: 'Marina Heights Luxury Apartment',
      location: 'Dubai Marina, UAE',
      type: 'Residential - 3BR Apartment',
      size: '2,150 sqft',
      currentValue: 'AED 2.8M',
      investment: 'AED 3.2M (with renovation)',
      projectedROI: '22.5% annually',
      timeline: '18 months analysis period',
      image: 'https://readdy.ai/api/search-image?query=Dubai%20Marina%20luxury%20apartment%20interior%20modern%20design%20high-end%20finishes%20floor-to-ceiling%20windows%20sea%20view%2C%20professional%20real%20estate%20photography&width=400&height=250&seq=40&orientation=landscape'
    },
    {
      title: 'Maslak Business Center Office',
      location: 'Maslak, Istanbul, Turkey',
      type: 'Commercial Office Space',
      size: '4,500 sqm',
      currentValue: 'USD 1.2M',
      investment: 'USD 1.8M (full acquisition)',
      projectedROI: '18.8% annually',
      timeline: '24 months analysis period',
      image: 'https://readdy.ai/api/search-image?query=Istanbul%20Maslak%20modern%20office%20building%20commercial%20space%20corporate%20interior%20glass%20facades%20business%20district%2C%20professional%20photography&width=400&height=250&seq=41&orientation=landscape'
    },
    {
      title: 'King Fahd Road Retail Complex',
      location: 'Riyadh, Saudi Arabia',
      type: 'Retail & Commercial',
      size: '8,200 sqm',
      currentValue: 'SAR 15M',
      investment: 'SAR 22M (development)',
      projectedROI: '20.2% annually',
      timeline: '36 months analysis period',
      image: 'https://readdy.ai/api/search-image?query=Riyadh%20modern%20retail%20complex%20shopping%20center%20King%20Fahd%20Road%20contemporary%20architecture%20Saudi%20Arabia%20commercial%20development%2C%20professional%20photography&width=400&height=250&seq=42&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={currentUser?.role} userName={currentUser?.name} />

      {/* Fixed Navigation Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">Property Feasibility Study</h1>
              <nav className="flex space-x-1">
                <button
                  onClick={() => setCurrentView('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'overview'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <i className="ri-eye-line mr-2"></i>Overview
                </button>
                <button
                  onClick={() => setCurrentView('request')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'request'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <i className="ri-file-add-line mr-2"></i>Request Study
                </button>
                <button
                  onClick={() => setCurrentView('samples')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'samples'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <i className="ri-folder-line mr-2"></i>Sample Studies
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <i className="ri-time-line mr-1"></i>2-3 weeks delivery
              </div>
              <div className="text-sm font-semibold text-green-600">
                <i className="ri-money-dollar-circle-line mr-1"></i>From AED 25,000
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview View */}
        {currentView === 'overview' && (
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mb-6">
                <i className="ri-building-line mr-2"></i>
                Property Investment Analysis
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
                📊 Property-Specific
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Feasibility Study
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Get comprehensive feasibility analysis for your specific property investment opportunity. 
                Our detailed studies help you make informed decisions with confidence.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setCurrentView('request')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg transition-all font-bold text-lg"
                >
                  <i className="ri-building-line mr-2"></i>
                  Analyze My Property
                </button>
                <button
                  onClick={() => setCurrentView('samples')}
                  className="bg-white text-gray-700 px-8 py-4 rounded-2xl border border-gray-300 hover:bg-gray-50 transition-all font-bold text-lg"
                >
                  <i className="ri-eye-line mr-2"></i>
                  View Sample Studies
                </button>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-time-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">2-3 Weeks</h3>
                <p className="text-gray-600">Analysis Duration</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-money-dollar-circle-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AED 25,000+</h3>
                <p className="text-gray-600">Starting Investment</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-file-list-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">50+ Pages</h3>
                <p className="text-gray-600">Detailed Report</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-award-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
                <p className="text-gray-600">Accuracy Rate</p>
              </div>
            </div>

            {/* Analysis Sections */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🏗️ Property Analysis Includes</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Comprehensive analysis across five critical dimensions for your specific property investment
                </p>
              </div>

              {/* Section Navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {studySections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                      activeSection === section.id
                        ? `${section.bgColor} ${section.color} shadow-lg`
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <i className={`${section.icon} mr-2`}></i>
                    {section.title}
                  </button>
                ))}
              </div>

              {/* Active Section Content */}
              <div className="bg-white rounded-2xl shadow-lg border p-8">
                {studySections.map((section) => (
                  activeSection === section.id && (
                    <div key={section.id} className="space-y-6">
                      <div className="text-center">
                        <div className={`w-20 h-20 ${section.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                          <i className={`${section.icon} ${section.color} text-3xl`}></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.items.map((item, index) => (
                          <div key={index} className={`${section.bgColor} rounded-xl p-4 border-l-4 border-${section.color.replace('text-', '').replace('-600', '-500')}`}>
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 ${section.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-lg flex items-center justify-center mt-1 flex-shrink-0`}>
                                <i className={`ri-check-line ${section.color} text-sm`}></i>
                              </div>
                              <span className="font-medium text-gray-900">{item}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Deliverables Section */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">📋 What You'll Receive</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Comprehensive documentation and analysis tools specific to your property investment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {deliverables.map((deliverable, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className={`${deliverable.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{deliverable.title}</h3>
                    <p className="text-gray-600 text-sm">{deliverable.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Analyze Your Property?</h2>
                <p className="text-xl text-blue-100 mb-8">
                  Get started with our comprehensive property feasibility study
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <i className="ri-mail-line text-white text-xl"></i>
                    </div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-blue-100">feasibility@terravista.ai</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <i className="ri-phone-line text-white text-xl"></i>
                    </div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-blue-100">+971 4 123 4567</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <i className="ri-time-line text-white text-xl"></i>
                    </div>
                    <h3 className="font-bold mb-1">Response Time</h3>
                    <p className="text-blue-100">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setCurrentView('request')}
                    className="bg-white text-blue-600 px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all font-bold text-lg"
                  >
                    <i className="ri-building-line mr-2"></i>
                    Start Analysis Now
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-white/20 text-white px-8 py-4 rounded-2xl hover:bg-white/30 transition-all font-bold text-lg border border-white/30"
                  >
                    <i className="ri-chat-3-line mr-2"></i>
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Request Study View */}
        {currentView === 'request' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <i className="ri-building-line text-3xl"></i>
                  </div>
                  <h2 className="text-3xl font-black mb-2">Property Feasibility Study Request</h2>
                  <p className="text-blue-100">Provide your property details for a comprehensive analysis</p>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={handleSubmitRequest} className="space-y-8">
                  {/* Property Information */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-building-2-line mr-3 text-blue-600"></i>
                      Property Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property ID/Reference (if any)</label>
                        <input
                          type="text"
                          name="propertyId"
                          value={propertyDetails.propertyId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Property listing ID or reference"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Name/Description *</label>
                        <input
                          type="text"
                          name="propertyName"
                          value={propertyDetails.propertyName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Marina Heights Tower 3BR Apt"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Location *</label>
                        <input
                          type="text"
                          name="location"
                          value={propertyDetails.location}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Full address or area, City, Country"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                        <select
                          name="propertyType"
                          value={propertyDetails.propertyType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                        >
                          <option value="">Select property type</option>
                          {propertyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Size</label>
                        <input
                          type="text"
                          name="landSize"
                          value={propertyDetails.landSize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 2,150 sqft or 1,500 sqm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Market Value</label>
                        <input
                          type="text"
                          name="currentValue"
                          value={propertyDetails.currentValue}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., AED 2.8M or USD 750K"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Investment Details */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-money-dollar-circle-line mr-3 text-green-600"></i>
                      Investment Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Investment Budget *</label>
                        <input
                          type="text"
                          name="investmentBudget"
                          value={propertyDetails.investmentBudget}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Including purchase + renovation costs"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expected ROI Target</label>
                        <input
                          type="text"
                          name="expectedROI"
                          value={propertyDetails.expectedROI}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 15% annually"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Timeline</label>
                      <input
                        type="text"
                        name="timeline"
                        value={propertyDetails.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 5 years hold period"
                      />
                    </div>
                  </div>

                  {/* Client Information */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-user-line mr-3 text-purple-600"></i>
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="clientName"
                          value={propertyDetails.clientName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="clientEmail"
                          value={propertyDetails.clientEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="clientPhone"
                          value={propertyDetails.clientPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+971 50 123 4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
                        <input
                          type="text"
                          name="clientCompany"
                          value={propertyDetails.clientCompany}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Company name (optional)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Investment Goals & Concerns */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="ri-target-line mr-3 text-orange-600"></i>
                      Investment Goals & Concerns
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Investment Goals & Objectives</label>
                        <textarea
                          name="investmentGoals"
                          value={propertyDetails.investmentGoals}
                          onChange={handleInputChange}
                          rows={4}
                          maxLength={500}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="What do you hope to achieve with this property investment? (rental income, capital appreciation, portfolio diversification, etc.)"
                        ></textarea>
                        <p className="text-sm text-gray-500 mt-1">{propertyDetails.investmentGoals.length}/500 characters</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specific Concerns or Focus Areas</label>
                        <textarea
                          name="specificConcerns"
                          value={propertyDetails.specificConcerns}
                          onChange={handleInputChange}
                          rows={4}
                          maxLength={500}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="Any specific concerns about this property investment or areas you'd like us to focus on in the analysis?"
                        ></textarea>
                        <p className="text-sm text-gray-500 mt-1">{propertyDetails.specificConcerns.length}/500 characters</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                      <i className="ri-price-tag-3-line mr-2"></i>
                      Study Investment & Timeline
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="font-bold text-blue-600 text-2xl">AED 25,000+</div>
                        <div className="text-blue-800 font-medium">Starting Price</div>
                        <div className="text-blue-700 text-sm mt-1">Based on property complexity</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600 text-2xl">2-3 Weeks</div>
                        <div className="text-blue-800 font-medium">Delivery Time</div>
                        <div className="text-blue-700 text-sm mt-1">Comprehensive analysis</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600 text-2xl">30 Days</div>
                        <div className="text-blue-800 font-medium">Support Period</div>
                        <div className="text-blue-700 text-sm mt-1">Post-delivery consultation</div>
                      </div>
                    </div>
                    <p className="text-blue-800 text-sm mt-4 text-center">
                      Final pricing will be customized based on property complexity, location, and specific analysis requirements.
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentView('overview')}
                      className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                    >
                      <i className="ri-arrow-left-line mr-2"></i>
                      Back to Overview
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                    >
                      <i className="ri-send-plane-line mr-2"></i>
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Sample Studies View */}
        {currentView === 'samples' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sample Property Studies</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Examples of comprehensive feasibility studies we've completed for various property investments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleProperties.map((property, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <i className="ri-map-pin-line mr-2"></i>
                      {property.location}
                    </p>
                    
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-gray-900">{property.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium text-gray-900">{property.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Value:</span>
                        <span className="font-medium text-gray-900">{property.currentValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Investment:</span>
                        <span className="font-medium text-gray-900">{property.investment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Projected ROI:</span>
                        <span className="font-bold text-green-600">{property.projectedROI}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Analysis Period:</span>
                        <span className="font-medium text-gray-900">{property.timeline}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                        <i className="ri-download-line mr-2"></i>
                        Download Study Sample
                      </button>
                      <button 
                        onClick={() => setCurrentView('request')}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium"
                      >
                        <i className="ri-file-add-line mr-2"></i>
                        Request Similar Study
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentView('request')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg transition-all font-bold text-lg"
              >
                <i className="ri-building-line mr-2"></i>
                Start Your Property Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeasibilityStudyPage;
