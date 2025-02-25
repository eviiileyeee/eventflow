"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes"; // For Next.js theme switching

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  ...props
}) {
  const { theme } = useTheme(); // Detects light or dark mode

  return (
    <Tag
      className={cn(
        "relative flex items-center justify-center px-6 py-3 rounded-full border transition duration-500",
        "text-white",
        containerClassName
      )}
      {...props}
    >
      {/* Button Content */}
      <div className={cn("z-10 px-4 py-2 rounded-full", className)}>
        <span className="text-blue-400">{">"}</span> {children}
      </div>

      {/* Static Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-500"
        style={{ filter: "blur(6px)" }}
      />

      {/* Inner Background Layer - Changes Based on Theme */}
      <div
        className={cn(
          "absolute inset-[2px] rounded-full transition-colors duration-500",
          theme === "dark" ? "bg-gray-300" : "bg-blue-500"
        )}
      />
    </Tag>
  );
}
