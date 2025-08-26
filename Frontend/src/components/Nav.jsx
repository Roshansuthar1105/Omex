import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/vite.svg" alt="Omex AI Logo" className="logo-img" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
        <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={handleDropdownToggle}>
            Tools
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/code-beautifier">Code Beautifier</Link>
              <Link to="/code-compare">Code Compare</Link>
              <Link to="/code-complexity">Code Complexity</Link>
              <Link to="/code-generator">Code Generator</Link>
              <Link to="/code-optimizer">Code Optimizer</Link>
              <Link to="/error-debugger">Error Debugger</Link>
              <Link to="/performance-analyzer">Performance Analyzer</Link>
              <Link to="/security-scanner">Security Scanner</Link>
              <Link to="/test-case-generator">Test Case Generator</Link>
            </div>
          )}
        </div>
        <Link to="/faq" className={isActive("/faq") ? "active" : ""}>FAQ</Link>
        <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
        <Link to="/contribute" className={isActive("/contribute") ? "active" : ""}>Contribute</Link>
      </div>
      <button className="mobile-nav-toggle" onClick={handleMobileNavToggle}>
        <span className="hamburger"></span>
      </button>
      {isMobileNavOpen && (
        <div className="mobile-nav">
          <button className="close-mobile-nav" onClick={handleMobileNavToggle}>
            &times;
          </button>
          <Link to="/" onClick={handleMobileNavToggle}>Home</Link>
          <Link to="/about" onClick={handleMobileNavToggle}>About</Link>
          <button className="dropdown-toggle" onClick={handleDropdownToggle}>
            Tools
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/code-beautifier" onClick={handleMobileNavToggle}>Code Beautifier</Link>
              <Link to="/code-compare" onClick={handleMobileNavToggle}>Code Compare</Link>
              <Link to="/code-complexity" onClick={handleMobileNavToggle}>Code Complexity</Link>
              <Link to="/code-generator" onClick={handleMobileNavToggle}>Code Generator</Link>
              <Link to="/code-optimizer" onClick={handleMobileNavToggle}>Code Optimizer</Link>
              <Link to="/error-debugger" onClick={handleMobileNavToggle}>Error Debugger</Link>
              <Link to="/performance-analyzer" onClick={handleMobileNavToggle}>Performance Analyzer</Link>
              <Link to="/security-scanner" onClick={handleMobileNavToggle}>Security Scanner</Link>
              <Link to="/test-case-generator" onClick={handleMobileNavToggle}>Test Case Generator</Link>
            </div>
          )}
          <Link to="/faq" onClick={handleMobileNavToggle}>FAQ</Link>
          <Link to="/contact" onClick={handleMobileNavToggle}>Contact</Link>
          <Link to="/contribute" onClick={handleMobileNavToggle}>Contribute</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;