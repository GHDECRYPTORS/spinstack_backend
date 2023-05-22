import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "../types/RequestWithUser";
import { User, UserDocument } from "../models/user.model";

const bcrypt = require("bcrypt");

export const register = async function (req: Request, res: Response) {
  let user: unknown = await User.create({
    ...req.body,
    hash_password: bcrypt.hashSync(req.body.password, 10),
  });

  let _user = user as UserDocument;
  return res.json(_user.login("Signed up successfully"));
};

export const login = async function (req: Request, res: Response) {
  let user = (await User.findOne({
    email: req.body.email,
  })) as UserDocument;
  if (!user || !user.comparePassword(req.body.password)) {
    return res.status(401).json({
      message: "Authentication failed. Invalid user or password.",
    });
  }
  return res.json(user.login("Logged in successfully"));
};

export const loginRequired = function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};
export const profile = async function (req: Request, res: Response) {
  if (req.user) {
    console.log(req.user)
    return res.status(200).json({
      message: "Profile fetched successfully!!",
      user: req.user,
    });
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
