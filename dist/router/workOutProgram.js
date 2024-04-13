"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workOutProgram_1 = require("../controllers/workOutProgram");
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../utils/multer");
// initialize multer
const upload = (0, multer_1.default)({
    storage: multer_2.storage,
    fileFilter: multer_2.fileFilter,
});
exports.default = (router) => {
    router.post("/workout", upload.array("images", 6), workOutProgram_1.createWorkout);
    router.get("/workout", workOutProgram_1.getWorkouts);
};
//# sourceMappingURL=workOutProgram.js.map