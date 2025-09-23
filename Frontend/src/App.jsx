// Pages
import LogoShowcase from "./pages/LogoShowcase";
import Home from "./pages/Home";
import NotFound from "./pages/notFound";
import About from "./pages/About";
import CodeCompare from "./pages/CodeCompare";
import CodeComplexity from "./pages/CodeComplexity";
import CodeGenerator from "./pages/CodeGenerator";
import CodeOptimizer from "./pages/CodeOptimizer";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Team from "./pages/Team";
import TermsOfService from "./pages/TermsOfService";
import Contribute from "./pages/Contribute";
import ContributorGuide from "./pages/ContributorGuide";

// Code tools pages
import CodeBeautifier from "./pages/CodeBeautifier";
import CodeTools from "./pages/CodeTools";
import ContentSummarizer from "./pages/ContentSummarizer";
import ErrorDebugger from "./pages/ErrorDebugger";
import PerformanceAnalyzer from "./pages/PerformanceAnalyzer";
import SecurityScanner from "./pages/SecurityScanner";
import TestCaseGenerator from "./pages/TestCaseGenerator";
import DependencyScanner from "./pages/DependencyScanner";

// Components
import { Toaster } from "react-hot-toast";
import ContributorsLeaderboard from "./components/ContributorsLeaderboard";
import BackToTopButton from "./components/BackToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

// React & Router
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Outlet } from "react-router-dom";

// Styles & Themes
import "prismjs/themes/prism-tomorrow.css";
import "./styles/glassmorphism.css";

// Theme context
import { ThemeProvider } from "./context/ThemeContext";

// Utils
import "./utils/scrollbar.js";

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
          {/* All routes use Layout */}
          <Route element={<Layout />}>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/optimiser" element={<CodeOptimizer />} />
            <Route path="/codegenerator" element={<CodeGenerator />} />
            <Route path="/codecomplexity" element={<CodeComplexity />} />
            <Route path="/codecompare" element={<CodeCompare />} />
            <Route path="/about" element={<About />} />
            <Route path="/contributors" element={<ContributorsLeaderboard />} />

            {/* Code tools */}
            <Route path="/code-tools" element={<CodeTools />} />
            <Route path="/test-case-generator" element={<TestCaseGenerator />} />
            <Route path="/code-beautifier" element={<CodeBeautifier />} />
            <Route path="/error-debugger" element={<ErrorDebugger />} />
            <Route path="/performance-analyzer" element={<PerformanceAnalyzer />} />
            <Route path="/content-summarizer" element={<ContentSummarizer />} />
            <Route path="/security-scanner" element={<SecurityScanner />} />
            <Route path="/dependency-scanner" element={<DependencyScanner />} />

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
