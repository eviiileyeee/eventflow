import React from "react";

const ProjectCard = ({ title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);


const Projects = () => (
    <section id="projects" className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            title="Open Source Initiative"
            description="Contributing to various open-source projects to improve the developer ecosystem."
          />
          <ProjectCard 
            title="Tech Workshops"
            description="Regular workshops on emerging technologies and best practices."
          />
          <ProjectCard 
            title="Hackathon Series"
            description="Quarterly hackathons focusing on solving real-world problems."
          />
        </div>
      </div>
    </section>
  );


  export default Projects