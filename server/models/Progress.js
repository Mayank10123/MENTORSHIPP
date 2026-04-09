const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roadmapData: { type: Object }, 
    currentWeekTasks: [{
        taskId: String,
        title: String,
        status: { type: String, enum: ['pending', 'completed', 'missed'], default: 'pending' },
        topic: String
    }],
    riskLevel: { type: String, enum: ['safe', 'at-risk', 'critical'], default: 'safe' },
    mentorNudges: [{
        message: String,
        date: { type: Date, default: Date.now }
    }],
    interviewHistory: [{
        topic: String,
        score: Number,
        weaknessDetected: String,
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
