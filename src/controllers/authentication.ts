import { createUser, getUserByEmail, getUserBySessionToken } from "../db/users";
import express from "express";
import asyncHandler from "express-async-handler";
import { authentication, random } from "../helpers";

// Register controller
export const register = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { email, password, username } = req.body;

    if (!username || !password || !email) {
      res.status(400);
      throw new Error("All field is mendatory!");
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400);
      throw new Error("User already exist with this email!");
    }

    const salt = random();
    const user = await createUser({
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    res
      .status(201)
      .json({ message: { username: user.username, email: user.email } })
      .end();
  }
);

// Login controller
export const login = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (!password || !email) {
      res.status(400);
      throw new Error("All field is mendatory!");
    }

    const user = await getUserByEmail(email).select(
      `+authentication.salt + authentication.password`
    );
    if (!user) {
      res.status(400);
      throw new Error("Email or password is invalid!");
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (expectedHash !== user.authentication.password) {
      res.status(400);
      throw new Error("Email or password is invalid!");
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res
      .status(200)
      .json({
        username: user.username,
        id: user._id,
        sessionToken: user.authentication.sessionToken,
      })
      .end();
  }
);

// Logout controller

export const logout = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { sessionToken } = req.body;
    if (!sessionToken) {
      res.status(400);
      throw new Error("Session is mendatory!");
    }

    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      res.status(400);
      throw new Error("Session is invalid!");
    }

    user.authentication.sessionToken = "";
    await user.save();
    res.status(200).json({ message: "User logout successfully!" }).end();
  }
);
