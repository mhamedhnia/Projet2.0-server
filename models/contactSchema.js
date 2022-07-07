const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = ContactForm = model("Contact", contactSchema);
