import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaLightbulb, FaRobot, FaChartLine, FaExchangeAlt, FaBars, FaTimes, FaTools, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} py-4 px-4 md:px-8 w-full shadow-lg transition-colors duration-300`}>
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
          <div className="hidden md:flex items-center space-x-6">
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
            <Link to="/code-tools" className={`flex items-center space-x-1 py-2 ${isActive('/code-tools')}`}>
              <FaTools className="text-blue-400" />
              <span>Tools</span>
            </Link>
            <Link to="/about" className={`flex items-center space-x-1 py-2 ${isActive('/about')}`}>
              <span>About</span>
            </Link>

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
          <div className="md:hidden flex items-center space-x-2">
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
          <div className={`md:hidden mt-4 py-2 space-y-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
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
            <Link
              to="/code-tools"
              className={`block py-2 px-2 rounded ${isActive('/code-tools')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <FaTools className="text-blue-400" />
                <span>Tools</span>
              </div>
            </Link>
            <Link
              to="/about"
              className={`block py-2 px-2 rounded ${isActive('/about')} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <span>About</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;