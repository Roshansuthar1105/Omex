import React, { useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const FAQ = () => {
  const { isDark } = useTheme();
  
  // FAQ data
  const faqData = [
    {
      id: 1,
      category: 'General',
      questions: [
        {
          id: 'general-1',
          question: 'What is OMEX?',
          answer: 'OMEX is an AI-powered platform designed to help developers write better, cleaner, and more efficient code. It offers a suite of tools for code optimization, generation, complexity analysis, comparison, and more.'
        },
        {
          id: 'general-2',
          question: 'Is OMEX free to use?',
          answer: 'Yes, OMEX currently offers a free tier with access to most features. We also offer premium plans for users who need advanced features, higher usage limits, and priority support.'
        },
        {
          id: 'general-3',
          question: 'Do I need to create an account to use OMEX?',
          answer: 'While basic features are available without an account, creating a free account allows you to save your work, track your history, and access additional features.'
        }
      ]
    },
    {
      id: 2,
      category: 'Features',
      questions: [
        {
          id: 'features-1',
          question: 'What programming languages does OMEX support?',
          answer: 'OMEX supports a wide range of programming languages including JavaScript, Python, Java, C++, C#, Ruby, PHP, Go, and more. Support may vary by feature.'
        },
        {
          id: 'features-2',
          question: 'How does the Code Optimizer work?',
          answer: 'The Code Optimizer uses advanced AI to analyze your code and suggest improvements for performance, readability, and maintainability. It identifies inefficient patterns, potential bugs, and areas for optimization.'
        },
        {
          id: 'features-3',
          question: 'Can OMEX generate code from scratch?',
          answer: 'Yes, the Code Generator can create code based on your requirements. Simply describe what you need, specify the language, and the AI will generate functional code with explanations.'
        },
        {
          id: 'features-4',
          question: 'What is the Content Summarizer used for?',
          answer: 'The Content Summarizer can extract and condense information from various sources including text, images, PDFs, and YouTube videos. It\'s useful for quickly understanding the key points of large documents or media.'
        }
      ]
    },
    {
      id: 3,
      category: 'Technical',
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
  
  // State to track which categories and questions are expanded
  const [expandedCategory, setExpandedCategory] = useState(1);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  
  // Toggle question expansion
  const toggleQuestion = (questionId) => {
    setExpandedQuestions({
      ...expandedQuestions,
      [questionId]: !expandedQuestions[questionId]
    });
  };
  
  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaQuestionCircle className="text-blue-400 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Find answers to common questions about OMEX and its features. If you can't find what you're looking for, feel free to contact our support team.
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqData.map((category) => (
            <div 
              key={category.id} 
              className={`mb-6 rounded-lg overflow-hidden ${
                isDark ? 'bg-gray-900' : 'bg-white'
              } shadow-lg`}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full px-6 py-4 text-left font-semibold flex justify-between items-center ${
                  expandedCategory === category.id 
                    ? isDark ? 'bg-gray-700' : 'bg-blue-50' 
                    : ''
                }`}
              >
                <span className="text-xl">{category.category}</span>
                {expandedCategory === category.id ? (
                  <FaChevronUp className="text-blue-400" />
                ) : (
                  <FaChevronDown className="text-blue-400" />
                )}
              </button>
              
              {/* Questions */}
              {expandedCategory === category.id && (
                <div className="px-6 py-2">
                  {category.questions.map((item) => (
                    <div key={item.id} className="border-b last:border-b-0 py-4">
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full text-left flex justify-between items-center"
                      >
                        <span className="font-medium">{item.question}</span>
                        {expandedQuestions[item.id] ? (
                          <FaChevronUp className="text-blue-400 flex-shrink-0 ml-2" />
                        ) : (
                          <FaChevronDown className="text-blue-400 flex-shrink-0 ml-2" />
                        )}
                      </button>
                      
                      {expandedQuestions[item.id] && (
                        <div className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Contact Section */}
        <div className={`max-w-3xl mx-auto mt-12 p-6 rounded-lg ${
          isDark ? 'bg-gray-900' : 'bg-white'
        } shadow-lg text-center`}>
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Our support team is here to help. Contact us and we'll get back to you as soon as possible.
          </p>
          <a 
            href="mailto:support@omex.com" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
