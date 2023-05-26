import * as jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

import { UserI } from "../models/user.model";

function SetUserMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(" ")[1];
    let user: UserI;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET as string) as UserI;
    } catch (error) {
      return next();
    }
    req.user = user;
  }
  next();
}

export default SetUserMiddleware;
