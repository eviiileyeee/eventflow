import React, { useState, useEffect } from "react";
import { Bell, User, Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import logo from "../assets/1734760408581.jpeg";
import { useTheme } from '../context/ThemeContext/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Update active tab based on location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path === '/about') setActiveTab('about');
    else if (path === '/events') setActiveTab('events');
    else if (path === '/team') setActiveTab('team');
    else if (path === '/contact') setActiveTab('contact');
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    // Removed setIsOpen as it was not defined
  };

  const navLinks = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'About', path: '/about', id: 'about' },
    { name: 'Events', path: '/events', id: 'events' },
    { name: 'Contact', path: '/contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-30 backdrop-blur-md shadow-md dark:bg-gray-800 dark:bg-opacity-30 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-8" src={logo} alt="Logo" />
              <span className="ml-2 text-xl font-bold uppercase tracking-wide text-gray-800 dark:text-white">
                Echelon Dev Society
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { navigate(link.path); }}
                className={`text-sm font-bold uppercase tracking-wide ${
                  activeTab === link.id 
                    ? 'text-blue-500 dark:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right-side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-600" />}
            </button>

            {/* Notification Bell and User Icons */}
            {user ? (
              <>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => { navigate("/notification"); }}
                >
                  <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>

                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => { navigate("/profile"); }}
                >
                  <img className="h-10 w-10 object-cover rounded-full "
                  src={user.profileImage || "https://tse3.mm.bing.net/th?id=OIP.JttmcrrQ9_XqrY60bFEfgQHaHa&pid=Api&P=0&h=180"} alt="User Avatar" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6B85B6] hover:bg-gray-950 dark:bg-[#A7B9D5] dark:hover:bg-[#6B85B6] rounded-full transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 py-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { 
                    navigate(link.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide ${
                    activeTab === link.id 
                      ? 'text-blue-500 dark:text-blue-400 bg-gray-100 dark:bg-gray-700' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              <button
                onClick={toggleDarkMode}
                className="w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun className="text-yellow-500 mr-2" /> : <Moon className="text-gray-600 mr-2" />}
                Theme
              </button>
              
              {user ? (
                <>
                  <button
                    onClick={() => { 
                      navigate("/notification");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Bell className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-300" />
                    Notifications
                  </button>
                  
                  <button
                    onClick={() => { 
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-300" />
                    Profile
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-6 w-6 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;