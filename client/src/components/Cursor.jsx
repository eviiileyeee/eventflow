import React, { useEffect } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  useEffect(() => {
    const main = document.querySelector("#main");
    const cursor = document.querySelector("#cursor");

    if (main && cursor) {
      console.log('Elements found:', { main, cursor });

      const handleMouseMove = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 1,
        });
      };

      main.addEventListener("mousemove", handleMouseMove);

      return () => {
        main.removeEventListener("mousemove", handleMouseMove);
      };
    } else {
      console.error('Elements not found:', { main, cursor });
    }
  }, []);

  return (
    <div
      id="cursor"
      className="h-6 w-6 bg-gray-600 rounded-full fixed flex items-center justify-center text-center z-50 pointer-events-none"
    >
    </div>
  );
};

export default Cursor;
