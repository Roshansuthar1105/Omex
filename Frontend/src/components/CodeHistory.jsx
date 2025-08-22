import React, { useState, useEffect } from 'react';
import { FaHistory, FaTrash, FaCode } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CodeHistory = ({ onSelectHistory, isDark = true }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  
  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('codeOptimizerHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error parsing history:', error);
        // If there's an error parsing, reset the history
        localStorage.removeItem('codeOptimizerHistory');
      }
    }
  }, []);
  
  // Add a new entry to history
  const addToHistory = (code, optimizedCode) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      code,
      optimizedCode,
    };
    
    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep only the last 10 entries
    setHistory(updatedHistory);
    localStorage.setItem('codeOptimizerHistory', JSON.stringify(updatedHistory));
  };
  
  // Clear all history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('codeOptimizerHistory');
    toast.success('History cleared!');
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Truncate code for display
  const truncateCode = (code, maxLength = 50) => {
    if (!code) return '';
    return code.length > maxLength ? code.substring(0, maxLength) + '...' : code;
  };
  
  return (
    <div className={`fixed top-24 right-4 z-10 ${isDark ? 'text-white' : 'text-gray-800'}`}>
      {!showHistory ? (
        <button
          onClick={() => setShowHistory(true)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg transition-all duration-200 ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <FaHistory />
          <span>History</span>
        </button>
      ) : (
        <div className={`p-4 rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white border border-gray-300'
        }`} style={{ width: '320px', maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Code History</h3>
            <div className="flex space-x-2">
              <button 
                onClick={clearHistory}
                className={`p-1 rounded-md ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } transition-colors`}
                title="Clear History"
              >
                <FaTrash size={14} />
              </button>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
          
          {history.length === 0 ? (
            <div className="text-center py-4">
              <FaCode className="mx-auto mb-2 opacity-50" />
              <p className="text-sm opacity-70">No history yet</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {history.map((entry) => (
                <li 
                  key={entry.id}
                  className={`p-2 rounded-md cursor-pointer ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } transition-colors`}
                  onClick={() => {
                    onSelectHistory(entry.code);
                    setShowHistory(false);
                  }}
                >
                  <div className="text-xs opacity-70 mb-1">{formatDate(entry.timestamp)}</div>
                  <div className="font-mono text-sm overflow-hidden">
                    {truncateCode(entry.code)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

// Export both the component and the addToHistory function
export default CodeHistory;
