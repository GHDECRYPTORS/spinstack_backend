import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { Business, BusinessDocument } from "../models/business.model";
import { UserI } from "../models/user.model";

async function SetBusinessMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(" ")[1];
    const business = (await Business.findOne({
      api_key: token,
    })) as BusinessDocument;
    if (!business) {
      return res.status(401).json({
        message: "Unauthorized",
        data: {},
        status: false,
      });
    }
    req.business = business;
  }
  next();
}

export default SetBusinessMiddleware;
