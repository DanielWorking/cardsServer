const morganLogger = require("./loggers/morganLogger");

//* addapter to respond accordign to the type of logger for the program:
const config = require("config");
const logger = config.get("LOGGER");

const loggerMiddleware = () => {
    if (logger === "morgan") {
        return morganLogger;
    }
};

module.exports = loggerMiddleware;
