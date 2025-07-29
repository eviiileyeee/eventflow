import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../../../context/ThemeContext/ThemeContext';

const About = () => {
  const [mounted, setMounted] = useState(false);
    const { darkMode } = useTheme();
  
  // Create refs for the elements we want to animate on scroll
  const headerRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const statsRef = React.useRef(null);
  
  // Check if elements are in view
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Component mounted check
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`min-h-screen font-normal transition-colors duration-300" ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-[#f4f0ff] to-white text-black"}`}>
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            ref={headerRef}
            className="w-full lg:w-1/2 pr-0 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-indigo-600 dark:text-indigo-500 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 uppercase"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              About
            </motion.h1>
            <motion.h2 
              className="bg-gradient-to-b from-gray-700 to-gray-900 dark:from-gray-400 dark:to-gray-600 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8 uppercase"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Smart Event Management for a Connected World.
            </motion.h2>
            <motion.p 
              className="text-gray-800 dark:text-gray-400 text-xl mb-8 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Turns out seamless planning makes all the difference: Years of experience have shown that when it comes to hosting successful events, smart event management delivers the biggest impact—outperforming traditional methods every time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Learn More
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Side Video Player */}
          <motion.div 
            ref={contentRef}
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-0 pb-[75%] relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/images/Virtual_events.png" 
                alt="Virtual event with participants" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <motion.button 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full w-24 h-24 flex items-center justify-center text-lg font-bold transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={contentInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                Play
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Additional Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-4">500+</h3>
            <p className="text-gray-700 dark:text-gray-300">Successful Events</p>
          </div>
          <div className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">98%</h3>
            <p className="text-gray-700 dark:text-gray-300">Client Satisfaction</p>
          </div>
          <div className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">30+</h3>
            <p className="text-gray-700 dark:text-gray-300">Countries Served</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;