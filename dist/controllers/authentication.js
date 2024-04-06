"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const users_1 = require("../db/users");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const helpers_1 = require("../helpers");
// Register controller
exports.register = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password, username } = req.body;
    if (!username || !password || !email) {
        res.status(400);
        throw new Error("All field is mendatory!");
    }
    const existingUser = await (0, users_1.getUserByEmail)(email);
    if (existingUser) {
        res.status(400);
        throw new Error("User already exist with this email!");
    }
    const salt = (0, helpers_1.random)();
    const user = await (0, users_1.createUser)({
        username,
        email,
        authentication: {
            salt,
            password: (0, helpers_1.authentication)(salt, password),
        },
    });
    // res
    //   .status(201)
    //   .json({ message: { username: user.username, email: user.email } })
    //   .end();
    (0, exports.login)(req, res, () => { });
});
// Login controller
exports.login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(400);
        throw new Error("All field is mendatory!");
    }
    const userObj = await (0, users_1.getUserByEmail)(email);
    const authenticationData = await (0, users_1.getUserByEmail)(email).select(`+authentication.salt + authentication.password`);
    if (!userObj) {
        res.status(400);
        throw new Error("Email or password is invalid!");
    }
    const expectedHash = (0, helpers_1.authentication)(authenticationData.authentication.salt, password);
    if (expectedHash !== authenticationData.authentication.password) {
        res.status(400);
        throw new Error("Email or password is invalid!");
    }
    const salt = (0, helpers_1.random)();
    authenticationData.authentication.sessionToken = (0, helpers_1.authentication)(salt, authenticationData._id.toString());
    await authenticationData.save();
    const sesstionToken = authenticationData.authentication.sessionToken;
    res
        .status(200)
        .json({
        username: userObj.username,
        id: userObj._id,
        sessionToken: sesstionToken,
    })
        .end();
});
// Logout controller
exports.logout = (0, express_async_handler_1.default)(async (req, res) => {
    const { sessionToken } = req.body;
    if (!sessionToken) {
        res.status(400);
        throw new Error("Session is mendatory!");
    }
    const user = await (0, users_1.getUserBySessionToken)(sessionToken);
    if (!user) {
        res.status(400);
        throw new Error("Session is invalid!");
    }
    user.authentication.sessionToken = "";
    await user.save();
    res.status(200).json({ message: "User logout successfully!" }).end();
});
//# sourceMappingURL=authentication.js.map