import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  UserCircle,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3); // Example notification count

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-8"
                src="/api/placeholder/32/32"
                alt="Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                Echelon Dev
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
              Home
            </a>
            <a href="/events" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
              Events
            </a>
            <a href="/contact" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
              Contact
            </a>
            <a href="/about" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
              About Us
            </a>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    View Profile
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </a>
                  <button
                    onClick={() => console.log('Logout clicked')}
                    className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Home
            </a>
            <a
              href="/events"
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Events
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Contact
            </a>
            <a
              href="/about"
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              About Us
            </a>
            <div className="flex items-center space-x-4 px-3 py-2">
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button
                onClick={toggleProfile}
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;