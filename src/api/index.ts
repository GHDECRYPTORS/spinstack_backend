import express from "express";

const router = express.Router();
import authRoutes from "../routes/auth.routes";
import sdkRoutes from "../routes/sdk.routes";

router.use("/auth", authRoutes);
router.use("/sdk", sdkRoutes);

export default router;
