const express = require('express');
const cors = require('cors');
const path = require('path');
const aiRoutes = require('./routes/ai.routes');
const mediaRoutes = require('./routes/media.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/ai', aiRoutes);       // -> /ai/code-metrics-analyzer
app.use('/media', mediaRoutes); // -> /media/...
 // Using the same /ai prefix for consistency

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');   
});

module.exports = app;