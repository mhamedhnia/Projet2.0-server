// models schema file
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 8,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    isAdmin: false,
});

module.exports = mongoose.model("User", userSchema);
