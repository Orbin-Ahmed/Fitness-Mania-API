"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeads = exports.createLead = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const leads_1 = require("../db/leads");
exports.createLead = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400);
        throw new Error("Missing required fields!");
    }
    const newLead = new leads_1.LeadModel({
        name,
        email,
    });
    try {
        const savedLead = await newLead.save();
        res.status(201).json(savedLead).end();
    }
    catch (err) {
        console.log(err);
        res.status(400);
        throw new Error("Error creating lead!");
    }
});
exports.getLeads = (0, express_async_handler_1.default)(async (req, res) => {
    const leads = await leads_1.LeadModel.find({});
    res.status(200).json(leads);
});
//# sourceMappingURL=leadsController.js.map