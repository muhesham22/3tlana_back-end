const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    car: {
        brand: { type: String },
        model: { type: String },
        year: { type: Number },
    },
    brand: { type: String },
    qty: {
        required: true,
        type: Number,
    },
    types: [{
        type: String,
    }],
})

module.exports = mongoose.model('Product', productSchema);