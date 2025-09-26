
import { useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

interface MultilingualSupportProps {
  className?: string;
}

export default function MultilingualSupport({ className = '' }: MultilingualSupportProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
    { code: 'ku', name: 'Kurdish Sorani', nativeName: 'کوردی سۆرانی', flag: '🟨', rtl: true },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  // Initialize language from localStorage or browser settings
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      handleLanguageChange(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = languages.find(lang => lang.code === browserLang);
      if (supportedLang) {
        handleLanguageChange(supportedLang.code);
      }
    }
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    
    // Save to localStorage
    localStorage.setItem('preferred-language', languageCode);
    
    // Apply RTL direction and language attributes
    const selectedLang = languages.find(lang => lang.code === languageCode);
    const htmlElement = document.documentElement;
    
    if (selectedLang?.rtl) {
      htmlElement.dir = 'rtl';
      htmlElement.lang = languageCode;
      htmlElement.classList.add('rtl');
      htmlElement.classList.remove('ltr');
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      htmlElement.dir = 'ltr';
      htmlElement.lang = languageCode;
      htmlElement.classList.add('ltr');
      htmlElement.classList.remove('rtl');
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }

    // Apply RTL-specific styles
    const styleId = 'rtl-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    if (selectedLang?.rtl) {
      styleElement.innerHTML = `
        .rtl {
          direction: rtl;
        }
        .rtl .space-x-2 > * + * {
          margin-right: 0.5rem;
          margin-left: 0;
        }
        .rtl .space-x-3 > * + * {
          margin-right: 0.75rem;
          margin-left: 0;
        }
        .rtl .space-x-4 > * + * {
          margin-right: 1rem;
          margin-left: 0;
        }
        .rtl .ml-2 {
          margin-right: 0.5rem;
          margin-left: 0;
        }
        .rtl .ml-3 {
          margin-right: 0.75rem;
          margin-left: 0;
        }
        .rtl .mr-2 {
          margin-left: 0.5rem;
          margin-right: 0;
        }
        .rtl .mr-3 {
          margin-left: 0.75rem;
          margin-right: 0;
        }
        .rtl .pl-4 {
          padding-right: 1rem;
          padding-left: 0;
        }
        .rtl .pr-4 {
          padding-left: 1rem;
          padding-right: 0;
        }
        .rtl .text-left {
          text-align: right;
        }
        .rtl .text-right {
          text-align: left;
        }
        .rtl .float-left {
          float: right;
        }
        .rtl .float-right {
          float: left;
        }
        .rtl .left-0 {
          right: 0;
          left: auto;
        }
        .rtl .right-0 {
          left: 0;
          right: auto;
        }
        .rtl .border-l {
          border-right-width: 1px;
          border-left-width: 0;
        }
        .rtl .border-r {
          border-left-width: 1px;
          border-right-width: 0;
        }
      `;
    } else {
      styleElement.innerHTML = '';
    }

    // Trigger language change event for the app
    window.dispatchEvent(new CustomEvent('languageChange', { detail: languageCode }));
  };

  const getLanguageText = (lang: string) => {
    switch (lang) {
      case 'ar':
        return 'اختر اللغة';
      case 'ku':
        return 'زمان هەڵبژێرە';
      case 'tr':
        return 'Dil Seçin';
      default:
        return 'Select Language';
    }
  };

  const getTranslationText = (lang: string) => {
    switch (lang) {
      case 'ar':
        return 'ترجمة مدعومة بالذكاء الاصطناعي مع التوطين الثقافي';
      case 'ku':
        return 'وەرگێڕانی پشتگیری کراو بە زیرەکی دەستکرد لەگەڵ خۆماڵیکردنی کولتووری';
      case 'tr':
        return 'Kültürel yerelleştirme ile AI destekli çeviri';
      default:
        return 'AI-powered translation with cultural localization';
    }
  };

  return (
    <div className={`relative ${className}`} dir="ltr">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700">{currentLanguage.nativeName}</span>
        <i className={`ri-arrow-down-s-line text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border z-50 py-2" dir="ltr">
          <div className="px-4 py-2 border-b">
            <h3 className="text-sm font-semibold text-gray-900">{getLanguageText(selectedLanguage)}</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  selectedLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                dir="ltr"
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-gray-500">{language.name}</div>
                </div>
                {selectedLanguage === language.code && (
                  <i className="ri-check-line text-blue-600"></i>
                )}
              </button>
            ))}
          </div>
          
          <div className="px-4 py-2 border-t bg-gray-50">
            <p className="text-xs text-gray-600">
              <i className="ri-translate-2 mr-1"></i>
              {getTranslationText(selectedLanguage)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
