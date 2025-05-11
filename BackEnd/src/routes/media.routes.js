/**
 * Media Routes
 * This file contains the routes for handling media files
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mediaController = require('../controllers/media.controller');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only certain file types
const fileFilter = (req, file, cb) => {
  // Accept images, PDFs, videos, and text files
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype === 'application/pdf' ||
    file.mimetype.startsWith('video/') ||
    file.mimetype === 'text/plain' ||
    file.originalname.endsWith('.txt') ||
    file.originalname.endsWith('.md')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const router = express.Router();

// Routes for summarizing content
// The upload.single middleware will be skipped if no file is uploaded
router.post('/summarize-content', upload.single('file'), mediaController.summarizeContent);

// Dedicated routes for specific input types (for clarity and potential future enhancements)
router.post('/summarize-text', mediaController.summarizeTextInput);
router.post('/summarize-youtube', mediaController.summarizeYouTubeUrl);

module.exports = router;
