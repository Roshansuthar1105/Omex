/**
 * AI Service
 * This file contains the AI service functions for the application
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const systemInstructions = require("../config/systemInstructions");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// Create AI models with system instructions
const codeOptimiser = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.codeOptimizer
});

const codeGenerator = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.codeGenerator
});

const codeComplexity = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.codeComplexity
});

const codeComparer = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.codeComparer
});

const testCaseGenerator = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.testCaseGenerator
});

const codeBeautifier = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.codeBeautifier
});

const errorDebugger = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.errorDebugger
});

const performanceAnalyzer = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.performanceAnalyzer
});

const contentSummarizer = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.contentSummarizer
});

const securityAnalyzer = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemInstructions.securityAnalyzer
});

const intentModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are an AI assistant that classifies customer contact messages into intents (Bug Report, Feature Request, Pricing Inquiry, Support, General Question) and provides a helpful reply in JSON format: { intent: string, reply: string }"
});

/**
 * Generate code based on a prompt
 * @param {string} prompt - The prompt to generate code from
 * @param {string} lang - The programming language to generate code in
 * @returns {Promise<string>} - The generated code
 */
async function generateCode(prompt, lang) {
    const fullPrompt = `Generate ${lang || "code"} for the following requirement:\n\n${prompt}`;
    const result = await codeGenerator.generateContent(fullPrompt);
    return result.response.text();
}


/**
 * Generate a code review
 * @param {string} prompt - The code to review
 * @returns {Promise<string>} - The review
 */
async function generateReview(prompt) {
    const result = await codeOptimiser.generateContent(prompt);
    return result.response.text();
}

/**
 * Generate a complexity analysis
 * @param {string} prompt - The code to analyze
 * @returns {Promise<string>} - The complexity analysis
 */
async function generateComplexity(prompt) {
    const result = await codeComplexity.generateContent(prompt);
    return result.response.text();
}

/**
 * Compare two code snippets
 * @param {string} code1 - The first code snippet
 * @param {string} code2 - The second code snippet
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The comparison result
 */
async function compareCode(code1, code2, language) {
    const prompt = `Please compare these two code snippets written in ${language || 'the provided language'}:

Code Snippet 1:
\`\`\`
${code1}
\`\`\`

Code Snippet 2:
\`\`\`
${code2}
\`\`\`

Focus only on identifying critical logical errors, syntax errors, or bugs that would cause the code to fail.
Provide a line-by-line analysis of the errors with brief explanations.`;

    const result = await codeComparer.generateContent(prompt);
    return result.response.text();
}

/**
 * Generate test cases for code
 * @param {string} code - The code to generate test cases for
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The generated test cases
 */
async function generateTestCases(code, language) {
    const prompt = `Generate comprehensive test cases for the following ${language || 'code'}:

\`\`\`
${code}
\`\`\`

Please provide a variety of test cases including normal cases, edge cases, and error cases.`;

    const result = await testCaseGenerator.generateContent(prompt);
    return result.response.text();
}

/**
 * Beautify code
 * @param {string} code - The code to beautify
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The beautified code
 */
async function beautifyCode(code, language) {
    const prompt = `Beautify and format the following ${language || 'code'} to improve readability:

\`\`\`
${code}
\`\`\`

Please maintain the original functionality while making it more readable and well-structured.`;

    const result = await codeBeautifier.generateContent(prompt);
    return result.response.text();
}

/**
 * Debug code
 * @param {string} code - The code to debug
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The debugging result
 */
async function debugCode(code, language) {
    const prompt = `Debug the following ${language || 'code'} and identify any errors or issues:

\`\`\`
${code}
\`\`\`

Please provide a detailed analysis of any errors found and suggest fixes.`;

    const result = await errorDebugger.generateContent(prompt);
    return result.response.text();
}

/**
 * Analyze code performance
 * @param {string} code - The code to analyze
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The performance analysis
 */
async function analyzePerformance(code, language) {
    const prompt = `Analyze the execution time and memory usage of the following ${language || 'code'}:

\`\`\`
${code}
\`\`\`

Please provide a detailed analysis of time complexity, space complexity, and suggest optimizations.`;

    const result = await performanceAnalyzer.generateContent(prompt);
    return result.response.text();
}

/**
 * Summarize content from text
 * @param {string} content - The content to summarize
 * @param {string} summaryLength - The desired length of the summary (short, medium, long)
 * @param {string} summaryType - The type of summary (general, academic, business)
 * @returns {Promise<string>} - The summary
 */
async function summarizeContent(content, summaryLength = 'medium', summaryType = 'general') {
    const prompt = `Please summarize the following content:

\`\`\`
${content}
\`\`\`

Please provide a ${summaryLength} summary in ${summaryType} style.`;

    const result = await contentSummarizer.generateContent(prompt);
    return result.response.text();
}


/**
 * Analyze code for security vulnerabilities
 * @param {string} code - The code to analyze
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The security analysis
 */
async function analyzeSecurity(code, language) {
    const prompt = `Analyze the following ${language || 'code'} for security vulnerabilities:

\`\`\`
${code}
\`\`\`

Please provide a detailed security analysis including vulnerability types, severity levels, line numbers, and recommended fixes.`;

    const result = await securityAnalyzer.generateContent(prompt);
    return result.response.text();
}

/**
 * Detect intent and generate instant reply for contact messages
 * @param {string} message - The user’s message from the contact form
 * @returns {Promise<object>} - Detected intent and AI-generated reply
 */
async function detectIntent(message) {
  if (typeof message !== "string") {
    console.warn("Invalid message format:", message);
    return fallbackIntent("Invalid message");
  }

  // Step 1: Try parsing as JSON (user might send structured intent)
  try {
    const parsed = JSON.parse(message);
    if (parsed.intent && parsed.reply) {
      return { intent: parsed.intent, reply: parsed.reply };
    }
  } catch {
    // Not JSON — continue
  }

  // Step 2: Try AI-based intent detection
  try {
    const prompt = `Classify intent and reply: ${message}`;
    const result = await intentModel.generateContent(prompt);

    let text = "";
    if (result?.response?.text) {
        text = result.response.text().trim();
    } else if (typeof result?.text === "string") {
  text = result.text.trim();
    } else if (typeof result?.response === "string") {
        text = result.response.trim();
    } else {
    console.warn("Unrecognized AI response format:", result);
    return fallbackIntent(message);
    }

    console.log("🧠 AI response text:", text);
    console.log("AI raw response:", text);
    console.log("Full AI result:", result);

    // Step 2a: Try parsing AI output as JSON
    try {
      const parsed = JSON.parse(text);
      return { intent: parsed.intent, reply: parsed.reply };
    } catch {
      // Step 2b: Try extracting JSON from messy output
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        return { intent: parsed.intent, reply: parsed.reply };
      }

      // Step 2c: Try regex fallback (e.g., "Intent: X\nReply: Y")
      const fallbackMatch = text.match(/Intent:\s*(.+?)\nReply:\s*(.+)/);
      if (fallbackMatch) {
        return {
          intent: fallbackMatch[1].trim(),
          reply: fallbackMatch[2].trim(),
        };
      }

      // Step 2d: Treat entire response as reply
      return {
        intent: "General Question",
        reply: text || "Sorry, I couldn't understand your message.",
      };
    }
  } catch (e) {
    console.warn("AI call failed, using fallback:", e?.message);
    console.error("Full error:", e);
    return fallbackIntent(message);
  }
}

// Keyword-based fallback logic
function fallbackIntent(message) {
  const lower = message.toLowerCase();
  let intent = "General Question";

  if (lower.includes("bug") || lower.includes("error") || lower.includes("issue"))
    intent = "Bug Report";
  else if (lower.includes("feature") || lower.includes("add") || lower.includes("support request"))
    intent = "Feature Request";
  else if (lower.includes("price") || lower.includes("cost") || lower.includes("plan"))
    intent = "Pricing Inquiry";
  else if (lower.includes("help") || lower.includes("support"))
    intent = "Support";

  const replyMap = {
    "Bug Report": "Thanks for flagging this. Could you share steps to reproduce, expected vs actual behavior, and screenshots/logs if possible?",
    "Feature Request": "Great idea! Could you describe the use-case and priority? We’ll review and update our roadmap.",
    "Pricing Inquiry": "Here’s a quick overview of our plans. Tell me your expected usage and I can recommend the best fit.",
    "Support": "Happy to help. What environment and version are you using? Any error messages or logs?",
    "General Question": "I can help with docs, integration tips, or troubleshooting—what would you like to know?",
  };

  return { intent, reply: replyMap[intent] };
}


module.exports = {
    generateReview,
    generateCode,
    generateComplexity,
    compareCode,
    generateTestCases,
    beautifyCode,
    debugCode,
    analyzePerformance,
    summarizeContent,
    analyzeSecurity,
    detectIntent, 
};
