import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaComment, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const FeedbackButton = ({ position = "bottom-right", toolName = "tool" }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    "bottom-right": "fixed bottom-6 right-6",
    "bottom-left": "fixed bottom-6 left-6",
    "top-right": "fixed top-24 right-6",
    "top-left": "fixed top-24 left-6",
    "inline": "inline-block"
  };

  return (
    <Link
      to="/feedback"
      className={`${positionClasses[position]} group transition-all duration-300 transform hover:scale-105 z-40`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl backdrop-blur-xl border shadow-xl transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 border-purple-400/30 hover:from-purple-500/90 hover:to-pink-500/90"
            : "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400/30 hover:from-purple-700 hover:to-pink-700"
        } ${isHovered ? "shadow-2xl shadow-purple-500/30" : "shadow-lg"}`}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transition-transform duration-500 ${
            isHovered ? "translate-x-full" : "-translate-x-full"
          }`}
        />
        
        <div className="relative px-6 py-4 flex items-center space-x-3">
          {/* Icon with animation */}
          <div className="relative">
            <FaComment className="text-white text-lg group-hover:scale-110 transition-transform duration-200" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center"
              animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaHeart className="w-2 h-2 text-white" />
            </motion.div>
          </div>
          
          {/* Text content */}
          <div className="text-white">
            <div className="font-semibold text-sm">
              {isHovered ? "Share Your Experience!" : "Feedback"}
            </div>
            <div className="text-xs opacity-80">
              Help us improve {toolName}
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        {isHovered && (
          <>
            <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping" />
            <div className="absolute bottom-3 right-3 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-200" />
          </>
        )}
      </div>

      {/* Pulse ring effect */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 ${
          isDark ? "border-purple-400/30" : "border-purple-400/20"
        } transition-all duration-300 ${
          isHovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      />
    </Link>
  );
};

export default FeedbackButton;
