import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import "prismjs/themes/prism-tomorrow.css";
import "./styles/glassmorphism.css";
import "./utils/scrollbar.js";

// Theme context
import { ThemeProvider } from "./context/ThemeContext";

// Layout components
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Feedback from "./pages/Feedback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contribute from "./pages/Contribute";
import ContributorGuide from "./pages/ContributorGuide";
import LogoShowcase from "./pages/LogoShowcase";

// Code tools pages
import CodeTools from "./pages/CodeTools";
import CodeBeautifier from "./pages/CodeBeautifier";
import ErrorDebugger from "./pages/ErrorDebugger";
import PerformanceAnalyzer from "./pages/PerformanceAnalyzer";
import SecurityScanner from "./pages/SecurityScanner";
import TestCaseGenerator from "./pages/TestCaseGenerator";
import DependencyScanner from "./pages/DependencyScanner";

import CodeCompare from "./pages/CodeCompare";
import CodeComplexity from "./pages/CodeComplexity";
import CodeGenerator from "./pages/CodeGenerator";
import CodeOptimizer from "./pages/CodeOptimizer";
import ContentSummarizer from "./pages/ContentSummarizer";

// NEW PAGE
import CodeMetrics from "./pages/CodeMetrics";
import CodeMetricsAnalyzer from "./components/CodeMetricsAnalyzer.jsx";

// Insights page
import AiInsights from "./pages/AiInsights.jsx";

// Components
import ContributorsLeaderboard from "./components/ContributorsLeaderboard";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Layout wrapper for all routes
  const Layout = () => (
    <div className="flex flex-col min-h-screen">
      <nav className="w-full fixed top-0 left-0 z-50">
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      {!isMenuOpen && <BackToTopButton />}
      <Toaster position="top-right" />
    </div>
  );

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/optimiser" element={<CodeOptimizer />} />
            <Route path="/codegenerator" element={<CodeGenerator />} />
            <Route path="/codecomplexity" element={<CodeComplexity />} />
            <Route path="/codecompare" element={<CodeCompare />} />
            <Route path="/about" element={<About />} />
            <Route path="/contributors" element={<ContributorsLeaderboard />} />

            {/* AiInsights */}
            <Route path="/insights" element={<AiInsights />} />

            {/* Code tools */}
            <Route path="/code-tools" element={<CodeTools />} />
            <Route path="/test-case-generator" element={<TestCaseGenerator />} />
            <Route path="/code-metrics-analyzer" element={<CodeMetricsAnalyzer />} />
            <Route path="/code-beautifier" element={<CodeBeautifier />} />
            <Route path="/error-debugger" element={<ErrorDebugger />} />
            <Route path="/performance-analyzer" element={<PerformanceAnalyzer />} />
            <Route path="/content-summarizer" element={<ContentSummarizer />} />
            <Route path="/security-scanner" element={<SecurityScanner />} />
            <Route path="/dependency-scanner" element={<DependencyScanner />} />

            {/* New route for Code Metrics */}
            <Route path="/code-metrics" element={<CodeMetrics />} />

            {/* Company pages */}
            <Route path="/team" element={<Team />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contributor-guide" element={<ContributorGuide />} />
            <Route path="/logo-showcase" element={<LogoShowcase />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
