import { useState, useEffect } from "react";
import { FaShieldAlt, FaFileAlt, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import FeedbackButton from "../components/FeedbackButton";
import { useTheme } from "../context/ThemeContext";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { GoPackageDependencies } from "react-icons/go";

function DependencyScanner() {
  const [fileContent, setFileContent] = useState(
    `{
  "name": "example-project",
  "dependencies": {
    "express": "^4.17.1",
    "lodash": "4.17.19",
    "react": "^18.0.0"
  }
}`
  );
  const [scannerResult, setScannerResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const { isDark } = useTheme();

  const scanDependencies = async () => {
    if (!fileContent.trim()) {
      toast.error("Please paste your package.json or requirements.txt");
      return;
    }

    setScanning(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ai/dependency-scanner`,
        {
          fileContent, // must match controller
        }
      );

      setScannerResult(response.data);
      toast.success("Dependencies scanned successfully!");
    } catch (error) {
      console.error("Error scanning dependencies:", error);
      toast.error("Failed to scan dependencies. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  const handleCopyResults = () => {
    navigator.clipboard.writeText(scannerResult);
    toast.success("Scan results copied to clipboard!");
  };

  const handleClearAll = () => {
    setFileContent("");
    setScannerResult("");
    toast.success("All cleared!");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <Loader
          fullscreen
          size="xl"
          color="purple"
          text="Loading Dependency Scanner..."
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <GoPackageDependencies className="text-orange-500 text-2xl mr-2" />
              <h1
                className={`text-2xl md:text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Dependency Scanner
              </h1>
            </div>
          </div>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Paste your <code>package.json</code> or{" "}
            <code>requirements.txt</code> to detect outdated or vulnerable
            dependencies.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                <FaFileAlt className="inline mr-2" /> Dependency File Content
              </h2>
            </div>

            <div
              className={`border ${
                isDark ? "border-gray-600" : "border-gray-300"
              } rounded-lg overflow-hidden mb-4`}
            >
              <textarea
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                className={`w-full h-64 p-4 font-mono text-sm ${
                  isDark ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
                }`}
                placeholder="Paste your package.json or requirements.txt content here..."
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleClearAll}
                className={`px-4 py-2 rounded ${
                  isDark
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                Clear All
              </button>
              <button
                onClick={scanDependencies}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors flex items-center"
              >
                {loading ? <Loader size="small" /> : "Scan Dependencies"}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                <FaExclamationTriangle className="inline mr-2" /> Scan Results
              </h2>
              {scannerResult && (
                <button
                  onClick={handleCopyResults}
                  className={`px-3 py-1 rounded ${
                    isDark
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition-colors text-sm`}
                >
                  Copy Results
                </button>
              )}
            </div>

            <div
              className={`border ${
                isDark ? "border-gray-600" : "border-gray-300"
              } rounded-lg overflow-hidden`}
              style={{ height: "500px" }}
            >
              {scanning ? (
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              ) : scannerResult ? (
                <div
                  className={`h-full overflow-y-auto p-4 ${
                    isDark ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <Markdown
                    rehypePlugins={[rehypeHighlight]}
                    className={isDark ? "text-white" : "text-gray-800"}
                  >
                    {scannerResult}
                  </Markdown>
                </div>
              ) : (
                <div
                  className={`flex flex-col justify-center items-center h-full ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <GoPackageDependencies className="text-4xl mb-4 opacity-50" />
                  <p className="text-center">
                    Paste your dependencies file content and click{" "}
                    <b>Scan Dependencies</b> to get security & update
                    suggestions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Button */}
      <FeedbackButton toolName="Dependency Scanner" />
    </div>
  );
}

export default DependencyScanner;
