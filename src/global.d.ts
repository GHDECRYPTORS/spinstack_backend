import { UserI } from "./models/user.model";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserI;
    }
  }
}

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    business: any;
  }
}
