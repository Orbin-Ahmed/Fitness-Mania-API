"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication"));
const workOutProgram_1 = __importDefault(require("./workOutProgram"));
const lead_1 = __importDefault(require("./lead"));
const router = express_1.default.Router();
exports.default = () => {
    (0, authentication_1.default)(router);
    (0, workOutProgram_1.default)(router);
    (0, lead_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map