import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, X, Sun, Moon, CirclePlus, UserRoundPlus } from "lucide-react";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path === "/" ? "home" : path.substring(1));
  }, [location]);

  

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full ${darkMode ? 'bg-secondary/60' : 'bg-primary/60'} backdrop-blur-lg z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className={`text-4xl font-semibold  uppercase tracking-wide font-['FoundersGrotesk-Semibold'] ${darkMode ? 'text-primary' : 'text-black'}`}>
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
                  (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-indigo-600')
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
              className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600" style={{ fill: "rgba(75, 85, 99, 1)" }} />
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
                  <>
                    <button
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => navigate("/notification")}
                    >
                      <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>
                  </>
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
                  className={`px-4 py-2 text-sm font-medium transition-colors ${darkMode ? "text-white hover:text-indigo-400" : "text-gray-700 hover:text-indigo-600"}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition"
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
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-black dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-black dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden`}
      >
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-[#f4f0ff] '} py-4`}>
          {/* User Profile if logged in */}
          {user && (
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3"
                  onClick={() => navigate("/profile")}
                >
                  <img
                    src={user.profileImage || "https://tse3.mm.bing.net/th?id=OIP.JttmcrrQ9_XqrY60bFEfgQHaHa&pid=Api&P=0&h=180"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-xl text-black dark:text-white">
                    <h3 className="font-semibold">{user.username || "User Name"}</h3>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className=" py-1 text-sm font-bold text-black dark:text-white hover:text-white/80 transition-colors flex items-center"
              >
                {link.name}
              </Link>
            ))}

            {!user && (
              <div className=" border-t border-white/10 mt-4 text-black dark:text-white">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mb-2 text-sm text-black dark:text-white font-semibold hover:text-white/80 flex items-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className=" text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
