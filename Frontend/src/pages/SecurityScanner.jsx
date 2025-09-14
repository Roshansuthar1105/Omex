// src/pages/SecurityScanner.jsx
import { useState, useEffect } from "react";
import { FaShieldAlt, FaCode, FaBug } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Loader from "../components/Loader";
import FeedbackButton from "../components/FeedbackButton";
import { useTheme } from "../context/ThemeContext";

function SecurityScanner() {

  const exampleCodes = {
    "JavaScript": `// Example vulnerable code
app.get('/user/:id', (req, res) => {
  db.query("SELECT * FROM users WHERE id = " + req.params.id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});`,

    "Python": `# Example vulnerable code
def get_user(id):
    db.query("SELECT * FROM users WHERE id = " + id, (err, result) => {
        if err: raise err
        return result
    })`,

    "Java": `// Example vulnerable code
public void get_user(String id) {
    db.query("SELECT * FROM users WHERE id = " + id, (err, result) => {
        if (err) throw err;
        return result;
    });
}`,
    "C++": `// Example vulnerable code
void get_user(int id) {
    db.query("SELECT * FROM users WHERE id = " + id, (err, result) => {
        if (err) throw err;
        return result;
    });
}`,

    "C#": `// Example vulnerable code
void get_user(int id) {
    db.query("SELECT * FROM users WHERE id = " + id, (err, result) => {
        if (err) throw err;
        return result;
    });
}`,

    "PHP": `// Example vulnerable code
function get_user($id) {
    db.query("SELECT * FROM users WHERE id = " + $id, (err, result) => {
        if (err) throw err;
        return result;
    });
}`,

    "Go": `// Example vulnerable code
func get_user(id int) {
    db.query("SELECT * FROM users WHERE id = " + id, (err, result) => {
        if (err) throw err;
        return result;
    });
}`,

    "Ruby": `// Example vulnerable code
def get_user(id)
  db.query("SELECT * FROM users WHERE id = " + id, (err, result) => {
    if err then raise err end
    return result
  })
end`,

  };

  const [code, setCode] = useState(exampleCodes["JavaScript"]);
  const [language, setLanguage] = useState("JavaScript");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const languages = ["JavaScript", "Python", "Java", "C++", "C#", "PHP", "Go", "Ruby"];

  // Scan security issues
  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code first");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ai/analyze-security`,
        { code, language }
      );

  

      setReport(res.data); // ✅ Gemini text output
      toast.success("Security scan completed!");
    } catch (error) {
      console.error("Error analyzing security:", error);
      toast.error("Failed to analyze security. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear inputs
  const handleClearAll = () => {
    setCode("");
    setReport("");
    toast.success("All cleared!");
  };

  // Copy output
  const handleCopyReport = () => {
    navigator.clipboard.writeText(report);
    toast.success("Report copied to clipboard!");
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
        <Loader fullscreen size="xl" color="purple" text="Scanning Code for Vulnerabilities..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <FaShieldAlt className="text-red-500 text-2xl mr-2" />
              <h1
                className={`text-2xl md:text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Security Vulnerability Scanner
              </h1>
            </div>
          </div>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Scan your code for vulnerabilities like SQL Injection, XSS, and hardcoded secrets with remediation guidance.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input */}
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
                <FaCode className="inline mr-2" /> Your Code
              </h2>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value); 
                  setCode(exampleCodes[e.target.value] || "")}}
                className={`px-3 py-1 rounded border ${
                  isDark
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full h-64 p-4 font-mono text-sm rounded ${
                isDark ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
              } border ${isDark ? "border-gray-600" : "border-gray-300"}`}
              placeholder="Paste your code here..."
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={handleClearAll}
                className={`px-4 py-2 rounded ${
                  isDark
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Clear All
              </button>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center"
              >
                {loading ? <Loader size="small" /> : "Scan Security"}
              </button>
            </div>
          </div>

          {/* Scan Results */}
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
                <FaBug className="inline mr-2" /> Security Report
              </h2>
              {report && (
                <button
                  onClick={handleCopyReport}
                  className={`px-3 py-1 rounded text-sm ${
                    isDark
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Copy Report
                </button>
              )}
            </div>

            <div
              className={`border ${
                isDark ? "border-gray-600" : "border-gray-300"
              } rounded-lg overflow-hidden`}
              style={{ height: "500px" }}
            >
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              ) : report ? (
                <div
                  className={`h-full overflow-y-auto p-4 ${
                    isDark ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
                  }`}
                >
                  <Markdown rehypePlugins={[rehypeHighlight]}>
                    {report}
                  </Markdown>
                </div>
              ) : (
                <div
                  className={`flex flex-col justify-center items-center h-full ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <FaShieldAlt className="text-4xl mb-4 opacity-50" />
                  <p className="text-center">
                    Paste your code and click "Scan Security" to check for vulnerabilities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Button */}
      <FeedbackButton toolName="Security Scanner" />
    </div>
  );
}

export default SecurityScanner;
