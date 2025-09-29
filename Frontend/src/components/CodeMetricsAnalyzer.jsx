import React, { useState, useMemo, useEffect } from "react";
import escomplex from "typhonjs-escomplex";
import { useTheme } from "../context/ThemeContext";
import { Sector } from "recharts";
import Loader from "../components/Loader";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-4 rounded-lg shadow-lg border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <p className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom active shape for the pie chart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

 

export default function CodeMetricsAnalyzer() {
  const [metrics, setMetrics] = useState(null);
  const [sortKey, setSortKey] = useState("cyclomatic");
  const [showOnlyComplex, setShowOnlyComplex] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chartType, setChartType] = useState("bar");
  const [activeTab, setActiveTab] = useState("overview");
  const [fileHistory, setFileHistory] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonData, setComparisonData] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState(["loc", "cyclomatic", "halstead"]);
  const [activePieIndex, setActivePieIndex] = useState(0);
  const { isDark, toggleTheme } = useTheme();
    const [loading, setLoading] = useState(true);


  // Available metrics for selection
  const availableMetrics = [
    { key: "loc", name: "Lines of Code", color: "#4ade80" },
    { key: "cyclomatic", name: "Cyclomatic Complexity", color: "#f87171" },
    { key: "halstead", name: "Halstead Difficulty", color: "#60a5fa" },
    { key: "maintainability", name: "Maintainability Index", color: "#fbbf24" }
  ];

  // Load file history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("codeMetricsHistory");
    if (savedHistory) {
      setFileHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save file history to localStorage whenever it changes
  useEffect(() => {
    if (fileHistory.length > 0) {
      localStorage.setItem("codeMetricsHistory", JSON.stringify(fileHistory));
    }
  }, [fileHistory]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      const text = await file.text();
      const result = escomplex.analyzeModule(text);

      const functions = (result.functions || []).map((f) => ({
        name: f.name || "anonymous",
        loc: f.aggregate.sloc.physical,
        cyclomatic: f.cyclomatic,
        halstead: f.aggregate.halstead.difficulty.toFixed(2),
        maintainability: f.maintainability ? f.maintainability.toFixed(2) : "N/A",
        isComplex: f.cyclomatic >= 10 || f.aggregate.halstead.difficulty >= 15,
      }));

      const classes = (result.classes || []).map((c) => ({
        name: c.name || "anonymous",
        methods: c.methods.length,
        loc: c.loc || 0,
      }));

      const newMetrics = {
        fileName: file.name,
        timestamp: new Date().toISOString(),
        loc: text.split("\n").length,
        functionsCount: functions.length,
        classesCount: classes.length,
        avgFunctionLength:
          functions.length
            ? (functions.reduce((a, f) => a + f.loc, 0) / functions.length).toFixed(2)
            : 0,
        avgCyclomatic:
          functions.length
            ? (functions.reduce((a, f) => a + f.cyclomatic, 0) / functions.length).toFixed(2)
            : 0,
        avgHalstead:
          functions.length
            ? (functions.reduce((a, f) => a + parseFloat(f.halstead), 0) / functions.length).toFixed(2)
            : 0,
        mostComplexFunction: functions.length
          ? functions.reduce((a, b) => (b.cyclomatic > a.cyclomatic ? b : a))
          : null,
        functions,
        classes,
        maintainability: result.maintainability ? result.maintainability.toFixed(2) : "N/A",
      };

      setMetrics(newMetrics);
      
      // Add to file history
      setFileHistory(prev => {
        const newHistory = [newMetrics, ...prev].slice(0, 10); // Keep only last 10 files
        return newHistory;
      });
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error processing file. Please make sure it's valid JavaScript/TypeScript.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompareFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const result = escomplex.analyzeModule(text);

      const functions = (result.functions || []).map((f) => ({
        name: f.name || "anonymous",
        loc: f.aggregate.sloc.physical,
        cyclomatic: f.cyclomatic,
        halstead: f.aggregate.halstead.difficulty.toFixed(2),
        maintainability: f.maintainability ? f.maintainability.toFixed(2) : "N/A",
        isComplex: f.cyclomatic >= 10 || f.aggregate.halstead.difficulty >= 15,
      }));

      const comparisonItem = {
        fileName: file.name,
        timestamp: new Date().toISOString(),
        loc: text.split("\n").length,
        functionsCount: functions.length,
        classesCount: result.classes.length,
        avgFunctionLength:
          functions.length
            ? (functions.reduce((a, f) => a + f.loc, 0) / functions.length).toFixed(2)
            : 0,
        avgCyclomatic:
          functions.length
            ? (functions.reduce((a, f) => a + f.cyclomatic, 0) / functions.length).toFixed(2)
            : 0,
        avgHalstead:
          functions.length
            ? (functions.reduce((a, f) => a + parseFloat(f.halstead), 0) / functions.length).toFixed(2)
            : 0,
        maintainability: result.maintainability ? result.maintainability.toFixed(2) : "N/A",
      };

      setComparisonData(prev => [...prev, comparisonItem]);
      setComparisonMode(true);
    } catch (error) {
      console.error("Error processing comparison file:", error);
      alert("Error processing comparison file.");
    }
  };

  const sortedFunctions = useMemo(() => {
    if (!metrics) return [];
    let data = [...metrics.functions];
    if (showOnlyComplex) data = data.filter((f) => f.isComplex);
    data.sort((a, b) => b[sortKey] - a[sortKey]);
    return data.slice(0, 20); // Limit to top 20 for better visualization
  }, [metrics, sortKey, showOnlyComplex]);

  const complexityDistribution = useMemo(() => {
    if (!metrics) return [];
    
    const distribution = [
      { name: "Simple", value: 0, color: "#4ade80" },
      { name: "Moderate", value: 0, color: "#fbbf24" },
      { name: "Complex", value: 0, color: "#f87171" },
      { name: "Very Complex", value: 0, color: "#dc2626" }
    ];
    
    metrics.functions.forEach(func => {
      if (func.cyclomatic < 5) {
        distribution[0].value += 1;
      } else if (func.cyclomatic < 10) {
        distribution[1].value += 1;
      } else if (func.cyclomatic < 20) {
        distribution[2].value += 1;
      } else {
        distribution[3].value += 1;
      }
    });
    
    return distribution;
  }, [metrics]);

  const downloadJSON = () => {
    if (!metrics) return;
    const blob = new Blob([JSON.stringify(metrics, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code-metrics.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    if (!metrics) return;
    const headers = ["Function Name", "LOC", "Cyclomatic", "Halstead Difficulty", "Maintainability"];
    const rows = metrics.functions.map(f => [f.name, f.loc, f.cyclomatic, f.halstead, f.maintainability]);
    const csv = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code-metrics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadFromHistory = (historyItem) => {
    setMetrics(historyItem);
    setComparisonMode(false);
    setComparisonData([]);
  };

  const clearHistory = () => {
    setFileHistory([]);
    localStorage.removeItem("codeMetricsHistory");
  };

  const onPieEnter = (_, index) => {
    setActivePieIndex(index);
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
          text="Loading Code Metrics Analyzer..."
        />
      </div>
    );
  }
  return (
    <div className={`p-6 md:p-10 rounded-3xl shadow-2xl max-w-7xl mx-auto my-8 border transition-all duration-500 ${isDark ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"}`}>
      
      {/* Theme Toggle and Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg transition ${activeTab === "overview" ? "bg-purple-600 text-white" : isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 rounded-lg transition ${activeTab === "details" ? "bg-purple-600 text-white" : isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg transition ${activeTab === "history" ? "bg-purple-600 text-white" : isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab("compare")}
            className={`px-4 py-2 rounded-lg transition ${activeTab === "compare" ? "bg-purple-600 text-white" : isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
          >
            Compare
          </button>
        </div>
        
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          {isDark ? "🌜Dark" : "☀️ Light"}
        </button>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        📊 Advanced Code Metrics Analyzer
      </h2>

      <p className={isDark ? "text-gray-400 text-center mb-8" : "text-gray-600 text-center mb-8"}>
        Upload a JavaScript/TypeScript file to analyze code complexity metrics
      </p>

      {/* File Upload */}
      {activeTab !== "compare" && (
        <div className={`flex flex-col items-center mb-8 p-8 rounded-2xl border transition-all duration-500 ${isDark ? "bg-gray-800/70 border-gray-700/30" : "bg-gray-100/70 border-gray-200/30"}`}>
          <label className={`flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-dashed rounded-xl cursor-pointer transition ${isDark ? "border-gray-600 hover:border-purple-500 hover:bg-gray-700 text-white" : "border-gray-300 hover:border-purple-500 hover:bg-gray-200 text-gray-800"}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">JS, JSX, TS, TSX (MAX. 10MB)</p>
            </div>
            <input
              type="file"
              accept=".js,.jsx,.ts,.tsx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {isProcessing && (
            <div className="mt-4 flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500 mr-2"></div>
              <span>Processing file...</span>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && fileHistory.length > 0 && (
        <div className={`mb-8 p-6 rounded-2xl border transition-all duration-500 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Recent Files</h3>
            <button 
              onClick={clearHistory}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Clear History
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fileHistory.map((item, index) => (
              <div 
                key={index} 
                onClick={() => loadFromHistory(item)}
                className={`p-4 rounded-lg cursor-pointer transition ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-200"} border ${isDark ? "border-gray-600" : "border-gray-200"}`}
              >
                <p className="font-semibold truncate">{item.fileName}</p>
                <p className="text-sm opacity-75">{new Date(item.timestamp).toLocaleString()}</p>
                <p className="text-sm">LOC: {item.loc} | Functions: {item.functionsCount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compare Tab */}
      {activeTab === "compare" && (
        <div className={`mb-8 p-6 rounded-2xl border transition-all duration-500 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
          <h3 className="text-xl font-semibold mb-4">Compare Files</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`p-4 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
              <h4 className="font-medium mb-2">Upload First File</h4>
              <label className={`flex flex-col items-center justify-center h-32 px-4 border-2 border-dashed rounded-xl cursor-pointer transition ${isDark ? "border-gray-600 hover:border-purple-500 hover:bg-gray-700 text-white" : "border-gray-300 hover:border-purple-500 hover:bg-gray-200 text-gray-800"}`}>
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-sm text-gray-400">Click to upload</p>
                </div>
                <input
                  type="file"
                  accept=".js,.jsx,.ts,.tsx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className={`p-4 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
              <h4 className="font-medium mb-2">Upload Comparison File</h4>
              <label className={`flex flex-col items-center justify-center h-32 px-4 border-2 border-dashed rounded-xl cursor-pointer transition ${isDark ? "border-gray-600 hover:border-purple-500 hover:bg-gray-700 text-white" : "border-gray-300 hover:border-purple-500 hover:bg-gray-200 text-gray-800"}`}>
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-sm text-gray-400">Click to upload</p>
                </div>
                <input
                  type="file"
                  accept=".js,.jsx,.ts,.tsx"
                  onChange={handleCompareFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          {comparisonData.length > 0 && (
            <div className={`p-4 rounded-lg border ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
              <h4 className="font-medium mb-4">Comparison Results</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className={isDark ? "bg-gray-600" : "bg-gray-200"}>
                      <th className="px-4 py-2 text-left">Metric</th>
                      <th className="px-4 py-2 text-left">{metrics?.fileName || "File 1"}</th>
                      {comparisonData.map((item, index) => (
                        <th key={index} className="px-4 py-2 text-left">{item.fileName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={isDark ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="px-4 py-2 font-medium">Lines of Code</td>
                      <td className="px-4 py-2">{metrics?.loc}</td>
                      {comparisonData.map((item, index) => (
                        <td key={index} className="px-4 py-2">{item.loc}</td>
                      ))}
                    </tr>
                    <tr className={isDark ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="px-4 py-2 font-medium">Functions</td>
                      <td className="px-4 py-2">{metrics?.functionsCount}</td>
                      {comparisonData.map((item, index) => (
                        <td key={index} className="px-4 py-2">{item.functionsCount}</td>
                      ))}
                    </tr>
                    <tr className={isDark ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="px-4 py-2 font-medium">Avg. Cyclomatic</td>
                      <td className="px-4 py-2">{metrics?.avgCyclomatic}</td>
                      {comparisonData.map((item, index) => (
                        <td key={index} className="px-4 py-2">{item.avgCyclomatic}</td>
                      ))}
                    </tr>
                    <tr className={isDark ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="px-4 py-2 font-medium">Maintainability</td>
                      <td className="px-4 py-2">{metrics?.maintainability}</td>
                      {comparisonData.map((item, index) => (
                        <td key={index} className="px-4 py-2">{item.maintainability}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {metrics && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "📏 Lines of Code", value: metrics.loc, color: "from-green-500 to-green-700" },
              { label: "🧩 Functions", value: metrics.functionsCount, color: "from-blue-500 to-blue-700" },
              { label: "🏗 Classes", value: metrics.classesCount, color: "from-yellow-500 to-yellow-700" },
              { label: "📈 Maintainability", value: metrics.maintainability, color: "from-purple-500 to-purple-700" },
              { label: "⚖️ Avg Function Length", value: metrics.avgFunctionLength, color: "from-pink-500 to-pink-700" },
              { label: "🌀 Avg Cyclomatic", value: metrics.avgCyclomatic, color: "from-red-500 to-red-700" },
              { label: "📊 Avg Halstead", value: metrics.avgHalstead, color: "from-indigo-500 to-indigo-700" },
            ].map((card, idx) => (
              <div key={idx} className={`p-5 rounded-2xl shadow-lg bg-gradient-to-r ${card.color} hover:scale-105 transform transition text-center backdrop-blur-sm bg-opacity-10`}>
                <p className="text-sm mb-2 opacity-90">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Most Complex Function */}
          {metrics.mostComplexFunction && (
            <div className={`mb-6 p-4 rounded-xl ${isDark ? "bg-red-900/20 border border-red-800/50" : "bg-red-100 border border-red-300"}`}>
              <p className={isDark ? "text-center text-lg md:text-xl text-red-300" : "text-center text-lg md:text-xl text-red-700"}>
                ⚠️ Most Complex Function:{" "}
                <span className="font-semibold">{metrics.mostComplexFunction.name}</span>{" "}
                (Cyclomatic: {metrics.mostComplexFunction.cyclomatic}, Halstead Difficulty: {metrics.mostComplexFunction.halstead})
              </p>
            </div>
          )}

          {/* Complexity Distribution Pie Chart */}
          {complexityDistribution.some(item => item.value > 0) && (
            <div className={`mb-8 p-6 rounded-2xl border transition-all duration-500 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
              <h3 className={isDark ? "text-2xl font-semibold mb-4 text-center text-white" : "text-2xl font-semibold mb-4 text-center text-gray-800"}>
                📊 Complexity Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    activeIndex={activePieIndex}
                    activeShape={renderActiveShape}
                    data={complexityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {complexityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip isDark={isDark} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Function Metrics Section */}
          {activeTab === "details" && sortedFunctions.length > 0 && (
            <>
              {/* Sorting & Filtering */}
              <div className={`flex flex-col md:flex-row gap-4 md:justify-between mb-6 items-center p-4 rounded-xl transition-all duration-500 ${isDark ? "bg-gray-800 border border-gray-700 text-white" : "bg-gray-100 border border-gray-200 text-gray-800"}`}>
                <div className="flex flex-col sm:flex-row gap-4 items-center flex-wrap">
                  <label className="flex items-center gap-2">
                    <span className={isDark ? "text-gray-400" : "text-gray-600"}>Sort by:</span>
                    <select
                      value={sortKey}
                      onChange={(e) => setSortKey(e.target.value)}
                      className={`rounded-lg p-2 border focus:ring-2 focus:ring-purple-500 transition ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"}`}
                    >
                      <option value="loc">LOC</option>
                      <option value="cyclomatic">Cyclomatic</option>
                      <option value="halstead">Halstead Difficulty</option>
                      <option value="maintainability">Maintainability</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={showOnlyComplex}
                        onChange={(e) => setShowOnlyComplex(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full peer peer-checked:bg-purple-600 transition ${isDark ? "bg-gray-700" : "bg-gray-300"}`}>
                        <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-5"></div>
                      </div>
                    </div>
                    <span className={isDark ? "text-gray-400" : "text-gray-600"}>Show only complex functions</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <span className={isDark ? "text-gray-400" : "text-gray-600"}>Chart type:</span>
                    <select
                      value={chartType}
                      onChange={(e) => setChartType(e.target.value)}
                      className={`rounded-lg p-2 border focus:ring-2 focus:ring-purple-500 transition ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"}`}
                    >
                      <option value="bar">Bar Chart</option>
                      <option value="line">Line Chart</option>
                      <option value="radar">Radar Chart</option>
                    </select>
                  </label>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                  <button onClick={downloadJSON} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition hover:shadow-lg text-white">
                    Download JSON
                  </button>
                  <button onClick={downloadCSV} className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition hover:shadow-lg text-white">
                    Download CSV
                  </button>
                </div>
              </div>

              {/* Metric Selection */}
              <div className={`mb-6 p-4 rounded-xl transition-all duration-500 ${isDark ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <h4 className="font-medium mb-3">Select Metrics to Display:</h4>
                <div className="flex flex-wrap gap-3">
                  {availableMetrics.map(metric => (
                    <label key={metric.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric.key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMetrics(prev => [...prev, metric.key]);
                          } else {
                            setSelectedMetrics(prev => prev.filter(m => m !== metric.key));
                          }
                        }}
                        className="rounded focus:ring-purple-500"
                      />
                      <span className={isDark ? "text-gray-300" : "text-gray-700"}>{metric.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Function Metrics Chart */}
              <div className={`mb-8 p-6 rounded-2xl border transition-all duration-500 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
                <h3 className={isDark ? "text-2xl font-semibold mb-4 text-center text-white" : "text-2xl font-semibold mb-4 text-center text-gray-800"}>📊 Function Complexity</h3>
                
                {chartType === "bar" && (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={sortedFunctions}
                      margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#4B5563" : "#D1D5DB"} />
                      <XAxis 
                        dataKey="name" 
                        interval={0} 
                        angle={-45} 
                        textAnchor="end" 
                        height={80}
                        tick={{ fill: isDark ? "#9CA3AF" : "#374151", fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: isDark ? "#9CA3AF" : "#374151" }} />
                      <Tooltip content={<CustomTooltip isDark={isDark} />} />
                      <Legend />
                      {selectedMetrics.includes("loc") && <Bar dataKey="loc" name="LOC" radius={[4, 4, 0, 0]} fill="url(#gradLoc)" />}
                      {selectedMetrics.includes("cyclomatic") && <Bar dataKey="cyclomatic" name="Cyclomatic" radius={[4, 4, 0, 0]} fill="url(#gradCyclo)" />}
                      {selectedMetrics.includes("halstead") && <Bar dataKey="halstead" name="Halstead Difficulty" radius={[4, 4, 0, 0]} fill="url(#gradHalstead)" />}
                      {selectedMetrics.includes("maintainability") && <Bar dataKey="maintainability" name="Maintainability" radius={[4, 4, 0, 0]} fill="url(#gradMaintain)" />}
                      <defs>
                        <linearGradient id="gradLoc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4ade80" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                        <linearGradient id="gradCyclo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f87171" />
                          <stop offset="100%" stopColor="#b91c1c" />
                        </linearGradient>
                        <linearGradient id="gradHalstead" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                        <linearGradient id="gradMaintain" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {chartType === "line" && (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={sortedFunctions}
                      margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#4B5563" : "#D1D5DB"} />
                      <XAxis 
                        dataKey="name" 
                        interval={0} 
                        angle={-45} 
                        textAnchor="end" 
                        height={80}
                        tick={{ fill: isDark ? "#9CA3AF" : "#374151", fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: isDark ? "#9CA3AF" : "#374151" }} />
                      <Tooltip content={<CustomTooltip isDark={isDark} />} />
                      <Legend />
                      {selectedMetrics.includes("loc") && <Line type="monotone" dataKey="loc" name="LOC" stroke="#4ade80" strokeWidth={2} />}
                      {selectedMetrics.includes("cyclomatic") && <Line type="monotone" dataKey="cyclomatic" name="Cyclomatic" stroke="#f87171" strokeWidth={2} />}
                      {selectedMetrics.includes("halstead") && <Line type="monotone" dataKey="halstead" name="Halstead Difficulty" stroke="#60a5fa" strokeWidth={2} />}
                      {selectedMetrics.includes("maintainability") && <Line type="monotone" dataKey="maintainability" name="Maintainability" stroke="#fbbf24" strokeWidth={2} />}
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {chartType === "radar" && (
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={sortedFunctions.slice(0, 8)}> {/* Limit to 8 for readability */}
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis />
                      <Tooltip content={<CustomTooltip isDark={isDark} />} />
                      {selectedMetrics.includes("loc") && <Radar name="LOC" dataKey="loc" stroke="#4ade80" fill="#4ade80" fillOpacity={0.6} />}
                      {selectedMetrics.includes("cyclomatic") && <Radar name="Cyclomatic" dataKey="cyclomatic" stroke="#f87171" fill="#f87171" fillOpacity={0.6} />}
                      {selectedMetrics.includes("halstead") && <Radar name="Halstead" dataKey="halstead" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.6} />}
                      {selectedMetrics.includes("maintainability") && <Radar name="Maintainability" dataKey="maintainability" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.6} />}
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Functions Table */}
              <div className={`mb-8 p-6 rounded-2xl border transition-all duration-500 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
                <h3 className={isDark ? "text-2xl font-semibold mb-4 text-center text-white" : "text-2xl font-semibold mb-4 text-center text-gray-800"}>📋 Function Details</h3>
                <div className={`overflow-x-auto rounded-xl border ${isDark ? "border-gray-700" : "border-gray-300"}`}>
                  <table className={`min-w-full divide-y transition-colors duration-500 ${isDark ? "divide-gray-700" : "divide-gray-300"}`}>
                    <thead className={isDark ? "bg-gray-750 text-gray-400" : "bg-gray-200 text-gray-600"}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Function Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">LOC</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cyclomatic</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Halstead</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Maintainability</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Complexity</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? "bg-gray-800 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}>
                      {sortedFunctions.map((func, idx) => (
                        <tr key={idx} className={isDark ? "hover:bg-gray-700 transition-colors" : "hover:bg-gray-100 transition-colors"}>
                          <td className="px-6 py-4 whitespace-nowrap">{func.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{func.loc}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{func.cyclomatic}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{func.halstead}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{func.maintainability}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${func.isComplex ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                              {func.isComplex ? "Complex" : "Simple"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Classes Table */}
              {metrics.classes.length > 0 && (
                <div className={`p-6 rounded-2xl border transition-all duration-500 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
                  <h3 className={isDark ? "text-2xl font-semibold mb-4 text-center text-white" : "text-2xl font-semibold mb-4 text-center text-gray-800"}>🏗 Class Overview</h3>
                  <div className={`overflow-x-auto rounded-xl border ${isDark ? "border-gray-700" : "border-gray-300"}`}>
                    <table className={`min-w-full divide-y transition-colors duration-500 ${isDark ? "divide-gray-700" : "divide-gray-300"}`}>
                      <thead className={isDark ? "bg-gray-750 text-gray-400" : "bg-gray-200 text-gray-600"}>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Class Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Methods</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">LOC</th>
                        </tr>
                      </thead>
                      <tbody className={isDark ? "bg-gray-800 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}>
                        {metrics.classes.map((cls, idx) => (
                          <tr key={idx} className={isDark ? "hover:bg-gray-700 transition-colors" : "hover:bg-gray-100 transition-colors"}>
                            <td className="px-6 py-4 whitespace-nowrap">{cls.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{cls.methods}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{cls.loc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}