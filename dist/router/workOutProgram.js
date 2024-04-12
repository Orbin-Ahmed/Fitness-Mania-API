"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workOutProgram_1 = require("../controllers/workOutProgram");
const multer_1 = __importDefault(require("multer"));
// Multer setup
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/public/images/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const cpUpload = upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "sub_images", maxCount: 5 },
]);
exports.default = (router) => {
    router.post("/workOut", cpUpload, workOutProgram_1.createWorkout);
};
//# sourceMappingURL=workOutProgram.js.map