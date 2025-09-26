import { useState, useEffect } from 'react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate: number;
}

interface CurrencyConverterProps {
  className?: string;
  defaultAmount?: number;
  defaultFrom?: string;
  defaultTo?: string;
}

export default function CurrencyConverter({ 
  className = '', 
  defaultAmount = 1000000,
  defaultFrom = 'USD',
  defaultTo = 'AED'
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [fromCurrency, setFromCurrency] = useState(defaultFrom);
  const [toCurrency, setToCurrency] = useState(defaultTo);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rate: 1.0 },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.85 },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rate: 0.73 },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rate: 3.67 },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', rate: 28.50 },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦', rate: 3.75 },
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦', rate: 3.64 },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼', rate: 0.31 },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭', rate: 0.38 },
    { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', flag: '🇴🇲', rate: 0.38 },
    { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴', rate: 0.71 },
    { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', flag: '🇱🇧', rate: 15000 },
    { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د', flag: '🇮🇶', rate: 1470 },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'ج.م', flag: '🇪🇬', rate: 31.0 },
    { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦', rate: 10.2 },
    { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿', rate: 135 },
    { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳', rate: 3.1 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rate: 150 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', rate: 7.3 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rate: 83.2 },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰', rate: 280 },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', rate: 110 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rate: 1.36 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rate: 1.55 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', rate: 0.91 },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', rate: 11.0 },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', rate: 10.9 },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', rate: 6.9 },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', rate: 4.3 },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', rate: 23.0 },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', rate: 360 },
    { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', rate: 4.7 },
    { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', rate: 1.8 },
    { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷', rate: 7.5 },
    { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин', flag: '🇷🇸', rate: 108 },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', rate: 92 },
    { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦', rate: 37 },
    { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', flag: '🇧🇾', rate: 3.2 },
    { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿', rate: 460 },
    { code: 'UZS', name: 'Uzbekistani Som', symbol: "so'm", flag: '🇺🇿', rate: 12300 },
    { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'лв', flag: '🇰🇬', rate: 89 },
    { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'ЅМ', flag: '🇹🇯', rate: 10.9 },
    { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'T', flag: '🇹🇲', rate: 3.5 },
    { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', flag: '🇦🇿', rate: 1.7 },
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪', rate: 2.7 },
    { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲', rate: 400 },
    { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫', rate: 75 },
    { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷', rate: 42000 },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', rate: 18.0 },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', rate: 5.0 },
    { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷', rate: 850 },
    { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱', rate: 900 },
    { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴', rate: 4100 },
    { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪', rate: 3.7 },
    { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾', rate: 39 },
    { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', flag: '🇵🇾', rate: 7300 },
    { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', flag: '🇧🇴', rate: 6.9 },
    { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs', flag: '🇻🇪', rate: 36 },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', rate: 19.0 },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', rate: 800 },
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭', rate: 12.0 },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', rate: 150 },
    { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬', rate: 3700 },
    { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿', rate: 2500 },
    { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹', rate: 56 },
    { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼', rate: 1680 },
    { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲', rate: 21 },
    { code: 'BWP', name: 'Botswanan Pula', symbol: 'P', flag: '🇧🇼', rate: 13.5 },
    { code: 'NAD', name: 'Namibian Dollar', symbol: 'N$', flag: '🇳🇦', rate: 19.0 },
    { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L', flag: '🇸🇿', rate: 19.0 },
    { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', flag: '🇱🇸', rate: 19.0 },
    { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿', rate: 64 },
    { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar', flag: '🇲🇬', rate: 4500 },
    { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨', flag: '🇲🇺', rate: 45 },
    { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨', flag: '🇸🇨', rate: 13.5 },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', rate: 1320 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rate: 1.35 },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', rate: 4.7 },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', rate: 36 },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', rate: 56 },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', rate: 15800 },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', rate: 24500 },
    { code: 'LAK', name: 'Lao Kip', symbol: '₭', flag: '🇱🇦', rate: 21000 },
    { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', flag: '🇰🇭', rate: 4100 },
    { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲', rate: 2100 },
    { code: 'BND', name: 'Brunei Dollar', symbol: 'B$', flag: '🇧🇳', rate: 1.35 },
    { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼', rate: 32 },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', rate: 7.8 },
    { code: 'MOP', name: 'Macanese Pataca', symbol: 'MOP$', flag: '🇲🇴', rate: 8.1 },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', rate: 1.65 },
    { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', flag: '🇫🇯', rate: 2.25 }
  ];

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'AED', 'TRY', 'SAR', 'QAR', 'KWD'];

  useEffect(() => {
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    
    setIsLoading(true);
    const timer = setTimeout(() => {
      setConvertedAmount((amount / fromRate) * toRate);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatNumber = (num: number, currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: currencyCode === 'JPY' || currencyCode === 'KRW' ? 0 : 2,
      maximumFractionDigits: currencyCode === 'JPY' || currencyCode === 'KRW' ? 0 : 2
    }).format(num);
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  const getCurrencyFlag = (code: string) => {
    return currencies.find(c => c.code === code)?.flag || '🌍';
  };

  const quickAmounts = [100000, 500000, 1000000, 5000000, 10000000];

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
            <i className="ri-exchange-dollar-line text-white text-xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Multi-Currency Converter</h3>
            <p className="text-sm text-gray-600">Real-time exchange rates for global property markets</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Amount Buttons */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Quick Amounts</label>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  amount === quickAmount
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCurrencySymbol('USD')}{(quickAmount / 1000000).toFixed(quickAmount >= 1000000 ? 1 : 0)}M
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
            placeholder="Enter amount..."
          />
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* From Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium appearance-none bg-white pr-10"
              >
                <optgroup label="Popular Currencies">
                  {currencies.filter(c => popularCurrencies.includes(c.code)).map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="All Currencies">
                  {currencies.filter(c => !popularCurrencies.includes(c.code)).map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {getCurrencyFlag(fromCurrency)} {getCurrencySymbol(fromCurrency)} {formatNumber(amount, fromCurrency)}
            </div>
          </div>

          {/* To Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium appearance-none bg-white pr-10"
              >
                <optgroup label="Popular Currencies">
                  {currencies.filter(c => popularCurrencies.includes(c.code)).map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="All Currencies">
                  {currencies.filter(c => !popularCurrencies.includes(c.code)).map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Converting...</span>
                </div>
              ) : (
                <span>{getCurrencyFlag(toCurrency)} {getCurrencySymbol(toCurrency)} {formatNumber(convertedAmount, toCurrency)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSwap}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
          >
            <i className="ri-arrow-left-right-line text-xl text-gray-600 group-hover:text-blue-600 transition-colors"></i>
          </button>
        </div>

        {/* Conversion Result */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-200">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Converted Amount</div>
            <div className="text-3xl font-black text-blue-600 mb-4">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Converting...</span>
                </div>
              ) : (
                `${getCurrencySymbol(toCurrency)} ${formatNumber(convertedAmount, toCurrency)}`
              )}
            </div>
            <div className="text-sm text-gray-600">
              1 {fromCurrency} = {formatNumber(
                (currencies.find(c => c.code === toCurrency)?.rate || 1) / 
                (currencies.find(c => c.code === fromCurrency)?.rate || 1), 
                toCurrency
              )} {toCurrency}
            </div>
          </div>
        </div>

        {/* Popular Conversions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Real Estate Currencies</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularCurrencies.slice(0, 8).map((currencyCode) => {
              const currency = currencies.find(c => c.code === currencyCode);
              if (!currency) return null;
              
              const rate = (amount / (currencies.find(c => c.code === fromCurrency)?.rate || 1)) * currency.rate;
              
              return (
                <button
                  key={currencyCode}
                  onClick={() => setToCurrency(currencyCode)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    toCurrency === currencyCode
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{currency.flag}</span>
                    <span className="text-sm font-medium text-gray-900">{currencyCode}</span>
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {currency.symbol} {formatNumber(rate, currencyCode)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Exchange Rate Disclaimer */}
        <div className="text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-3">
          <i className="ri-information-line mr-1"></i>
          Exchange rates are indicative and may vary. For exact rates, please consult with financial institutions.
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}