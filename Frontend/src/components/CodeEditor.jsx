import React, { useEffect, useState } from 'react'
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import { FaCopy, FaTrash, FaCode, FaCheck } from "react-icons/fa";
import { MdDone, MdSettings } from "react-icons/md";
import Loader from "../components/Loader.jsx"
import Editor from 'react-simple-code-editor';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

function CodeEditor(props) {
  const URL = props.URL;
  const [prompt, setPrompt] = useState(props.prompt || '');
  const [copyText, setCopyButtonText] = useState(true);
  const [review, setReview] = useState('');
  const [optimisedCode, setOptimisedCode] = useState('');
  const [lang, setLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [codelang, setCodeLang] = useState("JavaScript");
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // Update prompt when props.prompt changes
  useEffect(() => {
    if (props.prompt !== prompt) {
      setPrompt(props.prompt);
    }
  }, [props.prompt]);

  const { isDark } = useTheme();

  const languages = ["Java", "JavaScript", "C", "C++", "Python", "Go"];

  const handleCopyClick = () => {
    navigator.clipboard.writeText(optimisedCode);
    setCopyButtonText(false);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopyButtonText(true), 2000);
  };

  const handleClearEditor = () => {
    setPrompt('');
    setReview('');
    setOptimisedCode('');
    setLang('');
    toast.success("Editor cleared!");
  };

  const changeLanguage = (lang) => {
    setCodeLang(lang);
    toast.success(`Language changed to ${lang}`);
  };

  function extractRecommendedFix(text) {
    const txt = "Recommended Fix:";
    const index = text.indexOf(txt);
    if (index !== -1) {
      var newTxt = text.substring(index + txt.length);
      const startIndex = newTxt.indexOf("```");
      newTxt = newTxt.substring(startIndex + 3, newTxt.indexOf("```", startIndex + 3));
      const lang = newTxt.substring(0, newTxt.indexOf("\n"));
      const result = newTxt.substring(newTxt.indexOf("\n") + 1);
      setOptimisedCode(result);
      setLang(lang);
    }
  }

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      if (prompt.trim() === "") {
        setReview("Please enter some code to review");
        setLoading(false);
        return;
      }
      const response = await axios.post(URL, { prompt });
      setReview(response.data);
      extractRecommendedFix(response.data);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      toast.success('Operation successful!');
      setLoading(false);
    }
  }

  return (
    <div className={`w-full p-4 md:p-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
      {/* Settings Panel */}
      {showSettings && (
        <div className={`mb-4 p-4 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Editor Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Programming Language</label>
              <select
                value={codelang}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              >
                {languages.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Font Size</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full mr-2"
                />
                <span>{fontSize}px</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <span className="font-medium">{codelang} Editor</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-md ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
                  } transition-colors`}
                  title="Settings"
                >
                  <MdSettings />
                </button>
                <button
                  onClick={handleClearEditor}
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
              <Editor
                value={prompt}
                onValueChange={prompt => setPrompt(prompt)}
                highlight={prompt => prism.highlight(prompt, prism.languages.javascript, codelang)}
                padding={20}
                className={`h-full w-full ${isDark ? 'text-white' : 'text-gray-800'}`}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: `${fontSize}px`,
                  minHeight: '100%'
                }}
              />
            </div>
          </div>

          <button
            onClick={reviewCode}
            disabled={loading}
            className={`absolute bottom-4 right-4 px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
            } text-white`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <FaCheck className="mr-2" /> Review
              </>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className={`h-1/2 md:h-full md:w-1/2 rounded-lg shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`px-4 py-2 ${
            isDark ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
          } flex justify-between items-center`}>
            <span className="font-medium">Review Results</span>
            {lang && (
              <button
                onClick={handleCopyClick}
                className={`p-2 rounded-md ${
                  isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
                } transition-colors flex items-center`}
                title="Copy optimized code"
              >
                {copyText ? (
                  <>
                    <FaCopy className="mr-1" /> Copy Code
                  </>
                ) : (
                  <>
                    <MdDone className="mr-1" /> Copied!
                  </>
                )}
              </button>
            )}
          </div>

          <div className={`h-[calc(100%-40px)] overflow-y-auto p-4 ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            ) : review ? (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: ({ node, ...props }) => (
                    <pre {...props} className={`p-4 rounded-lg ${
                      isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
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
                {review}
              </Markdown>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FaCode className="text-4xl mb-4 opacity-50" />
                <p className="text-lg opacity-70">Enter your code and click "Review" to get optimization suggestions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor