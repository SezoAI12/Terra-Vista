
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MultilingualSupport from '../ai/MultilingualSupport';

interface NavbarProps {
  userRole?: string;
  userName?: string;
}

interface Notification {
  id: number;
  type: 'property_match' | 'price_drop' | 'market_update' | 'saved_search' | 'appointment';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  icon: string;
  color: string;
}

export default function Navbar({ userRole, userName }: NavbarProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState<{email: string, role: string, name: string} | null>(null);

  // Load user data from localStorage on component mount and set up listener
  useEffect(() => {
    const loadUserData = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
      } else {
        setCurrentUser(null);
      }
    };

    // Load initially
    loadUserData();

    // Set up storage listener for changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser') {
        loadUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for same-tab changes
    const interval = setInterval(loadUserData, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Use localStorage data first, then fallback to props
  const displayUserRole = currentUser?.role || userRole;
  const displayUserName = currentUser?.name || userName;
  const isLoggedIn = Boolean(currentUser?.email);

  const navigationItems = [
    { name: 'Home', href: '/', icon: 'ri-home-4-line' },
    { name: 'Marketplace Hub', href: '/marketplace', icon: 'ri-store-3-line' },
    { name: 'Investment Hub', href: '/investments', icon: 'ri-line-chart-line' },
    { name: 'About', href: '/about', icon: 'ri-information-line' },
    { name: 'Blog', href: '/blog', icon: 'ri-article-line' },
    { name: 'Contact', href: '/contact', icon: 'ri-customer-service-2-line' }
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'property_match',
      title: 'New Property Match',
      message: 'Luxury penthouse in Dubai Marina matches your criteria',
      timestamp: '2 minutes ago',
      isRead: false,
      icon: 'ri-home-line',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'price_drop',
      title: 'Price Drop Alert',
      message: 'Property in Downtown Dubai reduced by 8% (AED 950K)',
      timestamp: '15 minutes ago',
      isRead: false,
      icon: 'ri-arrow-down-circle-line',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'market_update',
      title: 'Market Update',
      message: 'Dubai Marina showing 12% growth - AI recommends action',
      timestamp: '1 hour ago',
      isRead: false,
      icon: 'ri-trending-up-line',
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'saved_search',
      title: 'Saved Search Results',
      message: '5 new properties match your "Beachfront Villa" search',
      timestamp: '2 hours ago',
      isRead: true,
      icon: 'ri-search-line',
      color: 'text-orange-600'
    },
    {
      id: 5,
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Property viewing tomorrow at 2:00 PM - Palm Jumeirah Villa',
      timestamp: '3 hours ago',
      isRead: true,
      icon: 'ri-calendar-line',
      color: 'text-red-600'
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = navigationItems;

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
    setShowUserMenu(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu') && !target.closest('.notifications-menu')) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-4 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <i className="ri-building-4-line text-white text-lg sm:text-2xl group-hover:scale-110 transition-transform"></i>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent" style={{fontFamily: 'Pacifico, serif'}}>
                TerraVista
              </span>
              <div className="text-xs text-gray-500 -mt-1 hidden lg:block">AI Real Estate Platform</div>
            </div>
            <div className="sm:hidden">
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent" style={{fontFamily: 'Pacifico, serif'}}>
                TerraVista
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link flex items-center space-x-2"
                  onClick={(e) => {
                    if (item.href.startsWith('/')) {
                      e.preventDefault();
                      navigate(item.href);
                    }
                  }}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="hidden xl:inline">{item.name}</span>
                </a>
              ))}
            </div>
            
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-ghost"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="btn-primary"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 xl:space-x-6">
                <div className="hidden xl:block">
                  <MultilingualSupport />
                </div>
                
                {/* Notifications */}
                <div className="relative notifications-menu">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-gray-50 touch-button"
                  >
                    <i className="ri-notification-3-line text-xl"></i>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900">Notifications</h3>
                          <div className="flex items-center space-x-2">
                            {unreadCount > 0 && (
                              <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                                {unreadCount} new
                              </span>
                            )}
                            <button
                              onClick={() => setShowNotifications(false)}
                              className="p-1 hover:bg-gray-200 rounded-md touch-button"
                            >
                              <i className="ri-close-line text-gray-500"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto mobile-scroll">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                              !notification.isRead ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                !notification.isRead ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                <i className={`${notification.icon} ${notification.color} text-lg`}></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {notification.timestamp}
                                </p>
                              </div>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex flex-col sm:flex-row justify-between gap-2">
                          <button 
                            onClick={() => {
                              navigate('/alerts');
                              setShowNotifications(false);
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View All Notifications
                          </button>
                          <button 
                            onClick={() => {
                              navigate('/profile?tab=notifications');
                              setShowNotifications(false);
                            }}
                            className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                          >
                            Manage Notifications
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative user-menu">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group hover:scale-105 transition-transform duration-300 touch-button"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs sm:text-sm font-bold">
                        {displayUserName?.split(' ').map(n => n[0]).join('') || 'U'}
                      </span>
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-semibold text-gray-900 truncate max-w-24 lg:max-w-none">{displayUserName || 'User'}</div>
                      <div className="text-xs text-gray-500 truncate max-w-24 lg:max-w-none">{displayUserRole || 'Account'}</div>
                    </div>
                    <i className="ri-arrow-down-s-line text-gray-500 group-hover:text-blue-600 transition-colors hidden sm:block"></i>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-4 w-56 sm:w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 backdrop-blur-lg">
                      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{displayUserName || 'User'}</p>
                        <p className="text-xs text-gray-600 truncate">{displayUserRole || 'Account'} Account</p>
                      </div>
                      <div className="py-2">
                        <a 
                          href="/profile" 
                          className="flex items-center px-4 sm:px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/profile');
                            setShowUserMenu(false);
                          }}
                        >
                          <i className="ri-user-line mr-3"></i>
                          Profile Settings
                        </a>
                        <a 
                          href="/profile?tab=billing" 
                          className="flex items-center px-4 sm:px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/profile?tab=billing');
                            setShowUserMenu(false);
                          }}
                        >
                          <i className="ri-bank-card-line mr-3"></i>
                          Billing & Plans
                        </a>
                        <a 
                          href="/profile?tab=help" 
                          className="flex items-center px-4 sm:px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/profile?tab=help');
                            setShowUserMenu(false);
                          }}
                        >
                          <i className="ri-question-line mr-3"></i>
                          Help Center
                        </a>
                        <div className="block xl:hidden px-4 sm:px-6 py-3">
                          <MultilingualSupport />
                        </div>
                      </div>
                      <div className="border-t border-gray-100 py-2">
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 sm:px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <i className="ri-logout-box-line mr-3"></i>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer touch-button"
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg mobile-safe-area">
            <div className="py-4 sm:py-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-item"
                  onClick={(e) => {
                    if (item.href.startsWith('/')) {
                      e.preventDefault();
                      navigate(item.href);
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span>{item.name}</span>
                </a>
              ))}
              
              {!isLoggedIn ? (
                <div className="px-4 pt-4 space-y-3 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-700 hover:text-blue-600 py-3 font-medium cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all whitespace-nowrap cursor-pointer font-semibold"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <div className="px-4 pt-4 border-t border-gray-100">
                  <div className="xl:hidden mb-4">
                    <MultilingualSupport />
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {displayUserName?.split(' ').map(n => n[0]).join('') || 'U'}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{displayUserName || 'User'}</div>
                      <div className="text-xs text-gray-500">{displayUserRole || 'Account'}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium cursor-pointer"
                    >
                      <i className="ri-user-line mr-3"></i>
                      Profile Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left text-red-600 hover:text-red-700 py-2 font-medium cursor-pointer"
                    >
                      <i className="ri-logout-box-line mr-3"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
