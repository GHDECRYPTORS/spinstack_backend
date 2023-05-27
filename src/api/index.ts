import MessageResponse from "../interfaces/MessageResponse";
import authRoutes from "../routes/auth.routes";
import businessRouter from "../routes/business.routes";
import express from "express";
import sdkRoutes from "../routes/sdk.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/sdk", sdkRoutes);
router.use("/business", businessRouter);
export default router;
