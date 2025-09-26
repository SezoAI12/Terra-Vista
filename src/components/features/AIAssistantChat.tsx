
import { useState } from 'react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIAssistantChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistantChat({ isOpen, onClose }: AIAssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm your AI real estate assistant. I can help you with property searches, market analysis, ROI calculations, and investment advice. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedQuestions = [
    "What's the ROI potential for Dubai Marina?",
    "Show me properties under AED 5M",
    "Compare investment opportunities in UAE vs Turkey",
    "What are the market trends for commercial properties?",
    "Calculate mortgage for AED 2M property",
    "Find properties near good schools"
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('roi') || lowerMessage.includes('return')) {
      return "Based on current market analysis, Dubai Marina properties are showing strong ROI potential of 12-18% annually. Key factors include: prime location, high rental demand, and ongoing infrastructure development. Would you like me to analyze specific properties?";
    }
    
    if (lowerMessage.includes('market trends') || lowerMessage.includes('trends')) {
      return "Current MENA real estate trends show: 🔸Commercial sector growth of 15% expected in Q2 🔸Residential demand up 8.5% in prime locations 🔸Turkish market offering currency advantages 🔸Off-plan projects showing 22% higher returns. Which market segment interests you most?";
    }
    
    if (lowerMessage.includes('mortgage') || lowerMessage.includes('loan')) {
      return "I can help calculate mortgage details! For a typical UAE property loan: 🏦 Down payment: 20-25% 📊 Interest rates: 3.5-5.5% ⏱️ Terms: up to 25 years. Please provide the property value and I'll calculate exact monthly payments.";
    }
    
    if (lowerMessage.includes('dubai marina')) {
      return "Dubai Marina is an excellent investment choice! Here's what I found: 📈 Average growth: +18.5% YoY 🏙️ High rental demand from professionals 🚇 Metro connectivity boosts value 💰 ROI: 15-20% for quality properties. Shall I show you available properties in this area?";
    }
    
    if (lowerMessage.includes('schools') || lowerMessage.includes('education')) {
      return "Properties near quality schools typically offer better investment returns! I can filter properties within 2km of top-rated schools like GEMS Wellington, Dubai British School, and Regent International. These areas show 12% higher appreciation rates. Would you like to see family-friendly investment options?";
    }
    
    if (lowerMessage.includes('turkey') || lowerMessage.includes('turkish')) {
      return "Turkish real estate offers compelling opportunities: 💱 Currency advantage for foreign investors 🏗️ Growing construction sector 🌊 Coastal properties showing strong demand 📊 Average ROI: 14-20% 🇹🇷 Citizenship program benefits. Istanbul waterfront properties are particularly attractive right now!";
    }
    
    return "I understand you're looking for real estate insights! I can help with property searches, market analysis, ROI calculations, mortgage planning, and investment recommendations across UAE, Turkey, Iraq, and other MENA markets. Could you be more specific about what you'd like to know?";
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-robot-line text-xl"></i>
          </div>
          <div>
            <h3 className="font-semibold">AI Real Estate Assistant</h3>
            <p className="text-xs text-blue-100">Ask me anything about properties!</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl rounded-bl-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="space-y-1">
            {predefinedQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="w-full px-3 py-2 text-xs text-left text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
            placeholder="Ask about properties, market trends, ROI..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isTyping}
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <i className="ri-send-plane-2-line"></i>
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <i className="ri-translate-line"></i>
            <span>Supports EN • AR • TR • KU</span>
          </div>
        </div>
      </div>
    </div>
  );
}
