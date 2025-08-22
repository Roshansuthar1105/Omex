import React from 'react';
import { FaCode } from 'react-icons/fa';

const CodeExamples = ({ examples, onSelect, isDark = true }) => {
  return (
    <div className={`rounded-lg p-4 shadow-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
      <div className="flex items-center mb-3">
        <FaCode className={`mr-2 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Code Examples
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examples.map((example, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-md cursor-pointer transition-colors duration-200 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-600' 
                : 'bg-white hover:bg-gray-100 border border-gray-300'
            }`}
            onClick={() => onSelect(example.code)}
          >
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {example.name}
            </h4>
            <div className={`text-sm overflow-hidden line-clamp-3 font-mono ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {example.code.substring(0, 100)}
              {example.code.length > 100 && '...'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeExamples;
