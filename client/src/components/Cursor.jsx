import React, { useEffect } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  useEffect(() => {
    const main = document.querySelector("#main");
    const cursor = document.querySelector("#cursor");

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
  }, []);

  return (
    <div 
      className="h-3 w-3 bg-[#767677] rounded-full fixed flex items-center justify-center text-center z-50"
      id="cursor">
      
    </div>
  );
};

export default Cursor;
