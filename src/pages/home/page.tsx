
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('buy');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Featured Properties Data
  const featuredProperties = [
    {
      id: 1,
      title: 'Luxury Marina Penthouse',
      location: 'Dubai Marina, UAE',
      price: 'AED 11.7M',
      type: 'For Sale',
      bedrooms: 4,
      bathrooms: 5,
      area: '3,200 sq ft',
      image: 'https://readdy.ai/api/search-image?query=luxury%20penthouse%20Dubai%20Marina%20with%20floor-to-ceiling%20windows%20modern%20interior%20design%20living%20room%20with%20city%20skyline%20view%2C%20professional%20real%20estate%20photography%2C%20bright%20natural%20lighting%2C%20minimal%20elegant%20style&width=400&height=300&seq=1&orientation=landscape',
      badge: 'Featured'
    },
    {
      id: 2,
      title: 'Modern Villa with Pool',
      location: 'Emirates Hills, Dubai',
      price: 'AED 8.5M',
      type: 'For Sale',
      bedrooms: 6,
      bathrooms: 8,
      area: '12,500 sq ft',
      image: 'https://readdy.ai/api/search-image?query=modern%20luxury%20villa%20emirates%20hills%20dubai%20golf%20course%20view%20contemporary%20architecture%20private%20pool%20landscaped%20garden%20palm%20trees&width=400&height=300&seq=2&orientation=landscape',
      badge: 'Hot'
    },
    {
      id: 3,
      title: 'Commercial Office Tower',
      location: 'Business Bay, Dubai',
      price: 'AED 31.2M',
      type: 'For Sale',
      bedrooms: 0,
      bathrooms: 12,
      area: '15,000 sq ft',
      image: 'https://readdy.ai/api/search-image?query=modern%20commercial%20office%20building%20interior%20with%20glass%20facade%20contemporary%20workspace%20design%20professional%20lighting%2C%20real%20estate%20photography%20style%2C%20clean%20minimal%20background&width=400&height=300&seq=3&orientation=landscape',
      badge: 'New'
    }
  ];

  // Market Trends Data
  const marketTrends = [
    { region: 'Dubai', change: '+18.5%', trend: 'up', demand: 'Very High' },
    { region: 'Istanbul', change: '+15.2%', trend: 'up', demand: 'High' },
    { region: 'Riyadh', change: '+12.8%', trend: 'up', demand: 'Medium' },
    { region: 'Baghdad', change: '+22.1%', trend: 'up', demand: 'High' }
  ];

  const handleSearch = () => {
    const params = new URLSearchParams({
      location: searchLocation,
      type: searchType
    });
    navigate(`/marketplace?${params.toString()}`);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    // Navigate based on role
    switch(role) {
      case 'buyer':
        navigate('/buyer-seller');
        break;
      case 'seller':
        navigate('/buyer-seller');
        break;
      case 'agent':
        navigate('/buyer-seller');
        break;
      case 'investor':
        navigate('/investments');
        break;
      default:
        navigate('/marketplace');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="ri-building-4-line text-white text-lg sm:text-2xl"></i>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent" style={{fontFamily: 'Pacifico, serif'}}>
                  TerraVista
                </span>
                <div className="text-xs text-gray-500 -mt-1 hidden sm:block">AI Real Estate Platform</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
              <div className="flex items-center space-x-6 xl:space-x-8">
                <button 
                  onClick={() => navigate('/marketplace')}
                  className="nav-link"
                >
                  Marketplace Hub
                </button>
                <button 
                  onClick={() => navigate('/investments')}
                  className="nav-link"
                >
                  Investment Hub
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="nav-link"
                >
                  About
                </button>
                <button 
                  onClick={() => navigate('/blog')}
                  className="nav-link"
                >
                  Blog
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="nav-link"
                >
                  Contact
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-ghost"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="btn-primary"
                >
                  Get Started Free
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer touch-button"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-2xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg mobile-safe-area">
              <div className="py-4 sm:py-6 mobile-space-y">
                <button 
                  onClick={() => {
                    navigate('/marketplace');
                    setIsMenuOpen(false);
                  }}
                  className="mobile-nav-item"
                >
                  <i className="ri-store-3-line text-lg"></i>
                  <span>Marketplace Hub</span>
                </button>
                <button 
                  onClick={() => {
                    navigate('/investments');
                    setIsMenuOpen(false);
                  }}
                  className="mobile-nav-item"
                >
                  <i className="ri-line-chart-line text-lg"></i>
                  <span>Investment Hub</span>
                </button>
                <button 
                  onClick={() => {
                    navigate('/about');
                    setIsMenuOpen(false);
                  }}
                  className="mobile-nav-item"
                >
                  <i className="ri-information-line text-lg"></i>
                  <span>About</span>
                </button>
                <button 
                  onClick={() => {
                    navigate('/blog');
                    setIsMenuOpen(false);
                  }}
                  className="mobile-nav-item"
                >
                  <i className="ri-article-line text-lg"></i>
                  <span>Blog</span>
                </button>
                <button 
                  onClick={() => {
                    navigate('/contact');
                    setIsMenuOpen(false);
                  }}
                  className="mobile-nav-item"
                >
                  <i className="ri-customer-service-2-line text-lg"></i>
                  <span>Contact</span>
                </button>

                <div className="px-4 pt-4 space-y-3 border-t border-gray-100">
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full text-left text-gray-700 hover:text-blue-600 py-3 font-medium cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all whitespace-nowrap cursor-pointer font-semibold"
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Search */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto container-padding text-center">
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg mb-6 sm:mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2 sm:mr-3"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">🚀 AI-Powered Real Estate Platform</span>
            </div>
          </div>
          
          <h1 className="heading-xl mb-6 sm:mb-8 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Property
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-7xl">with AI</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Discover, analyze, and invest in real estate with 
            <span className="font-semibold text-blue-600"> AI-powered insights</span>, 
            <span className="font-semibold text-purple-600"> smart valuations</span>, and 
            <span className="font-semibold text-green-600"> predictive analytics</span>.
          </p>

          {/* Hero Search Bar */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 p-4 sm:p-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              {/* Location Search */}
              <div className="flex-1">
                <div className="relative">
                  <i className="ri-map-pin-line absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl"></i>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Enter location (Dubai, Istanbul, Baghdad...)"
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors text-base sm:text-lg"
                  />
                </div>
              </div>

              {/* Buy/Sell/Rent Toggle */}
              <div className="flex bg-gray-100 rounded-xl sm:rounded-2xl p-1">
                {[
                  { key: 'buy', label: 'Buy', icon: 'ri-shopping-cart-line' },
                  { key: 'sell', label: 'Sell', icon: 'ri-hand-coin-line' },
                  { key: 'rent', label: 'Rent', icon: 'ri-key-line' }
                ].map(option => (
                  <button
                    key={option.key}
                    onClick={() => setSearchType(option.key)}
                    className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all whitespace-nowrap ${
                      searchType === option.key
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <i className={option.icon}></i>
                    <span className="text-sm sm:text-base">{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 font-semibold text-base sm:text-lg whitespace-nowrap"
              >
                <i className="ri-search-line mr-2"></i>
                Search Properties
              </button>
            </div>
          </div>

          {/* Role Selector */}
          <div className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">I am a...</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {[
                { key: 'buyer', label: 'Buyer', icon: 'ri-search-eye-line', color: 'from-blue-500 to-blue-600' },
                { key: 'seller', label: 'Seller', icon: 'ri-home-4-line', color: 'from-green-500 to-green-600' },
                { key: 'agent', label: 'Agent', icon: 'ri-user-star-line', color: 'from-purple-500 to-purple-600' },
                { key: 'investor', label: 'Investor', icon: 'ri-line-chart-line', color: 'from-orange-500 to-orange-600' }
              ].map(role => (
                <button
                  key={role.key}
                  onClick={() => handleRoleSelect(role.key)}
                  className={`flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg touch-feedback ${
                    selectedRole === role.key
                      ? `bg-gradient-to-r ${role.color} text-white shadow-lg`
                      : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200'
                  }`}
                >
                  <i className={`${role.icon} text-lg sm:text-base`}></i>
                  <span className="text-sm sm:text-base">{role.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <i className="ri-check-line text-green-500 mr-2"></i>
              AI-powered search
            </div>
            <div className="flex items-center">
              <i className="ri-check-line text-green-500 mr-2"></i>
              Instant valuations
            </div>
            <div className="flex items-center">
              <i className="ri-check-line text-green-500 mr-2"></i>
              Multilingual support
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Carousel */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
              <i className="ri-star-line mr-2"></i>
              Featured Properties
            </div>
            <h2 className="heading-lg mb-6 sm:mb-8">
              Handpicked by
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our AI
              </span>
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Discover premium properties selected by our AI based on market trends, growth potential, and investment value
            </p>
          </div>

          <div className="responsive-grid-3">
            {featuredProperties.map((property) => (
              <div key={property.id} className="mobile-card card-hover">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 sm:h-64 object-cover object-top rounded-lg sm:rounded-xl"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                      property.badge === 'Featured' ? 'bg-yellow-100 text-yellow-800' :
                      property.badge === 'Hot' ? 'bg-red-100 text-red-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {property.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors touch-button">
                      <i className="ri-heart-line text-gray-600"></i>
                    </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{property.price}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full font-medium">
                      {property.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <i className="ri-map-pin-line mr-2"></i>
                    <span className="line-clamp-1">{property.location}</span>
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="font-bold text-gray-900 text-sm sm:text-base">{property.bedrooms}</div>
                      <div className="text-xs text-gray-600">Beds</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="font-bold text-gray-900 text-sm sm:text-base">{property.bathrooms}</div>
                      <div className="text-xs text-gray-600">Baths</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="font-bold text-gray-900 text-xs sm:text-sm">{property.area}</div>
                      <div className="text-xs text-gray-600">Area</div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/marketplace')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold text-sm sm:text-base"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <button 
              onClick={() => navigate('/marketplace')}
              className="bg-white border-2 border-gray-200 text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 hover:shadow-xl transition-all duration-300 font-semibold text-base sm:text-lg"
            >
              View All Properties
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Market Trends Snapshot */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 rounded-full bg-green-100 text-green-800 font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
              <i className="ri-line-chart-line mr-2"></i>
              Market Intelligence
            </div>
            <h2 className="heading-lg mb-6 sm:mb-8">
              Real-Time Market
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Trends
              </span>
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Stay ahead with AI-powered market insights and regional performance data
            </p>
          </div>

          <div className="responsive-grid">
            {marketTrends.map((trend, index) => (
              <div key={index} className="mobile-card group">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{trend.region}</h3>
                  <div className={`w-3 h-3 rounded-full ${trend.trend === 'up' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                </div>
                
                <div className="text-center mb-3 sm:mb-4">
                  <div className={`text-2xl sm:text-3xl font-black mb-2 ${trend.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.change}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Price Growth</div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm text-gray-600">Demand:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    trend.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                    trend.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {trend.demand}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${trend.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{width: trend.demand === 'Very High' ? '90%' : trend.demand === 'High' ? '75%' : '60%'}}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <button 
              onClick={() => navigate('/analytics')}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 font-semibold text-base sm:text-lg"
            >
              <i className="ri-bar-chart-2-line mr-2"></i>
              View Full Analytics
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Partners */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="heading-md mb-6 sm:mb-8">
              Trusted by Industry Leaders
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Enterprise-grade security and reliability that leading real estate professionals depend on
            </p>
          </div>

          <div className="responsive-grid">
            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className="ri-shield-check-line text-white text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Bank-Level Security</h3>
              <p className="text-gray-600 text-sm sm:text-base">256-bit SSL encryption and SOC 2 compliance to protect your data</p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl sm:rounded-2xl">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className="ri-global-line text-white text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Global Coverage</h3>
              <p className="text-gray-600 text-sm sm:text-base">Supporting 45+ markets with multilingual AI assistance</p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl sm:rounded-2xl">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className="ri-customer-service-2-line text-white text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">24/7 Support</h3>
              <p className="text-gray-600 text-sm sm:text-base">Expert support team with real estate expertise available anytime</p>
            </div>

            <div 
              onClick={() => navigate('/workflows')}
              className="text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group touch-feedback"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <i className="ri-flow-chart text-white text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">User Workflows & Journeys</h3>
              <p className="text-gray-600 text-sm sm:text-base">Streamlined processes and automated workflows for efficient operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 sm:mb-8">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Real Estate Journey?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto font-light">
            Join thousands of professionals who are already leveraging AI to find better properties, 
            make smarter investments, and close more deals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold text-base sm:text-lg whitespace-nowrap cursor-pointer transform hover:scale-105"
            >
              Start Free Trial
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300 font-semibold text-base sm:text-lg whitespace-nowrap cursor-pointer"
            >
              View Pricing Plans
            </button>
          </div>
          
          <div className="mt-6 sm:mt-8 text-blue-200 text-xs sm:text-sm">
            <i className="ri-shield-keyhole-line mr-2"></i>
            14-day free trial • No credit card required • Cancel anytime
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="ri-building-4-line text-white text-xl sm:text-2xl"></i>
                </div>
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" style={{fontFamily: 'Pacifico, serif'}}>
                  TerraVista
                </span>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                AI-powered real estate platform connecting buyers, sellers, agents, and investors 
                with intelligent market insights and automated tools.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors touch-button">
                  <i className="ri-twitter-line text-sm sm:text-base"></i>
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors touch-button">
                  <i className="ri-linkedin-line text-sm sm:text-base"></i>
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors touch-button">
                  <i className="ri-facebook-line text-sm sm:text-base"></i>
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors touch-button">
                  <i className="ri-instagram-line text-sm sm:text-base"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Platform</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="/marketplace" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/marketplace')}}>Marketplace Hub</a></li>
                <li><a href="/investments" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/investments')}}>Investment Hub</a></li>
                <li><a href="/workflows" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/workflows')}}>Workflows</a></li>
                <li><a href="/buyer-seller" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/buyer-seller')}}>Buyer/Seller Hub</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Company</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="/about" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/about')}}>About Us</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/blog')}}>Blog</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/contact')}}>Contact</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/pricing')}}>Pricing</a></li>
                <li><a href="https://readdy.ai/?origin=logo" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Website Builder</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-500 text-xs sm:text-sm">
            <p>© 2024 TerraVista AI. All rights reserved. | Powered by advanced AI technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
