import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcFeedback } from "react-icons/fc";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const FeedbackButton = ({ position = "bottom-right", toolName = "tool" }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    "bottom-right": "fixed bottom-20 right-5 lg:right-8",
    "bottom-left": "fixed bottom-20 left-6",
    "top-right": "fixed top-24 right-6",
    "top-left": "fixed top-24 left-6",
    "inline": "inline-block",
  };

  return (
    <Link
      to="/feedback"
      className={`${positionClasses[position]} group transition-all duration-300 transform hover:scale-105 z-40`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Button */}
      <div
        className={`relative w-[3.2rem] h-[3.2rem] overflow-hidden rounded-full backdrop-blur-xl border shadow-xl flex items-center justify-center transition-all duration-300
          ${
            isDark
              ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 border-purple-400/30 hover:from-purple-500/90 hover:to-pink-500/90"
              : "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400/30 hover:from-purple-700 hover:to-pink-700"
          }
          ${isHovered ? "shadow-2xl shadow-purple-500/30" : "shadow-lg"}
        `}
      >
        {/* Full-cover animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 opacity-40 z-0"
          animate={{
            backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
            borderRadius: "50%",
          }}
        />

        {/* Centered Icon */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.6 }}
        >
          <FcFeedback className="w-6 h-6 text-white" />
        </motion.div>

        {/* Floating particles (optional for hover effect) */}
        {isHovered && (
          <>
            <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping" />
            <div className="absolute bottom-3 right-3 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-200" />
          </>
        )}
      </div>

      {/* Outer pulse ring */}
      <div
        className={`absolute inset-0 rounded-full border-2 ${
          isDark ? "border-purple-400/30" : "border-purple-400/20"
        } transition-all duration-300 ${
          isHovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      />
    </Link>
  );
};

export default FeedbackButton;
