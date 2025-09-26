
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// User credentials database - Updated to remove Sarah Al-Rashid
const userCredentials = {
  'investor@terravista.com': {
    password: 'investor123',
    name: 'Ahmed Hassan',
    role: 'Investor'
  },
  'buyer@terravista.com': {
    password: 'buyer123',
    name: 'Ahmed Hassan',
    role: 'Buyer'
  },
  'seller@terravista.com': {
    password: 'seller123',
    name: 'Fatima Al-Zahra',
    role: 'Seller'
  },
  'agency@terravista.com': {
    password: 'agency123',
    name: 'Dubai Properties LLC',
    role: 'Real Estate Agency'
  }
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const user = userCredentials[formData.email as keyof typeof userCredentials];
      
      if (!user) {
        setError('Email address not found. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      if (user.password !== formData.password) {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        return;
      }

      // Store user data in localStorage for the session
      localStorage.setItem('currentUser', JSON.stringify({
        email: formData.email,
        role: user.role,
        name: user.name
      }));

      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <i className="ri-building-line text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{fontFamily: 'Pacifico, serif'}}>TerraVista</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-sm font-bold text-blue-800 mb-3">Demo Login Credentials:</h3>
            <div className="text-xs text-blue-700 space-y-2">
              <div><strong>Investor:</strong> investor@terravista.com / investor123 → Ahmed Hassan</div>
              <div><strong>Buyer:</strong> buyer@terravista.com / buyer123 → Ahmed Hassan</div>
              <div><strong>Seller:</strong> seller@terravista.com / seller123 → Fatima Al-Zahra</div>
              <div><strong>Agency:</strong> agency@terravista.com / agency123 → Dubai Properties LLC</div>
            </div>
          </div>

          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <i className="ri-error-warning-line text-red-500"></i>
                    <span className="text-sm text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-blue-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-3 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all font-medium whitespace-nowrap disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <i className="ri-google-fill text-red-500 text-lg"></i>
                  </button>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <i className="ri-linkedin-fill text-blue-600 text-lg"></i>
                  </button>
                </div>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover object-top"
          src="https://readdy.ai/api/search-image?query=modern%20luxury%20real%20estate%20office%20with%20floor%20to%20ceiling%20windows%20showing%20city%20skyline%20professional%20workspace%20elegant%20interior%20design%20natural%20lighting&width=800&height=1000&seq=4&orientation=portrait"
          alt="Real Estate Office"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-white text-2xl font-bold mb-2">
            Join the future of real estate
          </h3>
          <p className="text-white/90 text-lg">
            Access AI-powered insights, analytics, and tools that transform how you work with properties.
          </p>
        </div>
      </div>
    </div>
  );
}
