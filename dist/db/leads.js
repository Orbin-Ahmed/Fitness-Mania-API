"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LeadSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
});
exports.LeadModel = mongoose_1.default.model("Lead", LeadSchema);
//# sourceMappingURL=leads.js.map