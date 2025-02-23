import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext/ThemeContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, User, Menu, X, Sun, Moon, CirclePlus, UserRoundPlus } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path === "/" ? "home" : path.substring(1));
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full ${darkMode ? 'bg-secondary/60' : 'bg-primary/60'} backdrop-blur-lg z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className={`text-4xl font-extrabold uppercase tracking-wide font-['FoundersGrotesk-Semibold'] ${darkMode ? 'text-primary' : 'text-black'}`}>
                EVENTFLOW
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wide ${activeTab === link.path.substring(1) ?
                  (darkMode ? 'text-white' : 'text-black') :
                  (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Actions & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-700" />
              )}
            </button>
            {user ? (
              <>
                {activeTab === "events" ? (
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => navigate("/create")}
                  >
                    <CirclePlus className="h-6 w-6 text-purple-800 dark:text-gray-300" />
                  </button>
                ) : activeTab === "contact" ? (
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => navigate("/search")}
                  >
                    <UserRoundPlus className="h-6 w-6 text-purple-800 dark:text-gray-300" />
                  </button>
                ) : (
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => navigate("/notification")}
                  >
                    <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </button>
                )}

                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => navigate("/profile")}
                >
                  <img
                    className="h-10 w-10 object-cover rounded-full border-2 border-indigo-800"
                    src={user.profileImage || "https://tse3.mm.bing.net/th?id=OIP.JttmcrrQ9_XqrY60bFEfgQHaHa&pid=Api&P=0&h=180"}
                    alt="User Avatar"
                  />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium transition-colors ${darkMode ? "text-white hover:text-blue-400" : "text-gray-700 hover:text-blue-600"}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md transition"
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${darkMode ? "text-white" : "text-black"}`} />
              ) : (
                <Menu className={`h-6 w-6 ${darkMode ? "text-white" : "text-black"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm transition-transform transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <div className={`p-6 w-64 bg-white dark:bg-gray-900 h-full`}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold uppercase text-gray-800 dark:text-white">
              Menu
            </h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <X className="h-8 w-8 text-gray-800 dark:text-white" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-semibold text-gray-800 dark:text-white hover:underline"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/tickets"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              BUY TICKETS!
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
