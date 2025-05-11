import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLightbulb,
  FaRobot,
  FaChartLine,
  FaExchangeAlt,
  FaCode,
  FaUsers,
  FaTools,
  FaShieldAlt,
  FaArrowRight,
  FaFileAlt,
  FaHistory,
  FaRocket
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Hero Section */}
      <div className={`py-20 px-4 ${isDark ? 'bg-gray-900' : 'bg-blue-50'} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-600 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 inline-block p-3 bg-blue-600 bg-opacity-20 rounded-full">
            <FaCode className="text-blue-400 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-blue-400">OMEX</span></h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-6`}>
            An AI-powered platform revolutionizing how developers write, optimize, and understand code.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500 bg-opacity-20' : 'bg-blue-100'} mr-4`}>
              <FaRocket className="text-blue-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-6`}>
            At OMEX, we believe that every developer deserves access to tools that can help them improve their coding skills and produce high-quality software. Our mission is to leverage the power of artificial intelligence to provide developers with insights, suggestions, and optimizations that make their code more efficient, readable, and maintainable.
          </p>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
            We're committed to democratizing access to advanced code analysis and optimization techniques, making them available to developers of all skill levels and backgrounds. By combining cutting-edge AI with a deep understanding of software development practices, we aim to elevate the quality of code across the industry.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className={`p-3 rounded-full ${isDark ? 'bg-purple-500 bg-opacity-20' : 'bg-purple-100'} mr-4`}>
              <FaTools className="text-purple-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Core Features</h2>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto text-center mb-10`}>
            Comprehensive tools designed to enhance every aspect of your development workflow
          </p>
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
          <div className="text-center mt-10">
            <Link
              to="/code-tools"
              className={`inline-flex items-center ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-100 hover:bg-blue-200'} px-6 py-3 rounded-lg font-medium transition-all duration-200`}
            >
              Explore All Tools <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className={`p-3 rounded-full ${isDark ? 'bg-green-500 bg-opacity-20' : 'bg-green-100'} mr-4`}>
              <FaUsers className="text-green-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Why Choose OMEX?</h2>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto text-center mb-10`}>
            What sets us apart from other development tools
          </p>
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

        {/* Our Values Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className={`p-3 rounded-full ${isDark ? 'bg-red-500 bg-opacity-20' : 'bg-red-100'} mr-4`}>
              <FaShieldAlt className="text-red-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Values</h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Quality First</h3>
              <p>
                We believe that code quality is non-negotiable. Every feature we build is designed to help developers write cleaner, more efficient, and more maintainable code. We hold ourselves to the same high standards in our own development practices.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Continuous Innovation</h3>
              <p>
                The field of AI and software development is constantly evolving, and so are we. We're committed to staying at the forefront of technology, continuously improving our tools and adding new capabilities to meet the changing needs of developers.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Developer Empowerment</h3>
              <p>
                We believe in empowering developers of all skill levels. Our tools are designed to be accessible to beginners while providing the depth and sophistication that experienced developers demand.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Ethical AI</h3>
              <p>
                We're committed to developing and using AI responsibly. We prioritize transparency, fairness, and privacy in all our AI implementations, and we're constantly working to minimize biases and ensure our tools benefit all users equally.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500 bg-opacity-20' : 'bg-blue-100'} mr-4`}>
              <FaCode className="text-blue-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Technology Stack</h2>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto text-center mb-10`}>
            Built with modern technologies for performance, scalability, and developer experience
          </p>

          <div className={`rounded-lg p-8 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <TechItem name="React" />
              <TechItem name="Node.js" />
              <TechItem name="Express" />
              <TechItem name="Tailwind CSS" />
              <TechItem name="Google Gemini AI" />
              <TechItem name="Prism.js" />
              <TechItem name="React Router" />
              <TechItem name="Axios" />
              <TechItem name="MongoDB" />
              <TechItem name="Jest" />
              <TechItem name="Webpack" />
              <TechItem name="GitHub Actions" />
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className={`p-3 rounded-full ${isDark ? 'bg-yellow-500 bg-opacity-20' : 'bg-yellow-100'} mr-4`}>
              <FaHistory className="text-yellow-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Journey</h2>
          </div>

          <div className={`relative border-l-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} ml-6 pl-8 pb-8`}>
            <div className="mb-12">
              <div className={`absolute -left-6 ${isDark ? 'bg-gray-700' : 'bg-white'} p-2 rounded-full border-4 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
              </div>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <h3 className="text-xl font-bold mb-2">2021 - The Beginning</h3>
                <p>OMEX started as a small project by a group of developers frustrated with the limitations of existing code analysis tools. The initial prototype focused solely on JavaScript optimization.</p>
              </div>
            </div>

            <div className="mb-12">
              <div className={`absolute -left-6 ${isDark ? 'bg-gray-700' : 'bg-white'} p-2 rounded-full border-4 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-500'}`}></div>
              </div>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <h3 className="text-xl font-bold mb-2">2022 - Expansion</h3>
                <p>After gaining traction in the developer community, we expanded our team and added support for multiple programming languages. The code generation feature was introduced, quickly becoming our most popular tool.</p>
              </div>
            </div>

            <div>
              <div className={`absolute -left-6 ${isDark ? 'bg-gray-700' : 'bg-white'} p-2 rounded-full border-4 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`}></div>
              </div>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <h3 className="text-xl font-bold mb-2">2023 - Present</h3>
                <p>Today, OMEX is used by thousands of developers worldwide. We've integrated cutting-edge AI models, expanded our suite of tools, and built a vibrant community around our platform. We continue to innovate and improve, with exciting new features on the horizon.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className={`p-3 rounded-full ${isDark ? 'bg-green-500 bg-opacity-20' : 'bg-green-100'} mr-4`}>
              <FaUsers className="text-green-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
            We're a passionate team of developers, designers, and AI enthusiasts dedicated to creating tools that make coding better for everyone.
          </p>
          <Link
            to="/team"
            className={`inline-flex items-center ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-100 hover:bg-blue-200'} px-6 py-3 rounded-lg font-medium transition-all duration-200`}
          >
            View Team Page <FaArrowRight className="ml-2" />
          </Link>
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
