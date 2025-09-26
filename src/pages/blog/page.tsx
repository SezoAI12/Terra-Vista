import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function BlogPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Articles', count: 24 },
    { id: 'market-insights', label: 'Market Insights', count: 8 },
    { id: 'ai-technology', label: 'AI Technology', count: 6 },
    { id: 'investment-guides', label: 'Investment Guides', count: 5 },
    { id: 'industry-news', label: 'Industry News', count: 5 }
  ];

  const featuredArticle = {
    id: 1,
    title: 'AI-Powered Real Estate Valuations: The Future is Here',
    excerpt: 'Discover how artificial intelligence is revolutionizing property valuations with 99.7% accuracy, transforming how investors and buyers make decisions in the MENA real estate market.',
    author: 'Dr. Sarah Al-Rashid',
    authorRole: 'CEO & Co-Founder',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    category: 'AI Technology',
    image: 'https://readdy.ai/api/search-image?query=AI%20artificial%20intelligence%20real%20estate%20technology%20modern%20office%20computer%20screens%20data%20analytics%20charts%20graphs%20professional%20workspace&width=800&height=400&seq=1&orientation=landscape',
    tags: ['AI', 'Property Valuation', 'Technology', 'Innovation']
  };

  const articles = [
    {
      id: 2,
      title: 'Dubai Real Estate Market Outlook 2024: Growth Drivers and Opportunities',
      excerpt: 'Comprehensive analysis of Dubai\'s property market trends, key growth sectors, and investment opportunities for the coming year.',
      author: 'Omar Khalil',
      authorRole: 'VP of Real Estate',
      publishDate: '2024-01-12',
      readTime: '6 min read',
      category: 'Market Insights',
      image: 'https://readdy.ai/api/search-image?query=Dubai%20skyline%20real%20estate%20development%20modern%20buildings%20construction%20cranes%20urban%20growth%20cityscape&width=400&height=250&seq=2&orientation=landscape',
      tags: ['Dubai', 'Market Analysis', 'Investment']
    },
    {
      id: 3,
      title: 'Machine Learning in Property Price Prediction: Technical Deep Dive',
      excerpt: 'Exploring the algorithms and data science techniques behind accurate real estate price predictions and market forecasting.',
      author: 'Maria Rodriguez',
      authorRole: 'Head of AI Research',
      publishDate: '2024-01-10',
      readTime: '12 min read',
      category: 'AI Technology',
      image: 'https://readdy.ai/api/search-image?query=machine%20learning%20algorithms%20data%20visualization%20neural%20networks%20computer%20code%20programming%20artificial%20intelligence&width=400&height=250&seq=3&orientation=landscape',
      tags: ['Machine Learning', 'Data Science', 'Algorithms']
    },
    {
      id: 4,
      title: 'Turkey Real Estate Investment Guide: Navigating Opportunities in 2024',
      excerpt: 'Complete guide to investing in Turkish real estate, including legal requirements, market hotspots, and ROI expectations.',
      author: 'Ahmed Hassan',
      authorRole: 'CTO & Co-Founder',
      publishDate: '2024-01-08',
      readTime: '10 min read',
      category: 'Investment Guides',
      image: 'https://readdy.ai/api/search-image?query=Istanbul%20Turkey%20real%20estate%20modern%20apartments%20residential%20buildings%20Bosphorus%20view%20urban%20development&width=400&height=250&seq=4&orientation=landscape',
      tags: ['Turkey', 'Investment', 'International']
    },
    {
      id: 5,
      title: 'The Rise of PropTech in MENA: Digital Transformation Trends',
      excerpt: 'How property technology is reshaping the Middle East and North Africa real estate landscape with digital solutions.',
      author: 'Dr. Sarah Al-Rashid',
      authorRole: 'CEO & Co-Founder',
      publishDate: '2024-01-05',
      readTime: '7 min read',
      category: 'Industry News',
      image: 'https://readdy.ai/api/search-image?query=PropTech%20property%20technology%20digital%20transformation%20MENA%20Middle%20East%20real%20estate%20innovation%20mobile%20apps&width=400&height=250&seq=5&orientation=landscape',
      tags: ['PropTech', 'MENA', 'Digital Transformation']
    },
    {
      id: 6,
      title: 'Commercial Real Estate Analytics: Data-Driven Investment Strategies',
      excerpt: 'Leveraging big data and analytics to identify high-potential commercial real estate investments and optimize portfolio performance.',
      author: 'Omar Khalil',
      authorRole: 'VP of Real Estate',
      publishDate: '2024-01-03',
      readTime: '9 min read',
      category: 'Investment Guides',
      image: 'https://readdy.ai/api/search-image?query=commercial%20real%20estate%20office%20buildings%20business%20district%20analytics%20data%20charts%20investment%20strategy&width=400&height=250&seq=6&orientation=landscape',
      tags: ['Commercial', 'Analytics', 'Investment Strategy']
    },
    {
      id: 7,
      title: 'Natural Language Processing in Real Estate: Automating Property Descriptions',
      excerpt: 'How NLP technology is transforming property listings with automated, multilingual descriptions and enhanced search capabilities.',
      author: 'Maria Rodriguez',
      authorRole: 'Head of AI Research',
      publishDate: '2024-01-01',
      readTime: '8 min read',
      category: 'AI Technology',
      image: 'https://readdy.ai/api/search-image?query=natural%20language%20processing%20NLP%20text%20analysis%20multilingual%20property%20descriptions%20AI%20automation%20technology&width=400&height=250&seq=7&orientation=landscape',
      tags: ['NLP', 'Automation', 'Multilingual']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase().replace(' ', '-') === selectedCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mb-6">
            <i className="ri-article-line mr-2"></i>
            TerraVista Insights
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
            Real Estate Intelligence
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              & Market Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Stay ahead with expert analysis, AI technology insights, and market intelligence 
            from our team of real estate and technology professionals.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, or tags..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-80 lg:h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {featuredArticle.category}
                </span>
                <span className="text-gray-500 text-sm">{featuredArticle.readTime}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {featuredArticle.title}
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {featuredArticle.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{featuredArticle.author}</div>
                    <div className="text-sm text-gray-600">{featuredArticle.authorRole}</div>
                  </div>
                </div>
                
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Read Article
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-6">
                {featuredArticle.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(article.publishDate).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {article.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{article.author}</div>
                      <div className="text-xs text-gray-600">{article.authorRole}</div>
                    </div>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Read More →
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-xl hover:bg-gray-50 hover:shadow-lg transition-all duration-300 font-semibold">
            Load More Articles
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white mt-16">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Market Insights</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get weekly real estate market analysis, AI technology updates, and investment insights 
            delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            Join 10,000+ real estate professionals. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}