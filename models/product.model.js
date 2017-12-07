var mongoose = require('mongoose');

var productModel = mongoose.model("Product", {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now },
    price: Number,
    color: String,
    img: { type: String }
});

module.exports = productModel;