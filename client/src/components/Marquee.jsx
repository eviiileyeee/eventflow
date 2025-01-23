import React from "react";
import Marquee from "react-marquee-slider";
import Twitterlogo  from "../assets/twitterLogo.webp";
const brands = [
  { name: "Dribbble", src: "/src/assets/dribbble.png" },
  { name: "Instagram", src: "/path_to_perplexity_logo.png" },
  { name: "LinkedIn", src: "/path_to_spacex_logo.png" },
  { name: "Twitter", src: Twitterlogo },
  { name: "Notion", src: "/path_to_lark_logo.png" },
  { name: "Miro", src: "/path_to_miro_logo.png" },
  { name: "Zapier", src: "/path_to_zapier_logo.png" },
];

const MarqueeComponent = () => {
  return (
    <div className="bg-gray-800 py-4">
      <Marquee
        velocity={20}
        direction="rtl" // Changed direction to right-to-left
        scatterRandomly={false}
        repeat={true}
        minScale={0.8} // Adjust scale to make logos slightly smaller to fit better
        pauseOnHover={false} // Makes it continue while hovered (if you want that)
      >
        {/* Duplicate the brands to create a smooth, continuous effect */}
        {brands.concat(brands).map((brand, index) => (
          <div key={index} className="px-4">
            <img
              src={brand.src}
              alt={brand.name}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;
