import React from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

// Auth context for protected routes
const AuthContext = React.createContext(null);

// Auth Provider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Login Page Component
const LoginPage = () => {
  const { login } = React.useContext(AuthContext);
  
  const handleLogin = (e) => {
    e.preventDefault();
    login();
    // Redirect to dashboard or intended page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Dashboard Layout Component
const DashboardLayout = ({ children }) => (
  <div>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </div>
);

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <DashboardLayout>
              <LandingPage />
            </DashboardLayout>
          } />
          
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Add more routes as needed */}
          <Route path="/events" element={
            <DashboardLayout>
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Events</h1>
                {/* Events content */}
              </div>
            </DashboardLayout>
          } />

          <Route path="/about" element={
            <DashboardLayout>
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">About Us</h1>
                {/* About content */}
              </div>
            </DashboardLayout>
          } />

          {/* 404 route */}
          <Route path="*" element={
            <DashboardLayout>
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">Page not found</p>
                </div>
              </div>
            </DashboardLayout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;