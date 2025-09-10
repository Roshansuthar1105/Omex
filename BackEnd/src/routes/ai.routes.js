const express = require('express');
const aiController = require("../controllers/ai.controller")

const router = express.Router();

router.post("/get-review", aiController.getReview)
router.post("/get-code", aiController.getCode)
router.post("/get-complexity", aiController.getComplexity)
router.post("/compare-code", aiController.compareCode)

// New routes for code tools
router.post("/generate-test-cases", aiController.getTestCases)
router.post("/beautify-code", aiController.beautifyCode)
router.post("/debug-code", aiController.debugCode)
router.post("/analyze-performance", aiController.analyzePerformance)
router.post("/analyze-security", aiController.analyzeSecurity);
router.post("/dependency-scanner", aiController.scanDependencies);


module.exports = router;