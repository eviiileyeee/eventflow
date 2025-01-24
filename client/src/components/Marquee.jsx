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
    <div
      className={`py-4 ${
        darkMode
          ? "dark:bg-gradient-to-bl dark:from-[#020305] dark:via-[#05070B] dark:via-[#0B0F19] dark:to-[#121928]"
          : "bg-gradient-to-t from-[#94A7CB] via-[#AAB7CE] via-[#AAB7CE] to-[#C3C9D3]"
      }`}
    >
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
                className={`h-8 w-8 text-[#6A6E77] ${
                  darkMode ? "text-white" : ""
                }`}
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;
