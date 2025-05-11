import React from 'react';
import { FaLightbulb, FaRobot, FaChartLine, FaExchangeAlt, FaCode, FaUsers, FaTools, FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} py-12 px-4`}>
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About OMEX</h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            An AI-powered platform designed to help developers write better, cleaner, and more efficient code.
          </p>
        </div>

        {/* Mission Section */}
        <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg p-8 mb-16 shadow-xl`}>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
            At OMEX, we believe that every developer deserves access to tools that can help them improve their coding skills and produce high-quality software. Our mission is to leverage the power of artificial intelligence to provide developers with insights, suggestions, and optimizations that make their code more efficient, readable, and maintainable.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaLightbulb className="text-yellow-400" />}
              title="Code Optimization"
              description="Analyze your code and receive suggestions for improving performance, readability, and maintainability."
            />
            <FeatureCard
              icon={<FaRobot className="text-green-400" />}
              title="Code Generation"
              description="Generate code snippets and solutions based on your requirements and specifications."
            />
            <FeatureCard
              icon={<FaChartLine className="text-purple-400" />}
              title="Complexity Analysis"
              description="Understand the time and space complexity of your algorithms and identify potential bottlenecks."
            />
            <FeatureCard
              icon={<FaExchangeAlt className="text-red-400" />}
              title="Code Comparison"
              description="Compare different versions of your code to identify changes, improvements, and potential issues."
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose OMEX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReasonCard
              icon={<FaCode className="text-blue-400" />}
              title="Advanced AI"
              description="Powered by state-of-the-art AI models specifically trained on code analysis and optimization."
            />
            <ReasonCard
              icon={<FaUsers className="text-blue-400" />}
              title="Developer-Focused"
              description="Built by developers, for developers, with a focus on practical, actionable insights."
            />
            <ReasonCard
              icon={<FaTools className="text-blue-400" />}
              title="Comprehensive Tools"
              description="A complete suite of tools for all aspects of code quality and improvement."
            />
          </div>
        </div>

        {/* Technology Stack */}
        <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg p-8 mb-16 shadow-xl`}>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <TechItem name="React" />
            <TechItem name="Node.js" />
            <TechItem name="Express" />
            <TechItem name="Tailwind CSS" />
            <TechItem name="Google Gemini AI" />
            <TechItem name="Prism.js" />
            <TechItem name="React Router" />
            <TechItem name="Axios" />
          </div>
        </div>

        {/* Team Section (Optional) */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            We're a passionate team of developers, designers, and AI enthusiasts dedicated to creating tools that make coding better for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description }) => {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

const ReasonCard = ({ icon, title, description }) => {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 shadow-lg text-center`}>
      <div className="text-3xl mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

const TechItem = ({ name }) => {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? 'bg-gray-800 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg p-4 shadow-md transition-colors duration-200`}>
      <p className="font-medium">{name}</p>
    </div>
  );
};

export default About;
