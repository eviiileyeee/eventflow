import React, { useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleExit = () => {
    setIsVisible(false);
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black px-4 sm:px-6 lg:px-8"
      onClick={handleExit}
    >
      <motion.div
        className="container mx-auto flex flex-col lg:flex-row" 
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Left Section */}
        <motion.div
          className="w-full lg:w-1/2 p-4 text-center lg:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white uppercase mb-6 lg:ml-12"
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-base sm:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 lg:ml-12 mb-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
           At Echelon Dev Society, we believe in the power of hands-on experiences. 
           Through a variety of projects, workshops, and events, we offer members the opportunity
            to enhance their skills, work on real-world challenges, and bring their ideas to life. 
            Our community is diverse, welcoming individuals from all backgrounds and expertise levels,
             from beginners to seasoned professionals.
          </motion.p>
          <motion.div
            className="flex justify-center lg:justify-start lg:ml-12"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <button 
              className="px-6 py-3 text-white bg-[#111418] rounded-lg shadow-lg hover:bg-[#CCE0FF] 
              focus:outline-none focus:ring focus:ring-blue-300"
            > 
              Join Us
            </button>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full lg:w-1/2 p-4 mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut", delay: 2 }}
        >
          {/* Box 1 */}
          <motion.div
            className="box bg-gradient-to-r from-gray-800 to-gray-600 text-white p-4 sm:p-6 rounded-lg flex items-center mb-4 dark:from-gray-900 dark:to-gray-700"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 2 }}
          >
            <div className="circle bg-[#94A8CD] rounded-full h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"></div>
            <div className="content ml-4">
              <h3 className="text-base sm:text-xl font-bold">Creative Coders Workshop</h3>
              <p className="text-sm sm:text-base">Box content goes here. Description or information about this box.</p>
            </div>
          </motion.div>

          {/* Box 2 */}
          <motion.div
            className="box bg-gradient-to-r from-gray-800 to-gray-600 text-white p-4 sm:p-6 rounded-lg flex items-center mb-4 dark:from-gray-900 dark:to-gray-700"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 3 }}
          >
            <div className="circle bg-[#94A8CD] rounded-full h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"></div>
            <div className="content ml-4">
              <h3 className="text-base sm:text-xl font-bold">Innovate Together</h3>
              <p className="text-sm sm:text-base">Box content goes here. Description or information about this box.</p>
            </div>
          </motion.div>

          {/* Box 3 */}
          <motion.div
            className="box bg-gradient-to-r from-gray-800 to-gray-600 text-white p-4 sm:p-6 rounded-lg flex items-center dark:from-gray-900 dark:to-gray-700"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 4 }}
          >
            <div className="circle bg-[#94A8CD] rounded-full h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"></div>
            <div className="content ml-4">
              <h3 className="text-base sm:text-xl font-bold">Code and Create</h3>
              <p className="text-sm sm:text-base">Box content goes here. Description or information about this box.</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;