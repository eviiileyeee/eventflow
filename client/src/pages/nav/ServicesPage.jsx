import React from 'react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

const ServicesPage = () => {
  const { darkMode } = useTheme();

  const services = [
    {
      id: 1,
      title: "Virtual Events",
      description: "Experience virtual events like never before.",
      image: "/images/Virtual_events.png",
      icon: "🤖", // Document icon
      size: "small"
    },
    {
      id: 2,
      title: "The Digital Revolution",
      description: "Dive into the transformative power of technology.",
      image: "/images/Digital_rev.png",
      icon: "💻", // Computer icon
      size: "small"
    },
    {
      id: 3,
      title: "Hackathons",
      description: "Unleash your creativity and innovation.",
      image: "/images/Hackathons.jpg",
      icon: "🖌️", // Design icon
      size: "small"
    },
    {
      id: 4,
      title: "Workshops",
      description: "Engage in insightful discussions and learn from experts.",
      image: "/images/Workshops.png",
      icon: "📊", // Presentation icon
      size: "large"
    },
    {
      id: 5,
      title: "Award Ceremonies",
      description: "Recognize and celebrate outstanding achievements.",
      image: "/images/Award_cer.png",
      icon: "🔍", // Search icon
      size: "medium"
    },
    {
      id: 6,
      title: "Sustainable Innovation",
      description: "Discover eco-friendly approaches to technological advancement.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: "🌱", // Plant icon
      size: "medium"
    },
    {
      id: 7,
      title: "Future of AI",
      description: "Explore the ethical implications and potential of artificial intelligence.",
      image: "https://images.unsplash.com/photo-1677442135132-fd3b4981ed00?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: "🤖", // Robot icon
      size: "large"
    },
    {
      id: 8,
      title: "Creative Thinking",
      description: "Learn how to harness creativity for problem-solving and innovation.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: "💡", // Lightbulb icon
      size: "small"
    }
  ];

  // Function to render service cards with different sizes and responsive layouts
  const renderServiceCard = (service) => {
    // Dynamic class for different card sizes based on screen size
    const sizeClass = service.size === "large" 
      ? "col-span-1 sm:col-span-2" 
      : "col-span-1";

    return (
      <div key={service.id} className={`${sizeClass} border border-gray-600 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden transition duration-300 hover:shadow-lg`}>
        {/* Card container with black background */}
        <div className="dark:bg-gray-900 bg-gray-100 flex flex-col h-full transition duration-300 ease-in-out">
          {/* Image Container - Added padding */}
          <div className="w-full overflow-hidden p-3 pt-3 pb-0">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-32 sm:h-40 lg:h-48 object-cover transition duration-300 transform hover:scale-105 rounded-lg"
            />
          </div>
          
          {/* Content Container - Added hover effect to move content right */}
          <div className="p-3 sm:p-4 lg:p-6 flex flex-col group hover:cursor-pointer">
            <div className="flex items-start mb-1 sm:mb-2 transition-transform duration-300 group-hover:translate-x-2">
              <span className="text-lg sm:text-xl text-white mr-2">{service.icon}</span>
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-black dark:text-white mb-1 transition-transform duration-300 group-hover:translate-x-2">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:translate-x-2">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-gray-300' 
        : 'bg-gradient-to-br from-white via-gray-100 to-[#f1f2f4] text-black'
    }`}>
      {/* Main Content - Added top padding for navbar clearance */}
      <div className="container mx-auto px-2 sm:px-3 lg:px-4 py-4 sm:py-6 lg:py-8 pt-16 sm:pt-20 lg:pt-24">
        {/* Section Title */}
        <div className="mb-6 sm:mb-8 lg:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Our Services</h2>
          <p className="mt-2 text-sm sm:text-base opacity-80">Discover how we can help you innovate and grow</p>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {services.map(service => renderServiceCard(service))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;