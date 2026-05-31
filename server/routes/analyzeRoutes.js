const express = require('express');
const router = express.Router();
const axios = require('axios');

// Analyze resume endpoint - expects JSON with resume_text
router.post('/resume', async (req, res) => {
    try {
        const { resume_text } = req.body;

        if (!resume_text || resume_text.trim().length === 0) {
            return res.status(400).json({
                message: 'No resume text provided',
                error: 'resume_text is required',
                suggestion: 'Please upload or paste your resume text'
            });
        }

        console.log(`Processing resume: ${resume_text.length} characters`);

        // Send to Python AI service for analysis
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';
        console.log(`Sending to AI service: ${aiServiceUrl}/evaluate/resume`);

        const response = await axios.post(`${aiServiceUrl}/evaluate/resume`, {
            resume_text: resume_text
        });

        console.log('AI service response:', response.data);
        return res.json(response.data);
    } catch (error) {
        console.error('Error analyzing resume:', error.message);
        return res.status(500).json({
            message: 'Error analyzing resume',
            error: error.message,
            suggestion: error.response?.status === 500 ? 'AI service error, please try again' : 'Please try again'
        });
    }
});

module.exports = router;
