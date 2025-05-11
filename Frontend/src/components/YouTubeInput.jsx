import { useState } from 'react';
import { FaYoutube, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

/**
 * Component for entering and validating YouTube URLs
 */
const YouTubeInput = ({ onUrlSubmit }) => {
  const { isDark } = useTheme();
  const [url, setUrl] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [error, setError] = useState('');
  
  // Basic YouTube URL validation
  const isValidYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S*)?$/;
    return youtubeRegex.test(url);
  };
  
  // Handle URL change
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };
  
  // Handle URL submission
  const handleSubmit = () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    onUrlSubmit(url);
    setIsEditing(false);
  };
  
  // Reset URL and return to editing mode
  const handleReset = () => {
    setUrl('');
    setError('');
    setIsEditing(true);
  };
  
  // Extract video ID from URL for preview
  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };
  
  return (
    <div className="w-full">
      {isEditing ? (
        <div className={`border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
          <div className={`p-4 ${error ? 'pb-2' : ''}`}>
            <div className="flex items-center">
              <div className={`flex items-center flex-1 p-2 rounded-md ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <FaYoutube className="text-red-600 mr-2 text-xl" />
                <input
                  type="text"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
                  className={`w-full bg-transparent focus:outline-none ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                />
                {url && (
                  <button
                    onClick={() => setUrl('')}
                    className={`p-1 rounded-full ${
                      isDark 
                        ? 'hover:bg-gray-600 text-gray-400' 
                        : 'hover:bg-gray-200 text-gray-500'
                    }`}
                    title="Clear URL"
                  >
                    <FaTimes size={14} />
                  </button>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={!url.trim()}
                className={`ml-2 px-4 py-2 rounded-md font-medium ${
                  !url.trim()
                    ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Submit
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          
          {/* YouTube preview (if valid URL) */}
          {url && isValidYouTubeUrl(url) && (
            <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Preview:
              </p>
              <div className="aspect-video max-h-48 bg-black rounded-md overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${getVideoId(url)}/0.jpg`}
                  alt="YouTube Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`border rounded-lg p-4 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">YouTube Video</h3>
            <button
              onClick={handleReset}
              className={`p-2 rounded-md ${
                isDark 
                  ? 'hover:bg-gray-700 text-blue-400' 
                  : 'hover:bg-gray-100 text-blue-600'
              }`}
              title="Edit URL"
            >
              <FaEdit />
            </button>
          </div>
          
          <div className="flex items-center mb-3">
            <FaYoutube className="text-red-600 mr-2 text-xl" />
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline truncate"
            >
              {url}
            </a>
          </div>
          
          {getVideoId(url) && (
            <div className="aspect-video max-h-48 bg-black rounded-md overflow-hidden mb-3">
              <img 
                src={`https://img.youtube.com/vi/${getVideoId(url)}/0.jpg`}
                alt="YouTube Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <FaCheck className="text-green-500 mr-2" />
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              URL submitted for summarization
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeInput;
