import {
  create,
  deleteOne,
  getAll,
  getOne,
  update
} from "../controllers/business.controller";

import { AuthGuard } from "../guards/auth.guard";
import { BusinessDto } from "../dto/business.dto";
import ValidatorMiddleware from "../middlewares/validator.middleware";
import express from "express";

const businessRouter = express.Router();

businessRouter.use(AuthGuard);
businessRouter.route("/").post(ValidatorMiddleware(BusinessDto), create);
businessRouter.route("/").get(getAll);
// mongo id regex is /^[0-9a-fA-F]{24}$/
businessRouter.route("/:id").get(getOne);
businessRouter.route("/:id").put(ValidatorMiddleware(BusinessDto), update);
businessRouter.route("/:id").delete(deleteOne);


//APPS
// businessRouter.route("/:business_id/apps").get(getApps);
// businessRouter.route("/:business_id/apps/:id").get(getApp);  
// businessRouter.route("/:business_id/apps/:id").delete(deleteApp);
// businessRouter.route("/:business_id/apps/:id").put(ValidatorMiddleware(BusinessDto), updateApp);
// businessRouter.route("/:business_id/apps").post(ValidatorMiddleware(BusinessDto), createApp);

export default businessRouter;
