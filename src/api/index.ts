import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";

const router = express.Router();
import authRoutes from "../routes/auth.routes";

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/auth", authRoutes);

export default router;
