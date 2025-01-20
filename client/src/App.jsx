import React, { useState, createContext, useContext } from 'react';
import { Sun, Moon, Github, Linkedin, Twitter } from 'lucide-react';
import "./index.css"
// Theme Context
const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Navigation Component
const Navigation = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  
  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/api/placeholder/40/40" alt="Logo" className="h-10" />
            <span className="ml-2 text-xl font-bold">Echelon Dev</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#team">Team</NavLink>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

// Hero Section Component
const Hero = () => (
  <section className="pt-24 pb-12 px-6">
    <div className="container mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6">
        Where Innovation Meets Community
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Join a thriving community of developers building the future together
      </p>
      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Join Us
      </button>
    </div>
  </section>
);

// About Section Component
const About = () => (
  <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center">
        Echelon Dev Society is a community of passionate developers, designers, and tech enthusiasts. 
        We foster innovation, collaboration, and continuous learning through projects, workshops, and events.
      </p>
    </div>
  </section>
);

// Projects Section Component
const Projects = () => (
  <section id="projects" className="py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Our Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard 
          title="Open Source Initiative"
          description="Contributing to various open-source projects to improve the developer ecosystem."
        />
        <ProjectCard 
          title="Tech Workshops"
          description="Regular workshops on emerging technologies and best practices."
        />
        <ProjectCard 
          title="Hackathon Series"
          description="Quarterly hackathons focusing on solving real-world problems."
        />
      </div>
    </div>
  </section>
);

// Team Section Component
const Team = () => (
  <section id="team" className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <TeamMember 
          name="Alex Chen"
          role="Founder"
          image="/api/placeholder/96/96"
        />
        <TeamMember 
          name="Sarah Johnson"
          role="Tech Lead"
          image="/api/placeholder/96/96"
        />
        <TeamMember 
          name="Michael Lee"
          role="Community Manager"
          image="/api/placeholder/96/96"
        />
        <TeamMember 
          name="Emma Wilson"
          role="Events Coordinator"
          image="/api/placeholder/96/96"
        />
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <img src="/api/placeholder/40/40" alt="Logo" className="h-10 mb-4" />
          <p className="text-gray-400">Building the future together</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-500 transition-colors">
            <Github size={24} />
          </a>
          <a href="#" className="hover:text-blue-500 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" className="hover:text-blue-500 transition-colors">
            <Twitter size={24} />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        <p>&copy; 2025 Echelon Dev Society. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Reusable Components
const NavLink = ({ href, children }) => (
  <a href={href} className="hover:text-blue-500 transition-colors">
    {children}
  </a>
);

const TeamMember = ({ name, role, image }) => (
  <div className="flex flex-col items-center p-4">
    <img src={image} alt={name} className="w-24 h-24 rounded-full mb-2" />
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-gray-600 dark:text-gray-400">{role}</p>
  </div>
);

const ProjectCard = ({ title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

// Main App Component
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Navigation />
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