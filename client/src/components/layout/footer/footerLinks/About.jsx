import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F6F2E8] font-normal">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side Content */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <h1 className="text-[#3A1B0F] text-5xl md:text-6xl lg:text-7xl font-heading leading-tight mb-8">
              SURF & TURF IS A GLOBAL, NATURE-BASED RESTORATION PROGRAM POWERED BY LIVE EVENTS.
            </h1>
            <p className="text-[#3A1B0F] text-xl mb-8">
              Turns out Mother Nature knows best: Three years of research showed that when it comes to helping the planet, backing restoration projects gives us the biggest bang for our buck—outperforming high-tech solutions every time.
            </p>
            <div className="flex items-center mt-12">
              <p className="text-[#3A1B0F] mr-2 font-heading">PRESENTED BY</p>
              <div className="flex items-center">
                <img 
                  src="/path-to-sound-future-logo.svg" 
                  alt="Sound Future Logo" 
                  className="h-12" 
                  // Replace with actual logo or SVG component
                />
                <span className="ml-4 text-[#3A1B0F] font-heading text-lg">
                  SOUND FUTURE
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Side Video Player */}
          <div className="w-full lg:w-1/2 relative">
            <div className="w-full h-0 pb-[75%] relative rounded-lg overflow-hidden">
              <img 
                src="/path-to-landscape-image.jpg" 
                alt="Lush green mountain landscape" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D5D700] hover:bg-[#C0C200] text-[#3A1B0F] rounded-full w-24 h-24 flex items-center justify-center text-lg font-bold transition-all duration-300"
              >
                Play
              </button>
            </div>
          </div>
        </div>
        
        {/* But Why? Section */}
        <div className="mt-24">
          <h2 className="text-[#3A1B0F] text-6xl md:text-7xl lg:text-8xl font-heading leading-none">
            BUT WHY?
          </h2>
        </div>
      </div>
    </div>
  );
};

export default About;