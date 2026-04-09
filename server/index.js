const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const analyzeRoutes = require('./routes/analyzeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

app.get('/api', (req, res) => {
    res.json({ message: 'Node Orchestration Server Running' });
});

// App Routes
app.use('/api/user', userRoutes);
app.use('/api/analyze', analyzeRoutes);

// PDF Serving Route - serve PDFs from public/pdfs/
app.get('/pdfs/:category/:filename', (req, res) => {
    const { category, filename } = req.params;
    console.log('Requested PDF:', category, filename);
    
    // Validate category to prevent path traversal
    if (!['roadmaps', 'best-practices'].includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
    }
    
    // Validate filename to prevent path traversal
    if (filename.includes('..') || filename.includes('/')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    
    const filePath = path.join(__dirname, '..', 'client', 'public', 'pdfs', category, filename);
    console.log('Full path:', filePath);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.log('File does not exist at:', filePath);
        return res.status(404).json({ error: 'PDF not found' });
    }
    
    console.log('File found, streaming...');
    
    // Set headers to force inline display (not download)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    fileStream.on('error', (err) => {
        console.error('File streaming error:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error streaming PDF' });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
