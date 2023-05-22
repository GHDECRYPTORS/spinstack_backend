import { Request } from "express";
import { UserI } from "../models/user.model";

export type RequestWithUser = Request & { user?: UserI };
