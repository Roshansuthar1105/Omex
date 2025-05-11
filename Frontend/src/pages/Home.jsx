import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLightbulb,
  FaRobot,
  FaChartLine,
  FaExchangeAlt,
  FaArrowRight,
  FaCode,
  FaTools,
  FaVial,
  FaMagic,
  FaBug,
  FaTachometerAlt,
  FaFileAlt,
  FaStar,
  FaUsers,
  FaComments
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen`}>
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
          <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-600 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 inline-block p-3 bg-blue-600 bg-opacity-20 rounded-full">
            <FaCode className="text-blue-400 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Elevate Your Code with <span className="text-blue-400">OMEX</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-10`}>
            The AI-powered platform for developers to optimize, generate, and analyze code with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/code-tools"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center"
            >
              Explore Tools <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/about"
              className={`${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100 border border-gray-200'} text-${isDark ? 'white' : 'gray-800'} px-8 py-3 rounded-lg font-medium transition-all duration-200`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Services</h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Discover our most popular tools that help developers write better code
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
              <div className={`h-3 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500 bg-opacity-20' : 'bg-blue-100'}`}>
                    <FaRobot className="text-blue-500 text-xl" />
                  </div>
                  <h3 className="ml-4 text-xl font-bold">Code Generator</h3>
                </div>
                <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Generate clean, efficient code in multiple languages based on your requirements. Perfect for boilerplate code, algorithms, and common patterns.
                </p>
                <Link to="/codegenerator" className="flex items-center text-blue-400 font-medium hover:text-blue-500 transition-colors">
                  Try Code Generator <FaArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </div>

            <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
              <div className={`h-3 ${isDark ? 'bg-purple-500' : 'bg-purple-600'}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${isDark ? 'bg-purple-500 bg-opacity-20' : 'bg-purple-100'}`}>
                    <FaLightbulb className="text-purple-500 text-xl" />
                  </div>
                  <h3 className="ml-4 text-xl font-bold">Code Optimizer</h3>
                </div>
                <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Improve your code's performance, readability, and maintainability with AI-powered suggestions and best practices.
                </p>
                <Link to="/optimiser" className="flex items-center text-blue-400 font-medium hover:text-blue-500 transition-colors">
                  Try Code Optimizer <FaArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </div>

            <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
              <div className={`h-3 ${isDark ? 'bg-green-500' : 'bg-green-600'}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${isDark ? 'bg-green-500 bg-opacity-20' : 'bg-green-100'}`}>
                    <FaFileAlt className="text-green-500 text-xl" />
                  </div>
                  <h3 className="ml-4 text-xl font-bold">Content Summarizer</h3>
                </div>
                <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Extract key information from various sources including text, images, PDFs, and YouTube videos with our AI summarization tool.
                </p>
                <Link to="/content-summarizer" className="flex items-center text-blue-400 font-medium hover:text-blue-500 transition-colors">
                  Try Content Summarizer <FaArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/code-tools"
              className={`inline-flex items-center ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} px-6 py-3 rounded-lg font-medium transition-all duration-200`}
            >
              View All Tools <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaLightbulb className="text-yellow-400" />}
              title="Code Optimization"
              description="Get AI-powered suggestions to improve your code's performance, readability, and maintainability."
              link="/optimiser"
            />
            <FeatureCard
              icon={<FaRobot className="text-green-400" />}
              title="Code Generation"
              description="Generate code snippets and solutions based on your requirements and specifications."
              link="/codegenerator"
            />
            <FeatureCard
              icon={<FaChartLine className="text-purple-400" />}
              title="Complexity Analysis"
              description="Understand the time and space complexity of your algorithms and identify bottlenecks."
              link="/codecomplexity"
            />
            <FeatureCard
              icon={<FaExchangeAlt className="text-red-400" />}
              title="Code Comparison"
              description="Compare different versions of your code to identify changes and improvements."
              link="/codecompare"
            />
          </div>
        </div>
      </section>

      {/* Code Tools Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-100'}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-6">
            <FaTools className="text-blue-400 text-3xl mr-3" />
            <h2 className="text-3xl font-bold text-center">New Code Tools</h2>
          </div>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto text-center mb-12`}>
            Explore our latest AI-powered tools to enhance your coding experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaVial className="text-blue-400" />}
              title="Test Case Generator"
              description="Automatically generate comprehensive test cases for your code."
              link="/test-case-generator"
            />
            <FeatureCard
              icon={<FaMagic className="text-purple-400" />}
              title="Code Beautifier"
              description="Transform messy code into clean, well-structured code that follows best practices."
              link="/code-beautifier"
            />
            <FeatureCard
              icon={<FaBug className="text-red-400" />}
              title="Error Debugger"
              description="Identify and fix bugs, syntax errors, and logical issues in your code."
              link="/error-debugger"
            />
            <FeatureCard
              icon={<FaTachometerAlt className="text-green-400" />}
              title="Performance Analyzer"
              description="Analyze execution time and memory usage of your code and get optimization recommendations."
              link="/performance-analyzer"
            />
          </div>
          <div className="text-center mt-10">
            <Link
              to="/code-tools"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              View All Tools <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-16 px-4 ${isDark ? '' : 'bg-white'}`}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Input Your Code"
              description="Paste your code or write it directly in our editor."
            />
            <StepCard
              number="02"
              title="AI Analysis"
              description="Our AI analyzes your code for optimization opportunities."
            />
            <StepCard
              number="03"
              title="Get Results"
              description="Receive detailed feedback and suggestions for improvement."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FaStar className="text-yellow-400 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold mb-4">What Developers Say</h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Trusted by developers around the world to improve their coding workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "OMEX has completely transformed my coding workflow. The code optimization tool helped me improve performance by 40% on a critical project. Highly recommended!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Senior Developer, TechCorp</p>
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "The code generation feature is a game-changer. It saves me hours of work by creating boilerplate code and helping with complex algorithms. OMEX is now an essential part of my toolkit."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Freelance Developer</p>
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "As a team lead, I've implemented OMEX across our development department. The consistency in code quality and the time saved on reviews has been invaluable. A must-have for any dev team."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/22.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">David Rodriguez</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Lead Developer, StartupX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-blue-600 bg-opacity-10' : 'bg-blue-50'}`}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Code?</h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}>
            Join thousands of developers who are writing better, cleaner, and more efficient code with OMEX.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/code-tools"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center"
            >
              Explore Our Tools <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/contact"
              className={`${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100 border border-gray-200'} text-${isDark ? 'white' : 'gray-800'} px-8 py-3 rounded-lg font-medium transition-all duration-200`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper Components
const FeatureCard = ({ icon, title, description, link }) => {
  const { isDark } = useTheme();
  return (
    <Link to={link} className={`${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'} rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{description}</p>
      <div className="flex items-center text-blue-400 font-medium">
        Learn more <FaArrowRight className="ml-2" size={14} />
      </div>
    </Link>
  );
};

const StepCard = ({ number, title, description }) => {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border`}>
      <div className="text-5xl font-bold text-blue-400 opacity-50 mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

export default Home;