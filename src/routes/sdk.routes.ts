import express from "express";
import { order } from "../controllers/sdk.controller";
import { OrderDto } from "../dto/order.dto";
import SetBusinessMiddleware from "../middlewares/setBusiness.middleware";
import ValidatorMiddleware from "../middlewares/validator.middleware";
const sdkRouter = express.Router();
sdkRouter.use(SetBusinessMiddleware);
sdkRouter.route("/order").post(ValidatorMiddleware(OrderDto), order);
export default sdkRouter;
