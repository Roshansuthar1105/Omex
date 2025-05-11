import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  FaFileContract
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

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
    return location.pathname === path ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400';
  };

  const isToolsActive = () => {
    const toolsPaths = ['/code-tools', '/test-case-generator', '/code-beautifier', '/error-debugger', '/performance-analyzer', '/content-summarizer'];
    return toolsPaths.some(path => location.pathname === path);
  };

  const isCompanyActive = () => {
    const companyPaths = ['/about', '/team', '/contact', '/faq', '/privacy-policy', '/terms-of-service'];
    return companyPaths.some(path => location.pathname === path);
  };

  return (
    <nav className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} py-4 px-4 md:px-8 w-full shadow-lg transition-colors duration-300 sticky top-0 z-50`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaCode className="text-blue-400 text-2xl" />
            <h1 className="text-xl md:text-2xl font-bold">
              <Link to="/" className="hover:text-blue-400 transition duration-200">
                OMEX
              </Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className={`flex items-center space-x-1 py-2 ${isActive('/')}`}>
              <span>Home</span>
            </Link>
            <Link to="/optimiser" className={`flex items-center space-x-1 py-2 ${isActive('/optimiser')}`}>
              <FaLightbulb className="text-yellow-400" />
              <span>Optimize</span>
            </Link>
            <Link to="/codegenerator" className={`flex items-center space-x-1 py-2 ${isActive('/codegenerator')}`}>
              <FaRobot className="text-green-400" />
              <span>Generate</span>
            </Link>
            <Link to="/codecomplexity" className={`flex items-center space-x-1 py-2 ${isActive('/codecomplexity')}`}>
              <FaChartLine className="text-purple-400" />
              <span>Complexity</span>
            </Link>
            <Link to="/codecompare" className={`flex items-center space-x-1 py-2 ${isActive('/codecompare')}`}>
              <FaExchangeAlt className="text-red-400" />
              <span>Compare</span>
            </Link>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={toggleToolsDropdown}
                className={`flex items-center space-x-1 py-2 ${isToolsActive() ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'}`}
              >
                <FaTools className="text-blue-400" />
                <span>Tools</span>
                {isToolsDropdownOpen ? <FaChevronUp className="ml-1 text-xs" /> : <FaChevronDown className="ml-1 text-xs" />}
              </button>

              {isToolsDropdownOpen && (
                <div className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } ring-1 ring-black ring-opacity-5 z-50`}>
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/code-tools"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      All Tools
                    </Link>
                    <Link
                      to="/test-case-generator"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Test Case Generator
                    </Link>
                    <Link
                      to="/code-beautifier"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Code Beautifier
                    </Link>
                    <Link
                      to="/error-debugger"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Error Debugger
                    </Link>
                    <Link
                      to="/performance-analyzer"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Performance Analyzer
                    </Link>
                    <Link
                      to="/content-summarizer"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      Content Summarizer
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCompanyDropdown}
                className={`flex items-center space-x-1 py-2 ${isCompanyActive() ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'}`}
              >
                <span>Company</span>
                {isCompanyDropdownOpen ? <FaChevronUp className="ml-1 text-xs" /> : <FaChevronDown className="ml-1 text-xs" />}
              </button>

              {isCompanyDropdownOpen && (
                <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } ring-1 ring-black ring-opacity-5 z-50`}>
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/about"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaUsers className="inline mr-2" />
                      About Us
                    </Link>
                    <Link
                      to="/team"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      Our Team
                    </Link>
                    <Link
                      to="/contact"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaEnvelope className="inline mr-2" />
                      Contact Us
                    </Link>
                    <Link
                      to="/faq"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaQuestionCircle className="inline mr-2" />
                      FAQ
                    </Link>
                    <Link
                      to="/privacy-policy"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      <FaShieldAlt className="inline mr-2" />
                      Privacy Policy
                    </Link>
                    <Link
                      to="/terms-of-service"
                      className={`block px-4 py-2 text-sm ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
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
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
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
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
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
              className={`${isDark ? 'text-white' : 'text-gray-800'} focus:outline-none`}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden mt-4 py-2 space-y-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <Link
              to="/"
              className={`block py-2 px-2 rounded ${isActive('/')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaCode className="text-blue-400" />
                <span>Home</span>
              </div>
            </Link>
            <Link
              to="/optimiser"
              className={`block py-2 px-2 rounded ${isActive('/optimiser')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaLightbulb className="text-yellow-400" />
                <span>Optimize</span>
              </div>
            </Link>
            <Link
              to="/codegenerator"
              className={`block py-2 px-2 rounded ${isActive('/codegenerator')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaRobot className="text-green-400" />
                <span>Generate</span>
              </div>
            </Link>
            <Link
              to="/codecomplexity"
              className={`block py-2 px-2 rounded ${isActive('/codecomplexity')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaChartLine className="text-purple-400" />
                <span>Complexity</span>
              </div>
            </Link>
            <Link
              to="/codecompare"
              className={`block py-2 px-2 rounded ${isActive('/codecompare')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaExchangeAlt className="text-red-400" />
                <span>Compare</span>
              </div>
            </Link>

            {/* Mobile Tools Dropdown */}
            <div className="py-2 px-2">
              <button
                onClick={toggleToolsDropdown}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center space-x-2">
                  <FaTools className="text-blue-400" />
                  <span>Tools</span>
                </div>
                {isToolsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {isToolsDropdownOpen && (
                <div className={`mt-2 pl-6 space-y-2 border-l-2 ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                  <Link
                    to="/code-tools"
                    className={`block py-2 px-2 rounded ${isActive('/code-tools')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    All Tools
                  </Link>
                  <Link
                    to="/test-case-generator"
                    className={`block py-2 px-2 rounded ${isActive('/test-case-generator')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    Test Case Generator
                  </Link>
                  <Link
                    to="/code-beautifier"
                    className={`block py-2 px-2 rounded ${isActive('/code-beautifier')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    Code Beautifier
                  </Link>
                  <Link
                    to="/error-debugger"
                    className={`block py-2 px-2 rounded ${isActive('/error-debugger')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    Error Debugger
                  </Link>
                  <Link
                    to="/performance-analyzer"
                    className={`block py-2 px-2 rounded ${isActive('/performance-analyzer')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    Performance Analyzer
                  </Link>
                  <Link
                    to="/content-summarizer"
                    className={`block py-2 px-2 rounded ${isActive('/content-summarizer')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    Content Summarizer
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Company Dropdown */}
            <div className="py-2 px-2">
              <button
                onClick={toggleCompanyDropdown}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center space-x-2">
                  <span>Company</span>
                </div>
                {isCompanyDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {isCompanyDropdownOpen && (
                <div className={`mt-2 pl-6 space-y-2 border-l-2 ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                  <Link
                    to="/about"
                    className={`block py-2 px-2 rounded ${isActive('/about')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-blue-400" />
                      <span>About Us</span>
                    </div>
                  </Link>
                  <Link
                    to="/team"
                    className={`block py-2 px-2 rounded ${isActive('/team')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    Our Team
                  </Link>
                  <Link
                    to="/contact"
                    className={`block py-2 px-2 rounded ${isActive('/contact')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-blue-400" />
                      <span>Contact Us</span>
                    </div>
                  </Link>
                  <Link
                    to="/faq"
                    className={`block py-2 px-2 rounded ${isActive('/faq')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <FaQuestionCircle className="text-blue-400" />
                      <span>FAQ</span>
                    </div>
                  </Link>
                  <Link
                    to="/privacy-policy"
                    className={`block py-2 px-2 rounded ${isActive('/privacy-policy')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <FaShieldAlt className="text-blue-400" />
                      <span>Privacy Policy</span>
                    </div>
                  </Link>
                  <Link
                    to="/terms-of-service"
                    className={`block py-2 px-2 rounded ${isActive('/terms-of-service')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center space-x-2">
                      <FaFileContract className="text-blue-400" />
                      <span>Terms of Service</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;