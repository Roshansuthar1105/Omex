import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./LogoShowcase.css";

const LogoShowcase = () => {
  const { isDark } = useTheme();
  return (
    <div className="logo-showcase-container">
      <img
        src={isDark ? "/omex-text-logo-white.svg" : "/omex-text-logo.svg"}
        alt="Omex AI Logo"
        className="logo-animated"
      />
      <h2 className="logo-title">Welcome to the Omex Logo Showcase</h2>
      <p className="logo-desc">This page demonstrates the animated, theme-adaptive Omex logo. Try switching between light and dark mode!</p>
    </div>
  );
};

export default LogoShowcase;
