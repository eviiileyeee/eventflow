import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Button = ({
  onClick,
  children,
  className = "",
  size = "md", // sm, md, lg
  fullWidth = false,
}) => {
  // Updated size mappings with smaller sizes for sm and md devices
  const sizeClasses = {
    sm: "h-6 py-1 px-2 text-xs sm:h-7 sm:py-1.5 sm:px-3", 
    md: "h-8 py-2 px-5 text-sm md:h-9 md:py-2.5 md:px-6", 
    lg: "h-12 py-3 px-10 text-lg", 
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center rounded-full font-bold transition duration-300 ease-in-out",
        sizeClasses[size],
        fullWidth ? "w-full" : "w-auto",
        "bg-black text-white border border-blue-500",
        "shadow-[0_0_10px_rgba(50,117,248,0.5)]",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default Button;
