const mongoose = require("mongoose");

//* connecting the node.js to mongodb
const connectToLocalDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/cardsServer");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
};

module.exports = connectToLocalDb;
