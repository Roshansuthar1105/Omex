import "prismjs/themes/prism-tomorrow.css"
import Home from './pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import CodeOptimizer from "./pages/CodeOptimizer"
import CodeGenerator from "./pages/CodeGenerator"
import CodeComplexity from "./pages/CodeComplexity"
import CodeCompare from "./pages/CodeCompare"
import About from "./pages/About"

// New code tools pages
import CodeTools from "./pages/CodeTools"
import TestCaseGenerator from "./pages/TestCaseGenerator"
import CodeBeautifier from "./pages/CodeBeautifier"
import ErrorDebugger from "./pages/ErrorDebugger"
import PerformanceAnalyzer from "./pages/PerformanceAnalyzer"
import ContentSummarizer from "./pages/ContentSummarizer"

// Theme context
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <nav className="w-full fixed top-0 left-0 z-50">
            <Nav />
          </nav>

          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/optimiser" element={<CodeOptimizer />} />
              <Route path="/codegenerator" element={<CodeGenerator />} />
              <Route path="/codecomplexity" element={<CodeComplexity />} />
              <Route path="/codecompare" element={<CodeCompare />} />
              <Route path="/about" element={<About />} />

              {/* New code tools routes */}
              <Route path="/code-tools" element={<CodeTools />} />
              <Route path="/test-case-generator" element={<TestCaseGenerator />} />
              <Route path="/code-beautifier" element={<CodeBeautifier />} />
              <Route path="/error-debugger" element={<ErrorDebugger />} />
              <Route path="/performance-analyzer" element={<PerformanceAnalyzer />} />
              <Route path="/content-summarizer" element={<ContentSummarizer />} />
            </Routes>
          </main>

          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
