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
    res
        .status(201)
        .json({ message: { username: user.username, email: user.email } })
        .end();
});
// Login controller
exports.login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(400);
        throw new Error("All field is mendatory!");
    }
    const user = await (0, users_1.getUserByEmail)(email).select(`+authentication.salt + authentication.password`);
    if (!user) {
        res.status(400);
        throw new Error("Email or password is invalid!");
    }
    const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
    if (expectedHash !== user.authentication.password) {
        res.status(400);
        throw new Error("Email or password is invalid!");
    }
    const salt = (0, helpers_1.random)();
    user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
    await user.save();
    res
        .status(200)
        .json({
        name: user.username,
        id: user._id,
        sessionToken: user.authentication.sessionToken,
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