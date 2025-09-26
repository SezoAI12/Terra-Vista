
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'notifications' | 'help' | 'settings'>('profile');
  const [showEditModal, setShowEditModal] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(12);
  const [currentUser, setCurrentUser] = useState<{email: string, role: string, name: string} | null>(null);

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Get user profile data based on role
  const getUserProfileData = () => {
    if (!currentUser) return null;

    const baseProfile = {
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      profileVisibility: true,
      emailNotifications: true,
      avatar: null
    };

    switch (currentUser.role) {
      case 'Investor':
        return {
          ...baseProfile,
          phone: '+971 50 123 4567',
          location: 'Dubai, UAE',
          company: 'Hassan Investment Group',
          investmentFocus: 'Commercial Real Estate',
          experienceLevel: 'Expert (10+ years)',
          licenses: ['RERA License: 12345', 'Investment Advisory: IA-567'],
          specializations: ['Luxury Properties', 'Commercial Assets', 'International Markets'],
          achievements: ['Top Performer 2023', '$50M+ Portfolio Managed', 'Expert Certification']
        };
      case 'Buyer':
        return {
          ...baseProfile,
          phone: '+971 55 987 6543',
          location: 'Abu Dhabi, UAE',
          company: 'Hassan Holdings',
          investmentFocus: 'Residential Properties',
          experienceLevel: 'Intermediate (3-5 years)',
          preferences: ['Family Homes', 'Investment Properties', 'Off-Plan Projects'],
          budget: 'AED 2M - 5M',
          searchCriteria: ['Marina Area', '2-3 Bedrooms', 'Sea View Preferred']
        };
      case 'Seller':
        return {
          ...baseProfile,
          phone: '+971 52 456 7890',
          location: 'Sharjah, UAE',
          company: 'Al-Zahra Properties',
          investmentFocus: 'Mixed Use Development',
          experienceLevel: 'Advanced (6-10 years)',
          licenses: ['RERA Broker License: BRK-789', 'Property Management: PM-234'],
          propertyPortfolio: '15 Active Listings',
          avgListingPrice: 'AED 2.8M',
          successRate: '87% Sold in 60 days'
        };
      case 'Real Estate Agency':
        return {
          ...baseProfile,
          phone: '+971 4 123 4567',
          location: 'Dubai Marina, UAE',
          company: 'Dubai Properties LLC',
          investmentFocus: 'Full Service Real Estate',
          experienceLevel: 'Expert (15+ years)',
          licenses: ['Master Broker License: MB-001', 'Agency License: AG-123'],
          teamSize: '24 Active Agents',
          monthlyVolume: 'AED 45M+',
          marketShare: '12% in Dubai Marina'
        };
      default:
        return baseProfile;
    }
  };

  const [userProfile, setUserProfile] = useState(getUserProfileData() || {
    name: 'Guest User',
    email: 'guest@terravista.com',
    phone: '+971 50 000 0000',
    location: 'Dubai, UAE',
    role: 'Guest',
    company: 'N/A',
    investmentFocus: 'N/A',
    experienceLevel: 'N/A',
    profileVisibility: true,
    emailNotifications: true,
    avatar: null
  });

  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  // Update profile when currentUser changes
  useEffect(() => {
    const profileData = getUserProfileData();
    if (profileData) {
      setUserProfile(profileData);
      setTempProfile(profileData);
    }
  }, [currentUser]);

  // Enhanced Messages data with more variety
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      title: 'Portfolio Performance Update',
      content: `Your portfolio has grown by 8.2% this month, with Dubai Marina properties leading the gains. AI analysis shows continued upward trend for Q2.`,
      timestamp: '2 hours ago',
      isRead: false,
      actions: [
        { label: 'View Portfolio', action: 'portfolio' },
        { label: 'Generate Report', action: 'report' }
      ]
    },
    {
      id: 2,
      type: 'opportunity',
      title: `${currentUser?.role === 'Buyer' ? 'Premium Property Match' : 'Premium Investment Opportunity'}`,
      content: `AI has identified a luxury ${currentUser?.role === 'Buyer' ? 'family home' : 'penthouse'} in Business Bay matching your ${currentUser?.role === 'Buyer' ? 'buying' : 'investment'} criteria. ${currentUser?.role === 'Buyer' ? 'Perfect location for family living' : 'Expected ROI: 16.8%'}, Prime location with marina views.`,
      timestamp: '4 hours ago',
      isRead: false,
      actions: [
        { label: 'View Property', action: 'property' },
        { label: 'Schedule Viewing', action: 'schedule' },
        { label: 'AI Analysis', action: 'analysis' }
      ]
    },
    {
      id: 3,
      type: 'alert',
      title: 'Price Drop Alert - Urgent',
      content: `A property on your watchlist in Downtown Dubai has reduced its price by 12% - now AED 8.5M. This represents a rare opportunity in the current market.`,
      timestamp: '6 hours ago',
      isRead: false,
      actions: [
        { label: 'View Property', action: 'property' },
        { label: currentUser?.role === 'Buyer' ? 'Make Inquiry' : 'Make Offer', action: 'offer' },
        { label: 'Compare Market', action: 'compare' }
      ]
    },
    {
      id: 4,
      type: 'report',
      title: 'Weekly Market Intelligence Report',
      content: `Your personalized market analysis for MENA region is now available. Includes predictive analytics, trend forecasts, and ${currentUser?.role === 'Buyer' ? 'buying' : 'investment'} recommendations.`,
      timestamp: '1 day ago',
      isRead: false,
      actions: [
        { label: 'Download PDF', action: 'download' },
        { label: 'View Online', action: 'view' },
        { label: 'Share Report', action: 'share' }
      ]
    },
    {
      id: 5,
      type: 'feature',
      title: 'New AI Features Available',
      content: `Enhanced property valuation models and predictive analytics are now live. Experience 99.7% accuracy in market predictions and automated ${currentUser?.role === 'Buyer' ? 'property matching' : 'investment scoring'}.`,
      timestamp: '1 day ago',
      isRead: false,
      actions: [
        { label: 'Explore Features', action: 'features' },
        { label: 'Watch Demo', action: 'demo' }
      ]
    },
    {
      id: 6,
      type: 'system',
      title: 'Account Security Enhancement',
      content: 'Your account data is now encrypted with advanced security protocols. Multi-factor authentication has been enabled for enhanced protection.',
      timestamp: '2 days ago',
      isRead: true,
      actions: [
        { label: 'Review Settings', action: 'security' }
      ]
    },
    {
      id: 7,
      type: 'opportunity',
      title: 'Market Expansion Recommendation',
      content: `Based on your portfolio analysis, consider diversifying into Turkish real estate market. Istanbul showing 25% growth potential with favorable currency rates.`,
      timestamp: '3 days ago',
      isRead: true,
      actions: [
        { label: 'View Turkish Properties', action: 'turkish-properties' },
        { label: 'Market Analysis', action: 'analysis' },
        { label: 'Risk Assessment', action: 'risk' }
      ]
    },
    {
      id: 8,
      type: 'alert',
      title: currentUser?.role === 'Seller' ? 'Property Inquiry Received' : 'Rental Income Processed',
      content: currentUser?.role === 'Seller' ? 'New inquiry received for your Downtown Dubai property. Potential buyer requesting viewing appointment.' : 'Monthly rental payment of AED 45,000 has been deposited to your account. Property: Marina Heights Tower, Unit 2401.',
      timestamp: '4 days ago',
      isRead: true,
      actions: [
        { label: currentUser?.role === 'Seller' ? 'View Inquiry' : 'View Transaction', action: 'transaction' },
        { label: currentUser?.role === 'Seller' ? 'Contact Buyer' : 'Download Receipt', action: 'receipt' }
      ]
    },
    {
      id: 9,
      type: 'feature',
      title: 'Smart Contract Integration',
      content: 'New blockchain-based smart contracts are now available for secure, automated property transactions. Reduce paperwork and increase security.',
      timestamp: '5 days ago',
      isRead: true,
      actions: [
        { label: 'Learn More', action: 'learn' },
        { label: 'Enable Feature', action: 'enable' }
      ]
    },
    {
      id: 10,
      type: 'system',
      title: 'Platform Maintenance Complete',
      content: 'Scheduled maintenance has been completed. New performance improvements include 40% faster load times and enhanced AI processing speeds.',
      timestamp: '6 days ago',
      isRead: true,
      actions: []
    },
    {
      id: 11,
      type: 'opportunity',
      title: 'Exclusive Private Sale Access',
      content: `You have been invited to an exclusive private sale event featuring premium properties in Palm Jumeirah. Limited to ${currentUser?.role === 'Real Estate Agency' ? 'top real estate partners' : 'top-tier investors'} only.`,
      timestamp: '1 week ago',
      isRead: true,
      actions: [
        { label: 'RSVP Event', action: 'rsvp' },
        { label: 'View Properties', action: 'properties' }
      ]
    },
    {
      id: 12,
      type: 'alert',
      title: 'Market Volatility Warning',
      content: 'AI systems have detected unusual market activity in the Dubai real estate sector. Recommend holding current positions and monitoring closely.',
      timestamp: '1 week ago',
      isRead: true,
      actions: [
        { label: 'View Analysis', action: 'analysis' },
        { label: 'Adjust Strategy', action: 'strategy' }
      ]
    }
  ]);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'system': return 'ri-settings-line';
      case 'opportunity': return 'ri-lightbulb-line';
      case 'alert': return 'ri-notification-2-line';
      case 'report': return 'ri-file-chart-line';
      case 'feature': return 'ri-magic-line';
      default: return 'ri-mail-line';
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-blue-600 bg-blue-50';
      case 'opportunity': return 'text-green-600 bg-green-50';
      case 'alert': return 'text-orange-600 bg-orange-50';
      case 'report': return 'text-purple-600 bg-purple-50';
      case 'feature': return 'text-pink-600 bg-pink-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const markAsRead = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
    if (messages.find(m => m.id === messageId && !m.isRead)) {
      setUnreadMessages(prev => Math.max(0, prev - 1));
    }
  };

  const markAsUnread = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: false } : msg
    ));
    if (messages.find(m => m.id === messageId && m.isRead)) {
      setUnreadMessages(prev => prev + 1);
    }
  };

  const deleteMessage = (messageId: number) => {
    const message = messages.find(m => m.id === messageId);
    if (message && !message.isRead) {
      setUnreadMessages(prev => Math.max(0, prev - 1));
    }
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleEditProfile = () => {
    setTempProfile({ ...userProfile });
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    setUserProfile({ ...tempProfile });
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setTempProfile({ ...userProfile });
    setShowEditModal(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: 'ri-user-line' },
    { id: 'messages', label: 'Messages', icon: 'ri-mail-line', badge: unreadMessages },
    { id: 'billing', label: 'Billing', icon: 'ri-bank-card-line' },
    { id: 'notifications', label: 'Notifications', icon: 'ri-notification-line' },
    { id: 'privacy', label: 'Privacy', icon: 'ri-shield-user-line' },
    { id: 'help', label: 'Help & Support', icon: 'ri-question-line' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar userRole="Investor" userName="Sarah Al-Rashid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">Account Settings</h1>
              <p className="text-xl text-gray-600 font-light">Manage your profile, preferences, and account settings</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <i className="ri-dashboard-line"></i>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-user-line mr-2"></i>
              Profile
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'billing'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-bank-card-line mr-2"></i>
              Billing & Subscription
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'notifications'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-notification-3-line mr-2"></i>
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'help'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-question-line mr-2"></i>
              Help & Support
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-settings-3-line mr-2"></i>
              Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{userProfile.name}</h3>
                    <p className="text-sm text-gray-600">{userProfile.role}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <i className={`${tab.icon} text-lg`}></i>
                    <span className="font-medium">{tab.label}</span>
                    {tab.badge && tab.badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
                        <p className="text-gray-600">Manage your personal information and professional credentials</p>
                      </div>
                      <button
                        onClick={handleEditProfile}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                      >
                        <i className="ri-edit-2-line mr-2"></i>
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <i className="ri-user-line text-blue-600"></i>
                              <span className="text-gray-900 font-medium">{userProfile.name}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <i className="ri-mail-line text-blue-600"></i>
                              <span className="text-gray-900 font-medium">{userProfile.email}</span>
                              <span className="ml-auto px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                                Verified
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <i className="ri-phone-line text-blue-600"></i>
                              <span className="text-gray-900 font-medium">{userProfile.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <i className="ri-map-pin-line text-blue-600"></i>
                              <span className="text-gray-900 font-medium">{userProfile.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Role-specific fields */}
                        {userProfile.licenses && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Licenses</label>
                            <div className="space-y-2">
                              {userProfile.licenses.map((license, index) => (
                                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                                  <div className="flex items-center space-x-2">
                                    <i className="ri-shield-check-line text-green-600"></i>
                                    <span className="text-sm font-medium text-green-800">{license}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Role</label>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <i className="ri-briefcase-line text-purple-600"></i>
                              <span className="text-gray-900 font-medium">{userProfile.role}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <i className="ri-building-line text-purple-600"></i>
                              <span className="text-gray-900 font-medium">{userProfile.company}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Focus</label>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <i className="ri-target-line text-green-600"></i>
                              <span className="text-gray-900 font-medium">{userProfile.investmentFocus}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <i className="ri-star-line text-orange-600"></i>
                              <span className="text-gray-900 font-medium">{userProfile.experienceLevel}</span>
                            </div>
                          </div>
                        </div>

                        {/* Additional role-specific fields */}
                        {userProfile.teamSize && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                              <div className="flex items-center space-x-3">
                                <i className="ri-group-line text-blue-600"></i>
                                <span className="text-gray-900 font-medium">{userProfile.teamSize}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {userProfile.monthlyVolume && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Volume</label>
                            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                              <div className="flex items-center space-x-3">
                                <i className="ri-money-dollar-circle-line text-green-600"></i>
                                <span className="text-gray-900 font-medium">{userProfile.monthlyVolume}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {userProfile.propertyPortfolio && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Property Portfolio</label>
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                              <div className="flex items-center space-x-3">
                                <i className="ri-home-4-line text-orange-600"></i>
                                <span className="text-gray-900 font-medium">{userProfile.propertyPortfolio}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Professional Achievements Section */}
                    {(userProfile.achievements || userProfile.specializations) && (
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Professional Achievements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {userProfile.achievements && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3">Achievements</h4>
                              <div className="space-y-2">
                                {userProfile.achievements.map((achievement, index) => (
                                  <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <i className="ri-award-line text-yellow-600"></i>
                                    <span className="text-sm font-medium text-yellow-800">{achievement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {userProfile.specializations && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3">Specializations</h4>
                              <div className="space-y-2">
                                {userProfile.specializations.map((spec, index) => (
                                  <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                    <i className="ri-focus-3-line text-purple-600"></i>
                                    <span className="text-sm font-medium text-purple-800">{spec}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Performance Metrics for Sellers/Agencies */}
                    {(userProfile.successRate || userProfile.marketShare) && (
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {userProfile.successRate && (
                            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                              <div className="text-3xl font-bold text-green-600 mb-2">{userProfile.successRate}</div>
                              <div className="text-sm text-green-800 font-medium">Success Rate</div>
                            </div>
                          )}
                          
                          {userProfile.avgListingPrice && (
                            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                              <div className="text-3xl font-bold text-blue-600 mb-2">{userProfile.avgListingPrice}</div>
                              <div className="text-sm text-blue-800 font-medium">Average Listing</div>
                            </div>
                          )}
                          
                          {userProfile.marketShare && (
                            <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                              <div className="text-3xl font-bold text-purple-600 mb-2">{userProfile.marketShare}</div>
                              <div className="text-sm text-purple-800 font-medium">Market Share</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Profile Settings */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <i className="ri-eye-line text-blue-600"></i>
                            <div>
                              <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                              <p className="text-sm text-gray-600">Allow other users to see your profile and credentials</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={userProfile.profileVisibility}
                              onChange={(e) => setUserProfile(prev => ({ ...prev, profileVisibility: e.target.checked }))}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <i className="ri-notification-line text-green-600"></i>
                            <div>
                              <h4 className="font-medium text-gray-900">Email Notifications</h4>
                              <p className="text-sm text-gray-600">Receive market updates and opportunities via email</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={userProfile.emailNotifications}
                              onChange={(e) => setUserProfile(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <i className="ri-shield-check-line text-blue-600"></i>
                            <div>
                              <h4 className="font-medium text-gray-900">Data Security & Compliance</h4>
                              <p className="text-sm text-gray-600">Your data is encrypted and complies with GDPR standards</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                            Protected
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div>
                  <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages & Notifications</h2>
                        <p className="text-gray-600">Stay updated with system notifications, opportunities, and market insights</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {unreadMessages > 0 && (
                          <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                            {unreadMessages} unread
                          </div>
                        )}
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
                          {messages.length} total
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Message Categories Filter */}
                    <div className="mb-8 flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        All Messages ({messages.length})
                      </button>
                      <button className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium hover:bg-red-200 transition-colors">
                        Unread ({unreadMessages})
                      </button>
                      <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
                        Opportunities ({messages.filter(m => m.type === 'opportunity').length})
                      </button>
                      <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                        Reports ({messages.filter(m => m.type === 'report').length})
                      </button>
                      <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
                        Alerts ({messages.filter(m => m.type === 'alert').length})
                      </button>
                    </div>

                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                            message.isRead 
                              ? 'border-gray-200 bg-white hover:shadow-md' 
                              : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getMessageColor(message.type)} shadow-sm`}>
                                <i className={`${getMessageIcon(message.type)} text-xl`}></i>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className={`font-bold text-lg ${message.isRead ? 'text-gray-900' : 'text-blue-900'}`}>
                                    {message.title}
                                  </h3>
                                  {!message.isRead && (
                                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                                  )}
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    message.type === 'system' ? 'bg-blue-100 text-blue-800' :
                                    message.type === 'opportunity' ? 'bg-green-100 text-green-800' :
                                    message.type === 'alert' ? 'bg-orange-100 text-orange-800' :
                                    message.type === 'report' ? 'bg-purple-100 text-purple-800' :
                                    'bg-pink-100 text-pink-800'
                                  }`}>
                                    {message.type.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-gray-700 mb-4 leading-relaxed text-base">{message.content}</p>
                                <div className="flex items-center space-x-4 mb-4">
                                  <span className="text-sm text-gray-500 flex items-center">
                                    <i className="ri-time-line mr-1"></i>
                                    {message.timestamp}
                                  </span>
                                  {message.actions.length > 0 && (
                                    <span className="text-sm text-gray-500">
                                      {message.actions.length} action{message.actions.length > 1 ? 's' : ''} available
                                    </span>
                                  )}
                                </div>
                                {message.actions.length > 0 && (
                                  <div className="flex flex-wrap gap-3">
                                    {message.actions.map((action, index) => (
                                      <button
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium whitespace-nowrap shadow-sm hover:shadow-md transform hover:scale-105"
                                      >
                                        {action.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <button
                                onClick={() => message.isRead ? markAsUnread(message.id) : markAsRead(message.id)}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title={message.isRead ? 'Mark as unread' : 'Mark as read'}
                              >
                                <i className={message.isRead ? 'ri-mail-line' : 'ri-mail-open-line'}></i>
                              </button>
                              <button
                                onClick={() => deleteMessage(message.id)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete message"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {messages.length === 0 && (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <i className="ri-mail-line text-4xl text-gray-400"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages</h3>
                        <p className="text-gray-600">You'll see notifications and updates here when they arrive.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-8">
                  {/* Current Subscription */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Current Subscription</h2>
                      <button 
                        onClick={() => navigate('/pricing')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                      >
                        <i className="ri-vip-crown-line mr-2"></i>
                        Upgrade Plan
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">Professional Plan</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">Active</span>
                        </div>
                        <div className="text-3xl font-black text-blue-600 mb-2">$99/month</div>
                        <p className="text-gray-600 mb-4">Advanced AI features and analytics</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-700">
                            <i className="ri-check-line text-green-600 mr-2"></i>
                            Unlimited property searches
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <i className="ri-check-line text-green-600 mr-2"></i>
                            AI-powered analytics
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <i className="ri-check-line text-green-600 mr-2"></i>
                            Priority support
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <i className="ri-check-line text-green-600 mr-2"></i>
                            Advanced reporting
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <h4 className="font-bold text-gray-900 mb-3">Billing Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Next billing date:</span>
                              <span className="font-medium">March 15, 2024</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Payment method:</span>
                              <span className="font-medium">•••• •••• •••• 4242</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Billing cycle:</span>
                              <span className="font-medium">Monthly</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-xl">
                          <h4 className="font-bold text-gray-900 mb-3">Usage This Month</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Property searches</span>
                                <span className="font-medium">847 / Unlimited</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">AI analyses</span>
                                <span className="font-medium">156 / Unlimited</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Reports generated</span>
                                <span className="font-medium">23 / Unlimited</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{width: '25%'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment History */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Invoice</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { date: 'Feb 15, 2024', description: 'Professional Plan - Monthly', amount: '$99.00', status: 'Paid', invoice: 'INV-2024-002' },
                            { date: 'Jan 15, 2024', description: 'Professional Plan - Monthly', amount: '$99.00', status: 'Paid', invoice: 'INV-2024-001' },
                            { date: 'Dec 15, 2023', description: 'Professional Plan - Monthly', amount: '$99.00', status: 'Paid', invoice: 'INV-2023-012' },
                            { date: 'Nov 15, 2023', description: 'Professional Plan - Monthly', amount: '$99.00', status: 'Paid', invoice: 'INV-2023-011' }
                          ].map((payment, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4 text-gray-900">{payment.date}</td>
                              <td className="py-4 px-4 text-gray-700">{payment.description}</td>
                              <td className="py-4 px-4 font-semibold text-gray-900">{payment.amount}</td>
                              <td className="py-4 px-4">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                  {payment.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                  {payment.invoice}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                      <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap">
                        <i className="ri-add-line mr-2"></i>
                        Add Payment Method
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">VISA</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                              <div className="text-sm text-gray-600">Expires 12/26</div>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Primary</span>
                        </div>
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-white text-blue-600 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors font-medium text-sm whitespace-nowrap">
                            Edit
                          </button>
                          <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm whitespace-nowrap">
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <i className="ri-add-circle-line text-3xl text-gray-400 mb-2"></i>
                          <p className="text-gray-600 font-medium">Add New Payment Method</p>
                          <p className="text-sm text-gray-500">Credit card, debit card, or bank account</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms of Service */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal & Terms</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-4">Terms of Service</h3>
                        <p className="text-gray-600 mb-4">Review our terms and conditions for using TerraVista platform.</p>
                        <button 
                          onClick={() => navigate('/legal/terms')}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                        >
                          <i className="ri-file-text-line mr-2"></i>
                          View Terms
                        </button>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-4">Privacy Policy</h3>
                        <p className="text-gray-600 mb-4">Learn how we protect and handle your personal information.</p>
                        <button 
                          onClick={() => navigate('/legal/privacy')}
                          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                        >
                          <i className="ri-shield-check-line mr-2"></i>
                          View Privacy Policy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  {/* Account Settings */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      {/* Privacy Settings */}
                      <div className="p-6 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-4">Privacy Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Profile Visibility</div>
                              <div className="text-sm text-gray-600">Control who can see your profile information</div>
                            </div>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                              <option>Public</option>
                              <option>Private</option>
                              <option>Contacts Only</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Search Engine Indexing</div>
                              <div className="text-sm text-gray-600">Allow search engines to index your profile</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Data & Storage */}
                      <div className="p-6 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-4">Data & Storage</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Data Export</div>
                              <div className="text-sm text-gray-600">Download all your data in JSON format</div>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap">
                              <i className="ri-download-line mr-2"></i>
                              Export Data
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Clear Search History</div>
                              <div className="text-sm text-gray-600">Remove all your search and browsing history</div>
                            </div>
                            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm whitespace-nowrap">
                              <i className="ri-delete-bin-line mr-2"></i>
                              Clear History
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Security Settings */}
                      <div className="p-6 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-4">Security Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                              <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                            </div>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm whitespace-nowrap">
                              <i className="ri-shield-check-line mr-2"></i>
                              Enable 2FA
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Login Sessions</div>
                              <div className="text-sm text-gray-600">Manage your active login sessions</div>
                            </div>
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm whitespace-nowrap">
                              <i className="ri-computer-line mr-2"></i>
                              View Sessions
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8">
                    <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                      <i className="ri-error-warning-line mr-2"></i>
                      Danger Zone
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                        <h3 className="font-bold text-red-800 mb-4">Delete Account</h3>
                        <p className="text-red-700 mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <div className="space-y-4">
                          <div className="p-4 bg-white rounded-lg border border-red-200">
                            <h4 className="font-medium text-red-800 mb-2">What will be deleted:</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              <li>• Your profile and personal information</li>
                              <li>• All saved properties and searches</li>
                              <li>• Investment analysis and reports</li>
                              <li>• Communication history</li>
                              <li>• Subscription and billing data</li>
                            </ul>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={() => {
                                const confirmation = prompt('Type "DELETE" to confirm account deletion:');
                                if (confirmation === 'DELETE') {
                                  alert('Account deletion initiated. You will receive a confirmation email.');
                                }
                              }}
                              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-medium whitespace-nowrap"
                            >
                              <i className="ri-delete-bin-line mr-2"></i>
                              Delete My Account
                            </button>
                            <div className="text-sm text-gray-600">
                              <i className="ri-information-line mr-1"></i>
                              You'll receive a confirmation email before deletion
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                        <h3 className="font-bold text-yellow-800 mb-4">Deactivate Account</h3>
                        <p className="text-yellow-700 mb-4">
                          Temporarily deactivate your account. You can reactivate it anytime by logging in.
                        </p>
                        <button className="bg-yellow-600 text-white px-6 py-3 rounded-xl hover:bg-yellow-700 transition-colors font-medium whitespace-nowrap">
                          <i className="ri-pause-circle-line mr-2"></i>
                          Deactivate Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs content (placeholder) */}
              {activeTab !== 'profile' && activeTab !== 'messages' && activeTab !== 'billing' && activeTab !== 'settings' && (
                <div className="p-8">
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className={`${tabs.find(t => t.id === activeTab)?.icon} text-4xl text-gray-400`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tabs.find(t => t.id === activeTab)?.label}
                    </h3>
                    <p className="text-gray-600">This section is coming soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg">
                    <i className="ri-user-settings-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Edit Profile</h2>
                    <p className="text-gray-600">Update your personal and professional information</p>
                  </div>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <i className="ri-user-line mr-3 text-blue-600"></i>
                    Personal Information
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-user-line mr-2 text-blue-600"></i>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={tempProfile.name}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-mail-line mr-2 text-blue-600"></i>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-5
                        focus:border-transparent"
                        placeholder="Enter your email"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email verification required for changes</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-phone-line mr-2 text-blue-600"></i>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={tempProfile.phone}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-map-pin-line mr-2 text-blue-600"></i>
                        Location
                      </label>
                      <input
                        type="text"
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}    
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <i className="ri-briefcase-line mr-3 text-purple-600"></i>
                    Professional Information
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-briefcase-line mr-2 text-purple-600"></i>
                        Role
                      </label>
                      <select
                        value={tempProfile.role}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                      >
                        <option value="Real Estate Investor">Real Estate Investor</option>
                        <option value="Property Developer">Property Developer</option>
                        <option value="Real Estate Agent">Real Estate Agent</option>
                        <option value="Property Manager">Property Manager</option>
                        <option value="Financial Advisor">Financial Advisor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-building-line mr-2 text-purple-600"></i>
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={tempProfile.company}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-target-line mr-2 text-purple-600"></i>
                        Investment Focus
                      </label>
                      <select
                        value={tempProfile.investmentFocus}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, investmentFocus: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                      >
                        <option value="Commercial Real Estate">Commercial Real Estate</option>
                        <option value="Residential Properties">Residential Properties</option>
                        <option value="Mixed Use Development">Mixed Use Development</option>
                        <option value="Industrial Properties">Industrial Properties</option>
                        <option value="Retail Spaces">Retail Spaces</option>
                        <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-star-line mr-2 text-purple-600"></i>
                        Experience Level
                      </label>
                      <select
                        value={tempProfile.experienceLevel}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, experienceLevel: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-5
                        focus:border-transparent pr-8"
                      >
                        <option value="Beginner (0-2 years)">Beginner (0-2 years)</option>
                        <option value="Intermediate (3-5 years)">Intermediate (3-5 years)</option>
                        <option value="Advanced (6-10 years)">Advanced (6-10 years)</option>
                        <option value="Expert (10+ years)">Expert (10+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="ri-image-line mr-2 text-purple-600"></i>
                        Profile Avatar
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg font-bold">
                            {tempProfile.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          <i className="ri-upload-2-line mr-2"></i>
                          Upload Photo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Settings */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-settings-line mr-3 text-green-600"></i>
                  Additional Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <i className="ri-eye-line text-blue-600"></i>
                      <div>
                        <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                        <p className="text-sm text-gray-600">Allow others to see your profile</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tempProfile.profileVisibility}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, profileVisibility: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <i className="ri-notification-line text-green-600"></i>
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive market updates via email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tempProfile.emailNotifications}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <i className="ri-shield-check-line text-blue-600"></i>
                      <div>
                        <h4 className="font-medium text-gray-900">Security Notice</h4>
                        <p className="text-sm text-gray-600">Your data is encrypted and complies with GDPR standards</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                      Protected
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-10 flex justify-end space-x-4 pt-8 border-t border-gray-200">
                <button
                  onClick={handleCancelEdit}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  <i className="ri-save-line mr-2"></i>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
