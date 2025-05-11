import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaCode,
  FaHeart,
  FaEnvelope,
  FaQuestionCircle,
  FaShieldAlt,
  FaFileContract,
  FaUsers
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  return (
    <footer className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} py-12 mt-auto transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <FaCode className="text-blue-400 text-2xl mr-2" />
              <h2 className="text-2xl font-bold">OMEX</h2>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 max-w-md`}>
              Elevate your code with AI-powered optimization, analysis, and generation tools. OMEX helps developers write better, cleaner, and more efficient code.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-200`}>
                <FaGithub size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-200`}>
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-200`}>
                <FaLinkedin size={20} />
              </a>
            </div>
            <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <FaEnvelope className="mr-2" />
              <a href="mailto:contact@omex.com" className="text-blue-400 hover:text-blue-300 transition duration-200">
                contact@omex.com
              </a>
            </div>
          </div>

          {/* Main Features */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-2`}>Main Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/optimiser" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Code Optimizer</Link>
              </li>
              <li>
                <Link to="/codegenerator" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Code Generator</Link>
              </li>
              <li>
                <Link to="/codecomplexity" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Code Complexity</Link>
              </li>
              <li>
                <Link to="/codecompare" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Code Compare</Link>
              </li>
              <li>
                <Link to="/code-tools" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>All Tools</Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-2`}>Code Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/test-case-generator" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Test Case Generator</Link>
              </li>
              <li>
                <Link to="/code-beautifier" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Code Beautifier</Link>
              </li>
              <li>
                <Link to="/error-debugger" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Error Debugger</Link>
              </li>
              <li>
                <Link to="/performance-analyzer" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Performance Analyzer</Link>
              </li>
              <li>
                <Link to="/content-summarizer" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Content Summarizer</Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-2`}>Company & Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className={`flex items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>
                  <FaUsers className="mr-2 text-sm" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Our Team</Link>
              </li>
              <li>
                <Link to="/contact" className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className={`flex items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>
                  <FaQuestionCircle className="mr-2 text-sm" /> FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className={`flex items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>
                  <FaShieldAlt className="mr-2 text-sm" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className={`flex items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`}>
                  <FaFileContract className="mr-2 text-sm" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup (Optional) */}
        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-300'} mt-10 pt-10 pb-6`}>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Subscribe to our newsletter for the latest updates, features, and tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className={`px-4 py-2 rounded-md ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-800'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs w-full mx-auto sm:mx-0`}
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 font-medium"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-300'} mt-6 pt-6 text-center ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          <p className="flex items-center justify-center">
            &copy; {currentYear} OMEX. All rights reserved. Made with <FaHeart className="text-red-500 mx-1" /> by OMEX Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
