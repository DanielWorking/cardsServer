const express = require("express");
const {
    registerUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser,
} = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
    validateRegistration,
    validateLogin,
} = require("../validation/userValidationService.js");
const router = express.Router();

//* register user
router.post("/", async (request, response) => {
    try {
        const error = validateRegistration(request.body);
        if (error) return handleError(response, 400, `Joi Error: ${error}`);

        let user = await registerUser(request.body);
        response.send(user);
    } catch (error) {
        return handleError(response, error.status || 400, error.message);
    }
});

//* get user
router.get("/:userId", auth, async (request, response) => {
    try {
        const { userId } = request.params;
        const userInfo = request.user;
        if (userInfo._id == userId && !user.isAdmin) {
            return handleError(
                response,
                403,
                "User is not authorized to access this information."
            );
        }
        let user = await getUser(userId);
        response.send(user);
    } catch (error) {
        handleError(response, 404, "User not found.");
    }
});

//* get all uesrs
router.get("/", auth, async (request, response) => {
    try {
        let users = await getUsers();
        response.send(users);
    } catch (error) {
        handleError(response, 500, "Failed to retrieve users.");
    }
});

//* delete user
router.delete("/:userId", auth, async (request, response) => {
    const { userId } = request.params;
    const userInfo = request.user;
    if ((userInfo.isAdmin || userInfo.isBusiness) && userInfo._id == userId) {
        try {
            let deletedUser = await deleteUser(request.params.userId);
            response.send(deletedUser);
        } catch (error) {
            handleError(response, 500, "Failed to delete the user.");
        }
    }
});

//* update user
router.put("/:userId", auth, async (request, response) => {
    const { userId } = request.params;
    const userInfo = request.user;
    if (userInfo.isAdmin || userInfo._id == userId) {
        try {
            const error = validateLogin(request.body);
            if (error) return handleError(response, 400, `Joi Error: ${error}`);

            let updatedUser = await updateUser(
                request.params.userId,
                request.body
            );
            response.send(updatedUser);
        } catch (error) {
            handleError(response, 400, "Invalid user data.");
        }
    }
});

//* login user
router.post("/login", async (request, response) => {
    try {
        const error = validateLogin(request.body);
        if (error) return handleError(response, 400, `Joi Error: ${error}`);

        let { email, password } = request.body;
        const token = await loginUser(email, password);
        response.send(token);
    } catch (error) {
        return handleError(response, error.status || 400, error.message);
    }
});

module.exports = router;
