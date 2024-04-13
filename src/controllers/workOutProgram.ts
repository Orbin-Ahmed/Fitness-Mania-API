import express from "express";
import asyncHandler from "express-async-handler";
import { WorkoutModel } from "../db/workouts";
const path = require("path");
const fs = require("fs");

export const createWorkout = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400);
      throw new Error("Missing required fields!");
    }
    const files = req.files as Express.Multer.File[];
    const subImageFiles = files.slice(1);
    const validatedSubImages = subImageFiles.map((subImage) => {
      return {
        image: {
          data: fs.readFileSync(
            path.join("./public/images/" + subImage.filename)
          ),
          contentType: subImage.mimetype,
        },
      };
    });
    const newWorkout = new WorkoutModel({
      name,
      description,
      main_image: {
        data: fs.readFileSync(
          path.join("./public/images/" + files[0].filename)
        ),
        contentType: files[0].mimetype,
      },
      sub_images: validatedSubImages,
    });

    try {
      const savedWorkout = await newWorkout.save();
      res.status(201).json(savedWorkout).end();
    } catch (err) {
      res.status(400);
      throw new Error("Error creating workout");
    }
  }
);

export const getWorkouts = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const workouts = await WorkoutModel.find({});
    res.status(200).json(workouts);
  }
);
