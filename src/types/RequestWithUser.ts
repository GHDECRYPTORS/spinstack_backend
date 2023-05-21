import { Request } from "express";
import { UserDocument } from "../models/user.model";

export type RequestWithUser = Request & { user: UserDocument };
