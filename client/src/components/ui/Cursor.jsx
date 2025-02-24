import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = document.querySelector("#cursor");
    
    if (!cursor) {
      console.error('Cursor element not found');
      return;
    }

    // Set initial position off-screen
    gsap.set(cursor, {
      x: -100,
      y: -100,
    });

    const handleMouseMove = (e) => {
      // Only animate if cursor exists
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add listeners to document instead of #main
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      id="cursor"
      className={`h-4 w-4 bg-gray-600 rounded-full fixed flex items-center justify-center text-center z-50 pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ top: 0, left: 0 }} // Initial positioning
    >
    </div>
  );
};

export default Cursor;