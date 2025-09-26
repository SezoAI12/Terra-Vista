import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

const TermsOfService: React.FC = () => {
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
                <h1 className="text-3xl font-black text-gray-900 mb-2">Terms of Service</h1>
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

        {/* Terms Content */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to TerraVista AI ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our AI-powered real estate platform and services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using TerraVista AI, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <i className="ri-information-line mr-2"></i>
                  These Terms may be updated from time to time. We will notify you of any material changes.
                </p>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3.1 Account Creation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You must provide accurate, current, and complete information during registration and keep your account information updated.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3.2 Account Security</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You are responsible for safeguarding your password and all activities under your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3.3 Account Termination</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to suspend or terminate accounts that violate these Terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TerraVista AI provides AI-powered real estate analytics, property valuation, market insights, and investment recommendations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">AI Analytics</h4>
                  <p className="text-sm text-gray-600">Property valuation and market analysis</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Investment Tools</h4>
                  <p className="text-sm text-gray-600">ROI calculations and portfolio management</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Market Data</h4>
                  <p className="text-sm text-gray-600">Real-time market trends and insights</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Communication</h4>
                  <p className="text-sm text-gray-600">Buyer-seller messaging platform</p>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Responsibilities</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 mt-1"></i>
                  <p className="text-gray-700">Provide accurate property and personal information</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 mt-1"></i>
                  <p className="text-gray-700">Comply with all applicable laws and regulations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 mt-1"></i>
                  <p className="text-gray-700">Respect intellectual property rights</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 mt-1"></i>
                  <p className="text-gray-700">Use the service for legitimate business purposes only</p>
                </div>
              </div>
            </section>

            {/* AI Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. AI Disclaimer</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <i className="ri-alert-line text-yellow-600 mt-1"></i>
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
                    <p className="text-yellow-800 leading-relaxed mb-3">
                      Our AI-powered valuations and recommendations are estimates based on available data and algorithms. They should not be considered as professional appraisals or investment advice.
                    </p>
                    <p className="text-yellow-800 leading-relaxed">
                      Always consult with qualified professionals before making investment decisions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">7.1 Subscription Plans</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We offer various subscription plans with different features and usage limits.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">7.2 Billing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Subscriptions are billed in advance on a monthly or annual basis.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">7.3 Refunds</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Refunds are available within 30 days of purchase for annual plans.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law, TerraVista AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Either party may terminate this agreement at any time. Upon termination, your access to the service will cease immediately.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to terminate accounts for violations of these Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <i className="ri-mail-line text-gray-500"></i>
                    <span className="text-gray-700">legal@terravista.ai</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-phone-line text-gray-500"></i>
                    <span className="text-gray-700">+971 4 123 4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-map-pin-line text-gray-500"></i>
                    <span className="text-gray-700">Dubai, United Arab Emirates</span>
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

export default TermsOfService;