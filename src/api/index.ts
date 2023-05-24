import MessageResponse from "../interfaces/MessageResponse";
import authRoutes from "../routes/auth.routes";
import businessRouter from "../routes/business.routes";
import express from "express";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth", authRoutes);
router.use("/business", businessRouter);

export default router;
