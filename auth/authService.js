const { createError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");

//* using the default json file in the config folder for the token generator configuration:
const config = require("config");
const tokenGenerator = config.get("TOKEN_GENERATOR");

//* custom middleware for authenticating its user
const auth = (request, response, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const tokenFromClient = request.header("x-auth-token");
            if (!tokenFromClient) {
                createError("Authentication", "Please Login");
            }
            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {
                createError("Authentication", "Unauthorized user");
            }
            request.user = userInfo;
            return next();
        } catch (error) {
            return handleError(response, 401, error.message);
        }
    }
    return handleError(response, 500, error.message);
};

module.exports = auth;
