import React from "react";
import CodeMetricsAnalyzer from "../components/CodeMetricsAnalyzer";
import Loader from "../components/Loader";

export default function CodeMetrics() {

    const [scanning, setScanning] = useState(false);
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-center">
        OMEX - Code Metrics Analyzer
      </h1>
      <div className="w-full max-w-7xl px-4 md:px-8">
        <CodeMetricsAnalyzer className={`relative border-t ${
          isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
        }`} />
      </div>
    </div>
  );
}
