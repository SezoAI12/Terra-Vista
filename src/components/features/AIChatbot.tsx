import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  query?: string;
}

interface AIChatbotProps {
  onAIQuery?: (query: string) => void;
  freeQueriesLeft?: number;
}

export default function AIChattBot({ onAIQuery, freeQueriesLeft = 2 }: AIChattBotProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: t('Hello! I\'m your AI real estate assistant. I can help you analyze properties, calculate ROI, provide market insights, and answer investment questions. How can I assist you today?'),
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceInput, setVoiceInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const commonQueries = [
    {
      question: t('What\'s ROI of this property?'),
      query: 'property_roi_analysis'
    },
    {
      question: t('Market trends in this area?'),
      query: 'market_trend_analysis'
    },
    {
      question: t('Is this a good investment?'),
      query: 'investment_recommendation'
    },
    {
      question: t('Compare with similar properties'),
      query: 'property_comparison'
    },
    {
      question: t('Calculate mortgage payments'),
      query: 'mortgage_calculation'
    },
    {
      question: t('Property valuation estimate'),
      query: 'property_valuation'
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        query: inputMessage
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      // Trigger AI query callback
      onAIQuery?.(inputMessage);
    }, 2000);
  };

  const getAIResponse = (query: string): string => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('roi') || queryLower.includes('return')) {
      return t('Based on current market data, this property shows an estimated ROI of 12-18% annually. Factors include location growth potential (+15%), rental demand (high), and comparable sales. The area has shown consistent 8% price appreciation over the past 3 years.');
    }
    
    if (queryLower.includes('market') || queryLower.includes('trend')) {
      return t('The market in this area is currently experiencing strong growth. Key indicators: 15% price increase YoY, 95% occupancy rate, average time on market: 21 days. The area benefits from new infrastructure projects and increasing foreign investment.');
    }
    
    if (queryLower.includes('invest') || queryLower.includes('buy')) {
      return t('This property scores 87/100 on our AI investment scale. Strengths: Prime location, high rental yield potential, strong capital appreciation. Considerations: Service charges, market competition. Recommend: Suitable for long-term investment with 5-7 year horizon.');
    }
    
    if (queryLower.includes('mortgage') || queryLower.includes('payment')) {
      return t('For a typical 80% LTV mortgage at current rates (3.5% APR, 25 years): Monthly payment would be approximately $4,200. Down payment required: $2.34M. Total interest over loan term: $562K. I recommend comparing rates from 3-4 lenders.');
    }
    
    if (queryLower.includes('compare') || queryLower.includes('similar')) {
      return t('Compared to similar properties in the area: This property is priced 8% below market average, offers 12% higher rental yield than comparable units, and has superior amenities. Recent sales in the building: $11.2M - $12.8M for similar units.');
    }
    
    if (queryLower.includes('valuation') || queryLower.includes('value')) {
      return t('AI valuation estimate: $12.1M - $12.8M (current listing: $11.7M). Valuation based on: Recent comparable sales, rental income potential, location premium, property condition, and market trends. This represents good value at current asking price.');
    }
    
    return t('I\'d be happy to help with that! I can provide detailed analysis on property investments, market trends, ROI calculations, and more. Could you be more specific about what aspect you\'d like me to focus on?');
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      setVoiceInput(true);
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = i18n.language === 'ar' ? 'ar-SA' : 
                       i18n.language === 'tr' ? 'tr-TR' : 
                       i18n.language === 'ku' ? 'ku-TR' : 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setVoiceInput(false);
      };
      
      recognition.onerror = () => setVoiceInput(false);
      recognition.start();
    }
  };

  const handleQuickQuery = (query: string, question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  return (
    <>
      {/* AI Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      >
        <i className="ri-robot-line text-2xl group-hover:scale-110 transition-transform"></i>
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{freeQueriesLeft}</span>
          </div>
        )}
      </button>

      {/* AI Chat Interface */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-robot-line text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold">{t('AI Property Assistant')}</h3>
                  <p className="text-sm opacity-80">{t('Real Estate Intelligence')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {freeQueriesLeft} {t('free')}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.type === 'ai' && (
                      <div className="flex space-x-2">
                        <button className="text-xs opacity-70 hover:opacity-100">
                          <i className="ri-thumb-up-line"></i>
                        </button>
                        <button className="text-xs opacity-70 hover:opacity-100">
                          <i className="ri-thumb-down-line"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="text-sm text-gray-600 ml-2">{t('AI thinking...')}</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Queries */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-600 mb-3 font-medium">{t('Quick queries')}:</p>
            <div className="grid grid-cols-2 gap-2">
              {commonQueries.slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuery(item.query, item.question)}
                  className="text-xs bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors text-left"
                  disabled={isLoading}
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder={t('Ask about properties, ROI, markets...')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-12"
                  disabled={isLoading}
                />
                <button
                  onClick={handleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 ${
                    voiceInput ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-purple-600'
                  }`}
                  disabled={isLoading}
                >
                  <i className={voiceInput ? 'ri-mic-fill' : 'ri-mic-line'}></i>
                </button>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-send-plane-line"></i>
              </button>
            </div>
            
            {freeQueriesLeft === 0 && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <i className="ri-information-line mr-1"></i>
                  {t('Free queries exhausted. Upgrade to Pro for unlimited AI assistance.')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}