import express from "express";
import {
  order,
  retrieveAllOrders,
  retrieveOrder,
  updateOrder,
} from "../controllers/sdk.controller";
import { OrderDto } from "../dto/order.dto";
import SetBusinessMiddleware from "../middlewares/setBusiness.middleware";
import ValidatorMiddleware from "../middlewares/validator.middleware";
const sdkRouter = express.Router();
sdkRouter.use(SetBusinessMiddleware);
sdkRouter.route("/order").post(ValidatorMiddleware(OrderDto), order);
sdkRouter.route("/order/:orderId").get(retrieveOrder);
sdkRouter.route("/orders").get(retrieveAllOrders);
sdkRouter.route("/order/:orderId").put(updateOrder);
export default sdkRouter;
