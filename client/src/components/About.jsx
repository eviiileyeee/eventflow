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
      className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6"
      onClick={handleExit} // Trigger exit animation on click (optional)
    >
      <motion.div
        className="container mx-auto px-6 flex" // Added flex here
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 50 }} // Exit with fade-out and slide down
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Existing Section */}
        <motion.div
          className="w-1/2 p-4"
          initial={{ opacity: 0, x: -100 }} // Start from the left
          animate={{ opacity: 1, x: 0 }}    // Animate to the normal position
          exit={{ opacity: 0, y: 20 }}      // Fade-out and slide slightly down on exit
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl font-bold h-40 w-60 text-left mb-8 text-gray-900 dark:text-white uppercase flex items-center justify-start ml-12 pl-6 pt-16"
            initial={{ opacity: 0, x: -100 }} // Start from the left
            animate={{ opacity: 1, x: 0 }}    // Animate to the normal position
            exit={{ opacity: 0, y: 20 }}      // Fade-out and slide slightly down on exit
            transition={{ duration: 1, ease: "easeOut" }}
          >
            About Us
          </motion.h2>

          <motion.p
            className="text-gray-500 h-80 w-80 pb-20 dark:text-gray-600 max-w-3xl mx-auto text-left pl-8 ml-[39px] text-2xl  -translate-y-14"
            initial={{ opacity: 0, x: -100 }} // Start from the left
            animate={{ opacity: 1, x: 0 }}    // Animate to its normal position
            exit={{ opacity: 0, y: 30 }}      // Exit with fade-out and slide up
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Echelon Dev Society is a community of passionate developers, designers,
            and tech enthusiasts. We foster innovation, collaboration, and
            continuous learning through projects, workshops, and events.
          </motion.p>
          <motion.div
            className="flex justify-start mt-8 ml-[120px] -translate-y-14"
            initial={{ opacity: 0, x: -100 }} // Start from the left
            animate={{ opacity: 1, x: 0 }}    // Animate to the normal position
            exit={{ opacity: 0, y: 20 }}      // Fade-out and slide slightly down on exit
            transition={{ duration: 1, ease: "easeOut" }} // Same transition as "About Us"
          >
            <button className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
              Join Us
            </button>
          </motion.div>
        </motion.div>

        {/* New Section */}
        <motion.div
          className="w-1/2 p-4 flex flex-col justify-center items-start" // Added flex and flex-col here
          initial={{ opacity: 0, x: 100 }} // Start from the right
          animate={{ opacity: 1, x: 0 }}    // Animate to the normal position
          exit={{ opacity: 0, y: 20 }}      // Fade-out and slide slightly down on exit
          transition={{ duration: 1, ease: "easeOut", delay: 2 }} // Delay to synchronize with the old section
        >
          {/* Box 1 */}
          <motion.div
            className="box bg-gray-800 text-white p-6 rounded-lg flex items-center mb-4"
            initial={{ opacity: 0, x: -100 }} // Start from the left
            animate={{ opacity: 1, x: 0 }}    // Animate to the normal position
            exit={{ opacity: 0, y: 50 }}      // Exit with fade-out and slide down
            transition={{ duration: 0.5, ease: "easeOut", delay: 2 }} // Delay to synchronize with the old section
          >
            <div className="circle bg-blue-900 rounded-full h-12 w-12 flex-shrink-0"></div>
            <div className="content ml-4">
              <h3 className="text-xl font-bold">Creative Coders Workshop</h3>
              <p>Box content goes here. Description or information about this box.</p>
            </div>
          </motion.div>

          {/* Box 2 */}
          <motion.div
            className="box bg-gray-800 text-white p-6 rounded-lg flex items-center mb-4"
            initial={{ opacity: 0, x: -100 }} // Start from the left with a delay
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 50 }}      // Exit with fade-out and slide down
            transition={{ duration: 0.5, ease: "easeOut", delay: 3 }} // Delay to synchronize with the old section
          >
            <div className="circle bg-blue-900 rounded-full h-12 w-12 flex-shrink-0"></div>
            <div className="content ml-4">
              <h3 className="text-xl font-bold">Innovate Together</h3>
              <p>Box content goes here. Description or information about this box.</p>
            </div>
          </motion.div>

          {/* Box 3 */}
          <motion.div
            className="box bg-gray-800 text-white p-6 rounded-lg flex items-center"
            initial={{ opacity: 0, x: -100 }} // Start from the left with a delay
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 50 }}      // Exit with fade-out and slide down
            transition={{ duration: 0.5, ease: "easeOut", delay: 4 }} // Delay to synchronize with the old section
          >
            <div className="circle bg-blue-900 rounded-full h-12 w-12 flex-shrink-0"></div>
            <div className="content ml-4">
              <h3 className="text-xl font-bold">Code and Create</h3>
              <p>Box content goes here. Description or information about this box.</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
