import express from "express";
import asyncHandler from "express-async-handler";
import { WorkoutModel } from "../db/workouts";

export const createWorkout = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    console.log(req.files);
    // const { name, description } = req.body;

    // if (!name || !description) {
    //   res.status(400);
    //   throw new Error("Missing required fields!");
    // }

    // const newWorkout = new WorkoutModel({
    //   name,
    //   description,
    // });

    // try {
    //   const savedWorkout = await newWorkout.save();
    //   res.status(201).json(savedWorkout).end();
    // } catch (err) {
    //   res.status(500).json({ message: "Error creating workout" });
    // }
  }
);

module.exports = createWorkout;
