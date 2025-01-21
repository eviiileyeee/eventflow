import React from "react";
import Projects from "../components/Projects";
import Team from "../components/Team";

const Hero = () => (
    <>
  <section className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
    <div className="container mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
        Where Innovation Meets Community
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Join a thriving community of developers building the future together
      </p>
      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Join Us
      </button>
    </div>
  </section>
  <Team/>
  <Projects/>
  </>
);

export default Hero;
