import { useState, useEffect, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaTools,
  FaVial,
  FaMagic,
  FaBug,
  FaTachometerAlt,
  FaArrowRight,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { GoPackageDependencies } from "react-icons/go";
import { GrAnalytics } from "react-icons/gr"; 
import { MdOutlineCleaningServices } from 'react-icons/md';
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

// ToolCard component with forwardRef
const ToolCard = forwardRef(
  ({ icon, title, description, link, isDark = true }, ref) => {
    return (
      <Link
        ref={ref}
        to={link}
        className={`block p-6 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl ${
          isDark
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-white hover:bg-gray-100 border border-gray-200"
        }`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`p-3 rounded-full ${
              isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
            }`}
          >
            {icon}
          </div>
          <h3
            className={`ml-4 text-xl font-semibold ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
        </div>
        <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {description}
        </p>
        <div className="flex items-center text-blue-400 font-medium">
          Try it now <FaArrowRight className="ml-2" />
        </div>
      </Link>
    );
  }
);

ToolCard.displayName = "ToolCard";

export default function CodeTools() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardRefs = useRef([]);

  const tools = [
    {
      icon: <FaVial className="text-blue-400 text-2xl" />,
      title: "Test Case Generator",
      description:
        "Automatically generate comprehensive test cases for your code to ensure it works correctly in all scenarios.",
      link: "/test-case-generator",
    },
    {
      icon: <FaMagic className="text-purple-400 text-2xl" />,
      title: "Code Beautifier",
      description:
        "Transform messy, inconsistent code into clean, well-structured code that follows best practices.",
      link: "/code-beautifier",
    },
    {
      icon: <FaBug className="text-red-400 text-2xl" />,
      title: "Error Debugger",
      description:
        "Identify and fix bugs, syntax errors, and logical issues in your code with detailed explanations.",
      link: "/error-debugger",
    },
    {
      icon: <FaTachometerAlt className="text-green-400 text-2xl" />,
      title: "Performance Analyzer",
      description:
        "Analyze execution time and memory usage of your code and get optimization recommendations.",
      link: "/performance-analyzer",
    },
    {
      icon: <FaFileAlt className="text-orange-400 text-2xl" />,
      title: "Content Summarizer",
      description:
        "Upload media files (images, PDFs, videos, text) and get AI-generated summaries of their content.",
      link: "/content-summarizer",
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-2xl" />,
      title: "Security Vulnerability Scanner",
      description:
        "Scan your code for security flaws like SQL injection, XSS, and hardcoded secrets with remediation suggestions.",
      link: "/security-scanner",
    },
    {
      icon: <GoPackageDependencies className="text-orange-500 text-2xl" />,
      title: "Dependency Scanner",
      description:
        "Scan your dependencies for vulnerabilities and deprecation.",
      link: "/dependency-scanner",
    },
    {
      icon: <GrAnalytics className="text-orange-500 text-2xl" />,
      title: "Code Metrics Analyzer",
      description:
        "Analyze your codebase for various metrics like complexity, maintainability, and more.",
      link: "/code-metrics-analyzer",
    },
    {
      icon: <MdOutlineCleaningServices className="text-pink-400 text-2xl mr-2" />,
      title: "Dead Code Finder",
      description:
        "The Dead Code Finder helps you keep your projects clean and maintainable by detecting unused code.",
      link: "/dead-code-finder",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 1,
            delay: 0.5 + index * 0.2,
            ease: "expo.out",
            stagger: {
              each: 0.2,
              from: "start", // or "center", "edges", "random"
            },
            scale: 0.95,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });
        }
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        {/* <Loader
          fullscreen
          size="xl"
          color="purple"
          text="Loading Dependency Scanner..."
        /> */}
      </div>
    );
  }

  return (
    <div
  className={`min-h-screen w-full ${
    isDark ? "bg-gray-800" : "bg-gray-100"
  }`}
>
  <div className="container mx-auto px-4 py-12">
    {/* Header */}
    <div className="mb-12 text-center">
      <div className="inline-block p-3 rounded-full bg-blue-200/20 mb-4">
        <FaTools className="text-blue-400 text-3xl" />
      </div>
      <h1
        ref={headerRef}
        className={`text-4xl font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        OMEX Code Tools
      </h1>
      <p
        ref={paragraphRef}
        className={`text-xl max-w-3xl mx-auto ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Powerful tools to enhance your coding experience and improve code
        quality.
      </p>
    </div>

    {/* Tools Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {tools.map((tool, index) => (
        <a
          key={index}
          href={tool.link}
          className={`group relative flex flex-col justify-between h-full p-6 rounded-2xl border
            transition-transform duration-300 ease-out
            ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                : "bg-white hover:bg-gray-100 border border-gray-200"
            }
            hover:-translate-y-2 hover:scale-[1.02]
            hover:shadow-2xl hover:border-transparent`}
          style={{ transformOrigin: "center" }}
        >
          {/* Icon */}
          <div
            className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl 
              bg-gradient-to-tr from-gray-100 to-gray-200 
              dark:from-gray-800 dark:to-gray-700 
              transform transition-transform duration-300 
              group-hover:scale-110 group-hover:rotate-6"
          >
            {tool.icon}
          </div>

          {/* Title */}
          <h3
            className={`mt-6 text-lg font-semibold ${
              isDark ? "text-gray-100" : "text-gray-900"
            } transition-colors duration-300 
              group-hover:text-indigo-600 dark:group-hover:text-indigo-400`}
          >
            {tool.title}
          </h3>

          {/* Description */}
          <p
            className="mt-3 text-sm 
              text-gray-600 dark:text-gray-400 
              transition-colors duration-300 
              group-hover:text-gray-800 dark:group-hover:text-gray-300"
          >
            {tool.description}
          </p>

          {/* CTA */}
          <div
            className="mt-6 inline-flex items-center text-sm font-medium 
              text-indigo-600 dark:text-indigo-400 
              transition-colors duration-300 
              group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
          >
            Try it now
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </a>
      ))}
    </div>

    {/* Coming Soon Section */}
    <div
      className={`mt-16 p-8 rounded-lg mb-12 ${
        isDark ? "bg-gray-700" : "bg-white border border-gray-200"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        More Tools Coming Soon
      </h2>
      <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
        We're constantly working on new tools to help you write better code.
        Stay tuned for these upcoming features:
      </p>
      <ul
        className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <li className="flex items-center">
          <span className="mr-2 text-green-400">•</span> Code Refactoring Tool
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-green-400">•</span> Design Pattern
          Suggestions
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-green-400">•</span> Security Vulnerability
          Scanner
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-green-400">•</span> Code Documentation
          Generator
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-green-400">•</span> API Documentation
          Generator
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-green-400">•</span> Code Explanation Tool
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-green-400">•</span> Algorithm Visualizer
        </li>
      </ul>
    </div>
  </div>
</div>

  );
}
