import { createLead, getLeads } from "../controllers/leadsController";
import express from "express";

export default (router: express.Router) => {
  router.post("/lead", createLead);
  router.get("/lead", getLeads);
};
