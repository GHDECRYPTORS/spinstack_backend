import express from "express";
import { order } from "../controllers/sdk.controller";
const authRouter = express.Router();
authRouter.route("/order").post((req, res, next) => {
  next();
}, order);
export default authRouter;
