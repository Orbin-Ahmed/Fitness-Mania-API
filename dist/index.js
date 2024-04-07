"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = require("./middleware");
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://fitness-mania-phi.vercel.app/"],
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
app.get("/", (req, res) => {
    res.send("This is the main page.");
});
app.use("/", (0, router_1.default)());
app.use(middleware_1.errorHandler);
const MONGO_URL = process.env.CONNECTION_STRING;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on("error", (error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map