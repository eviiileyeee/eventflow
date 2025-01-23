import React from "react";
import Marquee from "react-marquee-slider";
import { useTheme } from "../components/ThemeContext/ThemeContext";
import { 
  FaDribbble, 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaBookOpen, 
  FaTasks, 
  FaAmazonPay
} from "react-icons/fa";

const brands = [
  { name: "Dribbble", icon: FaDribbble },
  { name: "Instagram", icon: FaInstagram },
  { name: "LinkedIn", icon: FaLinkedin },
  { name: "Twitter", icon: FaTwitter },
  { name: "Notion", icon: FaBookOpen },
  { name: "Miro", icon: FaTasks },
  { name: "Zapier", icon: FaAmazonPay }
];

const MarqueeComponent = () => {
  const { darkMode } = useTheme();
  return (
    <div className="bg-gradient-to-br from-[#91A5CA] via-[#AAB7CE] to-[#C6CBD3]
     dark:bg-gradient-to-tb dark:from-[#101726] dark:via-[#090E16] dark:to-[#020304]
      py-4">
      <Marquee
        velocity={20}
        direction="rtl"
        scatterRandomly={false}
        repeat={true}
        minScale={0.9}
        pauseOnHover={false}
      >
        {brands.concat(brands).map((brand, index) => {
          const IconComponent = brand.icon;
          return (
            <div 
              key={index} 
              className="px-8 mx-4 transition-all duration-300 hover:scale-110 hover:text-[#F0F0F0]"
            >
              <IconComponent 
                className={`h-8 w-8 text-[#6A6E77] ${darkMode ? "text-white" : ""}`} 
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;
