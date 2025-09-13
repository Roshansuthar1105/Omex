import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../components/css/Loader.css"

const Loader = ({ 
  size = "medium", 
  color = "blue", 
  centered = true, 
  text = "Loading...", 
  fullscreen = false 
}) => {
  const { isDark } = useTheme();
  const [particles, setParticles] = useState([]);

  // Generate random particles
  useEffect(() => {
    const particleCount = 12; // you can adjust per size if needed
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: i * 0.1,
      angle: (i * (360 / particleCount)) % 360, // distributes evenly
    }));
    setParticles(newParticles);
  }, []);

  // Enhanced size classes
  const sizeClasses = {
    small: { main: "w-9 h-9", orbit: "w-12 h-12", particles: "w-0.5 h-0.5" },
    medium: { main: "w-12 h-12", orbit: "w-18 h-18", particles: "w-1 h-1" },
    large: { main: "w-18 h-18", orbit: "w-24 h-24", particles: "w-1.5 h-1.5" },
    xl: { main: "w-24 h-24", orbit: "w-30 h-30", particles: "w-2 h-2" },
  };

  // Dynamic color system with gradients
  const colorSystem = {
    blue: {
      primary: isDark ? "#3b82f6" : "#2563eb",
      secondary: isDark ? "#1d4ed8" : "#1e40af",
      accent: isDark ? "#60a5fa" : "#3b82f6",
      glow: isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(37, 99, 235, 0.3)",
      particles: isDark ? "#93c5fd" : "#60a5fa",
    },
    green: {
      primary: isDark ? "#10b981" : "#059669",
      secondary: isDark ? "#047857" : "#065f46",
      accent: isDark ? "#34d399" : "#10b981",
      glow: isDark ? "rgba(16, 185, 129, 0.4)" : "rgba(5, 150, 105, 0.3)",
      particles: isDark ? "#6ee7b7" : "#34d399",
    },
    purple: {
      primary: isDark ? "#8b5cf6" : "#7c3aed",
      secondary: isDark ? "#7c3aed" : "#6d28d9",
      accent: isDark ? "#a78bfa" : "#8b5cf6",
      glow: isDark ? "rgba(139, 92, 246, 0.4)" : "rgba(124, 58, 237, 0.3)",
      particles: isDark ? "#c4b5fd" : "#a78bfa",
    },
    red: {
      primary: isDark ? "#ef4444" : "#dc2626",
      secondary: isDark ? "#dc2626" : "#b91c1c",
      accent: isDark ? "#f87171" : "#ef4444",
      glow: isDark ? "rgba(239, 68, 68, 0.4)" : "rgba(220, 38, 38, 0.3)",
      particles: isDark ? "#fca5a5" : "#f87171",
    },
    yellow: {
      primary: isDark ? "#f59e0b" : "#d97706",
      secondary: isDark ? "#d97706" : "#b45309",
      accent: isDark ? "#fbbf24" : "#f59e0b",
      glow: isDark ? "rgba(245, 158, 11, 0.4)" : "rgba(217, 119, 6, 0.3)",
      particles: isDark ? "#fde68a" : "#fbbf24",
    },
  };

  const currentColors = colorSystem[color] || colorSystem.blue;
  const currentSize = sizeClasses[size] || sizeClasses.medium;

  const containerClasses = centered
    ? "flex flex-col items-center justify-center"
    : "inline-flex flex-col items-center";

  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [fullscreen]);

  return (
    <div
      role="status"
      className={`${containerClasses} 
        ${
          fullscreen
            ? `fixed inset-0 w-screen h-screen z-50 loader-bg`
            : ""
        }
      `}
      style={{
        background: fullscreen ? (isDark 
          ? `radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)`
          : `radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)`
        ) : 'transparent'
      }}
    >
      {/* Main loader container with crazy animations */}
      <div className="relative loader-container">
        
        {/* Outer rotating rings */}
        <div className={`absolute ${currentSize.orbit} -inset-4 loader-ring-outer`}>
          <div className="w-full h-full border-2 border-dashed rounded-full"
               style={{ borderColor: currentColors.glow }} />
        </div>
        
        <div className={`absolute ${currentSize.orbit} -inset-4 loader-ring-middle`}>
          <div className="w-full h-full border border-dotted rounded-full"
               style={{ borderColor: currentColors.accent }} />
        </div>

        {/* Particle orbit system */}
        <div className={`absolute ${currentSize.orbit} -inset-4`}>
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-full h-full loader-particle-orbit"
              style={{ 
                animationDelay: `${particle.delay}s`,
                transform: `rotate(${particle.angle}deg)`
              }}
            >
              <div 
                className={`${currentSize.particles} rounded-full loader-particle`}
                style={{ 
                  background: `linear-gradient(45deg, ${currentColors.particles}, ${currentColors.accent})`,
                  boxShadow: `0 0 10px ${currentColors.glow}`
                }}
              />
            </div>
          ))}
        </div>

        {/* Main spinner with morphing effect */}
        <div className={`relative ${currentSize.main} loader-morph`}>
          {/* Background glow */}
          <div 
            className="absolute inset-0 rounded-full loader-glow blur-lg"
            style={{ 
              background: `radial-gradient(circle, ${currentColors.glow} 0%, transparent 70%)`,
            }}
          />
          
          {/* Main geometric spinner */}
          <svg
            className={`${currentSize.main} loader-spin-main relative z-10`}
            viewBox="0 0 100 100"
            fill="none"
          >
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentColors.primary} />
                <stop offset="50%" stopColor={currentColors.accent} />
                <stop offset="100%" stopColor={currentColors.secondary} />
              </linearGradient>
              <filter id={`glow-${color}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Animated geometric paths */}
            <path
              d="M50,10 L80,40 L80,60 L50,90 L20,60 L20,40 Z"
              fill={`url(#gradient-${color})`}
              filter={`url(#glow-${color})`}
              className="loader-morph-path"
            />
            
            {/* Inner spinning elements */}
            <circle cx="50" cy="50" r="15" fill="none" 
                   stroke={currentColors.accent} strokeWidth="2" 
                   className="loader-inner-circle" />
            <circle cx="50" cy="50" r="8" fill={currentColors.particles} 
                   className="loader-center-dot" />
          </svg>
          
          {/* Energy waves */}
          <div className="absolute inset-0">
            <div className="loader-wave-1" 
                 style={{ 
                   background: `radial-gradient(circle, ${currentColors.glow} 0%, transparent 50%)` 
                 }} />
            <div className="loader-wave-2" 
                 style={{ 
                   background: `radial-gradient(circle, ${currentColors.glow} 0%, transparent 50%)` 
                 }} />
            <div className="loader-wave-3" 
                 style={{ 
                   background: `radial-gradient(circle, ${currentColors.glow} 0%, transparent 50%)` 
                 }} />
          </div>
        </div>
      </div>

      {/* Holographic text display */}
      {text && (
        <div className="mt-12 text-center loader-text-container">
          <div className="relative">
            <span className={`text-lg font-bold loader-text-main ${
              text === "Loading..." ? "sr-only" : ""
            }`}
            style={{ 
              background: `linear-gradient(45deg, ${currentColors.primary}, ${currentColors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: `0 0 20px ${currentColors.glow}`
            }}>
              {text}
            </span>
            
            {/* Glitch effect overlay */}
            <span className={`absolute inset-0 text-lg font-bold loader-text-glitch ${
              text === "Loading..." ? "sr-only" : ""
            }`}
            style={{ color: currentColors.accent }}>
              {text}
            </span>
          </div>
          
          {/* Progress bars */}
          <div className="mt-4 flex space-x-1 justify-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="loader-progress-bar"
                   style={{ 
                     background: currentColors.primary,
                     animationDelay: `${i * 0.2}s`
                   }} />
            ))}
          </div>
        </div>
      )}

      {/* CSS Animations */}
    </div>
  );
};

export default Loader;