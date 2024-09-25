const cors = require("cors");

const corsMiddleware = cors({
    origin: ["http://localhost:5500"],
});

module.exports = corsMiddleware;
