import { useState } from 'react';
import { FaCopy, FaDownload, FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

/**
 * Component to display the summary of the content
 */
const SummaryDisplay = ({ summary, loading, error }) => {
  const { isDark } = useTheme();
  const [expanded, setExpanded] = useState(false);
  
  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    toast.success('Summary copied to clipboard!');
  };
  
  // Handle download as text file
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'content-summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Summary downloaded!');
  };
  
  // Toggle expanded view
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg font-medium">Analyzing content...</p>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            This may take a moment depending on the file size and type
          </p>
        </div>
      </div>
    );
  }
  
  // If error, show error state
  if (error) {
    return (
      <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border-red-800' : 'bg-white border-red-300'} border`}>
        <div className="flex flex-col items-center justify-center py-4 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">Error Processing Content</p>
          <p className="text-sm mt-2 text-center max-w-md">
            {error}
          </p>
        </div>
      </div>
    );
  }
  
  // If no summary, show empty state
  if (!summary) {
    return (
      <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium">No Summary Available</p>
          <p className={`text-sm mt-2 text-center max-w-md ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Upload a file to generate a summary of its content
          </p>
        </div>
      </div>
    );
  }
  
  // Show summary
  return (
    <div className={`rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="text-lg font-medium">Content Summary</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className={`p-2 rounded-md transition-colors ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
            }`}
            title="Copy to clipboard"
          >
            <FaCopy />
          </button>
          <button
            onClick={handleDownload}
            className={`p-2 rounded-md transition-colors ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
            }`}
            title="Download as text file"
          >
            <FaDownload />
          </button>
          <button
            onClick={toggleExpanded}
            className={`p-2 rounded-md transition-colors ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
            }`}
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <FaCompressAlt /> : <FaExpandAlt />}
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div 
        className={`p-4 overflow-y-auto ${
          expanded ? 'max-h-[80vh]' : 'max-h-96'
        }`}
      >
        <Markdown
          rehypePlugins={[rehypeHighlight]}
          components={{
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
            blockquote: ({ node, ...props }) => (
              <blockquote 
                {...props} 
                className={`border-l-4 pl-4 italic my-4 ${
                  isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-600'
                }`} 
              />
            ),
            code: ({ node, inline, ...props }) => (
              inline 
                ? <code {...props} className={`px-1 py-0.5 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />
                : <pre {...props} className={`p-4 rounded-lg my-4 overflow-auto ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <code {...props} />
                  </pre>
            )
          }}
        >
          {summary}
        </Markdown>
      </div>
    </div>
  );
};

export default SummaryDisplay;
