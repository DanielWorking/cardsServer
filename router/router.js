const express = require("express");
const cardsRouterController = require("../cards/routes/cardsRestController.js");
const usersRouterController = require("../users/routes/usersRestController.js");
const { handleError } = require("../utils/handleErrors");
const router = express.Router();

//* all the request that starts with "/cards" / "/users" turn to the apropreiate router control
router.use("/cards", cardsRouterController);
router.use("/users", usersRouterController);

//* for the rest of url addresses - 404 response
router.use((request, response) => {
    return handleError(response, 404, "Page not found");
});

module.exports = router;
