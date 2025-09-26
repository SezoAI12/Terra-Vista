
import { useState } from 'react';

interface MarketData {
  city: string;
  country: string;
  flag: string;
  coordinates: { lat: number; lng: number };
  priceGrowth: number;
  rentalYield: number;
  avgPrice: string;
  currency: string;
  marketScore: number;
  trendDirection: 'up' | 'down' | 'stable';
  hotZones: string[];
  investmentGrade: string;
  liquidity: 'High' | 'Medium' | 'Low';
  riskLevel: 'Low' | 'Medium' | 'High';
}

interface GlobalHeatmapProps {
  className?: string;
}

export default function GlobalHeatmap({ className = '' }: GlobalHeatmapProps) {
  const [selectedCity, setSelectedCity] = useState<MarketData | null>(null);
  const [viewMode, setViewMode] = useState<'growth' | 'yield' | 'score'>('growth');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCityFilter, setSelectedCityFilter] = useState('all');
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const marketData: MarketData[] = [
    {
      city: 'Dubai',
      country: 'UAE',
      flag: '🇦🇪',
      coordinates: { lat: 25.2048, lng: 55.2708 },
      priceGrowth: 18.5,
      rentalYield: 7.2,
      avgPrice: '$520,000',
      currency: 'AED',
      marketScore: 94,
      trendDirection: 'up',
      hotZones: ['Dubai Marina', 'Downtown', 'Palm Jumeirah', 'Business Bay', 'JLT'],
      investmentGrade: 'A+',
      liquidity: 'High',
      riskLevel: 'Low'
    },
    {
      city: 'Abu Dhabi',
      country: 'UAE',
      flag: '🇦🇪',
      coordinates: { lat: 24.4539, lng: 54.3773 },
      priceGrowth: 12.3,
      rentalYield: 6.8,
      avgPrice: '$480,000',
      currency: 'AED',
      marketScore: 91,
      trendDirection: 'up',
      hotZones: ['Saadiyat Island', 'Al Reem', 'Corniche', 'Yas Island'],
      investmentGrade: 'A+',
      liquidity: 'High',
      riskLevel: 'Low'
    },
    {
      city: 'Istanbul',
      country: 'Turkey',
      flag: '🇹🇷',
      coordinates: { lat: 41.0082, lng: 28.9784 },
      priceGrowth: 25.3,
      rentalYield: 9.8,
      avgPrice: '$180,000',
      currency: 'TRY',
      marketScore: 89,
      trendDirection: 'up',
      hotZones: ['Sisli', 'Beyoglu', 'Kadikoy', 'Besiktas', 'Uskudar'],
      investmentGrade: 'A',
      liquidity: 'Medium',
      riskLevel: 'Medium'
    },
    {
      city: 'Ankara',
      country: 'Turkey',
      flag: '🇹🇷',
      coordinates: { lat: 39.9334, lng: 32.8597 },
      priceGrowth: 22.1,
      rentalYield: 8.5,
      avgPrice: '$140,000',
      currency: 'TRY',
      marketScore: 85,
      trendDirection: 'up',
      hotZones: ['Cankaya', 'Kizilay', 'Bahcelievler', 'Yenimahalle'],
      investmentGrade: 'A-',
      liquidity: 'Medium',
      riskLevel: 'Medium'
    },
    {
      city: 'London',
      country: 'UK',
      flag: '🇬🇧',
      coordinates: { lat: 51.5074, lng: -0.1278 },
      priceGrowth: 8.2,
      rentalYield: 4.5,
      avgPrice: '$890,000',
      currency: 'GBP',
      marketScore: 92,
      trendDirection: 'stable',
      hotZones: ['Canary Wharf', 'City', 'Kensington', 'Shoreditch', 'Greenwich'],
      investmentGrade: 'A+',
      liquidity: 'High',
      riskLevel: 'Low'
    },
    {
      city: 'Manchester',
      country: 'UK',
      flag: '🇬🇧',
      coordinates: { lat: 53.4808, lng: -2.2426 },
      priceGrowth: 11.7,
      rentalYield: 6.2,
      avgPrice: '$320,000',
      currency: 'GBP',
      marketScore: 87,
      trendDirection: 'up',
      hotZones: ['City Centre', 'Northern Quarter', 'Salford Quays', 'Ancoats'],
      investmentGrade: 'A',
      liquidity: 'High',
      riskLevel: 'Low'
    },
    {
      city: 'Riyadh',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      priceGrowth: 15.7,
      rentalYield: 6.3,
      avgPrice: '$380,000',
      currency: 'SAR',
      marketScore: 88,
      trendDirection: 'up',
      hotZones: ['King Abdullah', 'Olaya', 'Al Malqa', 'Diplomatic Quarter'],
      investmentGrade: 'A',
      liquidity: 'Medium',
      riskLevel: 'Low'
    },
    {
      city: 'Jeddah',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      coordinates: { lat: 21.3891, lng: 39.8579 },
      priceGrowth: 13.2,
      rentalYield: 5.9,
      avgPrice: '$320,000',
      currency: 'SAR',
      marketScore: 84,
      trendDirection: 'up',
      hotZones: ['Al Hamra', 'Al Rawdah', 'Al Zahra', 'Corniche'],
      investmentGrade: 'A-',
      liquidity: 'Medium',
      riskLevel: 'Low'
    },
    {
      city: 'Baghdad',
      country: 'Iraq',
      flag: '🇮🇶',
      coordinates: { lat: 33.3152, lng: 44.3661 },
      priceGrowth: 22.1,
      rentalYield: 12.5,
      avgPrice: '$95,000',
      currency: 'IQD',
      marketScore: 76,
      trendDirection: 'up',
      hotZones: ['Karada', 'Mansour', 'Jadiriya', 'Karradah'],
      investmentGrade: 'B+',
      liquidity: 'Low',
      riskLevel: 'High'
    },
    {
      city: 'Erbil',
      country: 'Iraq',
      flag: '🇮🇶',
      coordinates: { lat: 36.1911, lng: 44.0093 },
      priceGrowth: 19.8,
      rentalYield: 11.2,
      avgPrice: '$85,000',
      currency: 'IQD',
      marketScore: 78,
      trendDirection: 'up',
      hotZones: ['Downtown', 'Ainkawa', 'Italian Village', 'Empire'],
      investmentGrade: 'B+',
      liquidity: 'Low',
      riskLevel: 'Medium'
    },
    {
      city: 'Doha',
      country: 'Qatar',
      flag: '🇶🇦',
      coordinates: { lat: 25.2854, lng: 51.5310 },
      priceGrowth: 12.8,
      rentalYield: 5.8,
      avgPrice: '$450,000',
      currency: 'QAR',
      marketScore: 90,
      trendDirection: 'up',
      hotZones: ['West Bay', 'The Pearl', 'Lusail', 'Al Sadd'],
      investmentGrade: 'A',
      liquidity: 'High',
      riskLevel: 'Low'
    },
    {
      city: 'Berlin',
      country: 'Germany',
      flag: '🇩🇪',
      coordinates: { lat: 52.52, lng: 13.405 },
      priceGrowth: 6.4,
      rentalYield: 3.8,
      avgPrice: '$420,000',
      currency: 'EUR',
      marketScore: 85,
      trendDirection: 'stable',
      hotZones: ['Mitte', 'Prenzlauer Berg', 'Kreuzberg', 'Charlottenburg'],
      investmentGrade: 'A-',
      liquidity: 'High',
      riskLevel: 'Low'
    },
    {
      city: 'Mumbai',
      country: 'India',
      flag: '🇮🇳',
      coordinates: { lat: 19.076, lng: 72.8777 },
      priceGrowth: 14.2,
      rentalYield: 8.1,
      avgPrice: '$280,000',
      currency: 'INR',
      marketScore: 82,
      trendDirection: 'up',
      hotZones: ['Bandra', 'Andheri', 'Lower Parel', 'Powai'],
      investmentGrade: 'B+',
      liquidity: 'Medium',
      riskLevel: 'Medium'
    }
  ];

  // Get unique countries for dropdown
  const countries = ['all', ...Array.from(new Set(marketData.map(city => city.country)))];
  
  // Get cities for selected country
  const availableCities = selectedCountry === 'all' 
    ? marketData 
    : marketData.filter(city => city.country === selectedCountry);
  
  // Get unique cities for dropdown
  const cities = ['all', ...Array.from(new Set(availableCities.map(city => city.city)))];

  // Filter data based on selections
  const filteredData = marketData.filter(city => {
    if (selectedCountry !== 'all' && city.country !== selectedCountry) return false;
    if (selectedCityFilter !== 'all' && city.city !== selectedCityFilter) return false;
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-amber-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  const getMarkerColor = (city: MarketData, metric: string) => {
    switch (metric) {
      case 'growth':
        return city.priceGrowth > 15 ? '#10b981' : city.priceGrowth > 10 ? '#f59e0b' : '#ef4444';
      case 'yield':
        return city.rentalYield > 8 ? '#10b981' : city.rentalYield > 5 ? '#f59e0b' : '#ef4444';
      case 'score':
        return city.marketScore >= 90 ? '#10b981' : city.marketScore >= 80 ? '#f59e0b' : '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return 'ri-arrow-up-line text-emerald-600';
      case 'down':
        return 'ri-arrow-down-line text-rose-600';
      default:
        return 'ri-subtract-line text-slate-600';
    }
  };

  const getMetricValue = (city: MarketData, metric: string) => {
    switch (metric) {
      case 'growth':
        return `+${city.priceGrowth}%`;
      case 'yield':
        return `${city.rentalYield}%`;
      case 'score':
        return `${city.marketScore}/100`;
      default:
        return '';
    }
  };

  const getMetricColor = (city: MarketData, metric: string) => {
    switch (metric) {
      case 'growth':
        return city.priceGrowth > 15
          ? 'text-emerald-600'
          : city.priceGrowth > 10
          ? 'text-amber-600'
          : 'text-rose-600';
      case 'yield':
        return city.rentalYield > 8
          ? 'text-emerald-600'
          : city.rentalYield > 5
          ? 'text-amber-600'
          : 'text-rose-600';
      case 'score':
        return city.marketScore >= 90
          ? 'text-emerald-600'
          : city.marketScore >= 80
          ? 'text-amber-600'
          : 'text-rose-600';
      default:
        return 'text-slate-600';
    }
  };

  // Enhanced coordinate mapping functions
  const latToY = (lat: number) => {
    // More accurate Mercator projection
    const clampedLat = Math.max(-85, Math.min(85, lat));
    const radLat = (clampedLat * Math.PI) / 180;
    const mercN = Math.log(Math.tan((Math.PI / 4) + (radLat / 2)));
    return 200 - (mercN * 200 / Math.PI) + 50; // Adjusted for better positioning
  };

  const lngToX = (lng: number) => {
    // More accurate longitude mapping
    const clampedLng = Math.max(-180, Math.min(180, lng));
    return ((clampedLng + 180) / 360) * 700 + 50; // Better distribution
  };

  return (
    <div className={`bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden ${className}`}>
      {/* Enhanced Header */}
      <div className="p-8 border-b border-slate-200 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <i className="ri-global-line text-white text-3xl"></i>
              </div>
              <div>
                <h3 className="text-4xl font-black text-white leading-tight">Global Market Intelligence</h3>
                <p className="text-slate-300 font-medium text-lg">Real-time AI-powered market analysis across global real estate markets</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Enhanced Country Selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-white flex items-center">
                <i className="ri-map-pin-line mr-2"></i>
                Country:
              </span>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedCityFilter('all');
                }}
                className="px-4 py-3 border border-slate-600 rounded-2xl text-sm font-semibold bg-slate-800/90 backdrop-blur-sm shadow-xl hover:border-cyan-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all pr-10 text-white"
              >
                <option value="all">All Countries</option>
                {countries.slice(1).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Enhanced City Selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-white flex items-center">
                <i className="ri-building-line mr-2"></i>
                City:
              </span>
              <select
                value={selectedCityFilter}
                onChange={(e) => setSelectedCityFilter(e.target.value)}
                className="px-4 py-3 border border-slate-600 rounded-2xl text-sm font-semibold bg-slate-800/90 backdrop-blur-sm shadow-xl hover:border-cyan-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all pr-10 text-white"
              >
                <option value="all">All Cities</option>
                {cities.slice(1).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Enhanced View Mode Toggle */}
            <div className="flex space-x-1 bg-slate-800/60 backdrop-blur-sm rounded-2xl p-1 shadow-xl border border-slate-600">
              <button
                onClick={() => setViewMode('growth')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  viewMode === 'growth' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <i className="ri-arrow-up-line mr-2"></i>
                Growth
              </button>
              <button
                onClick={() => setViewMode('yield')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  viewMode === 'yield' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <i className="ri-percent-line mr-2"></i>
                Yield
              </button>
              <button
                onClick={() => setViewMode('score')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  viewMode === 'score' 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg scale-105' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <i className="ri-star-line mr-2"></i>
                Score
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {/* Enhanced Interactive World Map */}
        <div className="relative mb-10">
          <div className="h-[600px] bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-3xl relative overflow-hidden border-4 border-slate-200 shadow-2xl">
            {/* Enhanced Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} className="w-full h-full"></div>
            </div>
            
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 500"
              className="absolute inset-0"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Enhanced Definitions */}
              <defs>
                <linearGradient id="modernMapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <filter id="modernGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="modernShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.25"/>
                </filter>
                <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Enhanced Background */}
              <rect width="800" height="500" fill="url(#modernMapGradient)"/>
              
              {/* Enhanced World Map Continents with better positioning */}
              <g fill="#94a3b8" fillOpacity="0.15" stroke="#64748b" strokeWidth="1.5" strokeOpacity="0.3">
                {/* Europe - Positioned for better accuracy */}
                <path d="M 350 140 Q 380 130 410 138 Q 440 145 445 165 Q 440 185 425 195 Q 395 200 365 195 Q 340 185 350 165 Z" filter="url(#modernShadow)"/>
                {/* Asia - Better positioned */}
                <path d="M 480 115 Q 530 110 580 120 Q 630 130 660 155 Q 665 195 640 215 Q 600 225 560 220 Q 520 215 480 175 Z" filter="url(#modernShadow)"/>
                {/* Middle East - More accurate positioning */}
                <path d="M 420 180 Q 450 175 480 185 Q 510 195 515 215 Q 510 235 495 245 Q 465 250 435 245 Q 415 235 420 210 Z" filter="url(#modernShadow)"/>
                {/* Africa - Better shape and position */}
                <path d="M 370 240 Q 395 235 420 245 Q 445 260 450 290 Q 445 320 425 340 Q 400 350 375 345 Q 355 335 370 300 Z" filter="url(#modernShadow)"/>
                {/* North America - Improved positioning */}
                <path d="M 150 120 Q 210 115 250 130 Q 290 145 300 180 Q 295 215 270 230 Q 230 240 190 235 Q 150 220 150 180 Z" filter="url(#modernShadow)"/>
                {/* South America - Better placement */}
                <path d="M 230 250 Q 260 245 280 260 Q 300 280 305 310 Q 300 340 280 360 Q 255 370 235 365 Q 215 355 230 320 Z" filter="url(#modernShadow)"/>
                {/* Australia - Improved position */}
                <path d="M 620 320 Q 660 315 690 325 Q 720 335 725 355 Q 720 375 700 385 Q 670 390 640 385 Q 610 375 620 355 Z" filter="url(#modernShadow)"/>
              </g>
              
              {/* Enhanced Connection Lines */}
              <g stroke="url(#modernMapGradient)" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="5,5">
                {filteredData.map((city, index) => {
                  if (index === 0) return null;
                  const prevCity = filteredData[index - 1];
                  const x1 = lngToX(prevCity.coordinates.lng);
                  const y1 = latToY(prevCity.coordinates.lat);
                  const x2 = lngToX(city.coordinates.lng);
                  const y2 = latToY(city.coordinates.lat);
                  
                  return (
                    <line key={`connection-${index}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                  );
                })}
              </g>
              
              {/* Enhanced City Markers with improved positioning */}
              {filteredData.map((city, index) => {
                const x = lngToX(city.coordinates.lng);
                const y = latToY(city.coordinates.lat);
                const color = getMarkerColor(city, viewMode);
                const isHovered = hoveredCity === `${city.city}-${city.country}`;
                const isSelected = selectedCity?.city === city.city && selectedCity?.country === city.country;
                const markerSize = isHovered || isSelected ? 22 : 18;
                
                return (
                  <g key={`${city.city}-${city.country}`}>
                    {/* Enhanced Pulse Animation for Selected/Hovered */}
                    {(isSelected || isHovered) && (
                      <>
                        <circle
                          cx={x}
                          cy={y}
                          r="50"
                          fill={color}
                          opacity="0.1"
                          className="animate-ping"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="35"
                          fill={color}
                          opacity="0.2"
                          className="animate-pulse"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="28"
                          fill={color}
                          opacity="0.3"
                          filter="url(#pulseGlow)"
                        />
                      </>
                    )}
                    
                    {/* Enhanced City Marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r={markerSize}
                      fill={color}
                      stroke="white"
                      strokeWidth="4"
                      filter={isHovered || isSelected ? "url(#modernGlow)" : "url(#modernShadow)"}
                      className="cursor-pointer transition-all duration-300 hover:scale-125"
                      onClick={() => setSelectedCity(selectedCity?.city === city.city ? null : city)}
                      onMouseEnter={() => setHoveredCity(`${city.city}-${city.country}`)}
                      onMouseLeave={() => setHoveredCity(null)}
                    />
                    
                    {/* Enhanced City Flag */}
                    <text
                      x={x}
                      y={y - markerSize - 20}
                      textAnchor="middle"
                      className="text-2xl pointer-events-none"
                      style={{ 
                        fontSize: isHovered || isSelected ? '28px' : '22px',
                        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'
                      }}
                    >
                      {city.flag}
                    </text>
                    
                    {/* Enhanced City Name */}
                    <text
                      x={x}
                      y={y + markerSize + 30}
                      textAnchor="middle"
                      className="font-black fill-slate-900 pointer-events-none"
                      style={{ 
                        fontSize: isHovered || isSelected ? '18px' : '16px',
                        filter: 'drop-shadow(1px 1px 3px rgba(255,255,255,0.9))'
                      }}
                    >
                      {city.city}
                    </text>
                    
                    {/* Enhanced Metric Value */}
                    <text
                      x={x}
                      y={y + markerSize + 50}
                      textAnchor="middle"
                      className="font-black pointer-events-none"
                      fill={color}
                      style={{ 
                        fontSize: isHovered || isSelected ? '17px' : '15px',
                        filter: 'drop-shadow(1px 1px 3px rgba(255,255,255,0.9))'
                      }}
                    >
                      {getMetricValue(city, viewMode)}
                    </text>
                  </g>
                );
              })}
              
              {/* Enhanced Legend */}
              <g transform="translate(30, 380)">
                <rect x="0" y="0" width="320" height="100" fill="white" fillOpacity="0.95" rx="25" stroke="#e2e8f0" strokeWidth="2" filter="url(#modernShadow)"/>
                <text x="30" y="35" className="text-lg font-black fill-slate-900">Performance Intelligence Legend</text>
                
                <circle cx="40" cy="55" r="10" fill="#10b981"/>
                <text x="65" y="60" className="text-sm fill-slate-800 font-bold">High Performance (&gt;15%)</text>
                
                <circle cx="40" cy="75" r="10" fill="#f59e0b"/>
                <text x="65" y="80" className="text-sm fill-slate-800 font-bold">Medium Performance (10-15%)</text>
                
                <circle cx="210" cy="55" r="10" fill="#ef4444"/>
                <text x="235" y="60" className="text-sm fill-slate-800 font-bold">Low Performance (&lt;10%)</text>
                
                <text x="210" y="80" className="text-sm fill-slate-600 font-bold">Click for AI insights</text>
              </g>
            </svg>

            {/* Enhanced Hover Tooltip */}
            {hoveredCity && (
              <div className="absolute top-6 right-6 bg-slate-900/95 backdrop-blur-sm text-white px-8 py-6 rounded-3xl text-sm shadow-2xl border border-white/10 z-20">
                {(() => {
                  const city = filteredData.find(c => `${c.city}-${c.country}` === hoveredCity);
                  return city ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{city.flag}</span>
                        <div className="font-black text-xl">{city.city}, {city.country}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-800/50 p-3 rounded-xl">
                          <span className="text-slate-300 block text-xs">Growth:</span>
                          <span className={`text-lg font-black ${getMetricColor(city, 'growth').replace('text-', 'text-')}`}>
                            +{city.priceGrowth}%
                          </span>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-xl">
                          <span className="text-slate-300 block text-xs">Yield:</span>
                          <span className="text-lg font-black text-blue-400">{city.rentalYield}%</span>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-xl">
                          <span className="text-slate-300 block text-xs">Score:</span>
                          <span className="text-lg font-black text-purple-400">{city.marketScore}/100</span>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-xl">
                          <span className="text-slate-300 block text-xs">Grade:</span>
                          <span className="text-lg font-black text-emerald-400">{city.investmentGrade}</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 pt-2 border-t border-slate-700 text-center">
                        <i className="ri-cursor-line mr-1"></i>
                        Click for comprehensive AI analysis
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {/* Enhanced Interactive Guide */}
            {!hoveredCity && !selectedCity && filteredData.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center bg-white/95 backdrop-blur-sm px-12 py-10 rounded-3xl shadow-2xl border-2 border-slate-200">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <i className="ri-cursor-line text-5xl text-white animate-bounce"></i>
                  </div>
                  <p className="text-slate-900 text-3xl font-black mb-4">Explore Global Markets</p>
                  <p className="text-slate-600 text-xl font-medium mb-3">Hover city markers for AI insights</p>
                  <p className="text-slate-600 text-xl font-medium">Click for detailed analytics</p>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Filter Summary */}
          {(selectedCountry !== 'all' || selectedCityFilter !== 'all') && (
            <div className="mt-8 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border-2 border-blue-200 shadow-lg">
              <div className="flex items-center space-x-6">
                <span className="text-lg text-slate-700 font-black flex items-center">
                  <i className="ri-filter-3-line mr-3 text-2xl"></i>
                  Active Filters:
                </span>
                {selectedCountry !== 'all' && (
                  <span className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl text-lg font-bold shadow-lg">
                    <i className="ri-map-pin-line mr-2"></i>
                    {selectedCountry}
                  </span>
                )}
                {selectedCityFilter !== 'all' && (
                  <span className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl text-lg font-bold shadow-lg">
                    <i className="ri-building-line mr-2"></i>
                    {selectedCityFilter}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedCountry('all');
                  setSelectedCityFilter('all');
                }}
                className="px-8 py-4 text-lg text-slate-700 hover:text-slate-900 hover:bg-white rounded-2xl transition-all font-bold whitespace-nowrap shadow-lg border-2 border-slate-200 hover:border-slate-300"
              >
                <i className="ri-close-line mr-2"></i>
                Clear All Filters
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
            {filteredData.map((city) => (
              <div
                key={`${city.city}-${city.country}`}
                onClick={() => setSelectedCity(selectedCity?.city === city.city ? null : city)}
                onMouseEnter={() => setHoveredCity(`${city.city}-${city.country}`)}
                onMouseLeave={() => setHoveredCity(null)}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-500 hover:shadow-2xl transform hover:scale-105 ${
                  selectedCity?.city === city.city && selectedCity?.country === city.country
                    ? 'border-indigo-500 bg-indigo-50 shadow-2xl scale-105'
                    : hoveredCity === `${city.city}-${city.country}`
                    ? 'border-purple-400 bg-purple-50 shadow-xl'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{city.flag}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{city.city}</h4>
                      <p className="text-sm text-slate-600">{city.country}</p>
                    </div>
                  </div>
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg ${getScoreColor(city.marketScore)}`}>
                    <span className="text-white font-bold text-lg">{city.marketScore}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-semibold">Price Growth:</span>
                    <div className="flex items-center space-x-2">
                      <i className={getTrendIcon(city.trendDirection)}></i>
                      <span className="font-bold text-emerald-600">+{city.priceGrowth}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-semibold">Rental Yield:</span>
                    <span className="font-bold text-blue-600">{city.rentalYield}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-semibold">Avg Price:</span>
                    <span className="font-bold text-purple-600">{city.avgPrice}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-semibold">Grade:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        city.investmentGrade.includes('+')
                          ? 'bg-emerald-100 text-emerald-800'
                          : city.investmentGrade.includes('A')
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {city.investmentGrade}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {city.hotZones.slice(0, 2).map((zone, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                        {zone}
                      </span>
                    ))}
                    {city.hotZones.length > 2 && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                        +{city.hotZones.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-search-line text-4xl text-slate-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No cities found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => {
                  setSelectedCountry('all');
                  setSelectedCityFilter('all');
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium whitespace-nowrap"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Enhanced Detailed City Information */}
          {selectedCity && (
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-indigo-200 relative overflow-hidden shadow-2xl">
              {/* Enhanced Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220%200%2060%2060%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%234f46e5%22 fill-opacity=%220.4%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    <span className="text-6xl">{selectedCity.flag}</span>
                    <div>
                      <h3 className="text-4xl font-black text-slate-900 mb-2">
                        {selectedCity.city}, {selectedCity.country}
                      </h3>
                      <p className="text-slate-600 text-xl">Comprehensive Market Analysis & Investment Insights</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCity(null)} 
                    className="p-3 hover:bg-white/60 rounded-2xl transition-colors group"
                  >
                    <i className="ri-close-line text-3xl text-slate-500 group-hover:text-slate-700"></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 bg-white/90 rounded-3xl backdrop-blur-sm shadow-xl border border-white/50">
                    <div className="text-5xl font-black text-emerald-600 mb-3">+{selectedCity.priceGrowth}%</div>
                    <div className="text-sm text-slate-600 font-semibold">Annual Price Growth</div>
                    <i className="ri-arrow-up-line text-emerald-500 text-2xl mt-2"></i>
                  </div>
                  <div className="text-center p-6 bg-white/90 rounded-3xl backdrop-blur-sm shadow-xl border border-white/50">
                    <div className="text-5xl font-black text-blue-600 mb-3">{selectedCity.rentalYield}%</div>
                    <div className="text-sm text-slate-600 font-semibold">Rental Yield</div>
                    <i className="ri-percent-line text-blue-500 text-2xl mt-2"></i>
                  </div>
                  <div className="text-center p-6 bg-white/90 rounded-3xl backdrop-blur-sm shadow-xl border border-white/50">
                    <div className="text-5xl font-black text-purple-600 mb-3">{selectedCity.marketScore}</div>
                    <div className="text-sm text-slate-600 font-semibold">Market Score</div>
                    <i className="ri-star-line text-purple-500 text-2xl mt-2"></i>
                  </div>
                  <div className="text-center p-6 bg-white/90 rounded-3xl backdrop-blur-sm shadow-xl border border-white/50">
                    <div className="text-5xl font-black text-orange-600 mb-3">{selectedCity.investmentGrade}</div>
                    <div className="text-sm text-slate-600 font-semibold">Investment Grade</div>
                    <i className="ri-trophy-line text-orange-500 text-2xl mt-2"></i>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                      <i className="ri-map-pin-line mr-3 text-indigo-600"></i>
                      Prime Investment Zones
                    </h4>
                    <div className="space-y-4">
                      {selectedCity.hotZones.map((zone, idx) => (
                        <div key={idx} className="flex items-center justify-between p-5 bg-white/90 rounded-2xl backdrop-blur-sm shadow-xl border border-white/50">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                              <span className="text-white font-bold">{idx + 1}</span>
                            </div>
                            <span className="font-bold text-slate-900 text-lg">{zone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-full text-sm font-bold">
                              <i className="ri-fire-line mr-1"></i>
                              Hot Zone
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                      <i className="ri-bar-chart-line mr-3 text-emerald-600"></i>
                      Market Indicators
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 bg-white/90 rounded-2xl backdrop-blur-sm shadow-xl border border-white/50">
                        <div className="flex items-center space-x-3">
                          <i className="ri-water-flash-line text-blue-600 text-2xl"></i>
                          <span className="font-bold text-slate-900 text-lg">Market Liquidity</span>
                        </div>
                        <span
                          className={`px-5 py-2 rounded-full text-sm font-bold ${
                            selectedCity.liquidity === 'High'
                              ? 'bg-emerald-100 text-emerald-800'
                              : selectedCity.liquidity === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {selectedCity.liquidity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-white/90 rounded-2xl backdrop-blur-sm shadow-xl border border-white/50">
                        <div className="flex items-center space-x-3">
                          <i className="ri-shield-check-line text-purple-600 text-2xl"></i>
                          <span className="font-bold text-slate-900 text-lg">Risk Level</span>
                        </div>
                        <span
                          className={`px-5 py-2 rounded-full text-sm font-bold ${
                            selectedCity.riskLevel === 'Low'
                              ? 'bg-emerald-100 text-emerald-800'
                              : selectedCity.riskLevel === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {selectedCity.riskLevel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-white/90 rounded-2xl backdrop-blur-sm shadow-xl border border-white/50">
                        <div className="flex items-center space-x-3">
                          <i className="ri-money-dollar-circle-line text-emerald-600 text-2xl"></i>
                          <span className="font-bold text-slate-900 text-lg">Average Price</span>
                        </div>
                        <span className="font-bold text-purple-600 text-xl">{selectedCity.avgPrice}</span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-white/90 rounded-2xl backdrop-blur-sm shadow-xl border border-white/50">
                        <div className="flex items-center space-x-3">
                          <i className="ri-exchange-line text-orange-600 text-2xl"></i>
                          <span className="font-bold text-slate-900 text-lg">Currency</span>
                        </div>
                        <span className="font-bold text-orange-600 text-xl">{selectedCity.currency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <button className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-indigo-700 hover:to-blue-800 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap">
                    <i className="ri-building-line mr-2"></i>
                    View Properties in {selectedCity.city}
                  </button>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-700 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-800 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap">
                    <i className="ri-file-chart-line mr-2"></i>
                    Get Market Report
                  </button>
                  <button className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-8 py-4 rounded-2xl hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap">
                    <i className="ri-notification-line mr-2"></i>
                    Set Price Alert
                  </button>
                  <button className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-8 py-4 rounded-2xl hover:from-orange-700 hover:to-red-800 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap">
                    <i className="ri-robot-line mr-2"></i>
                    AI Investment Analysis
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Market Summary */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-200 shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <i className="ri-arrow-up-line text-white text-3xl"></i>
              </div>
              <div className="text-4xl font-black text-emerald-600 mb-3">
                +{Math.round(filteredData.reduce((sum, city) => sum + city.priceGrowth, 0) / filteredData.length * 10) / 10}%
              </div>
              <div className="text-sm text-slate-600 font-semibold">Average Growth Rate</div>
              <div className="text-xs text-slate-500 mt-1">({filteredData.length} cities analyzed)</div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border-2 border-blue-200 shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <i className="ri-percent-line text-white text-3xl"></i>
              </div>
              <div className="text-4xl font-black text-blue-600 mb-3">
                {Math.round(filteredData.reduce((sum, city) => sum + city.rentalYield, 0) / filteredData.length * 10) / 10}%
              </div>
              <div className="text-sm text-slate-600 font-semibold">Average Rental Yield</div>
              <div className="text-xs text-slate-500 mt-1">Across all markets</div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200 shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <i className="ri-trophy-line text-white text-3xl"></i>
              </div>
              <div className="text-4xl font-black text-purple-600 mb-3">
                {Math.round(filteredData.reduce((sum, city) => sum + city.marketScore, 0) / filteredData.length)}
              </div>
              <div className="text-sm text-slate-600 font-semibold">Average Market Score</div>
              <div className="text-xs text-slate-500 mt-1">Investment readiness index</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
