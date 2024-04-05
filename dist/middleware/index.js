"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = exports.isAuthenticated = exports.errorHandler = void 0;
const users_1 = require("../db/users");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const lodash_1 = require("lodash");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400:
            res.json({
                title: "Validation Error",
                message: err.message,
            });
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: err.message,
            });
            break;
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message,
            });
            break;
        case 403:
            res.json({
                title: "Forbidden",
                message: err.message,
            });
            break;
        case 500:
            res.json({
                title: "Server Error",
                message: err.message,
            });
            break;
        default:
            console.log("No Error, All Good !");
            break;
    }
};
exports.errorHandler = errorHandler;
exports.isAuthenticated = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { sessionToken } = req.body;
    if (!sessionToken) {
        res.status(403);
        throw new Error("Session value is mendatory!");
    }
    const user = await (0, users_1.getUserBySessionToken)(sessionToken);
    if (!user) {
        res.status(403);
        throw new Error("You are not permitted to this operation!");
    }
    (0, lodash_1.merge)(req, { identity: user });
    return next();
});
exports.isOwner = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const currentUserId = (0, lodash_1.get)(req, "identity._id");
    if (!currentUserId) {
        res.status(403);
        throw new Error("You are not permitted to this operation!");
    }
    if (currentUserId.toString() !== id) {
        res.status(403);
        throw new Error("You are not permitted to this operation!");
    }
    next();
});
//# sourceMappingURL=index.js.map