import React, { useState, useEffect } from "react";
import { Bell, User, Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme(); // Use theme context
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path === '/' ? 'home' : path.substring(1));
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full ${darkMode ? 'bg-secondary/60' : 'bg-primary/60'} backdrop-blur-lg shadow-md z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className={`text-4xl font-extrabold uppercase tracking-wide font-['FoundersGrotesk-Semibold'] ${darkMode ? 'text-primary' : 'text-secondary'}`}>
                EVENTFLOW
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-6  ${darkMode ? 'text-primary' : 'text-secondary'}`}>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-sm font-bold uppercase tracking-wide ${
                  activeTab === link.path.substring(1) ? (darkMode ? 'text-white' : 'text-black') : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* User Actions & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              {darkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-gray-700" />}
            </button>

            {user ? (
              <>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => navigate("/notification")}>
                  <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => navigate("/profile")}>
                  <img className="h-10 w-10 object-cover rounded-full" src={user.profileImage || "https://tse3.mm.bing.net/th?id=OIP.JttmcrrQ9_XqrY60bFEfgQHaHa&pid=Api&P=0&h=180"} alt="User Avatar" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`px-4 py-2 text-sm font-medium transition-colors ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}>
                  Login
                </Link>
                <Link to="/register" className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors`}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md">
              {isMobileMenuOpen ? <X className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-black'}`} /> : <Menu className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-black'}`} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden fixed inset-0 ${darkMode ? 'bg-gray-900' : 'bg-white'} z-50 p-8`}>
              <div className="flex justify-end mb-16">
                <button onClick={() => setIsMobileMenuOpen(false)} className={darkMode ? 'text-white' : 'text-black'}>
                  <X className="h-8 w-8" />
                </button>
              </div>
              <div className="space-y-8">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left text-xl font-bold uppercase ${darkMode ? 'text-white' : 'text-black'}`}
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    navigate("/tickets");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-xl font-bold uppercase underline ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  BUY TICKETS!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
