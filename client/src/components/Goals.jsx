import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, description, image }) => {
  return (
    <div className="bg-gray-800 bg-opacity-75 p-6 rounded-xl flex flex-col items-center max-w-sm mx-auto transform hover:scale-105 transition-transform">
      {/* Image Section */}
      <div className="w-32 h-32 rounded-half overflow-hidden bg-gray-700 flex items-center justify-center mb-6">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      {/* Text Section */}
      <h3 className="text-white text-2xl font-bold mb-3">{title}</h3>
      <p className="text-base text-gray-400 mb-6 text-center">{description}</p>
      {/* Button Section */}
      <button className="px-6 py-3 bg-[#6B85B6] text-white font-semibold rounded-full hover:bg-[#94a8cd] transition">
        View more
      </button>
    </div>
  );
};

const Goals = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    // Initial setup - move title off-screen to the left
    gsap.set(titleRef.current, {
      x: -200,
      opacity: 0
    });

    // Create the animation
    gsap.to(titleRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center px-6 py-12 pt-16"
    >
      <div className="container mx-auto">
        {/* Section Title - Updated with dark text in light mode */}
        <h2
          ref={titleRef}
          className="text-5xl font-bold text-gray-800 dark:text-[#D2D9EF] text-center mb-16 pb-12 uppercase"
        >
          Our Goals
        </h2>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <ProjectCard
            title="Open Source Initiative"
            description="Describe the product here. Include important features, pricing and other relevant info."
            image="https://www.electronicsforu.com/wp-contents/uploads/2021/11/download-98.jpg"
          />
          <ProjectCard
            title="Tech Workshops"
            description="Describe the product here. Include important features, pricing and other relevant info."
            image='https://th.bing.com/th/id/OIP.OVeLai0N0LCeDmds0PG-JgHaE7?rs=1&pid=ImgDetMain'
          />
          <ProjectCard
            title="Hackathon Series"
            description="Describe the product here. Include important features, pricing and other relevant info."
            image="https://static.vecteezy.com/system/resources/previews/003/216/641/non_2x/hackathon-technology-concept-with-team-working-together-on-programming-free-vector.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default Goals;