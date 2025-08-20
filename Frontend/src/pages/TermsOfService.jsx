import React from 'react';
import { useState, useEffect } from 'react';
import { FaFileContract } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader';

const TermsOfService = () => {
  const { isDark } = useTheme();
  const [ loading, setLoading ] = useState(true); 
  const lastUpdated = 'June 15, 2023';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Loader fullscreen size="xl" color="purple" text="Our Terms Of Service..." />
      </div>
    );
  }
  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaFileContract className="text-blue-400 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Last Updated: {lastUpdated}
          </p>
        </div>
        
        {/* Terms Content */}
        <div className={`max-w-4xl mx-auto rounded-lg shadow-lg p-8 ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              By accessing or using OMEX ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
            </p>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We reserve the right to modify these Terms at any time. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              OMEX provides a platform for code optimization, generation, analysis, and other developer tools powered by artificial intelligence. The Service may include various features and functionalities that may be modified, updated, or discontinued at our discretion.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Some features of the Service may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              You agree to provide accurate and complete information when creating your account and to update your information to keep it accurate and current.
            </p>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We reserve the right to suspend or terminate your account if any information provided is found to be inaccurate, incomplete, or violates these Terms.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. User Content</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              You retain ownership of any content you submit to the Service, including code, text, and other materials ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content for the purpose of providing and improving the Service.
            </p>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              You represent and warrant that you have all necessary rights to submit your User Content and that it does not violate any third-party rights or applicable laws.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Prohibited Conduct</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              You agree not to:
            </p>
            <ul className={`list-disc pl-6 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Attempt to gain unauthorized access to the Service or its systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Upload malicious code or content</li>
              <li>Impersonate any person or entity</li>
              <li>Collect user information without consent</li>
              <li>Use the Service to generate harmful or malicious code</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              The Service and its original content, features, and functionality are owned by OMEX and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              To the maximum extent permitted by law, OMEX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className={`list-disc pl-6 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, either express or implied, including but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We do not warrant that the Service will be uninterrupted, secure, or error-free, that defects will be corrected, or that the Service is free of viruses or other harmful components.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className="mb-1"><strong>Email:</strong> legal@omex.com</p>
              <p className="mb-1"><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105, USA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
