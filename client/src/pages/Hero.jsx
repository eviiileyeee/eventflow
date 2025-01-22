import React from "react";
import Projects from "../components/Projects";
import Team from "../components/Team";
import { useTheme } from "../components/ThemeContext/ThemeContext"; // Correct the import path

const Hero = () => {
  const { darkMode } = useTheme(); // Use the hook without passing ThemeContext

  return (
    <>
      <section className={`h-screen flex items-center justify-center px-6 ${
      darkMode
        ? "bg-gradient-to-b from-[#101213] to-[#1d2c48] text-white"
        : "bg-gradient-to-b from-[#F9FAFB] to-[#D1D5DB] text-black"
    }`}>
      <div className="container mx-auto text-center pt-16">
        <p className={`text-xl mb-6 font-Madefor ${darkMode ? "text-[#505b72]" : "text-[#889fbf]"}`}>
          Hands-on learning experiences
        </p>
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 font-Madefor ${
          darkMode ? "text-[#d2d9ef]" : "text-[#111827]"
        }`}>
          EMPOWER YOUR <br /> HACKATHON SKILLS
        </h1>
        <p className={`text-xl mb-8 mx-auto max-w-2xl font-Madefor ${
          darkMode ? "text-[#A6B7D5]" : "text-[#7f8183]"
        }`}>
          "Echelon Dev Society: Training the next generation of innovators through hackathons, problem-solving, and hands-on workshops. Join us to code, create, and succeed!"
        </p>
        <button className={`py-3 px-8 text-lg rounded-full font-bold font-Madefor transition duration-300 ease-in-out ${
          darkMode ? "bg-[#cce0ff] text-[#101213] hover:bg-[#6B85B6] hover:text-white" : "bg-[#111827] text-white hover:bg-[#6B85B6] hover:text-black"
        }`}>
          GET STARTED
        </button>
      </div>
    </section>
      <Team />
      <Projects />
    </>
  );
};

export default Hero;
