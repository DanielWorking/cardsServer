const { generateAuthToken } = require("../../auth/providers/jwt");
const _ = require("lodash");
const User = require("./mongodb/User.js");
const { createError } = require("../../utils/handleErrors.js");
const { comparePasswords, generateUserPassword } = require("../helpers/bcrypt");

//TODO: registerUser(newUser):
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

//TODO: getUser(userId):
const getUser = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: getUsers():
const getUsers = async () => {
    try {
        let users = await User.find();
        return users;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: deleteUser(userId):
const deleteUser = async (userId) => {
    try {
        let user = await User.findByIdAndDelete(userId);
        return user;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: updateUser(userId, newUserData)
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

//TODO: loginUser(email, passward):
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
