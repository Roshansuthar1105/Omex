import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FeedbackForm = ({ isDark = true }) => {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the feedback to your backend
    // For now, we'll just show a toast notification
    toast.success('Thank you for your feedback!');
    
    // Reset form
    setFeedback('');
    setRating(null);
    setShowForm(false);
  };
  
  return (
    <div className={`fixed bottom-6 right-30 z-11 ${isDark ? 'text-white' : 'text-gray-800'}`}>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg transition-all duration-200 ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <FaComment />
          <span>Feedback</span>
        </button>
      ) : (
        <div className={`p-4 rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white border border-gray-300'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Share Your Feedback</h3>
            <button 
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium">How was your experience?</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setRating('positive')}
                  className={`p-2 rounded-md transition-colors ${
                    rating === 'positive' 
                      ? 'bg-green-600 text-white' 
                      : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <FaThumbsUp className={rating === 'positive' ? 'text-white' : ''} />
                </button>
                <button
                  type="button"
                  onClick={() => setRating('negative')}
                  className={`p-2 rounded-md transition-colors ${
                    rating === 'negative' 
                      ? 'bg-red-600 text-white' 
                      : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <FaThumbsDown className={rating === 'negative' ? 'text-white' : ''} />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium">Comments (optional)</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={`w-full p-2 rounded-md ${
                  isDark 
                    ? 'bg-gray-700 text-white border-gray-600' 
                    : 'bg-white text-gray-800 border-gray-300'
                } border`}
                rows="3"
                placeholder="Tell us what you think..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={!rating}
              className={`w-full py-2 rounded-md font-medium ${
                !rating 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
