import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCode,
  FaLightbulb,
  FaRobot,
  FaChartLine,
  FaExchangeAlt,
  FaBars,
  FaTimes,
  FaTools,
  FaSun,
  FaMoon,
  FaQuestionCircle,
  FaUsers,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaShieldAlt,
  FaFileContract,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleToolsDropdown = () => {
    setIsToolsDropdownOpen(!isToolsDropdownOpen);
    if (!isToolsDropdownOpen) {
      setIsCompanyDropdownOpen(false);
    }
  };

  const toggleCompanyDropdown = () => {
    setIsCompanyDropdownOpen(!isCompanyDropdownOpen);
    if (!isCompanyDropdownOpen) {
      setIsToolsDropdownOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-400 border-b-2 border-blue-400"
      : "hover:text-blue-400";
  };

  const isToolsActive = () => {
    const toolsPaths = [
      "/code-tools",
      "/test-case-generator",
      "/code-beautifier",
      "/error-debugger",
      "/performance-analyzer",
      "/content-summarizer",
      "/security-scanner"
    ];
    return toolsPaths.some((path) => location.pathname === path);
  };

  const isCompanyActive = () => {
    const companyPaths = [
      "/about",
      "/team",
      "/contact",
      "/faq",
      "/privacy-policy",
      "/terms-of-service",
    ];
    return companyPaths.some((path) => location.pathname === path);
  };

  return (
    <nav
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } py-4 px-4 md:px-8 w-full shadow-lg transition-colors duration-300 sticky top-0 z-50`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaCode className="text-blue-400 text-2xl" />
            <h1 className="text-xl md:text-2xl font-bold">
              <Link
                to="/"
                className="hover:text-blue-400 transition duration-200"
              >
                OMEX
              </Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 py-2 ${isActive("/")}`}
            >
              <span>Home</span>
            </Link>
            <Link
              to="/optimiser"
              className={`flex items-center space-x-1 py-2 ${isActive(
                "/optimiser"
              )}`}
            >
              <FaLightbulb className="text-yellow-400" />
              <span>Optimize</span>
            </Link>
            <Link
              to="/codegenerator"
              className={`flex items-center space-x-1 py-2 ${isActive(
                "/codegenerator"
              )}`}
            >
              <FaRobot className="text-green-400" />
              <span>Generate</span>
            </Link>
            <Link
              to="/codecomplexity"
              className={`flex items-center space-x-1 py-2 ${isActive(
                "/codecomplexity"
              )}`}
            >
              <FaChartLine className="text-purple-400" />
              <span>Complexity</span>
            </Link>
            <Link
              to="/codecompare"
              className={`flex items-center space-x-1 py-2 ${isActive(
                "/codecompare"
              )}`}
            >
              <FaExchangeAlt className="text-red-400" />
              <span>Compare</span>
            </Link>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={toggleToolsDropdown}
                className={`flex items-center space-x-1 py-2 ${
                  isToolsActive()
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "hover:text-blue-400"
                }`}
              >
                <FaTools className="text-blue-400" />
                <span>Tools</span>
                {isToolsDropdownOpen ? (
                  <FaChevronUp className="ml-1 text-xs" />
                ) : (
                  <FaChevronDown className="ml-1 text-xs" />
                )}
              </button>

              {isToolsDropdownOpen && (
                <div
                  className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg ${
                    isDark ? "bg-gray-800" : "bg-white"
                  } ring-1 ring-black ring-opacity-5 z-50`}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/code-tools"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      All Tools
                    </Link>
                    <Link
                      to="/test-case-generator"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Test Case Generator
                    </Link>
                    <Link
                      to="/code-beautifier"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Code Beautifier
                    </Link>
                    <Link
                      to="/error-debugger"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Error Debugger
                    </Link>
                    <Link
                      to="/performance-analyzer"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Performance Analyzer
                    </Link>
                    <Link
                      to="/content-summarizer"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Content Summarizer
                    </Link>

                    <Link
                      to="/security-scanner"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Security Vulnerability Scanner
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCompanyDropdown}
                className={`flex items-center space-x-1 py-2 ${
                  isCompanyActive()
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "hover:text-blue-400"
                }`}
              >
                <span>Company</span>
                {isCompanyDropdownOpen ? (
                  <FaChevronUp className="ml-1 text-xs" />
                ) : (
                  <FaChevronDown className="ml-1 text-xs" />
                )}
              </button>

              {isCompanyDropdownOpen && (
                <div
                  className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${
                    isDark ? "bg-gray-800" : "bg-white"
                  } ring-1 ring-black ring-opacity-5 z-50`}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/about"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaUsers className="inline mr-2" />
                      About Us
                    </Link>
                    <Link
                      to="/team"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      Our Team
                    </Link>
                    <Link
                      to="/contact"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaEnvelope className="inline mr-2" />
                      Contact Us
                    </Link>
                    <Link
                      to="/faq"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaQuestionCircle className="inline mr-2" />
                      FAQ
                    </Link>
                    <Link
                      to="/privacy-policy"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaShieldAlt className="inline mr-2" />
                      Privacy Policy
                    </Link>
                    <Link
                      to="/terms-of-service"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaFileContract className="inline mr-2" />
                      Terms of Service
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-1 py-2 px-3 rounded-md transition-colors duration-200 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-blue-600" />
              )}
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-blue-600" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${
                isDark
                  ? "bg-gray-800/70 text-white"
                  : "bg-gray-100/70 text-gray-800"
              } focus:outline-none relative z-50`}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative flex items-center justify-center">
                <span
                  className={`block absolute h-0.5 w-5 transform transition duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                  } ${isDark ? "bg-white" : "bg-gray-800"}`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-5 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  } ${
                    isDark ? "bg-white" : "bg-gray-800"
                  } transition-opacity duration-300`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-5 transform transition duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                  } ${isDark ? "bg-white" : "bg-gray-800"}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Backdrop */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMenu}
        ></div>

        {/* Mobile Navigation Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } ${
            isDark ? "bg-gray-900/95" : "bg-white/95"
          } backdrop-blur-lg shadow-2xl overflow-y-auto`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-700/30">
            <div className="flex items-center space-x-2">
              <FaCode className="text-blue-400 text-xl" />
              <span className="font-bold text-xl">OMEX</span>
            </div>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${
                isDark
                  ? "bg-gray-800/70 hover:bg-gray-700/70"
                  : "bg-gray-100/70 hover:bg-gray-200/70"
              } focus:outline-none`}
              aria-label="Close menu"
            >
              <div className="w-6 h-6 relative flex items-center justify-center">
                <span
                  className={`block absolute h-0.5 w-5 transform rotate-45 ${
                    isDark ? "bg-white" : "bg-gray-800"
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-5 transform -rotate-45 ${
                    isDark ? "bg-white" : "bg-gray-800"
                  }`}
                ></span>
              </div>
            </button>
          </div>

          <div className="py-4 px-4 space-y-4">
            <Link
              to="/"
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive("/")
                  ? isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : isDark
                  ? "hover:bg-gray-800/70"
                  : "hover:bg-gray-100/70"
              }`}
              onClick={toggleMenu}
            >
              <FaCode
                className={isActive("/") ? "text-blue-400" : "text-blue-400"}
              />
              <span>Home</span>
            </Link>
            <Link
              to="/optimiser"
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive("/optimiser")
                  ? isDark
                    ? "bg-yellow-900/30 text-yellow-400"
                    : "bg-yellow-50 text-yellow-600"
                  : isDark
                  ? "hover:bg-gray-800/70"
                  : "hover:bg-gray-100/70"
              }`}
              onClick={toggleMenu}
            >
              <FaLightbulb className="text-yellow-400" />
              <span>Optimize</span>
            </Link>
            <Link
              to="/codegenerator"
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive("/codegenerator")
                  ? isDark
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-50 text-green-600"
                  : isDark
                  ? "hover:bg-gray-800/70"
                  : "hover:bg-gray-100/70"
              }`}
              onClick={toggleMenu}
            >
              <FaRobot className="text-green-400" />
              <span>Generate</span>
            </Link>
            <Link
              to="/codecomplexity"
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive("/codecomplexity")
                  ? isDark
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-50 text-purple-600"
                  : isDark
                  ? "hover:bg-gray-800/70"
                  : "hover:bg-gray-100/70"
              }`}
              onClick={toggleMenu}
            >
              <FaChartLine className="text-purple-400" />
              <span>Complexity</span>
            </Link>
            <Link
              to="/codecompare"
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive("/codecompare")
                  ? isDark
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-50 text-red-600"
                  : isDark
                  ? "hover:bg-gray-800/70"
                  : "hover:bg-gray-100/70"
              }`}
              onClick={toggleMenu}
            >
              <FaExchangeAlt className="text-red-400" />
              <span>Compare</span>
            </Link>

            {/* Mobile Tools Dropdown */}
            <div className="mb-2">
              <button
                onClick={toggleToolsDropdown}
                className={`flex items-center justify-between w-full p-3 rounded-lg ${
                  isToolsActive()
                    ? isDark
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                    : isDark
                    ? "hover:bg-gray-800/70"
                    : "hover:bg-gray-100/70"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FaTools className="text-blue-400" />
                  <span>Tools</span>
                </div>
                <div
                  className={`transition-transform duration-200 ${
                    isToolsDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <FaChevronDown
                    className={isToolsActive() ? "text-blue-400" : ""}
                  />
                </div>
              </button>

              <div
                className={`mt-2 ml-4 pl-4 border-l-2 ${
                  isDark ? "border-gray-700" : "border-gray-300"
                } space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isToolsDropdownOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <Link
                  to="/code-tools"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/code-tools")
                      ? isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <span>All Tools</span>
                </Link>
                <Link
                  to="/test-case-generator"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/test-case-generator")
                      ? isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <span>Test Case Generator</span>
                </Link>
                <Link
                  to="/code-beautifier"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/code-beautifier")
                      ? isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <span>Code Beautifier</span>
                </Link>
                <Link
                  to="/error-debugger"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/error-debugger")
                      ? isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <span>Error Debugger</span>
                </Link>
                <Link
                  to="/performance-analyzer"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/performance-analyzer")
                      ? isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <span>Performance Analyzer</span>
                </Link>
                <Link
                  to="/content-summarizer"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/content-summarizer")
                      ? isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <span>Content Summarizer</span>
                </Link>

                <Link
                  to="/security-scanner"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/security-scanner")
                      ? isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <FaShieldAlt className="text-red-400" />
                  <span>Security Scanner</span>
                </Link>
              </div>
            </div>

            {/* Mobile Company Dropdown */}
            <div className="mb-2">
              <button
                onClick={toggleCompanyDropdown}
                className={`flex items-center justify-between w-full p-3 rounded-lg ${
                  isCompanyActive()
                    ? isDark
                      ? "bg-purple-900/30 text-purple-400"
                      : "bg-purple-50 text-purple-600"
                    : isDark
                    ? "hover:bg-gray-800/70"
                    : "hover:bg-gray-100/70"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-purple-400" />
                  <span>Company</span>
                </div>
                <div
                  className={`transition-transform duration-200 ${
                    isCompanyDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <FaChevronDown
                    className={isCompanyActive() ? "text-purple-400" : ""}
                  />
                </div>
              </button>

              <div
                className={`mt-2 ml-4 pl-4 border-l-2 ${
                  isDark ? "border-gray-700" : "border-gray-300"
                } space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isCompanyDropdownOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <Link
                  to="/about"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/about")
                      ? isDark
                        ? "bg-purple-900/30 text-purple-400"
                        : "bg-purple-50 text-purple-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <FaUsers className="text-purple-400" />
                  <span>About Us</span>
                </Link>
                <Link
                  to="/team"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/team")
                      ? isDark
                        ? "bg-purple-900/30 text-purple-400"
                        : "bg-purple-50 text-purple-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <FaUsers className="text-purple-400" />
                  <span>Our Team</span>
                </Link>
                <Link
                  to="/contact"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/contact")
                      ? isDark
                        ? "bg-purple-900/30 text-purple-400"
                        : "bg-purple-50 text-purple-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <FaEnvelope className="text-purple-400" />
                  <span>Contact Us</span>
                </Link>
                <Link
                  to="/faq"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/faq")
                      ? isDark
                        ? "bg-purple-900/30 text-purple-400"
                        : "bg-purple-50 text-purple-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <FaQuestionCircle className="text-purple-400" />
                  <span>FAQ</span>
                </Link>
                <Link
                  to="/privacy-policy"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/privacy-policy")
                      ? isDark
                        ? "bg-purple-900/30 text-purple-400"
                        : "bg-purple-50 text-purple-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <FaShieldAlt className="text-purple-400" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  to="/terms-of-service"
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive("/terms-of-service")
                      ? isDark
                        ? "bg-purple-900/30 text-purple-400"
                        : "bg-purple-50 text-purple-600"
                      : isDark
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={toggleMenu}
                >
                  <FaFileContract className="text-purple-400" />
                  <span>Terms of Service</span>
                </Link>
              </div>
            </div>

            {/* Theme Toggle in Mobile Menu */}
            <div className="mt-6 border-t border-gray-700/30 pt-6 px-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Theme</span>
                <button
                  onClick={toggleTheme}
                  className={`p-3 rounded-lg ${
                    isDark
                      ? "bg-gray-800/70 text-yellow-400"
                      : "bg-gray-100/70 text-blue-600"
                  }`}
                >
                  {isDark ? (
                    <div className="flex items-center space-x-2">
                      <FaSun />
                      <span>Light Mode</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FaMoon />
                      <span>Dark Mode</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
