import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const LeadModel = mongoose.model("Lead", LeadSchema);
