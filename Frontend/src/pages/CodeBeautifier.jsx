import { useState, useEffect } from 'react';
import { FaMagic, FaCode, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';

function CodeBeautifier() {
  const [code, setCode] = useState(`function calculateTotal(items,tax){
let total=0;for(let i=0;i<items.length;i++){
total+=items[i].price;}
return total+(total*tax);}`);
  const [language, setLanguage] = useState('JavaScript');
  const [beautifiedCode, setBeautifiedCode] = useState('');
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const languages = ["JavaScript", "Python", "Java", "C++", "C#", "PHP", "Go", "Ruby", "HTML", "CSS"];

  const beautifyCode = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/beautify-code`, {
        code,
        language
      });

      setBeautifiedCode(response.data);
      toast.success('Code beautified successfully!');
    } catch (error) {
      console.error('Error beautifying code:', error);
      toast.error('Failed to beautify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBeautifiedCode = () => {
    navigator.clipboard.writeText(beautifiedCode);
    toast.success('Beautified code copied to clipboard!');
  };

  const handleClearAll = () => {
    setCode('');
    setBeautifiedCode('');
    toast.success('All cleared!');
  };

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
        <Loader fullscreen size="xl" color="purple" text="Loading Code Beautifier Tool..." />
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
              <FaMagic className="text-purple-400 text-2xl mr-2" />
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Code Beautifier
              </h1>
            </div>

          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Transform messy, inconsistent code into clean, well-structured code that follows best practices.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input Section */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <FaCode className="inline mr-2" /> Your Code
              </h2>
              <div className="flex space-x-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`px-3 py-1 rounded ${
                    isDark
                      ? 'bg-gray-800 text-white border-gray-600'
                      : 'bg-gray-100 text-gray-800 border-gray-300'
                  } border`}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg overflow-hidden mb-4`}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-64 p-4 font-mono text-sm ${
                  isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'
                }`}
                placeholder="Paste your messy code here..."
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleClearAll}
                className={`px-4 py-2 rounded ${
                  isDark
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors`}
              >
                Clear All
              </button>
              <button
                onClick={beautifyCode}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors flex items-center"
              >
                {loading ? <Loader size="small" /> : 'Beautify Code'}
              </button>
            </div>
          </div>

          {/* Beautified Code Output Section */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <FaLightbulb className="inline mr-2" /> Beautified Code
              </h2>
              {beautifiedCode && (
                <button
                  onClick={handleCopyBeautifiedCode}
                  className={`px-3 py-1 rounded ${
                    isDark
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-200 hover:bg-gray-300'
                  } transition-colors text-sm`}
                >
                  Copy to Clipboard
                </button>
              )}
            </div>

            <div className={`border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg overflow-hidden`} style={{ height: '500px' }}>
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              ) : beautifiedCode ? (
                <div className={`h-full overflow-y-auto p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <Markdown
                    rehypePlugins={[rehypeHighlight]}
                    className={isDark ? 'text-white' : 'text-gray-800'}
                  >
                    {beautifiedCode}
                  </Markdown>
                </div>
              ) : (
                <div className={`flex flex-col justify-center items-center h-full ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaMagic className="text-4xl mb-4 opacity-50" />
                  <p className="text-center">
                    Enter your messy code and click "Beautify Code" to transform it into clean, well-structured code.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeBeautifier;
