import * as mongoose from "mongoose";

import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "../types/RequestWithUser";
import { User, UserDocument } from "../models/user.model";

const bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

export const register = function (req: Request, res: Response) {
  var newUser = new User(req.body);

  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser
    .save()
    .then((user) => {
      user.hash_password = undefined;
      return res.json(user);
    })
    .catch(function (err: Error) {
      return res.status(400).send({
        message: err,
      });
    });
};
export const sign_in = function (req: Request, res: Response) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err: Error, user: UserDocument) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password.",
        });
      }
      return res.json({
        token: jwt.sign(
          { email: user.email, full_name: user.full_name, _id: user._id },
          "RESTFULAPIs"
        ),
      });
    }
  );
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
export const profile = function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
