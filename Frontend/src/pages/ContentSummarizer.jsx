import { useState } from 'react';
import { FaFileAlt, FaLightbulb, FaInfoCircle, FaFileUpload, FaYoutube, FaKeyboard } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import MediaUploader from '../components/MediaUploader';
import TextInput from '../components/TextInput';
import YouTubeInput from '../components/YouTubeInput';
import SummaryDisplay from '../components/SummaryDisplay';
import { useTheme } from '../context/ThemeContext';

/**
 * Page component for the Content Summarizer feature
 */
function ContentSummarizer() {
  const { isDark } = useTheme();
  const [inputType, setInputType] = useState('file'); // file, text, youtube
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium'); // short, medium, long
  const [summaryType, setSummaryType] = useState('general'); // general, academic, business

  // Handle file selection
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    // Reset other inputs and summary
    setText('');
    setYoutubeUrl('');
    setSummary('');
    setError('');
  };

  // Handle text input
  const handleTextSubmit = (inputText) => {
    setText(inputText);
    // Reset other inputs and summary
    setFile(null);
    setYoutubeUrl('');
    setSummary('');
    setError('');
  };

  // Handle YouTube URL input
  const handleUrlSubmit = (url) => {
    setYoutubeUrl(url);
    // Reset other inputs and summary
    setFile(null);
    setText('');
    setSummary('');
    setError('');
  };

  // Change input type
  const changeInputType = (type) => {
    setInputType(type);
    // Reset inputs and summary
    setFile(null);
    setText('');
    setYoutubeUrl('');
    setSummary('');
    setError('');
  };

  // Generate summary
  const generateSummary = async () => {
    // Validate input based on input type
    if (inputType === 'file' && !file) {
      toast.error('Please upload a file first');
      return;
    } else if (inputType === 'text' && !text) {
      toast.error('Please enter some text first');
      return;
    } else if (inputType === 'youtube' && !youtubeUrl) {
      toast.error('Please enter a YouTube URL first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let response;

      if (inputType === 'file') {
        // Create form data for file upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('inputType', 'file');
        formData.append('summaryLength', summaryLength);
        formData.append('summaryType', summaryType);

        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/ai/summarize-content`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else if (inputType === 'text') {
        // Send text input
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/ai/summarize-text`,
          {
            text,
            inputType: 'text',
            summaryLength,
            summaryType
          }
        );
      } else if (inputType === 'youtube') {
        // Send YouTube URL
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/ai/summarize-youtube`,
          {
            youtubeUrl,
            inputType: 'youtube',
            summaryLength,
            summaryType
          }
        );
      }

      setSummary(response.data);
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Error generating summary:', error);
      setError(error.response?.data || 'Failed to generate summary. Please try again.');
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  // Clear everything
  const handleClearAll = () => {
    setInputType('file');
    setFile(null);
    setText('');
    setYoutubeUrl('');
    setSummary('');
    setError('');
    setSummaryLength('medium');
    setSummaryType('general');
    toast.success('All cleared!');
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <FaFileAlt className="text-blue-400 text-2xl mr-2" />
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Content Summarizer
              </h1>
            </div>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Upload media files (images, PDFs, videos, text) and get AI-generated summaries of their content.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload and Options */}
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-xl p-6`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Input Content
            </h2>

            {/* Input Type Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-gray-600">
                <button
                  onClick={() => changeInputType('file')}
                  className={`flex items-center py-2 px-4 ${
                    inputType === 'file'
                      ? isDark
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-blue-600 border-b-2 border-blue-600'
                      : isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaFileUpload className="mr-2" />
                  <span>Upload File</span>
                </button>
                <button
                  onClick={() => changeInputType('text')}
                  className={`flex items-center py-2 px-4 ${
                    inputType === 'text'
                      ? isDark
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-blue-600 border-b-2 border-blue-600'
                      : isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaKeyboard className="mr-2" />
                  <span>Enter Text</span>
                </button>
                <button
                  onClick={() => changeInputType('youtube')}
                  className={`flex items-center py-2 px-4 ${
                    inputType === 'youtube'
                      ? isDark
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-blue-600 border-b-2 border-blue-600'
                      : isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <FaYoutube className="mr-2" />
                  <span>YouTube URL</span>
                </button>
              </div>
            </div>

            {/* Input Components */}
            <div className="mb-6">
              {inputType === 'file' && (
                <MediaUploader onFileSelect={handleFileSelect} />
              )}

              {inputType === 'text' && (
                <TextInput onTextSubmit={handleTextSubmit} />
              )}

              {inputType === 'youtube' && (
                <YouTubeInput onUrlSubmit={handleUrlSubmit} />
              )}
            </div>

            {/* Options */}
            <div className="mt-6">
              <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Summary Options
              </h3>

              {/* Summary Length */}
              <div className="mb-4">
                <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Summary Length
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSummaryLength('short')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      summaryLength === 'short'
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Short
                  </button>
                  <button
                    onClick={() => setSummaryLength('medium')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      summaryLength === 'medium'
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setSummaryLength('long')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      summaryLength === 'long'
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Long
                  </button>
                </div>
              </div>

              {/* Summary Type */}
              <div className="mb-6">
                <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Summary Style
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSummaryType('general')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      summaryType === 'general'
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setSummaryType('academic')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      summaryType === 'academic'
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Academic
                  </button>
                  <button
                    onClick={() => setSummaryType('business')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      summaryType === 'business'
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Business
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={generateSummary}
                  disabled={
                    loading ||
                    (inputType === 'file' && !file) ||
                    (inputType === 'text' && !text) ||
                    (inputType === 'youtube' && !youtubeUrl)
                  }
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    loading ||
                    (inputType === 'file' && !file) ||
                    (inputType === 'text' && !text) ||
                    (inputType === 'youtube' && !youtubeUrl)
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {loading ? 'Generating...' : 'Generate Summary'}
                </button>
                <button
                  onClick={handleClearAll}
                  className={`py-2 px-4 rounded-md font-medium transition-colors ${
                    isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Summary Display */}
          <div>
            <SummaryDisplay
              summary={summary}
              loading={loading}
              error={error}
            />

            {/* Tips Section */}
            {!summary && !loading && !error && (
              <div className={`mt-6 p-4 rounded-lg ${
                isDark ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-600'
              }`}>
                <div className="flex items-start">
                  <FaLightbulb className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-2">Tips for Better Summaries</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {inputType === 'file' && (
                        <>
                          <li>Use clear, high-resolution images for better text extraction</li>
                          <li>PDFs with selectable text work better than scanned documents</li>
                          <li>Text files should be properly formatted for best results</li>
                        </>
                      )}

                      {inputType === 'text' && (
                        <>
                          <li>Provide well-structured text with clear paragraphs</li>
                          <li>Include headings or sections for better organization</li>
                          <li>Limit to 15,000 characters for optimal processing</li>
                        </>
                      )}

                      {inputType === 'youtube' && (
                        <>
                          <li>Choose videos with clear audio for better transcription</li>
                          <li>Educational or informational videos work best</li>
                          <li>Videos with captions may provide better summaries</li>
                        </>
                      )}

                      <li>Choose the appropriate summary length and style for your needs</li>
                      <li>Academic style is best for research content, business style for professional content</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className={`mt-8 p-6 rounded-lg ${
          isDark ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-600'
        }`}>
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-2">About Content Summarizer</h3>
              <p className="mb-3">
                The Content Summarizer uses advanced AI to extract and summarize information from various sources:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>File Upload:</strong></li>
                <ul className="list-circle pl-5 space-y-1">
                  <li><strong>Images:</strong> Extracts and summarizes text from images using OCR technology</li>
                  <li><strong>PDFs:</strong> Analyzes document content and provides concise summaries</li>
                  <li><strong>Text Files:</strong> Processes and condenses text files into key points</li>
                </ul>
                <li><strong>Direct Text Input:</strong> Analyzes and summarizes text entered directly into the application</li>
                <li><strong>YouTube Videos:</strong> Extracts information from YouTube videos and provides summaries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentSummarizer;
