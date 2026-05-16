const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    currentRole: { type: String, default: 'Mid-Level Engineer' },
    targetRole: { type: String, default: 'Software Engineer' },
    yearsExperience: { type: Number, default: 8 },
    placementProbability: { type: Number, default: 45 },
    skills: { type: Map, of: Number, default: {} }, // e.g., {'System Design': 85}
    companyFitScores: { type: Map, of: Number, default: {} },
    streak: { type: Number, default: 0 },
    totalXP: { type: Number, default: 0 },
    placementProbabilityChange: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
    const user = this;
    
    // Only hash if password has been modified and exists
    if (!user.password || !user.isModified('password')) {
        return;
    }
    
    // Generate salt and hash using async/await
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    if (!this.password) return callback(null, false);
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
