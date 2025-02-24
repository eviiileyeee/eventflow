// Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-600 animate-pulse ease-in-out mb-2">
          EVENT FLOW
      </div>
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 animate-pulse ease-in-out">
        PLAN CONNECT & COLLABORATE
      </div>
    </div>
  );
};

export default Loader;
