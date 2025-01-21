import React, { useState, createContext, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor"; // Import the Cursor component

// Create ThemeContext for light/dark mode toggling
export const ThemeContext = createContext();

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Toggle dark mode state
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Apply the dark mode class to the root element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div id="main" className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Cursor /> {/* Add the Cursor component */}
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Team />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
