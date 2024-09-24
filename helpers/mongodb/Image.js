const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidators");

//* object of schema - first letter uppercase:
const Image = new mongoose.Schema({
    url: URL,
    alt: DEFAULT_VALIDATION,
});

module.exports = Image;
