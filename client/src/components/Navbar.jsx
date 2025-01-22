import React, { useState } from "react";
import { Bell, User, Menu, X, Sun, Moon } from "lucide-react";
import logo from "../assets/1734760408581.jpeg";
import { useTheme } from '../components/ThemeContext/ThemeContext';
import { useNavigate } from "react-router-dom";




const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About Us" },
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
                key={link.label}
                onClick={()=>{navigate(link.href)}}
                className="text-sm font-bold uppercase tracking-wide text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              >
                {link.label}
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

            {/* Notification Bell */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => { navigate("/notification"); }}
              >
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => { navigate("/profile"); }}
              >
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
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
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleDarkMode}
              className=" p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex ">
                {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-600" />}
                <p className="px-1 py-1 rounded-md text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >Theme</p>
              </div>
            </button>
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex">
                  <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  <p className="px-1 py-1 rounded-md text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >Notifications</p>
                </div>
              </button>
            </div>
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => { navigate("/profile"); }}
              >
                <div className="flex">
                  <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  <p className="px-1 py-1 rounded-md text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >Profile</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


/*
  const [isProfileOpen, setIsProfileOpen] = useState(false);

 const profileMenuItems = [
    { icon: <User size={16} />, label: "Profile", action: () => {  } },
    { icon: <Settings size={16} />, label: "Settings", action: () => { } },
    { icon: <LogOut size={16} />, label: "Logout", action: () => { } },
  ];

           ----------------------- Profile Dropdown ------------------------------


                onClick={() => setIsProfileOpen(!isProfileOpen)}

{isProfileOpen && (
  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
    {profileMenuItems.map((item, index) => (
      <button
        key={index}
        onClick={item.action}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {item.icon}
        <span className="ml-2">{item.label}</span>
      </button>
    ))}
  </div>
)}*/