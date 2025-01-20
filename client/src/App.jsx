
import React, { useState, createContext } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import Footer from './components/Footer';

export const ThemeContext = createContext();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const themeContextValue = {
    darkMode,
    toggleDarkMode
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Team />
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
