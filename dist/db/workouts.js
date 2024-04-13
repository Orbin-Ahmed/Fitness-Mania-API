"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const WorkoutSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    main_image: { data: Buffer, contentType: String },
    total_joined: { type: Number },
    sub_images: [
        {
            name: { type: String },
            time: { type: Number },
            daysToComplete: { type: Number },
            image: { data: Buffer, contentType: String },
        },
    ],
});
exports.WorkoutModel = mongoose_1.default.model("Workout", WorkoutSchema);
//# sourceMappingURL=workouts.js.map