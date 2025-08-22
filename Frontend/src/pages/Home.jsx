import {
  FaArrowRight,
  FaBug,
  FaChartLine,
  FaCode,
  FaExchangeAlt,
  FaFileAlt,
  FaLightbulb,
  FaMagic,
  FaRobot,
  FaStar,
  FaUsers,
  FaComments,
  FaVial,
  FaTachometerAlt
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import FAQSection from '../components/Faq';

function Home() {
  const { isDark } = useTheme();

  const services = [
    {
      title: "Code Generator",
      description:
        "Generate clean, efficient code in multiple languages based on your requirements. Perfect for boilerplate code, algorithms, and common patterns.",
      img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=2070&q=80",
      link: "/codegenerator",
      icon: FaRobot,
      color: "blue",
    },
    {
      title: "Code Optimizer",
      description:
        "Improve your code's performance, readability, and maintainability with AI-powered suggestions and best practices.",
      img: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=2070&q=80",
      link: "/optimiser",
      icon: FaLightbulb,
      color: "purple",
    },
    {
      title: "Content Summarizer",
      description:
        "Extract key information from various sources including text, images, PDFs, and YouTube videos with our AI summarization tool.",
      img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2070&q=80",
      link: "/content-summarizer",
      icon: FaFileAlt,
      color: "green",
    },
  ];

  const features = [
    {
      icon: FaLightbulb,
      title: "AI-Powered Insights",
      description: "Get smart recommendations and insights from AI.",
      link: "/insights",
    },
    {
      icon: FaRobot,
      title: "Automation Tools",
      description: "Automate repetitive tasks and save time.",
      link: "/automation",
    },
    {
      icon: FaChartLine,
      title: "Analytics Dashboard",
      description: "Track progress with powerful analytics.",
      link: "/analytics",
    },
    {
      icon: FaExchangeAlt,
      title: "Seamless Integration",
      description: "Easily connect with your favorite tools.",
      link: "/integration",
    },
  ];

  const toolsData = [
    {
      id: 1,
      icon: FaVial,
      title: "Test Case Generator",
      description:
        "Automatically generate comprehensive test cases for your code.",
      href: "/test-case-generator",
      iconColor: "text-blue-400",
    },
    {
      id: 2,
      icon: FaMagic,
      title: "Code Beautifier",
      description:
        "Transform messy code into clean, well-structured code that follows best practices.",
      href: "/code-beautifier",
      iconColor: "text-purple-400",
    },
    {
      id: 3,
      icon: FaBug,
      title: "Error Debugger",
      description:
        "Identify and fix bugs, syntax errors, and logical issues in your code.",
      href: "/error-debugger",
      iconColor: "text-red-400",
    },
    {
      id: 4,
      icon: FaTachometerAlt,
      title: "Performance Analyzer",
      description:
        "Analyze execution time and memory usage of your code and get optimization recommendations.",
      href: "/performance-analyzer",
      iconColor: "text-green-400",
    },
  ];

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } min-h-screen`}
    >
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden animated-bg">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-10"></div>
          <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          ></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div
            className={`${
              isDark ? "glass-dark" : "glass"
            } rounded-3xl py-12 px-6 max-w-4xl mx-auto`}
          >
            <div className="mb-8 inline-block p-3 bg-blue-600 bg-opacity-20 rounded-full">
              <FaCode className="text-blue-400 text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Elevate Your Code with <span className="text-blue-400">OMEX</span>
            </h1>
            <p
              className={`text-xl md:text-2xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto mb-10`}
            >
              The AI-powered platform for developers to optimize, generate, and
              analyze code with confidence.
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
                className={`${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-gray-100 border border-gray-200"
                } text-${
                  isDark ? "white" : "gray-800"
                } px-8 py-3 rounded-lg font-medium transition-all duration-200`}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section
        className={`py-16 px-4 ${
          isDark ? "bg-gray-800" : "bg-white"
        } relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 right-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          ></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Services</h2>
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto`}
            >
              Discover our most popular tools that help developers write better
              code
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={i} isDark={isDark} {...service} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/code-tools"
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold  transition-all duration-200 border-2
            ${
              isDark
                ? "border-gray-700 text-blue-200 bg-black/30 hover:bg-blue-900 hover:border-blue-700"
                : "border-blue-300 text-blue-700 bg-blue-50/60 hover:bg-blue-100 hover:border-blue-600"
            }
            hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 `}
            >
              View All Tools <FaArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <section
        className={`py-16 px-4 ${isDark ? "bg-gray-900/95" : "bg-gray-200"}`}
      >
        <div className="container mx-auto">
          <h2
            className={`text-4xl font-extrabold text-center mb-10 ${
              isDark ? "text-blue-200" : "text-blue-800"
            }`}
          >
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Code Tools Section */}
      <section
        className={`py-16 px-4 ${
          isDark ? "bg-gray-800 bg-opacity-50" : "bg-gray-100"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-6">
            <FaTools className="text-blue-400 text-3xl mr-3" />
            <h2 className="text-3xl font-bold text-center">New Code Tools</h2>
          </div>
          <p
            className={`text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto text-center mb-12`}
          >
            Explore our latest AI-powered tools to enhance your coding
            experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {toolsData.map((tool) => (
              <FeatureCard
                key={tool.id}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                href={tool.href}
                iconColor={tool.iconColor}
                isDark={isDark}
              />
            ))}

            <div
              className={`
          flex flex-col items-center p-8
          rounded-2xl
          ${isDark ? "bg-gray-900" : "bg-white"}
          shadow-md
          border border-transparent
          transition-all duration-300
          hover:shadow-2xl hover:shadow-black/30
          hover:scale-[1.03] hover:border-blue-500
          focus-within:shadow-2xl focus-within:scale-[1.03]`}
              tabIndex={0}
            >
              <div className="mb-4">
                <FaVial className="text-blue-400 text-3xl drop-shadow-lg" />
              </div>
              <h3
                className={`text-xl font-bold text-center mb-2 ${
                  isDark ? "text-blue-100" : "text-blue-900"
                }`}
              >
                Test Case Generator
              </h3>
              <p
                className={`text-center mb-6 px-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Automatically generate comprehensive test cases for your code.
              </p>
              <Link
                to="/test-case-generator"
                tabIndex={0}
                role="button"
                aria-label="Learn more about Test Case Generator"
              >
                <span
                  className={`
              inline-flex items-center gap-2
              px-5 py-2 rounded-md font-semibold text-base
              transition-colors duration-200
              ${
                isDark
                  ? "bg-blue-900 text-blue-200 border border-blue-600 hover:bg-blue-700"
                  : "bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-200"
              }
              cursor-pointer select-none`}
                >
                  Learn More <FaArrowRight size={16} />
                </span>
              </Link>
            </div>

            <div
              className={`
          flex flex-col items-center p-8
          rounded-2xl
          ${isDark ? "bg-gray-900" : "bg-white"}
          shadow-md
          border border-transparent
          transition-all duration-300
          hover:shadow-2xl hover:shadow-black/30
          hover:scale-[1.03] hover:border-blue-500
          focus-within:shadow-2xl focus-within:scale-[1.03]
        `}
              tabIndex={0}
            >
              <div className="mb-4">
                <FaMagic className="text-purple-400 text-3xl drop-shadow-lg" />
              </div>
              <h3
                className={`text-xl font-bold text-center mb-2 ${
                  isDark ? "text-blue-100" : "text-blue-900"
                }`}
              >
                Code Beautifier
              </h3>
              <p
                className={`text-center mb-6 px-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Transform messy code into clean, well-structured code that
                follows best practices.
              </p>
              <Link
                to="/code-beautifier"
                tabIndex={0}
                role="button"
                aria-label="Learn more about Code Beautifier"
              >
                <span
                  className={`
              inline-flex items-center gap-2
              px-5 py-2 rounded-md font-semibold text-base
              transition-colors duration-200
              ${
                isDark
                  ? "bg-blue-900 text-blue-200 border border-blue-600 hover:bg-blue-700"
                  : "bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-200"
              }
              cursor-pointer select-none
            `}
                >
                  Learn More <FaArrowRight size={16} />
                </span>
              </Link>
            </div>

            <div
              className={`
          flex flex-col items-center p-8
          rounded-2xl
          ${isDark ? "bg-gray-900" : "bg-white"}
          shadow-md
          border border-transparent
          transition-all duration-300
          hover:shadow-2xl hover:shadow-black/30
          hover:scale-[1.03] hover:border-blue-500
          focus-within:shadow-2xl focus-within:scale-[1.03]
        `}
              tabIndex={0}
            >
              <div className="mb-4">
                <FaBug className="text-red-400 text-3xl drop-shadow-lg" />
              </div>
              <h3
                className={`text-xl font-bold text-center mb-2 ${
                  isDark ? "text-blue-100" : "text-blue-900"
                }`}
              >
                Error Debugger
              </h3>
              <p
                className={`text-center mb-6 px-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Identify and fix bugs, syntax errors, and logical issues in your
                code.
              </p>
              <Link
                to="/error-debugger"
                tabIndex={0}
                role="button"
                aria-label="Learn more about Error Debugger"
              >
                <span
                  className={`
              inline-flex items-center gap-2
              px-5 py-2 rounded-md font-semibold text-base
              transition-colors duration-200
              ${
                isDark
                  ? "bg-blue-900 text-blue-200 border border-blue-600 hover:bg-blue-700"
                  : "bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-200"
              }
              cursor-pointer select-none`}
                >
                  Learn More <FaArrowRight size={16} />
                </span>
              </Link>
            </div>

            <div
              className={`
          flex flex-col items-center p-8
          rounded-2xl
          ${isDark ? "bg-gray-900" : "bg-white"}
          shadow-md
          border border-transparent
          transition-all duration-300
          hover:shadow-2xl hover:shadow-black/30
          hover:scale-[1.03] hover:border-blue-500
          focus-within:shadow-2xl focus-within:scale-[1.03]
        `}
              tabIndex={0}
            >
              <div className="mb-4">
                <FaTachometerAlt className="text-green-400 text-3xl drop-shadow-lg" />
              </div>
              <h3
                className={`text-xl font-bold text-center mb-2 ${
                  isDark ? "text-blue-100" : "text-blue-900"
                }`}
              >
                Performance Analyzer
              </h3>
              <p
                className={`text-center mb-6 px-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Analyze execution time and memory usage of your code and get
                optimization recommendations.
              </p>
              <Link
                to="/performance-analyzer"
                tabIndex={0}
                role="button"
                aria-label="Learn more about Performance Analyzer"
              >
                <span
                  className={`
              inline-flex items-center gap-2
              px-5 py-2 rounded-md font-semibold text-base
              transition-colors duration-200
              ${
                isDark
                  ? "bg-blue-900 text-blue-200 border border-blue-600 hover:bg-blue-700"
                  : "bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-200"
              }
              cursor-pointer select-none
            `}
                >
                  Learn More <FaArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              to="/code-tools"
              className={`
          inline-flex items-center gap-2
          bg-blue-600 hover:bg-blue-700
          text-white px-6 py-3 rounded-lg font-semibold
          shadow-md hover:shadow-xl
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        `}
              tabIndex={0}
              role="button"
            >
              View All Tools <FaArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-16 px-4 ${isDark ? "" : "bg-white"}`}>
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
      <section
        className={`py-16 px-4 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        } relative overflow-hidden`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-5"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          ></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div
                className={`p-4 rounded-full ${
                  isDark ? "glass-dark" : "glass"
                }`}
              >
                <FaStar className="text-yellow-400 text-3xl" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">What Developers Say</h2>
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto`}
            >
              Trusted by developers around the world to improve their coding
              workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`rounded-lg p-6 ${
                isDark ? "glass-dark glass-dark-card" : "glass glass-card"
              }`}
            >
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p
                className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                "OMEX has completely transformed my coding workflow. The code
                optimization tool helped me improve performance by 40% on a
                critical project. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 rounded-full border-2 ${
                      isDark ? "border-blue-400" : "border-blue-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Senior Developer, TechCorp
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`rounded-lg p-6 ${
                isDark ? "glass-dark glass-dark-card" : "glass glass-card"
              }`}
            >
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p
                className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                "The code generation feature is a game-changer. It saves me
                hours of work by creating boilerplate code and helping with
                complex algorithms. OMEX is now an essential part of my
                toolkit."
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 rounded-full border-2 ${
                      isDark ? "border-purple-400" : "border-purple-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Freelance Developer
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`rounded-lg p-6 ${
                isDark ? "glass-dark glass-dark-card" : "glass glass-card"
              }`}
            >
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p
                className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                "As a team lead, I've implemented OMEX across our development
                department. The consistency in code quality and the time saved
                on reviews has been invaluable. A must-have for any dev team."
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/22.jpg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 rounded-full border-2 ${
                      isDark ? "border-green-400" : "border-green-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <h4 className="font-medium">David Rodriguez</h4>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Lead Developer, StartupX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-16 px-4 ${
          isDark ? "bg-slate-600 bg-opacity-10 " : "bg-blue-50"
        } relative overflow-hidden`}
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          ></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div
            className={`${
              isDark ? "glass-dark" : "glass"
            } rounded-2xl py-12 px-6 max-w-4xl mx-auto`}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Elevate Your Code?
            </h2>
            <p
              className={`text-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto mb-8`}
            >
              Join thousands of developers who are writing better, cleaner, and
              more efficient code with OMEX.
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
                className={`${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-gray-100 border border-gray-200"
                } text-${
                  isDark ? "white" : "gray-800"
                } px-8 py-3 rounded-lg font-medium transition-all duration-200`}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

      </section>
              <FAQSection/>

    </div>
  );
}

// Helper Components
const ServiceCard = ({
  isDark,
  title,
  description,
  img,
  link,
  icon: Icon,
  color,
}) => {
  return (
    <div
      className={`rounded-lg overflow-hidden ${
        isDark ? "glass-dark glass-dark-card" : "glass glass-card"
      }
        transition duration-300
        hover:shadow-lg hover:shadow-gray-900
        hover:scale-102 hover:border-2 hover:border-${color}-500
        focus-within:shadow-lg focus-within:scale-102`}
      tabIndex={0}
    >
      <div
        className={`h-3 ${isDark ? `bg-${color}-500` : `bg-${color}-600`}`}
      ></div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div
            className={`p-3 rounded-full ${
              isDark ? `bg-${color}-500 bg-opacity-20` : `bg-${color}-100`
            }`}
          >
            <Icon className={`text-${color}-500 text-xl`} />
          </div>
          <h3 className="ml-4 text-xl font-bold">{title}</h3>
        </div>

        <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
          <img src={img} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        </div>

        <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {description}
        </p>

        <Link
          to={link}
          className={`inline-block px-6 py-2 rounded-md font-semibold text-base transition duration-200
            ${
              isDark
                ? "bg-gray-900 text-blue-300 border border-blue-600 hover:bg-blue-800"
                : "bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100"
            }
            cursor-pointer select-none`}
          tabIndex={0}
          role="button"
          aria-label={`Try ${title}`}
        >
          <span className="flex items-center gap-2">
            Try {title} <FaArrowRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  href,
  iconColor,
  isDark,
}) => {
  return (
    <div
      className={`
        flex flex-col items-center p-8
        rounded-2xl
        ${isDark ? "bg-gray-900" : "bg-white"}
        shadow-md
        border border-transparent
        transition-all duration-300
        hover:shadow-2xl hover:shadow-black/30
        hover:scale-[1.03] hover:border-blue-500
        focus-within:shadow-2xl focus-within:scale-[1.03]
      `}
      tabIndex={0}
    >
      <div className="mb-4">
        <Icon className={`text-3xl drop-shadow-lg ${iconColor}`} />
      </div>
      <h3
        className={`text-xl font-bold text-center mb-2 ${
          isDark ? "text-blue-100" : "text-blue-900"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-center mb-6 px-2 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {description}
      </p>
      <a
        href={href}
        tabIndex={0}
        role="button"
        aria-label={`Learn more about ${title}`}
      >
        <span
          className={`
            inline-flex items-center gap-2
            px-5 py-2 rounded-md font-semibold text-base
            transition-colors duration-200
            ${
              isDark
                ? "bg-blue-900 text-blue-200 border border-blue-600 hover:bg-blue-700"
                : "bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-200"
            }
            cursor-pointer select-none
          `}
        >
          Learn More <FaArrowRight size={16} />
        </span>
      </a>
    </div>
  );
};

const StepCard = ({ number, title, description }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } rounded-lg p-6 shadow-lg border`}
    >
      <div className="text-5xl font-bold text-blue-400 opacity-50 mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
};

export default Home;
