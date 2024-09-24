const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Address = new mongoose.Schema({
    state: {
        type: String,
        maxLength: 256,
        trim: true,
    },
    country: DEFAULT_VALIDATION,
    city: DEFAULT_VALIDATION,
    street: DEFAULT_VALIDATION,
    houseNumber: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
    },
    zip: {
        type: Number,
        // trim: true, //! on class we didnt add although it was in the assignment
        default: 0,
    },
});

module.exports = Address;
