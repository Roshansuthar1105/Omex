import { useState, useEffect } from 'react';
import { FaTachometerAlt, FaCode, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';

function PerformanceAnalyzer() {
  const exampleCodes = {
  "JavaScript": `function findDuplicates(array) {
  const duplicates = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i !== j && array[i] === array[j] && !duplicates.includes(array[i])) {
        duplicates.push(array[i]);
      }
    }
  }
  return duplicates;
}`,
  "Python": `def find_duplicates(array):
  duplicates = []
  for i in range(len(array)):
    for j in range(len(array)):
      if i != j and array[i] == array[j] and array[i] not in duplicates:
        duplicates.append(array[i])
  return duplicates`,
  "Java": `import java.util.*;
public class Main {
  public static List<Integer> findDuplicates(int[] array) {
    List<Integer> duplicates = new ArrayList<>();
    for (int i = 0; i < array.length; i++) {
      for (int j = 0; j < array.length; j++) {
        if (i != j && array[i] == array[j] && !duplicates.contains(array[i])) {
          duplicates.add(array[i]);
        }
      }
    }
    return duplicates;
  }
}`,
  "C++": `#include <vector>
#include <algorithm>
std::vector<int> findDuplicates(const std::vector<int>& array) {
  std::vector<int> duplicates;
  for (size_t i = 0; i < array.size(); ++i) {
    for (size_t j = 0; j < array.size(); ++j) {
      if (i != j && array[i] == array[j] && std::find(duplicates.begin(), duplicates.end(), array[i]) == duplicates.end()) {
        duplicates.push_back(array[i]);
      }
    }
  }
  return duplicates;
}`,
  "C#": `using System.Collections.Generic;
public class Example {
  public static List<int> FindDuplicates(int[] array) {
    List<int> duplicates = new List<int>();
    for (int i = 0; i < array.Length; i++) {
      for (int j = 0; j < array.Length; j++) {
        if (i != j && array[i] == array[j] && !duplicates.Contains(array[i])) {
          duplicates.Add(array[i]);
        }
      }
    }
    return duplicates;
  }
}`,
  "PHP": '<?php\nfunction findDuplicates($array) {\n    $duplicates = array();\n    for ($i = 0; $i < count($array); $i++) {\n        for ($j = 0; $j < count($array); $j++) {\n            if ($i != $j && $array[$i] == $array[$j] && !in_array($array[$i], $duplicates)) {\n                $duplicates[] = $array[$i];\n            }\n        }\n    }\n    return $duplicates;\n}\n?>',
  "Go": `func findDuplicates(array []int) []int {
  duplicates := []int{}
  for i := 0; i < len(array); i++ {
    for j := 0; j < len(array); j++ {
      if i != j && array[i] == array[j] && !contains(duplicates, array[i]) {
        duplicates = append(duplicates, array[i])
      }
    }
  }
  return duplicates
}
func contains(arr []int, val int) bool {
  for _, v := range arr {
    if v == val {
      return true
    }
  }
  return false
}`,
  "Ruby": `def find_duplicates(array)
  duplicates = []
  array.each_with_index do |val, i|
  array.each_with_index do |val2, j|
    if i != j && val == val2 && !duplicates.include?(val)
    duplicates << val
    end
  end
  end
  duplicates
end`,
  };
  const [code, setCode] = useState(exampleCodes["JavaScript"]);
  const [language, setLanguage] = useState('JavaScript');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const languages = ["JavaScript", "Python", "Java", "C++", "C#", "PHP", "Go", "Ruby"];

  const analyzePerformance = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/analyze-performance`, {
        code,
        language
      });

      setAnalysisResult(response.data);
      toast.success('Performance analysis completed!');
    } catch (error) {
      console.error('Error analyzing performance:', error);
      toast.error('Failed to analyze performance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAnalysisResult = () => {
    navigator.clipboard.writeText(analysisResult);
    toast.success('Analysis result copied to clipboard!');
  };

  const handleClearAll = () => {
    setCode('');
    setAnalysisResult('');
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
        <Loader fullscreen size="xl" color="purple" text="Loading Performance Analysing Tool..." />
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
              <FaTachometerAlt className="text-green-400 text-2xl mr-2" />
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Performance Analyzer
              </h1>
            </div>

          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Analyze execution time and memory usage of your code and get optimization recommendations.
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
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setCode(exampleCodes[e.target.value] || "");
                  }}
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
                placeholder="Paste your code to analyze performance..."
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
                onClick={analyzePerformance}
                disabled={loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center"
              >
                {loading ? <Loader size="small" /> : 'Analyze Performance'}
              </button>
            </div>
          </div>

          {/* Analysis Result Output Section */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <FaLightbulb className="inline mr-2" /> Performance Analysis
              </h2>
              {analysisResult && (
                <button
                  onClick={handleCopyAnalysisResult}
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
              ) : analysisResult ? (
                <div className={`h-full overflow-y-auto p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <Markdown
                    rehypePlugins={[rehypeHighlight]}
                    className={isDark ? 'text-white' : 'text-gray-800'}
                  >
                    {analysisResult}
                  </Markdown>
                </div>
              ) : (
                <div className={`flex flex-col justify-center items-center h-full ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaTachometerAlt className="text-4xl mb-4 opacity-50" />
                  <p className="text-center">
                    Enter your code and click "Analyze Performance" to evaluate execution time and memory usage.
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

export default PerformanceAnalyzer;
