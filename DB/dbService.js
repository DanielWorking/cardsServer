const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlaslDb = require("./mongodb/connectToAtlas");

//* connecting to the right db according to the type of environment
const config = require("config");
const ENVIRONMENT = config.get("ENVIRONMENT");

const connectToDb = async () => {
    if (ENVIRONMENT === "development") {
        await connectToLocalDb();
    }
    if (ENVIRONMENT === "production") {
        await connectToAtlaslDb();
    }
};

module.exports = connectToDb;
