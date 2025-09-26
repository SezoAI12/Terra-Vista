import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function AboutPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mission');

  const teamMembers = [
    {
      name: 'Dr. Sarah Al-Rashid',
      role: 'CEO & Co-Founder',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20CEO%20portrait%20modern%20office%20background%20confident%20leadership%20style&width=300&height=300&seq=1&orientation=squarish',
      bio: 'Former VP of Digital Innovation at Emirates NBD with 15+ years in fintech and real estate technology.',
      linkedin: '#'
    },
    {
      name: 'Ahmed Hassan',
      role: 'CTO & Co-Founder',
      image: 'https://readdy.ai/api/search-image?query=professional%20tech%20executive%20CTO%20portrait%20modern%20office%20background%20engineering%20leadership%20style&width=300&height=300&seq=2&orientation=squarish',
      bio: 'Ex-Google AI researcher specializing in machine learning and predictive analytics for real estate markets.',
      linkedin: '#'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Head of AI Research',
      image: 'https://readdy.ai/api/search-image?query=professional%20AI%20researcher%20woman%20portrait%20modern%20tech%20office%20background%20data%20science%20expert&width=300&height=300&seq=3&orientation=squarish',
      bio: 'PhD in Computer Science from MIT, former Tesla AI team member with expertise in computer vision and NLP.',
      linkedin: '#'
    },
    {
      name: 'Omar Khalil',
      role: 'VP of Real Estate',
      image: 'https://readdy.ai/api/search-image?query=professional%20real%20estate%20executive%20man%20portrait%20modern%20office%20background%20industry%20expert&width=300&height=300&seq=4&orientation=squarish',
      bio: '20+ years in MENA real estate markets, former Managing Director at Emaar Properties.',
      linkedin: '#'
    }
  ];

  const partners = [
    { name: 'Microsoft Azure', logo: 'ri-microsoft-line', description: 'Cloud Infrastructure Partner' },
    { name: 'NVIDIA', logo: 'ri-cpu-line', description: 'AI Computing Partner' },
    { name: 'Dubai Land Department', logo: 'ri-government-line', description: 'Government Partner' },
    { name: 'Emirates NBD', logo: 'ri-bank-line', description: 'Financial Services Partner' },
    { name: 'Emaar Properties', logo: 'ri-building-line', description: 'Real Estate Partner' },
    { name: 'Turkish Ministry of Environment', logo: 'ri-leaf-line', description: 'Regulatory Partner' }
  ];

  const milestones = [
    { year: '2021', title: 'Company Founded', description: 'TerraVista AI established in Dubai with $2M seed funding' },
    { year: '2022', title: 'AI Engine Launch', description: 'Proprietary AI valuation engine deployed across UAE market' },
    { year: '2023', title: 'Regional Expansion', description: 'Expanded to Turkey, Iraq, and Saudi Arabia markets' },
    { year: '2024', title: 'Series A Funding', description: '$15M Series A led by Wamda Capital and 500 Global' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mb-6">
            <i className="ri-information-line mr-2"></i>
            About TerraVista
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
            Revolutionizing Real Estate
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              with AI Intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            We're building the future of real estate by combining artificial intelligence, 
            market expertise, and cutting-edge technology to create smarter property decisions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'mission', label: 'Mission & Vision', icon: 'ri-rocket-line' },
              { id: 'technology', label: 'AI Technology', icon: 'ri-brain-line' },
              { id: 'team', label: 'Our Team', icon: 'ri-team-line' },
              { id: 'partners', label: 'Partners', icon: 'ri-handshake-line' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mission & Vision Tab */}
        {activeTab === 'mission' && (
          <div className="space-y-12">
            {/* Mission Statement */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    To democratize real estate intelligence by making AI-powered market insights, 
                    property valuations, and investment analysis accessible to everyone - from 
                    first-time buyers to institutional investors.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <i className="ri-check-line text-green-600 text-xl mt-1"></i>
                      <div>
                        <h4 className="font-semibold text-gray-900">Transparency First</h4>
                        <p className="text-gray-600">Providing clear, unbiased market data and AI-driven insights</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-check-line text-green-600 text-xl mt-1"></i>
                      <div>
                        <h4 className="font-semibold text-gray-900">Global Accessibility</h4>
                        <p className="text-gray-600">Supporting multiple languages and regional market nuances</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-check-line text-green-600 text-xl mt-1"></i>
                      <div>
                        <h4 className="font-semibold text-gray-900">Innovation Leadership</h4>
                        <p className="text-gray-600">Continuously advancing AI technology for better real estate decisions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://readdy.ai/api/search-image?query=modern%20office%20team%20collaboration%20AI%20technology%20real%20estate%20professionals%20working%20together%20diverse%20team%20meeting&width=600&height=400&seq=5&orientation=landscape"
                    alt="TerraVista Mission"
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Vision & Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-eye-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the world's most trusted AI-powered real estate platform, 
                  enabling smarter property decisions across global markets and creating 
                  a more efficient, transparent real estate ecosystem.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-heart-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Core Values</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><i className="ri-arrow-right-s-line text-green-600 mr-2"></i>Innovation & Excellence</li>
                  <li className="flex items-center"><i className="ri-arrow-right-s-line text-green-600 mr-2"></i>Data Privacy & Security</li>
                  <li className="flex items-center"><i className="ri-arrow-right-s-line text-green-600 mr-2"></i>Customer Success</li>
                  <li className="flex items-center"><i className="ri-arrow-right-s-line text-green-600 mr-2"></i>Market Transparency</li>
                </ul>
              </div>
            </div>

            {/* Company Timeline */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{milestone.year}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{milestone.title}</h4>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Technology Tab */}
        {activeTab === 'technology' && (
          <div className="space-y-12">
            {/* AI Overview */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced AI Technology Stack</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our proprietary AI engine processes millions of data points to deliver accurate 
                  property valuations, market predictions, and investment insights.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="ri-brain-line text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Machine Learning</h3>
                  <p className="text-gray-600 text-sm">
                    Advanced ML algorithms trained on 10M+ property transactions 
                    for accurate price predictions and market analysis.
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="ri-eye-line text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Computer Vision</h3>
                  <p className="text-gray-600 text-sm">
                    AI-powered image analysis for property condition assessment, 
                    feature detection, and automated photo quality scoring.
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="ri-chat-3-line text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Natural Language</h3>
                  <p className="text-gray-600 text-sm">
                    NLP models supporting 15+ languages for property descriptions, 
                    search queries, and multilingual customer support.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg border p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Capabilities</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Property Valuation Accuracy</span>
                    <span className="font-bold text-green-600">99.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '99.7%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Market Prediction Precision</span>
                    <span className="font-bold text-blue-600">94.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '94.2%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Image Analysis Speed</span>
                    <span className="font-bold text-purple-600">&lt;2 sec</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Language Support</span>
                    <span className="font-bold text-orange-600">15+ Languages</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '88%'}}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Sources</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <i className="ri-database-2-line text-blue-600 text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900">Government Records</h4>
                      <p className="text-sm text-gray-600">Official property registries, tax records, and zoning data</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="ri-line-chart-line text-green-600 text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900">Market Data</h4>
                      <p className="text-sm text-gray-600">Real-time pricing, transaction history, and market trends</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="ri-map-2-line text-purple-600 text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900">Geographic Intelligence</h4>
                      <p className="text-sm text-gray-600">Satellite imagery, infrastructure data, and location analytics</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="ri-community-line text-orange-600 text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900">Social & Economic</h4>
                      <p className="text-sm text-gray-600">Demographics, economic indicators, and development plans</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Industry veterans and AI experts working together to revolutionize real estate technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                    <a 
                      href={member.linkedin}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <i className="ri-linkedin-line mr-2"></i>
                      Connect
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Growing Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">120+</div>
                  <div className="text-gray-700">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                  <div className="text-gray-700">AI Engineers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                  <div className="text-gray-700">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
                  <div className="text-gray-700">Office Locations</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Strategic Partners & Investors</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Working with industry leaders to build the future of real estate technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border p-8 text-center hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${partner.logo} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>

            {/* Investor Information */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Funding & Investment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">$17M</div>
                  <div className="text-gray-700 font-medium">Total Funding Raised</div>
                  <div className="text-sm text-gray-600 mt-2">Series A completed in 2024</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
                  <div className="text-gray-700 font-medium">Institutional Investors</div>
                  <div className="text-sm text-gray-600 mt-2">Including Wamda Capital, 500 Global</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2025</div>
                  <div className="text-gray-700 font-medium">Series B Planned</div>
                  <div className="text-sm text-gray-600 mt-2">Global expansion funding</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Experience the Future of Real Estate?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who trust TerraVista AI for smarter property decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => navigate('/marketplace')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-all font-semibold"
            >
              Explore Platform
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}