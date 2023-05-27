import express from "express";
import { order } from "../controllers/sdk.controller";
import SetBusinessMiddleware from "../middlewares/setBusiness.middleware";
const sdkRouter = express.Router();
sdkRouter.use(SetBusinessMiddleware);
sdkRouter.route("/order").post(order);
export default sdkRouter;
