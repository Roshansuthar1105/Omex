const aiService = require("../services/ai.service");

const getReview = async (req, res) => {
  try {
    const code = req.body.prompt;

    if (!code) {
      return res.status(400).send("Prompt is required");
    }

    const response = await aiService.generateReview(code);
    res.send(response);
  } catch (error) {
    console.error("Error in getReview:", error);
    res.status(500).send("An error occurred while processing your request");
  }
};

const getCode = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).send("Prompt not found");
    }
    const response = await aiService.generateCode(prompt);
    res.send(response);
  } catch (error) {
    console.error("Error in getCode:", error);
    res.status(500).send("An error occurred while processing your request");
  }
};

const getComplexity = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).send("Prompt not found");
    }
    const response = await aiService.generateComplexity(prompt);
    res.send(response);
  } catch (error) {
    console.error("Error in getComplexity:", error);
    res.status(500).send("An error occurred while processing your request");
  }
};

const compareCode = async (req, res) => {
  try {
    const { code1, code2, language } = req.body;
    if (!code1 || !code2) {
      return res.status(400).send("Both code snippets are required");
    }

    const response = await aiService.compareCode(code1, code2, language);
    res.send(response);
  } catch (error) {
    console.error("Error in compareCode:", error);
    res.status(500).send("An error occurred while comparing the code");
  }
};

const getTestCases = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService.generateTestCases(code, language);
    res.send(response);
  } catch (error) {
    console.error("Error in getTestCases:", error);
    res.status(500).send("An error occurred while generating test cases");
  }
};

const beautifyCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService.beautifyCode(code, language);
    res.send(response);
  } catch (error) {
    console.error("Error in beautifyCode:", error);
    res.status(500).send("An error occurred while beautifying the code");
  }
};

const debugCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService.debugCode(code, language);
    res.send(response);
  } catch (error) {
    console.error("Error in debugCode:", error);
    res.status(500).send("An error occurred while debugging the code");
  }
};

const analyzePerformance = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService.analyzePerformance(code, language);
    res.send(response);
  } catch (error) {
    console.error("Error in analyzePerformance:", error);
    res.status(500).send("An error occurred while analyzing code performance");
  }
};

const analyzeSecurity = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService.analyzeSecurity(code, language);
    res.send(response);
  } catch (error) {
    console.error("Error in analyzeSecurity:", error);
    res.status(500).send("An error occurred during security analysis");
  }
};

// Dependency Scanner
const scanDependencies = async (req, res) => {
  try {
    const { fileContent } = req.body;

    if (!fileContent) {
      return res.status(400).send("Dependencies file is required");
    }

    const response = await aiService.scanDependencies(fileContent);
    res.send(response);
  } catch (error) {
    console.error("Error in scanDependencies:", error);
    res.status(500).send("An error occurred while scanning dependencies");
  }
};


module.exports = {
  getReview,
  getCode,
  getComplexity,
  compareCode,
  getTestCases,
  beautifyCode,
  debugCode,
  analyzePerformance,
  analyzeSecurity,
  scanDependencies,
};
