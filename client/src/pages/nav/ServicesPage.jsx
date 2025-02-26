import React from 'react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import ServiceSlider from '../../components/ui/ServiceSlider';

const slides = [
  {
    id: 1,
    title: "Ethereal Experiences",
    description: "Immersive event experiences that transcend the ordinary",
    image: "https://plus.unsplash.com/premium_photo-1739502183175-e50a4c5e3c27?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "VIRTUAL EVENTS"
  },
  {
    id: 2,
    title: "Hackwave",
    description: "This event brings together the brightest minds in IT for a thrilling 48-hour innovation marathon. Participants collaborate, code, and create cutting-edge solutions, guided by experienced mentors",
    image: "https://images.unsplash.com/photo-1738463791783-b61514add113?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "HACKATHONS"
  },
  {
    id: 3,
    title: "Innovate and Create",
    description: "Dive into the world of innovation with experienced mentors guiding you to transform ideas into reality. Collaborate, code, and create groundbreaking solutions in just 48 hours.",
    image: "https://plus.unsplash.com/premium_photo-1666726721652-a15e685e48a0?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "WORKSHOPS"
  },
  {
    id: 4,
    title: "Technical Excellence",
    description: "State-of-the-art production and technical solutions",
    image: "https://images.unsplash.com/photo-1739382445475-1cc4fcedff2c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "DESIGN"
  }
];

const ServicesPage = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`fixed inset-0 w-full h-screen overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-gray-300' 
        : 'bg-gradient-to-br from-[#C0D0DF] to-[#9CB3D7] text-black'
    }`}>
      {/* Theme Toggle Button */}
      {/* <button
        onClick={toggleTheme}
        className={`fixed top-8 right-8 p-3 rounded-full transition-colors ${
          darkMode 
            ? 'bg-white text-gray-800 hover:bg-white/80' 
            : 'bg-gray-800 text-white hover:bg-gray-800/80'
        }`}
      >
        {darkMode ? '☀️' : '🌙'}
      </button> */}

      <ServiceSlider slides={slides} isDarkMode={darkMode} />
    </div>
  );
};

export default ServicesPage;