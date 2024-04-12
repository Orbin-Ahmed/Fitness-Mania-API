"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkout = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.createWorkout = (0, express_async_handler_1.default)(async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    // const { name, description } = req.body;
    // if (!name || !description) {
    //   res.status(400);
    //   throw new Error("Missing required fields!");
    // }
    // const newWorkout = new WorkoutModel({
    //   name,
    //   description,
    // });
    // try {
    //   const savedWorkout = await newWorkout.save();
    //   res.status(201).json(savedWorkout).end();
    // } catch (err) {
    //   res.status(500).json({ message: "Error creating workout" });
    // }
});
module.exports = exports.createWorkout;
//# sourceMappingURL=workOutProgram.js.map