
import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import PropertyCard from '../../components/features/PropertyCard';
import PropertyDetailModal from '../../components/features/PropertyDetailModal';
import GlobalHeatmap from '../../components/features/GlobalHeatmap';
import AIAssistant from '../../components/ai/AIAssistant';

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  features: string[];
  coordinates: [number, number];
  roi: string;
  rentalYield: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  aiGrade: string;
  growthPotential: string;
  status: 'available' | 'sold' | 'pending';
  listingDate: string;
  seller: {
    name: string;
    rating: number;
    responseTime: string;
    verified: boolean;
  };
  photos: string[];
  description: string;
  size: number;
  propertySize: string;
  indoorFeatures: string[];
  outdoorFeatures: string[];
  furnished: 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished';
  aiMatchScore?: number;
  swotAnalysis?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  estimatedValue?: string;
}

interface SearchFilters {
  priceMin: string;
  priceMax: string;
  beds: string;
  baths: string;
  propertySize: string;
  propertyType: string;
  indoorFeatures: string[];
  outdoorFeatures: string[];
  furnished: string;
  customSearchArea: boolean;
}

interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  notifications: boolean;
  created: string;
}

interface Message {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const BuyerSellerPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{email: string, role: string, name: string} | null>(null);
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'agency' | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    priceMin: '',
    priceMax: '',
    beds: '',
    baths: '',
    propertySize: '',
    propertyType: '',
    indoorFeatures: [],
    outdoorFeatures: [],
    furnished: '',
    customSearchArea: false
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showMapTools, setShowMapTools] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [heatmapType, setHeatmapType] = useState<'pricing' | 'density' | 'growth'>('pricing');
  const [savedProperties, setSavedProperties] = useState<number[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIAnalysis, setShowAIAnalysis] = useState<number | null>(null);

  // Load user data
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }

    // Load saved data
    const saved = localStorage.getItem('savedProperties');
    if (saved) setSavedProperties(JSON.parse(saved));

    const searches = localStorage.getItem('savedSearches');
    if (searches) setSavedSearches(JSON.parse(searches));
  }, []);

  // Property types
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', icon: 'ri-building-line' },
    { value: 'villa', label: 'Villa', icon: 'ri-home-4-line' },
    { value: 'land', label: 'Land', icon: 'ri-landscape-line' },
    { value: 'townhouse', label: 'Townhouse', icon: 'ri-community-line' },
    { value: 'penthouse', label: 'Penthouse', icon: 'ri-building-4-line' }
  ];

  // Indoor features
  const indoorFeatures = [
    { value: 'balcony', label: 'Balcony', icon: 'ri-building-2-line' },
    { value: 'kitchen', label: 'Modern Kitchen', icon: 'ri-restaurant-line' },
    { value: 'storage', label: 'Storage Room', icon: 'ri-archive-line' },
    { value: 'laundry', label: 'Laundry Room', icon: 'ri-shirt-line' },
    { value: 'maid', label: 'Maid Room', icon: 'ri-user-settings-line' },
    { value: 'office', label: 'Home Office', icon: 'ri-computer-line' }
  ];

  // Outdoor features
  const outdoorFeatures = [
    { value: 'pool', label: 'Swimming Pool', icon: 'ri-water-flash-line' },
    { value: 'garden', label: 'Garden', icon: 'ri-leaf-line' },
    { value: 'terrace', label: 'Terrace', icon: 'ri-building-2-line' },
    { value: 'parking', label: 'Parking', icon: 'ri-car-line' },
    { value: 'gym', label: 'Gym Access', icon: 'ri-run-line' },
    { value: 'playground', label: 'Playground', icon: 'ri-gamepad-line' }
  ];

  // Mock properties data with enhanced details
  const properties: Property[] = [
    {
      id: 1,
      title: 'Luxury Marina Apartment with Burj Khalifa View',
      price: '$2,850,000',
      location: 'Dubai Marina, Dubai, UAE',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 4,
      area: '2,840 sq ft',
      size: 2840,
      propertySize: '2,840',
      image: 'https://readdy.ai/api/search-image?query=luxury%20marina%20apartment%20dubai%20burj%20khalifa%20view%20floor%20to%20ceiling%20windows%20modern%20interior%20design%20high-rise%20living%20panoramic%20city%20skyline&width=400&height=300&seq=1&orientation=landscape',
      photos: [
        'https://readdy.ai/api/search-image?query=luxury%20marina%20apartment%20dubai%20burj%20khalifa%20view%20floor%20to%20ceiling%20windows%20modern%20interior%20design%20high-rise%20living%20panoramic%20city%20skyline&width=600&height=400&seq=11&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20apartment%20kitchen%20dubai%20marina%20modern%20white%20cabinets%20marble%20countertops%20city%20view&width=600&height=400&seq=12&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20apartment%20bedroom%20dubai%20marina%20floor%20to%20ceiling%20windows%20city%20view%20modern%20furniture&width=600&height=400&seq=13&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20apartment%20bathroom%20dubai%20marina%20marble%20finishes%20modern%20fixtures%20city%20skyline%20view&width=600&height=400&seq=14&orientation=landscape'
      ],
      description: 'This stunning 3-bedroom apartment offers unparalleled luxury living in the heart of Dubai Marina. Floor-to-ceiling windows provide breathtaking views of the Burj Khalifa and city skyline. The property features premium finishes throughout, including marble flooring, designer fixtures, and a gourmet kitchen with top-of-the-line appliances. Located in a prestigious tower with world-class amenities including infinity pool, state-of-the-art gym, and 24/7 concierge service.',
      features: ['Marina View', 'Burj Khalifa View', 'Private Balcony', 'Gym Access', 'Concierge'],
      indoorFeatures: ['balcony', 'kitchen', 'storage', 'laundry'],
      outdoorFeatures: ['pool', 'gym', 'parking'],
      furnished: 'Fully Furnished',
      coordinates: [25.0657, 55.1713],
      roi: '12.5%',
      rentalYield: '8.2%',
      riskLevel: 'Low',
      aiGrade: 'A+',
      growthPotential: 'High',
      status: 'available',
      listingDate: '2024-01-15',
      seller: {
        name: 'Emirates Properties',
        rating: 4.8,
        responseTime: '< 2 hours',
        verified: true
      },
      aiMatchScore: 95,
      estimatedValue: '$2,950,000',
      swotAnalysis: {
        strengths: ['Prime Marina location', 'Burj Khalifa views', 'High rental demand', 'Luxury amenities'],
        weaknesses: ['High service charges', 'Limited parking', 'Tourist area noise'],
        opportunities: ['Growing tourism sector', 'Metro expansion', 'Dubai 2030 vision'],
        threats: ['Market oversupply', 'Economic volatility', 'Competition from new developments']
      }
    },
    {
      id: 2,
      title: 'Modern Villa in Emirates Hills with Golf Course',
      price: '$8,500,000',
      location: 'Emirates Hills, Dubai, UAE',
      type: 'Villa',
      bedrooms: 6,
      bathrooms: 8,
      area: '12,500 sq ft',
      size: 12500,
      propertySize: '12,500',
      image: 'https://readdy.ai/api/search-image?query=modern%20luxury%20villa%20emirates%20hills%20dubai%20golf%20course%20view%20contemporary%20architecture%20private%20pool%20landscaped%20garden%20palm%20trees&width=400&height=300&seq=2&orientation=landscape',
      photos: [
        'https://readdy.ai/api/search-image?query=modern%20luxury%20villa%20emirates%20hills%20dubai%20golf%20course%20view%20contemporary%20architecture%20private%20pool%20landscaped%20garden&width=600&height=400&seq=21&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20villa%20living%20room%20emirates%20hills%20dubai%20modern%20furniture%20high%20ceilings%20marble%20floors&width=600&height=400&seq=22&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20villa%20master%20bedroom%20emirates%20hills%20dubai%20walk-in%20closet%20ensuite%20bathroom%20golf%20course%20view&width=600&height=400&seq=23&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20villa%20kitchen%20emirates%20hills%20dubai%20modern%20appliances%20large%20island%20marble%20countertops&width=600&height=400&seq=24&orientation=landscape'
      ],
      description: 'An architectural masterpiece situated on one of the most prestigious plots in Emirates Hills. This contemporary villa offers 6 spacious bedrooms, each with ensuite bathrooms and golf course views. The property features a grand foyer with double-height ceilings, formal and informal living areas, a gourmet kitchen with premium appliances, and a private cinema room. The outdoor space includes an infinity pool, landscaped gardens, and multiple entertainment areas.',
      features: ['Golf Course View', 'Private Pool', 'Maid Room', 'Driver Room', 'Garden'],
      indoorFeatures: ['kitchen', 'storage', 'laundry', 'maid', 'office'],
      outdoorFeatures: ['pool', 'garden', 'terrace', 'parking'],
      furnished: 'Semi Furnished',
      coordinates: [25.0424, 55.1394],
      roi: '15.8%',
      rentalYield: '6.5%',
      riskLevel: 'Medium',
      aiGrade: 'A',
      growthPotential: 'Very High',
      status: 'available',
      listingDate: '2024-01-12',
      seller: {
        name: 'Luxury Homes Dubai',
        rating: 4.9,
        responseTime: '< 1 hour',
        verified: true
      },
      aiMatchScore: 88,
      estimatedValue: '$8,750,000',
      swotAnalysis: {
        strengths: ['Exclusive gated community', 'Golf course frontage', 'Premium location', 'High-end finishes'],
        weaknesses: ['High maintenance costs', 'Limited public transport', 'Exclusive market segment'],
        opportunities: ['Luxury market growth', 'International buyers', 'Tourism development'],
        threats: ['Economic downturns', 'Regulatory changes', 'Market competition']
      }
    }
  ];

  // Filter properties based on search criteria
  const filteredProperties = properties.filter(property => {
    // Basic filters
    if (searchFilters.propertyType && property.type.toLowerCase() !== searchFilters.propertyType) return false;
    if (searchFilters.beds && property.bedrooms < parseInt(searchFilters.beds)) return false;
    if (searchFilters.baths && property.bathrooms < parseInt(searchFilters.baths)) return false;
    if (searchFilters.furnished && property.furnished !== searchFilters.furnished) return false;
    
    // Price range
    if (searchFilters.priceMin || searchFilters.priceMax) {
      const price = parseInt(property.price.replace(/[^0-9]/g, ''));
      const minPrice = searchFilters.priceMin ? parseInt(searchFilters.priceMin) : 0;
      const maxPrice = searchFilters.priceMax ? parseInt(searchFilters.priceMax) : Infinity;
      if (price < minPrice || price > maxPrice) return false;
    }
    
    // Property size
    if (searchFilters.propertySize) {
      const minSize = parseInt(searchFilters.propertySize);
      if (property.size < minSize) return false;
    }
    
    // Indoor features
    if (searchFilters.indoorFeatures.length > 0) {
      const hasFeatures = searchFilters.indoorFeatures.every(feature => 
        property.indoorFeatures.includes(feature)
      );
      if (!hasFeatures) return false;
    }
    
    // Outdoor features
    if (searchFilters.outdoorFeatures.length > 0) {
      const hasFeatures = searchFilters.outdoorFeatures.every(feature => 
        property.outdoorFeatures.includes(feature)
      );
      if (!hasFeatures) return false;
    }
    
    // Search query
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  // Handle feature toggle
  const handleFeatureToggle = (type: 'indoor' | 'outdoor', feature: string) => {
    const key = type === 'indoor' ? 'indoorFeatures' : 'outdoorFeatures';
    const current = searchFilters[key];
    const updated = current.includes(feature)
      ? current.filter(f => f !== feature)
      : [...current, feature];
    
    setSearchFilters(prev => ({ ...prev, [key]: updated }));
  };

  // Handle property save/unsave
  const handleSaveProperty = (propertyId: number) => {
    const updated = savedProperties.includes(propertyId)
      ? savedProperties.filter(id => id !== propertyId)
      : [...savedProperties, propertyId];
    
    setSavedProperties(updated);
    localStorage.setItem('savedProperties', JSON.stringify(updated));
  };

  // Save search
  const handleSaveSearch = () => {
    const searchName = prompt('Enter a name for this search:');
    if (!searchName) return;
    
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: searchName,
      filters: { ...searchFilters },
      notifications: true,
      created: new Date().toISOString()
    };
    
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
  };

  // Load saved search
  const handleLoadSearch = (search: SavedSearch) => {
    setSearchFilters(search.filters);
    setShowSavedItems(false);
  };

  // Send message to seller
  const handleSendMessage = (propertyId: number, message: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: currentUser?.name || 'Buyer',
      to: property.seller.name,
      message: message,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
  };

  // Handle advanced search
  const handleAdvancedSearch = () => {
    console.log('Advanced search with filters:', searchFilters);
    // Apply filters to properties
  };

  // Handle map tools
  const handleMapTools = () => {
    setShowMapTools(!showMapTools);
    console.log('Map tools toggled:', !showMapTools);
  };

  // Handle AI heatmaps
  const handleAIHeatmaps = () => {
    setShowHeatmap(!showHeatmap);
    console.log('AI heatmaps toggled:', !showHeatmap);
  };

  // Handle view details
  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    console.log('Viewing property details:', property.title);
  };

  // Handle AI analysis
  const handleAIAnalysis = (propertyId: number) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setShowAIAnalysis(propertyId);
      console.log('AI analysis for property:', property.title);
      // Simulate AI analysis
      setTimeout(() => {
        alert(`AI Analysis Complete for ${property.title}:\n\n• Investment Grade: ${property.aiGrade}\n• Growth Potential: ${property.growthPotential}\n• ROI Projection: ${property.roi}\n• Risk Level: ${property.riskLevel}\n• Market Score: ${property.aiMatchScore}%`);
        setShowAIAnalysis(null);
      }, 2000);
    }
  };

  // Handle send email
  const handleSendEmail = (recipient: string) => {
    alert(`📧 Email Compose\n\nTo: ${recipient}\nFrom: ${currentUser?.email || 'your-email@domain.com'}\n\n📝 Email Templates Available:\n• Property Inquiry\n• Viewing Request\n• Offer Submission\n• General Question\n\n✨ Features:\n• Auto-filled property details\n• Professional templates\n• Read receipts\n• Follow-up scheduling\n\n📤 Opening email client...`);
  };

  // Handle call now
  const handleCallNow = (phoneNumber: string) => {
    alert(`📞 Call Now: ${phoneNumber}\n\n🔊 Call Features:\n• Direct dial from platform\n• Call recording (with consent)\n• Automatic CRM logging\n• Follow-up reminders\n• Call history tracking\n\n📱 Options:\n• Mobile app integration\n• Desktop softphone\n• Browser-based calling\n• Conference call setup\n\n🚀 Initiating call...`);
  };

  // Handle start chat
  const handleStartChat = (recipient: string) => {
    alert(`💬 Live Chat with ${recipient}\n\n🌟 Chat Features:\n• Real-time messaging\n• File sharing\n• Property links\n• Voice messages\n• Video calls\n• Translation support\n\n📱 Multi-platform:\n• Web browser\n• Mobile app\n• Desktop notifications\n• Email fallback\n\n🔥 Starting chat session...`);
  };

  // Handle book demo
  const handleBookDemo = () => {
    alert(`📅 Book Your Personal Demo\n\n🎯 Demo Includes:\n• Platform walkthrough\n• Feature demonstrations\n• Personalized setup\n• Q&A session\n• Best practices\n• Implementation guide\n\n⏰ Available Slots:\n• Today: 2:00 PM, 4:30 PM\n• Tomorrow: 10:00 AM, 3:00 PM\n• This Week: 15+ slots available\n\n👨‍💼 Demo Options:\n• Screen sharing session\n• In-person meeting\n• Group demonstration\n• Custom presentation\n\n📞 Duration: 30-45 minutes\n💰 Cost: Free for qualified prospects\n\n🗓️ Opening calendar...`);
  };

  // Handle follow us
  const handleFollowUs = (platform: string) => {
    const socialLinks = {
      'LinkedIn': 'https://linkedin.com/company/terravista-ai',
      'Twitter': 'https://twitter.com/terravista_ai',
      'Instagram': 'https://instagram.com/terravista.ai',
      'Facebook': 'https://facebook.com/terravistaai',
      'YouTube': 'https://youtube.com/c/terravistaai',
      'Telegram': 'https://t.me/terravistaai'
    };
    
    alert(`🌟 Follow Us on ${platform}\n\n📱 Get Updates:\n• Latest property listings\n• Market insights\n• Investment tips\n• Platform updates\n• Exclusive deals\n• Community discussions\n\n🔗 ${platform} Benefits:\n• Real-time notifications\n• Exclusive content\n• Direct support\n• Community networking\n• Market analysis\n\n🌐 Link: ${socialLinks[platform as keyof typeof socialLinks] || '#'}\n\n📲 Opening ${platform}...`);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar userRole={currentUser?.role} userName={currentUser?.name} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-black text-gray-900 mb-6">
              🏠 The Marketplace
            </h1>
            <p className="text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
              Your central hub for property transactions. Select your account type to access tailored features and services designed for your specific needs.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Buyer Card */}
            <div 
              onClick={() => setSelectedRole('buyer')}
              className="group cursor-pointer bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <i className="ri-search-line text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Buyer Account</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Advanced search tools, AI-powered property analysis, custom map areas, and direct seller communication to find your perfect property.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Advanced Search & Filters</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>AI-Powered Property Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Interactive Map with Heatmaps</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Saved Properties & Searches</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Direct Seller Communication</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all whitespace-nowrap">
                  Access Buyer Features
                </button>
              </div>
            </div>

            {/* Seller Card */}
            <div 
              onClick={() => setSelectedRole('seller')}
              className="group cursor-pointer bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <i className="ri-home-4-line text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Seller Account</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  AI-powered listing creation, smart pricing recommendations, performance analytics, and lead management to maximize your property's visibility and value.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>AI-Powered Listing Creation</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Smart Pricing Recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Performance Analytics</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Lead Management System</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Interactive Property Mapping</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all whitespace-nowrap">
                  Access Seller Dashboard
                </button>
              </div>
            </div>

            {/* Agency Card */}
            <div 
              onClick={() => setSelectedRole('agency')}
              className="group cursor-pointer bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <i className="ri-building-line text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Estate Agency</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Professional tools for real estate agencies and teams
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Professional CRM System</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Team Management Tools</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Bulk Property Operations</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Advanced Lead Generation</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-700">
                    <i className="ri-check-line text-green-600"></i>
                    <span>Revenue & Deal Tracking</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-orange-700 hover:to-red-700 transition-all whitespace-nowrap">
                  Access Agency Portal
                </button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-8">
              Need help choosing the right account type? Our AI assistant can guide you.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all whitespace-nowrap">
              <i className="ri-robot-line mr-3"></i>
              Get AI Guidance
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Buyer Account Page (keeping existing implementation)
  if (selectedRole === 'buyer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar userRole={currentUser?.role} userName={currentUser?.name} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  🏠 Buyer Dashboard
                </h1>
                <p className="text-xl text-gray-600 font-light">
                  Find your perfect property with AI-powered insights and advanced search tools
                </p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Hub
              </button>
            </div>
          </div>

          {/* Advanced Search Bar */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Search */}
              <div className="flex-1">
                <div className="relative">
                  <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, property type, or features..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors text-lg"
                  />
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    showAdvancedSearch
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-filter-3-line mr-2"></i>
                  Advanced Filters
                </button>
                
                <button
                  onClick={handleMapTools}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    showMapTools
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-map-2-line mr-2"></i>
                  Map Tools
                </button>
                
                <button
                  onClick={handleAIHeatmaps}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    showHeatmap
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-fire-line mr-2"></i>
                  AI Heatmaps
                </button>
                
                <button
                  onClick={() => setShowSavedItems(!showSavedItems)}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    showSavedItems
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-bookmark-line mr-2"></i>
                  Saved ({savedProperties.length})
                </button>
              </div>
            </div>

            {/* Advanced Search Panel */}
            {showAdvancedSearch && (
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Advanced Search Filters</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min Price"
                        value={searchFilters.priceMin}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max Price"
                        value={searchFilters.priceMax}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <select
                      value={searchFilters.beds}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, beds: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                    <select
                      value={searchFilters.baths}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, baths: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select
                      value={searchFilters.propertyType}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="">All Types</option>
                      {propertyTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Indoor Features */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Indoor Features</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {indoorFeatures.map(feature => (
                      <button
                        key={feature.value}
                        onClick={() => handleFeatureToggle('indoor', feature.value)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all text-sm ${
                          searchFilters.indoorFeatures.includes(feature.value)
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <i className={feature.icon}></i>
                        <span>{feature.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Outdoor Features */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Outdoor Features</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {outdoorFeatures.map(feature => (
                      <button
                        key={feature.value}
                        onClick={() => handleFeatureToggle('outdoor', feature.value)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all text-sm ${
                          searchFilters.outdoorFeatures.includes(feature.value)
                            ? 'bg-green-100 border-green-300 text-green-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <i className={feature.icon}></i>
                        <span>{feature.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleAdvancedSearch}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                  >
                    <i className="ri-search-line mr-2"></i>
                    Apply Filters
                  </button>
                  <button
                    onClick={() => setSearchFilters({
                      priceMin: '', priceMax: '', beds: '', baths: '', propertySize: '',
                      propertyType: '', indoorFeatures: [], outdoorFeatures: [], furnished: '', customSearchArea: false
                    })}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
                  >
                    <i className="ri-refresh-line mr-2"></i>
                    Clear Filters
                  </button>
                  <button
                    onClick={handleSaveSearch}
                    className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
                  >
                    <i className="ri-bookmark-line mr-2"></i>
                    Save Search
                  </button>
                </div>
              </div>
            )}

            {/* Map Tools Panel */}
            {showMapTools && (
              <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-map-2-line mr-2 text-green-600"></i>
                  Interactive Map Tools
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-xl border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3">Draw Search Area</h4>
                    <p className="text-sm text-gray-600 mb-4">Define custom search boundaries on the map</p>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap">
                      <i className="ri-pencil-line mr-2"></i>
                      Start Drawing
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3">Radius Search</h4>
                    <p className="text-sm text-gray-600 mb-4">Search within specific distance from a point</p>
                    <div className="flex space-x-3 mb-3">
                      <input
                        type="number"
                        placeholder="Radius (km)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap">
                      <i className="ri-focus-3-line mr-2"></i>
                      Apply Radius
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3">Layer Controls</h4>
                    <p className="text-sm text-gray-600 mb-4">Toggle map layers and overlays</p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Schools</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Transport</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Shopping</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Heatmaps Panel */}
            {showHeatmap && (
              <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-fire-line mr-2 text-red-600"></i>
                  AI-Powered Market Heatmaps
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <button
                    onClick={() => setHeatmapType('pricing')}
                    className={`p-4 rounded-2xl border transition-all ${
                      heatmapType === 'pricing'
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className="ri-money-dollar-circle-line text-2xl mb-2"></i>
                    <div className="font-bold">Price Trends</div>
                    <div className="text-xs">Market pricing analysis</div>
                  </button>

                  <button
                    onClick={() => setHeatmapType('density')}
                    className={`p-4 rounded-2xl border transition-all ${
                      heatmapType === 'density'
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className="ri-building-line text-2xl mb-2"></i>
                    <div className="font-bold">Property Density</div>
                    <div className="text-xs">Listing concentration</div>
                  </button>

                  <button
                    onClick={() => setHeatmapType('growth')}
                    className={`p-4 rounded-2xl border transition-all ${
                      heatmapType === 'growth'
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className="ri-line-chart-line text-2xl mb-2"></i>
                    <div className="font-bold">Growth Potential</div>
                    <div className="text-xs">Investment opportunities</div>
                  </button>

                  <button className="p-4 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
                    <i className="ri-robot-line text-2xl mb-2"></i>
                    <div className="font-bold">AI Insights</div>
                    <div className="text-xs">Smart recommendations</div>
                  </button>
                </div>

                <div className="bg-white p-4 rounded-xl border border-red-200">
                  <GlobalHeatmap />
                </div>
              </div>
            )}
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredProperties.map((property) => (
              <div key={property.id} className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Property Image Gallery */}
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-10">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover object-top"
                    />
                  </div>
                  
                  {/* Property Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleSaveProperty(property.id)}
                      className={`p-3 rounded-full shadow-lg transition-all ${
                        savedProperties.includes(property.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-red-50'
                      }`}
                    >
                      <i className={`ri-heart-${savedProperties.includes(property.id) ? 'fill' : 'line'}`}></i>
                    </button>
                    <button className="p-3 bg-white text-gray-700 rounded-full shadow-lg hover:bg-blue-50 transition-all">
                      <i className="ri-share-line"></i>
                    </button>
                  </div>

                  {/* AI Match Score */}
                  {property.aiMatchScore && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      AI Match: {property.aiMatchScore}%
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 flex items-center">
                        <i className="ri-map-pin-line mr-2"></i>
                        {property.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-gray-900">{property.price}</div>
                      {property.estimatedValue && (
                        <div className="text-sm text-green-600 font-medium">
                          Est. Value: {property.estimatedValue}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-lg font-bold text-gray-900">{property.bedrooms}</div>
                      <div className="text-xs text-gray-600">Bedrooms</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-lg font-bold text-gray-900">{property.bathrooms}</div>
                      <div className="text-xs text-gray-600">Bathrooms</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-lg font-bold text-gray-900">{property.area}</div>
                      <div className="text-xs text-gray-600">Area</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleViewDetails(property)}
                      className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold whitespace-nowrap"
                    >
                      <i className="ri-eye-line mr-2"></i>
                      View Details
                    </button>
                    <button
                      onClick={() => handleAIAnalysis(property.id)}
                      className={`flex items-center justify-center px-4 py-3 rounded-xl transition-all font-bold whitespace-nowrap ${
                        showAIAnalysis === property.id
                          ? 'bg-purple-100 text-purple-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      }`}
                      disabled={showAIAnalysis === property.id}
                    >
                      {showAIAnalysis === property.id ? (
                        <>
                          <i className="ri-loader-4-line mr-2 animate-spin"></i>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <i className="ri-brain-line mr-2"></i>
                          AI Analysis
                        </>
                      )}
                    </button>
                  </div>

                  {/* Seller Contact */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-white"></i>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{property.seller.name}</div>
                          <div className="text-sm text-gray-600">
                            ⭐ {property.seller.rating} • Response: {property.seller.responseTime}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const message = prompt('Send a message to the seller:');
                          if (message) handleSendMessage(property.id, message);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                      >
                        <i className="ri-message-2-line mr-2"></i>
                        Send Message
                      </button>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={() => handleSendEmail('support@terravista.ai')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                    >
                      <i className="ri-mail-line mr-2"></i>
                      Send Email
                    </button>
                    <button 
                      onClick={() => handleCallNow('+971 4 123 4567')}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                    >
                      <i className="ri-phone-line mr-2"></i>
                      Call Now
                    </button>
                    <button 
                      onClick={() => handleStartChat('Support Team')}
                      className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
                    >
                      <i className="ri-chat-3-line mr-2"></i>
                      Start Chat
                    </button>
                    <button 
                      onClick={handleBookDemo}
                      className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-medium whitespace-nowrap"
                    >
                      <i className="ri-calendar-line mr-2"></i>
                      Book Demo
                    </button>
                  </div>

                  {/* Social Media Follow */}
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 mb-4">Follow us for the latest updates:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'YouTube', 'Telegram'].map((platform) => (
                        <button
                          key={platform}
                          onClick={() => handleFollowUs(platform)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap"
                        >
                          <i className={`ri-${platform.toLowerCase()}-line mr-2`}></i>
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Property Detail Modal */}
          {selectedProperty && (
            <PropertyDetailModal
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
              showAIInsights={true}
            />
          )}

          {/* Floating AI Assistant */}
          <div className="fixed bottom-6 right-6 z-40">
            <AIAssistant />
          </div>
        </div>
      </div>
    );
  }

  // Seller Account Page (with enhanced functions)
  if (selectedRole === 'seller') {
    // Seller functions
    const handleCreateNewListing = () => {
      console.log('Creating new listing...');
      alert('New Listing Creation Started!\n\nThis will guide you through:\n• Property details input\n• Photo upload\n• AI description generation\n• Pricing recommendations\n• Location mapping');
    };

    const handleGenerateAIDescriptions = () => {
      console.log('Generating AI descriptions...');
      alert('AI Description Generator Activated!\n\nGenerating descriptions in:\n• Professional tone\n• Luxury style\n• Family-focused approach\n• Multiple languages\n• SEO optimized content');
    };

    const handleGetDetailedAnalysis = () => {
      console.log('Getting detailed analysis...');
      alert('Detailed Market Analysis:\n\n• Comparable properties: 12 found\n• Market trends: +15.2% growth\n• Optimal pricing: AED 2.85M\n• Time to sell: 45-60 days\n• Competition from new developments\n• Recommendation: List now');
    };

    const handleViewComparables = () => {
      console.log('Viewing comparable properties...');
      alert('Comparable Properties Analysis:\n\n• Similar property 1: AED 2.72M (sold 30 days ago)\n• Similar property 2: AED 2.91M (active listing)\n• Similar property 3: AED 2.68M (sold 45 days ago)\n• Market average: AED 2.77M\n• Your premium: +2.9%');
    };

    const handleApplyPrice = () => {
      console.log('Applying recommended price...');
      alert('Price Applied Successfully!\n\nRecommended price: AED 2.85M\n• Market position: Competitive\n• Expected interest: High\n• Pricing strategy: Optimal\n• Next step: Finalize listing');
    };

    const handleConfirmLocation = () => {
      console.log('Confirming location and details...');
      alert('Location & Details Confirmed!\n\n• Address verified\n• GPS coordinates set\n• Building details saved\n• View type confirmed\n• Neighborhood data updated\n• Ready for listing');
    };

    const handleManageAllLeads = () => {
      console.log('Managing all leads...');
      alert('Lead Management System:\n\n• Total leads: 43\n• Hot prospects: 8\n• Scheduled viewings: 5\n• Follow-up required: 12\n• Conversion rate: 23.5%\n• Response time: <2 hours');
    };

    const handleAddListing = () => {
      console.log('Adding new listing...');
      alert('Add New Listing:\n\n• Property type selection\n• Upload photos/videos\n• Set pricing strategy\n• Choose marketing package\n• Schedule professional photos\n• Activate listing');
    };

    const handleContinueFreeListing = () => {
      console.log('Continuing with free listing...');
      alert('Free Listing Package:\n\n✓ Basic property listing\n✓ 5 photos maximum\n✓ Standard description\n✓ 30-day visibility\n✓ Basic analytics\n\nUpgrade anytime for premium features!');
    };

    const handleUpgradeToPremium = () => {
      console.log('Upgrading to premium...');
      alert('Premium Listing Package:\n\n✓ Unlimited photos/videos\n✓ AI-generated descriptions\n✓ Smart pricing recommendations\n✓ Priority placement\n✓ Advanced analytics\n✓ Lead management tools\n✓ Professional photography\n\nUpgrade now for better results!');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        <Navbar userRole={currentUser?.role} userName={currentUser?.name} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  🏠 Seller Dashboard
                </h1>
                <p className="text-xl text-gray-600 font-light">
                  AI-powered listing tools and property management for sellers
                </p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Hub
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="ri-team-line text-blue-600 text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">12</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Active Listings</h3>
              <p className="text-sm text-green-600">+3 this month</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="ri-home-4-line text-green-600 text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">186</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Total Listings</h3>
              <p className="text-sm text-green-600">45 added this week</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">AED 2.8M</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Monthly Revenue</h3>
              <p className="text-sm text-purple-600">+22% vs last month</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <i className="ri-handshake-line text-orange-600 text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">127</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Deals Closed</h3>
              <p className="text-sm text-orange-600">15 this month</p>
            </div>
          </div>

          {/* AI-Powered Listing Creation */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <i className="ri-robot-line mr-3 text-green-600"></i>
                  AI-Powered Listing Creation
                </h2>
                <p className="text-gray-600 mt-2">Create compelling property listings with AI assistance</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-bold">Premium</span>
                <button 
                  onClick={handleCreateNewListing}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-medium whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  Create New Listing
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Smart Description Generator */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-edit-2-line mr-2 text-blue-600"></i>
                  Smart Description Generator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                      <option>Luxury Apartment</option>
                      <option>Family Villa</option>
                      <option>Commercial Office</option>
                      <option>Retail Space</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tone Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors whitespace-nowrap">Professional</button>
                      <button className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors whitespace-nowrap">Luxury</button>
                      <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors whitespace-nowrap">Family-focused</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">🇺🇸 English</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">🇦🇪 Arabic</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">🇫🇷 French</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">🇪🇸 Spanish</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-xl border border-blue-200">
                    <h4 className="font-medium text-gray-900 mb-2">AI Quality Score</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <span className="text-sm font-bold text-green-600">92%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">SEO optimized • Keyword rich • Engaging tone</p>
                  </div>

                  <button 
                    onClick={handleGenerateAIDescriptions}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                  >
                    <i className="ri-magic-line mr-2"></i>
                    Generate AI Descriptions
                  </button>
                </div>
              </div>

              {/* Smart Pricing Recommendations */}
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-price-tag-3-line mr-2 text-green-600"></i>
                  Smart Pricing Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white rounded-xl border border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">AED 2.85M</div>
                    <div className="text-sm text-gray-600 mb-2">AI Recommended Price</div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-bold">95% Confidence</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-bold">Market Optimal</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Average:</span>
                      <span className="font-medium">AED 2.72M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your Property Premium:</span>
                      <span className="font-medium text-green-600">+4.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Time to Sell:</span>
                      <span className="font-medium">45-60 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comparable Sales:</span>
                      <span className="font-medium">12 recent</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button 
                      onClick={handleViewComparables}
                      className="px-3 py-2 bg-white text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors border border-green-200 whitespace-nowrap"
                    >
                      View Comparables
                    </button>
                    <button 
                      onClick={handleApplyPrice}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
                    >
                      Apply Price
                    </button>
                  </div>

                  <button 
                    onClick={handleGetDetailedAnalysis}
                    className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                  >
                    <i className="ri-calculator-line mr-2"></i>
                    Get Detailed Analysis
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Map Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-map-2-line mr-2 text-purple-600"></i>
                Interactive Property Location
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center border border-gray-300">
                    <div className="text-center">
                      <i className="ri-map-pin-line text-4xl text-gray-400 mb-2"></i>
                      <p className="text-gray-600 font-medium">Google Maps Integration</p>
                      <p className="text-sm text-gray-500">Pin exact property location</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                    <textarea 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Enter complete property address including building name, street, district..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Building Facade</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8">
                        <option>Modern Glass</option>
                        <option>Classic Stone</option>
                        <option>Contemporary Mixed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">View Type</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8">
                        <option>Sea View</option>
                        <option>City Skyline</option>
                        <option>Garden View</option>
                        <option>Pool View</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirmLocation}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
                  >
                    <i className="ri-map-pin-add-line mr-2"></i>
                    Confirm Location & Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Listing Management & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Performance Analytics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-bar-chart-2-line mr-2 text-blue-600"></i>
                Performance Analytics
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Property Views</span>
                    <span className="text-lg font-bold text-blue-600">1,247</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">+18% from last week</p>
                </div>

                <div className="p-4 bg-green-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Inquiries</span>
                    <span className="text-lg font-bold text-green-600">43</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">8 new today</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                    <span className="text-lg font-bold text-purple-600">5.8%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '58%'}}></div>
                  </div>
                  <p className="text-xs text-purple-600 mt-1">Above industry average</p>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium whitespace-nowrap">
                  <i className="ri-line-chart-line mr-2"></i>
                  View Detailed Analytics
                </button>
              </div>
            </div>

            {/* Lead Management */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-contacts-line mr-2 text-green-600"></i>
                Lead Management
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  { name: 'Ahmed Al-Rashid', property: 'Marina Penthouse', status: 'Hot', time: '2 hours ago', phone: '+971 50 123 4567' },
                  { name: 'Sarah Johnson', property: 'Downtown Apartment', status: 'Warm', time: '5 hours ago', phone: '+971 55 987 6543' },
                  { name: 'Mohammed Hassan', property: 'Business Bay Office', status: 'Cold', time: '1 day ago', phone: '+971 52 456 7890' }
                ].map((lead, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{lead.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-600">{lead.property}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          lead.status === 'Hot' ? 'bg-red-100 text-red-700' :
                          lead.status === 'Warm' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {lead.status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{lead.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{lead.phone}</span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors whitespace-nowrap">
                          <i className="ri-phone-line mr-1"></i>Call
                        </button>
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors whitespace-nowrap">
                          <i className="ri-message-2-line mr-1"></i>Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleManageAllLeads}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-user-add-line mr-2"></i>
                Manage All Leads
              </button>
            </div>
          </div>

          {/* Current Listings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <i className="ri-list-check mr-2 text-orange-600"></i>
                Your Active Listings
              </h3>
              <div className="flex items-center space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm pr-8">
                  <option>All Properties</option>
                  <option>High Performing</option>
                  <option>Needs Attention</option>
                </select>
                <button 
                  onClick={handleAddListing}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm whitespace-nowrap"
                >
                  <i className="ri-add-line mr-1"></i>
                  Add Listing
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Luxury Marina Penthouse', price: 'AED 2.85M', views: 342, inquiries: 12, status: 'Hot', image: 'penthouse' },
                { title: 'Downtown Family Apartment', price: 'AED 1.65M', views: 198, inquiries: 8, status: 'Active', image: 'apartment' },
                { title: 'Business Bay Office', price: 'AED 3.2M', views: 156, inquiries: 5, status: 'Needs Boost', image: 'office' }
              ].map((listing, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                    <i className="ri-image-line text-3xl text-gray-400"></i>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      listing.status === 'Hot' ? 'bg-red-100 text-red-700' :
                      listing.status === 'Active' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {listing.status}
                    </span>
                    <span className="text-lg font-bold text-gray-900">{listing.price}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-3">{listing.title}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{listing.views}</div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{listing.inquiries}</div>
                      <div className="text-xs text-gray-600">Inquiries</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors whitespace-nowrap">
                      Edit
                    </button>
                    <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors whitespace-nowrap">
                      Boost
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monetization CTA */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Unlock Premium AI Features</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get AI-powered descriptions, smart pricing, advanced analytics, and priority support. 
              Free listings available, but unlock your property's full potential with AI.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleContinueFreeListing}
                className="bg-white text-green-700 px-6 py-3 rounded-2xl border border-green-200 hover:bg-green-50 transition-colors font-medium whitespace-nowrap"
              >
                Continue with Free Listing
              </button>
              <button 
                onClick={handleUpgradeToPremium}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all font-medium whitespace-nowrap"
              >
                <i className="ri-vip-crown-line mr-2"></i>
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Real Estate Agency Account Page
  if (selectedRole === 'agency') {
    // Agency functions for Lead Analytics and Revenue Dashboard
    const handleViewLeadAnalytics = () => {
      alert(`📊 Advanced Lead Analytics Dashboard\n\n📈 Key Metrics:\n• Total Leads: 847 (+12% this month)\n• Conversion Rate: 23.5% (Above avg)\n• Cost per Lead: AED 125\n• Lead Quality Score: 8.2/10\n• Response Time: <2 hours\n\n📱 Lead Sources Performance:\n• Website Forms: 342 leads (28% conversion)\n• Social Media: 245 leads (22% conversion)\n• Referrals: 156 leads (35% conversion)\n• Walk-ins: 104 leads (18% conversion)\n\n🎯 Conversion Funnel:\n• Initial Contact: 847\n• Qualified: 423 (50%)\n• Viewing Scheduled: 287 (34%)\n• Offer Made: 156 (18%)\n• Deal Closed: 127 (15%)\n\n📅 Trend Analysis:\n• Best performing day: Tuesday\n• Peak hours: 10AM-12PM, 3PM-5PM\n• Seasonal trends: +25% in Q1\n\n🔍 Lead Scoring Model:\n• Demographics: 25%\n• Engagement: 30%\n• Budget qualification: 35%\n• Timeline urgency: 10%\n\n🚀 Recommendations:\n• Focus on referral programs\n• Optimize Tuesday campaigns\n• Improve social media conversion\n• Implement chatbot for off-hours`);
    };

    const handleViewRevenueDashboard = () => {
      alert(`💰 Revenue & Deal Tracking Dashboard\n\n📊 Current Month Performance:\n• Total Revenue: AED 2.8M (+22%)\n• Deals Closed: 127 (+15%)\n• Average Deal Size: AED 22K\n• Commission Rate: 2.5%\n• Gross Margin: 85%\n\n🏆 Top Performers:\n• Sarah Ahmed: AED 1.2M (23 deals)\n• Mohammed Ali: AED 2.8M (18 deals)\n• Fatima Hassan: AED 890K (15 deals)\n\n📈 Revenue Trends:\n• Q1 2024: AED 7.2M\n• Q2 2024: AED 8.1M (+12.5%)\n• Q3 2024: AED 8.9M (+9.8%)\n• Q4 Projection: AED 9.5M\n\n🎯 Sales Pipeline Value:\n• Prospecting: AED 12.5M (45 deals)\n• Qualified: AED 8.2M (28 deals)\n• Proposal: AED 5.1M (15 deals)\n• Negotiation: AED 2.8M (8 deals)\n• Total Pipeline: AED 28.6M\n\n📊 Revenue by Property Type:\n• Residential: 65% (AED 1.82M)\n• Commercial: 25% (AED 700K)\n• Land: 10% (AED 280K)\n\n🏢 Revenue by Location:\n• Dubai Marina: 35%\n• Business Bay: 25%\n• Downtown: 20%\n• Other Areas: 20%\n\n⏰ Average Sales Cycle:\n• Residential: 45 days\n• Commercial: 75 days\n• Land: 90 days\n\n🎯 Monthly Targets:\n• Revenue Target: AED 3.2M\n• Achievement: 87.5%\n• Deals Target: 140\n• Achievement: 90.7%`);
    };

    const handleDownloadTemplate = () => {
      alert(`📥 Download Excel Template\n\n📋 Available Templates:\n\n1️⃣ PROPERTY LISTING TEMPLATE\n• Property details (50+ fields)\n• Pricing & financial info\n• Location & amenities\n• Photos & documents\n• Marketing preferences\n\n2️⃣ BULK IMPORT TEMPLATE\n• Multiple properties format\n• Validation rules\n• Required fields guide\n• Data formatting examples\n• Error prevention tips\n\n3️⃣ AGENT PERFORMANCE TEMPLATE\n• KPI tracking fields\n• Commission calculations\n• Target vs actual\n• Monthly reporting\n• Bonus structures\n\n4️⃣ LEAD MANAGEMENT TEMPLATE\n• Contact information\n• Lead source tracking\n• Status progression\n• Follow-up schedules\n• Conversion metrics\n\n📊 Template Features:\n• Auto-calculations\n• Data validation\n• Dropdown lists\n• Conditional formatting\n• Import ready format\n\n💾 File Formats:\n• Excel (.xlsx) - Recommended\n• CSV (.csv) - Basic\n• Google Sheets compatible\n\n📧 Template will be sent to: ${currentUser?.email || 'your-email@domain.com'}\n⏱️ Delivery time: Instant\n\n🔄 Regular updates available with new features`);
    };

    const handleUploadFile = () => {
      alert(`📤 File Upload Center\n\n📁 Supported File Types:\n• Excel files (.xlsx, .xls)\n• CSV files (.csv)\n• Images (.jpg, .png, .heic)\n• Documents (.pdf, .doc, .docx)\n• Videos (.mp4, .mov)\n\n📊 Bulk Upload Features:\n• Property data import\n• Photo batch upload\n• Document attachment\n• Agent information\n• Lead import\n\n⚡ Upload Process:\n1. Select file type\n2. Choose template\n3. Map data fields\n4. Validate information\n5. Preview & confirm\n6. Process & import\n\n🔧 Data Validation:\n• Required field checking\n• Format verification\n• Duplicate detection\n• Error reporting\n• Auto-correction suggestions\n\n📈 Processing Capacity:\n• Max file size: 50MB\n• Max records: 10,000 per file\n• Concurrent uploads: 5 files\n• Processing speed: 100 records/min\n\n🛡️ Security Features:\n• Encrypted transmission\n• Virus scanning\n• Data backup\n• Access logging\n• GDPR compliance\n\n📧 Progress notifications sent to: ${currentUser?.email || 'your-email@domain.com'}\n\n🚀 Ready to upload? Choose your file...`);
    };

    const handleAddNewAgent = () => {
      alert(`👥 Add New Agent to Team\n\n📝 Required Information:\n• Full name & contact details\n• Professional credentials\n• Experience level\n• Specialization areas\n• Language proficiencies\n• Territory assignment\n\n🏢 Setup Process:\n1. Personal Information\n2. Professional Background\n3. System Access Setup\n4. Territory Assignment\n5. Commission Structure\n6. Training Schedule\n\n💼 Agent Specializations:\n• Residential Properties\n• Commercial Real Estate\n• Luxury Properties\n• Land Development\n• Investment Properties\n• International Clients\n\n🌍 Language Support:\n• Arabic (Native/Fluent)\n• English (Required)\n• Hindi/Urdu\n• French\n• Russian\n• Chinese\n• Other languages\n\n📊 Commission Structures:\n• Junior Agent: 40-50%\n• Senior Agent: 50-65%\n• Team Leader: 65-75%\n• Partner Level: 75-85%\n\n🎯 Performance Targets:\n• Monthly deals target\n• Revenue objectives\n• Client satisfaction score\n• Lead conversion rate\n• Response time standards\n\n🛠️ System Access:\n• CRM platform access\n• Property database\n• Marketing tools\n• Client communication\n• Reporting dashboard\n• Mobile app access\n\n📚 Training Program:\n• Platform orientation\n• Sales methodology\n• Product knowledge\n• Legal compliance\n• Customer service\n• Technology tools\n\n📧 Invitation sent to new agent email\n⏱️ Setup completion: 24-48 hours\n🎉 Welcome package prepared`);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
        <Navbar userRole={currentUser?.role} userName={currentUser?.name} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  🏢 Agency Command Center
                </h1>
                <p className="text-xl text-gray-600 font-light">
                  Professional tools for real estate agencies and teams
                </p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Hub
              </button>
            </div>
          </div>

          {/* Agency Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="ri-team-line text-blue-600 text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">24</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Active Agents</h3>
              <p className="text-sm text-green-600">+3 new this month</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="ri-home-4-line text-green-600 text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">186</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Total Listings</h3>
              <p className="text-sm text-green-600">45 added this week</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">AED 2.8M</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Monthly Revenue</h3>
              <p className="text-sm text-purple-600">+22% vs last month</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <i className="ri-handshake-line text-orange-600 text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">127</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Deals Closed</h3>
              <p className="text-sm text-orange-600">15 this month</p>
            </div>
          </div>

          {/* Professional CRM System */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="ri-customer-service-2-line mr-3 text-blue-600"></i>
                Professional CRM System
              </h2>
              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap">
                  <i className="ri-user-add-line mr-1"></i>
                  Add Client
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm whitespace-nowrap">
                  <i className="ri-upload-2-line mr-1"></i>
                  Import Contacts
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Client Pipeline */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Client Pipeline</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Hassan Al-Mahmoud', type: 'Buyer', status: 'Viewing Scheduled', value: 'AED 3.2M', agent: 'Sarah Ahmed', priority: 'High' },
                    { name: 'Emirates Holdings LLC', type: 'Investor', status: 'Negotiating', value: 'AED 12.5M', agent: 'Mohammed Ali', priority: 'High' },
                    { name: 'Lisa Thompson', type: 'Buyer', status: 'Pre-approved', value: 'AED 1.8M', agent: 'Fatima Hassan', priority: 'Medium' },
                    { name: 'Dubai Properties Group', type: 'Seller', status: 'Listing Prep', value: 'AED 8.7M', agent: 'Omar Khalil', priority: 'Medium' }
                  ].map((client, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{client.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-600">{client.type} • Assigned to {client.agent}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{client.value}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            client.priority === 'High' ? 'bg-red-100 text-red-700' :
                            client.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {client.priority}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          client.status === 'Viewing Scheduled' ? 'bg-blue-100 text-blue-700' :
                          client.status === 'Negotiating' ? 'bg-green-100 text-green-700' :
                          client.status === 'Pre-approved' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {client.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-white text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors border whitespace-nowrap">
                            View Profile
                          </button>
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors whitespace-nowrap">
                            Update Status
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors font-medium text-left whitespace-nowrap">
                    <i className="ri-phone-line mr-2"></i>
                    Schedule Follow-up Calls
                  </button>
                  <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors font-medium text-left whitespace-nowrap">
                    <i className="ri-mail-send-line mr-2"></i>
                    Send Marketing Campaign
                  </button>
                  <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors font-medium text-left whitespace-nowrap">
                    <i className="ri-calendar-event-line mr-2"></i>
                    Book Property Viewings
                  </button>
                  <button className="w-full p-3 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors font-medium text-left whitespace-nowrap">
                    <i className="ri-file-text-line mr-2"></i>
                    Generate Reports
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl text-white">
                  <h4 className="font-bold mb-2">Communication History</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Emails Sent:</span>
                      <span className="font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calls Made:</span>
                      <span className="font-bold">856</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meetings:</span>
                      <span className="font-bold">342</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Management & Bulk Property Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-group-line mr-2 text-green-600"></i>
                Team Management
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Ahmed', role: 'Senior Agent', deals: 23, revenue: '1.2M', performance: 95 },
                  { name: 'Mohammed Ali', role: 'Commercial Specialist', deals: 18, revenue: '2.8M', performance: 92 },
                  { name: 'Fatima Hassan', role: 'Residential Agent', deals: 15, revenue: '890K', performance: 88 },
                  { name: 'Omar Khalil', role: 'Luxury Properties', deals: 12, revenue: '1.5M', performance: 85 }
                ].map((agent, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{agent.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-600">{agent.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">AED {agent.revenue}</div>
                        <div className="text-sm text-gray-600">{agent.deals} deals</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Performance Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{width: `${agent.performance}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-green-600">{agent.performance}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleAddNewAgent}
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-user-add-line mr-2"></i>
                Add New Agent
              </button>
            </div>

            {/* Bulk Property Management */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-upload-cloud-2-line mr-2 text-orange-600"></i>
                Bulk Property Management
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <h4 className="font-bold text-orange-800 mb-2">Quick Upload</h4>
                  <p className="text-sm text-orange-700 mb-4">Upload multiple properties at once using Excel template</p>
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleDownloadTemplate}
                      className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      <i className="ri-download-line mr-1"></i>
                      Download Template
                    </button>
                    <button 
                      onClick={handleUploadFile}
                      className="flex-1 bg-white text-orange-600 py-2 rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      <i className="ri-upload-2-line mr-1"></i>
                      Upload File
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Bulk Actions</h4>
                  <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors font-medium text-left whitespace-nowrap">
                    <i className="ri-edit-2-line mr-2"></i>
                    Update Multiple Prices
                  </button>
                  <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors font-medium text-left whitespace-nowrap">
                    <i className="ri-refresh-line mr-2"></i>
                    Refresh All Listings
                  </button>
                  <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors font-medium text-left whitespace-nowrap">
                    <i className="ri-share-line mr-2"></i>
                    Bulk Marketing Campaign
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-2">Recent Uploads</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Marina Properties (15 units)</span>
                      <span className="text-green-600 font-medium">Success</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Downtown Offices (8 units)</span>
                      <span className="text-blue-600 font-medium">Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Lead Generation & Revenue Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Lead Generation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-user-search-line mr-2 text-purple-600"></i>
                Advanced Lead Generation
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">847</div>
                    <div className="text-sm text-gray-600">Total Leads</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">23.5%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Lead Sources</h4>
                  {[
                    { source: 'Website Forms', leads: 342, conversion: '28%', color: 'bg-blue-500' },
                    { source: 'Social Media', leads: 245, conversion: '22%', color: 'bg-green-500' },
                    { source: 'Referrals', leads: 156, conversion: '35%', color: 'bg-purple-500' },
                    { source: 'Walk-ins', leads: 104, conversion: '18%', color: 'bg-orange-500' }
                  ].map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                        <span className="text-sm font-medium text-gray-900">{source.source}</span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-bold text-gray-900">{source.leads}</div>
                        <div className="text-gray-600">{source.conversion}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleViewLeadAnalytics}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-line-chart-line mr-2"></i>
                  View Lead Analytics
                </button>
              </div>
            </div>

            {/* Revenue & Deal Tracking */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-funds-line mr-2 text-green-600"></i>
                Revenue & Deal Tracking
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">AED 2.8M</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">127</div>
                    <div className="text-sm text-gray-600">Deals Closed</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Sales Pipeline</h4>
                  {[
                    { stage: 'Prospecting', deals: 45, value: '12.5M', color: 'bg-gray-400' },
                    { stage: 'Qualified', deals: 28, value: '8.2M', color: 'bg-blue-400' },
                    { stage: 'Proposal', deals: 15, value: '5.1M', color: 'bg-yellow-400' },
                    { stage: 'Negotiation', deals: 8, value: '2.8M', color: 'bg-orange-400' },
                    { stage: 'Closed Won', deals: 12, value: '3.5M', color: 'bg-green-400' }
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                        <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-bold text-gray-900">{stage.deals} deals</div>
                        <div className="text-gray-600">AED {stage.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleViewRevenueDashboard}
                  className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                >
                  <i className="ri-pie-chart-2-line mr-2"></i>
                  View Revenue Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Premium Features CTA */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center border border-orange-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Real Estate Solution</h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Complete agency management suite with CRM, team collaboration, bulk operations, and advanced analytics. 
              Everything your real estate business needs to scale and succeed.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-orange-700 px-6 py-3 rounded-xl border border-orange-200 hover:bg-orange-50 transition-colors font-medium whitespace-nowrap">
                Schedule Demo
              </button>
              <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-medium whitespace-nowrap">
                <i className="ri-rocket-line mr-2"></i>
                Start Enterprise Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BuyerSellerPage;
