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
  // Updated size mappings with improved responsive sizing
  const sizeClasses = {
    sm: "h-8 py-1 px-4 text-xs",
    md: "h-10 py-2 px-6 text-sm",
    lg: "h-12 py-3 px-8 text-base"
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center rounded-full font-bold transition duration-300 ease-in-out",
        sizeClasses[size],
        fullWidth ? "w-full" : "w-auto",
        "bg-black text-white border border-indigo-500",
        "shadow-[0_0_10px_rgba(90,80,235,0.8)]",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;