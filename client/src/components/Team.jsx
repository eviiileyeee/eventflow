import React from "react";


const TeamMember = ({ name, role, image }) => (
    <div className="flex flex-col items-center p-4">
      <img src={image} alt={name} className="w-24 h-24 rounded-full mb-2" />
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{role}</p>
    </div>
  );
  
  

const Team = () => (
    <section id="team" className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="Alex Chen"
            role="Founder"
            image="/api/placeholder/96/96"
          />
          <TeamMember 
            name="Sarah Johnson"
            role="Tech Lead"
            image="/api/placeholder/96/96"
          />
          <TeamMember 
            name="Michael Lee"
            role="Community Manager"
            image="/api/placeholder/96/96"
          />
          <TeamMember 
            name="Emma Wilson"
            role="Events Coordinator"
            image="/api/placeholder/96/96"
          />
        </div>
      </div>
    </section>
  );

  export default Team;
  