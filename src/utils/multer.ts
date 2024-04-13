import express from "express";
import multer, { FileFilterCallback } from "multer";
const path = require("path");

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Multer setup
export const storage = multer.diskStorage({
  destination: function (
    req: express.Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, "public/images/");
  },
  filename: function (
    req: express.Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const fileFilter = (
  request: express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
