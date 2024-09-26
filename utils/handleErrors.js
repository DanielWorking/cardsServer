const chalk = require("chalk");

const createError = (validator, error) => {
    error.message = `${validator} Error: ${error.message}`;
    error.status = error.status || 400;
    throw new Error(error);
};

const handleError = (response, status, message = "") => {
    console.log(chalk.redBright(message));
    return response.status(status).send(message);
};

module.exports = { createError, handleError };
