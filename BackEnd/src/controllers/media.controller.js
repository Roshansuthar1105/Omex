/**
 * Media Controller
 * Handles text extraction and summarization from files, text, and YouTube URLs.
 */

const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const aiService = require("../services/ai.service");

// ---------- Utility Functions ----------

const MAX_TEXT_LENGTH = 15000;

/**
 * Ensure extracted/received text is within token limits.
 * @param {string} text
 * @returns {string}
 */
const limitTextLength = (text) => {
  if (!text) return "";
  return text.length > MAX_TEXT_LENGTH
    ? text.substring(0, MAX_TEXT_LENGTH) + "..."
    : text;
};

/**
 * Extract text from a PDF file
 */
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

/**
 * Extract text from an image using OCR
 */
const extractTextFromImage = async (filePath) => {
  try {
    const { data } = await Tesseract.recognize(filePath, "eng");
    return data.text;
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to extract text from image");
  }
};

/**
 * Read text from a plain text/markdown file
 */
const readTextFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading text file:", error);
    throw new Error("Failed to read text file");
  }
};

/**
 * Extract YouTube video ID from URL
 */
const extractYouTubeVideoId = (url) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

/**
 * Extract placeholder information from YouTube URL
 * (In production, replace with YouTube Data API + transcription service)
 */
const extractYouTubeInfo = async (youtubeUrl) => {
  try {
    const videoId = extractYouTubeVideoId(youtubeUrl);
    if (!videoId) throw new Error("Invalid YouTube URL");

    return `YouTube Video ID: ${videoId}
Title: Sample YouTube Video
Description: Placeholder transcript and information.
In production, integrate YouTube Data API + transcription.
Likely discussing technology, programming, and AI-related topics.`;
  } catch (error) {
    console.error("Error extracting YouTube info:", error);
    throw new Error("Failed to extract information from YouTube URL");
  }
};

// ---------- Controller Functions ----------

/**
 * Summarize plain text input
 */
const summarizeTextInput = async (req, res) => {
  try {
    const {
      text,
      summaryLength = "medium",
      summaryType = "general",
    } = req.body;
    if (!text || text.trim() === "")
      return res.status(400).send("No text provided");

    const processedText = limitTextLength(text);
    const summary = await aiService.summarizeContent(
      processedText,
      summaryLength,
      summaryType
    );

    res.send(summary);
  } catch (error) {
    console.error("Error in summarizeTextInput:", error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

/**
 * Summarize content from a YouTube URL
 */
const summarizeYouTubeUrl = async (req, res) => {
  try {
    const {
      youtubeUrl,
      summaryLength = "medium",
      summaryType = "general",
    } = req.body;
    if (!youtubeUrl || youtubeUrl.trim() === "")
      return res.status(400).send("No YouTube URL provided");

    const videoInfo = await extractYouTubeInfo(youtubeUrl);
    const summary = await aiService.summarizeContent(
      videoInfo,
      summaryLength,
      summaryType
    );

    res.send(summary);
  } catch (error) {
    console.error("Error in summarizeYouTubeUrl:", error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

/**
 * Summarize content from an uploaded file
 */
const summarizeFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    const { path: filePath, mimetype: fileType, originalname } = req.file;
    const summaryLength = req.body.summaryLength || "medium";
    const summaryType = req.body.summaryType || "general";

    let extractedText = "";
    if (fileType === "application/pdf") {
      extractedText = await extractTextFromPDF(filePath);
    } else if (fileType.startsWith("image/")) {
      extractedText = await extractTextFromImage(filePath);
    } else if (
      fileType === "text/plain" ||
      originalname.endsWith(".txt") ||
      originalname.endsWith(".md")
    ) {
      extractedText = readTextFile(filePath);
    } else if (fileType.startsWith("video/")) {
      return res.status(400).send("Video transcription is not yet supported");
    } else {
      return res.status(400).send("Unsupported file type");
    }

    if (!extractedText || extractedText.trim() === "")
      return res.status(400).send("No text could be extracted from the file");

    extractedText = limitTextLength(extractedText);
    const summary = await aiService.summarizeContent(
      extractedText,
      summaryLength,
      summaryType
    );

    fs.unlinkSync(filePath); // cleanup temp file
    res.send(summary);
  } catch (error) {
    console.error("Error in summarizeFile:", error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

/**
 * Route summarization requests to appropriate handler
 */
const summarizeContent = async (req, res) => {
  try {
    const { inputType } = req.body;

    if (req.file) return await summarizeFile(req, res);
    if (inputType === "text") return await summarizeTextInput(req, res);
    if (inputType === "youtube") return await summarizeYouTubeUrl(req, res);

    return res
      .status(400)
      .send(
        "No valid input provided. Upload a file, enter text, or provide a YouTube URL."
      );
  } catch (error) {
    console.error("Error in summarizeContent:", error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

module.exports = {
  summarizeContent,
  summarizeTextInput,
  summarizeYouTubeUrl,
};
