import {
  FaAlignLeft,
  FaBug,
  FaChartLine,
  FaCode,
  FaEnvelope,
  FaExchangeAlt,
  FaFileContract,
  FaGithub,
  FaHandsHelping,
  FaHeart,
  FaLinkedin,
  FaDiscord,
  FaMagic,
  FaPaintBrush,
  FaQuestionCircle,
  FaRocket,
  FaShieldAlt,
  FaTachometerAlt,
  FaTools,
  FaUserFriends,
  FaUsers,
  FaVial,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const linkBase = `${
    isDark
      ? "text-gray-400 hover:text-blue-400"
      : "text-gray-600 hover:text-blue-600"
  } transition duration-200`;
  const iconClass = "mr-2 text-sm";

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setShowToast(true);
    setEmail("");
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
          Thank you for subscribing to our newsletter!
        </div>
      )}

      <footer
        className={`${
          isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        } py-12 mt-auto transition-colors duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Logo, description and social links */}
            <div className="lg:w-1/4">
              <div className="flex items-center mb-4">
                <FaCode className="text-blue-400 text-2xl mr-2" />
                <h2 className="text-2xl font-bold">OMEX</h2>
              </div>
              <p
                className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}
              >
                Elevate your code with AI-powered optimization, analysis, and
                generation tools. OMEX helps developers write better, cleaner,
                and more efficient code.
              </p>
              <div className="flex space-x-4 mb-6">
                <a
                  href="https://github.com/Roshansuthar1105/Omex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition duration-200`}
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition duration-200`}
                >
                  <BsTwitterX size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/roshansuthar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition duration-200`}
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://discord.com/users/1317732270047498343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition duration-200`}
                >
                  <FaDiscord size={20} />
                </a>
              </div>
              <div
                className={`flex items-center ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:contact@omex.com"
                  className="text-blue-400 hover:text-blue-300 transition duration-200"
                >
                  contact@omex.com
                </a>
              </div>
            </div>

            {/* Middle sections - Features, Tools, Company */}
            <div className="flex flex-col md:flex-row lg:flex-row flex-1 gap-8">
              {/* Main Features */}
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-4 border-b ${
                    isDark ? "border-gray-700" : "border-gray-300"
                  } pb-2`}
                >
                  Main Features
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/optimiser"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaRocket className={iconClass} /> Code Optimizer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/codegenerator"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaMagic className={iconClass} /> Code Generator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/codecomplexity"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaChartLine className={iconClass} /> Code Complexity
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/codecompare"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaExchangeAlt className={iconClass} /> Code Compare
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/code-tools"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaTools className={iconClass} /> All Tools
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Tools */}
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-4 border-b ${
                    isDark ? "border-gray-700" : "border-gray-300"
                  } pb-2`}
                >
                  Code Tools
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/test-case-generator"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaVial className={iconClass} /> Test Case Generator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/code-beautifier"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaPaintBrush className={iconClass} /> Code Beautifier
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/error-debugger"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaBug className={iconClass} /> Error Debugger
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/performance-analyzer"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaTachometerAlt className={iconClass} /> Performance
                      Analyzer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/content-summarizer"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaAlignLeft className={iconClass} /> Content Summarizer
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company & Legal */}
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-4 border-b ${
                    isDark ? "border-gray-700" : "border-gray-300"
                  } pb-2`}
                >
                  Company & Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaUsers className={iconClass} /> About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/team"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaUserFriends className={iconClass} /> Our Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contribute"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaHandsHelping className={iconClass} /> Contribute
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaEnvelope className={iconClass} /> Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaQuestionCircle className={iconClass} /> FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaShieldAlt className={iconClass} /> Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-of-service"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaFileContract className={iconClass} /> Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Newsletter */}
            <div className="lg:w-1/4">
              <h3
                className={`text-lg font-semibold mb-4 border-b ${
                  isDark ? "border-gray-700" : "border-gray-300"
                } pb-2`}
              >
                Stay Updated
              </h3>
              <p
                className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}
              >
                Subscribe to our newsletter for the latest updates, features,
                and tips.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`px-4 py-2 rounded-md w-full ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 font-medium w-full"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div
            className={`border-t ${
              isDark ? "border-gray-800" : "border-gray-300"
            } mt-8 pt-8 text-center ${
              isDark ? "text-gray-500" : "text-gray-600"
            }`}
          >
            <p className="flex items-center justify-center">
              &copy; {currentYear} OMEX. All rights reserved. Made with{" "}
              <FaHeart className="text-red-500 mx-1" /> by OMEX Team
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
