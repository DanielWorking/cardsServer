const morgan = require("morgan");
const { currentTime } = require("../../utils/timeHelper");
const chalk = require("chalk");

//* the morgan logger function:
const morganLogger = morgan(function (tokens, req, res) {
    const { year, month, day, hours, minuts, seconds } = currentTime();
    let message = [
        `[${year}/${month}/${day} ${hours}:${minuts}:${seconds}]`,
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        "-",
        tokens["response-time"](request, response),
        "ms",
    ].join(" ");

    if (response.status >= 400) return chalk.redBright(message);
    else return chalk.cyanBright(message);
});

module.exports = morganLogger;
