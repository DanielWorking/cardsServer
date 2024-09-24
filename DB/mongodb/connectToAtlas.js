const mongoose = require("mongoose");
// not uplaoding to cload so no use in atlas mongodb
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
