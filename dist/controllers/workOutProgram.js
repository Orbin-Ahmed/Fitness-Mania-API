"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkouts = exports.createWorkout = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const workouts_1 = require("../db/workouts");
const path = require("path");
const fs = require("fs");
// export const createWorkout = asyncHandler(
//   async (req: express.Request, res: express.Response) => {
//     const { name, description } = req.body;
//     if (!name || !description) {
//       res.status(400);
//       throw new Error("Missing required fields!");
//     }
//     const files = req.files as Express.Multer.File[];
//     const subImageFiles = files.slice(1);
//     const validatedSubImages = subImageFiles.map((subImage) => {
//       return {
//         image: {
//           data: fs.readFileSync(
//             path.join("./public/images/" + subImage.filename)
//           ),
//           contentType: subImage.mimetype,
//         },
//       };
//     });
//     const newWorkout = new WorkoutModel({
//       name,
//       description,
//       main_image: {
//         data: fs.readFileSync(
//           path.join("./public/images/" + files[0].filename)
//         ),
//         contentType: files[0].mimetype,
//       },
//       sub_images: validatedSubImages,
//     });
//     try {
//       const savedWorkout = await newWorkout.save();
//       res.status(201).json(savedWorkout).end();
//     } catch (err) {
//       res.status(400);
//       throw new Error("Error creating workout");
//     }
//   }
// );
exports.createWorkout = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error("Missing required fields!");
    }
    const files = req.files;
    const subImageFiles = files.slice(1);
    const validatedSubImages = subImageFiles.map((subImage) => {
        return {
            image: {
                data: subImage.filename,
                contentType: subImage.mimetype,
            },
        };
    });
    const newWorkout = new workouts_1.WorkoutModel({
        name,
        description,
        main_image: {
            data: files[0].filename,
            contentType: files[0].mimetype,
        },
        sub_images: validatedSubImages,
    });
    try {
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout).end();
    }
    catch (err) {
        res.status(400);
        throw new Error("Error creating workout");
    }
});
exports.getWorkouts = (0, express_async_handler_1.default)(async (req, res) => {
    const workouts = await workouts_1.WorkoutModel.find({});
    res.status(200).json(workouts);
});
//# sourceMappingURL=workOutProgram.js.map