"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const WorkoutSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    main_image: { type: String, required: true },
    total_joined: { type: Number, required: false },
    sub_images: [
        {
            name: { type: String, required: true },
            time: { type: Number, required: true },
            daysToComplete: { type: Number, required: true },
            image: { type: String, required: true },
        },
    ],
});
exports.WorkoutModel = mongoose_1.default.model("Workout", WorkoutSchema);
//# sourceMappingURL=workouts.js.map