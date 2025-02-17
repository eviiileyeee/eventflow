import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceSlider = ({ slides, isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault(); // Prevent default scrolling

      if (isScrolling.current) return; // Prevent multiple rapid transitions
      isScrolling.current = true;

      const scrollThreshold = 50; // Faster response to scroll
      if (Math.abs(e.deltaY) < scrollThreshold) {
        isScrolling.current = false;
        return; // Ignore small scroll movements
      }

      const direction = e.deltaY > 0 ? 1 : -1; // Determine scroll direction

      setActiveIndex((prev) => {
        const nextIndex = prev + direction;
        if (nextIndex < 0) return 0;
        if (nextIndex >= slides.length) return slides.length - 1;
        return nextIndex;
      });

      setTimeout(() => {
        isScrolling.current = false; // Reset scrolling lock
      }, 400); // Reduced delay for quicker response
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [slides.length]);

  return (
    <div id='services' className="relative w-full h-full flex items-center justify-center font-['FoundersGrotesk-Semibold']">
      {/* Progress bar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-12 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? (isDarkMode ? 'bg-white' : 'bg-gray-800')
                : (isDarkMode ? 'bg-white/30' : 'bg-gray-800/30')
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto flex">
        {/* Left side - Image */}
        <div className="w-2/3 relative h-[500px] mt-20">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) =>
              index === activeIndex ? (
                <motion.div
                  key={slide.id}
                  initial={{ rotateX: 20, y: 60, opacity: 0, scale: 0.95 }}
                  animate={{ rotateX: 0, y: 0, opacity: 1, scale: 1 }}
                  exit={{ rotateX: -20, y: -60, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.9, ease: "easeOut" }} // Faster & snappier animation
                  className="absolute w-full"
                >
                  <div className="rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white/80 text-4xl uppercase tracking-wider mb-2">
                        {slide.category}
                      </p>
                      <h3 className="text-white text-3xl font-bold">{slide.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Content */}
        <div className="w-1/3 pl-16 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[activeIndex].id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.9, ease: "easeOut" }} // Snappier transition
              className="space-y-8"
            >
              <div className="space-y-6">
                <p className="text-lg font-light">
                  {`${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`}
                </p>
                <h2 className="text-5xl font-bold">{slides[activeIndex].title}</h2>
                <p className="text-lg">{slides[activeIndex].description}</p>
              </div>
              <button className={`px-8 py-3 rounded-full transition-colors text-xl ${
                isDarkMode 
                  ? 'bg-white text-gray-800 hover:bg-white/80' 
                  : 'bg-gray-800 text-white hover:bg-gray-800/80'
              }`}>
                Learn More
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
