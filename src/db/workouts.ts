import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  id: {
    type: Number,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  main_image: { data: Buffer, contentType: String },
  total_joined: { type: Number },
  sub_images: [
    {
      name: { type: String },
      time: { type: Number },
      daysToComplete: { type: Number },
      image: { data: Buffer, contentType: String },
    },
  ],
});

export const WorkoutModel = mongoose.model("Workout", WorkoutSchema);
