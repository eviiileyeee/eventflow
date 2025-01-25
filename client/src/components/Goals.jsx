import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, description, image }) => {
  return (
    <div className="bg-gray-800 bg-opacity-75 p-6 rounded-xl flex flex-col items-center max-w-sm mx-auto transform hover:scale-105 transition-transform">
      <div className="w-32 h-32 rounded-half overflow-hidden bg-gray-700 flex items-center justify-center mb-6">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-white text-2xl font-bold mb-3">{title}</h3>
      <p className="text-base text-gray-400 mb-6 text-center">{description}</p>
      <button className="px-6 py-3 bg-[#6B85B6] text-white font-semibold rounded-full hover:bg-[#94a8cd] transition">
        View more
      </button>
    </div>
  );
};

const Goals = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    breakTheText();

    const h2 = document.querySelector(".goals-heading");
    gsap.from(".goals-heading span", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: h2,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  const breakTheText = () => {
    const h2 = document.querySelector(".goals-heading");
    const h2Text = h2.textContent;
    const splittedText = h2Text.split("");
    let clutter = "";

    splittedText.forEach((elem) => {
      clutter += `<span>${elem}</span>`;
    });

    h2.innerHTML = clutter;
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-[#91A5CA] via-[#C8CDD4] to-[#91A5CA]
       dark:bg-gradient-to-br
       dark:from-[#111927] dark:via-black dark:to-gray-900 flex items-center justify-center px-6 py-12 pt-16"
    >
      <div className="container mx-auto">
        <h2
          ref={titleRef}
          className="goals-heading text-5xl font-extrabold text-gray-800 dark:text-[#D2D9EF] text-center mb-16 pb-12 uppercase"
        >
          Our Goals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <ProjectCard
            title="Open Source Initiative"
            description="Describe the product here. Include important features, pricing and other relevant info."
            image="https://www.electronicsforu.com/wp-contents/uploads/2021/11/download-98.jpg"
          />
          <ProjectCard
            title="Tech Workshops"
            description="Describe the product here. Include important features, pricing and other relevant info."
            image='https://tse3.mm.bing.net/th?id=OIP.zsjVEP2jmIIPPoX-liZPhAHaEo&pid=Api&P=0&h=180'
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
