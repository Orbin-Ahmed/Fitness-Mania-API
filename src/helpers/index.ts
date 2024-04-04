import express from "express";
import crypto from "crypto";

const SECRET = process.env.SECRET;

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

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
