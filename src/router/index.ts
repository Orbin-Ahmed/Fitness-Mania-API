import express from "express";
import authentication from "./authentication";
import workout from "./workOutProgram";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  workout(router);
  return router;
};
