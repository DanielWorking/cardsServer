const { generateAuthToken } = require("../../auth/providers/jwt");
const _ = require("lodash");
const User = require("./mongodb/User.js");
const { createError } = require("../../utils/handleErrors.js");
const { comparePasswords, generateUserPassword } = require("../helpers/bcrypt");

//* register user using the user data
const registerUser = async (newUser) => {
    try {
        newUser.password = generateUserPassword(newUser.password);
        let user = new User(newUser);
        user = await user.save();
        user = _.pick(user, ["name", "email", "_id"]);
        return user;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//* get user using user id
const getUser = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//* get all users
const getUsers = async () => {
    try {
        let users = await User.find();
        return users;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//* delete user using user id
const deleteUser = async (userId) => {
    try {
        let user = await User.findByIdAndDelete(userId);
        return user;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//* update user using user id and the new data
const updateUser = async (userId, newUserData) => {
    try {
        let user = await User.findByIdAndUpdate(userId, newUserData, {
            new: true,
        });
        user = await card.save();
        return user;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//* login the user using email and password
const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });

        if (!userFromDb) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            return createError("Authentication", error);
        }
        if (!comparePasswords(password, userFromDb.password)) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            return createError("Authentication", error);
        }
        const token = generateAuthToken(userFromDb);
        return token;
    } catch (error) {
        return createError("Mongoose", error);
    }
};

module.exports = {
    registerUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser,
};
