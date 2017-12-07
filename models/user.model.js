var mongoose = require('mongoose');

module.exports = mongoose.model("User", {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Password is mandatory field"], minlength: [3, "Mininum 3 chars"] },
    active: { type: Boolean, default: false },
    lastUpdated: { type: Date, default: Date.now },
    phone: {
        type: String, validate: {
            validator: function (val) {
                return /[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(val);
            }
        }
    }
});
