const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minLength: 2, maxLength: 50 },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'] },
        password: { type: String, required: true, minLength: 6 },
        targetRole: { type: String, default: "Software Engineer", trim: true },
        placementProbability: { type: Number, default: 45, min: 0, max: 100 },
        skills: { type: Map, of: Number, default: {} }, // e.g., {'System Design': 85}
        companyFitScores: { type: Map, of: Number, default: {} },
        streak: { type: Number, default: 0, min: 0 },
        totalXP: { type: Number, default: 0, min: 0 },
        lastActive: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function () {
    // Only hash if password has been modified
    if (!this.isModified("password")) {
        return;
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model("User", userSchema);
