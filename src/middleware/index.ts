import { getUserBySessionToken } from "db/users";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { get, identity, merge } from "lodash";

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: "Validation Error",
        message: err.message,
      });
      break;
    case 404:
      res.json({
        title: "Not Found",
        message: err.message,
      });
      break;
    case 401:
      res.json({
        title: "Unauthorized",
        message: err.message,
      });
      break;
    case 403:
      res.json({
        title: "Forbidden",
        message: err.message,
      });
      break;
    case 500:
      res.json({
        title: "Server Error",
        message: err.message,
      });
      break;
    default:
      console.log("No Error, All Good !");
      break;
  }
};

export const isAuthenticated = expressAsyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { sessionToken } = req.body;
    if (!sessionToken) {
      res.status(403);
      throw new Error("Session value is mendatory!");
    }

    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      res.status(403);
      throw new Error("You are not permitted to this operation!");
    }

    merge(req, { identity: user });
    return next();
  }
);

export const isOwner = expressAsyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    if (!currentUserId) {
      res.status(403);
      throw new Error("You are not permitted to this operation!");
    }
    if (currentUserId.toString() !== id) {
      res.status(403);
      throw new Error("You are not permitted to this operation!");
    }
    next();
  }
);
