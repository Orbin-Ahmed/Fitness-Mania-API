import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { errorHandler } from "./middleware";
import router from "./router";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://fitness-mania-phi.vercel.app/"],
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("This is the main page.");
});

app.use("/", router());

app.use(errorHandler);

const MONGO_URL = process.env.CONNECTION_STRING;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});
