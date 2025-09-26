import { useState } from 'react';

interface PropertyDetailModalProps {
  property: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyDetailModal({ property, isOpen, onClose }: PropertyDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMortgageCalculator, setShowMortgageCalculator] = useState(false);
  const [showScheduleViewing, setShowScheduleViewing] = useState(false);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [showContactSeller, setShowContactSeller] = useState(false);

  // Mortgage Calculator State
  const [loanAmount, setLoanAmount] = useState(property?.originalPrice * 0.8 || 0);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [downPayment, setDownPayment] = useState(property?.originalPrice * 0.2 || 0);

  // Form States
  const [viewingForm, setViewingForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', message: ''
  });
  const [negotiationForm, setNegotiationForm] = useState({
    offerPrice: '', terms: '', message: '', financeReady: false
  });
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', message: ''
  });

  if (!isOpen || !property) return null;

  // Mortgage Calculator
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - loanAmount;

  const handleScheduleViewing = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Schedule viewing:', viewingForm);
    alert('Viewing scheduled successfully! You will receive a confirmation email shortly.');
    setShowScheduleViewing(false);
    setViewingForm({ name: '', email: '', phone: '', date: '', time: '', message: '' });
  };

  const handleNegotiation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit offer:', negotiationForm);
    alert('Your offer has been submitted! The seller will respond within 24 hours.');
    setShowNegotiation(false);
    setNegotiationForm({ offerPrice: '', terms: '', message: '', financeReady: false });
  };

  const handleContactSeller = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact seller:', contactForm);
    alert('Message sent successfully! The seller will contact you soon.');
    setShowContactSeller(false);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
            <p className="text-gray-600">{property.fullAddress}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Image Gallery */}
        <div className="relative h-80">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.transactionType}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-bold text-gray-900">AI Score: {property.growthScore}</span>
            </div>
          </div>
        </div>

        {/* Price and Key Info */}
        <div className="p-6 border-b">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{property.price}</div>
              <div className="flex items-center space-x-6 text-gray-600">
                <span><i className="ri-hotel-bed-line mr-1"></i>{property.bedrooms} Beds</span>
                <span><i className="ri-drop-line mr-1"></i>{property.bathrooms} Baths</span>
                <span><i className="ri-fullscreen-line mr-1"></i>{property.area} {property.areaUnit}</span>
                <span><i className="ri-calendar-line mr-1"></i>Built {new Date().getFullYear() - property.buildingAge}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowScheduleViewing(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-calendar-check-line mr-2"></i>
                Schedule Viewing
              </button>
              <button
                onClick={() => setShowNegotiation(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-handshake-line mr-2"></i>
                Make Offer
              </button>
              <button
                onClick={() => setShowContactSeller(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-chat-3-line mr-2"></i>
                Contact Seller
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: 'ri-home-4-line' },
              { id: 'features', label: 'Features', icon: 'ri-list-check' },
              { id: 'location', label: 'Location', icon: 'ri-map-pin-line' },
              { id: 'financials', label: 'Financials', icon: 'ri-line-chart-line' },
              { id: 'ai-analysis', label: 'AI Analysis', icon: 'ri-brain-line' }
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

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover luxury living at its finest in this stunning {property.bedrooms}-bedroom, {property.bathrooms}-bathroom 
                  {property.type.toLowerCase()} located in the prestigious {property.location}. This exceptional property offers 
                  {property.area} {property.areaUnit} of meticulously designed living space with premium finishes throughout.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {property.amenities.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-500"></i>
                        <span className="text-gray-700">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Property Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="text-gray-900">{property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Floor:</span>
                      <span className="text-gray-900">{property.floorNumber || 'Ground Floor'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furnished:</span>
                      <span className="text-gray-900">{property.furnished}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parking:</span>
                      <span className="text-gray-900">{property.features.parking} Spaces</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listed:</span>
                      <span className="text-gray-900">{new Date(property.listingDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'parking', label: 'Parking Spaces', value: property.features.parking, icon: 'ri-car-line' },
                    { key: 'pool', label: 'Swimming Pool', value: property.features.pool ? 'Yes' : 'No', icon: 'ri-water-flash-line' },
                    { key: 'garden', label: 'Garden', value: property.features.garden ? 'Yes' : 'No', icon: 'ri-leaf-line' },
                    { key: 'balcony', label: 'Balcony', value: property.features.balcony ? 'Yes' : 'No', icon: 'ri-building-2-line' },
                    { key: 'elevator', label: 'Elevator', value: property.features.elevator ? 'Yes' : 'No', icon: 'ri-arrow-up-down-line' },
                    { key: 'heating', label: 'Climate Control', value: property.features.heating, icon: 'ri-temp-hot-line' }
                  ].map(feature => (
                    <div key={feature.key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <i className={`${feature.icon} text-blue-600 text-xl`}></i>
                        <div>
                          <div className="font-medium text-gray-900">{feature.label}</div>
                          <div className="text-sm text-gray-600">{feature.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Energy & Efficiency</h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <i className="ri-leaf-line text-green-600 text-xl"></i>
                    <div>
                      <div className="font-medium text-gray-900">Energy Certificate</div>
                      <div className="text-sm text-gray-600">Rating: {property.features.energyCertificate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Nearby Amenities</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <i className="ri-map-2-line text-4xl text-gray-400 mb-2"></i>
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">Lat: {property.coordinates.lat}, Lng: {property.coordinates.lng}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(property.nearbyAmenities).map(([category, amenities]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-900 mb-3 capitalize flex items-center">
                      <i className={`mr-2 ${
                        category === 'schools' ? 'ri-school-line' :
                        category === 'transport' ? 'ri-subway-line' :
                        category === 'hospitals' ? 'ri-hospital-line' :
                        'ri-shopping-cart-line'
                      }`}></i>
                      {category}
                    </h4>
                    <ul className="space-y-2">
                      {(amenities as string[]).map((amenity: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center">
                          <i className="ri-map-pin-line text-gray-400 mr-2"></i>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{property.roi}</div>
                  <div className="text-sm text-gray-600">Expected ROI</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{property.rentalYield}</div>
                  <div className="text-sm text-gray-600">Rental Yield</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{property.aiInsights.valuation}</div>
                  <div className="text-sm text-gray-600">AI Valuation</div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Mortgage Calculator</h4>
                  <button
                    onClick={() => setShowMortgageCalculator(!showMortgageCalculator)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {showMortgageCalculator ? 'Hide' : 'Show'} Calculator
                  </button>
                </div>
                
                {showMortgageCalculator && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                          <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
                          <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
                          <input
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h5 className="font-medium text-gray-900">Calculation Results</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Payment:</span>
                            <span className="font-semibold">{property.currency} {monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Payment:</span>
                            <span className="font-semibold">{property.currency} {totalPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Interest:</span>
                            <span className="font-semibold">{property.currency} {totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="flex justify-between border-t pt-3">
                            <span className="text-gray-600">Down Payment:</span>
                            <span className="font-semibold">{property.currency} {downPayment.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ai-analysis' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-brain-line mr-2 text-blue-600"></i>
                  AI Property Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{property.growthScore}</div>
                    <div className="text-sm text-gray-600">AI Growth Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{property.aiInsights.investmentGrade}</div>
                    <div className="text-sm text-gray-600">Investment Grade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{property.aiInsights.marketTrend}</div>
                    <div className="text-sm text-gray-600">Market Trend</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-green-600">Strengths</h4>
                  <ul className="space-y-2">
                    {property.aiInsights.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-500"></i>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-orange-600">Considerations</h4>
                  <ul className="space-y-2">
                    {property.aiInsights.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <i className="ri-alert-line text-orange-500"></i>
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">AI Investment Recommendation</h5>
                <p className="text-sm text-gray-700">
                  Based on current market conditions and property analysis, this property shows strong investment potential 
                  with a growth score of {property.growthScore}/100. The location offers excellent amenities and connectivity, 
                  making it attractive for both rental income and capital appreciation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Schedule Viewing Modal */}
        {showScheduleViewing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Schedule Property Viewing</h3>
                <button
                  onClick={() => setShowScheduleViewing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleScheduleViewing} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={viewingForm.name}
                    onChange={(e) => setViewingForm({...viewingForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={viewingForm.email}
                    onChange={(e) => setViewingForm({...viewingForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={viewingForm.phone}
                    onChange={(e) => setViewingForm({...viewingForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={viewingForm.date}
                      onChange={(e) => setViewingForm({...viewingForm, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                    <select
                      required
                      value={viewingForm.time}
                      onChange={(e) => setViewingForm({...viewingForm, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 pr-8"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
                  <textarea
                    value={viewingForm.message}
                    onChange={(e) => setViewingForm({...viewingForm, message: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Any specific requirements or questions..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowScheduleViewing(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Schedule Viewing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Negotiation Modal */}
        {showNegotiation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Make an Offer</h3>
                <button
                  onClick={() => setShowNegotiation(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleNegotiation} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Offer Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">{property.currency}</span>
                    <input
                      type="number"
                      required
                      value={negotiationForm.offerPrice}
                      onChange={(e) => setNegotiationForm({...negotiationForm, offerPrice: e.target.value})}
                      className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your offer amount"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Listed price: {property.price}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                  <select
                    value={negotiationForm.terms}
                    onChange={(e) => setNegotiationForm({...negotiationForm, terms: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 pr-8"
                  >
                    <option value="">Select payment terms</option>
                    <option value="cash">Cash Payment</option>
                    <option value="mortgage">Mortgage Required</option>
                    <option value="installments">Installment Plan</option>
                    <option value="trade">Property Trade</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={negotiationForm.financeReady}
                      onChange={(e) => setNegotiationForm({...negotiationForm, financeReady: e.target.checked})}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Pre-approved financing ready</span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Terms & Conditions</label>
                  <textarea
                    value={negotiationForm.message}
                    onChange={(e) => setNegotiationForm({...negotiationForm, message: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Include any special conditions, timeline requirements, or additional terms..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNegotiation(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Submit Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Contact Seller Modal */}
        {showContactSeller && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Seller</h3>
                <button
                  onClick={() => setShowContactSeller(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleContactSeller} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    placeholder="I'm interested in this property. Please provide more information..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowContactSeller(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}