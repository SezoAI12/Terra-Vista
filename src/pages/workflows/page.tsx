import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'completed' | 'active' | 'pending';
  tools?: string[];
}

interface UserWorkflow {
  role: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}

const Workflows: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'agency' | 'investor'>('buyer');

  const workflows: Record<string, UserWorkflow> = {
    buyer: {
      role: 'Buyer',
      title: 'Smart Property Discovery Journey',
      description: 'AI-guided process from search to closing',
      steps: [
        {
          id: 1,
          title: 'AI-Powered Search',
          description: 'Use natural language to describe your ideal property. Our AI understands context and preferences.',
          icon: 'ri-search-line',
          status: 'completed',
          tools: ['Smart Filters', 'NLP Search', 'Personalized Recommendations']
        },
        {
          id: 2,
          title: 'Property Analysis',
          description: 'Compare properties with AI insights, neighborhood scoring, and market analysis.',
          icon: 'ri-bar-chart-line',
          status: 'active',
          tools: ['Property Comparison', 'SWOT Analysis', 'Neighborhood Insights']
        },
        {
          id: 3,
          title: 'Valuation & Reports',
          description: 'Request detailed valuation reports and market analysis from our AI engine.',
          icon: 'ri-file-chart-line',
          status: 'pending',
          tools: ['AI Valuation', 'Market Reports', 'Investment Analysis']
        },
        {
          id: 4,
          title: 'Affordability Check',
          description: 'Calculate affordability with mortgage integration and financial planning tools.',
          icon: 'ri-calculator-line',
          status: 'pending',
          tools: ['Affordability Calculator', 'Mortgage Integration', 'Payment Planning']
        },
        {
          id: 5,
          title: 'Contact & Negotiate',
          description: 'Connect with sellers through secure messaging and schedule viewings.',
          icon: 'ri-chat-3-line',
          status: 'pending',
          tools: ['Secure Messaging', 'Video Calls', 'Appointment Scheduling']
        }
      ]
    },
    seller: {
      role: 'Seller',
      title: 'Smart Listing Management',
      description: 'From listing creation to lead conversion',
      steps: [
        {
          id: 1,
          title: 'Create Smart Listing',
          description: 'Upload property details and photos. AI generates optimized descriptions and tags.',
          icon: 'ri-home-line',
          status: 'completed',
          tools: ['AI Descriptions', 'Photo Analysis', 'Auto-tagging']
        },
        {
          id: 2,
          title: 'AI Pricing Strategy',
          description: 'Get AI-powered pricing recommendations based on market analysis and comparable properties.',
          icon: 'ri-price-tag-line',
          status: 'active',
          tools: ['AI Pricing', 'Market Analysis', 'Comparable Properties']
        },
        {
          id: 3,
          title: 'Social Media Marketing',
          description: 'Generate and publish social media content automatically across platforms.',
          icon: 'ri-share-line',
          status: 'pending',
          tools: ['Content Generation', 'Multi-platform Publishing', 'Performance Tracking']
        },
        {
          id: 4,
          title: 'Lead Management',
          description: 'Track inquiries, manage leads, and monitor listing performance analytics.',
          icon: 'ri-user-line',
          status: 'pending',
          tools: ['Lead Tracking', 'Performance Analytics', 'Inquiry Management']
        },
        {
          id: 5,
          title: 'Closing Support',
          description: 'Receive AI assistance for negotiations and transaction support.',
          icon: 'ri-handshake-line',
          status: 'pending',
          tools: ['Negotiation Support', 'Transaction Tracking', 'Document Management']
        }
      ]
    },
    agency: {
      role: 'Agency',
      title: 'Multi-Agent Team Management',
      description: 'Comprehensive CRM and team collaboration',
      steps: [
        {
          id: 1,
          title: 'Bulk Property Upload',
          description: 'Upload multiple properties at once with automated processing and optimization.',
          icon: 'ri-upload-cloud-line',
          status: 'completed',
          tools: ['Bulk Upload', 'Automated Processing', 'Data Validation']
        },
        {
          id: 2,
          title: 'Team Dashboard',
          description: 'Manage multiple agents with role-based access and performance tracking.',
          icon: 'ri-team-line',
          status: 'active',
          tools: ['Multi-agent Dashboard', 'Role Management', 'Performance Metrics']
        },
        {
          id: 3,
          title: 'Client CRM',
          description: 'Advanced CRM system with client relationship management and communication tools.',
          icon: 'ri-contacts-line',
          status: 'pending',
          tools: ['CRM System', 'Client Management', 'Communication Hub']
        },
        {
          id: 4,
          title: 'Branded Reports',
          description: 'Generate white-labeled reports for clients with your agency branding.',
          icon: 'ri-file-list-line',
          status: 'pending',
          tools: ['White-label Reports', 'Custom Branding', 'Client Delivery']
        },
        {
          id: 5,
          title: 'Team Collaboration',
          description: 'Coordinate team activities, share leads, and collaborate on deals.',
          icon: 'ri-group-line',
          status: 'pending',
          tools: ['Team Coordination', 'Lead Sharing', 'Deal Collaboration']
        }
      ]
    },
    investor: {
      role: 'Investor',
      title: 'Investment Discovery & Portfolio Management',
      description: 'AI-powered investment analysis and optimization',
      steps: [
        {
          id: 1,
          title: 'Opportunity Discovery',
          description: 'AI curates investment opportunities with growth scores and potential analysis.',
          icon: 'ri-lightbulb-line',
          status: 'completed',
          tools: ['AI Curation', 'Growth Scoring', 'Opportunity Analysis']
        },
        {
          id: 2,
          title: 'Investment Simulation',
          description: 'Run detailed IRR/ROI calculations with scenario modeling and risk analysis.',
          icon: 'ri-line-chart-line',
          status: 'active',
          tools: ['IRR/ROI Calculators', 'Scenario Modeling', 'Risk Assessment']
        },
        {
          id: 3,
          title: 'Market Forecasting',
          description: 'Access AI-powered market predictions and trend analysis for informed decisions.',
          icon: 'ri-forecast-line',
          status: 'pending',
          tools: ['Market Predictions', 'Trend Analysis', 'Forecasting Models']
        },
        {
          id: 4,
          title: 'Portfolio Optimization',
          description: 'Add properties to portfolio and receive optimization recommendations.',
          icon: 'ri-pie-chart-line',
          status: 'pending',
          tools: ['Portfolio Tracker', 'Asset Allocation', 'Optimization Advice']
        },
        {
          id: 5,
          title: 'Export & Reports',
          description: 'Generate comprehensive investment reports for stakeholders and partners.',
          icon: 'ri-download-line',
          status: 'pending',
          tools: ['Report Generation', 'Export Options', 'Stakeholder Sharing']
        }
      ]
    }
  };

  const currentWorkflow = workflows[selectedRole];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'ri-check-line text-green-600';
      case 'active': return 'ri-play-line text-blue-600';
      case 'pending': return 'ri-time-line text-gray-400';
      default: return 'ri-time-line text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="Buyer" userName="Guest" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">User Workflows & Journeys</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamlined processes designed for each user role with AI-powered automation
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-sm border">
            <div className="flex space-x-1">
              {Object.keys(workflows).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role as any)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
                    selectedRole === role
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${
                    role === 'buyer' ? 'ri-user-line' :
                    role === 'seller' ? 'ri-home-line' :
                    role === 'agency' ? 'ri-building-line' : 'ri-line-chart-line'
                  } mr-2`}></i>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Overview */}
        <div className="bg-white rounded-2xl shadow-lg border p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentWorkflow.title}</h2>
            <p className="text-gray-600 text-lg">{currentWorkflow.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Workflow Progress</span>
              <span className="text-sm text-gray-500">
                {currentWorkflow.steps.filter(step => step.status === 'completed').length} of {currentWorkflow.steps.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                style={{ 
                  width: `${(currentWorkflow.steps.filter(step => step.status === 'completed').length / currentWorkflow.steps.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-6">
            {currentWorkflow.steps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-6">
                {/* Step Number & Status */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(step.status)}`}>
                    <i className={getStepIcon(step.status)}></i>
                  </div>
                  {index < currentWorkflow.steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                      <i className={`${step.icon} text-2xl text-blue-600`}></i>
                    </div>

                    {step.tools && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Tools & Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {step.tools.map((tool, toolIndex) => (
                            <span 
                              key={toolIndex}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex space-x-3">
                      {step.status === 'active' && (
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium whitespace-nowrap">
                          Continue Step
                        </button>
                      )}
                      {step.status === 'completed' && (
                        <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium whitespace-nowrap">
                          <i className="ri-check-line mr-2"></i>Completed
                        </button>
                      )}
                      {step.status === 'pending' && (
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap">
                          Start Step
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Automation Features */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">AI Automation in Every Step</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-robot-line text-2xl text-blue-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h4>
              <p className="text-sm text-gray-600">AI learns from your preferences and behavior to provide personalized suggestions</p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-magic-line text-2xl text-green-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Automated Tasks</h4>
              <p className="text-sm text-gray-600">Reduce manual work with automated data entry, content generation, and reporting</p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-notification-line text-2xl text-purple-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Alerts</h4>
              <p className="text-sm text-gray-600">Get notified about market changes, opportunities, and important updates</p>
            </div>
          </div>
        </div>

        {/* Future Enhancements Preview */}
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Coming Soon: Future Enhancements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
              <i className="ri-virtual-reality-line text-4xl text-blue-500 mb-4"></i>
              <h4 className="font-semibold text-gray-900 mb-2">VR/AR Property Tours</h4>
              <p className="text-sm text-gray-600">Immersive virtual property viewings and augmented reality features</p>
            </div>
            
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
              <i className="ri-bank-line text-4xl text-green-500 mb-4"></i>
              <h4 className="font-semibold text-gray-900 mb-2">Mortgage Integration</h4>
              <p className="text-sm text-gray-600">Direct integration with banks for seamless financing options</p>
            </div>
            
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
              <i className="ri-game-line text-4xl text-purple-500 mb-4"></i>
              <h4 className="font-semibold text-gray-900 mb-2">Gamified Rewards</h4>
              <p className="text-sm text-gray-600">Loyalty programs and gamification for user engagement</p>
            </div>
            
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
              <i className="ri-video-line text-4xl text-red-500 mb-4"></i>
              <h4 className="font-semibold text-gray-900 mb-2">AI Video Editing</h4>
              <p className="text-sm text-gray-600">Automated video creation and editing for property marketing</p>
            </div>
            
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
              <i className="ri-code-line text-4xl text-orange-500 mb-4"></i>
              <h4 className="font-semibold text-gray-900 mb-2">API Marketplace</h4>
              <p className="text-sm text-gray-600">Partner ecosystem with third-party integrations and APIs</p>
            </div>
            
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
              <i className="ri-global-line text-4xl text-teal-500 mb-4"></i>
              <h4 className="font-semibold text-gray-900 mb-2">Global Expansion</h4>
              <p className="text-sm text-gray-600">Extended coverage to more regions and markets worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflows;