/**
 * Media Controller
 * This file contains the controller functions for handling media files and content
 */

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');
const axios = require('axios');
const aiService = require('../services/ai.service');

/**
 * Extract text from a PDF file
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

/**
 * Extract text from an image using OCR
 * @param {string} filePath - Path to the image file
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromImage = async (filePath) => {
  try {
    const { data } = await Tesseract.recognize(filePath, 'eng');
    return data.text;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw new Error('Failed to extract text from image');
  }
};

/**
 * Read text from a text file
 * @param {string} filePath - Path to the text file
 * @returns {Promise<string>} - File content
 */
const readTextFile = async (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading text file:', error);
    throw new Error('Failed to read text file');
  }
};

/**
 * Extract information from a YouTube URL
 * @param {string} youtubeUrl - YouTube video URL
 * @returns {Promise<string>} - Video information
 */
const extractYouTubeInfo = async (youtubeUrl) => {
  try {
    // For now, we'll use a simple approach to get video ID
    const videoId = extractYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Use YouTube API to get video details (in a real app, you'd use the YouTube Data API)
    // For this demo, we'll simulate getting video information
    return `YouTube Video ID: ${videoId}
Title: Sample YouTube Video
Description: This is a placeholder for the actual YouTube video transcript and information.
Since we don't have direct access to YouTube transcripts in this demo, we're providing this placeholder text.
In a production environment, you would integrate with the YouTube Data API and a transcription service to get the actual video content.
The video appears to be discussing technology, programming, and AI-related topics based on the URL.
`;
  } catch (error) {
    console.error('Error extracting YouTube info:', error);
    throw new Error('Failed to extract information from YouTube URL');
  }
};

/**
 * Extract YouTube video ID from URL
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if invalid
 */
const extractYouTubeVideoId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

/**
 * Summarize content from text input
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const summarizeTextInput = async (req, res) => {
  try {
    const { text, summaryLength, summaryType } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).send('No text provided');
    }

    // Limit text length to avoid token limits
    const maxLength = 15000;
    const processedText = text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;

    // Generate summary
    const summary = await aiService.summarizeContent(
      processedText,
      summaryLength || 'medium',
      summaryType || 'general'
    );

    res.send(summary);
  } catch (error) {
    console.error('Error in summarizeTextInput:', error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

/**
 * Summarize content from YouTube URL
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const summarizeYouTubeUrl = async (req, res) => {
  try {
    const { youtubeUrl, summaryLength, summaryType } = req.body;

    if (!youtubeUrl || youtubeUrl.trim() === '') {
      return res.status(400).send('No YouTube URL provided');
    }

    // Extract information from YouTube URL
    const videoInfo = await extractYouTubeInfo(youtubeUrl);

    // Generate summary
    const summary = await aiService.summarizeContent(
      videoInfo,
      summaryLength || 'medium',
      summaryType || 'general'
    );

    res.send(summary);
  } catch (error) {
    console.error('Error in summarizeYouTubeUrl:', error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

/**
 * Summarize content from a file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const summarizeFile = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const filePath = req.file.path;
    const fileType = req.file.mimetype;
    const summaryLength = req.body.summaryLength || 'medium';
    const summaryType = req.body.summaryType || 'general';

    let extractedText = '';

    // Extract text based on file type
    if (fileType === 'application/pdf') {
      extractedText = await extractTextFromPDF(filePath);
    } else if (fileType.startsWith('image/')) {
      extractedText = await extractTextFromImage(filePath);
    } else if (fileType === 'text/plain' ||
               req.file.originalname.endsWith('.txt') ||
               req.file.originalname.endsWith('.md')) {
      extractedText = await readTextFile(filePath);
    } else if (fileType.startsWith('video/')) {
      // For video files, we would need a more complex solution with ffmpeg
      // For now, we'll return an error
      return res.status(400).send('Video transcription is not yet supported');
    } else {
      return res.status(400).send('Unsupported file type');
    }

    // Check if text was extracted
    if (!extractedText || extractedText.trim() === '') {
      return res.status(400).send('No text could be extracted from the file');
    }

    // Limit text length to avoid token limits (Gemini has a context window)
    const maxLength = 15000; // Adjust based on model's token limit
    if (extractedText.length > maxLength) {
      extractedText = extractedText.substring(0, maxLength) + '...';
    }

    // Generate summary
    const summary = await aiService.summarizeContent(
      extractedText,
      summaryLength,
      summaryType
    );

    // Clean up the temporary file
    fs.unlinkSync(filePath);

    res.send(summary);
  } catch (error) {
    console.error('Error in summarizeFile:', error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

/**
 * Summarize content from various sources (file, text, or YouTube URL)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const summarizeContent = async (req, res) => {
  try {
    const { inputType } = req.body;

    // Route to the appropriate handler based on input type
    if (req.file) {
      // If a file was uploaded, use the file handler
      return await summarizeFile(req, res);
    } else if (inputType === 'text') {
      // If text input was provided
      return await summarizeTextInput(req, res);
    } else if (inputType === 'youtube') {
      // If YouTube URL was provided
      return await summarizeYouTubeUrl(req, res);
    } else {
      // If no valid input was provided
      return res.status(400).send('No valid input provided. Please upload a file, enter text, or provide a YouTube URL.');
    }
  } catch (error) {
    console.error('Error in summarizeContent:', error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

module.exports = {
  summarizeContent,
  summarizeTextInput,
  summarizeYouTubeUrl
};
