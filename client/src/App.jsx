import React, { useState, createContext } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Footer from "./components/Footer";

// Create ThemeContext for light/dark mode toggling
export const ThemeContext = createContext();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode state
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    // Update the root HTML element with the dark class
    const htmlElement = document.documentElement;
    if (!darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
