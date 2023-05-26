import {
  register,
  login,
  profile,
  createOrder,
} from "../controllers/auth.controller";
import express from "express";
import ValidatorMiddleware from "../middlewares/validator.middleware";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { AuthGuard } from "../guards/auth.guard";
const authRouter = express.Router();
authRouter.route("/register").post(ValidatorMiddleware(RegisterDto), register);
authRouter.route("/login").post(ValidatorMiddleware(LoginDto), login);
authRouter.route("/create-order").post(createOrder);
authRouter.route("/user").get(AuthGuard, profile);
export default authRouter;
