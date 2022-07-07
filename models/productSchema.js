const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const productSchema = new Schema({
    imageURL: {
        type: String,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = Products = model("Product", productSchema);
