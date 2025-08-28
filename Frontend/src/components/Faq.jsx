import { useTheme } from '../context/ThemeContext';
import { ChevronDown, HelpCircle, Sparkles, Code, Settings, Shield, MessageCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const faqs = [
  {
    id: 1,
    category: 'General',
    icon: HelpCircle,
    questions: [
      {
        id: 'general-1',
        question: 'What is OMEX?',
        answer: 'OMEX is an AI-powered platform designed to help developers write better, cleaner, and more efficient code. It offers a suite of tools for code optimization, generation, complexity analysis, comparison, and more.'
      },
      {
        id: 'general-2',
        question: 'Is OMEX free to use?',
        answer: 'OMEX provides a free tier that allows developers to explore its essential features with limited usage. For professional and enterprise developers, OMEX offers paid plans that unlock unlimited code generation, in-depth optimization reports, priority support, and integration with developer tools such as GitHub, VS Code, and CI/CD pipelines.'
      },
      {
        id: 'general-3',
        question: 'Do I need to create an account to use OMEX?',
        answer: 'While basic features are available without an account, creating a free account allows you to save your work, track your history, and access additional features.'
      },
      {
        id: 'general-4',
        question: 'Do I need to install anything to use Omex?',
        answer: 'No installation is required. Omex runs entirely on the web, which means you can access it directly from your browser without worrying about setup or system compatibility. For convenience, we also provide browser extensions and IDE plugins so you can integrate Omex seamlessly into your existing workflow.'
      },
      {
        id: 'general-5',
        question: 'Who can benefit from using Omex?',
        answer: 'Omex is designed for a wide range of users, including students, individual developers, startups, and large enterprises. Beginners can use it to learn coding best practices, while professionals and teams can rely on it for maintaining large codebases, reducing technical debt, and ensuring consistency across projects.'
      }
    ]
  },
  {
    id: 2,
    category: 'Features',
    icon: Code,
    questions: [
      {
        id: 'features-1',
        question: 'What programming languages does OMEX support?',
        answer: 'OMEX supports multiple popular programming languages including JavaScript, Python, Java, C++, C#, Ruby, PHP, Go, and more. Our team is continuously working on expanding language support to meet the needs of diverse developer communities worldwide.'
      },
      {
        id: 'features-2',
        question: 'How does the Code Optimizer work?',
        answer: 'The Code Optimizer uses advanced AI to analyze your code and suggest improvements for performance, readability, and maintainability. It identifies inefficient patterns, potential bugs, and areas for optimization.'
      },
      {
        id: 'features-3',
        question: 'How does Omex optimize my code?',
        answer: 'Omex analyzes your code for potential bottlenecks in performance, readability, and maintainability. Using AI models, it suggests alternative approaches, refactors inefficient code blocks, and recommends best practices aligned with modern coding standards. This ensures your codebase remains scalable and easier to maintain in the long run.'
      },
      {
        id: 'features-4',
        question: 'Can OMEX generate code from scratch?',
        answer: 'Yes, the Code Generator can create code based on your requirements. Simply describe what you need, specify the language, and the AI will generate functional code with explanations.'
      },
      {
        id: 'features-5',
        question: 'Can I generate complete code using Omex?',
        answer: 'Yes! Omex can generate complete code snippets, boilerplate structures, and even function implementations based on your requirements. Whether you need starter templates for APIs, UI components, or algorithm implementations, Omex assists in generating production-ready code that follows best practices.'
      },
      {
        id: 'features-6',
        question: 'What is the Content Summarizer used for?',
        answer: 'The Content Summarizer can extract and condense information from various sources including text, images, PDFs, and YouTube videos. It\'s useful for quickly understanding the key points of large documents or media.'
      }
    ]
  },
  {
    id: 3,
    category: 'Technical',
    icon: Shield,
    questions: [
      {
        id: 'technical-1',
        question: 'Is my code secure when I use OMEX?',
        answer: 'Yes, we take security seriously. Your code is encrypted in transit and we do not store your code permanently unless you explicitly save it to your account. We never share your code with third parties.'
      },
      {
        id: 'technical-2',
        question: 'Can I use OMEX offline?',
        answer: 'Currently, OMEX requires an internet connection as it uses cloud-based AI models. However, we\'re exploring options for limited offline functionality in the future.'
      },
      {
        id: 'technical-3',
        question: 'What browsers are supported?',
        answer: 'OMEX works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.'
      }
    ]
  },
  {
    id: 4,
    category: 'Support',
    icon: MessageCircle,
    questions: [
      {
        id: 'support-1',
        question: 'How can I get help if I encounter issues?',
        answer: 'You can contact our support team at support@omex.com. We also have a comprehensive documentation section and community forums where you can find answers to common questions.'
      },
      {
        id: 'support-2',
        question: 'Can I request new features?',
        answer: 'Absolutely! We welcome feature requests and feedback. You can submit your ideas through our feedback form or by emailing features@omex.com.'
      },
      {
        id: 'support-3',
        question: 'Do you offer API access?',
        answer: 'Yes, we offer API access for premium users who want to integrate OMEX capabilities into their own applications or workflows. Contact our sales team for more information.'
      }
    ]
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const answerRefs = useRef([]);
  const categoryRefs = useRef([]);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const toggleFAQ = (categoryId, questionIndex) => {
    const uniqueIndex = `${categoryId}-${questionIndex}`;
    setOpenIndex(openIndex === uniqueIndex ? null : uniqueIndex);
  };

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  useEffect(() => {
    if (openIndex !== null) {
      const el = answerRefs.current[openIndex];
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, height: 0 },
          {
            opacity: 1,
            y: 0,
            height: 'auto',
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }
    }
  }, [openIndex]);

  useEffect(() => {
    if (activeCategory !== null) {
      const el = categoryRefs.current[activeCategory];
      if (el) {
        gsap.fromTo(
          el.querySelectorAll('.faq-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    }
  }, [activeCategory]);

  return (
    <section 
      id="faq" 
      className={`${
        isDark ? 'bg-[#0B1120] text-white' : 'bg-gray-100 text-black'
      } py-20 px-4 sm:px-6 md:px-20 relative overflow-hidden`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full ${
          isDark ? 'bg-blue-500/5' : 'bg-blue-500/10'
        } blur-3xl`}></div>
        <div className={`absolute bottom-20 right-10 w-40 h-40 rounded-full ${
          isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'
        } blur-3xl`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full ${
          isDark ? 'bg-indigo-500/3' : 'bg-indigo-500/5'
        } blur-3xl`}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Everything you need to know about Omex and how it can improve your coding workflow.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {faqs.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? isDark 
                      ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/40' 
                      : 'bg-blue-500/20 text-blue-600 border-2 border-blue-500/40'
                    : isDark
                      ? 'bg-gray-800/50 text-gray-400 border-2 border-gray-700/50 hover:border-blue-500/30'
                      : 'bg-white/50 text-gray-600 border-2 border-gray-300/50 hover:border-blue-400/30'
                } backdrop-blur-sm`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{category.category}</span>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {category.questions.length}
                </div>
              </button>
            );
          })}
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category) => (
            <div
              key={category.id}
              ref={(el) => categoryRefs.current[category.id] = el}
              className={`transition-all duration-500 ${
                activeCategory === null || activeCategory === category.id
                  ? 'opacity-100 max-h-none'
                  : 'opacity-30 max-h-0 overflow-hidden'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'
                }`}>
                  <category.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  {category.category}
                </h3>
                <div className={`h-px flex-1 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-300'
                }`}></div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((question, questionIndex) => {
                  const uniqueIndex = `${category.id}-${questionIndex}`;
                  const isOpen = openIndex === uniqueIndex;
                  
                  return (
                    <div
                      key={question.id}
                      className="faq-item group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                      style={{
                        borderColor: isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(209, 213, 219, 0.5)',
                        backgroundColor: isDark ? 'rgba(26, 32, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                      }}
                      onClick={() => toggleFAQ(category.id, questionIndex)}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                              isOpen
                                ? 'bg-blue-500 text-white'
                                : isDark 
                                  ? 'bg-blue-500/20 text-blue-400' 
                                  : 'bg-blue-500/10 text-blue-600'
                            }`}>
                              {questionIndex + 1}
                            </div>
                            
                            <div className="flex-1">
                              <h4 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                                isOpen ? 'text-blue-400' : ''
                              } group-hover:text-blue-400`}>
                                {question.question}
                              </h4>
                              
                              {/* Answer with smooth animation */}
                              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                              }`}>
                                <div 
                                  ref={(el) => answerRefs.current[uniqueIndex] = el}
                                  className="pt-4"
                                >
                                  <p className={`text-base leading-relaxed ${
                                    isDark ? 'text-gray-400' : 'text-gray-600'
                                  }`}>
                                    {question.answer}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Animated chevron */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isDark ? 'bg-gray-700/50 group-hover:bg-blue-500/20' : 'bg-gray-200/50 group-hover:bg-blue-500/10'
                          } ${isOpen ? 'rotate-180 bg-blue-500/20' : ''}`}>
                            <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom border animation */}
                      <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-300 ${
                        isOpen ? 'scale-x-100' : 'scale-x-0'
                      }`}></div>
                    </div>
                  );
                })}
              </div>
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
            <button 
              onClick={() => navigate('/contact')} 
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300 hover:underline"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}