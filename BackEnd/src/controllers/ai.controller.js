const aiService = require("../services/ai.service");

const handleRequest = async (
  req,
  res,
  serviceMethod,
  requiredFields = ["prompt"]
) => {
  try {
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .send(
            `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
          );
      }
    }

    const args = requiredFields.map((field) => req.body[field]);
    const response = await serviceMethod(...args);
    res.send(response);
  } catch (error) {
    console.error(`Error in ${serviceMethod.name}:`, error);
    res
      .status(500)
      .send(`An error occurred while processing ${serviceMethod.name}`);
  }
};

const getReview = (req, res) =>
  handleRequest(req, res, aiService.generateReview, ["prompt"]);
const getCode = (req, res) =>
  handleRequest(req, res, aiService.generateCode, ["prompt"]);
const getComplexity = (req, res) =>
  handleRequest(req, res, aiService.generateComplexity, ["prompt"]);
const compareCode = (req, res) =>
  handleRequest(req, res, aiService.compareCode, [
    "code1",
    "code2",
    "language",
  ]);
const getTestCases = (req, res) =>
  handleRequest(req, res, aiService.generateTestCases, ["code", "language"]);
const beautifyCode = (req, res) =>
  handleRequest(req, res, aiService.beautifyCode, ["code", "language"]);
const debugCode = (req, res) =>
  handleRequest(req, res, aiService.debugCode, ["code", "language"]);
const analyzePerformance = (req, res) =>
  handleRequest(req, res, aiService.analyzePerformance, ["code", "language"]);
const analyzeSecurity = (req, res) =>
  handleRequest(req, res, aiService.analyzeSecurity, ["code", "language"]);

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
};
