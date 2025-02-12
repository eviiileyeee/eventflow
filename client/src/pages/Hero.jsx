<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";
import Goals from "../components/Goals";
import Team from "../components/Team";
import { useTheme } from "../components/ThemeContext/ThemeContext";
import Stars from "../components/Stars";
=======
  import React from "react";
  import { useNavigate } from "react-router-dom";
  import Goals from "../components/Goals";
  import Team from "../components/Team";
  import Stars from "../components/Stars";
  import { useTheme } from "../context/ThemeContext/ThemeContext";
 // import Marquee from "../components/Marquee"; // Import the Marquee component
>>>>>>> fc1f3639c9bb27e7e1e44d7f6540b8acea145e66

const Hero = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleClick = () => {
    navigate(`/events`);
  };

  return (
    <>
      <section 
        className={`relative h-screen flex items-center justify-center px-6 ${
          darkMode 
            ? "bg-gray-900 text-white" 
            : "bg-white text-black"
        }`}
      >
        <Stars />
        <div className="container mx-auto text-left max-w-6xl">
          <div className="text-sm text-gray-500 mb-4">May 12-15 2035</div>
          <h1 className="text-[8rem] font-bold leading-none text-green-700 mb-4">
            ZEKO
            <br />
            DESIGN
            <br />
            SUMMIT
          </h1>
          <div className="text-gray-600 text-lg max-w-xl mb-8">
            PRAVA CENTER, SAN FRANCISCO, CA
            <br />
            IN PERSON & ONLINE
          </div>
          <button
            onClick={handleClick}
            className={`py-3 px-8 text-lg rounded-full font-bold transition duration-300 ease-in-out ${
              darkMode
                ? "bg-green-700 text-white hover:bg-green-600"
                : "bg-green-700 text-white hover:bg-green-600"
            }`}
          >
            GET STARTED
          </button>
        </div>
      </section>

      <Goals />
      <Team />
    </>
  );
};

export default Hero;