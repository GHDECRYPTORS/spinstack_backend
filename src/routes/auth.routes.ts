import { Application } from "express";
import { register,login,profile } from "../controllers/auth.controller";
import express from "express";
import ValidatorMiddleware from "../middlewares/validator.middleware";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
const authRouter = express.Router();
authRouter.route("/register").post(ValidatorMiddleware(RegisterDto), register);
authRouter.route("/login").post(ValidatorMiddleware(LoginDto), login);
authRouter.route("/user").get(profile)
export default authRouter;
