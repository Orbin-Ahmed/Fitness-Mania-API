import express from "express";
import { createWorkout } from "../controllers/workOutProgram";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Multer setup
const storage = multer.diskStorage({
  destination: function (
    req: express.Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, "/public/images/");
  },
  filename: function (
    req: express.Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "main_image", maxCount: 1 },
  { name: "sub_images", maxCount: 5 },
]);

export default (router: express.Router) => {
  router.post("/workOut", cpUpload, createWorkout);
};
