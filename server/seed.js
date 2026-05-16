const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Progress = require('./models/Progress');

const seedData = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-mentor';
        console.log('Connecting to database...');
        await mongoose.connect(uri);
        console.log('Connected to MongoDB.');

        // Clean existing data
        console.log('Clearing existing users and progress...');
        await User.deleteMany({});
        await Progress.deleteMany({});

        // Create Seed User
        console.log('Creating seed user...');
        const seedUser = new User({
            name: 'Mayank Mishra',
            email: 'mayank@example.com',
            currentRole: 'Mid-Level Engineer',
            targetRole: 'Senior Solutions Architect',
            yearsExperience: 8,
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
            totalXP: 1240,
            placementProbabilityChange: 4
        });

        // The user schema hashes the password, but since password is not strictly required,
        // we can set a dummy/default local password just in case.
        seedUser.password = 'password123';
        const savedUser = await seedUser.save();
        console.log(`User created: ${savedUser.name} (${savedUser.email})`);

        // Create Seed Progress
        console.log('Creating seed progress...');
        const seedProgress = new Progress({
            userId: savedUser._id,
            roadmapData: {
                weeks: [
                    { milestone: 'Learn Fundamentals', tasks: ['Study Core Concepts', 'Practice Basics', 'Build Mini Projects'] },
                    { milestone: 'Master Key Skills', tasks: ['Advanced Topics', 'Real-world Practice', 'Code Review'] },
                    { milestone: 'Practice Challenges', tasks: ['Algorithm Practice', 'System Design', 'Mock Interviews'] },
                    { milestone: 'Deep Dive Architecture', tasks: ['Microservices', 'API Design', 'Scalability'] },
                    { milestone: 'Leadership Skills', tasks: ['Communication', 'Team Collaboration', 'Mentoring'] },
                    { milestone: 'Interview Prep', tasks: ['Mock Interviews', 'Tech Questions', 'Behavioral'] },
                    { milestone: 'Portfolio Projects', tasks: ['Build Real Project', 'Open Source', 'Document Code'] },
                    { milestone: 'Final Preparation', tasks: ['Review Weak Areas', 'Final Mocks', 'Company Research'] },
                ]
            },
            currentWeekTasks: [
                { taskId: 't1', title: 'Study Core Concepts', status: 'completed', topic: 'System Design' },
                { taskId: 't2', title: 'Practice Basics', status: 'completed', topic: 'System Design' },
                { taskId: 't3', title: 'Build Mini Projects', status: 'pending', topic: 'System Design' }
            ],
            riskLevel: 'safe',
            mentorNudges: [
                { message: 'Maintain consistency - 6+ active days per week' }
            ],
            interviewHistory: [
                { topic: 'System Design', score: 85, weaknessDetected: 'Distributed Systems caching' }
            ],
            recentActivities: [
                { icon: 'psychology', title: 'Resume Recalibration', time: '2 hours ago', desc: "AI refined the 'Executive Leadership' section of your CV to better align with Amazon's 16 Leadership Principles. Probability increased by +1.2%." },
                { icon: 'monitoring', title: 'Market Intelligence Shift', time: '6 hours ago', desc: "Detected 14 new 'Staff Engineer' openings in the Seattle area. Matching your profile with 4 high-priority leads." },
                { icon: 'auto_awesome', title: 'Interview Insight Generated', time: 'Yesterday', desc: "Custom behavioral response bank generated for your upcoming technical screening with Google. Focus on Distributed Systems Fault Tolerance." }
            ]
        });

        await seedProgress.save();
        console.log('Progress data seeded successfully.');

        console.log('Seeding process completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
