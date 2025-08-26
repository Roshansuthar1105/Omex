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
  FaTwitter,
  FaUserFriends,
  FaUsers,
  FaVial
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  const linkBase = `${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition duration-200`;
  const iconClass = 'mr-2 text-sm';

  return (
    <footer className={`glass bg-gradient-blue/90 shadow-2xl mt-auto py-12 transition-colors duration-300`}> 
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <FaCode className="text-blue-400 text-3xl mr-3 drop-shadow-lg" />
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">OMEX</h2>
            </div>
            <p className="text-gray-200 mb-6 max-w-md font-medium">
              Elevate your code with AI-powered optimization, analysis, and generation tools. OMEX helps developers write better, cleaner, and more efficient code.
            </p>
            <div className="flex space-x-6 mb-6">
              <a href="https://github.com/Roshansuthar1105/Omex" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition duration-200">
                <FaGithub size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com/in/roshansuthar" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition duration-200">
                <FaLinkedin size={24} />
              </a>
              <a href="https://discord.com/users/1317732270047498343" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition duration-200">
                <FaDiscord size={24} />
              </a>
            </div>
            <div className="flex items-center text-blue-200">
              <FaEnvelope className="mr-2" />
              <a href="mailto:contact@omex.com" className="hover:text-blue-100 transition duration-200">
                contact@omex.com
              </a>
            </div>
          </div>

          {/* Main Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-200/40 pb-2">Main Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/optimiser" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaRocket className="mr-2 text-lg" /> Code Optimizer
                </Link>
              </li>
              <li>
                <Link to="/codegenerator" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaMagic className="mr-2 text-lg" /> Code Generator
                </Link>
              </li>
              <li>
                <Link to="/codecomplexity" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaChartLine className="mr-2 text-lg" /> Code Complexity
                </Link>
              </li>
              <li>
                <Link to="/codecompare" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaExchangeAlt className="mr-2 text-lg" /> Code Compare
                </Link>
              </li>
              <li>
                <Link to="/code-tools" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaTools className="mr-2 text-lg" /> All Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-200/40 pb-2">Code Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/test-case-generator" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaVial className="mr-2 text-lg" /> Test Case Generator
                </Link>
              </li>
              <li>
                <Link to="/code-beautifier" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaPaintBrush className="mr-2 text-lg" /> Code Beautifier
                </Link>
              </li>
              <li>
                <Link to="/error-debugger" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaBug className="mr-2 text-lg" /> Error Debugger
                </Link>
              </li>
              <li>
                <Link to="/performance-analyzer" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaTachometerAlt className="mr-2 text-lg" /> Performance Analyzer
                </Link>
              </li>
              <li>
                <Link to="/content-summarizer" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaAlignLeft className="mr-2 text-lg" /> Content Summarizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-200/40 pb-2">Company & Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaUsers className="mr-2 text-lg" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaUserFriends className="mr-2 text-lg" /> Our Team
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaHandsHelping className="mr-2 text-lg" /> Contribute
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaEnvelope className="mr-2 text-lg" /> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaQuestionCircle className="mr-2 text-lg" /> FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaShieldAlt className="mr-2 text-lg" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="flex items-center text-blue-100 hover:text-white font-medium transition duration-200">
                  <FaFileContract className="mr-2 text-lg" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-blue-200/30 pt-6 text-center text-blue-200 text-sm">
          &copy; {currentYear} OMEX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;