const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Create the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
