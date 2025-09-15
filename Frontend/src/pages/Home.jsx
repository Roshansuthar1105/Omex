import React, { useEffect, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";

// Register GSAP plugins (this is a key fix for your GSAP errors)
gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
  FaTools,
  FaVial,
  FaTachometerAlt,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import FAQSection from "../components/Faq";
import Testimonials from "../components/Testimonials";

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
    {
      id: 5,
      icon: FaTachometerAlt,
      title: "Dependency Checker",
      description:
        "Analyze execution time and memory usage of your code and get optimization recommendations.",
      href: "/dependency-scanner",
      iconColor: "text-green-400",
    },
  ];

  // Refs
  const containerRef = useRef();
  const howItWorksRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const ctaCardRef = useRef(null);
  const ctaHeadingRef = useRef(null);
  const ctaParagraphRef = useRef(null);
  const ctaButtonsRef = useRef([]);
  const testimonialSectionRef = useRef(null);
  const testimonialHeadingRef = useRef(null);
  const testimonialParagraphRef = useRef(null);
  const testimonialIconRef = useRef(null);
  const testimonialCardsRef = useRef([]);
  const testimonialAvatarsRef = useRef([]);
  const pageRef = useRef(null);
  const navRef = useRef(null);
  const featureCardRefs = useRef([]);
  const featureIconRefs = useRef([]);
  const featureTitleRefs = useRef([]);
  const featureDescRefs = useRef([]);
  const toolCardRefs = useRef([]);
  const toolsHeadingRef = useRef(null);
  const toolsParagraphRef = useRef(null);
  const toolsIconRef = useRef(null);

  useGSAP(
    () => {
      // Page load animation
      gsap.from(".hero-section", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      // Stagger hero content
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: "power3.out",
      });

      // Scroll-trigger fade-ups
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Fade in section heading
      gsap.from(".featured-heading", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-heading",
          start: "top 85%",
        },
      });

      // CTA button subtle pop
      gsap.from(".featured-cta", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".featured-cta",
          start: "top 95%",
        },
      });

      // Parallax background effect
      gsap.to(".featured-bg > div", {
        backgroundPositionY: "40%",
        ease: "none",
        scrollTrigger: {
          trigger: ".featured-bg",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Feature animations
      features.forEach((feature, index) => {
        const card = featureCardRefs.current[index];
        const icon = featureIconRefs.current[index];
        const title = featureTitleRefs.current[index];
        const desc = featureDescRefs.current[index];

        // Card fade-in
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        // Icon pop
        gsap.from(icon, {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        // Typewriter text
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(title, {
              duration: 2,
              text: feature.title,
              ease: "none",
            });

            gsap.to(desc, {
              duration: 3,
              text: feature.description,
              ease: "none",
              delay: 0.5,
            });
          },
        });
      });

      // Tools Section Animations
      gsap.from(toolsParagraphRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "circ.out",
        scrollTrigger: {
          trigger: toolsParagraphRef.current,
          start: "top 85%",
        },
      });

      gsap.from(toolsHeadingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: toolsHeadingRef.current,
          start: "top 85%",
        },
      });

      gsap.from(toolsIconRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: toolsIconRef.current,
          start: "top 85%",
        },
      });

      // How It Works Section
      gsap.utils.toArray(".how-step-card").forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          delay: index * 0.2, // ripple effect
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // CTA Section Animations
      gsap.from(ctaSectionRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 85%",
        },
      });

      // Slide up glass card
      gsap.from(ctaCardRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaCardRef.current,
          start: "top 85%",
        },
      });

      // Stagger heading and paragraph
      gsap.from([ctaHeadingRef.current, ctaParagraphRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ctaCardRef.current,
          start: "top 85%",
        },
      });

      // Buttons ripple in
      ctaButtonsRef.current.forEach((btn, index) => {
        gsap.from(btn, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: ctaCardRef.current,
            start: "top 85%",
          },
        });
      });

      // Testimonial Section Animations
      // Fade in background
      gsap.from(testimonialSectionRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: testimonialSectionRef.current,
          start: "top 85%",
        },
      });

      // Icon pop
      gsap.from(testimonialIconRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: testimonialSectionRef.current,
          start: "top 85%",
        },
      });

      // Text-Typing Heading
      ScrollTrigger.create({
        trigger: testimonialSectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(testimonialHeadingRef.current, {
            duration: 2,
            text: "What Developers Say",
            ease: "none",
          });
        },
      });

      // Paragraph fade-up
      gsap.from(testimonialParagraphRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialSectionRef.current,
          start: "top 85%",
        },
      });

      // Cards staggered slide-in
      testimonialCardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "circ.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });

      // Avatars ripple in
      testimonialAvatarsRef.current.forEach((avatar, index) => {
        gsap.from(avatar, {
          scale: 0.7,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: index * 0.3,
          scrollTrigger: {
            trigger: avatar,
            start: "top 85%",
          },
        });
      });

      toolCardRefs.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.16,
          scale: 0.98,
          filter: "blur(4px)",
          onUpdate: () => {
            card.style.filter = "blur(0px)";
          },
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });

      // Refresh ScrollTrigger on window resize to ensure correct positions
      ScrollTrigger.refresh();
    },

    { scope: containerRef } // <-- only scope to the container
  );

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        pageRef.current = el;
      }}
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } min-h-screen`}
    >
      {/* Hero Section */}
      <section className="hero-section py-20 px-4 relative overflow-hidden animated-bg">
        <div className="absolute inset-0 featured-bg">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-10"></div>
          <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              backgroundPositionY: "0%",
            }}
          ></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div
            className={`${
              isDark ? "glass-dark" : "glass"
            } rounded-3xl py-12 px-6 max-w-4xl mx-auto hero-animate`}
          >
            <div className="mb-8 inline-block p-3 bg-blue-600 bg-opacity-20 rounded-full hero-animate">
              <FaCode className="text-blue-400 text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight hero-animate">
              Elevate Your Code with{" "}
              <span className="text-blue-400">OMEX</span>
            </h1>
            <p
              className={`text-xl md:text-2xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto mb-10 hero-animate`}
            >
              The AI-powered platform for developers to optimize, generate, and
              analyze code with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4 hero-animate">
              <Link
                to="/code-tools"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center"
              >
                Explore Tools <FaArrowRight size={16} className="ml-2" />
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
                "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2070&q=80')",
            }}
          ></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 featured-heading">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (featureCardRefs.current[index] = el)}
                  className={`flex flex-col items-center p-8 rounded-2xl ${
                    isDark ? "bg-gray-900" : "bg-white"
                  } shadow-md border border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 hover:scale-[1.03] hover:border-blue-500 focus-within:shadow-2xl focus-within:scale-[1.03]`}
                  tabIndex={0}
                >
                  <div
                    className="mb-4"
                    ref={(el) => (featureIconRefs.current[index] = el)}
                  >
                    <Icon className="text-3xl text-blue-400 drop-shadow-lg" />
                  </div>
                  <h3
                    ref={(el) => (featureTitleRefs.current[index] = el)}
                    className={`text-xl font-bold text-center mb-2 ${
                      isDark ? "text-blue-100" : "text-blue-900"
                    }`}
                  ></h3>
                  <p
                    ref={(el) => (featureDescRefs.current[index] = el)}
                    className={`text-center mb-6 px-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  ></p>
                  <Link
                    to={feature.link}
                    tabIndex={0}
                    role="button"
                    aria-label={`Learn more about ${feature.title}`}
                  >
                    <span
                      className={`inline-flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-base transition-colors duration-200 ${
                        isDark
                          ? "bg-blue-900 text-blue-200 border border-blue-600 hover:bg-blue-700"
                          : "bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-200"
                      } cursor-pointer select-none`}
                    >
                      Learn More <FaArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 featured-cta">
            <Link
              to="/code-tools"
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-200 border-2 ${
                isDark
                  ? "border-gray-700 text-blue-200 bg-black/30 hover:bg-blue-900 hover:border-blue-700"
                  : "border-blue-300 text-blue-700 bg-blue-50/60 hover:bg-blue-100 hover:border-blue-600"
              } hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
            >
              View All Tools <FaArrowRight size={16} />
            </Link>
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
            <FaTools
              ref={toolsIconRef}
              className="text-blue-400 text-3xl mr-3"
            />
            <h2
              ref={toolsHeadingRef}
              className="text-3xl font-bold text-center"
            >
              New Code Tools
            </h2>
          </div>
          <p
            ref={toolsParagraphRef}
            className={`text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto text-center mb-12`}
          >
            Explore our latest AI-powered tools to enhance your coding
            experience
          </p>

          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {toolsData.map((tool, index) => (
                <FeatureCard
                  key={tool.id}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  href={tool.href}
                  iconColor={tool.iconColor}
                  isDark={isDark}
                  ref={(el) => (toolCardRefs.current[index] = el)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-10">
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
        </div>
      </section>

{/* How It Works Section */}
<section
  ref={howItWorksRef}
  className={`py-16 px-4 ${isDark ? "" : "bg-white"}`}
>
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Step 1 */}
      <div className="rounded-2xl p-6 transform transition-transform duration-300 ease-in-out hover:-translate-y-3 hover:shadow-2xl">
        <StepCard
          number="01"
          title="Input Your Code"
          description="Paste your code or write it directly in our editor."
        />
      </div>

      {/* Step 2 */}
      <div className="rounded-2xl p-6 transform transition-transform duration-300 ease-in-out hover:-translate-y-3 hover:shadow-2xl">
        <StepCard
          number="02"
          title="AI Analysis"
          description="Our AI analyzes your code for optimization opportunities."
        />
      </div>

      {/* Step 3 */}
      <div className="rounded-2xl p-6 transform transition-transform duration-300 ease-in-out hover:-translate-y-3 hover:shadow-2xl">
        <StepCard
          number="03"
          title="Get Results"
          description="Receive detailed feedback and suggestions for improvement."
        />
      </div>

    </div>
  </div>
</section>


      {/* Testimonials Section */}
      <Testimonials />

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
            ref={ctaCardRef}
            className={`${
              isDark ? "glass-dark" : "glass"
            } rounded-2xl py-12 px-6 max-w-4xl mx-auto`}
          >
            <h2 ref={ctaHeadingRef} className="text-3xl font-bold mb-6">
              Ready to Elevate Your Code?
            </h2>
            <p
              ref={ctaParagraphRef}
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
                ref={(el) => (ctaButtonsRef.current[0] = el)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center"
              >
                Explore Our Tools <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/contact"
                ref={(el) => (ctaButtonsRef.current[1] = el)}
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
      <FAQSection />
    </div>
  );
}

// Helper Components
const FeatureCard = forwardRef(
  ({ icon: Icon, title, description, href, iconColor, isDark }, ref) => {
    return (
      <div
        ref={ref} // Added ref to the div
        className={`
        flex flex-col items-center p-8
        rounded-2xl justify-between
        ${isDark ? "bg-gray-800" : "bg-white"}
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
  }
);

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
