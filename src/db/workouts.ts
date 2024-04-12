import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  main_image: { type: String, required: true },
  total_joined: { type: Number, required: false },
  sub_images: [
    {
      name: { type: String, required: true },
      time: { type: Number, required: true },
      daysToComplete: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
});

export const WorkoutModel = mongoose.model("Workout", WorkoutSchema);
