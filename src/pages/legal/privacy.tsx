import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="Guest" userName="" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-gray-600">Last updated: February 15, 2024</p>
              </div>
              <button 
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At TerraVista AI, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <i className="ri-shield-check-line mr-2"></i>
                  Your privacy is important to us. We follow industry best practices to protect your data.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Account Information</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Name and contact details</li>
                        <li>• Email address and phone number</li>
                        <li>• Professional information</li>
                        <li>• Profile picture (optional)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Property Information</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Property details and specifications</li>
                        <li>• Location and address information</li>
                        <li>• Property images and documents</li>
                        <li>• Investment preferences</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 Usage Information</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start space-x-2">
                        <i className="ri-check-line text-green-600 mt-1"></i>
                        <span>Platform usage patterns and preferences</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <i className="ri-check-line text-green-600 mt-1"></i>
                        <span>Search queries and filter preferences</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <i className="ri-check-line text-green-600 mt-1"></i>
                        <span>Communication history with other users</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <i className="ri-check-line text-green-600 mt-1"></i>
                        <span>AI analysis requests and results</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2.3 Technical Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We automatically collect certain technical information including IP address, browser type, device information, and usage analytics to improve our services.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      <i className="ri-robot-line mr-2"></i>
                      AI Services
                    </h4>
                    <p className="text-sm text-blue-800">
                      Provide AI-powered property valuations, market analysis, and investment recommendations
                    </p>
                  </div>
                  <div className="p-4 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">
                      <i className="ri-user-heart-line mr-2"></i>
                      Personalization
                    </h4>
                    <p className="text-sm text-green-800">
                      Customize your experience and provide relevant property suggestions
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      <i className="ri-message-line mr-2"></i>
                      Communication
                    </h4>
                    <p className="text-sm text-purple-800">
                      Facilitate communication between buyers, sellers, and agents
                    </p>
                  </div>
                  <div className="p-4 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">
                      <i className="ri-shield-check-line mr-2"></i>
                      Security
                    </h4>
                    <p className="text-sm text-orange-800">
                      Protect against fraud, abuse, and security threats
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-2">
                    <i className="ri-shield-check-line mr-2"></i>
                    We DO NOT sell your personal information
                  </h3>
                  <p className="text-green-800">
                    Your personal data is never sold to third parties for marketing purposes.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">We may share information in these situations:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-user-line text-blue-600 mt-1"></i>
                      <div>
                        <p className="font-medium text-gray-900">With Other Users</p>
                        <p className="text-sm text-gray-600">Property listings and basic contact information when you choose to connect</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-briefcase-line text-blue-600 mt-1"></i>
                      <div>
                        <p className="font-medium text-gray-900">Service Providers</p>
                        <p className="text-sm text-gray-600">Trusted third parties who help us operate our platform (under strict confidentiality)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-scales-line text-blue-600 mt-1"></i>
                      <div>
                        <p className="font-medium text-gray-900">Legal Requirements</p>
                        <p className="text-sm text-gray-600">When required by law or to protect rights and safety</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Encryption</h4>
                    <p className="text-sm text-blue-800">All data is encrypted in transit and at rest using industry-standard protocols</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Access Control</h4>
                    <p className="text-sm text-green-800">Strict access controls and authentication measures protect your data</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Regular Audits</h4>
                    <p className="text-sm text-purple-800">Regular security audits and penetration testing ensure robust protection</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Monitoring</h4>
                    <p className="text-sm text-orange-800">24/7 monitoring and threat detection systems protect against breaches</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You have several rights regarding your personal information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <i className="ri-eye-line text-blue-600 mr-2"></i>
                      Access
                    </h4>
                    <p className="text-sm text-gray-600">Request a copy of your personal data</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <i className="ri-edit-line text-green-600 mr-2"></i>
                      Rectification
                    </h4>
                    <p className="text-sm text-gray-600">Correct inaccurate or incomplete information</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <i className="ri-delete-bin-line text-red-600 mr-2"></i>
                      Erasure
                    </h4>
                    <p className="text-sm text-gray-600">Request deletion of your personal data</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <i className="ri-download-line text-purple-600 mr-2"></i>
                      Portability
                    </h4>
                    <p className="text-sm text-gray-600">Export your data in a portable format</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-green-600 mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-900">Essential Cookies</p>
                    <p className="text-sm text-gray-600">Required for basic platform functionality</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-settings-line text-blue-600 mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-900">Functional Cookies</p>
                    <p className="text-sm text-gray-600">Remember your preferences and settings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-bar-chart-line text-purple-600 mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-900">Analytics Cookies</p>
                    <p className="text-sm text-gray-600">Help us understand how you use our platform</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="text-gray-700 space-y-2">
                  <li>• Account information: Until account deletion</li>
                  <li>• Property listings: Until removed by user</li>
                  <li>• Communication history: 7 years for legal compliance</li>
                  <li>• Analytics data: 2 years in anonymized form</li>
                </ul>
              </div>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your information may be transferred to and processed in countries outside your residence. We ensure appropriate safeguards are in place to protect your data.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <i className="ri-global-line mr-2"></i>
                  We comply with applicable data protection laws when transferring data internationally.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  For any questions about this Privacy Policy or to exercise your rights, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <i className="ri-mail-line text-gray-500"></i>
                    <div>
                      <p className="font-medium text-gray-900">Data Protection Officer</p>
                      <p className="text-gray-700">privacy@terravista.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-phone-line text-gray-500"></i>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-700">+971 4 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-map-pin-line text-gray-500"></i>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-700">Dubai, United Arab Emirates</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 TerraVista AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;