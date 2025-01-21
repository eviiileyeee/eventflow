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
            name="Anirudhh dugbe"
            role="Founder"
            image="https://media.licdn.com/dms/image/v2/D4D03AQHGEsPkhy8JjQ/profile-displayphoto-shrink_800_800/B4DZOwGadZHMAc-/0/1733826292465?e=1743033600&v=beta&t=THzZK0gxQrQOh3xl_rcYmyfq_wKAgYnlGshX2bXR9l0"
          />
          <TeamMember 
            name="Atharva Thakur"
            role="Tech Lead"
            image="https://media.licdn.com/dms/image/v2/D4D03AQHSrkgQIZ-YiQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712920335349?e=1743033600&v=beta&t=5ofGyE_iPzw2EA1Sdh4n_JRVlaJlkRGp06OOHZZ-7S8"
          />
          <TeamMember 
            name="Anam Mansoori"
            role="Community Manager"
            image="https://media.licdn.com/dms/image/v2/D5603AQGNS_70VvB-DQ/profile-displayphoto-shrink_800_800/B56ZPjRx9HGQAc-/0/1734684912972?e=1743033600&v=beta&t=HhAssjPLfUe2uR03C4IRMGcPp4WOSlygR6mUvCoprAQ"
          />
          <TeamMember 
            name="Jigyarth Sharma"
            role="Events Coordinator"
            image="https://media.licdn.com/dms/image/v2/D5603AQF8STylHbMDLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726598317856?e=1743033600&v=beta&t=PJUxy2RqTtGfEUETxd3aGvJWfIm2TSRuYuSpHDK5HGU"
          />
        </div>
      </div>
    </section>
  );

  export default Team;
  