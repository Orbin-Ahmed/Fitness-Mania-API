import express from "express";
import { createWorkout, getWorkouts } from "../controllers/workOutProgram";
import multer from "multer";
import { storage, fileFilter } from "../utils/multer";

// initialize multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default (router: express.Router) => {
  router.post("/workout", upload.array("images", 6), createWorkout);
  router.get("/workout", getWorkouts);
};
