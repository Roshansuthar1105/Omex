import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const PrivacyPolicy = () => {
  const { isDark } = useTheme();
  const lastUpdated = 'June 15, 2023';

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaShieldAlt className="text-blue-400 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Last Updated: {lastUpdated}
          </p>
        </div>
        
        {/* Policy Content */}
        <div className={`max-w-4xl mx-auto rounded-lg shadow-lg p-8 ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Welcome to OMEX ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              By accessing or using OMEX, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2">2.1 Personal Information</h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className={`list-disc pl-6 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Create an account</li>
              <li>Use our services</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact our support team</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              This information may include your name, email address, and payment information.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">2.2 Usage Data</h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We automatically collect certain information when you visit, use, or navigate our platform. This information may include:
            </p>
            <ul className={`list-disc pl-6 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited and features used</li>
              <li>Time and date of your visit</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We use the information we collect for various purposes, including:
            </p>
            <ul className={`list-disc pl-6 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and managing your account</li>
              <li>Responding to your inquiries and support requests</li>
              <li>Sending you updates, newsletters, and marketing communications</li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Protecting against unauthorized access and fraud</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className={`list-disc pl-6 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Accessing your personal information</li>
              <li>Correcting inaccurate or incomplete information</li>
              <li>Requesting deletion of your personal information</li>
              <li>Restricting or objecting to processing</li>
              <li>Data portability</li>
              <li>Withdrawing consent</li>
            </ul>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              To exercise these rights, please contact us at privacy@omex.com.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Changes to This Privacy Policy</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className="mb-1"><strong>Email:</strong> privacy@omex.com</p>
              <p className="mb-1"><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105, USA</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
