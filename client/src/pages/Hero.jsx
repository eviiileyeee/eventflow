import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import Goals from "../components/Goals";
import Team from "../components/Team";
import { useTheme } from "../context/ThemeContext/ThemeContext";
import Background from "../components/Background";

const Hero = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleClick = () => {
    navigate(`/events`);
  };

  // Create separate variants for each word to control timing individually
  const planVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      }
    }
  };

  const connectVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.3 // Delay after PLAN
      }
    }
  };

  const celebrateVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.9 // Longer delay after CONNECT
      }
    }
  };

  return (
    <>
      <section
        className={`relative h-screen flex items-center justify-center px-6 transition-all duration-500 ${
          darkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-[#C0D0DF] to-[#9CB3D7] text-black"
        }`}
      >
        
       
    
        <div className="container mx-auto text-left max-w-6xl">
          <div className="leading-[9rem] font-extrabold text-[12rem] font-heading">
            <div className="relative flex items-center">
              <motion.span
                className={`font-black ${
                  darkMode
                    ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent"
                    : "text-[bg-secondary]"
                }`}
                style={{ letterSpacing: "-0.0001em" }}
                initial="hidden"
                animate="visible"
                variants={planVariants}
              >
                PLAN
              </motion.span>
            </div>

            <div className="relative flex items-center">
              <div className="text-2xl mt-14 pt-10 text-gray-500 mb-4 font-arp">
                May 12-15 2035
              </div>
              <motion.span
                className={`font-black ${
                  darkMode
                    ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent"
                    : "text-[bg-secondary]"
                }`}
                style={{ letterSpacing: "-0.0001em", paddingLeft: "40px", marginLeft: "80px" }}
                initial="hidden"
                animate="visible"
                variants={connectVariants}
              >
                CONNECT
              </motion.span>
            </div>

            <div>
              <motion.span
                className={`font-black ${
                  darkMode
                    ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent"
                    : "text-[bg-secondary]"
                }`}
                style={{ letterSpacing: "-0.0001em" }}
                initial="hidden"
                animate="visible"
                variants={celebrateVariants}
              >
                CELEBRATE
              </motion.span>
            </div>
          </div>

          <div className="flex flex-col items-end mt-auto text-gray-600 text-xl font-semibold max-w-xl mb-8 pt-10 ml-auto">
            PRAVA CENTER, SAN FRANCISCO, CA
            <br />
            IN PERSON & ONLINE
          </div>

          <button
            onClick={handleClick}
            className={`py-3 px-8 text-lg rounded-full font-bold transition duration-300 ease-in-out font-arp ${
              darkMode
                ? "bg-green-700 text-white hover:bg-green-600"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            GET STARTED
          </button>
        </div>
      </section>

      <Goals />   
       </>
  );
};

export default Hero;