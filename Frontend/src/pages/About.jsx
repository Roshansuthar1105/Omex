import { useState, useEffect } from 'react';
import React from "react";
import { Link } from "react-router-dom";
import Loader from '../components/Loader';
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
  FaRocket,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
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
        <Loader fullscreen size="xl" color="purple" text="Loading About..." />
      </div>
    );
  }
  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
        }`}
    >
      {/* Hero Section */}
      <div
        className={`py-20 px-4 ${isDark ? "bg-gray-900" : "bg-blue-50"
          } relative overflow-hidden animated-bg`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          ></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div
            className={`${isDark ? "glass-dark" : "glass"
              } rounded-3xl py-12 px-6 max-w-4xl mx-auto`}
          >
            <div className="mb-8 inline-block p-3 bg-blue-600 bg-opacity-20 rounded-full">
              <FaCode className="text-blue-400 text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-blue-400">OMEX</span>
            </h1>
            <p
              className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"
                } max-w-3xl mx-auto mb-6`}
            >
              An AI-powered platform revolutionizing how developers write,
              optimize, and understand code.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center mb-8">
            <div
              className={`p-3 rounded-full ${isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
                } mr-4`}
            >
              <FaRocket className="text-blue-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>

          <div
            className={`${isDark ? "glass-dark" : "glass"
              } rounded-xl p-8 mb-8 relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#4F46E5"
                  d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex mb-6">
                <div className="w-1/3 pr-4 hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
                    alt="Developer coding"
                    className="rounded-lg shadow-lg object-cover h-full"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <p
                    className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"
                      } leading-relaxed mb-6`}
                  >
                    At OMEX, we believe that every developer deserves access to
                    tools that can help them improve their coding skills and
                    produce high-quality software. Our mission is to leverage
                    the power of artificial intelligence to provide developers
                    with insights, suggestions, and optimizations that make
                    their code more efficient, readable, and maintainable.
                  </p>
                  <p
                    className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"
                      } leading-relaxed`}
                  >
                    We're committed to democratizing access to advanced code
                    analysis and optimization techniques, making them available
                    to developers of all skill levels and backgrounds. By
                    combining cutting-edge AI with a deep understanding of
                    software development practices, we aim to elevate the
                    quality of code across the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            ></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div
                className={`p-3 rounded-full ${isDark ? "glass-dark" : "glass"
                  } mr-4`}
              >
                <FaTools className="text-purple-500 text-xl" />
              </div>
              <h2 className="text-3xl font-bold">Our Core Features</h2>
            </div>
            <p
              className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"
                } max-w-3xl mx-auto text-center mb-10`}
            >
              Comprehensive tools designed to enhance every aspect of your
              development workflow
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className={`${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } rounded-xl p-6`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${isDark ? "bg-yellow-500 bg-opacity-20" : "bg-yellow-100"
                      }`}
                  >
                    <FaLightbulb className="text-yellow-400 text-xl" />
                  </div>
                  <h3 className="ml-3 text-lg font-bold">Code Optimization</h3>
                </div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Analyze your code and receive suggestions for improving
                  performance, readability, and maintainability.
                </p>
              </div>

              <div
                className={`${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } rounded-xl p-6`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${isDark ? "bg-green-500 bg-opacity-20" : "bg-green-100"
                      }`}
                  >
                    <FaRobot className="text-green-400 text-xl" />
                  </div>
                  <h3 className="ml-3 text-lg font-bold">Code Generation</h3>
                </div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Generate code snippets and solutions based on your
                  requirements and specifications.
                </p>
              </div>

              <div
                className={`${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } rounded-xl p-6`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${isDark ? "bg-purple-500 bg-opacity-20" : "bg-purple-100"
                      }`}
                  >
                    <FaChartLine className="text-purple-400 text-xl" />
                  </div>
                  <h3 className="ml-3 text-lg font-bold">
                    Complexity Analysis
                  </h3>
                </div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Understand the time and space complexity of your algorithms
                  and identify potential bottlenecks.
                </p>
              </div>

              <div
                className={`${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } rounded-xl p-6`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${isDark ? "bg-red-500 bg-opacity-20" : "bg-red-100"
                      }`}
                  >
                    <FaExchangeAlt className="text-red-400 text-xl" />
                  </div>
                  <h3 className="ml-3 text-lg font-bold">Code Comparison</h3>
                </div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Compare different versions of your code to identify changes,
                  improvements, and potential issues.
                </p>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                to="/code-tools"
                className={`inline-flex items-center ${isDark ? "glass-dark" : "glass"
                  } px-6 py-3 rounded-lg font-medium transition-all duration-200`}
              >
                Explore All Tools <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            ></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div
                className={`p-3 rounded-full ${isDark ? "glass-dark" : "glass"
                  } mr-4`}
              >
                <FaUsers className="text-green-500 text-xl" />
              </div>
              <h2 className="text-3xl font-bold">Why Choose OMEX?</h2>
            </div>
            <p
              className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"
                } max-w-3xl mx-auto text-center mb-10`}
            >
              What sets us apart from other development tools
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } rounded-xl p-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#3B82F6"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div
                    className={`p-3 rounded-full ${isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
                      } mb-4 inline-block`}
                  >
                    <FaCode className="text-blue-400 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Advanced AI</h3>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Powered by state-of-the-art AI models specifically trained
                    on code analysis and optimization.
                  </p>
                </div>
              </div>

              <div
                className={`${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } rounded-xl p-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#8B5CF6"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div
                    className={`p-3 rounded-full ${isDark ? "bg-purple-500 bg-opacity-20" : "bg-purple-100"
                      } mb-4 inline-block`}
                  >
                    <FaUsers className="text-purple-400 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Developer-Focused</h3>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Built by developers, for developers, with a focus on
                    practical, actionable insights.
                  </p>
                </div>
              </div>

              <div
                className={`${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } rounded-xl p-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#10B981"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div
                    className={`p-3 rounded-full ${isDark ? "bg-green-500 bg-opacity-20" : "bg-green-100"
                      } mb-4 inline-block`}
                  >
                    <FaTools className="text-green-400 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Comprehensive Tools
                  </h3>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    A complete suite of tools for all aspects of code quality
                    and improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            ></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div
                className={`p-3 rounded-full ${isDark ? "glass-dark" : "glass"
                  } mr-4`}
              >
                <FaShieldAlt className="text-red-500 text-xl" />
              </div>
              <h2 className="text-3xl font-bold">Our Values</h2>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isDark ? "text-gray-300" : "text-gray-600"
                }`}
            >
              <div
                className={`p-6 rounded-lg ${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#EF4444"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span
                      className={`inline-block p-2 rounded-full ${isDark ? "bg-red-500 bg-opacity-20" : "bg-red-100"
                        } mr-3`}
                    >
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Quality First
                  </h3>
                  <p>
                    We believe that code quality is non-negotiable. Every
                    feature we build is designed to help developers write
                    cleaner, more efficient, and more maintainable code. We hold
                    ourselves to the same high standards in our own development
                    practices.
                  </p>
                </div>
              </div>

              <div
                className={`p-6 rounded-lg ${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#3B82F6"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span
                      className={`inline-block p-2 rounded-full ${isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
                        } mr-3`}
                    >
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                    </span>
                    Continuous Innovation
                  </h3>
                  <p>
                    The field of AI and software development is constantly
                    evolving, and so are we. We're committed to staying at the
                    forefront of technology, continuously improving our tools
                    and adding new capabilities to meet the changing needs of
                    developers.
                  </p>
                </div>
              </div>

              <div
                className={`p-6 rounded-lg ${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#8B5CF6"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span
                      className={`inline-block p-2 rounded-full ${isDark ? "bg-purple-500 bg-opacity-20" : "bg-purple-100"
                        } mr-3`}
                    >
                      <svg
                        className="w-5 h-5 text-purple-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </span>
                    Developer Empowerment
                  </h3>
                  <p>
                    We believe in empowering developers of all skill levels. Our
                    tools are designed to be accessible to beginners while
                    providing the depth and sophistication that experienced
                    developers demand.
                  </p>
                </div>
              </div>

              <div
                className={`p-6 rounded-lg ${isDark ? "glass-dark glass-dark-card" : "glass glass-card"
                  } relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#10B981"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span
                      className={`inline-block p-2 rounded-full ${isDark ? "bg-green-500 bg-opacity-20" : "bg-green-100"
                        } mr-3`}
                    >
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Ethical AI
                  </h3>
                  <p>
                    We're committed to developing and using AI responsibly. We
                    prioritize transparency, fairness, and privacy in all our AI
                    implementations, and we're constantly working to minimize
                    biases and ensure our tools benefit all users equally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div
              className={`p-3 rounded-full ${isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
                } mr-4`}
            >
              <FaCode className="text-blue-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Technology Stack</h2>
          </div>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto text-center mb-10`}
          >
            Built with modern technologies for performance, scalability, and
            developer experience
          </p>

          <div
            className={`rounded-lg p-8 ${isDark ? "bg-gray-700" : "bg-white"
              } shadow-lg`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
  <TechItem name="React" icon="⚛" />
  <TechItem name="Node.js" icon="🟢" />
  <TechItem name="Express" icon="🚀" />
  <TechItem name="Tailwind CSS" icon="🎨" />
  <TechItem name="Google Gemini AI" icon="🤖" />
  <TechItem name="Prism.js" icon="🌈" />
  <TechItem name="React Router" icon="🛣" />
  <TechItem name="Axios" icon="📡" />
  <TechItem name="MongoDB" icon="🍃" />
  <TechItem name="Jest" icon="🃏" />
  <TechItem name="Webpack" icon="📦" />
  <TechItem name="GitHub Actions" icon="⚙" />
</div>
          </div>
        </div>

        {/* History Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div
              className={`p-3 rounded-full ${isDark ? "bg-yellow-500 bg-opacity-20" : "bg-yellow-100"
                } mr-4`}
            >
              <FaHistory className="text-yellow-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Journey</h2>
          </div>

          <div
            className={`relative border-l-4 ${isDark ? "border-gray-700" : "border-gray-200"
              } ml-6 pl-8 pb-8`}
          >
            <div className="mb-12">
              <div
                className={`absolute -left-6 ${isDark ? "bg-gray-700" : "bg-white"
                  } p-2 rounded-full border-4 ${isDark ? "border-gray-600" : "border-gray-200"
                  }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${isDark ? "bg-blue-400" : "bg-blue-500"
                    }`}
                ></div>
              </div>
              <div className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <h3 className="text-xl font-bold mb-2">2021 - The Beginning</h3>
                <p>
                  OMEX started as a small project by a group of developers
                  frustrated with the limitations of existing code analysis
                  tools. The initial prototype focused solely on JavaScript
                  optimization.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <div
                className={`absolute -left-6 ${isDark ? "bg-gray-700" : "bg-white"
                  } p-2 rounded-full border-4 ${isDark ? "border-gray-600" : "border-gray-200"
                  }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${isDark ? "bg-green-400" : "bg-green-500"
                    }`}
                ></div>
              </div>
              <div className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <h3 className="text-xl font-bold mb-2">2022 - Expansion</h3>
                <p>
                  After gaining traction in the developer community, we expanded
                  our team and added support for multiple programming languages.
                  The code generation feature was introduced, quickly becoming
                  our most popular tool.
                </p>
              </div>
            </div>

            <div>
              <div
                className={`absolute -left-6 ${isDark ? "bg-gray-700" : "bg-white"
                  } p-2 rounded-full border-4 ${isDark ? "border-gray-600" : "border-gray-200"
                  }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${isDark ? "bg-purple-400" : "bg-purple-500"
                    }`}
                ></div>
              </div>
              <div className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <h3 className="text-xl font-bold mb-2">2023 - Present</h3>
                <p>
                  Today, OMEX is used by thousands of developers worldwide.
                  We've integrated cutting-edge AI models, expanded our suite of
                  tools, and built a vibrant community around our platform. We
                  continue to innovate and improve, with exciting new features
                  on the horizon.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div
              className={`p-3 rounded-full ${isDark ? "bg-green-500 bg-opacity-20" : "bg-green-100"
                } mr-4`}
            >
              <FaUsers className="text-green-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
          </div>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto mb-8`}
          >
            We're a passionate team of developers, designers, and AI enthusiasts
            dedicated to creating tools that make coding better for everyone.
          </p>
          <Link
            to="/team"
            onClick={() => window.scrollTo(0, 0)}
            className={`inline-flex items-center ${isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-blue-100 hover:bg-blue-200"
              } px-6 py-3 rounded-lg font-medium transition-all duration-200`}
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
    <div
      className={`${isDark ? "bg-gray-700" : "bg-white"
        } rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1`}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
};

const ReasonCard = ({ icon, title, description }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`${isDark ? "bg-gray-700" : "bg-white"
        } rounded-lg p-6 shadow-lg text-center`}
    >
      <div className="text-3xl mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
};

const TechItem = ({ name, icon }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`${
        isDark
          ? "bg-gray-800 hover:bg-gray-600"
          : "bg-gray-100 hover:bg-gray-200"
      } rounded-lg p-4 shadow-md transition-colors duration-200`}
    >
      {icon && <div className="mb-2 text-2xl">{icon}</div>}
      <p className="font-medium">{name}</p>
    </div>
  );
};

export default About;
