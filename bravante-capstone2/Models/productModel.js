const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Required"]
    },

    description: {
        type: String,
        required: [true, "Description Required"]
    },

    price: {
        type: Number,
        required: [true, "Price Required"]
    },

    quantity: {
        type: Number,
        required: [true, "Quantity Required"],
    },

    isActive:{
        type: Boolean,
        default: true,
    },

    createdOn: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Product", productModel);