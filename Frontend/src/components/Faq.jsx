import { useTheme } from '../context/ThemeContext';
import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';
import { gsap } from "gsap";



const faqs = [
  {
    question: "What is Omex?",
    answer:
      "Omex is an AI-powered platform designed for developers to write cleaner, faster, and more reliable code. It offers tools for code optimization, generation, complexity analysis, and comparison, helping developers focus more on problem-solving rather than repetitive coding tasks.",
  },
  {
    question: "How does Omex optimize my code?",
    answer:
      "Omex analyzes your code for potential bottlenecks in performance, readability, and maintainability. Using AI models, it suggests alternative approaches, refactors inefficient code blocks, and recommends best practices aligned with modern coding standards. This ensures your codebase remains scalable and easier to maintain in the long run.",
  },
  {
    question: "Can I generate complete code using Omex?",
    answer:
      "Yes! Omex can generate complete code snippets, boilerplate structures, and even function implementations based on your requirements. Whether you need starter templates for APIs, UI components, or algorithm implementations, Omex assists in generating production-ready code that follows best practices.",
  },
  {
    question: "Is Omex free to use?",
    answer:
      "Omex provides a free tier that allows developers to explore its essential features with limited usage. For professional and enterprise developers, Omex offers paid plans that unlock unlimited code generation, in-depth optimization reports, priority support, and integration with developer tools such as GitHub, VS Code, and CI/CD pipelines.",
  },
  {
    question: "Do I need to install anything to use Omex?",
    answer:
      "No installation is required. Omex runs entirely on the web, which means you can access it directly from your browser without worrying about setup or system compatibility. For convenience, we also provide browser extensions and IDE plugins so you can integrate Omex seamlessly into your existing workflow.",
  },
  {
    question: "Who can benefit from using Omex?",
    answer:
      "Omex is designed for a wide range of users, including students, individual developers, startups, and large enterprises. Beginners can use it to learn coding best practices, while professionals and teams can rely on it for maintaining large codebases, reducing technical debt, and ensuring consistency across projects.",
  },
  {
    question: "Does Omex support multiple programming languages?",
    answer:
      "Yes. Omex supports multiple popular programming languages including JavaScript, Python, Java, C++, and more. Our team is continuously working on expanding language support to meet the needs of diverse developer communities worldwide.",
  },
];


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);
  const { isDark } = useTheme();
  const navigate = useNavigate()


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
  if (openIndex !== null) {
    const el = answerRefs.current[openIndex];
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }
}, [openIndex]);

  return (
    <section 
      id="faq" 
      className={`${
        isDark ? 'bg-[#0B1120] text-white' : 'bg-gray-100 text-black'
      }       py-20 px-4 sm:px-6 md:px-20 relative overflow-hidden`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full ${
          isDark ? 'bg-blue-500/5' : 'bg-blue-500/10'
        } blur-3xl`}></div>
        <div className={`absolute bottom-20 right-10 w-40 h-40 rounded-full ${
          isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'
        } blur-3xl`}></div>
    <section id="faq" className={`${isDark ? 'bg-[#0B1120] text-white' : 'bg-gray-100 text-black'} py-16 px-6 md:px-20`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 mb-12">
          Everything you need to know about Omex and how it can improve your
          coding workflow.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Frequently Asked
            <span className="block">Questions</span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Everything you need to know about Omex and how it can improve your coding workflow.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                isDark 
                  ? 'border-gray-700/50 bg-[#1A202E]/80 hover:border-blue-500/30 hover:bg-[#1A202E]' 
                  : 'border-gray-300/50 bg-white/80 hover:border-blue-400/30 hover:bg-white'
              } backdrop-blur-sm cursor-pointer ${
                openIndex === index ? 'ring-2 ring-blue-500/20' : ''
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300">
                        {faq.question}
                      </h3>
                      
                      {/* Answer with smooth animation */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="pt-4">
                          <p className={`text-base md:text-lg leading-relaxed ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated chevron */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDark ? 'bg-gray-700/50 group-hover:bg-blue-500/20' : 'bg-gray-200/50 group-hover:bg-blue-500/10'
                  } ${openIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-300" />
                  </div>
                </div>
              </div>
              
              {/* Bottom border animation */}
              <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-300 ${
                openIndex === index ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
            isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-300'
          } backdrop-blur-sm`}>
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Still have questions?
            </span>
            <button onClick={()=>{navigate('/contact')}} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300">
              Contact Support
            </button>
            {openIndex === index && (
              <p
                ref={(el) => (answerRefs.current[index] = el)}
                className="mt-3 text-gray-400"
              >
                {faq.answer}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}