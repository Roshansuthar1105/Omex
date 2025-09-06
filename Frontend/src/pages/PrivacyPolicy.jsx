import React from 'react';
import { useState, useEffect } from 'react';
import { FaShieldAlt, FaLock, FaEye, FaUserShield, FaDatabase, FaHandshake } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader'

const PrivacyPolicy = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const lastUpdated = 'June 15, 2023';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('data-section');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', icon: FaHandshake },
    { id: 'information', title: 'Information We Collect', icon: FaDatabase },
    { id: 'usage', title: 'How We Use Your Information', icon: FaEye },
    { id: 'security', title: 'Data Security', icon: FaLock },
    { id: 'rights', title: 'Your Rights', icon: FaUserShield },
    { id: 'changes', title: 'Changes to Policy', icon: FaShieldAlt },
    { id: 'contact', title: 'Contact Us', icon: FaHandshake }
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Loader fullscreen size="xl" color="purple" text="Our Privacy Policy ..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800'
    }`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 opacity-10 ${isDark ? 'bg-blue-600' : 'bg-purple-600'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent transform -skew-y-12 translate-y-1/2"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 shadow-2xl">
              <FaShieldAlt className="text-white text-3xl" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            
            <div className={`inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border ${
              isDark 
                ? 'bg-gray-800/50 border-gray-600 text-gray-300' 
                : 'bg-white/50 border-gray-200 text-gray-600'
            }`}>
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:w-1/4">
            <div className={`sticky top-8 rounded-2xl backdrop-blur-sm border p-6 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/70 border-gray-200 shadow-xl'
            }`}>
              <h3 className="font-bold mb-4 text-lg">Contents</h3>
              <nav className="space-y-2">
                {tableOfContents.map(({ id, title, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                      activeSection === id
                        ? `${isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`
                        : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span className="text-sm font-medium">{title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className={`rounded-2xl backdrop-blur-sm border p-8 md:p-12 shadow-2xl ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/70 border-gray-200'
            }`}>
              
              {/* Introduction */}
              <section className="mb-16" data-section="introduction">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 ${
                    isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <FaHandshake className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">Introduction</h2>
                </div>
                
                <div className="space-y-6">
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Welcome to OMEX ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                  </p>
                  <div className={`p-6 rounded-xl border-l-4 border-blue-500 ${
                    isDark ? 'bg-blue-900/20' : 'bg-blue-50'
                  }`}>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      By accessing or using OMEX, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Information We Collect */}
              <section className="mb-16" data-section="information">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 ${
                    isDark ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                  }`}>
                    <FaDatabase className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">Information We Collect</h2>
                </div>
                
                <div className="space-y-8">
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                        isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                      }`}>2.1</span>
                      Personal Information
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Create an account',
                        'Use our services',
                        'Subscribe to our newsletter',
                        'Contact our support team',
                        'Participate in surveys or promotions'
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center p-3 rounded-lg ${
                          isDark ? 'bg-gray-800/50' : 'bg-white/50'
                        }`}>
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      This information may include your name, email address, and payment information.
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                        isDark ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
                      }`}>2.2</span>
                      Usage Data
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      We automatically collect certain information when you visit, use, or navigate our platform:
                    </p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {[
                        'IP address',
                        'Browser type and version',
                        'Device type',
                        'Operating system',
                        'Pages visited and features used',
                        'Time and date of your visit'
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center p-3 rounded-lg ${
                          isDark ? 'bg-gray-800/50' : 'bg-white/50'
                        }`}>
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              
              {/* How We Use Your Information */}
              <section className="mb-16" data-section="usage">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 ${
                    isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    <FaEye className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">How We Use Your Information</h2>
                </div>
                
                <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  We use the information we collect for various purposes, including:
                </p>
                
                <div className="grid gap-4">
                  {[
                    { text: 'Providing, maintaining, and improving our services', color: 'blue' },
                    { text: 'Processing transactions and managing your account', color: 'purple' },
                    { text: 'Responding to your inquiries and support requests', color: 'green' },
                    { text: 'Sending you updates, newsletters, and marketing communications', color: 'yellow' },
                    { text: 'Analyzing usage patterns to enhance user experience', color: 'pink' },
                    { text: 'Protecting against unauthorized access and fraud', color: 'red' },
                    { text: 'Complying with legal obligations', color: 'indigo' }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl border-l-4 border-${item.color}-500 ${
                      isDark ? `bg-${item.color}-900/10` : `bg-${item.color}-50`
                    } hover:scale-105 transition-transform duration-200`}>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Data Security */}
              <section className="mb-16" data-section="security">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 ${
                    isDark ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'
                  }`}>
                    <FaLock className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">Data Security</h2>
                </div>
                
                <div className={`p-8 rounded-xl border ${
                  isDark 
                    ? 'bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-700' 
                    : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                }`}>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>
              </section>
              
              {/* Your Rights */}
              <section className="mb-16" data-section="rights">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 ${
                    isDark ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    <FaUserShield className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">Your Rights</h2>
                </div>
                
                <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    'Accessing your personal information',
                    'Correcting inaccurate or incomplete information',
                    'Requesting deletion of your personal information',
                    'Restricting or objecting to processing',
                    'Data portability',
                    'Withdrawing consent'
                  ].map((right, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${
                      isDark 
                        ? 'bg-indigo-900/10 border-indigo-800 hover:bg-indigo-900/20' 
                        : 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                    } transition-colors duration-200`}>
                      <div className="flex items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          {index + 1}
                        </span>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{right}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={`p-6 rounded-xl border-l-4 border-indigo-500 ${
                  isDark ? 'bg-indigo-900/20' : 'bg-indigo-50'
                }`}>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    To exercise these rights, please contact us at <span className="font-semibold text-indigo-500">privacy@omex.com</span>.
                  </p>
                </div>
              </section>
              
              {/* Changes to Policy */}
              <section className="mb-16" data-section="changes">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 ${
                    isDark ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <FaShieldAlt className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">Changes to This Privacy Policy</h2>
                </div>
                
                <div className={`p-6 rounded-xl ${
                  isDark 
                    ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20' 
                    : 'bg-gradient-to-r from-yellow-50 to-orange-50'
                }`}>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </div>
              </section>
              
              {/* Contact Us */}
              <section data-section="contact">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 ${
                    isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    <FaHandshake className="text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold">Contact Us</h2>
                </div>
                
                <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  If you have any questions or concerns about this Privacy Policy, please contact us:
                </p>
                
                <div className={`p-8 rounded-2xl border-2 border-dashed ${
                  isDark 
                    ? 'border-green-600 bg-gradient-to-br from-green-900/20 to-blue-900/20' 
                    : 'border-green-300 bg-gradient-to-br from-green-50 to-blue-50'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className={`font-bold w-20 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Email:</span>
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>privacy@omex.com</span>
                    </div>
                    <div className="flex items-start">
                      <span className={`font-bold w-20 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Address:</span>
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>123 Tech Street, San Francisco, CA 94105, USA</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-bold w-20 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Phone:</span>
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;