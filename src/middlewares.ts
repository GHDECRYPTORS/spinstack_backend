import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./interfaces/ErrorResponse";
import { HttpException } from "./exceptions/http.exception";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error | HttpException,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  if (err instanceof HttpException) {
    res.status(err.status);
    statusCode = err.status;
  } else {
    res.status(statusCode);
  }
  res.json({
    message: err.message,
    // stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    status: statusCode,
    errors: err instanceof HttpException ? err.errors : undefined,
  });
}

export const validMongoIds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, business_id } = req.params;
  if (id && !/^[0-9a-fA-F]{24}$/.test(id)) {
    next("route");
  }
  if (business_id && !/^[0-9a-fA-F]{24}$/.test(business_id)) {
    next("route");
  }
  next();
};
