import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaCode,
  FaEnvelope,
  FaExchangeAlt,
  FaFileContract,
  FaHandsHelping,
  FaRocket,
  FaMoon,
  FaMagic,
  FaShieldAlt,
  FaSun,
  FaTools,
  FaUserFriends,
  FaUsers,
  FaVial,
  FaPaintBrush,
  FaBug,
  FaTachometerAlt,
  FaAlignLeft,
  FaRegBuilding,
  FaBookOpen,
  FaStar,
  FaTimes
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function NavBar({ isMenuOpen, setIsMenuOpen }) {
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const menuRef = useRef(null);
  const toolsDropdownRef = useRef(null);
  const companyDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileToolsOpen(false);
    setIsMobileCompanyOpen(false);
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

  const toggleMobileTools = () => {
    setIsMobileToolsOpen(!isMobileToolsOpen);
    if (!isMobileToolsOpen) {
      setIsMobileCompanyOpen(false);
    }
  };

  const toggleMobileCompany = () => {
    setIsMobileCompanyOpen(!isMobileCompanyOpen);
    if (!isMobileCompanyOpen) {
      setIsMobileToolsOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-400 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:rounded-full"
      : "hover:text-blue-400 relative overflow-hidden group";
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
      "/contribute",
      "/contact",
      "/privacy-policy",
      "/terms-of-service",
    ];
    return companyPaths.some((path) => location.pathname === path);
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu if clicking outside
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('.hamburger-button')
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Handle click outside for desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target)) {
        setIsToolsDropdownOpen(false);
      }
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
        setIsCompanyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`${
          isDark 
            ? "bg-gray-900 text-white border-gray-800"
            : "bg-white text-gray-800 border-gray-200"
        } ${
          scrolled 
            ? "backdrop-blur-xl shadow-2xl border-b" 
            : "backdrop-blur-md shadow-lg"
        } py-4 px-4 md:px-8 w-full transition-all duration-500 sticky top-0 z-50`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <FaCode className="text-blue-400 text-2xl group-hover:text-purple-400 transition-all duration-300 transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                <Link
                  to="/"
                  className="hover:from-purple-400 hover:via-pink-400 hover:to-blue-400 transition-all duration-500"
                  onClick={closeMenu}
                >
                  OMEX
                </Link>
              </h1>
              <FaStar className="text-yellow-400 text-sm animate-pulse opacity-70" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 ${isActive("/")}`}
              >
                <span className="relative z-10">Home</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <Link
                to="/optimiser"
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 group ${isActive("/optimiser")}`}
              >
                <FaRocket className="text-lg group-hover:text-yellow-400 transition-colors duration-300 transform group-hover:scale-110" />
                <span className="relative z-10">Optimize</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <Link
                to="/codegenerator"
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 group ${isActive("/codegenerator")}`}
              >
                <FaMagic className="text-lg group-hover:text-green-400 transition-colors duration-300 transform group-hover:scale-110" />
                <span className="relative z-10">Generate</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <Link
                to="/codecomplexity"
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 group ${isActive("/codecomplexity")}`}
              >
                <FaChartLine className="text-lg group-hover:text-purple-400 transition-colors duration-300 transform group-hover:scale-110" />
                <span className="relative z-10">Complexity</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <Link
                to="/codecompare"
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 group ${isActive("/codecompare")}`}
              >
                <FaExchangeAlt className="text-lg group-hover:text-red-400 transition-colors duration-300 transform group-hover:scale-110" />
                <span className="relative z-10">Compare</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <Link
                to="/contributors"
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 group ${isActive("/contributors")}`}
              >
                <FaUserFriends className="text-lg group-hover:text-red-400 transition-colors duration-300 transform group-hover:scale-110" />
                <span className="relative z-10">Contributors</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              {/* Enhanced Tools Dropdown */}
              <div className="relative" ref={toolsDropdownRef}>
                <button
                  onClick={toggleToolsDropdown}
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 group ${
                    isToolsActive()
                      ? "text-blue-400 bg-blue-400/10"
                      : "hover:text-blue-400 hover:bg-blue-400/10"
                  }`}
                >
                  <FaTools className="text-lg group-hover:text-cyan-400 transition-colors duration-300 transform group-hover:scale-110" />
                  <span className="relative z-10">Tools</span>
                  <div className={`transform transition-all duration-300 ${isToolsDropdownOpen ? "rotate-180" : ""}`}>
                    <FaChevronDown className="text-xs" />
                  </div>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>

                {isToolsDropdownOpen && (
                  <div
                    className={`absolute left-0 mt-3 w-64 rounded-xl shadow-2xl backdrop-blur-xl border ${
                      isDark 
                        ? "bg-gray-800/95 border-gray-700/50" 
                        : "bg-white/95 border-gray-200/50"
                    } ring-1 ring-black/5 z-50 animate-in slide-in-from-top-2 duration-200`}
                  >
                    <div className="py-2" role="menu">
                      {[
                        { to: "/code-tools", icon: FaTools, label: "All Tools", color: "blue" },
                        { to: "/test-case-generator", icon: FaVial, label: "Test Case Generator", color: "green" },
                        { to: "/code-beautifier", icon: FaPaintBrush, label: "Code Beautifier", color: "pink" },
                        { to: "/error-debugger", icon: FaBug, label: "Error Debugger", color: "red" },
                        { to: "/performance-analyzer", icon: FaTachometerAlt, label: "Performance Analyzer", color: "yellow" },
                        { to: "/content-summarizer", icon: FaAlignLeft, label: "Content Summarizer", color: "purple" },
                        { to: "/security-scanner", icon: FaShieldAlt, label: "Security Scanner", color: "red" }
                      ].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 group ${
                            isDark
                              ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                              : "text-gray-700 hover:bg-gray-50/50 hover:text-gray-900"
                          }`}
                          onClick={() => setIsToolsDropdownOpen(false)}
                        >
                          <item.icon className={`text-${item.color}-400 text-sm group-hover:scale-110 transition-transform duration-200`} />
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Company Dropdown */}
              <div className="relative" ref={companyDropdownRef}>
                <button
                  onClick={toggleCompanyDropdown}
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 group ${
                    isCompanyActive()
                      ? "text-purple-400 bg-purple-400/10"
                      : "hover:text-purple-400 hover:bg-purple-400/10"
                  }`}
                >
                  <FaRegBuilding className="text-lg group-hover:text-indigo-400 transition-colors duration-300 transform group-hover:scale-110" />
                  <span className="relative z-10">Company</span>
                  <div className={`transform transition-all duration-300 ${isCompanyDropdownOpen ? "rotate-180" : ""}`}>
                    <FaChevronDown className="text-xs" />
                  </div>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>

                {isCompanyDropdownOpen && (
                  <div
                    className={`absolute left-0 mt-3 w-56 rounded-xl shadow-2xl backdrop-blur-xl border ${
                      isDark 
                        ? "bg-gray-800/95 border-gray-700/50" 
                        : "bg-white/95 border-gray-200/50"
                    } ring-1 ring-black/5 z-50 animate-in slide-in-from-top-2 duration-200`}
                  >
                    <div className="py-2" role="menu">
                      {[
                        { to: "/about", icon: FaUsers, label: "About Us", color: "blue" },
                        { to: "/team", icon: FaUserFriends, label: "Our Team", color: "green" },
                        { to: "/contribute", icon: FaHandsHelping, label: "Contribute", color: "yellow" },
                        { to: "/contributor-guide", icon: FaBookOpen, label: "Contributor Guide", color: "indigo" },
                        { to: "/contact", icon: FaEnvelope, label: "Contact Us", color: "purple" },
                        { to: "/privacy-policy", icon: FaShieldAlt, label: "Privacy Policy", color: "red" },
                        { to: "/terms-of-service", icon: FaFileContract, label: "Terms of Service", color: "gray" }
                      ].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 group ${
                            isDark
                              ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                              : "text-gray-700 hover:bg-gray-50/50 hover:text-gray-900"
                          }`}
                          onClick={() => setIsCompanyDropdownOpen(false)}
                        >
                          <item.icon className={`text-${item.color}-400 group-hover:scale-110 transition-transform duration-200`} />
                          <span className="relative z-10">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`relative overflow-hidden p-3 rounded-xl transition-all duration-500 group ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                } shadow-lg hover:shadow-xl transform hover:scale-105`}
                aria-label="Toggle theme"
              >
                <div className="relative z-10 flex items-center">
                  {isDark ? (
                    <FaSun className="text-yellow-400 text-lg animate-pulse" />
                  ) : (
                    <FaMoon className="text-indigo-600 text-lg" />
                  )}
                </div>
              </button>
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-300 group ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                } shadow-md hover:shadow-lg transform hover:scale-105`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <FaSun className="text-lg text-yellow-400 group-hover:animate-spin" />
                ) : (
                  <FaMoon className="text-lg text-indigo-600" />
                )}
              </button>

              <button
                onClick={toggleMenu}
                className={`hamburger-button p-3 rounded-xl ${
                  isDark
                    ? "bg-gray-800/90 text-white hover:bg-gray-700/90"
                    : "bg-gray-100/90 text-gray-800 hover:bg-gray-200/90"
                } focus:outline-none relative z-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 relative flex items-center justify-center">
                  <span
                    className={`block absolute h-0.5 w-5 rounded-full transform transition duration-300 ease-in-out ${
                      isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                    } ${isDark ? "bg-white" : "bg-gray-800"}`}
                  ></span>
                  <span
                    className={`block absolute h-0.5 w-5 rounded-full ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    } ${
                      isDark ? "bg-white" : "bg-gray-800"
                    } transition-opacity duration-300`}
                  ></span>
                  <span
                    className={`block absolute h-0.5 w-5 rounded-full transform transition duration-300 ease-in-out ${
                      isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                    } ${isDark ? "bg-white" : "bg-gray-800"}`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Navigation Sidebar */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 lg:hidden transform transition-all duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${
          isDark ? "bg-gray-900/98" : "bg-white/98"
        } backdrop-blur-2xl shadow-2xl overflow-y-auto border-l ${
          isDark ? "border-gray-800/50" : "border-gray-200/50"
        }`}
      >
        {/* Mobile header */}
        <div className={`flex justify-between items-center p-6 border-b ${
          isDark ? "border-gray-800/50" : "border-gray-200/50"
        }`}>
          <div className="flex items-center space-x-3">
            <FaCode className="text-blue-400 text-xl" />
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OMEX
            </span>
          </div>
          <button
            onClick={closeMenu}
            className={`p-2 rounded-xl ${
              isDark
                ? "bg-gray-800/70 hover:bg-gray-700/70"
                : "bg-gray-100/70 hover:bg-gray-200/70"
            } focus:outline-none transition-all duration-300 transform hover:scale-105`}
            aria-label="Close menu"
          >
            <FaTimes className={`w-5 h-5 ${isDark ? "text-white" : "text-gray-800"}`} />
          </button>
        </div>

        {/* Mobile menu items */}
        <div className="py-6 px-4 space-y-2">
          {/* Main Navigation Items */}
          {[
            { to: "/", icon: FaCode, label: "Home", color: "blue" },
            { to: "/optimiser", icon: FaRocket, label: "Optimize", color: "yellow" },
            { to: "/codegenerator", icon: FaMagic, label: "Generate", color: "green" },
            { to: "/codecomplexity", icon: FaChartLine, label: "Complexity", color: "purple" },
            { to: "/codecompare", icon: FaExchangeAlt, label: "Compare", color: "red" },
            { to: "/contributors", icon: FaUserFriends, label: "Contributors", color: "pink"}
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 group ${
                location.pathname === item.to
                  ? isDark
                    ? `bg-${item.color}-900/30 text-${item.color}-400`
                    : `bg-${item.color}-50 text-${item.color}-600`
                  : isDark
                    ? "hover:bg-gray-800/70"
                    : "hover:bg-gray-100/70"
              } border ${
                isDark ? "border-transparent hover:border-gray-700/50" : "border-transparent hover:border-gray-200/50"
              }`}
              onClick={closeMenu}
            >
              <item.icon className={`text-${item.color}-400 group-hover:scale-110 transition-transform duration-200`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}

          {/* Mobile Tools Dropdown */}
          <div className="space-y-2">
            <button
              onClick={toggleMobileTools}
              className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300 group ${
                isToolsActive()
                  ? isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : isDark
                    ? "hover:bg-gray-800/70"
                    : "hover:bg-gray-100/70"
              } border ${
                isDark ? "border-transparent hover:border-gray-700/50" : "border-transparent hover:border-gray-200/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <FaTools className="text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Tools</span>
              </div>
              <FaChevronDown className={`transform transition-transform duration-300 ${
                isMobileToolsOpen ? "rotate-180" : ""
              }`} />
            </button>

            {isMobileToolsOpen && (
              <div className="ml-4 space-y-1">
                {[
                  { to: "/code-tools", icon: FaTools, label: "All Tools", color: "blue" },
                  { to: "/test-case-generator", icon: FaVial, label: "Test Case Generator", color: "green" },
                  { to: "/code-beautifier", icon: FaPaintBrush, label: "Code Beautifier", color: "pink" },
                  { to: "/error-debugger", icon: FaBug, label: "Error Debugger", color: "red" },
                  { to: "/performance-analyzer", icon: FaTachometerAlt, label: "Performance Analyzer", color: "yellow" },
                  { to: "/content-summarizer", icon: FaAlignLeft, label: "Content Summarizer", color: "purple" },
                  { to: "/security-scanner", icon: FaShieldAlt, label: "Security Scanner", color: "red" }
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                      isDark
                        ? "hover:bg-gray-800/50 text-gray-300"
                        : "hover:bg-gray-100/50 text-gray-700"
                    }`}
                    onClick={closeMenu}
                  >
                    <item.icon className={`text-${item.color}-400 text-sm group-hover:scale-110 transition-transform duration-200`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Company Dropdown */}
          <div className="space-y-2">
            <button
              onClick={toggleMobileCompany}
              className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300 group ${
                isCompanyActive()
                  ? isDark
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-50 text-purple-600"
                  : isDark
                    ? "hover:bg-gray-800/70"
                    : "hover:bg-gray-100/70"
              } border ${
                isDark ? "border-transparent hover:border-gray-700/50" : "border-transparent hover:border-gray-200/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <FaRegBuilding className="text-indigo-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Company</span>
              </div>
              <FaChevronDown className={`transform transition-transform duration-300 ${
                isMobileCompanyOpen ? "rotate-180" : ""
              }`} />
            </button>

            {isMobileCompanyOpen && (
              <div className="ml-4 space-y-1">
                {[
                  { to: "/about", icon: FaUsers, label: "About Us", color: "blue" },
                  { to: "/team", icon: FaUserFriends, label: "Our Team", color: "green" },
                  { to: "/contribute", icon: FaHandsHelping, label: "Contribute", color: "yellow" },
                  { to: "/contributor-guide", icon: FaBookOpen, label: "Contributor Guide", color: "indigo" },
                  { to: "/contact", icon: FaEnvelope, label: "Contact Us", color: "purple" },
                  { to: "/privacy-policy", icon: FaShieldAlt, label: "Privacy Policy", color: "red" },
                  { to: "/terms-of-service", icon: FaFileContract, label: "Terms of Service", color: "gray" }
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                      isDark
                        ? "hover:bg-gray-800/50 text-gray-300"
                        : "hover:bg-gray-100/50 text-gray-700"
                    }`}
                    onClick={closeMenu}
                  >
                    <item.icon className={`text-${item.color}-400 text-sm group-hover:scale-110 transition-transform duration-200`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* End Mobile menu items */}
        {/* Theme toggle for mobile sidebar */}
        <div className={`mt-8 pt-6 border-t ${isDark ? "border-gray-800/50" : "border-gray-200/50"}`}>
          <div className="flex items-center justify-between px-4">
            <span className="font-medium text-lg">Theme</span>
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group ${
                isDark
                  ? "bg-gray-800/70 hover:bg-gray-700/70 text-yellow-400"
                  : "bg-gray-100/70 hover:bg-gray-200/70 text-blue-600"
              } shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              {isDark ? (
                <>
                  <FaSun />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FaMoon />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* End Mobile Navigation Sidebar */}
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(147,51,234,0.5),
                       0 0 30px rgba(147,51,234,0.3); 
          }
          50% { 
            box-shadow: 0 0 25px rgba(147,51,234,0.8),
                       0 0 40px rgba(147,51,234,0.5); 
          }
        }

        .animate-in {
          animation: slideInRight 0.3s ease-out forwards;
        }

        .slide-in-from-top-2 {
          animation: slideInFromTop 0.2s ease-out forwards;
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Ensure backdrop blur works properly */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .backdrop-blur-2xl {
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* Custom scrollbar for mobile menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </>
  );
}

export default NavBar;
