// src/components/BackToTopButton.jsx
import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      tabIndex={0}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-colors duration-200
        bg-gradient-to-br from-indigo-500 to-purple-500
        hover:from-indigo-600 hover:to-purple-600
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      style={{
        transition: "opacity 0.4s",
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-white"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default BackToTopButton;
