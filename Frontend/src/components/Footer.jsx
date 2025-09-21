import {
  FaAlignLeft,
  FaBug,
  FaChartLine,
  FaCode,
  FaComment,
  FaEnvelope,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaDiscord,
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
        <div 
          className="fixed bottom-4 right-4 text-white px-4 py-2 rounded-lg shadow-xl z-50 transition-all duration-300"
          style={{
            background: 'rgba(34, 197, 94, 0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
            Subscribed successfully!
          </div>
        </div>
      )}

      {/* Footer - Clean Design with Purple Backdrop Shadow */}
      <footer 
        className={`relative border-t ${
          isDark 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-gray-50 border-gray-200'
        }`}
        style={{
          boxShadow: isDark 
            ? '0 -12px 40px rgba(99, 102, 241, 0.3), 0 -8px 24px rgba(139, 92, 246, 0.2), 0 -4px 16px rgba(0, 0, 0, 0.3)'
            : '0 -12px 40px rgba(99, 102, 241, 0.2), 0 -8px 24px rgba(139, 92, 246, 0.15), 0 -4px 16px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Content */}
          <div className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Half - Brand Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src={isDark ? "/omex-text-logo-white.svg" : "/omex-text-logo.svg"}
                    alt="Omex AI Logo" 
                    className="h-12 w-auto" 
                  />
                </div>
                <p className={`text-base leading-relaxed max-w-lg ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  Elevate your code with AI-powered optimization, analysis, and generation tools. OMEX helps developers write better, cleaner, and more efficient code with intelligent automation and advanced debugging capabilities.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-3">
                  {[
                    { href: "https://github.com/Roshansuthar1105/Omex", icon: FaGithub },
                    { href: "https://twitter.com", icon: BsTwitterX },
                    { href: "https://linkedin.com/in/roshansuthar", icon: FaLinkedin },
                    { href: "https://discord.com/users/1317732270047498343", icon: FaDiscord }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-md transition-all duration-200 ${
                        isDark 
                          ? "text-gray-400 hover:text-white hover:bg-gray-800" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Half - Newsletter Section */}
              <div className="flex justify-end">
                <div className="w-full max-w-sm">
                  <h3 className={`text-sm font-medium mb-4 ${
                    isDark ? "text-gray-200" : "text-gray-900"
                  }`}>
                    Stay Updated
                  </h3>
                  <p className={`text-sm mb-6 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Get the latest updates and features.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className={`w-full px-3 py-2 text-sm rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      required
                    />
                    <button
                      type="submit"
                      className="w-full px-3 py-2 text-sm font-medium text-white rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
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
                      to="/feedback"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className={`flex items-center ${linkBase}`}
                    >
                      <FaComment className={iconClass} /> Feedback
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
          {/* Bottom Bar */}
          <div 
            className={`py-6 flex flex-col md:flex-row justify-between items-center border-t ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
                © {currentYear} OMEX. All rights reserved.
              </p>
              <div className="flex items-center space-x-1">
                <span className={`text-xs ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}>
                  Made with
                </span>
                <FaHeart className="text-red-500 text-xs animate-pulse" />
                <span className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                  by OMEX Team
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center space-x-4">
              <a
                href="mailto:contact@omex.com"
                className={`flex items-center space-x-2 text-sm transition-colors duration-200 ${
                  isDark 
                    ? "text-gray-400 hover:text-gray-200" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FaEnvelope size={14} />
                <span>contact@omex.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;