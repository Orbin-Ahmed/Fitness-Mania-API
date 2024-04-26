"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leadsController_1 = require("../controllers/leadsController");
exports.default = (router) => {
    router.post("/lead", leadsController_1.createLead);
    router.get("/lead", leadsController_1.getLeads);
};
//# sourceMappingURL=lead.js.map