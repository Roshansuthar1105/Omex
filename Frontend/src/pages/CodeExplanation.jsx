import { useState, useEffect } from 'react';
import { FaLightbulb, FaCode, FaCopy, FaTrash, FaPlay, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';

function CodeExplanation() {
  const [code, setCode] = useState(`function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort(numbers));`);
  const [language, setLanguage] = useState('JavaScript');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { isDark } = useTheme();

  const languages = ["JavaScript", "Python", "Java", "C++", "C#", "PHP", "Go", "Ruby", "HTML", "CSS", "TypeScript", "Rust", "Swift", "Kotlin"];

  const explainCode = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code first');
      return;
    }

    setProcessing(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/explain-code`, {
        code,
        language
      });

      setExplanation(response.data);
      toast.success('Code explanation generated successfully!');
    } catch (error) {
      console.error('Error explaining code:', error);
      toast.error('Failed to explain code. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCopyExplanation = () => {
    navigator.clipboard.writeText(explanation);
    toast.success('Explanation copied to clipboard!');
  };

  const handleClearAll = () => {
    setCode('');
    setExplanation('');
    toast.success('All cleared!');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Loader fullscreen size="xl" color="purple" text="Loading Code Explanation Tool..." />
      </div>
    );
  }

  return (
    <div className={`w-full p-4 md:p-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-[80vh]">
        {/* Editor Panel */}
        <div className="relative h-1/2 md:h-full md:w-1/2">
          <div className={`h-full overflow-hidden rounded-lg shadow-lg border ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          }`}>
            <div className={`flex items-center justify-between px-4 py-2 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <div className="flex items-center">
                <FaCode className="mr-2" />
                <span className="font-medium">{language} Editor</span>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`px-3 py-1 rounded border ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleClearAll}
                  className={`p-2 rounded-md ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
                  } transition-colors`}
                  title="Clear Editor"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className={`h-[calc(100%-40px)] overflow-y-auto ${
              isDark ? 'bg-gray-900' : 'bg-white'
            }`}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className={`w-full h-full p-4 resize-none font-mono text-sm outline-none ${
                  isDark 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-800'
                }`}
              />
            </div>
          </div>

          <button
            onClick={explainCode}
            disabled={processing}
            className={`absolute bottom-4 right-4 px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
              processing
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
            } text-white`}
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <FaPlay className="mr-2" /> Explain
              </>
            )}
          </button>
        </div>

        {/* Explanation Panel */}
        <div className={`h-1/2 md:h-full md:w-1/2 rounded-lg shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`px-4 py-2 ${
            isDark ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
          } flex justify-between items-center`}>
            <span className="font-medium flex items-center"><FaLightbulb className="mr-2" /> Explanation</span>
            {explanation && (
              <button
                onClick={handleCopyExplanation}
                className={`p-2 rounded-md ${
                  isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
                } transition-colors flex items-center`}
                title="Copy explanation"
              >
                <FaCopy className="mr-1" /> Copy
              </button>
            )}
          </div>

          <div className={`h-[calc(100%-40px)] overflow-y-auto p-4 ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {processing ? (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            ) : explanation ? (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                className={`${isDark ? 'prose-invert' : ''} prose max-w-none`}
                components={{
                  code: ({ node, ...props }) => (
                    <pre {...props} className={`p-4 rounded-lg ${
                      isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
                    } overflow-auto`}>
                      <code {...props} />
                    </pre>
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="mb-4" />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-2xl font-bold mb-4" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-xl font-bold mb-3" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-lg font-bold mb-2" />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc pl-5 mb-4" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="list-decimal pl-5 mb-4" />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="mb-1" />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-auto"><table {...props} className="table-auto w-full border-collapse" /></div>
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className={`border px-2 py-1 ${isDark ? 'border-gray-700' : 'border-gray-300'}`} />
                  ),
                  td: ({ node, ...props }) => (
                    <td {...props} className={`border px-2 py-1 ${isDark ? 'border-gray-700' : 'border-gray-300'}`} />
                  ),
                }}
              >
                {explanation}
              </Markdown>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FaLightbulb className="text-4xl mb-4 opacity-50" />
                <p className="text-lg opacity-70">Paste your code on the left and click "Explain" to get a detailed breakdown</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeExplanation;
