import { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor.jsx';
import CodeExamples from '../components/CodeExamples.jsx';
import FeedbackForm from '../components/FeedbackForm.jsx';
import CodeHistory from '../components/CodeHistory.jsx';
import { FaLightbulb, FaCode } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader.jsx';

function CodeOptimizer() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const URL = `${import.meta.env.VITE_BACKEND_URL}/ai/get-review`;
  const [showExamples, setShowExamples] = useState(false);

  const defaultPrompt = `function add(a, b) {
    return a + b;
 }`;

  const [prompt, setPrompt] = useState(defaultPrompt);

  const codeExamples = [
    {
      name: "JavaScript Function",
      code: defaultPrompt
    },
    {
      name: "JavaScript Loop",
      code: `function sumArray(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`
    },
    {
      name: "Python Function",
      code: `def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n-1)`
    }
  ];

  const handleExampleSelect = (code) => {
    setPrompt(code);
    setShowExamples(false);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Loader fullscreen size="xl" color="purple" text="Loading Code Optimizer Tool..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <FaLightbulb className="text-yellow-400 text-2xl mr-2" />
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                OMEX Code Optimizer
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
              >
                <FaCode className="mr-2" /> Examples
              </button>
            </div>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Optimize your code for better performance, readability, and maintainability.
          </p>
        </div>

        {/* Examples Dropdown */}
        {showExamples && (
          <div className="mb-6">
            <CodeExamples
              examples={codeExamples}
              onSelect={handleExampleSelect}
              isDark={isDark}
            />
          </div>
        )}

        {/* Code Editor */}
        <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden">
          <CodeEditor URL={URL} prompt={prompt} />
        </div>
      </div>

      {/* Feedback Form */}
      <FeedbackForm isDark={isDark} />

      {/* Code History */}
      {/* <CodeHistory
        onSelectHistory={(code) => setPrompt(code)}
        isDark={isDark}
      /> */}
    </div>
  );
}

export default CodeOptimizer;
