import { useState } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

/**
 * Component for entering and editing text content
 */
const TextInput = ({ onTextSubmit }) => {
  const { isDark } = useTheme();
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  
  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  // Handle text submission
  const handleSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text);
      setIsEditing(false);
    }
  };
  
  // Reset text and return to editing mode
  const handleReset = () => {
    setText('');
    setIsEditing(true);
  };
  
  return (
    <div className="w-full">
      {isEditing ? (
        <div className={`border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to summarize (up to 15,000 characters)..."
            className={`w-full p-4 rounded-t-lg resize-none h-64 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark 
                ? 'bg-gray-800 text-white border-gray-700' 
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          />
          <div className={`flex justify-between items-center p-3 rounded-b-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <div className="text-sm">
              <span className={`font-medium ${
                text.length > 15000 
                  ? 'text-red-500' 
                  : isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {text.length}
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                /15000 characters
              </span>
              {text.length > 15000 && (
                <span className="text-red-500 ml-2">
                  (Text will be truncated)
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setText('')}
                className={`p-2 rounded-md ${
                  isDark 
                    ? 'hover:bg-gray-600 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
                disabled={!text}
                title="Clear text"
              >
                <FaTimes />
              </button>
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className={`px-4 py-2 rounded-md font-medium ${
                  !text.trim()
                    ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`border rounded-lg p-4 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">Text Content</h3>
            <button
              onClick={handleReset}
              className={`p-2 rounded-md ${
                isDark 
                  ? 'hover:bg-gray-700 text-blue-400' 
                  : 'hover:bg-gray-100 text-blue-600'
              }`}
              title="Edit text"
            >
              <FaEdit />
            </button>
          </div>
          <div className={`p-3 rounded-lg max-h-40 overflow-y-auto ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <p className="whitespace-pre-wrap text-sm">
              {text.length > 300 
                ? `${text.substring(0, 300)}...` 
                : text}
            </p>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <FaCheck className="text-green-500 mr-2" />
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Text submitted for summarization
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInput;
