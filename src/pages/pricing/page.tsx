import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  roleSpecific?: string[];
}

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedRole, setSelectedRole] = useState<'all' | 'buyer' | 'seller' | 'agency' | 'investor'>('all');

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for exploring TerraVista\'s basic features',
      features: [
        'Basic property search',
        'Limited property listings (10/month)',
        'Basic market insights',
        'Community support',
        '1 valuation report/month',
        'Basic property comparisons'
      ],
      roleSpecific: ['buyer', 'seller']
    },
    {
      id: 'pro',
      name: 'Pro', 
      price: billingCycle === 'monthly' ? '$49' : '$39',
      period: '/month',
      description: 'Enhanced analytics and SWOT analysis for serious users',
      features: [
        'Unlimited property search',
        'Advanced AI-powered filters',
        'SWOT analysis for all properties',
        'Market trend analytics',
        'Unlimited valuation reports',
        'Property comparison tools',
        'Basic social media automation',
        'Email support',
        'Mobile app access',
        'Export to PDF/Excel'
      ],
      recommended: true,
      roleSpecific: ['buyer', 'seller', 'agency']
    },
    {
      id: 'elite',
      name: 'Elite',
      price: billingCycle === 'monthly' ? '$149' : '$119',
      period: '/month', 
      description: 'Complete investor toolkit with forecasting and AI reports',
      features: [
        'Everything in Pro',
        'AI investment forecasting',
        'Portfolio optimization tools',
        'Risk assessment dashboard',
        'Advanced market predictions',
        'Custom AI reports generation',
        'Multi-currency analysis',
        'Cross-border investment tools',
        'Priority support',
        'API access (basic)',
        'White-label reports',
        'Advanced social media automation'
      ],
      roleSpecific: ['investor', 'agency']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large agencies and institutions',
      features: [
        'Everything in Elite',
        'Unlimited API access',
        'Custom AI model training',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced CRM tools',
        'Team collaboration features',
        'Custom branding',
        'SLA guarantees',
        'On-premise deployment options',
        'Advanced analytics dashboard',
        'Featured listing promotions'
      ],
      roleSpecific: ['agency']
    }
  ];

  const roleSpecificFeatures = {
    buyer: [
      'Smart property recommendations',
      'Affordability calculators',
      'Mortgage integration',
      'Neighborhood scoring'
    ],
    seller: [
      'Listing optimization',
      'AI pricing suggestions', 
      'Lead tracking',
      'Performance analytics'
    ],
    agency: [
      'Multi-agent dashboards',
      'Client CRM system',
      'Bulk property management',
      'Team collaboration tools'
    ],
    investor: [
      'Portfolio management',
      'Investment simulations',
      'Risk analysis tools',
      'Market forecasting'
    ]
  };

  const addOnServices = [
    {
      name: 'Featured Listings',
      price: '$25',
      period: '/listing/month',
      description: 'Boost visibility with premium placement'
    },
    {
      name: 'Social Media Ads',
      price: '$99',
      period: '/month',
      description: 'AI-managed advertising campaigns'
    },
    {
      name: 'Data API Access',
      price: '$199',
      period: '/month',
      description: 'Access to market data via API'
    },
    {
      name: 'Custom Reports',
      price: '$49',
      period: '/report',
      description: 'Professional branded reports'
    }
  ];

  const filteredPlans = selectedRole === 'all' 
    ? plans 
    : plans.filter(plan => !plan.roleSpecific || plan.roleSpecific.includes(selectedRole));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="Buyer" userName="Guest" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your TerraVista Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered real estate tools designed for every role. Start free and upgrade as you grow.
          </p>
        </div>

        {/* Role Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-sm border">
            <div className="flex space-x-1">
              {[
                { key: 'all', label: 'All Plans' },
                { key: 'buyer', label: 'Buyer' },
                { key: 'seller', label: 'Seller' },
                { key: 'agency', label: 'Agency' },
                { key: 'investor', label: 'Investor' }
              ].map(role => (
                <button
                  key={role.key}
                  onClick={() => setSelectedRole(role.key as any)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    selectedRole === role.key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-sm border">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                  billingCycle === 'annual'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Annual
                <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg border-2 p-8 relative ${
                plan.recommended 
                  ? 'border-blue-500 transform scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-3 mt-0.5"></i>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-lg font-medium whitespace-nowrap ${
                plan.recommended
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        {/* Role-Specific Features */}
        {selectedRole !== 'all' && (
          <div className="bg-white rounded-2xl shadow-lg border p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Features Designed for {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}s
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roleSpecificFeatures[selectedRole as keyof typeof roleSpecificFeatures]?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <i className="ri-star-line text-blue-600"></i>
                  <span className="font-medium text-gray-900">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add-on Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Add-on Services</h3>
            <p className="text-gray-600">Enhance your plan with additional revenue-generating features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOnServices.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{addon.name}</h4>
                <div className="text-2xl font-bold text-blue-600 mb-3">
                  {addon.price}<span className="text-sm text-gray-600">{addon.period}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{addon.description}</p>
                <button className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 font-medium whitespace-nowrap">
                  Add to Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Integration Features */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced AI</h3>
            <p className="text-gray-600">Industry-leading AI integrations for maximum accuracy and insights</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-brain-line text-2xl text-green-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Valuation AI</h4>
              <p className="text-sm text-gray-600">TensorFlow & PyTorch models with 99%+ accuracy</p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-chat-3-line text-2xl text-blue-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Natural Language</h4>
              <p className="text-sm text-gray-600">GPT-4 & Gemini Pro for intelligent search</p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-camera-line text-2xl text-purple-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Computer Vision</h4>
              <p className="text-sm text-gray-600">AWS Rekognition for property analysis</p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-map-pin-line text-2xl text-orange-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Geospatial Analysis</h4>
              <p className="text-sm text-gray-600">Google Maps & Mapbox integration</p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-palette-line text-2xl text-red-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Content Creation</h4>
              <p className="text-sm text-gray-600">GPT-4 & DALL-E for marketing assets</p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-cloud-line text-2xl text-teal-600"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Cloud Infrastructure</h4>
              <p className="text-sm text-gray-600">AWS SageMaker with fallback APIs</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I switch plans anytime?</h4>
                <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and local payment gateways in the MENA region.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
                <p className="text-gray-600 text-sm">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Do you offer enterprise discounts?</h4>
                <p className="text-gray-600 text-sm">Yes, we offer volume discounts for teams of 50+ users. Contact our sales team for details.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What currencies do you support?</h4>
                <p className="text-gray-600 text-sm">We support USD, EUR, AED, SAR, TRY, and other major currencies.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Is customer support included?</h4>
                <p className="text-gray-600 text-sm">Yes, all plans include support. Higher tiers get priority support and dedicated account managers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Real Estate Business?</h3>
          <p className="text-gray-600 mb-8">Join thousands of professionals using TerraVista's AI-powered platform</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium whitespace-nowrap">
              Start Free Trial
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;