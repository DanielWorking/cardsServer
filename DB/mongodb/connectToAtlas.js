const mongoose = require("mongoose");
const connectionStringForAtlas = "";

const connectToAtlaslDb = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
};

module.exports = connectToAtlaslDb;
