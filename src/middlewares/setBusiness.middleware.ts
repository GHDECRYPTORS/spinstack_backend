import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { BusinessDocument } from "../models/business.model";
import { UserI } from "../models/user.model";

function SetBusinessMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(" ")[1];
    const business = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as BusinessDocument;
    req.business = business;
  }

  if (req.business == null) {
    throw Error("Invalid business api key");
  }
  next();
}

export default SetBusinessMiddleware;
