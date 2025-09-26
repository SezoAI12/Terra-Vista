
import { useState } from 'react';

interface SocialMediaPost {
  id: number;
  platform: string;
  content: string;
  mediaUrl?: string;
  scheduledTime: Date;
  status: 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
}

interface AutomatedSocialMediaProps {
  className?: string;
}

export default function AutomatedSocialMedia({ className = '' }: AutomatedSocialMediaProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'linkedin']);
  const [postType, setPostType] = useState('property_showcase');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: 'ri-instagram-line', color: 'bg-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'ri-linkedin-line', color: 'bg-blue-600' },
    { id: 'tiktok', name: 'TikTok', icon: 'ri-tiktok-line', color: 'bg-black' },
    { id: 'twitter', name: 'Twitter', icon: 'ri-twitter-line', color: 'bg-blue-400' },
    { id: 'facebook', name: 'Facebook', icon: 'ri-facebook-line', color: 'bg-blue-700' }
  ];

  const postTypes = [
    { id: 'property_showcase', name: 'Property Showcase', description: 'Highlight key features and amenities' },
    { id: 'market_insight', name: 'Market Insights', description: 'Share market trends and analysis' },
    { id: 'investment_tip', name: 'Investment Tips', description: 'Educational content for investors' },
    { id: 'virtual_tour', name: 'Virtual Tour', description: 'Interactive property walkthrough' },
    { id: 'client_testimonial', name: 'Client Success', description: 'Feature satisfied clients' }
  ];

  const scheduledPosts: SocialMediaPost[] = [
    {
      id: 1,
      platform: 'Instagram',
      content: '🏢 Discover luxury living at Dubai Marina! This stunning penthouse offers breathtaking views and world-class amenities. #DubaiRealEstate #LuxuryLiving',
      mediaUrl: 'https://readdy.ai/api/search-image?query=luxury%20penthouse%20Dubai%20Marina%20social%20media%20post%20modern%20interior%20design%20with%20city%20view%20professional%20photography%20instagram%20style&width=1080&height=1080&seq=20&orientation=squarish',
      scheduledTime: new Date('2024-01-20T10:00:00'),
      status: 'scheduled'
    },
    {
      id: 2,
      platform: 'LinkedIn',
      content: 'Market Analysis: Dubai Marina properties showing exceptional growth potential with 18.5% projected ROI. Our AI analytics indicate strong investment opportunities in the luxury segment.',
      scheduledTime: new Date('2024-01-20T14:30:00'),
      status: 'scheduled'
    },
    {
      id: 3,
      platform: 'TikTok',
      content: 'Take a virtual tour of this incredible beachfront villa! 🏖️ #DubaiRealEstate #PropertyTour #LuxuryHomes',
      mediaUrl: 'https://readdy.ai/api/search-image?query=TikTok%20style%20real%20estate%20video%20thumbnail%20beachfront%20villa%20Dubai%20property%20tour%20energetic%20colorful%20design&width=1080&height=1920&seq=21&orientation=portrait',
      scheduledTime: new Date('2024-01-20T18:00:00'),
      status: 'published',
      engagement: { likes: 2540, shares: 89, comments: 156, views: 12400 }
    }
  ];

  const contentTemplates = {
    property_showcase: {
      instagram: 'Discover {propertyType} at {location}! ✨ Features: {features} 💰 Price: {price} 📈 Growth Score: {growthScore}/100 #DubaiRealEstate #LuxuryLiving #PropertyInvestment',
      linkedin: 'Investment Opportunity: {propertyTitle} at {location}. Key highlights: {features}. AI Growth Score: {growthScore}/100. Expected ROI: {roi}%. Contact us for detailed analysis.',
      tiktok: 'Amazing {propertyType} tour! 🏢 Location: {location} ✨ {features} What do you think? #PropertyTour #RealEstate #Dubai',
      twitter: '🏢 New listing: {propertyTitle} Price: {price} Growth Score: {growthScore}/100 ROI: {roi}% {location} #RealEstate #Investment',
      facebook: 'Explore this stunning {propertyType} in {location}! Features include {features}. Priced at {price} with excellent investment potential.'
    }
  };

  const handleGenerateContent = async () => {
    if (!selectedProperty) return;
    
    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would normally generate and schedule posts
      console.log('Generated content for platforms:', selectedPlatforms);
    }, 3000);
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const formatScheduledTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${className}`}>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Automated Social Media</h3>
            <p className="text-sm text-gray-600">AI-powered content creation and scheduling</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <i className="ri-robot-line mr-1"></i>AI Active
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Content Generation */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Generate New Content</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Property</label>
              <select 
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm pr-8"
              >
                <option value="">Choose a property...</option>
                <option value="1">Luxury Penthouse Dubai Marina - AED 11.7M</option>
                <option value="2">Commercial Office Tower Downtown - AED 31.2M</option>
                <option value="3">Beachfront Villa Palm Jumeirah - AED 17.6M</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {postTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`p-3 rounded-lg border text-left ${
                      postType === type.id
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm opacity-75">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Platforms</label>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      selectedPlatforms.includes(platform.id)
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className={platform.icon}></i>
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateContent}
              disabled={!selectedProperty || selectedPlatforms.length === 0 || isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium whitespace-nowrap"
            >
              {isGenerating ? (
                <>
                  <i className="ri-loader-line animate-spin mr-2"></i>Generating AI Content...
                </>
              ) : (
                <>
                  <i className="ri-magic-line mr-2"></i>Generate & Schedule Posts
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scheduled Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Scheduled & Published Posts</h4>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
              View All Posts
            </button>
          </div>
          
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <i className={platforms.find(p => p.name === post.platform)?.icon + ' text-white'}></i>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{post.platform}</h5>
                      <p className="text-sm text-gray-500">{formatScheduledTime(post.scheduledTime)}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </div>
                
                <div className="flex space-x-4">
                  {post.mediaUrl && (
                    <div className="flex-shrink-0">
                      <img 
                        src={post.mediaUrl} 
                        alt="Post media"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 line-clamp-3">{post.content}</p>
                  </div>
                </div>
                
                {post.engagement && (
                  <div className="flex items-center space-x-6 mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <i className="ri-heart-line"></i>
                      <span>{post.engagement.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <i className="ri-share-line"></i>
                      <span>{post.engagement.shares}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <i className="ri-message-line"></i>
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <i className="ri-eye-line"></i>
                      <span>{post.engagement.views.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
                    Edit
                  </button>
                  {post.status === 'scheduled' && (
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium whitespace-nowrap">
                      Cancel
                    </button>
                  )}
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium whitespace-nowrap">
                    Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">This Month's Performance</h4>
              <p className="text-sm text-gray-600">AI-generated content performance</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">+147%</p>
              <p className="text-sm text-gray-600">Engagement increase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
