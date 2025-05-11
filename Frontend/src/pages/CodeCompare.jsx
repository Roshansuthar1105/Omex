import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { FaExchangeAlt, FaSync, FaTrash, FaCopy } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';

const CodeCompare = () => {
  const [leftCode, setLeftCode] = useState('// Enter your first code snippet here');
  const [rightCode, setRightCode] = useState('// Enter your second code snippet here');
  const [comparison, setComparison] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(14);

  const { isDark } = useTheme();

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
  ];

  const compareCode = async () => {
    if (!leftCode.trim() || !rightCode.trim()) {
      toast.error('Please enter code in both editors');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/compare-code`, {
        code1: leftCode,
        code2: rightCode,
        language
      });

      setComparison(response.data);
      toast.success('Comparison complete!');
    } catch (error) {
      console.error('Error comparing code:', error);
      toast.error('Failed to compare code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearEditors = () => {
    setLeftCode('// Enter your first code snippet here');
    setRightCode('// Enter your second code snippet here');
    setComparison('');
    toast.success('Editors cleared!');
  };

  const swapCode = () => {
    const temp = leftCode;
    setLeftCode(rightCode);
    setRightCode(temp);
    toast.success('Code swapped!');
  };

  const copyComparison = () => {
    navigator.clipboard.writeText(comparison);
    toast.success('Comparison copied to clipboard!');
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} py-8 px-4`}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <FaExchangeAlt className="text-red-400 text-2xl mr-2" />
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                OMEX Code Comparison
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} px-3 py-2 rounded-lg`}
                // className="bg-gray-700 text-white px-3 py-2 rounded-lg"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className={`${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} px-3 py-2 rounded-lg`}
              >
                {[12, 14, 16, 18, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>

            </div>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Compare two code snippets to identify differences, improvements, and potential issues.
          </p>
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Left Editor */}
          <div className={`rounded-lg shadow-lg overflow-hidden border ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          }`}>
            <div className={`flex items-center justify-between px-4 py-2 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <span className="font-medium">First Code Snippet</span>
            </div>
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <Editor
                value={leftCode}
                onValueChange={code => setLeftCode(code)}
                highlight={code => prism.highlight(code, prism.languages[language] || prism.languages.javascript, language)}
                padding={20}
                className={`h-full min-h-[300px] w-full ${isDark ? 'text-white' : 'text-gray-800'}`}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: `${fontSize}px`,
                }}
              />
            </div>
          </div>

          {/* Right Editor */}
          <div className={`rounded-lg shadow-lg overflow-hidden border ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          }`}>
            <div className={`flex items-center justify-between px-4 py-2 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <span className="font-medium">Second Code Snippet</span>
            </div>
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <Editor
                value={rightCode}
                onValueChange={code => setRightCode(code)}
                highlight={code => prism.highlight(code, prism.languages[language] || prism.languages.javascript, language)}
                padding={20}
                className={`h-full min-h-[300px] w-full ${isDark ? 'text-white' : 'text-gray-800'}`}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: `${fontSize}px`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={compareCode}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            } text-white`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Comparing...
              </>
            ) : (
              <>
                <FaExchangeAlt className="mr-2" /> Compare Code
              </>
            )}
          </button>

          <button
            onClick={swapCode}
            className="px-6 py-3 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 flex items-center"
          >
            <FaSync className="mr-2" /> Swap Code
          </button>

          <button
            onClick={clearEditors}
            className="px-6 py-3 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-200 flex items-center"
          >
            <FaTrash className="mr-2" /> Clear All
          </button>
        </div>

        {/* Comparison Results */}
        {(loading || comparison) && (
          <div className={`rounded-lg shadow-lg overflow-hidden border ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          } mb-8`}>
            <div className={`flex items-center justify-between px-4 py-2 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <span className="font-medium">Comparison Results</span>
              {comparison && (
                <button
                  onClick={copyComparison}
                  className={`p-2 rounded-md ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
                  } transition-colors`}
                  title="Copy comparison"
                >
                  <FaCopy />
                </button>
              )}
            </div>
            <div className={`p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} overflow-hidden`} style={{ maxHeight: '500px' }}>
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader size="large" color="blue" text="Analyzing code differences..." />
                </div>
              ) : (
                <div className="overflow-y-auto" style={{ maxHeight: '450px' }}>
                  <Markdown
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code: ({ node, ...props }) => (
                        <pre {...props} className={`p-4 rounded-lg ${
                          isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                        }`}>
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
                    }}
                  >
                    {comparison}
                  </Markdown>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeCompare;
