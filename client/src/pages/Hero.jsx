import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import Goals from "../components/subPages/Goals";
import { useTheme } from "../context/ThemeContext/ThemeContext";
import Loader from "../components/Loader.jsx";

const Hero = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    navigate(`/events`);
  };

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Animation Variants - Reduced y distance for mobile
  const textVariants = (delay = 0) => ({
    hidden: { 
      y: window.innerWidth < 640 ? 50 : 100, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: window.innerWidth < 640 ? 0.6 : 0.8, 
        ease: easeOut, 
        delay 
      }
    }
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section
          className={`relative h-screen flex items-start sm:items-center justify-center px-6 transition-all duration-500 ${
            darkMode
              ? "bg-gray-900"
              : "bg-gradient-to-br from-[#C0D0DF] to-[#9CB3D7] text-black"
          }`}
        >
          <div className="container mx-auto text-left max-w-6xl relative pt-20 sm:pt-0">
            
            {/* Date (Aligned to Right, adjusted positioning) */}
            <div className="absolute right-0 top-4 sm:top-8 md:top-10 lg:top-[5%] text-lg sm:text-2xl md:text-3xl text-gray-500 font-arp">
              May 12-15 2035
            </div>

            {/* Heading - Adjusted spacing and positioning */}
            <div className="font-extrabold font-heading text-6xl sm:text-[13rem] md:text-[13rem] lg:text-[11rem] leading-[0.9] sm:-mt-16 md:-mt-16 lg:mt-0 mb-8 sm:mb-12">
              
              <motion.div
                className="mt-0"
                initial="hidden"
                animate="visible"
                variants={textVariants(0)}
              >
                <span className={`font-black ${darkMode ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent" : "text-[bg-secondary]"}`}>
                  PLAN
                </span>
              </motion.div>

              <motion.div
                className="mt-2 sm:mt-0"
                initial="hidden"
                animate="visible"
                variants={textVariants(0.3)}
              >
                <span className={`font-black ${darkMode ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent" : "text-[bg-secondary]"}`}>
                  CONNECT
                </span>
              </motion.div>

              <motion.div
                className="mt-2 sm:mt-0"
                initial="hidden"
                animate="visible"
                variants={textVariants(0.6)}
              >
                <span className={`font-black ${darkMode ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent" : "text-[bg-secondary]"}`}>
                  CELEBRATE
                </span>
              </motion.div>
            </div>

            {/* Location Info - Adjusted spacing */}
            <div className="flex flex-col items-end mt-4 sm:mt-6 text-gray-600 text-lg sm:text-xl md:text-2xl font-semibold">
              PRAVA CENTER, SAN FRANCISCO, CA
              <br />
              IN PERSON & ONLINE
            </div>

            {/* Get Started Button - Fixed mobile styling */}
            <div className="flex justify-start mt-4 sm:mt-4">
              <button
                onClick={handleClick}
                className={`w-full sm:w-44 md:w-48 lg:w-56 py-2 sm:py-3 px-6 sm:px-8 text-base sm:text-lg rounded-full font-bold transition duration-300 ease-in-out font-arp ${
                  darkMode
                    ? "bg-green-700 text-white hover:bg-green-600"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                GET STARTED
              </button>
            </div>

          </div>
        </section>
      )}
      <Goals />
    </>
  );
};

export default Hero;