import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  const contactMethods = [
    {
      icon: 'ri-mail-line',
      title: 'Email Support',
      description: 'Get help from our support team',
      contact: 'support@terravista.ai',
      action: 'Send Email',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'ri-phone-line',
      title: 'Phone Support',
      description: '24/7 phone support available',
      contact: '+971 4 123 4567',
      action: 'Call Now',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'ri-chat-3-line',
      title: 'Live Chat',
      description: 'Chat with our AI assistant',
      contact: 'Available 24/7',
      action: 'Start Chat',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'ri-calendar-line',
      title: 'Schedule Demo',
      description: 'Book a personalized demo',
      contact: '30-minute session',
      action: 'Book Demo',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const offices = [
    {
      city: 'Dubai',
      country: 'UAE',
      address: 'Dubai International Financial Centre\nGate Village 10, Level 5\nDubai, UAE',
      phone: '+971 4 123 4567',
      email: 'dubai@terravista.ai',
      timezone: 'GMT+4',
      image: 'https://readdy.ai/api/search-image?query=Dubai%20DIFC%20modern%20office%20building%20glass%20tower%20business%20district%20skyline%20professional%20corporate%20headquarters&width=400&height=250&seq=1&orientation=landscape'
    },
    {
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Maslak Mahallesi\nBüyükdere Caddesi No:255\nSarıyer, Istanbul, Turkey',
      phone: '+90 212 123 4567',
      email: 'istanbul@terravista.ai',
      timezone: 'GMT+3',
      image: 'https://readdy.ai/api/search-image?query=Istanbul%20modern%20office%20building%20Maslak%20business%20district%20contemporary%20architecture%20corporate%20headquarters%20Turkey&width=400&height=250&seq=2&orientation=landscape'
    },
    {
      city: 'Riyadh',
      country: 'Saudi Arabia',
      address: 'King Fahd Road\nOlaya District\nRiyadh, Saudi Arabia',
      phone: '+966 11 123 4567',
      email: 'riyadh@terravista.ai',
      timezone: 'GMT+3',
      image: 'https://readdy.ai/api/search-image?query=Riyadh%20modern%20office%20building%20King%20Fahd%20Road%20business%20district%20Saudi%20Arabia%20contemporary%20corporate%20architecture&width=400&height=250&seq=3&orientation=landscape'
    }
  ];

  const faqs = [
    {
      question: 'How accurate are TerraVista\'s AI property valuations?',
      answer: 'Our AI engine achieves 99.7% accuracy in property valuations by analyzing over 10 million data points including market trends, comparable sales, location factors, and property characteristics.'
    },
    {
      question: 'Which markets does TerraVista currently support?',
      answer: 'We currently support 45+ markets across the MENA region, including UAE, Turkey, Saudi Arabia, Iraq, Jordan, Lebanon, and Egypt, with plans to expand to additional markets in 2024.'
    },
    {
      question: 'What languages does the platform support?',
      answer: 'TerraVista supports 15+ languages including English, Arabic, Turkish, Kurdish, French, Spanish, and more. Our AI can generate property descriptions and provide support in multiple languages.'
    },
    {
      question: 'How does the pricing work for different user types?',
      answer: 'We offer role-based pricing for Buyers, Sellers, Agents, and Investors. Basic features are free, with premium AI tools available through subscription plans starting from $29/month.'
    },
    {
      question: 'Can I integrate TerraVista with my existing CRM or tools?',
      answer: 'Yes, we offer API integrations and support for popular CRM systems, property management tools, and third-party applications. Contact our technical team for integration support.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mb-6">
            <i className="ri-customer-service-2-line mr-2"></i>
            Contact & Support
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
            Get in Touch
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              with Our Team
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Have questions about TerraVista AI? Need technical support? Want to schedule a demo? 
            Our expert team is here to help you succeed.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border p-6 text-center hover:shadow-xl transition-all duration-300 group">
              <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${method.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-3">{method.description}</p>
              <p className="font-semibold text-gray-900 mb-4">{method.contact}</p>
              <button className={`w-full bg-gradient-to-r ${method.color} text-white py-2 rounded-lg hover:shadow-lg transition-all font-medium`}>
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  >
                    <option value="">Select your role</option>
                    <option value="buyer">Property Buyer</option>
                    <option value="seller">Property Seller</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="investor">Real Estate Investor</option>
                    <option value="developer">Property Developer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="general">General Inquiry</option>
                  <option value="demo">Request Demo</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="media">Media & Press</option>
                  <option value="careers">Careers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">{formData.message.length}/500 characters</p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:shadow-lg transition-all font-semibold text-lg"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Response Time */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <i className="ri-time-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Quick Response</h3>
                  <p className="text-green-700">We typically respond within 2-4 hours</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Email Support:</span>
                  <span className="font-semibold text-gray-900 ml-2">&lt; 2 hours</span>
                </div>
                <div>
                  <span className="text-gray-600">Phone Support:</span>
                  <span className="font-semibold text-gray-900 ml-2">Immediate</span>
                </div>
                <div>
                  <span className="text-gray-600">Live Chat:</span>
                  <span className="font-semibold text-gray-900 ml-2">Real-time</span>
                </div>
                <div>
                  <span className="text-gray-600">Demo Booking:</span>
                  <span className="font-semibold text-gray-900 ml-2">Same day</span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-calendar-line mr-2 text-blue-600"></i>
                Business Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM GST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM GST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-semibold text-gray-900">Closed</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Support:</span>
                    <span className="font-semibold text-green-600">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <i className="ri-share-line mr-2 text-purple-600"></i>
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <i className="ri-linkedin-line text-blue-600 text-xl"></i>
                  <span className="font-medium text-gray-900">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <i className="ri-twitter-line text-blue-600 text-xl"></i>
                  <span className="font-medium text-gray-900">Twitter</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                  <i className="ri-instagram-line text-pink-600 text-xl"></i>
                  <span className="font-medium text-gray-900">Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <i className="ri-youtube-line text-red-600 text-xl"></i>
                  <span className="font-medium text-gray-900">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Offices</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visit us at one of our regional offices or connect with our local teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300">
                <img
                  src={office.image}
                  alt={`${office.city} Office`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{office.country}</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <i className="ri-map-pin-line text-gray-400 mt-1"></i>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{office.address}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="ri-phone-line text-gray-400"></i>
                      <p className="text-gray-600 text-sm">{office.phone}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="ri-mail-line text-gray-400"></i>
                      <p className="text-gray-600 text-sm">{office.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="ri-time-zone-line text-gray-400"></i>
                      <p className="text-gray-600 text-sm">{office.timezone}</p>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about TerraVista AI platform and services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <button 
              onClick={() => navigate('/blog')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mr-4"
            >
              Visit Help Center
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}