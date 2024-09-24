const mongoose = require("mongoose");
const { PHONE, EMAIL } = require("../../../helpers/mongodb/mongooseValidators");
const Address = require("../../../helpers/mongodb/address");
const Image = require("../../../helpers/mongodb/image");
const Name = require("../../../helpers/mongodb/Name");

//* user schema
const userSchema = new mongoose.Schema({
    name: Name,
    phone: PHONE,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true,
    },
    image: Image,
    address: Address,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
