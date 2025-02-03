// Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="text-5xl text-gray-600 animate-pulse ease-in-out mb-3">ECHELON DEV SOCIETY</div>
        <div className="text-2xl text-gray-500 animate-pulse ease-in-out">CHAMELI DEVI GROUP OF INSTITUTIONS</div>
    </div>
  );
};

export default Loader;
