import express from "express";
import authentication from "./authentication";
import workout from "./workOutProgram";
import lead from "./lead";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  workout(router);
  lead(router);
  return router;
};
