import express from "express";
import asyncHandler from "express-async-handler";
import { LeadModel } from "../db/leads";

export const createLead = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400);
      throw new Error("Missing required fields!");
    }

    const newLead = new LeadModel({
      name,
      email,
    });

    try {
      const savedLead = await newLead.save();
      res.status(201).json(savedLead).end();
    } catch (err) {
      res.status(400);
      throw new Error("Error creating workout");
    }
  }
);

export const getLeads = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const leads = await LeadModel.find({});
    res.status(200).json(leads);
  }
);
