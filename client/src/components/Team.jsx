import React, { useEffect } from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TeamMember = ({ name, role, image, linkedin, twitter, github }) => (
  <div className="flex items-center bg-gray-200 dark:bg-gray-800 p-4 rounded-lg transition-transform duration-300 transform hover:scale-105">
    <div className="w-1/3">
      <img src={image} alt={name} className="w-24 h-24 rounded-full shadow-lg" />
    </div>
    <div className="w-2/3 pl-4">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{role}</p>
      <div className="flex space-x-2 mt-2">
        {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400"><FaLinkedin /></a>}
        {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300"><FaTwitter /></a>}
        {github && <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white"><FaGithub /></a>}
      </div>
    </div>
  </div>
);

const Team = () => {
  useEffect(() => {
    breakTheText();

    const h2 = document.querySelector(".team-heading");
    gsap.from(".team-heading span", {
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
    const h2 = document.querySelector(".team-heading");
    const h2Text = h2.textContent;
    const splittedText = h2Text.split("");
    let clutter = "";

    splittedText.forEach((elem) => {
      clutter += `<span>${elem}</span>`;
    });

    h2.innerHTML = clutter;
  };

  return (
    <section id="team" className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#C8CDD4] via-[#91A5CA] to-[#91A5CA] dark:bg-gradient-to-br dark:from-black dark:via-[#0E1421] dark:to-gray-900 px-6">
      <div className="container mx-auto px-6">
        <h2 className="team-heading text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          OUR TEAM MEMBERS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TeamMember 
            name="Anirudhh Dugbe"
            role="Founder"
            image="https://media.licdn.com/dms/image/v2/D4D03AQHGEsPkhy8JjQ/profile-displayphoto-shrink_800_800/B4DZOwGadZHMAc-/0/1733826292465?e=1743033600&v=beta&t=THzZK0gxQrQOh3xl_rcYmyfq_wKAgYnlGshX2bXR9l0"
            linkedin="https://linkedin.com/in/anirudhhd"
            twitter="https://twitter.com/anirudhhd"
            github="https://github.com/anirudhhd"
          />
          <TeamMember 
            name="Atharva Thakur"
            role="Tech Lead"
            image="https://media.licdn.com/dms/image/v2/D4D03AQHSrkgQIZ-YiQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712920335349?e=1743033600&v=beta&t=5ofGyE_iPzw2EA1Sdh4n_JRVlaJlkRGp06OOHZZ-7S8"
            linkedin="https://linkedin.com/in/atharvat"
            twitter="https://twitter.com/atharvat"
            github="https://github.com/atharvat"
          />
          <TeamMember 
            name="Anam Mansoori"
            role="Community Manager"
            image="https://media.licdn.com/dms/image/v2/D5603AQGNS_70VvB-DQ/profile-displayphoto-shrink_800_800/B56ZPjRx9HGQAc-/0/1734684912972?e=1743033600&v=beta&t=HhAssjPLfUe2uR03C4IRMGcPp4WOSlygR6mUvCoprAQ"
            linkedin="https://linkedin.com/in/anamm"
            twitter="https://twitter.com/anamm"
            github="https://github.com/anamm"
          />
          <TeamMember 
            name="Jigyarth Sharma"
            role="Events Coordinator"
            image="https://media.licdn.com/dms/image/v2/D5603AQF8STylHbMDLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726598317856?e=1743033600&v=beta&t=PJUxy2RqTtGfEUETxd3aGvJWfIm2TSRuYuSpHDK5HGU"
            linkedin="https://linkedin.com/in/jigyarths"
            twitter="https://twitter.com/jigyarths"
            github="https://github.com/jigyarths"
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
