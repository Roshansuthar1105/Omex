const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Confirm API key is loaded
console.log("🔑 Gemini API Key loaded:", !!process.env.GEMINI_API_KEY);

// Initialize Gemini with your API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load the Gemini Pro model
const intentModel = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Generates AI content using Gemini
 * @param {string} prompt - The user prompt or message
 * @returns {Promise<string>} - AI-generated response text
 */
async function generateContent(prompt) {
  try {
    const result = await intentModel.generateContent(prompt);

    // ✅ Safely extract text from Gemini response
    if (result?.response?.text) {
      return result.response.text().trim();
    } else if (typeof result?.text === "string") {
      return result.text.trim();
    } else if (typeof result?.response === "string") {
      return result.response.trim();
    } else {
      console.warn("⚠️ Unrecognized Gemini response format:", result);
      return "Sorry, I couldn't understand the AI response.";
    }
  } catch (error) {
    console.error("❌ Gemini API error:", error.message || error);

    // ✅ Log full response if available
    if (error.response?.data) {
      console.log("🔍 Gemini response:", error.response.data);
    }

    return "Sorry, I couldn't generate a response right now.";
  }
}

module.exports = {
  intentModel,
  generateContent,
};