var mongoose = require('mongoose');

module.exports = mongoose.model("Review", {
    productId: { type: String, required: true},
    rating: { type: Number, required: [true, "Rating is required"]},
    subject: { type: String, required:true},
    review: { type: String, required:true},
    lastUpdated: { type: Date, default: Date.now }
});
