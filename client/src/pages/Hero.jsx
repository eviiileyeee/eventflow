import React from "react";
import { useNavigate } from "react-router-dom";
import Goals from "../components/Goals";
import Team from "../components/Team";
import Stars from "../components/Stars";
import { useTheme } from "../components/ThemeContext/ThemeContext";
import Marquee from "../components/Marquee"; // Import the Marquee component

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events`);
  };

  const { darkMode } = useTheme();

  return (
    <>
      <nav id="nav" className="fixed top-0 left-0 w-full bg-gray-800 text-white">
        <div className="container mx-auto p-4">Navigation Bar</div>
      </nav>
      <section
        className={`relative h-screen flex items-center justify-center px-6 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 dark:via-gray-900 dark:to-black text-white"
            : "bg-gradient-to-br from-gray-50 via-[#91A5CA] to-[#C8CDD4] text-black"
        }`}
      >
        <Stars />
        <div className="container mx-auto text-center pt-16">
          <p
            className={`bounding-elem text-xl mb-6 font-Madefor ${
              darkMode ? "text-[#505b72]" : "text-[#889fbf]"
            }`}
          >
            Hands-on learning experiences
          </p>
          <h1
            id="hero-heading"
            className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 font-Madefor ${
              darkMode
                ? "bg-gradient-to-r from-white to-transparent bg-clip-text text-transparent text-[#d2d9ef]"
                : "text-[#151C29]"
            }`}
          >
            EMPOWER YOUR <br /> HACKATHON SKILLS
          </h1>
          <p
            className={`bounding-elem text-xl mb-8 mx-auto max-w-2xl font-Madefor ${
              darkMode ? "text-[#A6B7D5]" : "text-[#7f8183]"
            }`}
          >
            "Echelon Dev Society: Training the next generation of innovators
            through hackathons, problem-solving, and hands-on workshops. Join us
            to code, create, and succeed!"
          </p>
          <button
            onClick={handleClick}
            id="herofooter"
            className={`py-3 px-8 text-lg rounded-full font-bold font-Madefor transition duration-300 ease-in-out ${
              darkMode
                ? "bg-[#cce0ff] text-[#101213] hover:bg-[#6B85B6] hover:text-white"
                : "bg-[#111827] text-white hover:bg-[#6B85B6] hover:text-black"
            }`}
          >
            GET STARTED
          </button>
        </div>
      </section>

      {/* Add the marquee */}
      <Marquee />

      <Goals />
      <Team />
    </>
  );
};

export default Hero;
