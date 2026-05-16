const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');
const jwt = require('jsonwebtoken');

// Signup endpoint
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        user.comparePassword(password, async (err, isPasswordValid) => {
            if (err) {
                return res.status(500).json({ message: 'Error validating password' });
            }

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Update last active
            user.lastActive = new Date();
            await user.save();

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get current user profile
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// GET /profile by email
router.get('/profile', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        let user = await User.findOne({ email });
        if (!user) {
            // Self-healing: create a default user on-demand if they signed up with Firebase
            user = new User({
                name: email.split('@')[0],
                email: email,
                currentRole: 'Mid-Level Engineer',
                targetRole: 'Senior Solutions Architect',
                yearsExperience: 8,
                placementProbability: 0,
                skills: {
                    'System Design': 0,
                    'Cloud Arch': 0,
                    'Distributed Systems': 0,
                    'Leadership': 0
                },
                companyFitScores: {
                    'Google': 0,
                    'AWS': 0,
                    'Netflix': 0
                },
                streak: 0,
                totalXP: 0
            });
            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /profile by email
router.put('/profile', async (req, res) => {
    try {
        const { email } = req.query;
        const updateData = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOneAndUpdate({ email }, updateData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /progress by email
router.get('/progress', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        let user = await User.findOne({ email });
        if (!user) {
            // Auto-create user first with 0 values
            user = new User({
                name: email.split('@')[0],
                email: email,
                currentRole: 'Mid-Level Engineer',
                targetRole: 'Senior Solutions Architect',
                yearsExperience: 8,
                placementProbability: 0,
                skills: {
                    'System Design': 0,
                    'Cloud Arch': 0,
                    'Distributed Systems': 0,
                    'Leadership': 0
                },
                companyFitScores: {
                    'Google': 0,
                    'AWS': 0,
                    'Netflix': 0
                },
                streak: 0,
                totalXP: 0
            });
            await user.save();
        }

        let progress = await Progress.findOne({ userId: user._id });
        if (!progress) {
            // Self-healing: create an empty progress document for a new onboarding user
            progress = new Progress({
                userId: user._id,
                roadmapData: null,
                currentWeekTasks: [
                    { taskId: 't1', title: 'Setup Career Focus Area', status: 'pending', topic: 'Orientation' },
                    { taskId: 't2', title: 'Generate AI Guided Roadmap', status: 'pending', topic: 'Orientation' },
                    { taskId: 't3', title: 'Upload Initial Resume Draft', status: 'pending', topic: 'Orientation' }
                ],
                riskLevel: 'safe',
                mentorNudges: [],
                interviewHistory: [],
                recentActivities: []
            });
            await progress.save();
        }

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /progress by email
router.put('/progress', async (req, res) => {
    try {
        const { email } = req.query;
        const updateData = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const progress = await Progress.findOneAndUpdate(
            { userId: user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id/profile', async (req, res) => {
    try {
        // Fallback mock if no specific ID or DB empty
        if (req.params.id === 'default' || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.json({
                placementProbability: 68,
                skills: {
                    'System Design': 85,
                    'Cloud Arch': 92,
                    'Distributed Systems': 60,
                    'Leadership': 75
                },
                companyFitScores: {
                    'Google': 92,
                    'AWS': 84,
                    'Netflix': 71
                },
                streak: 14,
                totalXP: 1240
            });
        }
        
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json({
            placementProbability: user.placementProbability,
            skills: user.skills,
            companyFitScores: user.companyFitScores,
            streak: user.streak,
            totalXP: user.totalXP
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
