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
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} relative overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-5"
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${isDark ? 'glass-dark' : 'glass'}`}>
              <FaQuestionCircle className="text-blue-400 text-4xl" />
            </div>
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
                isDark ? 'glass-dark' : 'glass'
              }`}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full px-6 py-4 text-left font-semibold flex justify-between items-center transition-colors duration-200 ${
                  expandedCategory === category.id
                    ? isDark ? 'bg-gray-700 bg-opacity-50' : 'bg-blue-50 bg-opacity-50'
                    : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${isDark ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-50'} mr-3`}>
                    {category.category === 'General' && (
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    )}
                    {category.category === 'Features' && (
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                    )}
                    {category.category === 'Technical' && (
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    )}
                    {category.category === 'Support' && (
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xl">{category.category}</span>
                </div>
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
                    <div key={item.id} className={`border-b last:border-b-0 py-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
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
                        <div className={`mt-4 p-4 rounded-lg ${
                          isDark ? 'bg-gray-800 bg-opacity-50 text-gray-300' : 'bg-white bg-opacity-70 text-gray-600'
                        }`}>
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
        <div className={`max-w-3xl mx-auto mt-12 p-8 rounded-lg ${
          isDark ? 'glass-dark' : 'glass'
        } text-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
          </div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500 bg-opacity-20' : 'bg-blue-100'}`}>
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Our support team is here to help. Contact us and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:support@omex.com"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-200 transform hover:scale-105"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
