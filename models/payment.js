const mongoose = require('mongoose');

const paySchema = mongoose.Schema({
    cardNumber: {
        type: String,
        required: true,
        trim: true
    },
    expDate: {
        type: Date,
        required: true
    },
    cvv: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 4
    }
});

const payModel = mongoose.model("payments", paySchema);

module.exports = payModel;