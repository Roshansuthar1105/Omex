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
  FaUsers,
  FaUserFriends,
  FaHandsHelping,
  FaQuestionCircle,
  FaShieldAlt,
  FaFileContract,
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

  // Common styles for links/icons
  const linkBase =
    "transition-colors duration-200 hover:underline space-x-2 text-sm";
  const iconClass = "mr-2 text-xs";

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div
          className="fixed bottom-4 right-4 text-white px-4 py-2 rounded-lg shadow-xl z-50 transition-all duration-300"
          style={{
            background: "rgba(34, 197, 94, 0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
            Subscribed successfully!
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`relative border-t ${
          isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
        }`}
        style={{
          boxShadow: isDark
            ? "0 -12px 40px rgba(99, 102, 241, 0.3), 0 -8px 24px rgba(139, 92, 246, 0.2), 0 -4px 16px rgba(0, 0, 0, 0.3)"
            : "0 -12px 40px rgba(99, 102, 241, 0.2), 0 -8px 24px rgba(139, 92, 246, 0.15), 0 -4px 16px rgba(0, 0, 0, 0.06)",
        }}
      >
       <div className="max-w-7xl mx-auto px-6">
  {/* Main Footer Content */}
  <div className=" pt-5 sm:pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-16">
    
    {/* Brand Section */}
    <div className="space-y-6 flex flex-col items-start ">
      <img
        src={isDark ? "/omex-text-logo-white.svg" : "/omex-text-logo.svg"}
        alt="Omex AI Logo"
        className="h-12 w-auto"
      />
      <p
        className={`text-base leading-relaxed max-w-lg ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Elevate your code with AI-powered optimization, analysis, and generation tools. OMEX helps developers write better, cleaner, and more efficient code.
      </p>
      <div className="flex space-x-4">
        {[
          { href: "https://github.com/Roshansuthar1105/Omex", icon: FaGithub },
          { href: "https://twitter.com", icon: BsTwitterX },
          { href: "https://linkedin.com/in/roshansuthar", icon: FaLinkedin },
          { href: "https://discord.com/users/1317732270047498343", icon: FaDiscord },
        ].map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-md transition-all duration-300 transform hover:scale-110 hover:bg-indigo-500 hover:text-white ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <social.icon size={18} />
          </a>
        ))}
      </div>
    </div>

    {/* Company & Legal Section */}
    <div className="flex flex-col space-y-4  sm:ml-20 sm:mr-20  mt-5 sm:mt-0 ">
      <h3
        className={`text-lg font-semibold border-b pb-2 ${
          isDark ? "border-gray-700 text-gray-200" : "border-gray-300 text-gray-900"
        }`}
      >
        Company & Legal
      </h3>
      <ul className="space-y-2">
        {[
          { to: "/about", icon: FaUsers, label: "About Us" },
          { to: "/team", icon: FaUserFriends, label: "Our Team" },
          { to: "/contribute", icon: FaHandsHelping, label: "Contribute" },
          { to: "/contact", icon: FaEnvelope, label: "Contact Us" },
          { to: "/feedback", icon: FaComment, label: "Feedback" },
          { to: "/faq", icon: FaQuestionCircle, label: "FAQ" },
          { to: "/privacy-policy", icon: FaShieldAlt, label: "Privacy Policy" },
          { to: "/terms-of-service", icon: FaFileContract, label: "Terms of Service" },
        ].map((link, idx) => (
          <li key={idx}>
            <Link
              to={link.to}
              className={`flex items-center gap-2 text-sm  transition-all duration-300 hover:text-indigo-500 ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <link.icon className="text-base" /> {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Newsletter Section */}
    <div className="flex flex-col space-y-4 mt-5 sm:mt-0">
      <h3
        className={`text-lg font-semibold border-b pb-2 ${
         isDark ? "border-gray-700 text-gray-200" : "border-gray-300 text-gray-900"
        }`}
      >
        Stay Updated
      </h3>
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Get the latest updates and features.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className={`flex-1 px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 transition-all ${
            isDark
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-indigo-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"
          }`}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:scale-105 transform transition-all duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>

  {/* Bottom Bar */}
  <div
    className={`mt-6 py-6 flex flex-col md:flex-row justify-between items-center border-t ${
      isDark ? "border-gray-800" : "border-gray-200"
    }`}
  >
    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
      © {currentYear} OMEX. All rights reserved.
    </p>
    <div className="flex items-center space-x-2 my-2 md:my-0">
      <span className="text-xs text-gray-500">Made with</span>
      <FaHeart className="text-red-500 text-xs animate-pulse" />
      <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        by OMEX Team
      </span>
    </div>
    <a
      href="mailto:contact@omex.com"
      className={`flex items-center gap-2 text-sm ${
        isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <FaEnvelope size={14} /> contact@omex.com
    </a>
  </div>
</div>

      </footer>
    </>
  );
};

export default Footer;